// ============================================
// 1.2 VARIABLEN & KONSTANTEN
// ============================================

// ============================================
// VAR, LET, CONST - Die drei Deklarationsarten
// ============================================

// VAR - Die alte Art (vor ES6/2015)
var alteVariable = "Dies ist eine alte Variable";
console.log(alteVariable); // "Dies ist eine alte Variable"

// LET - Moderne Variable (veränderbar)
let veränderbareVariable = "Dies ist eine veränderbare Variable";
console.log(veränderbareVariable); // "Dies ist eine veränderbare Variable"

// CONST - Moderne Konstante (nicht neu zuweisbar)
const konstanteVariable = "Dies ist eine konstante Variable";
console.log(konstanteVariable); // "Dies ist eine konstante Variable"

// ⚠️ WICHTIG: Verwende NIEMALS mehr var!
// Gründe:
// 1. var hat verwirrende Scope-Regeln
// 2. var wird gehoisted (kann vor Deklaration verwendet werden)
// 3. var kann versehentlich überschrieben werden

// ============================================
// BLOCKSCOPE (let/const) vs. FUNCTIONSCOPE (var)
// ============================================

// BEISPIEL 1: Blockscope mit let/const
{
  let blockVariable = "Nur im Block sichtbar";
  const blockKonstante = "Auch nur im Block sichtbar";
  console.log(blockVariable); // ✅ "Nur im Block sichtbar"
  console.log(blockKonstante); // ✅ "Auch nur im Block sichtbar"
}
// console.log(blockVariable); // ❌ ReferenceError: blockVariable is not defined
// console.log(blockKonstante); // ❌ ReferenceError: blockKonstante is not defined

// BEISPIEL 2: Functionscope mit var
{
  var funktionVariable = "Im gesamten Funktionsbereich sichtbar";
  console.log(funktionVariable); // ✅ "Im gesamten Funktionsbereich sichtbar"
}
console.log(funktionVariable); // ✅ Funktioniert! var ignoriert Blockgrenzen

// BEISPIEL 3: Probleme mit var in Schleifen
console.log("\n--- Problem mit var in Schleifen ---");
for (var i = 0; i < 3; i++) {
  // var ist außerhalb verfügbar!
}
console.log("i nach Schleife:", i); // ✅ 3 (var "leckt" aus der Schleife)

// Mit let ist das sicherer:
for (let j = 0; j < 3; j++) {
  // let bleibt in der Schleife
}
// console.log("j nach Schleife:", j); // ❌ ReferenceError

// BEISPIEL 4: var in if-Statements
if (true) {
  var inIf = "var ist außerhalb sichtbar";
  let inIfLet = "let ist nur hier";
}
console.log(inIf); // ✅ "var ist außerhalb sichtbar"
// console.log(inIfLet); // ❌ ReferenceError

// ZUSAMMENFASSUNG SCOPE:
/*
let/const:
  - Block-Scoped (nur im {} Block)
  - Sicherer, moderner Standard
  - Verhindern versehentliche Bugs

var:
  - Function-Scoped (ignoriert {} Blöcke)
  - Nur durch Funktionen begrenzt
  - Legacy, sollte nicht mehr verwendet werden
*/

// ============================================
// WANN MAN CONST VERWENDET (Standard!)
// ============================================

// REGEL: Immer const verwenden, außer du musst neu zuweisen!

// ✅ GUT: const für Werte, die gleich bleiben
const pi = 3.14159;
const appName = "Meine App";
const maxUsers = 100;

// Versuch der Neuzuweisung:
// pi = 3.14; // ❌ TypeError: Assignment to constant variable

// ✅ GUT: const für Objekte und Arrays (Inhalt kann sich ändern!)
const user = { name: "Max", age: 25 };
user.age = 26; // ✅ Funktioniert! Objektinhalt kann sich ändern
console.log(user); // { name: "Max", age: 26 }

// ABER: Neuzuweisung geht nicht
// user = { name: "Anna" }; // ❌ TypeError

const numbers = [1, 2, 3];
numbers.push(4); // ✅ Funktioniert! Array-Inhalt kann sich ändern
console.log(numbers); // [1, 2, 3, 4]

// ABER: Neuzuweisung geht nicht
// numbers = [5, 6, 7]; // ❌ TypeError

// ❌ SCHLECHT: let verwenden, wenn nicht nötig
let unnecessaryLet = "Wird nie neu zugewiesen"; // Sollte const sein!

