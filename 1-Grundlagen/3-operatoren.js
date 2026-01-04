// ============================================
// 1.3 OPERATOREN IN JAVASCRIPT
// Vorbereitung für React
// ============================================

/*
🎯 LERNZIEL: Nach diesem Kapitel verstehst du die 5 kritischen Operatoren-Konzepte,
die du für React JEDEN TAG brauchst.

Fokus: Nicht alles wissen, sondern das Wichtige RICHTIG verstehen.
*/

// ============================================
// KONZEPT 1: TYPE COERCION
// Das größte "Aha!"-Moment
// ============================================

/*
KERNPROBLEM: JavaScript konvertiert Typen automatisch - manchmal überraschend!

REGEL FÜR +:
→ String dabei? Alle werden zu String (Verkettung)
→ Kein String? Alle werden zu Number (Addition)

REGEL FÜR - * / %:
→ IMMER Number-Konvertierung (keine Ausnahmen)
*/

// ──────────── String + Number ────────────
console.log(5 + "5"); // "55" (5 wird zu "5", dann verketten)
console.log("Summe: " + 10); // "Summe: 10" (String-Verkettung)

// ──────────── Number - String ────────────
console.log("10" - 5); // 5 ("10" wird zu 10, dann rechnen)
console.log("10" * "2"); // 20 (beide zu Number)
console.log("20" / "4"); // 5 (beide zu Number)

// ──────────── Reihenfolge ist kritisch! ────────────
console.log(5 + 5 + "5"); // "105"
// Schritt 1: 5 + 5 = 10
// Schritt 2: 10 + "5" = "105"

console.log("5" + 5 + 5); // "555"
// Schritt 1: "5" + 5 = "55"
// Schritt 2: "55" + 5 = "555"

// ──────────── Konvertierung zu Number ────────────
console.log(true + true); // 2 (true wird zu 1)
console.log(null * 5); // 0 (null wird zu 0)
console.log(undefined + 5); // NaN (undefined wird zu NaN)

// 💡 WARUM IST DAS FÜR REACT WICHTIG?
// → User-Input ist immer String: <input value={value} />
// → Du musst konvertieren: Number(value) oder +value
// → Berechnungen können sonst zu "55" statt 10 führen

// ============================================
// KONZEPT 2: VERGLEICHE (=== vs ==)
// Der wichtigste Unterschied
// ============================================

/*
KERNPROBLEM: == konvertiert Typen automatisch → unpredictable
LÖSUNG: IMMER === verwenden (strikte Gleichheit)

REGEL:
=== prüft Typ UND Wert
== konvertiert erst, dann vergleicht (GEFÄHRLICH!)
*/

// ──────────── Loose Equality (==) - NICHT VERWENDEN! ────────────
console.log(5 == "5"); // true (String wird zu Number)
console.log(0 == false); // true (false wird zu 0)
console.log("" == false); // true (beide werden zu 0)
console.log(null == undefined); // true (Spezialfall)

// ──────────── Strict Equality (===) - IMMER VERWENDEN! ────────────
console.log(5 === "5"); // false (Number !== String)
console.log(0 === false); // false (Number !== Boolean)
console.log("" === false); // false (String !== Boolean)
console.log(null === undefined); // false (verschiedene Typen)

// ──────────── Richtige Verwendung ────────────
console.log(5 === 5); // true (gleicher Typ, gleicher Wert)
console.log("Hi" === "Hi"); // true

// Ungleichheit
console.log(5 !== "5"); // true (verwende !==, nicht !=)
console.log(5 !== 6); // true

// Andere Vergleiche (konvertieren auch zu Number)
console.log(10 > 5); // true
console.log("10" > 5); // true ("10" wird zu 10)
console.log("10" > "9"); // false! (String-Vergleich: "1" < "9")

// 💡 WARUM IST DAS FÜR REACT WICHTIG?
// → Props vergleichen: if (user.role === "admin")
// → State vergleichen: if (count === 0)
// → Event-Handler: onClick={() => id === activeId}
// → Ein einziger == Bug kann Stunden Debugging kosten!

