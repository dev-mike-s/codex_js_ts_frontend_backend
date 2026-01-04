// ============================================
// ARROW FUNCTIONS
// Vorbereitung für React
// ============================================

/*
🎯 LERNZIEL: Nach diesem Kapitel beherrschst du Arrow Functions,
die du in React JEDEN TAG verwendest.

Fokus: Syntax, Implicit Return, Destructuring, Callbacks
*/

// ============================================
// KONZEPT 1: ARROW FUNCTION SYNTAX
// Die moderne Standard-Syntax
// ============================================

/*
KERNPROBLEM: function-Keyword ist umständlich und hat Probleme mit `this`
LÖSUNG: Arrow Functions sind kürzer und haben vorhersehbares `this`

REGEL:
→ const name = () => {} (Standard in React)
→ Kein `this` Binding (perfekt für React)
→ Kürzere Syntax für Callbacks
→ Impliziter Return möglich
*/

// ──────────── Alte Syntax (function) ────────────
function add(a, b) {
    return a + b;
}

// ──────────── Neue Syntax (arrow) ────────────
const addArrow = (a, b) => {
    return a + b;
};

console.log(add(2, 3));           // 5
console.log(addArrow(2, 3));      // 5

// ──────────── Verschiedene Parameter-Anzahlen ────────────

// Keine Parameter
const greet = () => {
    console.log("Hallo!");
};

// Ein Parameter (Klammern optional)
const double = num => {
    return num * 2;
};

// Oder mit Klammern (empfohlen für Konsistenz)
const doubleBetter = (num) => {
    return num * 2;
};

// Mehrere Parameter (Klammern erforderlich)
const multiply = (a, b) => {
    return a * b;
};

// ──────────── Syntax-Vergleich ────────────
// Function Declaration
function sayHello1() {
    return "Hello";
}

// Function Expression
const sayHello2 = function () {
    return "Hello";
};

// Arrow Function
const sayHello3 = () => {
    return "Hello";
};

// ✅ In React: Arrow Functions sind Standard!

// 💡 WARUM IST DAS FÜR REACT WICHTIG?
// → Alle Event-Handler: onClick={() => ...}
// → Alle Array-Methoden: items.map(item => ...)
// → Alle Callbacks: useEffect(() => {}, [])
// → Kürzerer, lesbarerer Code


// ============================================
// KONZEPT 2: IMPLICIT RETURN
// Noch kürzer für einfache Funktionen
// ============================================

/*
KERNPROBLEM: return + {} für simple Funktionen ist unnötig
LÖSUNG: Ohne {} wird automatisch returned

REGEL:
→ Ohne {}: Wert wird automatisch returned
→ Mit {}: return ist PFLICHT
→ Für Objekt-Rückgabe: ({...}) mit Klammern
*/

// ──────────── Explicit Return (mit {}) ────────────
const addExplicit = (a, b) => {
    return a + b;
};

// ──────────── Implicit Return (ohne {}) ────────────
const addImplicit = (a, b) => a + b;

console.log(addExplicit(2, 3));   // 5
console.log(addImplicit(2, 3));   // 5

// ──────────── Praktische Beispiele ────────────

// Zahlen verdoppeln
const numbers = [1, 2, 3, 4, 5];

// Mit explicit return (umständlich)
const doubledExplicit = numbers.map((num) => {
    return num * 2;
});

// Mit implicit return (clean!)
const doubledImplicit = numbers.map(num => num * 2);

console.log(doubledImplicit);     // [2, 4, 6, 8, 10]

// ──────────── Objekt zurückgeben ────────────

// ❌ FEHLER: Ohne Klammern denkt JS, {} ist Function Body
const makePerson1 = (name, age) => { name, age };  // Fehler!

// ✅ RICHTIG: Objekt in Klammern
const makePerson2 = (name, age) => ({ name, age });

console.log(makePerson2("Max", 25));  // { name: "Max", age: 25 }

// Oder mit explicit return
const makePerson3 = (name, age) => {
    return { name, age };
};

// ──────────── Mehrzeilig ────────────

// Implicit return nur für EINE Zeile
const calculate1 = (x) => x * 2 + 10;

// Bei mehreren Zeilen: {} und return
const calculate2 = (x) => {
    const doubled = x * 2;
    const result = doubled + 10;
    return result;
};

