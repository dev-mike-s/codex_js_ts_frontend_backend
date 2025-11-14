// ============================================
// 2.2 SCHLEIFEN
// ============================================

// ============================================
// FOR-SCHLEIFE (Klassisch)
// ============================================

console.log("--- Klassische For-Schleife ---");

// SYNTAX: for (Initialisierung; Bedingung; Inkrement)
for (let i = 0; i < 5; i++) {
  console.log("Durchlauf:", i); // 0, 1, 2, 3, 4
}

// RÜCKWÄRTS ZÄHLEN
console.log("\n--- Rückwärts ---");
for (let i = 5; i > 0; i--) {
  console.log("Countdown:", i); // 5, 4, 3, 2, 1
}

// SCHRITTE überspringen (Inkrement um 2)
console.log("\n--- Gerade Zahlen ---");
for (let i = 0; i < 10; i += 2) {
  console.log("Gerade:", i); // 0, 2, 4, 6, 8
}

// ARRAY durchlaufen mit Index
console.log("\n--- Array mit Index ---");
let früchte = ["Apfel", "Banane", "Orange"];

for (let i = 0; i < früchte.length; i++) {
  console.log(i + ":", früchte[i]);
}
// 0: Apfel
// 1: Banane
// 2: Orange

// MIT INDEX arbeiten
for (let i = 0; i < früchte.length; i++) {
  console.log(`Frucht ${i + 1} von ${früchte.length}: ${früchte[i]}`);
}

// ⚠️ HÄUFIGER FEHLER: <= statt <
console.log("\n--- Häufiger Fehler ---");
// for (let i = 0; i <= früchte.length; i++) { // ❌ geht über Array-Länge!
//   console.log(früchte[i]); // früchte[3] = undefined
// }

// ✅ RICHTIG: < statt <=
for (let i = 0; i < früchte.length; i++) {
  console.log(früchte[i]); // ✅
}

// VERSCHACHTELTE FOR-SCHLEIFEN
console.log("\n--- Verschachtelte Schleifen ---");

// Multiplikationstabelle
for (let zeile = 1; zeile <= 3; zeile++) {
  let reihe = "";
  for (let spalte = 1; spalte <= 3; spalte++) {
    reihe += zeile * spalte + " ";
  }
  console.log(`Zeile ${zeile}: ${reihe}`);
}

// 2D-Array (Matrix) durchlaufen
let matrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];

for (let zeile = 0; zeile < matrix.length; zeile++) {
  for (let spalte = 0; spalte < matrix[zeile].length; spalte++) {
    console.log(`[${zeile}][${spalte}] = ${matrix[zeile][spalte]}`);
  }
}

// ============================================
// WHILE-SCHLEIFE
// ============================================

console.log("\n--- While-Schleife ---");

// WHILE: Bedingung wird VOR jedem Durchlauf geprüft
let count = 0;

while (count < 5) {
  console.log("Count:", count); // 0, 1, 2, 3, 4
  count++;
}

// WHILE für unbekannte Anzahl Durchläufe
console.log("\n--- While mit unbekannter Anzahl ---");
let summe = 0;
let nummer = 1;

while (summe < 100) {
  summe += nummer;
  console.log(`Nummer ${nummer}: Summe = ${summe}`);
  nummer++;
}
console.log(`Endstand: ${summe} nach ${nummer - 1} Durchläufen`);

// PRAKTISCHES BEISPIEL: Suche
console.log("\n--- Suche mit while ---");
let zahlen = [5, 12, 8, 130, 44];
let gesuchteZahl = 130;
let index = 0;
let gefunden = false;

while (index < zahlen.length && !gefunden) {
  if (zahlen[index] === gesuchteZahl) {
    console.log(`${gesuchteZahl} gefunden bei Index ${index}`);
    gefunden = true;
  }
  index++;
}

// ⚠️ ENDLOSSCHLEIFEN vermeiden!
console.log("\n--- Endlosschleifen-Warnung ---");

// ❌ NIEMALS SO:
// let x = 0;
// while (x < 10) {
//   console.log(x);
//   // FEHLER: x wird nie erhöht!
// }

// ✅ RICHTIG: Bedingung muss irgendwann false werden
let x = 0;
while (x < 10) {
  console.log("x:", x);
  x++; // ✅ Wichtig! Sonst Endlosschleife
}

