// assignment-week-1.2

let id = 1;

let typeDescriptions = {
  number: "Ganzzahlen oder Kommazahlen.",
  bigint:
    "Zum verarbeiten großer Zahlen, hängt vom Speicherplatz des Mediums ab, kann zeitintensiv werden.",
  boolean:
    "Als primitiver Typ über 'wert = false' => boolesche Werte, essenziell in JavaScript zur Programm(e) Steuerung.",
  symbol:
    "Symbol ist ein eingebautes Objekt, dessen Konstruktor einen symbol-primitiv-Wert zurückgibt, als eindeutigen Eigenschaftsschlüssel.",
  string: "Text also Buchstaben, Wörter oder Zeichen.",
  array: "Eine geordnete Liste von Werten, gleichen- oder verschiedenen-Typs. Js hat keine Listen.",
  function:
    "Zur Laufzeit erstellt JavaScript für jede Funktion ein Objekt 'first class object' => zur Behandlung als Objekt",
  object: "Speichert Schlüssel-Wert Paare, Funktionen oder Arrays sind auch Objekte.",
  null: "Null - eine Variable hat bewusst keinen Wert, weil der Entwickler das so gesetzt hat.",
  undefined: "Undefined - eine Variable existiert, aber sie hat noch keinen Wert bekommen",
};

function analyseValue(input) {
  let truthy = Boolean(input) ? "Ja" : "Nein";
  let type = input === null ? "null" : typeof input; // type as dynamic key
  let findDesc = typeDescriptions[type]; // object-search with bracket notation
  console.log(`
    
    WertID: ${id}
    Wert: ${input}
    Typ: ${type}
    Truthy: ${truthy}
    Beschreibung: ${findDesc}
    `);
  id++;
}

analyseValue(42);
analyseValue("Hallo");
analyseValue(null);
analyseValue(undefined);
analyseValue([1, 2, 3]);
analyseValue({ name: "Max" });

/* Console output:

    WertID: 1
    Wert: 42
    Typ: number
    Truthy: Ja
    Beschreibung: Ganzzahlen oder Kommazahlen.

    WertID: 2
    Wert: Hallo
    Typ: string
    Truthy: Ja
    Beschreibung: Text also Buchstaben, Wörter oder Zeichen.

    WertID: 3
    Wert: null
    Typ: null
    Truthy: Nein
    Beschreibung: Null - speichert Schlüssel-Wert Paare, Funktionen oder Arrays sind auch Objekte.

    WertID: 4
    Wert: undefined
    Typ: undefined
    Truthy: Nein
    Beschreibung: Undefined - eine Variable existiert, aber sie hat noch keinen Wert bekommen

    WertID: 5
    Wert: 1,2,3
    Typ: object
    Truthy: Ja
    Beschreibung: Speichert Schlüssel-Wert Paare, Funktionen oder Arrays sind auch Objekte.

    WertID: 6
    Wert: [object Object]
    Typ: object
    Truthy: Ja
    Beschreibung: Speichert Schlüssel-Wert Paare, Funktionen oder Arrays sind auch Objekte.

*/
