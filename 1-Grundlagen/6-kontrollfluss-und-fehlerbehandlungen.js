// ============================================
// FEHLERBEHANDLUNG & KONTROLLFLUSS
// Vorbereitung für React
// ============================================

/*
🎯 LERNZIEL: Nach diesem Kapitel verstehst du die 3 kritischen Patterns
für sichere Fehlerbehandlung, die du für React JEDEN TAG brauchst.

Fokus: try-catch für API-Calls, Guard Clauses für Props, Error Boundaries
*/

// ============================================
// KONZEPT 1: TRY-CATCH
// Fehler sicher abfangen
// ============================================

/*
KERNPROBLEM: Fehler crashen die ganze App
LÖSUNG: try-catch für Code, der fehlschlagen kann

REGEL:
→ try: Code der Fehler werfen könnte
→ catch: Wird NUR bei Fehler ausgeführt
→ finally: Läuft IMMER (optional)
→ Für API-Calls, JSON-Parsing, unsichere Operationen
*/

// ──────────── Basis-Verwendung ────────────
try {
  console.log("1. Code im try");

  // Fehler provozieren:
  const obj = null;
  console.log(obj.name); // TypeError!

  console.log("2. Wird nie erreicht");
} catch (error) {
  console.log("Fehler:", error.message);
}

console.log("3. Programm läuft weiter"); // ✅ App crasht nicht

// ──────────── Praktisch: JSON parsen ────────────
function parseJSON(jsonString) {
  try {
    return JSON.parse(jsonString);
  } catch (error) {
    console.log("Ungültiges JSON:", error.message);
    return null; // Fallback-Wert
  }
}

console.log(parseJSON('{"name":"Max"}')); // { name: "Max" }
console.log(parseJSON("invalid")); // null

// ──────────── Praktisch: API-Call (simuliert) ────────────
async function fetchUser(id) {
  try {
    // const response = await fetch(`/api/users/${id}`);
    // const data = await response.json();

    // Simuliere Fehler:
    if (id < 0) throw new Error("Invalid ID");

    return { id, name: "Max" };
  } catch (error) {
    console.log("API-Fehler:", error.message);
    return null;
  }
}

// ──────────── finally - Cleanup Code ────────────
function processFile(filename) {
  let fileOpen = false;

  try {
    console.log("Öffne Datei:", filename);
    fileOpen = true;

    // Verarbeitung...
    if (!filename) throw new Error("Kein Dateiname");

    console.log("Verarbeite Datei");
  } catch (error) {
    console.log("Fehler:", error.message);
  } finally {
    if (fileOpen) {
      console.log("Schließe Datei"); // ✅ Läuft immer
    }
  }
}

processFile("data.txt");
processFile(null);

// 💡 WARUM IST DAS FÜR REACT WICHTIG?
// → API-Calls in useEffect mit try-catch absichern
// → JSON-Parsing von localStorage
// → Fehler verhindern App-Crash
// → Error Boundaries fangen Render-Fehler
// → finally für Cleanup (Loading-States)

// ============================================
// KONZEPT 2: GUARD CLAUSES
// Defensive Programmierung für Props
// ============================================

/*
KERNPROBLEM: Props können null/undefined sein → Fehler
LÖSUNG: Guard Clauses am Anfang der Funktion

REGEL:
→ Fehler-Fälle ZUERST prüfen
→ Early Return bei Problemen
→ Hauptlogik nur wenn alles OK
→ Code bleibt flach, nicht verschachtelt
*/

// ──────────── Ohne Guard Clauses (schlecht) ────────────
function processDataBad(data) {
  if (data) {
    if (Array.isArray(data)) {
      if (data.length > 0) {
        // Hauptlogik tief verschachtelt
        console.log("Verarbeite", data.length, "Items");
      }
    }
  }
}

// ──────────── Mit Guard Clauses (gut) ────────────
function processData(data) {
  // Guard 1: null/undefined prüfen
  if (!data) {
    console.log("Keine Daten");
    return; // Early Return
  }

  // Guard 2: Typ prüfen
  if (!Array.isArray(data)) {
    console.log("Kein Array");
    return;
  }

  // Guard 3: Leer prüfen
  if (data.length === 0) {
    console.log("Leeres Array");
    return;
  }

  // Hauptlogik auf oberster Ebene
  console.log("Verarbeite", data.length, "Items");
  data.forEach((item) => console.log(item));
}

processData(null); // Guard 1
processData("not array"); // Guard 2
processData([]); // Guard 3
processData([1, 2, 3]); // ✅ Hauptlogik

// ──────────── React-Pattern: Component Guards ────────────
function UserProfile({ user }) {
  // Guard: Kein User
  if (!user) {
    return null; // Oder <EmptyState />
  }

  // Guard: Keine ID
  if (!user.id) {
    console.warn("User ohne ID");
    return null;
  }

  // Hauptlogik - nur wenn User valid
  return `<div>Name: ${user.name}</div>`;
}

// ──────────── Optional Chaining (moderne Alternative) ────────────
const user = null;

