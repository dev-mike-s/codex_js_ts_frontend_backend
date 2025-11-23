// ============================================
// 2.1 BEDINGTE ANWEISUNGEN
// Vorbereitung für React
// ============================================

/*
🎯 LERNZIEL: Nach diesem Kapitel verstehst du die 4 kritischen Patterns
für Bedingungen, die du für React JEDEN TAG brauchst.

Fokus: Ternärer Operator (JSX!), Guard Clauses, Truthy/Falsy, Switch (Reducers)
*/

// ============================================
// KONZEPT 1: TERNÄRER OPERATOR
// Der wichtigste Conditional für React
// ============================================

/*
KERNPROBLEM: if-else funktioniert nicht direkt in JSX
LÖSUNG: Ternärer Operator für Expressions

REGEL:
→ Syntax: bedingung ? wennTrue : wennFalse
→ Gibt immer einen Wert zurück (Expression!)
→ Perfekt für JSX, max. 1 Verschachtelung
→ Bei komplexer Logik: vor dem return verwenden
*/

// ──────────── Basis-Verwendung ────────────
let age = 20;
let status = age >= 18 ? "Erwachsen" : "Minderjährig";
console.log(status); // "Erwachsen"

// Vergleich mit if-else (gleicher Result, aber Statement!)
let status2;
if (age >= 18) {
  status2 = "Erwachsen";
} else {
  status2 = "Minderjährig";
}

// ──────────── In String-Templates ────────────
let name = "Max";
console.log(`Hallo ${name.length > 5 ? "langer" : "kurzer"} Name!`);

// ──────────── Inline-Berechnungen ────────────
let price = 100;
let discount = 10;
let finalPrice = discount > 0 ? price * 0.9 : price;
console.log("Preis:", finalPrice); // 90

// ──────────── ⚠️ VORSICHT: Zu viele Verschachtelungen ────────────
let score = 75;
// ❌ Unleserlich:
let grade = score >= 90 ? "A" : score >= 80 ? "B" : score >= 70 ? "C" : "F";

// ✅ Besser: if-else oder Logik vor dem return
let grade2;
if (score >= 90) grade2 = "A";
else if (score >= 80) grade2 = "B";
else if (score >= 70) grade2 = "C";
else grade2 = "F";

// ──────────── Null zurückgeben (wichtig für React!) ────────────
let showWarning = false;
let warning = showWarning ? "Achtung!" : null;
console.log(warning); // null

// In React: {error ? <Error /> : null} oder kürzer mit &&

// 💡 WARUM IST DAS FÜR REACT WICHTIG?
// → JSX erlaubt NUR Expressions, keine Statements
// → Ternär ist DAS Standard-Pattern für Conditional Rendering
// → {isLoading ? <Spinner /> : <Content />}
// → {error ? <ErrorMessage /> : null}
// → className={isActive ? "active" : "inactive"}
// → {count} {count === 1 ? "Item" : "Items"}

// ============================================
// KONZEPT 2: && OPERATOR FÜR CONDITIONAL RENDERING
// Die Kurzform für "Nur wenn true"
// ============================================

/*
KERNPROBLEM: Ternär mit null ist umständlich
LÖSUNG: && gibt den zweiten Wert zurück wenn truthy

REGEL:
→ bedingung && wert
→ Wenn bedingung falsy: gibt bedingung zurück
→ Wenn bedingung truthy: gibt wert zurück
→ Perfekt für "Zeige Komponente nur wenn..."
*/

// ──────────── Basis-Verwendung ────────────
let isLoggedIn = true;
let greeting = isLoggedIn && "Willkommen zurück!";
console.log(greeting); // "Willkommen zurück!"

isLoggedIn = false;
greeting = isLoggedIn && "Willkommen zurück!";
console.log(greeting); // false

// ──────────── Vergleich mit ternär ────────────
// Mit &&: kürzer
let message1 = isLoggedIn && "Eingeloggt";

// Mit ternär: länger
let message2 = isLoggedIn ? "Eingeloggt" : null;

