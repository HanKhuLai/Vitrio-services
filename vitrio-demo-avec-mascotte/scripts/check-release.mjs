import fs from 'node:fs';
import vm from 'node:vm';
import { isBookingReady } from '../booking.mjs';
const root = new URL('../', import.meta.url);
const context = { window: {} };
vm.runInNewContext(fs.readFileSync(new URL('config.js', root), 'utf8'), context);
const c = context.window.VITRIO_CONFIG;
const issues = [];
if (!isBookingReady(c)) issues.push('Compte Cal.com non configuré ou recette non validée.');
for (const key of ['phone', 'email', 'area', 'hours', 'mascot']) if (!c[key]) issues.push(`Configuration manquante : ${key}`);
if (c.mascot && (!/^assets\/[\w./-]+$/.test(c.mascot) || c.mascot.includes('..') || !fs.existsSync(new URL(c.mascot, root)))) issues.push('Fichier de la mascotte originale absent ou chemin incorrect.');
if (!c.legalCompleted) issues.push('Informations légales et confidentialité non finalisées.');
for (const file of ['mentions-legales.html', 'confidentialite.html']) if (/\[À COMPLÉTER/.test(fs.readFileSync(new URL(file, root), 'utf8'))) issues.push(`Champs provisoires dans ${file}.`);
if (issues.length) { console.error('Publication bloquée :\n- ' + issues.join('\n- ')); process.exitCode = 1; }
else console.log('Configuration de publication complète. La validation humaine reste requise.');
