import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import vm from 'node:vm';
import { validCalLink, isBookingReady, bookingUrl, localDate } from '../booking.mjs';
test('réservation fermée sans configuration explicitement vérifiée', () => {
  for (const c of [{}, {booking:{}}, {booking:{calLink:'yves/intervention'}}, {booking:{calLink:'yves/intervention',verified:'true'}}]) assert.equal(isBookingReady(c),false);
  assert.throws(()=>bookingUrl({}));
});
test('liens externes et chemins arbitraires refusés', () => {
  for (const link of ['https://evil.test/a','javascript:alert(1)','yves/a?redirect=evil','../event','yves/a/b','yves/a#x','']) assert.equal(validCalLink(link),false);
  assert.equal(validCalLink('vitrio-services/demande-intervention'),true);
});
test('un seul événement officiel, sans données personnelles dans le lien',()=>{
  assert.equal(bookingUrl({booking:{calLink:'vitrio/demande',verified:true}}),'https://cal.com/vitrio/demande?locale=fr');
});
test('date minimale calculée dans le fuseau français, y compris à minuit et en été',()=>{
  assert.equal(localDate(new Date('2026-11-17T23:30:00Z')),'2026-11-18');
  assert.equal(localDate(new Date('2026-07-17T22:30:00Z')),'2026-07-18');
});
test('configuration livrée inactive, sans destinataire fictif',()=>{
 const context={window:{}};vm.runInNewContext(fs.readFileSync(new URL('../config.js',import.meta.url),'utf8'),context);
 assert.equal(isBookingReady(context.window.VITRIO_CONFIG),false);
 assert.equal(context.window.VITRIO_CONFIG.email,'');
});
test('liens locaux et ancres présents, aucun faux formulaire de transmission',()=>{
 const root=new URL('../',import.meta.url);const html=fs.readFileSync(new URL('index.html',root),'utf8');
 for(const [,href] of html.matchAll(/href="([^"]+)"/g)){
  if(href.startsWith('#')) assert.ok(html.includes(`id="${href.slice(1)}"`),href);
  else if(!/^https?:/.test(href)) assert.ok(fs.existsSync(new URL(href,root)),href);
 }
 assert.equal(/onsubmit=|tel:\+330000|alert\(/.test(html),false);
});
