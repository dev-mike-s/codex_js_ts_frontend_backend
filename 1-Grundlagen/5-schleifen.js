// ============================================
// SCHLEIFEN
// Vorbereitung für React
// ============================================

/*
🎯 LERNZIEL: Nach diesem Kapitel verstehst du die 3 kritischen Array-Patterns,
die du für React JEDEN TAG brauchst.

Fokus: Array-Methoden (map, filter, find) > klassische Schleifen
In React verwendest du fast NIE klassische for-Schleifen!
*/

// ============================================
// KONZEPT 1: MAP - TRANSFORMATION
// Die wichtigste Array-Methode für React
// ============================================

/*
KERNPROBLEM: In React müssen Arrays zu JSX-Elementen transformiert werden
LÖSUNG: .map() erstellt neues Array aus jedem Element

REGEL:
→ .map(item => neuerWert) gibt NEUES Array zurück
→ Original-Array bleibt unverändert (immutable)
→ Callback-Return ist PFLICHT
→ Das ist DAS Standard-Pattern für Listen in React
*/

// ──────────── Basis-Transformation ────────────
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map((num) => num * 2);

console.log(numbers); // [1, 2, 3, 4, 5] (unverändert!)
console.log(doubled); // [2, 4, 6, 8, 10]

// ──────────── Strings transformieren ────────────
const names = ["max", "anna", "tom"];
const uppercased = names.map((name) => name.toUpperCase());
console.log(uppercased); // ["MAX", "ANNA", "TOM"]

// ──────────── Objekte transformieren ────────────
const users = [
  { id: 1, name: "Max", age: 25 },
  { id: 2, name: "Anna", age: 30 },
  { id: 3, name: "Tom", age: 22 },
];

// Nur Namen extrahieren
const userNames = users.map((user) => user.name);
console.log(userNames); // ["Max", "Anna", "Tom"]

// Objekte erweitern
const usersWithStatus = users.map((user) => ({
  ...user,
  isAdult: user.age >= 18,
}));
console.log(usersWithStatus);
// [{ id: 1, name: "Max", age: 25, isAdult: true }, ...]

// ──────────── Mit Index (zweiter Parameter) ────────────
const items = ["A", "B", "C"];
const indexed = items.map((item, index) => `${index}: ${item}`);
console.log(indexed); // ["0: A", "1: B", "2: C"]

// ──────────── ⚠️ HÄUFIGE FEHLER ────────────
// ❌ FEHLER 1: Kein Return
const wrong1 = numbers.map((num) => {
  num * 2; // Fehlt return!
});
console.log(wrong1); // [undefined, undefined, ...]

// ✅ RICHTIG: Mit return
const correct1 = numbers.map((num) => {
  return num * 2;
});

// ✅ ODER: Impliziter Return (ohne {})
const correct2 = numbers.map((num) => num * 2);

// ❌ FEHLER 2: Original-Array mutieren
numbers.map((num) => {
  numbers[0] = 999; // ❌ NIEMALS!
  return num;
});

// ✅ RICHTIG: Neues Array erstellen
const correct3 = numbers.map((num) => num);

// 💡 WARUM IST DAS FÜR REACT WICHTIG?
// → Listen-Rendering: users.map(user => <UserCard user={user} />)
// → Keys sind Pflicht: map((item, i) => <div key={item.id}>...)
// → Original-Array bleibt unverändert (React Prinzip!)
// → 90% aller Listen in React verwenden .map()

// ============================================
// KONZEPT 2: FILTER - AUSWAHL
// Nur bestimmte Elemente behalten
// ============================================

/*
KERNPROBLEM: Oft brauchst du nur Elemente, die eine Bedingung erfüllen
LÖSUNG: .filter() gibt neues Array mit nur den passenden Elementen zurück

REGEL:
→ .filter(item => bedingung) gibt NEUES Array zurück
→ Callback muss Boolean zurückgeben (true = behalten, false = raus)
→ Original-Array bleibt unverändert
→ Kombinierbar mit .map()
*/

// ──────────── Basis-Filterung ────────────
const allNumbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const evenNumbers = allNumbers.filter((num) => num % 2 === 0);
console.log(evenNumbers); // [2, 4, 6, 8, 10]

