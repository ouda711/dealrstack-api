import { NotificationKind } from './domain/sales.enums';

export type PipelineStageNotificationTrigger = {
  kind: NotificationKind.Deposit | NotificationKind.Appointment;
  title: string;
  body: string;
};

export function resolvePipelineStageNotification(input: {
  stageKey: string;
  stageLabel: string;
  customerName: string;
  dealTitle: string;
}): PipelineStageNotificationTrigger | null {
  const stageKey = input.stageKey.toLowerCase().trim();
  const customerName = input.customerName.trim() || 'Customer';
  const dealTitle = input.dealTitle.trim() || 'Deal';
  const stageLabel = input.stageLabel.trim() || input.stageKey;

  if (matchesTestDriveStage(stageKey)) {
    return {
      kind: NotificationKind.Appointment,
      title: 'Test drive scheduled',
      body: `${customerName} — ${dealTitle} is in ${stageLabel}`,
    };
  }

  if (matchesDepositStage(stageKey)) {
    return {
      kind: NotificationKind.Deposit,
      title: 'Deposit received',
      body: `${customerName} — ${dealTitle} moved to ${stageLabel}`,
    };
  }

  return null;
}

export function matchesTestDriveStage(stageKey: string): boolean {
  return (
    stageKey === 'test_drive' ||
    stageKey.includes('test_drive') ||
    stageKey.includes('test-drive') ||
    stageKey.includes('testdrive')
  );
}

function matchesDepositStage(stageKey: string): boolean {
  return (
    stageKey === 'deposit_paid' ||
    stageKey === 'deposit_received' ||
    stageKey.includes('deposit_paid') ||
    stageKey.includes('deposit_received') ||
    (stageKey.includes('deposit') && !stageKey.includes('pending'))
  );
}
