import {
  Controller,
  HttpCode,
  HttpStatus,
  INestApplication,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Test } from '@nestjs/testing';
import { Throttle, ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler';
import request from 'supertest';

/** Mirrors flyer SSE route guard/throttle wiring without DB or auth (validates Nest stack only). */
@Controller('__flyer_throttle_probe')
class FlyerThrottleProbeController {
  @Post('stream')
  @UseGuards(ThrottlerGuard)
  @Throttle({
    'flyer-stream': {
      ttl: 60_000,
      limit: 5,
    },
  })
  @HttpCode(HttpStatus.OK)
  stream(): { ok: boolean } {
    return { ok: true };
  }
}

describe('Flyer stream throttle (Nest wiring)', () => {
  let app: INestApplication;

  beforeAll(async () => {
    const moduleRef = await Test.createTestingModule({
      imports: [
        ThrottlerModule.forRoot([
          {
            name: 'flyer-stream',
            ttl: 60_000,
            limit: 5,
          },
        ]),
      ],
      controllers: [FlyerThrottleProbeController],
    }).compile();

    app = moduleRef.createNestApplication();
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  it('should allow requests up to the limit then respond with 429', async () => {
    const server = app.getHttpServer();

    for (let i = 0; i < 5; i++) {
      await request(server).post('/__flyer_throttle_probe/stream').expect(200);
    }

    await request(server).post('/__flyer_throttle_probe/stream').expect(429);
  });
});