// ============================================
// KONZEPT 3: LOGISCHE OPERATOREN (&& ||)
// Sie geben WERTE zurück, nicht Boolean!
// ============================================

/*
KERNPROBLEM: && und || geben nicht true/false zurück!
Sie geben den Original-Wert zurück!

&& (UND) - Der Pessimist:
→ Stoppt beim ersten falsy Wert
→ Gibt diesen Wert zurück (nicht false!)
→ Wenn alle truthy: gibt letzten Wert zurück

|| (ODER) - Der Optimist:
→ Stoppt beim ersten truthy Wert
→ Gibt diesen Wert zurück (nicht true!)
→ Wenn alle falsy: gibt letzten Wert zurück
*/

// ──────────── && Beispiele ────────────
console.log(true && "Hallo"); // "Hallo" (nicht true!)
console.log("" && "Hallo"); // "" (stoppt bei falsy)
console.log("Hi" && "Welt"); // "Welt" (beide truthy → letzter)
console.log(0 && 100); // 0 (stoppt bei falsy)
console.log(null && "Test"); // null (stoppt bei falsy)

// ──────────── || Beispiele ────────────
console.log(false || "Hallo"); // "Hallo" (erster truthy)
console.log("" || "Default"); // "Default" (erster truthy)
console.log("Hi" || "Hallo"); // "Hi" (stoppt bei truthy)
console.log(0 || 100); // 100 (erster truthy)
console.log(null || undefined); // undefined (beide falsy → letzter)

// ──────────── Falsy vs Truthy ────────────
// FALSY (6 Werte):
// false, 0, "", null, undefined, NaN

// TRUTHY (alles andere!):
console.log(Boolean("0")); // true (String "0" ist truthy!)
console.log(Boolean([])); // true (leeres Array ist truthy!)
console.log(Boolean({})); // true (leeres Objekt ist truthy!)
console.log(Boolean(-1)); // true (negative Zahlen sind truthy!)

// ──────────── Praktische Anwendung ────────────
// Default-Wert mit ||
let username = "";
let displayName = username || "Gast"; // "Gast" (weil "" falsy ist)
console.log(displayName);

// Kurzschluss-Auswertung (Short-Circuit)
let user = null;
let name = user && user.name; // null (stoppt bei user, kein Fehler!)
console.log(name);

// 💡 WARUM IST DAS FÜR REACT WICHTIG?
// → Conditional Rendering: isLoggedIn && <Profile />
// → Default-Werte: title || "Untitled"
// → Sichere Property-Zugriffe: user && user.name
// → Verhindert Fehler: items.length > 0 && items.map(...)

// ============================================
// KONZEPT 4: NULLISH COALESCING (??)
// Der bessere || für Default-Werte
// ============================================

/*
KERNPROBLEM: || behandelt 0, "", false als "nicht vorhanden"
LÖSUNG: ?? interessiert sich NUR für null und undefined

REGEL:
|| → ersetzt alle falsy Werte (0, "", false, null, undefined, NaN)
?? → ersetzt nur nullish Werte (null, undefined)
*/

// ──────────── Problem mit || ────────────
let count = 0;
console.log(count || "Keine"); // "Keine" ❌ (0 ist gültig!)

let text = "";
console.log(text || "Leer"); // "Leer" ❌ ("" ist gültig!)

let isActive = false;
console.log(isActive || true); // true ❌ (false ist gültig!)

// ──────────── Lösung mit ?? ────────────
console.log(count ?? "Keine"); // 0 ✅ (0 ist nicht nullish)
console.log(text ?? "Leer"); // "" ✅ ("" ist nicht nullish)
console.log(isActive ?? true); // false ✅ (false ist nicht nullish)

console.log(null ?? "Default"); // "Default" ✅ (null ist nullish)
console.log(undefined ?? "Default"); // "Default" ✅ (undefined ist nullish)

