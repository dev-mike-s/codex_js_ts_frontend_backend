// ============================================
// 1.2 VARIABLEN & DATENTYPEN
// Vorbereitung für React
// ============================================

/*
🎯 LERNZIEL: Nach diesem Kapitel verstehst du die 5 kritischen Konzepte
über Variablen und Typen, die du für React JEDEN TAG brauchst.

Fokus: const/let richtig verwenden + Primitive vs. Referenztypen verstehen
*/

// ============================================
// KONZEPT 1: CONST vs LET
// Die einzige Wahl, die du treffen musst
// ============================================

/*
KERNPROBLEM: Wann verwende ich const, wann let?
LÖSUNG: Default zu const, nur bei Reassignment let

REGEL:
→ const für ALLES (Standard!)
→ let nur wenn Neuzuweisung nötig (Counter, Loops)
→ var NIEMALS verwenden (veraltete Syntax)
*/

// ──────────── const - Der Standard ────────────
const username = "Max";
const items = [1, 2, 3];
const user = { name: "Max", age: 25 };

// username = "Anna";              // ❌ TypeError: Assignment to constant variable

// ⚠️ ABER: Objekt-Inhalte ändern ist OK!
items.push(4); // ✅ [1, 2, 3, 4]
user.age = 26; // ✅ { name: "Max", age: 26 }
console.log(items, user);

// const schützt vor Neuzuweisung, NICHT vor Mutation!

// ──────────── let - Nur bei Reassignment ────────────
let count = 0;
count = count + 1; // ✅ Reassignment
count++; // ✅ Reassignment
console.log(count); // 2

let message = "Hallo";
message = "Tschüss"; // ✅ Reassignment
console.log(message);

// ──────────── var - NIEMALS verwenden! ────────────
// var hat verwirrende Scope-Regeln (ignoriert {})
{
  var leaky = "Ich lecke aus dem Block!";
}
console.log(leaky); // ✅ Funktioniert (SCHLECHT!)

{
  let safe = "Ich bleibe im Block";
}
// console.log(safe);              // ❌ ReferenceError (GUT!)

// 💡 WARUM IST DAS FÜR REACT WICHTIG?
// → Props sind immer const (werden nie neu zugewiesen)
// → State wird mit setState geändert (nie direkt let count++)
// → Komponenten-Variablen meist const
// → let nur in Event-Handlern oder temporären Berechnungen

// ============================================
// KONZEPT 2: PRIMITIVE vs REFERENZTYPEN
// Der kritischste Unterschied in JavaScript
// ============================================

/*
KERNPROBLEM: Primitive werden kopiert, Objekte werden referenziert
LÖSUNG: Verstehe den Unterschied und kopiere Objekte bewusst

REGEL:
→ Primitive: Wert wird kopiert (unabhängig)
→ Referenz: Pointer wird kopiert (beide zeigen auf dasselbe)
→ Objekte/Arrays immer mit Spread kopieren: {...obj}, [...arr]
*/

// ──────────── Primitive werden kopiert ────────────
let x = 5;
let y = x; // y bekommt KOPIE von 5
x = 10;

console.log(x); // 10
console.log(y); // 5 (bleibt unverändert!)

// ──────────── Referenztypen werden referenziert ────────────
let obj1 = { value: 5 };
let obj2 = obj1; // obj2 zeigt auf DASSELBE Objekt!
obj1.value = 10;

console.log(obj1.value); // 10
console.log(obj2.value); // 10 (wurde auch geändert!)

// ──────────── Objekte richtig kopieren ────────────
let original = { name: "Max", age: 25 };
let copy = { ...original }; // Shallow Copy mit Spread

original.age = 30;
console.log(original.age); // 30
console.log(copy.age); // 25 (unabhängig!)

// Arrays auch mit Spread kopieren
let arr1 = [1, 2, 3];
let arr2 = [...arr1]; // Kopie, nicht Referenz
arr1.push(4);

console.log(arr1); // [1, 2, 3, 4]
console.log(arr2); // [1, 2, 3]

// ⚠️ VORSICHT: Shallow Copy nur für 1 Ebene!
let nested = { user: { name: "Max" } };
let shallowCopy = { ...nested };
shallowCopy.user.name = "Anna"; // Ändert beide!

console.log(nested.user.name); // "Anna" (auch geändert!)

// Für Deep Copy: structuredClone() oder Bibliothek
let deepCopy = structuredClone(nested);
deepCopy.user.name = "Tom";
console.log(nested.user.name); // "Anna" (unverändert!)

// 💡 WARUM IST DAS FÜR REACT WICHTIG?
// → State NIEMALS direkt mutieren!
// → Immer neue Objekte/Arrays erstellen mit Spread
// → React erkennt Änderungen nur bei neuer Referenz
// → const user = {...state, name: "Neu"} ist das Standard-Pattern

// ============================================
// KONZEPT 3: DIE 7 PRIMITIVEN TYPEN
// Was du wirklich wissen musst
// ============================================

