import { NotificationKind } from './domain/sales.enums';
import { resolvePipelineStageNotification } from './pipeline-stage-notification.util';

describe('resolvePipelineStageNotification', () => {
  const base = {
    customerName: 'James Mwangi',
    dealTitle: '2021 Toyota Harrier',
    stageLabel: 'Test Drive',
  };

  it('should return appointment notification for test drive stage', () => {
    expect(
      resolvePipelineStageNotification({
        ...base,
        stageKey: 'test_drive',
        stageLabel: 'Test Drive',
      }),
    ).toEqual({
      kind: NotificationKind.Appointment,
      title: 'Test drive scheduled',
      body: 'James Mwangi — 2021 Toyota Harrier is in Test Drive',
    });
  });

  it('should return deposit notification for deposit paid stage', () => {
    expect(
      resolvePipelineStageNotification({
        ...base,
        stageKey: 'deposit_paid',
        stageLabel: 'Deposit Paid',
      })?.kind,
    ).toBe(NotificationKind.Deposit);
  });

  it('should return null for negotiation stage', () => {
    expect(
      resolvePipelineStageNotification({
        ...base,
        stageKey: 'negotiation',
        stageLabel: 'Negotiation',
      }),
    ).toBeNull();
  });
});