const largeNumbers = allNumbers.filter((num) => num > 5);
console.log(largeNumbers); // [6, 7, 8, 9, 10]

// ──────────── Objekte filtern ────────────
const products = [
  { name: "Laptop", price: 1200, inStock: true },
  { name: "Mouse", price: 25, inStock: false },
  { name: "Keyboard", price: 80, inStock: true },
  { name: "Monitor", price: 300, inStock: true },
];

// Nur verfügbare Produkte
const available = products.filter((p) => p.inStock);
console.log(available.length); // 3

// Mehrere Bedingungen
const affordableInStock = products.filter((p) => p.inStock && p.price < 500);
console.log(affordableInStock); // [Mouse, Keyboard]

// ──────────── Kombiniert mit .map() ────────────
// Namen aller verfügbaren Produkte
const availableNames = products.filter((p) => p.inStock).map((p) => p.name);
console.log(availableNames); // ["Laptop", "Keyboard", "Monitor"]

// Preise reduzieren für verfügbare Produkte
const discounted = products.filter((p) => p.inStock).map((p) => ({ ...p, price: p.price * 0.9 }));

// ──────────── Falsy-Werte entfernen ────────────
const mixed = [1, 0, "text", "", null, "hello", undefined, false];
const truthyOnly = mixed.filter(Boolean);
console.log(truthyOnly); // [1, "text", "hello"]

// Das ist ein häufiges Pattern!

// ──────────── Mit Index ────────────
const letters = ["A", "B", "C", "D", "E"];
const oddIndices = letters.filter((letter, index) => index % 2 !== 0);
console.log(oddIndices); // ["B", "D"]

// 💡 WARUM IST DAS FÜR REACT WICHTIG?
// → Conditional Rendering von Listen
// → {products.filter(p => p.inStock).map(p => <Product {...p} />)}
// → Search/Filter Features
// → Kombiniert mit .map() für gefilterte UI
// → Entfernen von null/undefined aus Arrays

// ============================================
// KONZEPT 3: FIND, SOME, EVERY
// Einzelne Elemente finden & Prüfungen
// ============================================

/*
KERNPROBLEM: Manchmal brauchst du nur EIN Element oder eine Boolean-Prüfung
LÖSUNG: find(), some(), every() für effiziente Suche

REGEL:
→ .find() gibt ERSTES passendes Element zurück (oder undefined)
→ .some() gibt true wenn MINDESTENS EINS passt
→ .every() gibt true wenn ALLE passen
→ Stoppen bei erstem Match (effizienter als filter)
*/

// ──────────── find() - Erstes Element finden ────────────
const users2 = [
  { id: 1, name: "Max", active: true },
  { id: 2, name: "Anna", active: false },
  { id: 3, name: "Tom", active: true },
];

const foundUser = users2.find((user) => user.id === 2);
console.log(foundUser); // { id: 2, name: "Anna", active: false }

const notFound = users2.find((user) => user.id === 99);
console.log(notFound); // undefined

// Praktisch: User by ID
function getUserById(id) {
  return users2.find((user) => user.id === id);
}

// ──────────── some() - Gibt es mindestens eins? ────────────
const hasInactive = users2.some((user) => !user.active);
console.log(hasInactive); // true

const hasAdmin = users2.some((user) => user.role === "admin");
console.log(hasAdmin); // false

// Praktisch: Validierung
const hasEmptyField = ["Max", "", "Tom"].some((name) => name === "");
console.log(hasEmptyField); // true

// ──────────── every() - Sind alle so? ────────────
const allActive = users2.every((user) => user.active);
console.log(allActive); // false

const allHaveNames = users2.every((user) => user.name);
console.log(allHaveNames); // true

// Praktisch: Formular-Validierung
const formFields = ["Max", "max@test.de", "password123"];
const allFilled = formFields.every((field) => field.length > 0);
console.log(allFilled); // true

// ──────────── Vergleich: find vs filter ────────────
const ages = [15, 22, 18, 30, 17];

// find: Stoppt beim ERSTEN Match
const firstAdult = ages.find((age) => age >= 18);
console.log(firstAdult); // 22 (stoppt hier!)

// filter: Gibt ALLE Matches zurück
const allAdults = ages.filter((age) => age >= 18);
console.log(allAdults); // [22, 18, 30]