/*
KERNPROBLEM: JavaScript hat viele Typen mit Sonderfällen
LÖSUNG: Kenne die 7 Primitiven + ihre Besonderheiten

REGEL:
→ Primitive: string, number, boolean, null, undefined, symbol, bigint
→ Alles andere ist Object (Arrays, Functions, etc.)
→ typeof hat Quirks (null, arrays)
*/

// ──────────── string - Text ────────────
const text = "Hallo";
const template = `Wert: ${text}`; // Template Literals
console.log(typeof text); // "string"

// ──────────── number - Zahlen (Int + Float) ────────────
const integer = 42;
const float = 3.14;
const negative = -100;
console.log(typeof integer); // "number"

// Spezielle Werte:
console.log(typeof Infinity); // "number"
console.log(typeof NaN); // "number" (Not a Number ist number!)

// ──────────── boolean - true/false ────────────
const isActive = true;
const isDisabled = false;
console.log(typeof isActive); // "boolean"

// ──────────── null - absichtlich leer ────────────
const empty = null;
console.log(empty); // null
console.log(typeof empty); // "object" ❌ (bekannter Bug!)

// ──────────── undefined - nicht initialisiert ────────────
let notSet;
console.log(notSet); // undefined
console.log(typeof notSet); // "undefined"

// Unterschied null vs undefined:
let explicitEmpty = null; // "Ich will, dass das leer ist"
let notInitialized; // "Wurde noch nicht gesetzt"

// ──────────── symbol - einzigartige Identifier (selten) ────────────
const sym1 = Symbol("id");
const sym2 = Symbol("id");
console.log(sym1 === sym2); // false (jedes Symbol ist unique)

// ──────────── bigint - sehr große Ganzzahlen (selten) ────────────
const big = 1234567890123456789012345678901234567890n; // Beachte 'n'
console.log(typeof big); // "bigint"

// 💡 WARUM IST DAS FÜR REACT WICHTIG?
// → Props haben diese Typen (string, number, boolean meist)
// → null/undefined: optionale Props oder fehlende Daten
// → typeof für Typ-Prüfungen in Komponenten
// → TypeScript macht Typen explizit: prop: string

// ============================================
// KONZEPT 4: TYPEOF & TYP-PRÜFUNGEN
// Wie du Typen richtig prüfst
// ============================================

/*
KERNPROBLEM: typeof hat Quirks und ist nicht immer zuverlässig
LÖSUNG: Kenne die besseren Alternativen

REGEL:
→ typeof für Primitive (außer null)
→ Array.isArray() für Arrays
→ value === null für null
→ value === undefined für undefined (oder !value)
*/

// ──────────── typeof funktioniert gut für: ────────────
console.log(typeof "text"); // "string" ✅
console.log(typeof 42); // "number" ✅
console.log(typeof true); // "boolean" ✅
console.log(typeof undefined); // "undefined" ✅

// ──────────── typeof hat Probleme bei: ────────────
console.log(typeof null); // "object" ❌ Bug!
console.log(typeof []); // "object" ❌ Nicht "array"!
console.log(typeof {}); // "object" ✅

// ──────────── Bessere Alternativen: ────────────

// Für null:
const checkNull = null;
console.log(checkNull === null); // ✅ true

// Für Arrays:
const arr = [1, 2, 3];
console.log(Array.isArray(arr)); // ✅ true

// Für undefined:
const notDefined = undefined;
console.log(notDefined === undefined); // ✅ true
console.log(!notDefined); // ✅ true (auch für null!)

// 💡 WARUM IST DAS FÜR REACT WICHTIG?
// → Props-Validierung: if (typeof prop !== "string")
// → Conditional Rendering: if (Array.isArray(items))
// → Optional Chaining: user?.name (verhindert Fehler bei null/undefined)
// → Nullish Coalescing: value ?? "default" (nur bei null/undefined)

// ============================================
// KONZEPT 5: TYPE COERCION
// Warum "5" + 5 = "55" ist
// ============================================

/*
KERNPROBLEM: JavaScript konvertiert Typen automatisch (manchmal überraschend)
LÖSUNG: Verstehe die Regeln und konvertiere explizit

REGEL:
→ + mit String → String-Verkettung
→ -, *, /, % → Number-Konvertierung
→ Explizite Konvertierung: Number(), String(), Boolean()
*/

// ──────────── Automatische Konvertierung ────────────
console.log("5" + 5); // "55" (Number → String)
console.log("5" - 5); // 0 (String → Number)
console.log("5" * 2); // 10 (String → Number)
console.log(true + 1); // 2 (true = 1)
console.log("test" - 1); // NaN (kann nicht konvertieren)

// ──────────── Explizite Konvertierung (besser!) ────────────
const userInput = "42";

// Zu Number:
console.log(Number(userInput)); // 42
console.log(+userInput); // 42 (Kurzform mit unary +)
console.log(parseInt(userInput)); // 42 (für Integer)
console.log(parseFloat("3.14")); // 3.14 (für Floats)