// Alt: Verschachtelte Checks
if (user && user.address && user.address.city) {
  console.log(user.address.city);
}

// Neu: Optional Chaining
console.log(user?.address?.city); // undefined (kein Fehler!)

// Mit Nullish Coalescing kombinieren
const city = user?.address?.city ?? "Unbekannt";
console.log(city); // "Unbekannt"

// 💡 WARUM IST DAS FÜR REACT WICHTIG?
// → Props können undefined sein
// → Guard am Anfang der Component
// → Optional Chaining für nested Properties
// → Verhindert "Cannot read property of undefined"
// → if (!data) return null; ist Standard-Pattern

// ============================================
// KONZEPT 3: EIGENE FEHLER WERFEN
// Validierung & Custom Errors
// ============================================

/*
KERNPROBLEM: Fehler müssen kontrolliert weitergegeben werden
LÖSUNG: throw new Error() für eigene Fehler

REGEL:
→ throw new Error("message") für Validierung
→ Fehler können mit try-catch gefangen werden
→ Aussagekräftige Error-Messages
→ Nur für echte Fehler, nicht für normale Logik
*/

// ──────────── Basis: Fehler werfen ────────────
function validateAge(age) {
  if (age < 0) {
    throw new Error("Alter kann nicht negativ sein");
  }

  if (age < 18) {
    throw new Error("Mindestalter 18 Jahre");
  }

  console.log("Alter gültig:", age);
}

// Fehler abfangen
try {
  validateAge(15);
} catch (error) {
  console.log("Validierung fehlgeschlagen:", error.message);
}

// ──────────── Praktisch: Form-Validierung ────────────
function validateForm(formData) {
  if (!formData.email) {
    throw new Error("Email erforderlich");
  }

  if (!formData.email.includes("@")) {
    throw new Error("Ungültige Email");
  }

  if (formData.password.length < 8) {
    throw new Error("Passwort zu kurz (min. 8 Zeichen)");
  }

  return true;
}

// In React-Component verwenden
function handleSubmit(formData) {
  try {
    validateForm(formData);
    console.log("Form gültig, sende Daten...");
  } catch (error) {
    console.log("Fehler:", error.message);
    // setError(error.message)
  }
}

// ──────────── Error-Typen verstehen ────────────
try {
  JSON.parse("{invalid}");
} catch (error) {
  console.log("Type:", error.name); // "SyntaxError"
  console.log("Message:", error.message); // Details
  console.log("Stack:", error.stack); // Wo ist Fehler?
}

// Häufige Error-Typen:
// SyntaxError: Ungültiger Code/JSON
// TypeError: Falscher Datentyp (null.property)
// ReferenceError: Variable nicht definiert
// RangeError: Wert außerhalb Bereich

// 💡 WARUM IST DAS FÜR REACT WICHTIG?
// → Form-Validierung vor Submit
// → Custom Hooks können Fehler werfen
// → Error Messages für User-Feedback
// → API-Validierung vor Request

// ============================================
// BONUS: BREAK & CONTINUE (Kurzform)
// ============================================

/*
HINWEIS: In React verwendest du diese SELTEN!
Array-Methoden (map, filter, find) sind besser.
*/

// ──────────── break - Schleife beenden ────────────
const numbers = [1, 2, 3, 4, 5];

for (let i = 0; i < numbers.length; i++) {
  if (numbers[i] === 3) {
    console.log("Gefunden:", numbers[i]);
    break; // Stoppt Schleife
  }
}

// ✅ BESSER in React: find()
const found = numbers.find((num) => num === 3);
console.log("Gefunden:", found);

// ──────────── continue - Durchlauf überspringen ────────────
for (let i = 0; i < 10; i++) {
  if (i % 2 === 0) {
    continue; // Überspringt gerade Zahlen
  }
  console.log(i); // 1, 3, 5, 7, 9
}

// ✅ BESSER in React: filter()
const odds = [...Array(10).keys()].filter((i) => i % 2 !== 0);
console.log(odds);

// 💡 WARUM IST DAS FÜR REACT WICHTIG?
// → In React: Fast nie break/continue
// → Array-Methoden sind deklarativer
// → find() statt for + break
// → filter() statt for + continue

// ============================================
// REACT-SPEZIFISCH: ERROR BOUNDARIES
// ============================================

/*
Error Boundaries fangen Render-Fehler in React.
Hier nur zur Info - wird im React-Kurs behandelt.

class ErrorBoundary extends React.Component {
  state = { hasError: false };
  
  static getDerivedStateFromError(error) {
    return { hasError: true };
  }
  
  componentDidCatch(error, errorInfo) {
    console.log("Error:", error, errorInfo);
  }
  
  render() {
    if (this.state.hasError) {
      return <h1>Etwas ist schiefgelaufen.</h1>;
    }
    return this.props.children;
  }
}

// Verwendung:
<ErrorBoundary>
  <MyComponent />
</ErrorBoundary>
*/

