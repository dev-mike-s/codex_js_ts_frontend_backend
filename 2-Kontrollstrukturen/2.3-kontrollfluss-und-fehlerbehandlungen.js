// ============================================
// 2.3 KONTROLLFLUSS & FEHLERBEHANDLUNG
// ============================================

// ============================================
// BREAK - Schleife verlassen
// ============================================

console.log("--- BREAK: Schleife beenden ---");

// Einfaches Beispiel: Suche in Array
let zahlen = [1, 2, 3, 4, 5];

for (let i = 0; i < zahlen.length; i++) {
  if (zahlen[i] === 3) {
    console.log("Zahl 3 gefunden bei Index", i);
    break; // ✅ Schleife wird komplett beendet
  }
  console.log("Prüfe:", zahlen[i]);
}

// Ausgabe:
// Prüfe: 1
// Prüfe: 2
// Zahl 3 gefunden bei Index 2
// (Schleife stoppt - 4 und 5 werden nicht geprüft)

// PRAKTISCHES BEISPIEL: Benutzer authentifizieren
console.log("\n--- Login-Versuche ---");

function anmeldenMitVersuchen() {
  let maxVersuche = 3;
  let versuche = 0;

  while (versuche < maxVersuche) {
    versuche++;

    // Simuliere Passwort-Check
    let passwortRichtig = versuche === 2; // Beim 2. Versuch ist es richtig

    if (passwortRichtig) {
      console.log(`✅ Versuch ${versuche}: Anmeldung erfolgreich!`);
      break; // ✅ Schleife beenden, wir sind angemeldet
    } else {
      console.log(`❌ Versuch ${versuche}: Falsches Passwort`);
    }
  }
}

anmeldenMitVersuchen();

// ============================================
// CONTINUE - Aktuellen Durchlauf überspringen
// ============================================

console.log("\n--- CONTINUE: Durchlauf überspringen ---");

// Nur ungerade Zahlen ausgeben
console.log("Ungerade Zahlen:");
for (let i = 0; i < 10; i++) {
  if (i % 2 === 0) {
    continue; // ✅ Gerade Zahlen überspringen
  }
  console.log(i); // 1, 3, 5, 7, 9
}

// PRAKTISCHES BEISPIEL: Nur Premium-Benutzer verarbeiten
console.log("\n--- Premium-Benutzer filtern ---");

let benutzer = [
  { name: "Max", premium: false },
  { name: "Anna", premium: true },
  { name: "Tom", premium: false },
  { name: "Lisa", premium: true },
];

console.log("Verarbeite Premium-Benutzer:");
for (let user of benutzer) {
  if (!user.premium) {
    continue; // ✅ Überspringe Nicht-Premium-Benutzer
  }
  console.log(`${user.name} ist Premium-Mitglied`);
}

// Ausgabe:
// Anna ist Premium-Mitglied
// Lisa ist Premium-Mitglied

// ============================================
// VERSCHACHTELTE SCHLEIFEN mit BREAK & CONTINUE
// ============================================

console.log("\n--- Verschachtelte Schleifen ---");

// Beispiel: Erste perfekte Kombination finden
for (let i = 1; i <= 3; i++) {
  for (let j = 1; j <= 3; j++) {
    console.log(`Prüfe: ${i} + ${j}`);

    if (i + j === 4) {
      console.log(`✅ Gefunden: ${i} + ${j} = 4`);
      break; // ❌ Stoppt nur innere Schleife!
    }
  }
}

// Problem: break stoppt nur die innerste Schleife
// Die äußere Schleife läuft weiter!

// ✅ LÖSUNG: Labels verwenden
console.log("\n--- Labels für äußere Schleifen ---");

äußereSchleife: for (let i = 1; i <= 3; i++) {
  for (let j = 1; j <= 3; j++) {
    console.log(`Label-Test: ${i} + ${j}`);

    if (i + j === 4) {
      console.log(`✅ Gefunden: ${i} + ${j} = 4`);
      break äußereSchleife; // ✅ Bricht BEIDE Schleifen ab!
    }
  }
}

// ============================================
// TRY-CATCH - Fehler abfangen
// ============================================

console.log("\n--- Try-Catch: Fehler abfangen ---");

// KONZEPT: try = "Versuche diesen Code"
//          catch = "Falls Fehler auftritt, mach das"