// ✅ GUT: let nur wenn wirklich neu zugewiesen wird
let counter = 0;
counter = counter + 1; // Neuzuweisung nötig
counter++; // Neuzuweisung nötig
console.log("Counter:", counter); // 2

// ============================================
// REASSIGNING vs. IMMUTABLE VARIABLEN
// ============================================

// REASSIGNING - Neue Zuweisung des gesamten Werts
let veränderlich = "Ursprünglicher Wert";
console.log(veränderlich); // "Ursprünglicher Wert"

veränderlich = "Neuer Wert"; // ✅ Neuzuweisung möglich mit let
console.log(veränderlich); // "Neuer Wert"

veränderlich = 42; // ✅ Sogar anderer Typ möglich
console.log(veränderlich); // 42

// KONSTANTE - Keine Neuzuweisung möglich
const unveränderlich = "Dieser Wert bleibt gleich";
console.log(unveränderlich); // "Dieser Wert bleibt gleich"

// unveränderlich = "Neuer Wert"; // ❌ TypeError: Assignment to constant variable

// ⚠️ ACHTUNG: const bedeutet NICHT immutable!
// Der Inhalt von Objekten/Arrays kann sich ändern!

const person = { name: "Max" };
person.name = "Anna"; // ✅ Funktioniert! Objekteigenschaft ändern
person.age = 30; // ✅ Funktioniert! Neue Eigenschaft hinzufügen
console.log(person); // { name: "Anna", age: 30 }

// WAHRE IMMUTABILITY erreichen:
const immutablePerson = Object.freeze({ name: "Max" });
immutablePerson.name = "Anna"; // ⚠️ Wird ignoriert (strict mode: TypeError)
console.log(immutablePerson); // { name: "Max" } - Keine Änderung!

// 💡 WICHTIG FÜR REACT:
// React bevorzugt Immutability - erstelle neue Objekte statt zu ändern!
// ❌ Schlecht: user.name = "Neu"
// ✅ Gut: const newUser = { ...user, name: "Neu" }

// ============================================
// DATENTYPEN IN JAVASCRIPT
// ============================================

console.log("\n--- Datentypen ---");

// JavaScript hat 2 Hauptkategorien:
// 1. PRIMITIVE TYPEN (unveränderbare Werte)
// 2. REFERENZTYPEN (veränderbare Objekte)

// ============================================
// PRIMITIVE TYPEN (7 Stück)
// ============================================

// 1. STRING - Text
let stringTyp = "Text";
let stringMitQuotes = "Auch Text";
let stringTemplate = `Template ${stringTyp}`;
console.log(stringTyp); // "Text"
console.log(typeof stringTyp); // "string"

// 2. NUMBER - Zahlen (Integer und Floats)
let numberTyp = 42;
let floatTyp = 3.14;
let negativeNumber = -100;
let scientificNotation = 1e6; // 1000000
console.log(numberTyp); // 42
console.log(typeof numberTyp); // "number"

// Spezielle Number-Werte:
console.log(typeof Infinity); // "number"
console.log(typeof NaN); // "number" (Not a Number ist ironischerweise ein Number!)

// 3. BOOLEAN - Wahr/Falsch
let booleanTyp = true;
let andererBoolean = false;
console.log(booleanTyp); // true
console.log(typeof booleanTyp); // "boolean"

// 4. NULL - Absichtlich leerer Wert
let nullTyp = null;
console.log(nullTyp); // null
console.log(typeof nullTyp); // ❌ "object" (bekannter Bug in JavaScript!)

// 5. UNDEFINED - Variable ohne Wert
let undefinedTyp;
console.log(undefinedTyp); // undefined
console.log(typeof undefinedTyp); // "undefined"

// Unterschied null vs. undefined:
let explizitLeer = null; // "Ich will, dass das leer ist"
let nochNichtGesetzt; // "Wurde noch nicht initialisiert"

// 6. SYMBOL - Einzigartiger Identifier (selten verwendet)
let symbolTyp = Symbol("einzigartig");
let andererSymbol = Symbol("einzigartig");
console.log(symbolTyp === andererSymbol); // false! Jedes Symbol ist unique
console.log(typeof symbolTyp); // "symbol"

// PRAKTISCHES BEISPIEL: Versteckte Objekt-Properties
console.log("\n--- Symbol-Beispiel ---");
const geheim = Symbol("geheim");
let daten = {
  öffentlich: "sichtbar",
  [geheim]: "versteckt",
};

