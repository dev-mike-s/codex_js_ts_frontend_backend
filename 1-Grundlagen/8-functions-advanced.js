// ============================================
// FUNCTIONS ADVANCED
// Vorbereitung für React
// ============================================

/*
🎯 LERNZIEL: Fortgeschrittene Function-Konzepte verstehen,
die deinen React-Code besser machen.

Fokus: Pure Functions, Higher-Order Functions, Function Types
*/

// ============================================
// KONZEPT 1: PURE FUNCTIONS
// Das React-Prinzip
// ============================================

/*
KERNPROBLEM: Funktionen mit Seiteneffekten sind schwer zu testen/debuggen
LÖSUNG: Pure Functions = Gleicher Input → Gleicher Output, keine Seiteneffekte

REGEL:
→ Keine Änderungen außerhalb der Funktion
→ Kein Zugriff auf externe Variablen (außer Read-Only)
→ Kein console.log, fetch, DOM-Manipulation
→ Immer gleiche Ausgabe bei gleicher Eingabe
*/

// ──────────── Impure Function (SCHLECHT) ────────────
let counter = 0;

function incrementImpure() {
    counter++;                        // ❌ Ändert externe Variable
    return counter;
}

console.log(incrementImpure());     // 1
console.log(incrementImpure());     // 2 (unterschiedliches Ergebnis!)

// ──────────── Pure Function (GUT) ────────────
function incrementPure(value) {
    return value + 1;                 // ✅ Keine Seiteneffekte
}

console.log(incrementPure(0));      // 1
console.log(incrementPure(0));      // 1 (immer gleiches Ergebnis!)

// ──────────── Praktische Beispiele ────────────

// ❌ IMPURE: Ändert Original-Array
const addItemImpure = (arr, item) => {
    arr.push(item);                   // ❌ Mutation!
    return arr;
};

// ✅ PURE: Erstellt neues Array
const addItemPure = (arr, item) => {
    return [...arr, item];            // ✅ Immutable
};

const items = [1, 2, 3];
const newItems = addItemPure(items, 4);
console.log(items);                 // [1, 2, 3] (unverändert)
console.log(newItems);              // [1, 2, 3, 4]

// ──────────── Objekte Pure behandeln ────────────

// ❌ IMPURE
const updateUserImpure = (user, age) => {
    user.age = age;                   // ❌ Mutation!
    return user;
};

// ✅ PURE
const updateUserPure = (user, age) => {
    return { ...user, age };          // ✅ Neues Objekt
};

const user = { name: "Max", age: 25 };
const updatedUser = updateUserPure(user, 26);
console.log(user.age);              // 25 (unverändert)
console.log(updatedUser.age);       // 26

// ──────────── Warum Pure Functions? ────────────

// Vorteile:
// 1. Vorhersehbar (gleicher Input = gleicher Output)
// 2. Testbar (keine externen Abhängigkeiten)
// 3. Cacheable (Ergebnis kann gespeichert werden)
// 4. Parallelisierbar (keine Race Conditions)

// Beispiel: Caching
const cache = {};

const expensiveCalculation = (n) => {
    if (cache[n]) {
        console.log("Aus Cache");
        return cache[n];
    }

    console.log("Berechne...");
    const result = n * n;             // Simuliere teure Operation
    cache[n] = result;
    return result;
};

console.log(expensiveCalculation(5)); // "Berechne..." → 25
console.log(expensiveCalculation(5)); // "Aus Cache" → 25

// 💡 WARUM IST DAS FÜR REACT WICHTIG?
// → React Components sollten pure sein
// → Props → JSX (keine Seiteneffekte im Render)
// → State-Updates: Immer neue Objekte/Arrays
// → useMemo nutzt Pure Functions für Caching
// → Reducer müssen pure sein (Redux/useReducer)


// ============================================
// KONZEPT 2: HIGHER-ORDER FUNCTIONS
// Funktionen die Funktionen nehmen/returnen
// ============================================

/*
KERNPROBLEM: Code-Duplikation bei ähnlichen Funktionen
LÖSUNG: Higher-Order Functions (HOF) = Funktionen als Parameter/Return

REGEL:
→ Nimmt Funktion als Parameter ODER
→ Gibt Funktion zurück
→ map, filter, reduce sind HOFs
→ Ermöglicht Code-Wiederverwendung
*/

// ──────────── Funktion als Parameter ────────────

// HOF: Nimmt Callback-Funktion
const repeat = (n, action) => {
    for (let i = 0; i < n; i++) {
        action(i);
    }
};

// Verschiedene Actions
repeat(3, (i) => console.log(`Durchlauf ${i}`));
repeat(5, (i) => console.log(`Nummer: ${i * 2}`));

