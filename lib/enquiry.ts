/** Validate the shape and digit count, without claiming carrier verification. */
export function isValidPhone(value: string): boolean {
  const digits=value.replace(/\D/g,'');
  return /^\+?[\d\s()-]{8,22}$/.test(value) && digits.length>=8 && digits.length<=15;
}
export function whatsappUrl(number: string, message: string): string {
  if(!/^\d{8,15}$/.test(number)) throw new Error('Invalid business destination');
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}