// ──────────── ⚠️ VORSICHT: Falsy Werte werden gerendert! ────────────
let count = 0;
let display = count && <span>{count}</span>;
// Problem: count ist 0 (falsy), aber 0 wird in React gerendert!

// ✅ BESSER: Explizite Boolean-Konvertierung
display = count > 0 && <span>{count}</span>;
// Oder: !!count && <span>{count}</span>

// ──────────── Praktisches Beispiel ────────────
let items = ["A", "B", "C"];
let list = items.length > 0 && `${items.length} Items vorhanden`;
console.log(list); // "3 Items vorhanden"

items = [];
list = items.length > 0 && `${items.length} Items vorhanden`;
console.log(list); // false

// 💡 WARUM IST DAS FÜR REACT WICHTIG?
// → Häufigstes Pattern für Conditional Rendering
// → {isLoggedIn && <UserProfile />}
// → {items.length > 0 && <ItemList items={items} />}
// → {error && <ErrorBanner message={error} />}
// → ACHTUNG: {count && ...} kann 0 rendern!

// ============================================
// KONZEPT 3: TRUTHY/FALSY & GUARD CLAUSES
// Defensive Programmierung für React
// ============================================

/*
KERNPROBLEM: null/undefined führen zu Fehlern
LÖSUNG: Guard Clauses für frühes Abbrechen

REGEL:
→ Falsy: false, 0, "", null, undefined, NaN
→ Alles andere: truthy
→ Guard Clauses: Fehler-Fälle zuerst prüfen
→ Hauptlogik nur wenn alles OK
*/

// ──────────── Falsy Werte ────────────
console.log(Boolean(false)); // false
console.log(Boolean(0)); // false
console.log(Boolean("")); // false
console.log(Boolean(null)); // false
console.log(Boolean(undefined)); // false
console.log(Boolean(NaN)); // false

// ──────────── Truthy Werte (ACHTUNG!) ────────────
console.log(Boolean("0")); // true (String!)
console.log(Boolean([])); // true (Array!)
console.log(Boolean({})); // true (Objekt!)
console.log(Boolean(-1)); // true (negative Zahl!)

// ──────────── Guard Clauses Pattern ────────────
function processData(data) {
  // Guard 1: Prüfe auf null/undefined
  if (!data) {
    console.log("Keine Daten");
    return;
  }

  // Guard 2: Prüfe auf leeres Array
  if (!Array.isArray(data) || data.length === 0) {
    console.log("Leeres Array");
    return;
  }

  // Hauptlogik nur wenn alle Guards bestanden
  console.log(`Verarbeite ${data.length} Items`);
  data.forEach((item) => console.log(item));
}

processData([1, 2, 3]); // ✅ Funktioniert
processData(null); // Guard 1
processData([]); // Guard 2

// ──────────── Vergleich: Mit vs. Ohne Guards ────────────
// ❌ Ohne Guards: Tiefe Verschachtelung
function badProcess(data) {
  if (data) {
    if (Array.isArray(data)) {
      if (data.length > 0) {
        // Hauptlogik tief verschachtelt
        console.log("Verarbeite");
      }
    }
  }
}

// ✅ Mit Guards: Flacher, lesbarer
function goodProcess(data) {
  if (!data) return;
  if (!Array.isArray(data)) return;
  if (data.length === 0) return;

  // Hauptlogik auf oberster Ebene
  console.log("Verarbeite");
}

// ──────────── Optional Chaining (moderne Alternative) ────────────
let user = null;

// Alt: Verschachtelte Checks
if (user && user.address && user.address.city) {
  console.log(user.address.city);
}

// Neu: Optional Chaining
console.log(user?.address?.city); // undefined (kein Fehler!)

// 💡 WARUM IST DAS FÜR REACT WICHTIG?
// → Props können null/undefined sein
// → Guard Clauses am Anfang der Komponente
// → if (!data) return null; (Early Return)
// → Optional Chaining: user?.name statt user && user.name
// → Verhindert "Cannot read property of undefined" Fehler

// ============================================
// KONZEPT 4: SWITCH-CASE FÜR REDUCERS
// Das Pattern für State Management
// ============================================

