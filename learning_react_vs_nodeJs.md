# JavaScript Themen - Verwendungsmatrix

> Übersicht: Welche JavaScript-Themen werden wo benötigt?

**Legende:**

- ✅ = Sehr wichtig / häufig verwendet
- 🟡 = Wichtig / gelegentlich verwendet
- 🟢 = Nützlich zu kennen / selten verwendet
- ➖ = Kaum/nicht relevant

---

## 1. Grundlagen von JavaScript

### 1.1 Syntax & Basiswissen

| Thema                                  | React | Node.js | Vanilla JS |
| -------------------------------------- | ----- | ------- | ---------- |
| Code-Struktur (Statements, Semikolons) | ✅    | ✅      | ✅         |
| Kommentare                             | ✅    | ✅      | ✅         |
| Case-Sensitivity                       | ✅    | ✅      | ✅         |
| Interpreter vs. Compiler Verständnis   | 🟢    | 🟡      | 🟢         |

### 1.2 Variablen & Konstanten

| Thema                        | React | Node.js | Vanilla JS |
| ---------------------------- | ----- | ------- | ---------- |
| var, let, const              | ✅    | ✅      | ✅         |
| Blockscope vs. Functionscope | ✅    | ✅      | ✅         |
| const als Standard           | ✅    | ✅      | ✅         |
| Reassigning vs. Immutability | ✅    | 🟡      | 🟡         |

### 1.3 Datentypen

| Thema                                           | React | Node.js | Vanilla JS |
| ----------------------------------------------- | ----- | ------- | ---------- |
| Primitive Typen (string, number, boolean, etc.) | ✅    | ✅      | ✅         |
| Referenztypen (object, array, function)         | ✅    | ✅      | ✅         |
| typeof-Operator                                 | 🟡    | ✅      | ✅         |
| Dynamische Typisierung                          | ✅    | ✅      | ✅         |
| null vs. undefined                              | ✅    | ✅      | ✅         |
| Symbol                                          | ➖    | 🟢      | 🟢         |
| BigInt                                          | ➖    | 🟡      | 🟢         |

### 1.4 Operatoren

| Thema                                           | React | Node.js | Vanilla JS |
| ----------------------------------------------- | ----- | ------- | ---------- |
| Arithmetische Operatoren (+, -, \*, /, %, \*\*) | ✅    | ✅      | ✅         |
| Zuweisungsoperatoren (+=, -=, etc.)             | 🟡    | ✅      | ✅         |
| Vergleichsoperatoren (===, !==, >, <)           | ✅    | ✅      | ✅         |
| Logische Operatoren (&&, \|\|, !)               | ✅    | ✅      | ✅         |
| Ternärer Operator (? :)                         | ✅    | 🟡      | ✅         |
| Nullish Coalescing (??)                         | ✅    | 🟡      | 🟡         |
| Optional Chaining (?.)                          | ✅    | 🟡      | 🟡         |

---

## 2. Kontrollstrukturen

| Thema               | React | Node.js | Vanilla JS |
| ------------------- | ----- | ------- | ---------- |
| if, else if, else   | ✅    | ✅      | ✅         |
| switch-case         | 🟡    | ✅      | ✅         |
| for-Schleife        | 🟢    | ✅      | ✅         |
| while, do-while     | ➖    | 🟡      | 🟡         |
| for...of (Arrays)   | 🟢    | ✅      | ✅         |
| for...in (Objekte)  | ➖    | 🟡      | 🟡         |
| break & continue    | ➖    | 🟡      | 🟡         |
| try, catch, finally | ✅    | ✅      | ✅         |

**Hinweis React:** In React nutzt man meist `.map()`, `.filter()` statt klassischer Schleifen!

---

## 3. Funktionen

| Thema                               | React | Node.js | Vanilla JS |
| ----------------------------------- | ----- | ------- | ---------- |
| Funktionsdeklaration                | 🟡    | ✅      | ✅         |
| Funktionsausdruck                   | 🟡    | ✅      | ✅         |
| Arrow Functions                     | ✅    | ✅      | ✅         |
| Parameter & Defaultwerte            | ✅    | ✅      | ✅         |
| return-Statement                    | ✅    | ✅      | ✅         |
| Anonyme Funktionen                  | 🟡    | 🟡      | ✅         |
| IIFE (Immediately Invoked Function) | ➖    | 🟢      | 🟡         |
| Callbacks                           | ✅    | ✅      | ✅         |
| Higher-Order Functions              | ✅    | ✅      | ✅         |
| Rekursive Funktionen                | 🟢    | 🟡      | 🟡         |
| this-Kontext                        | 🟡    | 🟡      | ✅         |
| bind, call, apply                   | ➖    | 🟢      | 🟡         |