// Zu String:
console.log(String(42)); // "42"
console.log((42).toString()); // "42"
console.log(`${42}`); // "42" (in Template)

// Zu Boolean:
console.log(Boolean(1)); // true
console.log(Boolean(0)); // false
console.log(!!1); // true (double negation)

// ──────────── Falsy Werte (werden zu false) ────────────
// false, 0, "", null, undefined, NaN
console.log(Boolean(false)); // false
console.log(Boolean(0)); // false
console.log(Boolean("")); // false
console.log(Boolean(null)); // false
console.log(Boolean(undefined)); // false
console.log(Boolean(NaN)); // false

// Alles andere ist truthy:
console.log(Boolean("0")); // true (String!)
console.log(Boolean([])); // true (Array!)
console.log(Boolean({})); // true (Objekt!)

// 💡 WARUM IST DAS FÜR REACT WICHTIG?
// → Form-Inputs sind immer Strings: Number(e.target.value)
// → Conditional Rendering: {count > 0 && <Component />}
// → Falsy-Check: {items.length && <List />} kann 0 rendern!
// → Besser: {items.length > 0 && <List />}

// ============================================
// ZUSAMMENFASSUNG
// Die 5 kritischen Konzepte
// ============================================

/*
┌─────────────────────────────────────────────────────────────┐
│ 1. CONST vs LET                                             │
├─────────────────────────────────────────────────────────────┤
│ const ist Standard               │ const user = { ... }     │
│ let nur bei Reassignment         │ let count = 0; count++   │
│ var NIEMALS verwenden            │ Veraltete Syntax         │
│ const schützt nicht vor Mutation │ obj.prop = "neu" ist ok  │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ 2. PRIMITIVE vs REFERENZTYPEN                               │
├─────────────────────────────────────────────────────────────┤
│ Primitive: Wert kopiert          │ let y = x                │
│ Referenz: Pointer kopiert        │ obj2 zeigt auf obj1      │
│ Objekte kopieren mit Spread      │ {...obj}, [...arr]       │
│ Shallow Copy nur 1 Ebene         │ Nested braucht Deep Copy │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ 3. DIE 7 PRIMITIVEN TYPEN                                   │
├─────────────────────────────────────────────────────────────┤
│ string, number, boolean          │ Häufigste Typen          │
│ null, undefined                  │ "Leer" vs "Nicht gesetzt"│
│ symbol, bigint                   │ Selten verwendet         │
│ Alles andere: Object             │ Arrays, Functions, etc.  │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ 4. TYPEOF & TYP-PRÜFUNGEN                                   │
├─────────────────────────────────────────────────────────────┤
│ typeof für Primitive             │ typeof "text" = "string" │
│ typeof null ist "object"         │ ❌ Bekannter Bug!        │
│ Array.isArray() für Arrays       │ Nicht typeof!            │
│ value === null für null          │ Explizite Prüfung        │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ 5. TYPE COERCION                                            │
├─────────────────────────────────────────────────────────────┤
│ + mit String = Verkettung        │ "5" + 5 = "55"           │
│ -, *, / = Number-Konvertierung   │ "5" - 5 = 0              │
│ Explizit konvertieren besser     │ Number(), String()       │
│ Falsy: false,0,"",null,undef,NaN │ Alles andere: truthy     │
└─────────────────────────────────────────────────────────────┘


HÄUFIGE FEHLER (und wie man sie vermeidet):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
❌ let für alles verwenden          → const als Default
❌ Objekte direkt mutieren          → Immer mit Spread kopieren
❌ typeof für Arrays                → Array.isArray() verwenden
❌ typeof für null                  → value === null verwenden
❌ "5" + 5 erwarten 10             → Number("5") + 5 oder +"5" + 5
❌ Shallow Copy bei nested Objects  → structuredClone() verwenden


DEBUGGING-TIPPS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
→ typeof prüfen:                    console.log(typeof value)
→ Ist es Array?:                    console.log(Array.isArray(value))
→ Wert UND Typ ausgeben:            console.log(value, typeof value)
→ Objekt-Referenz prüfen:           console.log(obj1 === obj2)
→ Falsy-Check:                      console.log(!!value)


VORBEREITUNG FÜR REACT:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Diese Konzepte wirst du in React JEDEN TAG verwenden:

→ const für Props und State:        const [count, setCount] = useState(0)
→ Spread für State-Updates:         setState({...state, name: "Neu"})
→ Spread für Array-Updates:         setItems([...items, newItem])
→ Typ-Prüfungen in Komponenten:     if (typeof prop === "string")
→ Form-Input konvertieren:          Number(e.target.value)
→ Conditional Rendering:            {items.length > 0 && <List />}

Merke: State NIEMALS direkt mutieren!
❌ state.count++, items.push()
✅ setState({...state, count: state.count + 1}), setItems([...items, newItem])
*/

console.log("\n✅ Variablen & Datentypen abgeschlossen!");
console.log("💡 Diese 5 Konzepte sind die Basis für React State Management!");