// ============================================
// PRAKTISCHE PATTERNS FÜR REACT
// ============================================

// ──────────── Pattern 1: API-Call mit Error ────────────
async function loadUser(id) {
  try {
    // const response = await fetch(`/api/users/${id}`);
    // if (!response.ok) throw new Error("User nicht gefunden");
    // const data = await response.json();

    // Simuliert:
    if (id < 0) throw new Error("Ungültige ID");
    return { id, name: "Max" };
  } catch (error) {
    console.error("Fehler beim Laden:", error.message);
    // In React: setError(error.message)
    return null;
  }
}

// ──────────── Pattern 2: Safe JSON Parse ────────────
function safeGetFromStorage(key) {
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.error("localStorage Error:", error.message);
    return null;
  }
}

// ──────────── Pattern 3: Component mit Guards ────────────
function ProductCard({ product }) {
  // Guards
  if (!product) return null;
  if (!product.id) {
    console.warn("Product without ID");
    return null;
  }

  // Optional Chaining für nested Props
  const imageUrl = product.images?.[0]?.url ?? "/placeholder.jpg";
  const price = product.price ?? 0;

  // Hauptlogik
  return `
    <div>
      <img src="${imageUrl}" />
      <h3>${product.name}</h3>
      <p>${price}€</p>
    </div>
  `;
}

// ──────────── Pattern 4: Form Validation ────────────
function submitForm(formData) {
  try {
    // Validierung
    if (!formData.email) throw new Error("Email erforderlich");
    if (!formData.password) throw new Error("Passwort erforderlich");

    // Submit
    console.log("Form submitted:", formData);
    // In React: await api.post("/login", formData)
  } catch (error) {
    console.error("Form Error:", error.message);
    // In React: setError(error.message)
  }
}

// ============================================
// ZUSAMMENFASSUNG
// Die 3 kritischen Patterns
// ============================================

/*
┌─────────────────────────────────────────────────────────────┐
│ 1. TRY-CATCH                                                │
├─────────────────────────────────────────────────────────────┤
│ Für unsichere Operationen       │ API-Calls, JSON-Parsing  │
│ catch: Fehler abfangen           │ App crasht nicht         │
│ finally: Cleanup (optional)      │ Läuft immer              │
│ Fehler loggen, User informieren  │ Nicht stillschweigend!   │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ 2. GUARD CLAUSES                                            │
├─────────────────────────────────────────────────────────────┤
│ Fehler-Fälle ZUERST             │ if (!data) return null   │
│ Early Return                     │ Code bleibt flach        │
│ Optional Chaining modern         │ user?.address?.city      │
│ Standard in React Components     │ Props-Validierung        │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ 3. EIGENE FEHLER WERFEN                                     │
├─────────────────────────────────────────────────────────────┤
│ throw new Error("message")       │ Für Validierung          │
│ Aussagekräftige Messages         │ User versteht Fehler     │
│ Mit try-catch fangen             │ Kontrollierte Fehler     │
│ Nicht für normale Logik          │ Nur echte Fehler         │
└─────────────────────────────────────────────────────────────┘


HÄUFIGE FEHLER (und wie man sie vermeidet):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
❌ try-catch ignorieren              → Fehler lassen App crashen
❌ Fehler stillschweigend fangen     → catch {} ohne Handling
❌ Zu viele try-catch                → Nur wo wirklich nötig
❌ Keine Guards bei Props            → "Cannot read property of undefined"
❌ break/continue statt filter/find  → Array-Methoden bevorzugen


DEBUGGING-TIPPS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
→ error.message für User-Feedback
→ error.stack für Debugging
→ console.error() statt console.log()
→ Browser Dev Tools: Pause on Exceptions
→ React Dev Tools: Error Boundaries


VORBEREITUNG FÜR REACT:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Diese Patterns wirst du in React JEDEN TAG verwenden:

→ API-Calls mit try-catch:         try { await fetch() } catch { ... }
→ Guards in Components:             if (!props.user) return null;
→ Optional Chaining:                user?.profile?.avatar ?? "/default.jpg"
→ localStorage mit try-catch:       try { JSON.parse() } catch { null }
→ Form-Validierung:                 throw new Error("Email required")

KRITISCHE PATTERNS:
→ useEffect mit async:              useEffect(() => { async function load() { try { await fetch() } catch {} } load() }, [])
→ Error States:                     const [error, setError] = useState(null)
→ Loading + Error:                  {loading ? <Spinner /> : error ? <Error /> : <Data />}
→ Error Boundaries:                 <ErrorBoundary><App /></ErrorBoundary>

WICHTIGSTE REGEL:
Fehler IMMER behandeln, nie ignorieren!
- API-Calls können fehlschlagen
- Props können undefined sein
- User-Input muss validiert werden
- localStorage kann voll sein
→ try-catch, Guards, Optional Chaining sind deine Freunde
*/

console.log("\n✅ Fehlerbehandlung abgeschlossen!");
console.log("💡 try-catch und Guards sind essentiell für sichere React-Apps!");