---

## 4. Strings & Zahlen

| Thema                                     | React | Node.js | Vanilla JS |
| ----------------------------------------- | ----- | ------- | ---------- |
| String-Konkatenation                      | 🟡    | ✅      | ✅         |
| Template Literals                         | ✅    | ✅      | ✅         |
| String-Methoden (.split, .includes, etc.) | ✅    | ✅      | ✅         |
| Number-Methoden (parseInt, parseFloat)    | 🟡    | ✅      | ✅         |
| Math-Objekt (Math.random, Math.round)     | 🟡    | ✅      | ✅         |

---

## 5. Arrays

| Thema                     | React | Node.js | Vanilla JS |
| ------------------------- | ----- | ------- | ---------- |
| Array erstellen           | ✅    | ✅      | ✅         |
| Zugriff auf Elemente      | ✅    | ✅      | ✅         |
| push, pop, shift, unshift | 🟡    | ✅      | ✅         |
| **map()**                 | ✅    | ✅      | ✅         |
| **filter()**              | ✅    | ✅      | ✅         |
| **reduce()**              | 🟡    | ✅      | ✅         |
| **find()**                | ✅    | ✅      | ✅         |
| some(), every()           | 🟢    | 🟡      | 🟡         |
| includes(), indexOf()     | 🟡    | ✅      | ✅         |
| sort(), reverse()         | 🟡    | ✅      | ✅         |
| slice(), splice()         | 🟡    | ✅      | ✅         |
| concat(), join()          | 🟢    | 🟡      | ✅         |
| Spread-Operator [...arr]  | ✅    | 🟡      | ✅         |
| Destructuring             | ✅    | 🟡      | ✅         |
| Mehrdimensionale Arrays   | 🟢    | 🟡      | 🟡         |

**React-Fokus:** `map()`, `filter()`, `find()` sind extrem wichtig für Rendering!

---

## 6. Objekte

| Thema                              | React | Node.js | Vanilla JS |
| ---------------------------------- | ----- | ------- | ---------- |
| Objektliterale erstellen           | ✅    | ✅      | ✅         |
| Punktnotation (obj.key)            | ✅    | ✅      | ✅         |
| Klammernotation (obj["key"])       | 🟡    | ✅      | ✅         |
| Dynamische Schlüssel               | 🟡    | ✅      | 🟡         |
| Object.keys(), values(), entries() | 🟡    | ✅      | ✅         |
| Methoden in Objekten               | 🟡    | ✅      | ✅         |
| Destructuring                      | ✅    | 🟡      | ✅         |
| Spread-Operator {...obj}           | ✅    | 🟡      | ✅         |
| Object.assign()                    | 🟢    | 🟡      | 🟡         |
| Object.freeze()                    | 🟢    | 🟢      | ➖         |

**React-Fokus:** Destructuring und Spread-Operator sind essentiell für State-Management!

---

## 7. ES6+ Features

| Thema                    | React | Node.js | Vanilla JS |
| ------------------------ | ----- | ------- | ---------- |
| let & const              | ✅    | ✅      | ✅         |
| Arrow Functions          | ✅    | ✅      | ✅         |
| Template Literals        | ✅    | ✅      | ✅         |
| Destructuring            | ✅    | 🟡      | ✅         |
| Spread / Rest Operatoren | ✅    | 🟡      | ✅         |
| Default Parameter        | ✅    | ✅      | ✅         |
| **Import / Export**      | ✅    | ✅      | 🟡         |
| **Promises**             | ✅    | ✅      | ✅         |
| **async / await**        | ✅    | ✅      | ✅         |
| Optional Chaining (?.)   | ✅    | 🟡      | 🟡         |
| Nullish Coalescing (??)  | ✅    | 🟡      | 🟡         |
| Classes                  | 🟢    | 🟡      | 🟡         |