/*
KERNPROBLEM: Viele if-else bei Actions unübersichtlich
LÖSUNG: switch-case für klare Action-Zuordnung

REGEL:
→ Gut für viele exakte Vergleiche (===)
→ break nicht vergessen (sonst Fall-Through)
→ default für unbekannte Actions
→ Standard-Pattern in Redux/useReducer
*/

// ──────────── Basis-Verwendung ────────────
let day = "Montag";

switch (day) {
  case "Montag":
    console.log("Start der Woche");
    break;
  case "Freitag":
    console.log("Fast Wochenende");
    break;
  case "Samstag":
  case "Sonntag": // Mehrere Cases
    console.log("Wochenende!");
    break;
  default:
    console.log("Normaler Tag");
}

// ──────────── ⚠️ VORSICHT: Fall-Through ohne break ────────────
let grade = "B";

switch (grade) {
  case "A":
    console.log("Ausgezeichnet");
  // Kein break! Fällt durch
  case "B":
    console.log("Gut"); // ✅ Wird ausgeführt
  // Kein break! Fällt durch
  case "C":
    console.log("Bestanden"); // ✅ Auch ausgeführt!
    break;
}

// ──────────── React Reducer Pattern ────────────
function counterReducer(state, action) {
  switch (action.type) {
    case "INCREMENT":
      return { count: state.count + 1 };
    case "DECREMENT":
      return { count: state.count - 1 };
    case "RESET":
      return { count: 0 };
    case "SET":
      return { count: action.payload };
    default:
      return state; // Wichtig: Immer state zurückgeben
  }
}

// Verwendung simulieren
let state = { count: 5 };
state = counterReducer(state, { type: "INCREMENT" });
console.log(state); // { count: 6 }

state = counterReducer(state, { type: "RESET" });
console.log(state); // { count: 0 }

// ──────────── Switch vs. If-Else ────────────

// ✅ SWITCH gut für: Exakte String/Number-Vergleiche
let command = "start";
switch (command) {
  case "start":
    console.log("Starten");
    break;
  case "stop":
    console.log("Stoppen");
    break;
  case "pause":
    console.log("Pausieren");
    break;
}

// ✅ IF-ELSE gut für: Bereiche, komplexe Bedingungen
let score2 = 85;
if (score2 >= 90) {
  console.log("A");
} else if (score2 >= 80) {
  console.log("B"); // Einfacher als 10 case-Statements
} else if (score2 >= 70) {
  console.log("C");
}

// 💡 WARUM IST DAS FÜR REACT WICHTIG?
// → useReducer Hook verwendet switch für State-Updates
// → Redux Reducers sind immer mit switch
// → Klare Action-Typen: "ADD_TODO", "DELETE_TODO"
// → default case verhindert Bugs bei unbekannten Actions
// → Immutable Updates: return neues Objekt, nicht state mutieren

// ============================================
// BONUS: IF-ELSE BASICS (Kurzform)
// ============================================

// ──────────── Einfaches if ────────────
let age2 = 20;
if (age2 >= 18) {
  console.log("Volljährig");
}

// ──────────── if-else ────────────
let temp = 15;
if (temp > 25) {
  console.log("Warm");
} else {
  console.log("Kühl");
}

// ──────────── if-else if-else ────────────
let points = 75;
if (points >= 90) {
  console.log("A");
} else if (points >= 80) {
  console.log("B");
} else if (points >= 70) {
  console.log("C");
} else {
  console.log("F");
}

// ⚠️ WICHTIG: Vom Spezifischen zum Allgemeinen!
let score3 = 95;

// ❌ Falsch: Erste Bedingung wird genommen
if (score3 >= 50) {
  console.log("Bestanden"); // Stoppt hier!
} else if (score3 >= 90) {
  console.log("Sehr gut"); // Wird nie erreicht
}

// ✅ Richtig: Spezifischste Bedingung zuerst
if (score3 >= 90) {
  console.log("Sehr gut");
} else if (score3 >= 50) {
  console.log("Bestanden");
}

// ──────────── Logische Operatoren ────────────
let isWeekend = true;
let hasVacation = false;