// 💡 WARUM IST DAS FÜR REACT WICHTIG?
// → map() in JSX: items.map(item => <Item {...item} />)
// → Sehr häufig: kurze Transformationen
// → Clean, lesbarer Code
// → Standard in React-Community


// ============================================
// KONZEPT 3: DESTRUCTURING PARAMETERS
// Props in React-Components
// ============================================

/*
KERNPROBLEM: Objekt-Properties einzeln aus Parameter extrahieren
LÖSUNG: Destructuring direkt im Parameter

REGEL:
→ ({ prop1, prop2 }) => ... extrahiert Properties
→ Standard-Pattern für React Props
→ Kombinierbar mit Default-Werten
*/

// ──────────── Ohne Destructuring (umständlich) ────────────
const greetUser1 = (user) => {
    return `Hallo ${user.name}, du bist ${user.age} Jahre alt`;
};

// ──────────── Mit Destructuring (clean!) ────────────
const greetUser2 = ({ name, age }) => {
    return `Hallo ${name}, du bist ${age} Jahre alt`;
};

const user = { name: "Max", age: 25, city: "Berlin" };
console.log(greetUser2(user));

// ──────────── Nur benötigte Properties extrahieren ────────────
const getUserInfo = ({ name, email }) => {
    // city wird ignoriert, auch wenn es im Objekt ist
    return `${name} (${email})`;
};

console.log(getUserInfo({
    name: "Max",
    email: "max@test.de",
    city: "Berlin"
}));

// ──────────── Nested Destructuring ────────────
const displayAddress = ({ name, address: { city, street } }) => {
    return `${name} wohnt in ${city}, ${street}`;
};

console.log(displayAddress({
    name: "Max",
    address: {
        city: "Berlin",
        street: "Hauptstraße 1"
    }
}));

// ──────────── Rest Parameter ────────────
const logUserDetails = ({ name, ...rest }) => {
    console.log("Name:", name);
    console.log("Rest:", rest);  // Alle anderen Properties
};

logUserDetails({ name: "Max", age: 25, city: "Berlin" });
// Name: Max
// Rest: { age: 25, city: "Berlin" }

// 💡 WARUM IST DAS FÜR REACT WICHTIG?
// → Props destructuren: function Button({ text, onClick }) { ... }
// → Standard in 99% aller React-Components
// → Macht Props-Verwendung sehr clean
// → Zeigt auf einen Blick: Welche Props werden verwendet?


// ============================================
// KONZEPT 4: DEFAULT PARAMETERS
// Optional Props in React
// ============================================

/*
KERNPROBLEM: Manche Parameter sind optional
LÖSUNG: Default-Werte direkt in Parameter-Liste

REGEL:
→ (param = defaultValue) => ...
→ Wird nur verwendet wenn undefined
→ null überschreibt NICHT den Default!
*/

// ──────────── Basis: Default-Werte ────────────
const greet = (name = "Gast") => {
    return `Hallo ${name}`;
};

console.log(greet("Max"));        // "Hallo Max"
console.log(greet());             // "Hallo Gast"

// ──────────── Mehrere Defaults ────────────
const createUser = (name = "Anonymous", age = 0, active = true) => {
    return { name, age, active };
};

console.log(createUser("Max", 25));
// { name: "Max", age: 25, active: true }

console.log(createUser());
// { name: "Anonymous", age: 0, active: true }

// ──────────── Mit Destructuring kombiniert ────────────
const displayProduct = ({
    name,
    price = 0,
    inStock = false
}) => {
    return `${name}: ${price}€ (${inStock ? "verfügbar" : "ausverkauft"})`;
};

console.log(displayProduct({ name: "Laptop", price: 999, inStock: true }));
console.log(displayProduct({ name: "Mouse" }));
// Mouse: 0€ (ausverkauft)

// ──────────── ⚠️ WICHTIG: null vs undefined ────────────
const test = (value = "default") => value;

console.log(test(undefined));     // "default" ✅
console.log(test(null));          // null ⚠️ (nicht "default"!)
console.log(test(0));             // 0 (nicht "default"!)
console.log(test(""));            // "" (nicht "default"!)

// Nur undefined triggert Default!

// ──────────── Computed Defaults ────────────
const createId = (prefix = "user", id = Date.now()) => {
    return `${prefix}-${id}`;
};

