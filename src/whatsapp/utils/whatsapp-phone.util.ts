export function digitsOnlyPhone(phone: string): string {
  return phone.replace(/\D/g, '');
}

export function toWhatsAppRecipient(phone: string): string {
  return digitsOnlyPhone(phone);
}

export function toDisplayPhone(phone: string): string {
  const digits = digitsOnlyPhone(phone);

  if (!digits) {
    return phone;
  }

  return `+${digits}`;
}

export function phonesMatch(a: string, b: string): boolean {
  const left = digitsOnlyPhone(a);
  const right = digitsOnlyPhone(b);

  if (!left || !right) {
    return false;
  }

  return left === right || left.endsWith(right) || right.endsWith(left);
}
