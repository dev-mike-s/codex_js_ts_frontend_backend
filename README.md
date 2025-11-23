# JavaScript für React – Vorbereitung

> **Fokussierte Vorbereitung für React mit TypeScript**  
> Diese Checkliste enthält NUR das, was du für React JEDEN TAG brauchst.  
> Fokus: 20% des Wissens, das 80% der Fälle abdeckt.

---

## 🎯 Philosophie

**Nicht alles wissen, sondern das Wichtige RICHTIG verstehen.**

- ✅ Tiefes Verständnis weniger Konzepte
- ✅ Jedes Konzept hat direkten React-Bezug
- ✅ Problem-first: WARUM vor WIE
- ❌ Keine "Nice-to-know" Features ohne praktischen Nutzen

---

## 1. Syntax & Basiswissen

### Kritische Konzepte ⭐

- [ ] **Statements vs Expressions** – JSX erlaubt nur Expressions!
  - `if` funktioniert NICHT in JSX
  - Ternär (`? :`) und `&&` sind Expressions
- [ ] **Block Scope** – let/const haben Block Scope
  - `{}` erzeugt neuen Scope
  - var NIEMALS verwenden
- [ ] **Case Sensitivity** – Komponenten MÜSSEN mit Großbuchstaben beginnen
  - camelCase: Variablen, Funktionen (`userName`)
  - PascalCase: Komponenten, Klassen (`UserProfile`)
  - UPPER_CASE: Konstanten (`MAX_SIZE`)