console.log(createId());          // "user-1732564893021"
console.log(createId("admin"));   // "admin-1732564893022"

// ──────────── Default-Objekte ────────────
const setupConfig = (options = {}) => {
    const config = {
        debug: false,
        timeout: 3000,
        ...options              // Überschreibt Defaults
    };
    return config;
};

console.log(setupConfig());       // { debug: false, timeout: 3000 }
console.log(setupConfig({ debug: true }));
// { debug: true, timeout: 3000 }

// 💡 WARUM IST DAS FÜR REACT WICHTIG?
// → Optional Props: function Button({ text, disabled = false })
// → Fallback-Werte für fehlende Props
// → Macht Komponenten flexibler
// → Standard-Pattern in React-Components


// ============================================
// KONZEPT 5: CALLBACKS
// Event-Handler & Array-Methoden
// ============================================

/*
KERNPROBLEM: Funktionen als Parameter übergeben
LÖSUNG: Arrow Functions sind perfekt für Callbacks

REGEL:
→ Callback = Funktion die als Parameter übergeben wird
→ In React: Event-Handler, Array-Methoden, Hooks
→ Arrow Functions vermeiden `this` Probleme
*/

// ──────────── Callbacks in Array-Methoden ────────────
const nums = [1, 2, 3, 4, 5];

// map mit Arrow Function
const doubled = nums.map(num => num * 2);
console.log(doubled);             // [2, 4, 6, 8, 10]

// filter mit Arrow Function
const evens = nums.filter(num => num % 2 === 0);
console.log(evens);               // [2, 4]

// find mit Arrow Function
const found = nums.find(num => num > 3);
console.log(found);               // 4

// ──────────── Event-Handler Pattern (React-Simulation) ────────────
const button = {
    text: "Click me",
    onClick: () => {
        console.log("Button clicked!");
    }
};

// Simuliere Click
button.onClick();                 // "Button clicked!"

// Mit Parameter
const createClickHandler = (id) => {
    return () => {
        console.log(`Clicked item ${id}`);
    };
};

const handler1 = createClickHandler(1);
const handler2 = createClickHandler(2);
handler1();                       // "Clicked item 1"
handler2();                       // "Clicked item 2"

// ──────────── Callback-Funktionen definieren ────────────
const processData = (data, callback) => {
    const processed = data * 2;
    callback(processed);
};

processData(5, (result) => {
    console.log("Result:", result); // "Result: 10"
});

// Inline Arrow Function
processData(10, result => console.log("Doubled:", result));

// ──────────── Chaining mit Callbacks ────────────
const users = [
    { name: "Max", age: 25, active: true },
    { name: "Anna", age: 30, active: false },
    { name: "Tom", age: 22, active: true }
];

const activeUserNames = users
    .filter(user => user.active)
    .map(user => user.name)
    .map(name => name.toUpperCase());

console.log(activeUserNames);     // ["MAX", "TOM"]

// ──────────── setTimeout/setInterval ────────────
setTimeout(() => {
    console.log("Nach 1 Sekunde");
}, 1000);

// Mit Parameter
const delayedGreet = (name) => {
    setTimeout(() => {
        console.log(`Hallo ${name}`);
    }, 500);
};

// 💡 WARUM IST DAS FÜR REACT WICHTIG?
// → onClick={() => handleClick()}
// → map(item => <Item key={item.id} />)
// → useEffect(() => { ... }, [])
// → setTimeout, setInterval in useEffect
// → 90% aller React-Code verwendet Callbacks!


// ============================================
// BONUS: ARROW VS FUNCTION
// Wann was verwenden?
// ============================================

// ──────────── Unterschiede ────────────

// 1. `this` Binding
function traditional() {
    console.log(this);              // Kontext-abhängig
}

const arrow = () => {
    console.log(this);              // Lexical `this` (äußerer Scope)
};

// 2. Hoisting
traditionalFunc();                // ✅ Funktioniert (Hoisting)
function traditionalFunc() {
    console.log("Gehoisted");
}

// arrowFunc();                   // ❌ ReferenceError
const arrowFunc = () => {
    console.log("Nicht gehoisted");
};

// 3. Arguments-Objekt
function withArgs() {
    console.log(arguments);         // [1, 2, 3]
}
withArgs(1, 2, 3);

const withoutArgs = () => {
    // console.log(arguments);      // ❌ ReferenceError
    // Verwende stattdessen Rest-Parameter
};

