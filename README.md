# JavaScript Grundlagen – Checkliste

> **Vorbereitung für TypeScript & React**  
> Diese Checkliste deckt alle wichtigen JavaScript-Konzepte ab, die du beherrschen solltest, bevor du mit TypeScript und React startest.

---

## 1. Grundlagen von JavaScript

### Syntax & Basiswissen

- [x] Code-Struktur: Statements, Semikolons, Codeblöcke
- [x] Kommentare (`//` und `/* ... */`)
- [x] Case-Sensitivity in Variablen und Funktionen
- [x] Verständnis von "Interpreter" vs. "Compiler"

### Variablen & Konstanten

- [x] `var`, `let`, `const` – Unterschiede verstehen
- [x] Blockscope (`let`/`const`) vs. Functionscope (`var`)
- [x] Wann man `const` verwendet (Standard)
- [x] Reassigning vs. Immutable Variablen

### Datentypen

- [x] **Primitive Typen**: `string`, `number`, `boolean`, `null`, `undefined`, `symbol`, `bigint`
- [x] **Referenztypen**: `object`, `array`, `function`
- [x] `typeof`-Operator (`typeof value`)
- [x] Dynamische Typisierung – JavaScript als "loosely typed language"

### Operatoren

- [x] Arithmetische Operatoren (`+`, `-`, `*`, `/`, `%`, `**`)
- [x] Zuweisungsoperatoren (`+=`, `-=`, `*=`, `/=`)
- [x] Vergleichsoperatoren (`==` vs. `===`, `!=` vs. `!==`)
- [x] Logische Operatoren (`&&`, `||`, `!`)
- [x] Ternärer Operator (`condition ? value1 : value2`)

---

## 2. Kontrollstrukturen

- [x] Bedingte Anweisungen (`if`, `else if`, `else`)
- [x] `switch`-Case Anweisungen
- [x] Schleifen: `for`, `while`, `do...while`
- [x] `for...of` für Arrays
- [x] `for...in` für Objekte
- [x] `break` & `continue`
- [x] Fehlerbehandlung mit `try`, `catch`, `finally`

---

## 3. Funktionen

- [ ] Funktionsdeklaration (`function name() {}`)
- [ ] Funktionsausdruck (`const name = function() {}`)
- [ ] Arrow Functions (`const fn = () => {}`)
- [ ] Parameter & Defaultwerte (`function fn(a=10) {}`)
- [ ] Rückgabewerte (`return`)
- [ ] Anonyme Funktionen
- [ ] Immediately Invoked Function Expressions (IIFE)
- [ ] Funktionen als Parameter (Callbacks)
- [ ] Higher-Order Functions
- [ ] Rekursive Funktionen

---

## 4. Strings & Zahlen

### Strings

- [ ] String-Konkatenation (`'Hallo ' + name`)
- [ ] Template Literals (`` `Hallo ${name}` ``)
- [ ] String-Methoden: `.length`, `.toUpperCase()`, `.includes()`, `.split()`

### Zahlen

- [ ] Number-Methoden: `parseInt()`, `parseFloat()`, `toFixed()`
- [ ] Mathematische Funktionen: `Math.round()`, `Math.random()`, `Math.max()`

---

## 5. Arrays

- [ ] Array erstellen: `[]`, `new Array()`
- [ ] Zugriff auf Elemente (`arr[index]`)
- [ ] Länge (`arr.length`)

### Array-Methoden (wichtig!)

- [ ] `push()`, `pop()`, `shift()`, `unshift()`
- [ ] `map()`, `filter()`, `reduce()`, `find()`, `some()`, `every()`
- [ ] `includes()`, `indexOf()`, `sort()`, `reverse()`
- [ ] Mehrdimensionale Arrays
- [ ] Destructuring von Arrays

---

## 6. Objekte

- [ ] Objektliterale (`{ key: value }`)
- [ ] Zugriff: Punktnotation (`obj.key`) & Klammernotation (`obj["key"]`)
- [ ] Dynamische Schlüssel (`[variableName]: value`)
- [ ] `Object.keys()`, `Object.values()`, `Object.entries()`
- [ ] Methoden in Objekten (`sayHello() {}`)
- [ ] Destructuring von Objekten (`const { name, age } = user`)
- [ ] Spread-Operator für Objekte (`{...obj, newKey: value}`)

---

## 7. ES6+ Features

- [ ] `let`, `const`, Arrow Functions
- [ ] Template Literals
- [ ] Destructuring (Objekte & Arrays)
- [ ] Spread / Rest Operatoren (`...args`)
- [ ] Default Parameter
- [ ] Import / Export von Modulen
- [ ] Promises & `async`/`await`
- [ ] Optional Chaining (`obj?.key?.subkey`)
- [ ] Nullish Coalescing (`value ?? fallback`)

---

## 8. Objektorientierte Grundlagen

- [ ] Klassen & Konstruktoren (`class User { constructor(name){...}}`)
- [ ] Methoden (`speak() {}`)
- [ ] Vererbung (`extends`, `super`)
- [ ] `this`-Kontext
- [ ] Getter & Setter
- [ ] Statische Methoden

---

## 9. Asynchrones JavaScript

- [ ] Promises (`new Promise((resolve, reject) => {})`)
- [ ] `.then()`, `.catch()`, `.finally()`
- [ ] `async`/`await`
- [ ] Fetch API (`await fetch(url)`)
- [ ] Fehlerbehandlung (`try...catch`)
- [ ] `Promise.all()` / `Promise.race()`

---

## 10. Module & Importe

- [ ] `export default` und `export const`
- [ ] `import something from './file'`
- [ ] Struktur von Modulen
- [ ] Barrel Files (`index.js` für Sammel-Exporte)

---

## 11. Event Handling

- [ ] Inline-Events: `<button onclick="handleClick()">`
- [ ] `addEventListener()`
- [ ] Eventobjekt (`e.target.value`, `e.preventDefault()`)
- [ ] Anonyme Arrow Functions in Events

---

## 12. DOM-Manipulation (Grundwissen)

- [ ] `document.querySelector()`, `getElementById()`
- [ ] `innerHTML`, `textContent`, `classList`
- [ ] Unterschied DOM-Manipulation vs. Framework-Rendering

---

## 13. Moderne JavaScript-Konzepte

- [ ] **Closures** – Variablen im Funktionskontext
- [ ] **Scopes** – Global, Local, Block
- [ ] **Pure Functions** – Funktionen ohne Seiteneffekte
- [ ] **Immutability** – Objekte nicht direkt verändern
- [ ] **Event Loop & Call Stack** – Grundverständnis
- [ ] **Currying & Function Composition** (optional, aber hilfreich)

---

## 14. Best Practices

- [ ] Immer `const` bevorzugen, dann `let`, **nie** `var`
- [ ] Arrow Functions für Callbacks nutzen
- [ ] Vermeide globale Variablen
- [ ] Nutze Destructuring konsequent
- [ ] Arbeite mit `map`, `filter`, `reduce` statt manueller Schleifen
- [ ] Logik in Funktionen kapseln
- [ ] Code modular strukturieren

---

## Nächste Schritte

✅ **Wenn du alle Punkte abhaken kannst, bist du bereit für:**

- TypeScript (Typsicherheit hinzufügen)
- React (Komponenten-basierte UI-Entwicklung)

**Viel Erfolg! 🚀**