// SICHERHEITSMECHANISMUS (bei unsicheren Bedingungen)
let maxIterations = 1000;
let iterations = 0;
let condition = true;

while (condition && iterations < maxIterations) {
  // Irgendwelche Operationen
  iterations++;

  if (iterations > 5) {
    // Simuliere Abbruch
    condition = false;
  }
}
console.log("Sicher gestoppt nach", iterations, "Iterationen");

// ============================================
// DO-WHILE-SCHLEIFE
// ============================================

console.log("\n--- Do-While-Schleife ---");

// DO-WHILE: Bedingung wird NACH jedem Durchlauf geprüft
// Wird MINDESTENS EINMAL ausgeführt!

let zähler = 0;

do {
  console.log("Zähler:", zähler); // 0, 1, 2, 3, 4
  zähler++;
} while (zähler < 5);

// UNTERSCHIED: while vs. do-while
console.log("\n--- While vs. Do-While Vergleich ---");

// WHILE: Wird 0-mal ausgeführt (Bedingung sofort false)
let a = 10;
console.log("While-Test (a = 10, Bedingung: a < 5):");
while (a < 5) {
  console.log("While:", a); // Wird NIE ausgeführt
  a++;
}
console.log("While wurde", a === 10 ? "nicht" : "", "ausgeführt");

// DO-WHILE: Wird 1-mal ausgeführt (Bedingung erst am Ende)
let b = 10;
console.log("\nDo-While-Test (b = 10, Bedingung: b < 5):");
do {
  console.log("Do-While:", b); // ✅ Wird einmal ausgeführt
  b++;
} while (b < 5);
console.log("Do-While wurde mindestens 1x ausgeführt");

// PRAKTISCHES BEISPIEL: Benutzereingabe validieren
console.log("\n--- Eingabe-Validierung ---");

function simuliereEingabe() {
  // Simuliere Benutzereingabe (normalerweise prompt())
  let versuche = 0;
  let eingabe;

  do {
    versuche++;
    // eingabe = prompt("Zahl zwischen 1 und 10:");
    eingabe = versuche === 3 ? 5 : 0; // Simuliert: 3. Versuch ist gültig
    console.log(`Versuch ${versuche}: ${eingabe}`);
  } while ((eingabe < 1 || eingabe > 10) && versuche < 3);

  return eingabe;
}

simuliereEingabe();

// ============================================
// FOR...OF (für Arrays & Iterables)
// ============================================

console.log("\n--- For...Of Schleife ---");

let farben = ["Rot", "Grün", "Blau"];

// FOR...OF durchläuft Werte
for (let farbe of farben) {
  console.log("Farbe:", farbe);
}
// Rot, Grün, Blau

// Mit Strings (jedes Zeichen)
let text = "Hallo";
for (let buchstabe of text) {
  console.log("Buchstabe:", buchstabe); // H, a, l, l, o
}

// Mit Sets
let zahlenSet = new Set([1, 2, 3, 2, 1]); // Set entfernt Duplikate
for (let zahl of zahlenSet) {
  console.log("Set-Wert:", zahl); // 1, 2, 3
}

// WENN INDEX BENÖTIGT: entries()
console.log("\n--- For...Of mit Index (entries) ---");

for (let [index, farbe] of farben.entries()) {
  console.log(`Index ${index}: ${farbe}`);
}

// typische Typen für entries: Array, Map, Set

// VERGLEICH: for vs. for...of
console.log("\n--- Vergleich for vs. for...of ---");

let tiere = ["Hund", "Katze", "Vogel"];

// Klassische for-Schleife (mit Index)
console.log("Klassische for:");
for (let i = 0; i < tiere.length; i++) {
  console.log(i, tiere[i]); // Index und Wert
}

// for...of (nur Werte, kein Index)
console.log("\nFor...of:");
for (let tier of tiere) {
  console.log(tier); // Nur Wert
}

// ✅ WANN WELCHE?
// for: Wenn du den Index brauchst oder rückwärts iterierst
// for...of: Wenn du nur die Werte brauchst (cleaner!)

// ⚠️ for...of funktioniert NICHT mit normalen Objekten!
let person = { name: "Max", alter: 25 };
// for (let prop of person) {} // ❌ TypeError: person is not iterable

// 💡 WICHTIG FÜR REACT:
// Arrays meist mit .map() statt for...of
// farben.map(farbe => <li>{farbe}</li>)

