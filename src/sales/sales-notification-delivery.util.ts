import { NotificationKind } from './domain/sales.enums';

export type SalesNotificationDeliveryPreferences = {
  emailEnabled: boolean;
  pushEnabled: boolean;
  kinds: Partial<
    Record<
      NotificationKind,
      {
        email?: boolean;
        push?: boolean;
      }
    >
  >;
};

export const DEFAULT_SALES_NOTIFICATION_DELIVERY: SalesNotificationDeliveryPreferences =
  {
    emailEnabled: true,
    pushEnabled: true,
    kinds: {},
  };

export function normalizeSalesNotificationDelivery(
  stored: unknown,
): SalesNotificationDeliveryPreferences {
  if (!stored || typeof stored !== 'object') {
    return DEFAULT_SALES_NOTIFICATION_DELIVERY;
  }

  const value = stored as Partial<SalesNotificationDeliveryPreferences>;

  return {
    emailEnabled: value.emailEnabled !== false,
    pushEnabled: value.pushEnabled !== false,
    kinds: value.kinds ?? {},
  };
}

export function isEmailEnabledForKind(
  preferences: SalesNotificationDeliveryPreferences,
  kind: NotificationKind,
): boolean {
  if (!preferences.emailEnabled) {
    return false;
  }

  const kindPrefs = preferences.kinds[kind];

  if (kindPrefs?.email === false) {
    return false;
  }

  return true;
}

export function isPushEnabledForKind(
  preferences: SalesNotificationDeliveryPreferences,
  kind: NotificationKind,
): boolean {
  if (!preferences.pushEnabled) {
    return false;
  }

  const kindPrefs = preferences.kinds[kind];

  if (kindPrefs?.push === false) {
    return false;
  }

  return true;
}

export function salesNotificationDeliveryKey(tenantId: number) {
  return `sales_notification_delivery:tenant:${tenantId}`;
}
