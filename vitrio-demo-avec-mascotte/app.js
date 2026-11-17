import { SERVICES, isBookingReady, bookingUrl, localDate } from './booking.mjs';
const config = window.VITRIO_CONFIG || {};
const $ = (selector) => document.querySelector(selector);
const nav = $('#navigation');
const toggle = $('.menu-toggle');
function closeMenu() { nav.classList.remove('open'); toggle.setAttribute('aria-expanded', 'false'); }
toggle.addEventListener('click', () => { const open = nav.classList.toggle('open'); toggle.setAttribute('aria-expanded', String(open)); });
nav.addEventListener('click', (event) => { if (event.target.closest('a')) closeMenu(); });
document.addEventListener('keydown', event => { if (event.key === 'Escape') { closeMenu(); } });
$('#year').textContent = new Date().getFullYear();
$('#date').min = localDate();
function contact(id, text, href) {
  if (!text) return;
  const target = $(id);
  if (href) { const a = document.createElement('a'); a.href = href; a.textContent = text; target.replaceChildren(a); }
  else target.textContent = text;
}
contact('#contact-phone', config.phone, /^\+?[\d ().-]{6,30}$/.test(config.phone || '') ? `tel:${config.phone.replace(/[^+\d]/g, '')}` : null);
contact('#contact-email', config.email, /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(config.email || '') ? `mailto:${config.email}` : null);
contact('#contact-area', config.area, config.area ? `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(config.area)}` : null);
contact('#contact-hours', config.hours);
if (typeof config.mascot === 'string' && /^assets\/[a-zA-Z0-9_./-]+\.(png|webp|svg|jpg)$/.test(config.mascot) && !config.mascot.includes('..')) {
  for (const img of document.querySelectorAll('.brand-mascot, #original-mascot')) {
    img.addEventListener('load', () => { img.hidden = false; if (img.id === 'original-mascot') $('#mascot-placeholder').hidden = true; });
    img.src = config.mascot;
  }
}
const form = $('#booking-form');
// Démo : champs interactifs pour illustrer le parcours, mais aucun envoi possible.
// Le bouton reste inactif, et aucune donnée n'est enregistrée ni transmise.
$('#booking-button').disabled = true;
$('#booking-button').setAttribute('aria-disabled', 'true');
$('#form-status').textContent = 'Vous pouvez tester les champs avec des informations fictives. Le bouton d’envoi est désactivé : aucune donnée n’est enregistrée ni transmise.';
const service = $('#service');
for (const link of document.querySelectorAll('[data-service]')) {
  link.addEventListener('click', () => { service.value = link.dataset.service; });
}
const ready = isBookingReady(config);
if (ready) {
  $('#setup-notice').hidden = true;
  $('#preview-fields').hidden = true;
  for (const field of $('#preview-fields').querySelectorAll('input,select,textarea')) field.disabled = true;
  $('#booking-button').textContent = 'Choisir une date et un créneau →';
}
let calendarLoaded = false;
form.addEventListener('submit', event => {
  event.preventDefault();
  if (!form.reportValidity()) return;
  if (!SERVICES.includes(service.value)) return;
  if (!ready) {
    $('#form-status').textContent = 'Les champs obligatoires sont remplis. Aperçu uniquement : aucune demande envoyée et aucun rendez-vous réservé. Le calendrier doit être activé avant utilisation.';
    $('#form-status').focus();
    return;
  }
  $('#calendar-host').hidden = false;
  const link = $('#calendar-link');
  link.href = bookingUrl(config);
  // Le choix définitif de la prestation est un champ obligatoire dans Cal.com.
  // Pas de données personnelles ni de paramètres de formulaire dans l’URL.
  $('#form-status').textContent = `Prestation souhaitée : ${service.value}. Confirmez ce choix dans le calendrier, puis envoyez votre demande. Elle restera soumise à validation.`;
  if (!calendarLoaded) {
    calendarLoaded = true;
    // Bootstrap officiel Cal.com, chargé uniquement sur action explicite du visiteur.
    (function (C, A, L) {
      const p = function (a, ar) { a.q.push(ar); };
      const d = C.document;
      C.Cal = C.Cal || function () {
        const cal = C.Cal; const ar = arguments;
        if (!cal.loaded) { cal.ns = {}; cal.q = cal.q || []; const script = d.createElement('script'); script.src = A; script.onerror = () => { $('#form-status').textContent = 'Le calendrier intégré n’a pas pu se charger. Utilisez le lien « Ouvrir le calendrier » ci-dessous.'; }; d.head.appendChild(script); cal.loaded = true; }
        if (ar[0] === L) { const api = function () { p(api, arguments); }; const namespace = ar[1]; api.q = api.q || []; if (typeof namespace === 'string') { cal.ns[namespace] = cal.ns[namespace] || api; p(cal.ns[namespace], ar); p(cal, ['initNamespace', namespace]); } else p(cal, ar); return; }
        p(cal, ar);
      };
    })(window, 'https://app.cal.com/embed/embed.js', 'init');
    window.Cal('init', { origin: 'https://cal.com' });
    window.Cal('inline', { elementOrSelector: '#cal-inline', calLink: config.booking.calLink, config: { layout: 'month_view', theme: 'light', locale: 'fr' } });
  }
  $('#form-status').focus();
});