// ============================================
// FOR...IN (für Objekte)
// ============================================

console.log("\n--- For...In Schleife ---");

let user = {
  name: "Max",
  alter: 25,
  stadt: "Berlin",
  beruf: "Entwickler",
};

// FOR...IN durchläuft Objekt-Keys
for (let key in user) {
  console.log(key + ":", user[key]);
}
// name: Max
// alter: 25
// stadt: Berlin
// beruf: Entwickler

// ⚠️ VORSICHT: for...in bei Arrays (NICHT EMPFOHLEN!)
console.log("\n--- For...In bei Arrays (nicht empfohlen) ---");

let zahlenArray = [10, 20, 30];

for (let index in zahlenArray) {
  console.log("Index:", index, "Typ:", typeof index); // ❌ "string" (nicht number!)
  console.log("Wert:", zahlenArray[index]);
}

// ✅ BESSER: for...of für Arrays
for (let zahl of zahlenArray) {
  console.log("Wert:", zahl); // 10, 20, 30
}

// MODERNE ALTERNATIVEN für Objekte
console.log("\n--- Moderne Objekt-Iteration ---");

// Object.keys() - Array von Keys
console.log("Object.keys():");
Object.keys(user).forEach((key) => {
  console.log(key + ":", user[key]);
});

// Object.values() - Array von Werten
console.log("\nObject.values():");
Object.values(user).forEach((value) => {
  console.log(value); // Max, 25, Berlin, Entwickler
});

// Object.entries() - Array von [key, value] Paaren
console.log("\nObject.entries():");
Object.entries(user).forEach(([key, value]) => {
  console.log(`${key}: ${value}`);
});

// ✅ WANN WELCHE METHODE?
// for...in: Einfache Iteration über Objekt-Keys
// Object.keys/values/entries: Wenn du Array-Methoden brauchst (map, filter, etc.)

// ============================================
// ARRAY-METHODEN statt Schleifen (Modern!)
// ============================================

console.log("\n--- Array-Methoden (Modern & React-Style) ---");

let produkte = [
  { name: "Apfel", preis: 1.5 },
  { name: "Banane", preis: 0.8 },
  { name: "Orange", preis: 2.0 },
];

// ❌ ALTE METHODE: for-Schleife
console.log("Mit for-Schleife:");
for (let i = 0; i < produkte.length; i++) {
  console.log(produkte[i].name);
}

// ✅ MODERNE METHODE: forEach
console.log("\nMit forEach:");
produkte.forEach((produkt) => {
  console.log(produkt.name);
});

// ✅ NOCH MODERNER: map (gibt neues Array zurück)
console.log("\nMit map (nur Namen):");
let produktNamen = produkte.map((produkt) => produkt.name);
console.log(produktNamen); // ["Apfel", "Banane", "Orange"]

// 💡 WICHTIG FÜR REACT:
// React verwendet fast immer .map() statt Schleifen!
// produkte.map(produkt => <li>{produkt.name}</li>)

// WEITERE WICHTIGE ARRAY-METHODEN
console.log("\n--- Wichtige Array-Methoden ---");

let zahlenListe = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

// filter() - Nur bestimmte Elemente
let geradeZahlen = zahlenListe.filter((zahl) => zahl % 2 === 0);
console.log("Gerade Zahlen:", geradeZahlen); // [2, 4, 6, 8, 10]

// find() - Erstes Element das passt
let erstesÜber5 = zahlenListe.find((zahl) => zahl > 5);
console.log("Erstes > 5:", erstesÜber5); // 6

// some() - Gibt es mindestens eins?
let hatGeradeZahl = zahlenListe.some((zahl) => zahl % 2 === 0);
console.log("Hat gerade Zahl?", hatGeradeZahl); // true

// every() - Sind alle so?
let alleGerade = zahlenListe.every((zahl) => zahl % 2 === 0);
console.log("Alle gerade?", alleGerade); // false

// reduce() - Zu einem Wert reduzieren
let summe = zahlenListe.reduce((total, zahl) => total + zahl, 0);
console.log("Summe:", summe); // 55

// ============================================
// PERFORMANCE-VERGLEICH
// ============================================

console.log("\n--- Performance-Tipps ---");

// FÜR GROSSE ARRAYS:
// ✅ for-Schleife: Am schnellsten
// ✅ for...of: Fast so schnell, aber lesbarer
// 🟡 forEach: Etwas langsamer
// 🟡 map/filter: Wenn du neues Array brauchst

