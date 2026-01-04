// ============================================
// 1.1 JAVASCRIPT SYNTAX & BASISWISSEN
// Vorbereitung für React
// ============================================

/*
🎯 LERNZIEL: Nach diesem Kapitel verstehst du die 4 kritischen Syntax-Konzepte,
die du für React JEDEN TAG brauchst.

Fokus: Nicht die ganze JavaScript-Syntax, sondern nur was für React wirklich wichtig ist.
*/

// ============================================
// KONZEPT 1: STATEMENTS vs EXPRESSIONS
// Der Unterschied, der in React alles ändert
// ============================================

/*
KERNPROBLEM: In React (JSX) kannst du nur Expressions verwenden, keine Statements!
LÖSUNG: Verstehe den Unterschied und schreibe React-kompatiblen Code

REGEL:
→ Statement = führt Aktion aus, gibt NICHTS zurück
→ Expression = ergibt einen WERT
→ JSX in React erlaubt nur Expressions in {}
*/

// ──────────── Statements (geben nichts zurück) ────────────
if (true) {
  console.log("Das ist ein Statement");
}

let x = 5; // Statement (Variable deklarieren)
x = x + 1; // Statement (Zuweisung)

// ──────────── Expressions (ergeben einen Wert) ────────────
let result = true ? "ja" : "nein"; // Ternärer Operator
let sum = 2 + 3; // Arithmetik
let isGreater = x > 5; // Vergleich
let name = "Max"; // Literal-Wert

// ──────────── Der kritische Unterschied für React ────────────
// ❌ GEHT NICHT in JSX:
// <div>
//   {if (isLoggedIn) { "Willkommen" }}    // Statement!
// </div>

// ✅ GEHT in JSX:
// <div>
//   {isLoggedIn ? "Willkommen" : "Bitte einloggen"}    // Expression!
// </div>

// ✅ Alternative mit && (auch Expression):
// <div>
//   {isLoggedIn && "Willkommen"}
// </div>

// 💡 WARUM IST DAS FÜR REACT WICHTIG?
// → JSX-Syntax: Alles in {} muss eine Expression sein
// → Conditional Rendering: Verwende ternären Operator oder &&
// → Keine if/else direkt in JSX möglich
// → Listen: map() ist Expression, for-Loop ist Statement

// ──────────── Praktische Beispiele ────────────
let count = 5;

// Statement (vor dem JSX):
let message;
if (count > 0) {
  message = "Items vorhanden";
} else {
  message = "Keine Items";
}

// Expression (direkt im JSX verwendbar):
let message2 = count > 0 ? "Items vorhanden" : "Keine Items";

// In React würdest du schreiben:
// <div>{count > 0 ? "Items vorhanden" : "Keine Items"}</div>

// ============================================
// KONZEPT 2: BLOCK SCOPE
// Warum let/const sich anders verhalten als gedacht
// ============================================

/*
KERNPROBLEM: let/const haben Block Scope, nicht Function Scope
LÖSUNG: Codeblöcke {} erzeugen eigene Gültigkeitsbereiche

REGEL:
→ {} = neuer Scope für let/const
→ Variable nur innerhalb des Blocks verfügbar
→ Nach } ist Variable "vergessen"
*/

// ──────────── Block Scope mit let/const ────────────
if (true) {
  let blockVar = "Nur hier";
  const blockConst = "Auch nur hier";
  console.log(blockVar); // ✅ "Nur hier"
}
// console.log(blockVar);         // ❌ ReferenceError

// ──────────── Vergleich: var hat Function Scope ────────────
if (true) {
  var functionVar = "Überall verfügbar";
}
console.log(functionVar); // ✅ "Überall verfügbar" (var ignoriert {})

// ⚠️ Deswegen: NIEMALS var verwenden, immer let/const!

// ──────────── Praktische Auswirkung ────────────
for (let i = 0; i < 3; i++) {
  console.log("Loop:", i); // ✅ 0, 1, 2
}
// console.log(i);                // ❌ ReferenceError

// Mit var wäre i hier noch verfügbar (unerwünschtes Verhalten!)

// ──────────── Verschachtelte Scopes ────────────
let outer = "Außen";