**React-Fokus:** Module, Promises, async/await für API-Calls!

---

## 8. DOM & Events

| Thema                                     | React | Node.js | Vanilla JS |
| ----------------------------------------- | ----- | ------- | ---------- |
| document.querySelector()                  | ➖    | ➖      | ✅         |
| getElementById()                          | ➖    | ➖      | ✅         |
| addEventListener()                        | ➖    | ➖      | ✅         |
| Event-Objekt (e.target, e.preventDefault) | ✅    | ➖      | ✅         |
| innerHTML, textContent                    | ➖    | ➖      | ✅         |
| classList (add, remove, toggle)           | ➖    | ➖      | ✅         |
| DOM-Manipulation allgemein                | ➖    | ➖      | ✅         |

**Wichtig:** React hat eigenes Event-System (Synthetic Events), direkte DOM-Manipulation wird vermieden!

**Node.js:** Hat kein DOM (läuft nicht im Browser)!

---

## 9. Objektorientierte Programmierung

| Thema                       | React | Node.js | Vanilla JS |
| --------------------------- | ----- | ------- | ---------- |
| Klassen (class)             | 🟢    | 🟡      | 🟡         |
| Konstruktoren (constructor) | 🟢    | 🟡      | 🟡         |
| Methoden                    | 🟡    | ✅      | ✅         |
| Vererbung (extends, super)  | 🟢    | 🟢      | 🟡         |
| this-Kontext                | 🟡    | 🟡      | ✅         |
| Getter & Setter             | ➖    | 🟢      | 🟢         |
| Statische Methoden          | ➖    | 🟡      | 🟢         |

**React-Hinweis:** React nutzt seit Hooks (2019) hauptsächlich **funktionale Komponenten** statt Klassen!

---

## 10. Asynchrones JavaScript

| Thema                         | React | Node.js | Vanilla JS |
| ----------------------------- | ----- | ------- | ---------- |
| **Promises**                  | ✅    | ✅      | ✅         |
| .then(), .catch(), .finally() | 🟡    | ✅      | ✅         |
| **async / await**             | ✅    | ✅      | ✅         |
| **Fetch API**                 | ✅    | ➖      | ✅         |
| try...catch (async)           | ✅    | ✅      | ✅         |
| Promise.all()                 | 🟡    | ✅      | 🟡         |
| Promise.race()                | ➖    | 🟡      | 🟢         |
| setTimeout / setInterval      | 🟡    | ✅      | ✅         |
| Event Loop Verständnis        | 🟢    | 🟡      | 🟢         |

**Sehr wichtig für beide:** API-Calls, Datenbank-Operationen (Node.js), useEffect (React)!

**Node.js nutzt:** Andere HTTP-Clients (axios, node-fetch) statt Browser Fetch API

---

## 11. Module & Importe

| Thema                             | React | Node.js | Vanilla JS |
| --------------------------------- | ----- | ------- | ---------- |
| **export default**                | ✅    | ✅      | 🟡         |
| **export const** (named exports)  | ✅    | ✅      | 🟡         |
| **import ... from**               | ✅    | ✅      | 🟡         |
| import \* as                      | 🟡    | 🟡      | ➖         |
| Dynamic imports                   | 🟡    | 🟡      | ➖         |
| CommonJS (require/module.exports) | ➖    | 🟡      | ➖         |
| Barrel Files (index.js)           | 🟡    | 🟡      | ➖         |

**React:** ES6 Modules sind Standard!

**Node.js:** Sowohl ES6 Modules als auch CommonJS (älterer Standard)

---

## 12. Event Handling

| Thema                   | React | Node.js | Vanilla JS |
| ----------------------- | ----- | ------- | ---------- |
| onClick, onChange, etc. | ✅    | ➖      | ✅         |
| Event-Objekt (e)        | ✅    | ➖      | ✅         |
| e.preventDefault()      | ✅    | ➖      | ✅         |
| e.stopPropagation()     | 🟡    | ➖      | ✅         |
| e.target.value          | ✅    | ➖      | ✅         |
| Event Delegation        | ➖    | ➖      | 🟡         |
| Custom Events           | ➖    | 🟢      | 🟢         |