// ──────────── Funktion returnen ────────────

// HOF: Gibt Funktion zurück
const multiplyBy = (factor) => {
    return (number) => number * factor;
};

const double = multiplyBy(2);
const triple = multiplyBy(3);

console.log(double(5));             // 10
console.log(triple(5));             // 15

// Kürzer mit Implicit Return
const multiplyByShort = (factor) => (number) => number * factor;

// ──────────── Praktisch: Logger erstellen ────────────
const createLogger = (prefix) => {
    return (message) => {
        console.log(`[${prefix}] ${message}`);
    };
};

const errorLog = createLogger("ERROR");
const infoLog = createLogger("INFO");

errorLog("Something went wrong");   // [ERROR] Something went wrong
infoLog("User logged in");          // [INFO] User logged in

// ──────────── Array HOFs (die du kennst!) ────────────
const numbers = [1, 2, 3, 4, 5];

// map ist eine HOF (nimmt Funktion als Parameter)
const doubled = numbers.map((n) => n * 2);

// filter ist eine HOF
const evens = numbers.filter((n) => n % 2 === 0);

// reduce ist eine HOF
const sum = numbers.reduce((acc, n) => acc + n, 0);

// ──────────── Eigene HOF erstellen ────────────

// HOF für Array-Transformation mit Logging
const mapWithLog = (arr, transformFn) => {
    console.log("Start mapping...");
    const result = arr.map((item, index) => {
        const transformed = transformFn(item);
        console.log(`${index}: ${item} → ${transformed}`);
        return transformed;
    });
    console.log("Done!");
    return result;
};

mapWithLog([1, 2, 3], (n) => n * 2);

// ──────────── Function Composition ────────────

// Mehrere Funktionen kombinieren
const addOne = (x) => x + 1;
const double2 = (x) => x * 2;
const square = (x) => x * x;

// Manuell
const result1 = square(double2(addOne(3)));
console.log(result1);               // 64 ((3+1)*2)² = 8² = 64

// Als HOF
const compose = (...fns) => (x) => {
    return fns.reduceRight((acc, fn) => fn(acc), x);
};

const process = compose(square, double2, addOne);
console.log(process(3));            // 64

// 💡 WARUM IST DAS FÜR REACT WICHTIG?
// → map, filter, reduce verstehen
// → Custom Hooks sind HOFs
// → Event-Handler Factories: createHandler(id)
// → Middleware in Redux sind HOFs
// → HOCs (Higher-Order Components) nutzen Konzept


// ============================================
// KONZEPT 3: FUNCTION DECLARATION vs EXPRESSION
// Syntax-Unterschiede verstehen
// ============================================

/*
KERNPROBLEM: Verschiedene Arten Funktionen zu schreiben
LÖSUNG: Verstehe Unterschiede und wähle passende

REGEL:
→ Declaration: function name() {} (gehoisted)
→ Expression: const name = function() {} (nicht gehoisted)
→ Arrow: const name = () => {} (modern, nicht gehoisted)
*/

// ──────────── Function Declaration ────────────
function greet1(name) {
    return `Hello ${name}`;
}

// Kann vor Definition aufgerufen werden (Hoisting)
console.log(sayHi());               // ✅ Funktioniert

function sayHi() {
    return "Hi!";
}

// ──────────── Function Expression ────────────
const greet2 = function (name) {
    return `Hello ${name}`;
};

// Kann NICHT vor Definition aufgerufen werden
// console.log(sayBye());           // ❌ ReferenceError

const sayBye = function () {
    return "Bye!";
};

// ──────────── Arrow Function (Expression) ────────────
const greet3 = (name) => `Hello ${name}`;

// Auch nicht gehoisted
// console.log(wave());             // ❌ ReferenceError

const wave = () => "👋";

// ──────────── Wann was verwenden? ────────────

// ✅ Arrow Functions (EMPFOHLEN in React)
const Button = ({ text }) => <button>{text}</button>;
const double3 = (x) => x * 2;

// ✅ Function Declaration (für Utilities)
function calculateTax(amount) {
    return amount * 0.19;
}

// ❌ Function Expression (selten nötig)
const greet4 = function (name) {
    return `Hello ${name}`;
};

// In React: IMMER Arrow Functions für Components!

// 💡 WARUM IST DAS FÜR REACT WICHTIG?
// → Arrow Functions sind Standard
// → Keine `this` Probleme
// → Konsistente Syntax
// → Modern und clean


// ============================================
// BONUS: CLOSURES
// Funktionen "erinnern" sich an Scope
// ============================================

/*
KERNPROBLEM: Wie funktionieren Hooks intern?
LÖSUNG: Closures = Funktion hat Zugriff auf äußeren Scope

REGEL:
→ Innere Funktion kann auf äußere Variablen zugreifen
→ Variablen bleiben "am Leben"
→ Basis für useState, useEffect
*/