// Normale Iteration zeigt Symbol nicht
for (let key in daten) {
  console.log(key); // nur "öffentlich"
}

// Symbol muss explizit abgefragt werden
console.log(Object.getOwnPropertySymbols(daten)); // [Symbol(geheim)]
console.log(daten[geheim]); // "versteckt"

// 7. BIGINT - Sehr große Ganzzahlen (über Number.MAX_SAFE_INTEGER)
let bigintTyp = 1234567890123456789012345678901234567890n; // Beachte das 'n'
let andererBigint = BigInt("9007199254740991");
console.log(typeof bigintTyp); // "bigint"

// NUMBER hat Grenzen:
console.log("\n--- Number vs. BigInt ---");
console.log(Number.MAX_SAFE_INTEGER); // 9007199254740991
console.log(Number.MAX_SAFE_INTEGER + 1); // 9007199254740992 ✅
console.log(Number.MAX_SAFE_INTEGER + 2); // 9007199254740992 ❌ Gleich!

// BigInt hat keine Grenzen:
console.log(9007199254740991n + 1n); // 9007199254740992n ✅
console.log(9007199254740991n + 2n); // 9007199254740993n ✅

// ⚠️ VORSICHT: Kann nicht mit Number gemischt werden
// console.log(10n + 5); // ❌ TypeError: Cannot mix BigInt and other types

// ============================================
// REFERENZTYPEN (Objekte)
// ============================================

console.log("\n--- Referenztypen ---");

// 1. OBJECT - Sammlung von Key-Value Paaren
let objektTyp = {
  key: "value",
  name: "Max",
  age: 25,
};
console.log(objektTyp); // { key: "value", name: "Max", age: 25 }
console.log(typeof objektTyp); // "object"

// 2. ARRAY - Geordnete Liste (spezieller Object-Typ)
let arrayTyp = [1, 2, 3, "mixed", true];
console.log(arrayTyp); // [1, 2, 3, "mixed", true]
console.log(typeof arrayTyp); // "object" (Arrays sind Objekte!)
console.log(Array.isArray(arrayTyp)); // ✅ true (besserer Check)

// 3. FUNCTION - Ausführbarer Code (spezieller Object-Typ)
let funktionTyp = function () {
  return "Ich bin eine Funktion";
};
console.log(funktionTyp()); // "Ich bin eine Funktion"
console.log(typeof funktionTyp); // "function" (Spezialfall!)

// ============================================
// UNTERSCHIED: Primitive vs. Referenztypen
// ============================================

console.log("\n--- Primitive vs. Referenztypen ---");

// PRIMITIVE: Wert wird kopiert
let x = 5;
let y = x; // y bekommt KOPIE von 5
x = 10;
console.log("x:", x); // 10
console.log("y:", y); // 5 (y bleibt unverändert!)

// REFERENZTYPEN: Referenz wird kopiert
let obj1 = { value: 5 };
let obj2 = obj1; // obj2 zeigt auf DASSELBE Objekt!
obj1.value = 10;
console.log("obj1.value:", obj1.value); // 10
console.log("obj2.value:", obj2.value); // 10 (obj2 wurde auch geändert!)

// LÖSUNG: Objekte kopieren
let obj3 = { ...obj1 }; // Shallow Copy mit Spread
obj1.value = 20;
console.log("obj1.value:", obj1.value); // 20
console.log("obj3.value:", obj3.value); // 10 (obj3 ist unabhängig!)

// 💡 WICHTIG FÜR REACT:
// Objekte und Arrays müssen kopiert werden für State-Updates!
// ❌ Schlecht: state.value = 10
// ✅ Gut: setState({ ...state, value: 10 })

// ============================================
// TYPEOF-OPERATOR
// ============================================

console.log("\n--- typeof Operator ---");

// Korrekte Ergebnisse:
console.log(typeof "Text"); // "string"
console.log(typeof 42); // "number"
console.log(typeof true); // "boolean"
console.log(typeof undefined); // "undefined"
console.log(typeof Symbol()); // "symbol"
console.log(typeof 123n); // "bigint"
console.log(typeof function () {}); // "function"

// ⚠️ QUIRKS - Besonderheiten:
console.log(typeof null); // ❌ "object" (Bug seit JavaScript 1.0!)
console.log(typeof []); // ❌ "object" (nicht "array"!)
console.log(typeof {}); // "object"

// BESSERE CHECKS:
console.log(null === null); // ✅ true
console.log(Array.isArray([])); // ✅ true (für Arrays)
console.log({}.constructor === Object); // ✅ true (für Objekte)