// && (beide müssen true sein)
if (isWeekend && hasVacation) {
  console.log("Frei und Urlaub");
}

// || (mindestens eine muss true sein)
if (isWeekend || hasVacation) {
  console.log("Freizeit!");
}

// ! (Negation)
if (!hasVacation) {
  console.log("Kein Urlaub");
}

// ============================================
// ZUSAMMENFASSUNG
// Die 4 kritischen Patterns
// ============================================

/*
┌─────────────────────────────────────────────────────────────┐
│ 1. TERNÄRER OPERATOR                                        │
├─────────────────────────────────────────────────────────────┤
│ condition ? true : false        │ Expression für JSX       │
│ Max. 1 Verschachtelung          │ Sonst if-else verwenden  │
│ Perfekt für inline-Conditions   │ className, text, etc.    │
│ null als "nichts rendern"       │ error ? <Err /> : null   │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ 2. && OPERATOR                                              │
├─────────────────────────────────────────────────────────────┤
│ condition && <Component />      │ Nur wenn truthy          │
│ ACHTUNG: 0 wird gerendert!      │ count > 0 && ...         │
│ Kürzer als ternär mit null      │ Standard-Pattern         │
│ Short-Circuit Evaluation        │ Stoppt bei falsy         │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ 3. TRUTHY/FALSY & GUARD CLAUSES                            │
├─────────────────────────────────────────────────────────────┤
│ Falsy: false,0,"",null,undef,NaN│ Alles andere: truthy     │
│ Guard Clauses für Early Return │ if (!data) return null   │
│ Optional Chaining modern        │ user?.name               │
│ Defensive Programmierung        │ Fehler-Fälle zuerst      │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ 4. SWITCH-CASE FÜR REDUCERS                                │
├─────────────────────────────────────────────────────────────┤
│ Viele exakte Vergleiche         │ action.type === "..."    │
│ break nicht vergessen!          │ Sonst Fall-Through       │
│ default für unbekannte Actions  │ return state             │
│ Standard in useReducer/Redux    │ Immutable Updates        │
└─────────────────────────────────────────────────────────────┘


HÄUFIGE FEHLER (und wie man sie vermeidet):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
❌ if in JSX verwenden              → Verwende ternär oder &&
❌ count && <Component />           → Rendert 0! Verwende count > 0
❌ Zu viele ternäre Verschachtelungen → if-else vor return verwenden
❌ break in switch vergessen        → Fall-Through Bug
❌ default in Reducer vergessen     → Unbekannte Actions crashen
❌ state direkt mutieren im Reducer → Immer neues Objekt returnen


DEBUGGING-TIPPS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
→ Boolean-Konvertierung testen:     console.log(!!value)
→ Ternär Zwischenergebnisse:        const result = cond ? a : b; console.log(result)
→ Guard Clauses mit Logs:           if (!data) { console.log("no data"); return }
→ Reducer State ausgeben:           console.log("State:", state, "Action:", action)
→ Falsy-Check:                      console.log("Falsy?", !value)


VORBEREITUNG FÜR REACT:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Diese Patterns wirst du in React JEDEN TAG verwenden:

→ Ternär für Conditional Rendering: {loading ? <Spinner /> : <Content />}
→ && für "nur wenn":                {isLoggedIn && <Profile />}
→ Guard Clauses in Komponenten:     if (!data) return null;
→ Optional Chaining:                {user?.name || "Anonymous"}
→ Switch in Reducers:               case "ADD": return {...state, items: [...]}

KRITISCHE PATTERN-KOMBINATIONEN:
→ {items?.length > 0 && <List items={items} />}
→ {error ? <Error /> : loading ? <Spinner /> : <Content />}
→ className={isActive ? "active" : "inactive"}
→ if (!isValid) return <ValidationError />;

Merke: In JSX kannst du nur Expressions verwenden!
Ternär und && sind deine wichtigsten Werkzeuge.
*/

console.log("\n✅ Bedingte Anweisungen abgeschlossen!");
console.log("💡 Ternär & && sind die Basis für React Conditional Rendering!");