if (true) {
  let inner = "Innen";
  console.log(outer); // ✅ Zugriff von innen nach außen
  console.log(inner); // ✅ "Innen"
}

// console.log(inner);            // ❌ Kein Zugriff von außen nach innen

// 💡 WARUM IST DAS FÜR REACT WICHTIG?
// → Komponenten-Variablen haben eigenen Scope
// → Hooks (useState, useEffect) erzeugen Closures
// → Event-Handler greifen auf Component-Scope zu
// → Vermeide var komplett (veraltete Syntax)

// ============================================
// KONZEPT 3: CASE SENSITIVITY
// Warum userName ≠ username
// ============================================

/*
KERNPROBLEM: JavaScript unterscheidet STRENG zwischen Groß-/Kleinschreibung
LÖSUNG: Konsistente Naming Conventions verwenden

REGEL:
→ camelCase für Variablen/Funktionen (Standard)
→ PascalCase für Komponenten/Klassen
→ UPPER_CASE für Konstanten
*/

// ──────────── Verschiedene Variablen! ────────────
let username = "Max";
let userName = "Anna";
let UserName = "Tom";

console.log(username); // "Max"
console.log(userName); // "Anna"
console.log(UserName); // "Tom"

// ──────────── Häufiger Fehler ────────────
let myArray = [1, 2, 3];
// console.log(myarray);         // ❌ ReferenceError: myarray is not defined

// ──────────── Naming Conventions ────────────

// camelCase: Variablen, Funktionen
let firstName = "Max";
let userAge = 30;
function getUserData() {
  return { firstName, userAge };
}

// PascalCase: Klassen, React-Komponenten
class UserAccount {
  constructor(name) {
    this.name = name;
  }
}
// In React: function UserProfile() { ... }

// UPPER_CASE: Echte Konstanten (Konfiguration)
const MAX_RETRIES = 3;
const API_URL = "https://api.example.com";

// ⚠️ NICHT verwenden in JavaScript:
// let user-name = "Max";        // ❌ SyntaxError (- ist Operator!)

// ✅ Stattdessen:
let user_name = "Max"; // snake_case (in JS unüblich)
let userName2 = "Max"; // camelCase (Standard!)

// 💡 WARUM IST DAS FÜR REACT WICHTIG?
// → React-Komponenten MÜSSEN mit Großbuchstaben beginnen
// → <UserProfile /> ist Komponente
// → <userProfile /> wird als HTML-Tag interpretiert (Fehler!)
// → Props und State: immer camelCase
// → CSS-Klassen in JSX: className (nicht class)

// ============================================
// KONZEPT 4: SEMIKOLONS & ASI
// Wann du sie brauchst (und wann nicht)
// ============================================

/*
KERNPROBLEM: JavaScript hat ASI (Automatic Semicolon Insertion)
LÖSUNG: Verstehe die Regeln oder verwende immer Semikolons

REGEL:
→ JavaScript fügt Semikolons automatisch ein
→ ABER: Bei [, (, `, +, - am Zeilenanfang gibt es Probleme
→ Beste Praxis: Konsistent sein (entweder immer oder nie)
*/

// ──────────── Funktioniert (ASI ergänzt ;) ────────────
let a = 5;
let b = 10;
console.log(a + b); // 15 (funktioniert!)

// ──────────── Problem-Fall 1: Array am Zeilenanfang ────────────
let c = 5;
// [1, 2, 3].forEach(n => console.log(n))  // ❌ Error!
// JavaScript interpretiert: let c = 5[1, 2, 3]

// ✅ Lösung: Semikolon verwenden
let d = 5;
[1, 2, 3].forEach((n) => console.log(n));

// ──────────── Problem-Fall 2: Funktionsaufruf ────────────
let func = () => "test";
// (5 + 3).toString()            // ❌ Error!
// JavaScript interpretiert: func()(5 + 3).toString()

// ✅ Lösung: Semikolon verwenden
let func2 = () => "test";
(5 + 3).toString();

// ──────────── Modern: Prettier/ESLint entscheiden lassen ────────────
// Viele Teams verwenden Prettier, der automatisch formatiert
// Dann ist die Regel: "Was Prettier macht, ist richtig"