// ──────────── Wann was verwenden? ────────────
// Verwende || wenn:
// → Du wirklich alle falsy Werte ersetzen willst
let greeting = userGreeting || "Hallo"; // "" soll zu "Hallo" werden

// Verwende ?? wenn:
// → 0, "", false sind gültige Werte
let defaultCount = userCount ?? 0; // 0 soll 0 bleiben
let showTitle = title ?? "Untitled"; // "" soll "" bleiben

// 💡 WARUM IST DAS FÜR REACT WICHTIG?
// → Props mit Default-Werten: const size = props.size ?? "medium"
// → Verhindert Bugs: count ?? 0 (nicht count || 0)
// → API-Responses: data.value ?? fallbackValue

// ============================================
// KONZEPT 5: TERNÄRER OPERATOR (? :)
// if-else in einer Zeile
// ============================================

/*
SYNTAX: bedingung ? wennTrue : wennFalse

REGEL:
→ Perfekt für einfache if-else
→ Gibt immer einen Wert zurück (gut für Zuweisungen)
→ Nicht zu tief verschachteln (max. 1 Ebene)
*/

// ──────────── Basis-Verwendung ────────────
let age = 20;
let status = age >= 18 ? "Erwachsen" : "Minderjährig";
console.log(status); // "Erwachsen"

// ──────────── In Berechnungen ────────────
let price = 100;
let discount = 10;
let finalPrice = discount > 0 ? price * 0.9 : price;
console.log(finalPrice); // 90

// ──────────── Mit Strings ────────────
let items = 3;
let message = items === 1 ? "1 Item" : `${items} Items`;
console.log(message); // "3 Items"

// ──────────── Vergleich mit if-else ────────────
// Ternär (besser für Zuweisung):
let result = condition ? "A" : "B";

// If-else (besser für Logik):
let result2;
if (condition) {
  result2 = "A";
} else {
  result2 = "B";
}

// ──────────── ⚠️ VORSICHT: Zu viele Verschachtelungen ────────────
// ❌ Unleserlich:
let grade = score >= 90 ? "A" : score >= 80 ? "B" : score >= 70 ? "C" : "F";

// ✅ Besser: if-else verwenden
let grade2;
if (score >= 90) grade2 = "A";
else if (score >= 80) grade2 = "B";
else if (score >= 70) grade2 = "C";
else grade2 = "F";

// 💡 WARUM IST DAS FÜR REACT WICHTIG?
// → JSX: {isLoading ? <Spinner /> : <Content />}
// → Dynamische Props: <Button disabled={!isValid ? true : false} />
// → Styles: className={isActive ? "active" : "inactive"}
// → Texte: {count} {count === 1 ? "Item" : "Items"}

// ============================================
// BONUS: WEITERE WICHTIGE OPERATOREN
// (Kurz & prägnant)
// ============================================

// ──────────── Modulo (%) - Rest der Division ────────────
console.log(10 % 3); // 2 (Rest von 10÷3)
console.log(7 % 2); // 1 (gerade/ungerade prüfen)

// Praktisch:
let isEven = 8 % 2 === 0; // true (gerade Zahl)
let isOdd = 7 % 2 !== 0; // true (ungerade Zahl)

// ──────────── Potenz (**) ────────────
console.log(2 ** 3); // 8 (2³)
console.log(5 ** 2); // 25 (5²)

// ──────────── Increment/Decrement (++ --) ────────────
let x = 5;
console.log(x++); // 5 (gibt zurück, DANN erhöht)
console.log(x); // 6

console.log(++x); // 7 (erst erhöht, DANN zurück)
console.log(x); // 7

// ⚠️ In React: NIEMALS für State verwenden!
// ❌ count++
// ✅ setCount(count + 1)

// ──────────── Assignment-Operatoren (+=, -=, *=, /=) ────────────
let value = 10;
value += 5; // value = value + 5 → 15
value -= 3; // value = value - 3 → 12
value *= 2; // value = value * 2 → 24
value /= 4; // value = value / 4 → 6