try {
  console.log("Code im try-Block wird ausgeführt");

  // Fehler provozieren:
  let obj = null;
  // console.log(obj.name); // ❌ TypeError: Cannot read property 'name' of null

  console.log("Dieser Code wird auch ausgeführt (solange kein Fehler)");
} catch (error) {
  // Dieser Block läuft NUR wenn Fehler im try-Block auftritt
  console.log("❌ Fehler abgefangen!", error.message);
}

// PRAKTISCHES BEISPIEL: JSON parsen
console.log("\n--- Fehlerhafte JSON Verarbeitung ---");

function parseJSON(jsonString) {
  try {
    let daten = JSON.parse(jsonString);
    console.log("✅ JSON erfolgreich geparst:", daten);
    return daten;
  } catch (error) {
    console.log("❌ Fehler beim Parsen:", error.message);
    return null; // Null zurückgeben wenn Fehler
  }
}

parseJSON('{"name": "Max"}'); // ✅ Valides JSON
parseJSON("Das ist kein JSON"); // ❌ Fehler
parseJSON('{"name": "Max"'); // ❌ Unvollständiges JSON (fehlende })

// ============================================
// FINALLY - Code der IMMER läuft
// ============================================

console.log("\n--- Finally-Block ---");

// WICHTIG: finally läuft IMMER, egal ob Fehler oder nicht!

try {
  console.log("Im try-Block");
  // throw new Error("Test-Fehler"); // Kann kommentiert/uncommentiert werden
} catch (error) {
  console.log("Im catch-Block:", error.message);
} finally {
  console.log("Im finally-Block (läuft IMMER!)"); // ✅ Wird immer ausgeführt
}

// PRAKTISCHES BEISPIEL: Datenbank-Verbindung schließen
console.log("\n--- Datenbank-Verbindung ---");

function datenbankOperation() {
  let verbindungOffen = false;

  try {
    console.log("1. Verbindung zur DB öffnen");
    verbindungOffen = true;

    console.log("2. Daten abrufen");
    // Simuliere Fehler: throw new Error("Datenbankfehler!");

    console.log("3. Daten verarbeiten");
  } catch (error) {
    console.log("❌ Fehler:", error.message);
  } finally {
    if (verbindungOffen) {
      console.log("4. Verbindung schließen (finally!)"); // ✅ Wird immer ausgeführt
      verbindungOffen = false;
    }
  }
}

datenbankOperation();

// ============================================
// EIGENE FEHLER WERFEN (throw)
// ============================================

console.log("\n--- Fehler werfen mit throw ---");

function alterValidieren(alter) {
  if (alter < 0) {
    throw new Error("Alter kann nicht negativ sein!"); // ✅ Fehler werfen
  }

  if (alter < 18) {
    throw new Error("Du musst mindestens 18 Jahre alt sein!");
  }

  console.log(`✅ Alter ${alter} ist valide`);
}

// Fehler abfangen
try {
  alterValidieren(15);
} catch (error) {
  console.log("❌", error.message); // Fehler wird abgefangen
}

try {
  alterValidieren(25);
} catch (error) {
  console.log("❌", error.message); // Wird nicht ausgeführt
}

// ============================================
// ERROR-TYPEN
// ============================================

console.log("\n--- Verschiedene Error-Typen ---");

// JavaScript hat verschiedene Error-Typen:

// 1. SyntaxError - Fehler im Code-Syntax
// JSON.parse('{invalid json}'); // ❌ SyntaxError

// 2. TypeError - Falscher Datentyp
// let x = null;
// x.toString(); // ❌ TypeError: Cannot read property 'toString' of null

// 3. ReferenceError - Variable nicht definiert
// console.log(nichtDefiniert); // ❌ ReferenceError: nichtDefiniert is not defined

// 4. RangeError - Wert außerhalb Bereich
// let arr = new Array(-1); // ❌ RangeError: Invalid array length

// Error abfangen und Typ prüfen
try {
  JSON.parse("{invalid}");
} catch (error) {
  console.log("Error-Name:", error.name); // "SyntaxError"
  console.log("Error-Message:", error.message); // Detaillierte Beschreibung
  console.log("Error-Stack:", error.stack); // Zeigt wo Fehler auftrat
}

// ============================================
// NESTED TRY-CATCH (Verschachtelt)
// ============================================

console.log("\n--- Verschachtelte Try-Catch Blöcke ---");

function komplexeOperation() {
  try {
    console.log("Äußerer try-Block");

    try {
      console.log("Innerer try-Block");
      throw new Error("Innerer Fehler!");
    } catch (error) {
      console.log("Innerer catch:", error.message); // Fängt inneren Fehler
      throw new Error("Fehler weitergeleitet!"); // ⚠️ Fehler weitergeben
    }
  } catch (error) {
    console.log("Äußerer catch:", error.message); // Fängt weitergeleitet Fehler
  }
}