// 💡 WARUM IST DAS FÜR REACT WICHTIG?
// → JSX kann mehrzeilig sein - ASI kann verwirren
// → Prettier fügt automatisch Semikolons hinzu (Standard in React-Projekten)
// → Konsistenz wichtiger als ob mit oder ohne
// → In diesem Kurs: Mit Semikolons (wie in den meisten React-Tutorials)

// ============================================
// BONUS: KOMMENTARE (Kurz & prägnant)
// ============================================

// Einzeiliger Kommentar

/* 
   Mehrzeiliger Kommentar
   für längere Erklärungen
*/

/**
 * JSDoc-Kommentar (für TypeScript/Dokumentation)
 * @param {string} name - Parameter-Beschreibung
 * @returns {string} Return-Beschreibung
 */
function greet(name) {
  return `Hallo ${name}`;
}

// ❌ SCHLECHT: Offensichtliches kommentieren
let age = 25; // Setze age auf 25

// ✅ GUT: Warum, nicht was
let age2 = 25; // Minderjährige ausschließen

// TODO: Später optimieren
// FIXME: Bug bei negativen Werten
// HACK: Temporäre Lösung

// ============================================
// ZUSAMMENFASSUNG
// Die 4 kritischen Konzepte
// ============================================

/*
┌─────────────────────────────────────────────────────────────┐
│ 1. STATEMENTS vs EXPRESSIONS                                │
├─────────────────────────────────────────────────────────────┤
│ JSX erlaubt nur Expressions     │ {true ? "A" : "B"}       │
│ if/else sind Statements          │ Verwende ternär/&&       │
│ map() ist Expression             │ for-Loop ist Statement   │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ 2. BLOCK SCOPE                                              │
├─────────────────────────────────────────────────────────────┤
│ let/const haben Block Scope     │ Nur in {} verfügbar      │
│ var hat Function Scope           │ NIEMALS verwenden!       │
│ Verschachtelte Scopes möglich    │ Innen → außen ok         │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ 3. CASE SENSITIVITY                                         │
├─────────────────────────────────────────────────────────────┤
│ camelCase: Variablen/Funktionen │ userName, getUserData    │
│ PascalCase: Komponenten/Klassen │ UserProfile, Button      │
│ UPPER_CASE: Konstanten          │ MAX_SIZE, API_URL        │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ 4. SEMIKOLONS & ASI                                         │
├─────────────────────────────────────────────────────────────┤
│ Optional durch ASI              │ let a = 5 funktioniert   │
│ Problem bei [, (, `, +, -       │ Immer ; verwenden!       │
│ In React: Prettier entscheidet  │ Konsistenz wichtiger     │
└─────────────────────────────────────────────────────────────┘


HÄUFIGE FEHLER (und wie man sie vermeidet):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
❌ if in JSX verwenden             → Verwende ternär: {x ? "A" : "B"}
❌ var statt let/const              → IMMER let/const verwenden
❌ username vs userName verwechseln → Konsistent camelCase verwenden
❌ Komponente klein schreiben       → <UserProfile /> nicht <userProfile />
❌ Semikolon vor [ vergessen        → Prettier konfigurieren oder immer ;


DEBUGGING-TIPPS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
→ ReferenceError: Variable nicht definiert → Case-Sensitivity prüfen
→ SyntaxError bei [: Semikolon davor fehlt
→ JSX rendert nichts: Statement statt Expression verwendet
→ Variable undefined: Außerhalb des Scopes zugegriffen


VORBEREITUNG FÜR REACT:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Diese Syntax-Konzepte wirst du in React JEDEN TAG verwenden:

→ Expressions in JSX: {isLoggedIn ? <Profile /> : <Login />}
→ Block Scope bei Hooks: useState erzeugt eigenen Scope
→ PascalCase: Alle Komponenten müssen großgeschrieben sein
→ Semikolons: Prettier fügt sie automatisch hinzu (Standard)

Merke: JavaScript-Grundlagen ERST verstehen, dann React lernen!
In React kombinierst du alle diese Konzepte gleichzeitig.
*/

console.log("\n✅ Syntax & Basiswissen abgeschlossen!");
console.log("💡 Diese 4 Konzepte sind deine Basis für React-Code!");