// ⚠️ In React: NIEMALS für State verwenden!
// ❌ state += 1
// ✅ setState(state + 1)

// ──────────── Negation (!) ────────────
console.log(!true); // false
console.log(!false); // true
console.log(!!5); // true (zu Boolean konvertieren)
console.log(!!""); // false

// ============================================
// ZUSAMMENFASSUNG
// Die 5 kritischen Konzepte
// ============================================

/*
┌─────────────────────────────────────────────────────────────┐
│ 1. TYPE COERCION                                            │
├─────────────────────────────────────────────────────────────┤
│ + mit String → Verkettung        │ "5" + 5 = "55"          │
│ - * / % → immer Number           │ "5" - 5 = 0             │
│ Reihenfolge beachten!            │ 5+5+"5" vs "5"+5+5      │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ 2. VERGLEICHE                                               │
├─────────────────────────────────────────────────────────────┤
│ === IMMER verwenden              │ 5 === "5" ist false     │
│ == NIEMALS verwenden             │ 5 == "5" ist true ❌    │
│ !== für Ungleichheit             │ 5 !== "5" ist true      │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ 3. LOGISCHE OPERATOREN                                      │
├─────────────────────────────────────────────────────────────┤
│ && stoppt bei falsy              │ "" && "Hi" = ""         │
│ || stoppt bei truthy             │ "" || "Hi" = "Hi"       │
│ Geben Werte zurück, nicht Bool!  │ true && "x" = "x"       │
│ Falsy: false,0,"",null,undef,NaN │ Boolean([]) = true      │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ 4. NULLISH COALESCING                                       │
├─────────────────────────────────────────────────────────────┤
│ ?? nur für null/undefined        │ 0 ?? 10 = 0             │
│ || für alle falsy                │ 0 || 10 = 10            │
│ Verwende ?? für Default-Werte    │ count ?? 0              │
└─────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────┐
│ 5. TERNÄRER OPERATOR                                        │
├─────────────────────────────────────────────────────────────┤
│ condition ? true : false         │ age >= 18 ? "ja" : "nein"│
│ Gut für Zuweisungen              │ let x = a ? b : c        │
│ Nicht zu tief verschachteln!     │ Max. 1 Ebene            │
└─────────────────────────────────────────────────────────────┘


HÄUFIGE FEHLER (und wie man sie vermeidet):
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
❌ "5" + 5 erwarten 10            → Konvertiere: Number("5") + 5
❌ 5 == "5" verwenden             → IMMER === verwenden
❌ 0 && <Component>               → 0 wird gerendert! Besser: length > 0 &&
❌ count || 0 als Default         → Ersetzt auch count=0! Besser: count ?? 0
❌ Zu viele ternäre Operatoren    → Ab 2 Ebenen if-else verwenden


DEBUGGING-TIPPS:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
→ typeof prüfen:                   console.log(typeof value)
→ Beide Seiten ausgeben:           console.log(a, typeof a, b, typeof b)
→ Boolean-Konvertierung testen:    console.log(!!value)
→ Zwischenergebnisse loggen:       const result = a && b; console.log(result)


VORBEREITUNG FÜR REACT:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Diese Operatoren wirst du in React JEDEN TAG verwenden:

→ && für Conditional Rendering:    {isLoggedIn && <Profile />}
→ || für Default-Werte:            {title || "Untitled"}
→ ?? für Props:                    {count ?? 0}
→ Ternär für Either/Or:            {loading ? <Spinner /> : <Content />}
→ === für Vergleiche:              {id === activeId ? "active" : ""}

Merke: Keine direkte State-Mutation!
❌ count++, state += 1
✅ setCount(count + 1), setState(state + 1)
*/

console.log("\n✅ Operatoren abgeschlossen!");
console.log("💡 Diese 5 Konzepte sind deine Basis für React!");