// ✅ find ist effizienter wenn du nur das erste brauchst!

// 💡 WARUM IST DAS FÜR REACT WICHTIG?
// → State Updates: find User by ID vor Update
// → Validierung: every() für Formular-Checks
// → Conditional Rendering: some() für "Zeige wenn..."
// → Effizienz: find() statt filter()[0]

// ============================================
// KONZEPT 4: KLASSISCHE SCHLEIFEN (Nur wenn nötig!)
// Wann du sie WIRKLICH brauchst
// ============================================

/*
KERNPROBLEM: Array-Methoden decken 95% der Fälle ab, aber manchmal brauchst du mehr Kontrolle
LÖSUNG: for, for...of, while für spezielle Fälle

REGEL:
→ In React: Fast IMMER Array-Methoden bevorzugen
→ for: Wenn Index UND early break nötig
→ for...of: Moderne Alternative, mit async/await
→ while: Wenn Anzahl Durchläufe unbekannt
*/

// ──────────── for - Mit Index & Break ────────────
const searchArray = [5, 12, 8, 130, 44];
let foundIndex = -1;

for (let i = 0; i < searchArray.length; i++) {
  if (searchArray[i] > 100) {
    foundIndex = i;
    break; // Early exit!
  }
}
console.log(foundIndex); // 3

// ⚠️ ABER: .findIndex() ist besser!
const betterIndex = searchArray.findIndex((num) => num > 100);
console.log(betterIndex); // 3

// ──────────── for...of - Moderne Iteration ────────────
const fruits = ["Apfel", "Banane", "Orange"];

for (const fruit of fruits) {
  console.log(fruit);
}

// Mit Index via entries()
for (const [index, fruit] of fruits.entries()) {
  console.log(`${index}: ${fruit}`);
}

// ✅ VORTEIL: Funktioniert mit async/await!
async function processFruits() {
  for (const fruit of fruits) {
    // await somethingAsync(fruit);  // Wartet korrekt
    console.log(fruit);
  }
}

// ──────────── while - Unbekannte Anzahl ────────────
let sum = 0;
let num = 1;

while (sum < 100) {
  sum += num;
  num++;
}
console.log(`Summe: ${sum}, nach ${num - 1} Durchläufen`);

// ⚠️ ENDLOSSCHLEIFEN vermeiden!
let count = 0;
while (count < 5) {
  console.log(count);
  count++; // WICHTIG!
}

// ──────────── Verschachtelte Schleifen (selten!) ────────────
// 2D-Array durchlaufen
const matrix = [
  [1, 2, 3],
  [4, 5, 6],
  [7, 8, 9],
];

for (let row = 0; row < matrix.length; row++) {
  for (let col = 0; col < matrix[row].length; col++) {
    console.log(`[${row}][${col}] = ${matrix[row][col]}`);
  }
}

// ✅ BESSER: Mit forEach
matrix.forEach((row, rowIndex) => {
  row.forEach((value, colIndex) => {
    console.log(`[${rowIndex}][${colIndex}] = ${value}`);
  });
});

// 💡 WARUM IST DAS FÜR REACT WICHTIG?
// → Klassische for: Fast NIE in React-Code!
// → for...of: Mit async/await in useEffect
// → while: Kaum verwendet
// → 99% der Zeit: Array-Methoden (map, filter, etc.)

// ============================================
// BONUS: forEach vs map
// Der wichtige Unterschied
// ============================================

/*
KERNPROBLEM: forEach sieht aus wie map, ist aber anders
LÖSUNG: Verstehe wann was verwendet wird

REGEL:
→ forEach: Side Effects, kein Return-Wert
→ map: Transformation, gibt neues Array zurück
→ In React: map fast immer besser
*/

// ──────────── forEach - Für Side Effects ────────────
const nums = [1, 2, 3];

nums.forEach((num) => {
  console.log(num * 2); // Nur logging, kein Return
});

// forEach gibt NICHTS zurück
const result = nums.forEach((num) => num * 2);
console.log(result); // undefined

// ──────────── map - Für Transformation ────────────
const doubled2 = nums.map((num) => num * 2);
console.log(doubled2); // [2, 4, 6]