**React:** Synthetic Events (anders als native Browser-Events!)

---

## 13. Moderne JavaScript-Konzepte

| Thema                             | React | Node.js | Vanilla JS |
| --------------------------------- | ----- | ------- | ---------- |
| **Closures**                      | ✅    | ✅      | ✅         |
| **Scopes** (Global, Local, Block) | ✅    | ✅      | ✅         |
| **Pure Functions**                | ✅    | 🟡      | 🟢         |
| **Immutability**                  | ✅    | 🟢      | 🟢         |
| Currying                          | 🟢    | 🟢      | ➖         |
| Function Composition              | 🟡    | 🟡      | ➖         |
| Event Loop & Call Stack           | 🟢    | 🟡      | 🟢         |
| Hoisting                          | 🟢    | 🟢      | 🟡         |
| Temporal Dead Zone                | 🟢    | 🟢      | 🟢         |

**React-Fokus:** Closures (in Hooks!), Pure Functions, Immutability sind essentiell!

---

## 14. Arbeiten mit APIs & Daten

| Thema                                  | React | Node.js | Vanilla JS |
| -------------------------------------- | ----- | ------- | ---------- |
| JSON.parse() / JSON.stringify()        | ✅    | ✅      | ✅         |
| fetch() / async API-Calls              | ✅    | ➖      | ✅         |
| axios (Library)                        | 🟡    | ✅      | 🟡         |
| HTTP-Methoden (GET, POST, PUT, DELETE) | ✅    | ✅      | 🟡         |
| Headers, Body, Status Codes            | 🟡    | ✅      | 🟡         |
| CORS verstehen                         | 🟡    | ✅      | 🟡         |
| LocalStorage / SessionStorage          | 🟡    | ➖      | ✅         |

**Node.js:** Erstellt APIs (Backend), React konsumiert sie (Frontend)!

---

## Zusammenfassung: React vs. Node.js Fokus

### 🔴 React (Frontend) - Wichtigste Themen:

1. **Array-Methoden** (map, filter, find) ← Für Rendering!
2. **Destructuring & Spread** ← State-Management
3. **Arrow Functions** ← Komponenten & Callbacks
4. **async/await** ← API-Calls in useEffect
5. **ES6 Modules** ← Import/Export von Komponenten
6. **Ternärer Operator** ← Conditional Rendering
7. **Optional Chaining** ← Sicherer Zugriff auf Props
8. **Immutability** ← State niemals direkt ändern!
9. **Closures** ← Hooks nutzen Closures!
10. **Event Handling** ← onClick, onChange, etc.

**Weniger wichtig in React:**

- DOM-Manipulation (React übernimmt das)
- Klassische Schleifen (for, while) - nutze .map()
- OOP mit Klassen (funktionale Komponenten bevorzugt)
- for...in Schleifen

---

### 🟢 Node.js (Backend) - Wichtigste Themen:

1. **async/await & Promises** ← Datenbank, APIs, File I/O
2. **Modules** ← Code-Organisation
3. **Array-Methoden** ← Datenverarbeitung
4. **Error Handling** ← try-catch, Promise rejection
5. **HTTP & APIs** ← Express, REST APIs
6. **File System** ← fs module
7. **Callbacks** ← Asynchrone Operationen
8. **Kontrollstrukturen** ← Logik, Validation
9. **JSON** ← Daten-Serialisierung
10. **String-Manipulation** ← Pfade, URLs, etc.

**Weniger wichtig in Node.js:**

- DOM (existiert nicht!)
- Browser-Events
- JSX / Rendering
- React-spezifische Patterns

---

## 💡 Kernunterschied:

| Aspekt     | React                | Node.js                 |
| ---------- | -------------------- | ----------------------- |
| Umgebung   | Browser              | Server                  |
| Hauptzweck | UI rendern           | Logik/Daten verarbeiten |
| DOM        | Nutzt Virtual DOM    | Kein DOM                |
| Arrays     | Für Rendering (.map) | Für Datenverarbeitung   |
| async      | API-Calls (fetch)    | DB, Files, HTTP         |
| Module     | Komponenten          | APIs, Services          |

---

**Fazit:** ~80% JavaScript-Grundlagen sind in beiden gleich wichtig, aber die **Anwendung** unterscheidet sich stark!