// FÜR KLEINE ARRAYS (< 1000 Elemente):
// ✅ forEach, map, filter sind perfekt lesbar
// Performance-Unterschied ist vernachlässigbar

// BEISPIEL: Wann for statt forEach?
let riesigeDaten = new Array(1000000).fill(0);
console.log("Große Datenmengen:");

console.time("for-Schleife");
for (let i = 0; i < riesigeDaten.length; i++) {
  // Verarbeitung
}
console.timeEnd("for-Schleife");

console.time("forEach");
riesigeDaten.forEach((item) => {
  // Verarbeitung
});
console.timeEnd("forEach");

// for-Schleife ist meist schneller, aber für normale Anwendungen spielt das keine Rolle!

// ============================================
// SCHLEIFEN MIT ASYNC/AWAIT (Vorschau)
// ============================================

console.log("\n--- Async Schleifen (Vorschau) ---");

// ⚠️ VORSICHT: forEach funktioniert NICHT mit async/await!

// ❌ FALSCH:
// async function beispiel() {
//   produkte.forEach(async (produkt) => {
//     await ladenPreis(produkt); // Wartet NICHT!
//   });
// }

// ✅ RICHTIG: for...of mit async
async function produkteVerarbeiten() {
  for (let produkt of produkte) {
    // await ladenPreis(produkt); // ✅ Wartet korrekt
    console.log("Verarbeite:", produkt.name);
  }
}

// Wird später im Kapitel "Asynchrones JavaScript" ausführlich behandelt!

// ============================================
// ZUSAMMENFASSUNG
// ============================================

/*
SCHLEIFEN-ARTEN:

FOR-SCHLEIFE:
✅ Wenn Index benötigt wird
✅ Wenn rückwärts iteriert werden muss
✅ Für große Datenmengen (Performance)
✅ Syntax: for (let i = 0; i < arr.length; i++)

WHILE-SCHLEIFE:
✅ Wenn Anzahl Durchläufe unbekannt
✅ Bedingung wird VOR Durchlauf geprüft
✅ Achtung: Endlosschleifen vermeiden!

DO-WHILE:
✅ Mindestens 1x ausführen
✅ Bedingung wird NACH Durchlauf geprüft
✅ Selten verwendet

FOR...OF:
✅ Moderne Iteration über Arrays
✅ Nur Werte, kein Index (außer mit entries())
✅ Funktioniert mit Arrays, Strings, Sets, Maps
✅ NICHT mit normalen Objekten!

FOR...IN:
✅ Für Objekt-Keys
✅ NICHT für Arrays verwenden (gibt String-Index!)
✅ Besser: Object.keys(), Object.values(), Object.entries()

ARRAY-METHODEN (MODERN):
✅ forEach: Jeden durchlaufen
✅ map: Neues Array erstellen
✅ filter: Nur bestimmte Elemente✅ find: Erstes passendes Element
✅ some: Gibt es mindestens eins?
✅ every: Sind alle so?
✅ reduce: Zu einem Wert reduzieren

WANN WELCHE SCHLEIFE?

Klassische for:
- Index wird benötigt
- Rückwärts iterieren
- Performance kritisch

for...of:
- Nur Werte benötigt
- Moderne, lesbare Syntax
- Mit async/await kompatibel

forEach:
- Funktionaler Stil
- Keine Rückgabe nötig
- Nicht mit async/await!

map/filter/reduce:
- Neues Array erstellen
- Funktionale Programmierung
- Sehr wichtig für React!

BEST PRACTICES:
✅ Bevorzuge for...of statt klassische for (lesbarer)
✅ Nutze Array-Methoden (map, filter) für React
✅ for...in NUR für Objekte, NICHT für Arrays
✅ Vermeide Endlosschleifen (Inkrement nicht vergessen!)
✅ Bevorzuge forEach/map über manuelle Schleifen
✅ Für Performance: Klassische for bei großen Arrays
✅ Mit async/await: for...of verwenden, NICHT forEach

💡 WICHTIG FÜR REACT:
- .map() ist die wichtigste Array-Methode!
- Wird verwendet um Listen zu rendern
- Beispiel: users.map(user => <UserCard user={user} />)
*/

console.log("\n✅ 2.2 Schleifen abgeschlossen!");