// ──────────── Wann was? ────────────

// ✅ Arrow Functions für:
// - React-Components: const Button = () => {}
// - Event-Handler: onClick={() => {}}
// - Array-Methoden: map(item => {})
// - Callbacks: setTimeout(() => {})
// - Kurze Funktionen: const double = x => x * 2

// ✅ Function Declarations für:
// - Top-Level Functions (wenn Hoisting gewünscht)
// - Methoden in Objekten/Klassen (wenn `this` benötigt)

// In React mit Hooks: IMMER Arrow Functions!


// ============================================
// ZUSAMMENFASSUNG
// Die 5 kritischen Konzepte
// ============================================

/*
┌─────────────────────────────────────────────────────────────┐
│ 1. ARROW FUNCTION SYNTAX                                    │
├─────────────────────────────────────────────────────────────┤
│ const fn = () => {}             │ Standard in React        │
│ Kein `this` Binding             │ Vorhersehbar             │
│ Kürzer als function             │ Moderner Standard        │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ 2. IMPLICIT RETURN                                          │
├─────────────────────────────────────────────────────────────┤
│ () => value                     │ Ohne {} automatisch      │
│ Objekt: () => ({...})           │ Klammern erforderlich    │
│ Für kurze Funktionen            │ Clean, lesbar            │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ 3. DESTRUCTURING PARAMETERS                                 │
├─────────────────────────────────────────────────────────────┤
│ ({ name, age }) => ...          │ Props extrahieren        │
│ Standard für React-Components   │ 99% aller Components     │
│ ({ name, ...rest }) => ...      │ Rest-Properties          │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ 4. DEFAULT PARAMETERS                                       │
├─────────────────────────────────────────────────────────────┤
│ (x = 10) => ...                 │ Fallback-Werte           │
│ Nur bei undefined               │ null überschreibt nicht! │
│ ({ text, disabled = false })    │ Optional Props           │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ 5. CALLBACKS                                                │
├─────────────────────────────────────────────────────────────┤
│ map(item => ...)                │ Array-Methoden           │
│ onClick={() => ...}             │ Event-Handler            │
│ useEffect(() => {}, [])         │ Hooks                    │
│ Arrow Functions = Standard      │ Kein `this` Problem      │
└─────────────────────────────────────────────────────────────┘


HÄUFIGE FEHLER (und wie man sie vermeidet):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
❌ () => { x + 1 }                  → Kein return! Verwende () => x + 1
❌ () => { name: "Max" }            → Objekt braucht (): () => ({ name: "Max" })
❌ map(item => { item.name })       → Fehlt return! Oder ohne {}
❌ onClick={handleClick()}          → Ruft sofort auf! Verwende onClick={handleClick}
❌ (x = null) => x                  → null überschreibt Default nicht!


DEBUGGING-TIPPS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
→ map gibt undefined:               Fehlt return oder {}?
→ Objekt wird nicht returned:       Klammern vergessen? () => ({...})
→ Default wird nicht verwendet:     Ist Parameter null statt undefined?
→ Event-Handler feuert sofort:      () vergessen? onClick={() => ...}


VORBEREITUNG FÜR REACT:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Diese Patterns wirst du in React JEDEN TAG verwenden:

→ Component Definition:             const Button = ({ text, onClick }) => { ... }
→ Event Handler:                    onClick={() => handleClick(id)}
→ Array Rendering:                  {items.map(item => <Item key={item.id} {...item} />)}
→ useEffect:                        useEffect(() => { fetchData() }, [])
→ Conditional:                      {user ? <Profile user={user} /> : null}

KRITISCHE PATTERNS:
→ Implicit Return in map:           items.map(item => <div>{item}</div>)
→ Props Destructuring:              const Card = ({ title, children }) => ...
→ Default Props:                    const Button = ({ disabled = false }) => ...
→ Callback mit Closure:             onClick={() => deleteItem(item.id)}

WICHTIGSTE REGEL:
Arrow Functions sind der Standard in React!
- Verwende sie für ALLES (Components, Handlers, Callbacks)
- Implicit Return für kurze Funktionen
- Destructuring für Props
- Defaults für optionale Props
*/

console.log("\n✅ Arrow Functions abgeschlossen!");
console.log("💡 Arrow Functions sind die Basis von 90% deines React-Codes!");