- [ ] **Semikolons & ASI** – Prettier entscheidet
  - Problem bei `[`, `(`, `` ` `` am Zeilenanfang
  - In React-Projekten: Prettier fügt automatisch hinzu

**React-Relevanz:** JSX-Syntax funktioniert nur mit Expressions!

---

## 2. Variablen & Datentypen

### Kritische Konzepte ⭐

- [ ] **const vs let** – const ist Standard!

  - `const` für ALLES (außer Reassignment nötig)
  - `let` nur bei Reassignment (Counter, Loops)
  - `var` NIEMALS verwenden
  - const schützt nicht vor Mutation (`obj.prop = "neu"` ist OK)

- [ ] **Primitive vs Referenztypen** – DER wichtigste Unterschied!

  - Primitive: Wert wird kopiert (`let y = x`)
  - Referenz: Pointer wird kopiert (beide zeigen auf dasselbe)
  - **Objekte/Arrays IMMER mit Spread kopieren:** `{...obj}`, `[...arr]`
  - Shallow Copy nur 1 Ebene (Nested: `structuredClone()`)

- [ ] **Die 7 Primitiven Typen**

  - `string`, `number`, `boolean` (häufigste)
  - `null`, `undefined` (leer vs nicht gesetzt)
  - `symbol`, `bigint` (selten)

- [ ] **typeof & Typ-Prüfungen**

  - `typeof` für Primitive (außer null!)
  - `Array.isArray()` für Arrays
  - `value === null` für null

- [ ] **Type Coercion** – Automatische Konvertierung
  - `"5" + 5 = "55"` (String-Verkettung)
  - `"5" - 5 = 0` (Number-Konvertierung)
  - Explizit: `Number()`, `String()`, `Boolean()`
  - Falsy: `false`, `0`, `""`, `null`, `undefined`, `NaN`

**React-Relevanz:** State NIEMALS direkt mutieren! Immer neue Objekte mit Spread.

---

## 3. Operatoren

### Kritische Konzepte ⭐

- [ ] **Type Coercion bei +**

  - `+` mit String → Verkettung
  - `-`, `*`, `/`, `%` → Number-Konvertierung
  - User-Input ist immer String: `Number(e.target.value)`

- [ ] **=== vs ==** – IMMER === verwenden!

  - `===` prüft Typ UND Wert
  - `==` konvertiert Typen (unpredictable)

- [ ] **&& und || geben Werte zurück!**

  - `&&` stoppt bei falsy, gibt Wert zurück
  - `||` stoppt bei truthy, gibt Wert zurück
  - `""  && "Hi"` = `""` (nicht false!)

- [ ] **?? (Nullish Coalescing)**

  - Nur `null`/`undefined` sind nullish
  - `0 ?? 10` = `0` (nicht nullish!)
  - `0 || 10` = `10` (falsy!)

- [ ] **Ternärer Operator**
  - `condition ? true : false`
  - Perfekt für JSX
  - Max. 1 Verschachtelung

**React-Relevanz:** Ternär und && sind die Basis für Conditional Rendering!

---

## 4. Bedingte Anweisungen

### Kritische Konzepte ⭐

- [ ] **Ternärer Operator** – Wichtigster Conditional für React!

  - `{isLoading ? <Spinner /> : <Content />}`
  - `{error ? <Error /> : null}`
  - Expression, kein Statement!

- [ ] **&& Operator** – "Nur wenn true"

  - `{isLoggedIn && <Profile />}`
  - ⚠️ ACHTUNG: `count && <Component />` rendert 0!
  - ✅ Besser: `count > 0 && <Component />`

- [ ] **Truthy/Falsy & Guard Clauses**

  - Falsy: `false`, `0`, `""`, `null`, `undefined`, `NaN`
  - Guard Clauses: `if (!data) return null;`
  - Optional Chaining: `user?.name`

- [ ] **Switch-Case für Reducers**
  - `switch (action.type) { case "ADD": ... }`
  - Standard in useReducer/Redux
  - `break` nicht vergessen!
  - `default` case immer

**React-Relevanz:** 90% aller Conditionals in React sind ternär oder &&!

---

## 5. Schleifen & Array-Methoden

### Kritische Konzepte ⭐

- [ ] **map() – TRANSFORMATION** – Wichtigste Array-Methode!

  - `items.map(item => <div key={item.id}>{item.name}</div>)`
  - Return ist PFLICHT
  - Original bleibt unverändert
  - **90% aller Listen in React verwenden map!**

- [ ] **filter() – AUSWAHL**

  - Nur passende Elemente behalten
  - `items.filter(i => i.active)`
  - Kombinierbar: `.filter().map()`

- [ ] **find(), some(), every() – EINZELSUCHE**

  - `find()`: Erstes Element oder undefined
  - `some()`: Mind. 1 passt? (Boolean)
  - `every()`: Alle passen? (Boolean)

- [ ] **forEach vs map**

  - forEach: Kein Return, Side Effects
  - map: Return, neues Array
  - ⚠️ forEach funktioniert NICHT mit async/await!

- [ ] **Klassische Schleifen** (nur wenn WIRKLICH nötig)
  - for: Mit Index & break
  - for...of: Mit async/await
  - while: Unbekannte Anzahl
  - **In React: Fast IMMER Array-Methoden!**

**React-Relevanz:** map() für Listen, filter() für Suche, find() für State-Updates!

---

## 6. Funktionen (wird noch erstellt)

### Kritische Konzepte ⭐

- [ ] **Arrow Functions** – Standard in React
- [ ] **Destructuring Parameter** – Für Props
- [ ] **Default Parameter** – Fallback-Werte
- [ ] **Callbacks** – Event-Handler
- [ ] **Pure Functions** – Keine Seiteneffekte

---

## 7. Objekte & Destructuring (wird noch erstellt)

### Kritische Konzepte ⭐

- [ ] **Objektliterale** – Props, State
- [ ] **Destructuring** – SEHR wichtig für React!
- [ ] **Spread Operator** – State-Updates
- [ ] **Object.keys/values/entries** – Iteration
- [ ] **Optional Chaining** – Sichere Property-Zugriffe

---

## 8. ES6+ Features (wird noch erstellt)

### Kritische Konzepte ⭐

- [ ] **Template Literals** – String-Interpolation
- [ ] **Destructuring** – Props & State
- [ ] **Spread/Rest** – Arrays & Objekte
- [ ] **Import/Export** – Module
- [ ] **Async/Await** – API-Calls
- [ ] **Optional Chaining** – `?.`
- [ ] **Nullish Coalescing** – `??`

---

## 9. Asynchrones JavaScript (wird noch erstellt)

### Kritische Konzepte ⭐

- [ ] **Promises** – Grundverständnis
- [ ] **async/await** – Moderne Syntax
- [ ] **try/catch** – Error Handling
- [ ] **Fetch API** – HTTP-Requests
- [ ] **for...of mit await** – forEach funktioniert nicht!

---

## 10. Module (wird noch erstellt)

### Kritische Konzepte ⭐

- [ ] **export default** – Eine Komponente
- [ ] **export const** – Mehrere Exporte
- [ ] **import** – Named & Default
- [ ] **Barrel Files** – index.js

---

## ✅ Checkliste: Bist du bereit für React?

### Must-Have (KRITISCH)

- [ ] const als Standard, let nur bei Reassignment
- [ ] Spread Operator für Objekte/Arrays beherrschen
- [ ] Destructuring verstehen und anwenden
- [ ] === statt == IMMER verwenden
- [ ] Ternär & && für Conditionals
- [ ] map(), filter(), find() auf Arrays anwenden
- [ ] Arrow Functions schreiben können
- [ ] Template Literals verwenden
- [ ] Unterschied Primitive vs Referenztypen
- [ ] typeof & Array.isArray() für Typ-Prüfungen

### Nice-to-Have (WICHTIG)

- [ ] Optional Chaining (`?.`)
- [ ] Nullish Coalescing (`??`)
- [ ] Guard Clauses Pattern
- [ ] some()/every() für Validierung
- [ ] async/await Grundprinzip
- [ ] Switch-Case Struktur

### Wenn du das kannst, fehlt nur noch:

- [ ] TypeScript Basics (Interfaces, Typen)
- [ ] React Hooks (useState, useEffect, etc.)
- [ ] JSX-Syntax
- [ ] Component-Struktur

---

## 🚀 Nächste Schritte

### Woche 1: React Kurs

1. **Tag 1:** ES6+ Features & TypeScript Basics
2. **Tag 1-2:** React Grundlagen (JSX, Components, Props)
3. **Tag 2-4:** Hooks (useState, useEffect, Custom Hooks)
4. **Tag 4-5:** State Management (Context, Redux Toolkit)

### Vorbereitung HEUTE

✅ **Übe diese Patterns:**

- Destructuring: `const { name, age } = user`
- Spread: `const newState = { ...state, count: 0 }`
- Map: `items.map(item => <Item key={item.id} {...item} />)`
- Filter: `items.filter(i => i.active).map(...)`
- Ternär: `{loading ? <Spinner /> : <Content />}`

---

## 📚 Ressourcen

### Unsere Lernskripte (fokussiert auf React)

1. ✅ Syntax & Basiswissen
2. ✅ Variablen & Datentypen
3. ✅ Operatoren
4. ✅ Bedingte Anweisungen
5. ✅ Schleifen & Array-Methoden
6. 🔄 Funktionen (in Arbeit)
7. 🔄 Objekte (in Arbeit)
8. 🔄 ES6+ Features (in Arbeit)

### Wichtigste Patterns für React

```javascript
// 1. Destructuring Props
function Button({ text, onClick, disabled = false }) {
  return (
    <button onClick={onClick} disabled={disabled}>
      {text}
    </button>
  );
}