// ──────────── ⚠️ forEach funktioniert NICHT mit async/await ────────────
// ❌ FALSCH:
async function wrong() {
  nums.forEach(async (num) => {
    // await something(num);        // Wartet NICHT!
  });
}

// ✅ RICHTIG: for...of verwenden
async function correct() {
  for (const num of nums) {
    // await something(num);        // Wartet korrekt!
  }
}

// 💡 WARUM IST DAS FÜR REACT WICHTIG?
// → map gibt neues Array zurück (für JSX!)
// → forEach für Side Effects (logging, API calls)
// → In JSX: Immer map, nie forEach

// ============================================
// ZUSAMMENFASSUNG
// Die 3 kritischen Array-Patterns
// ============================================

/*
┌─────────────────────────────────────────────────────────────┐
│ 1. MAP - TRANSFORMATION                                     │
├─────────────────────────────────────────────────────────────┤
│ Neues Array erstellen               │ .map(x => x * 2)     │
│ Return ist PFLICHT                  │ Implizit oder {}     │
│ Original bleibt unverändert         │ Immutable            │
│ DAS React-Listen-Pattern            │ 90% aller Listen     │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ 2. FILTER - AUSWAHL                                         │
├─────────────────────────────────────────────────────────────┤
│ Nur passende Elemente               │ .filter(x => x > 5)  │
│ Callback: Boolean zurückgeben       │ true = behalten      │
│ Kombinierbar mit map                │ .filter().map()      │
│ Falsy-Werte entfernen               │ .filter(Boolean)     │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ 3. FIND, SOME, EVERY                                        │
├─────────────────────────────────────────────────────────────┤
│ find: Erstes Element                │ Oder undefined       │
│ some: Mind. 1 passt?                │ Boolean              │
│ every: Alle passen?                 │ Boolean              │
│ Effizienter als filter              │ Early exit           │
└─────────────────────────────────────────────────────────────┘


HÄUFIGE FEHLER (und wie man sie vermeidet):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
❌ map ohne return                  → Gibt [undefined, undefined, ...]
❌ forEach mit async/await          → Wartet nicht! Verwende for...of
❌ Original-Array mutieren          → Immer neues Array mit spread
❌ filter()[0] statt find()         → find() ist effizienter
❌ Klassische for in React          → Verwende fast IMMER Array-Methoden


DEBUGGING-TIPPS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
→ map gibt undefined:               Check ob return fehlt
→ Array leer nach filter:           console.log() vor filter
→ find gibt undefined:              Prüfe Bedingung und Daten
→ Endlosschleife:                   Prüfe Inkrement/Bedingung
→ Chaining prüfen:                  Zwischen-Results loggen


VORBEREITUNG FÜR REACT:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Diese Patterns wirst du in React JEDEN TAG verwenden:

→ Listen rendern:                   {users.map(u => <User key={u.id} {...u} />)}
→ Conditional Lists:                {items.filter(i => i.active).map(...)}
→ Find for Update:                  const user = users.find(u => u.id === id)
→ Validation:                       const valid = fields.every(f => f.length > 0)
→ Has Items Check:                  {items.some(i => i.new) && <Badge />}

KRITISCHE PATTERNS:
→ Mit Key (PFLICHT!):               .map(item => <div key={item.id}>)
→ Filter + Map:                     .filter(x => x.active).map(x => <X />)
→ Optional Array:                   {items?.map(...)} oder {items || []}
→ Spread Props:                     .map(item => <Component {...item} />)

WICHTIGSTE REGEL:
In React verwendest du zu 90% Array-Methoden (map, filter, find).
Klassische for-Schleifen sind SEHR selten.
forEach auch fast nie (wegen async und kein Return).

METHODENWAHL:
✅ map: Transformation, JSX-Elemente erstellen
✅ filter: Bedingungen, Suche, Auswahl
✅ find: Einzelnes Element finden
✅ some/every: Boolean-Checks, Validierung
✅ for...of: Async/await in useEffect
❌ for: Fast nie in React
❌ forEach: Selten, nur für Side Effects
*/

console.log("\n✅ Schleifen abgeschlossen!");
console.log("💡 map() ist die wichtigste Methode für React - du wirst sie täglich verwenden!");