// ──────────── Basis-Closure ────────────
function outer() {
    const message = "Hello";          // Äußere Variable

    function inner() {
        console.log(message);           // Zugriff auf äußere Variable
    }

    return inner;
}

const innerFn = outer();
innerFn();                          // "Hello" (message ist noch da!)

// ──────────── Praktisch: Counter mit Closure ────────────
function createCounter() {
    let count = 0;                    // Private Variable

    return {
        increment: () => ++count,
        decrement: () => --count,
        getCount: () => count
    };
}

const counter = createCounter();
console.log(counter.increment());   // 1
console.log(counter.increment());   // 2
console.log(counter.getCount());    // 2
// console.log(counter.count);      // undefined (privat!)

// ──────────── React useState Simulation ────────────
function createState(initialValue) {
    let value = initialValue;         // Closure-Variable

    const getValue = () => value;
    const setValue = (newValue) => {
        value = newValue;
    };

    return [getValue, setValue];
}

const [getCount, setCount] = createState(0);
console.log(getCount());            // 0
setCount(5);
console.log(getCount());            // 5

// So funktioniert useState intern!

// 💡 WARUM IST DAS FÜR REACT WICHTIG?
// → useState nutzt Closures intern
// → useEffect Cleanup nutzt Closures
// → Event-Handler haben Closure über Props/State
// → Custom Hooks nutzen Closures


// ============================================
// ZUSAMMENFASSUNG
// Die 3 wichtigen Konzepte
// ============================================

/*
┌─────────────────────────────────────────────────────────────┐
│ 1. PURE FUNCTIONS                                           │
├─────────────────────────────────────────────────────────────┤
│ Gleicher Input = Gleicher Output   │ Vorhersehbar         │
│ Keine Seiteneffekte                 │ Keine Mutations      │
│ Immer neue Objekte/Arrays           │ {...obj}, [...arr]   │
│ React-Prinzip                       │ Components = Pure    │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ 2. HIGHER-ORDER FUNCTIONS                                   │
├─────────────────────────────────────────────────────────────┤
│ Nimmt Funktion als Parameter        │ map, filter, reduce  │
│ Gibt Funktion zurück                │ createHandler(id)    │
│ Code-Wiederverwendung               │ DRY-Prinzip          │
│ Basis für Custom Hooks              │ useCustomHook()      │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ 3. FUNCTION TYPES                                           │
├─────────────────────────────────────────────────────────────┤
│ Arrow: const fn = () => {}          │ Standard in React    │
│ Declaration: function fn() {}       │ Hoisting             │
│ Expression: const fn = function()   │ Selten               │
│ In React: Immer Arrow!              │ Konsistent           │
└─────────────────────────────────────────────────────────────┘


HÄUFIGE FEHLER (und wie man sie vermeidet):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
❌ arr.push(item) in Funktion        → Mutation! Verwende [...arr, item]
❌ obj.prop = value                  → Mutation! Verwende {...obj, prop: value}
❌ console.log in Pure Function      → Seiteneffekt! Für Debug ok
❌ Externe Variable ändern           → Nicht pure! Parameter verwenden
❌ function in React Component       → Verwende Arrow Functions


DEBUGGING-TIPPS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
→ Unerwartetes Verhalten:           Ist Funktion pure?
→ State ändert sich nicht:          Hast du mutiert statt neu erstellt?
→ Closure-Bug:                      Welche Variablen sind captured?
→ HOF nicht verstanden:             Schritt für Schritt durchgehen


VORBEREITUNG FÜR REACT:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Diese Konzepte machen deinen React-Code besser:

→ Pure Components:                  const Button = ({ text }) => <button>{text}</button>
→ Immutable Updates:                setState({...state, count: state.count + 1})
→ Array HOFs:                       items.filter(i => i.active).map(i => <Item {...i} />)
→ Custom Hooks:                     const useUser = (id) => { 
→ Event Factories: const createHandler = (id) => () => delete (id)

BEST PRACTICES:
→ Components sollten pure sein(Props → JSX)
→ State NIEMALS direkt mutieren
→ Array - Methoden statt Loops
→ Arrow Functions für alles
→ Closures verstehen(für Hooks)

WICHTIGSTE REGEL:
Denke funktional, nicht imperativ!
    - Neue Werte erstellen statt ändern
        - Funktionen kombinieren(compose)
            - Pure Functions bevorzugen
                - Immutability als Standard
*/

console.log("\n✅ Functions Advanced abgeschlossen!");
console.log("💡 Pure Functions und HOFs machen deinen React-Code robust und wartbar!");