// ============================================
// DYNAMISCHE TYPISIERUNG
// ============================================

console.log("\n--- Dynamische Typisierung ---");

// JavaScript ist "loosely typed" - Variablen haben keine festen Typen!

let dynamisch = "Ich bin ein String";
console.log(dynamisch, typeof dynamisch); // "Ich bin ein String" "string"

dynamisch = 42; // ✅ Jetzt bin ich eine Zahl
console.log(dynamisch, typeof dynamisch); // 42 "number"

dynamisch = true; // ✅ Jetzt bin ich ein Boolean
console.log(dynamisch, typeof dynamisch); // true "boolean"

dynamisch = [1, 2, 3]; // ✅ Jetzt bin ich ein Array
console.log(dynamisch, typeof dynamisch); // [1, 2, 3] "object"

// Das ist MÄCHTIG aber auch GEFÄHRLICH:
let result = "5" + 5; // Was passiert hier?
console.log(result); // "55" (String-Konkatenation, nicht Addition!)

let result2 = "5" - 5; // Und hier?
console.log(result2); // 0 (Automatische Konvertierung zu Number!)

// TYPE COERCION (Automatische Typ-Umwandlung)
console.log("\n--- Type Coercion ---");
console.log("5" * 2); // 10 (String → Number)
console.log("5" / 2); // 2.5 (String → Number)
console.log("5" + 2); // "52" (Number → String) ⚠️
console.log(true + 1); // 2 (true = 1, false = 0)
console.log("test" - 1); // NaN (Kann nicht konvertieren)

// 💡 WICHTIG FÜR TYPESCRIPT:
// TypeScript verhindert diese Probleme durch statische Typen!
// TypeScript: let name: string = "Max"
// name = 42; // ❌ Error: Type 'number' is not assignable to type 'string'

// ============================================
// VARIABLEN-NAMING (Best Practices)
// ============================================

console.log("\n--- Naming Best Practices ---");

// ✅ GUT: Sprechende Namen
let benutzerAlter = 25;
let istAngemeldet = true;
let maximalerPreis = 99.99;

// ❌ SCHLECHT: Kryptische Namen
let x = 25; // Was ist x?
let f = true; // Was ist f?
let mp = 99.99; // Was ist mp?

// CONVENTIONS:
// camelCase für Variablen
let userName = "Max";
let userAge = 25;

// UPPER_CASE für Konstanten
const MAX_SIZE = 100;
const API_KEY = "abc123";
const DATABASE_URL = "mongodb://localhost";

// PascalCase für Klassen (später)
// class UserAccount {}

// ============================================
// ZUSAMMENFASSUNG
// ============================================

/*
VARIABLEN:
✅ Nutze IMMER const als Standard
✅ Nutze let nur wenn Neuzuweisung nötig
✅ Nutze NIEMALS var (Legacy!)
✅ let/const sind block-scoped, var ist function-scoped
✅ const verhindert Neuzuweisung, nicht Mutation

DATENTYPEN:
✅ 7 Primitive Typen: string, number, boolean, null, undefined, symbol, bigint
✅ Referenztypen: object, array, function
✅ typeof gibt den Typ zurück (mit Quirks bei null und arrays!)
✅ JavaScript ist dynamisch typisiert (Typen können sich ändern)
✅ Primitive werden kopiert, Objekte werden referenziert

PRIMITIVE vs. REFERENZTYPEN:
✅ Primitive: Wert wird kopiert (let y = x)
✅ Referenz: Pointer wird kopiert (beide zeigen auf gleiches Objekt)
✅ Objekte kopieren mit Spread: { ...obj } oder [...arr]

BEST PRACTICES:
✅ const für alles, was nicht neu zugewiesen wird
✅ Aussagekräftige Variablennamen (userName statt u)
✅ camelCase für Variablen
✅ UPPER_CASE für echte Konstanten (MAX_SIZE)
✅ Vorsicht bei automatischer Typ-Konvertierung!
✅ Arrays mit Array.isArray() prüfen, nicht typeof
✅ null explizit prüfen (value === null)

💡 WICHTIG FÜR REACT:
✅ const ist Standard in React
✅ Objekte/Arrays immer kopieren für State-Updates
✅ Spread-Operator (...) ist essentiell
✅ TypeScript verhindert Typ-Probleme
*/

console.log("\n✅ 1.2 Variablen & Datentypen abgeschlossen!");
