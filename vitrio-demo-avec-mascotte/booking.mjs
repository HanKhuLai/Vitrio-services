export const SERVICES = ['Vitres', 'Ménage', 'Canapés', 'Extérieurs'];
export function validCalLink(value) {
  return typeof value === 'string' && /^[a-z0-9][a-z0-9_-]*\/[a-z0-9][a-z0-9_-]*$/.test(value);
}
export function isBookingReady(config) {
  return config?.booking?.verified === true && validCalLink(config.booking.calLink);
}
export function bookingUrl(config) {
  if (!isBookingReady(config)) throw new Error('Calendrier non configuré ou non vérifié');
  return `https://cal.com/${config.booking.calLink}?locale=fr`;
}
export function localDate(now = new Date()) {
  return new Intl.DateTimeFormat('fr-CA', { timeZone: 'Europe/Paris', year: 'numeric', month: '2-digit', day: '2-digit' }).format(now);
}