// 2. State Update (immutable)
const [items, setItems] = useState([1, 2, 3]);
setItems([...items, 4]); // ✅ Neue Array
// items.push(4);  // ❌ NIEMALS!

// 3. Listen rendern
{
  users.map((user) => <div key={user.id}>{user.name}</div>);
}

// 4. Conditional Rendering
{
  isLoggedIn && <Profile />;
}
{
  isLoading ? <Spinner /> : <Content />;
}

// 5. Event Handler
<button onClick={() => setCount(count + 1)}>+</button>;
```

---

## ⚠️ Häufigste Anfängerfehler

1. ❌ `state.count++` → ✅ `setState({ ...state, count: state.count + 1 })`
2. ❌ `items.push(item)` → ✅ `setItems([...items, item])`
3. ❌ `{if (x) ...}` in JSX → ✅ `{x ? ... : ...}`
4. ❌ `count && <Component />` → ✅ `count > 0 && <Component />`
5. ❌ `.forEach()` mit async → ✅ `for...of` mit async
6. ❌ `.map()` ohne `return` → ✅ Impliziter Return oder `{return ...}`
7. ❌ `==` verwenden → ✅ Immer `===` verwenden
8. ❌ `let` für alles → ✅ `const` als Standard

---

## 💡 Best Practices für React

1. **Immutability:** Niemals State/Props direkt ändern
2. **Pure Functions:** Keine Seiteneffekte in Render-Logik
3. **Destructuring:** Props & State immer destructuren
4. **Array-Methoden:** map/filter statt Schleifen
5. **Spread Operator:** Für State-Updates
6. **Keys in Listen:** Immer unique ID als key
7. **Optional Chaining:** Für sichere Property-Zugriffe
8. **const Default:** Nur let wenn Reassignment nötig

---

**Viel Erfolg beim React-Kurs! 🚀**

_Diese Checkliste fokussiert sich auf das Wesentliche. Wenn du diese Konzepte beherrschst,
bist du bestens vorbereitet für React mit TypeScript!_