komplexeOperation();

// ============================================
// FEHLERBEHANDLUNG IN FUNKTIONEN
// ============================================

console.log("\n--- Guard Clauses (Defensive Programmierung) ---");

// PATTERN: Frühe Rückgabe bei Fehlern
function bestellungVerarbeiten(bestellung) {
  // Guard Clause 1: Prüfe null
  if (!bestellung) {
    console.log("❌ Bestellung ist null");
    return; // Frühe Rückgabe
  }

  // Guard Clause 2: Prüfe Artikel
  if (!bestellung.artikel || bestellung.artikel.length === 0) {
    console.log("❌ Keine Artikel in Bestellung");
    return; // Frühe Rückgabe
  }

  // Guard Clause 3: Prüfe Menge
  if (bestellung.menge <= 0) {
    console.log("❌ Menge muss größer 0 sein");
    return; // Frühe Rückgabe
  }

  // Hauptlogik - wird nur erreicht wenn alle Checks bestanden
  console.log("✅ Bestellung verarbeitet:", bestellung.artikel);
}

bestellungVerarbeiten(null); // Guard Clause 1
bestellungVerarbeiten({ artikel: [] }); // Guard Clause 2
bestellungVerarbeiten({ artikel: "Buch", menge: 0 }); // Guard Clause 3
bestellungVerarbeiten({ artikel: "Buch", menge: 2 }); // ✅ Hauptlogik

// ✅ VORTEIL: Code ist flacher und lesbarer
// ❌ OHNE GUARD CLAUSES: Tiefe Verschachtelung!

// ============================================
// FEHLERBEHANDLUNG MIT ASYNC/AWAIT (Vorschau)
// ============================================

console.log("\n--- Try-Catch mit async (Vorschau auf später) ---");

// Hier nur zur Info - wird später im Kapitel "Asynchrones JavaScript" ausführlich behandelt

async function datenAbrufen(url) {
  try {
    // const response = await fetch(url); // Würde echten Request machen
    console.log("Daten abrufen...");

    // Simuliere erfolgreiche Abfrage
    let daten = { name: "Max", alter: 25 };
    console.log("✅ Daten erfolgreich abgerufen:", daten);
  } catch (error) {
    console.log("❌ Fehler beim Abrufen:", error.message);
  } finally {
    console.log("Anfrage abgeschlossen");
  }
}

// datenAbrufen('/api/users'); // Würde funktionieren, wenn wir async/await nutzen

// ============================================
// ZUSAMMENFASSUNG
// ============================================

/*
BREAK & CONTINUE:
✅ break: Schleife KOMPLETT beenden
✅ continue: Aktuellen Durchlauf überspringen
✅ Labels verwenden für äußere Schleifen (selten nötig)

TRY-CATCH:
✅ try: Code der Fehler werfen könnte
✅ catch: Wird NUR bei Fehler ausgeführt
✅ error.message: Fehlernachricht
✅ error.name: Fehlertyp (SyntaxError, TypeError, etc.)

FINALLY:
✅ Wird IMMER ausgeführt (mit oder ohne Fehler)
✅ Perfekt für Cleanup (Datei schließen, DB-Verbindung schließen)
✅ Optional - nicht immer nötig

FEHLER WERFEN:
✅ throw new Error("Nachricht") für eigene Fehler
✅ Fehler können abgefangen und behandelt werden
✅ Verhindert, dass Programm unkontrolliert crasht

GUARD CLAUSES:
✅ Prüfungen am Anfang einer Funktion
✅ Frühe Rückgabe bei Problemen
✅ Code ist flacher und lesbarer

ERROR-TYPEN:
✅ SyntaxError: Problem im Code-Syntax
✅ TypeError: Falscher Datentyp
✅ ReferenceError: Variable nicht definiert
✅ RangeError: Wert außerhalb Bereich

BEST PRACTICES:
✅ IMMER Fehler abfangen, die außerhalb deiner Kontrolle sind
✅ Guard Clauses am Anfang von Funktionen verwenden
✅ Finally für Cleanup-Code nutzen
✅ Aussagekräftige Error-Messages werfen
✅ Error-Handling nicht ignorieren (❌ try {} catch {} ist faul!)
✅ Fehler in Logs speichern (später im Produktiv-System wichtig!)
*/

console.log("\n✅ 2.3 Kontrollfluss & Fehlerbehandlung abgeschlossen!");

