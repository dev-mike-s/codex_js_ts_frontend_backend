// assignment-week-1.1

const name = "Max Mustermann";
let alter = 28;
let ageState = alter >= 18 ? "Volljährig" : "Minderjährig";
let isPremiumMember = true;
const premiumState = isPremiumMember === true ? "Ja" : "Nein";
let accountBalance = 1234.56;
const formatEuro = new Intl.NumberFormat("de-DE", {
  style: "currency",
  currency: "EUR",
  maximumSignificantDigits: 6,
});
const memberSince = 2020;
let membership = new Date().getFullYear() - memberSince;
let setNumberFormat = console.log(
  `
    === Benutzerprofil ===
    Name: ${name}
    Alter: ${alter} Jahre
    Altersstatus: ${ageState}
    Premium-Mitglied: ${premiumState}
    Kontostand: ` +
    formatEuro.format(`${accountBalance}`) +
    `
    Mitglied seit: ${memberSince}
    Mitgliedsjahre: ${membership}
    `
);

/* Console output:

    === Benutzerprofil ===
    Name: Max Mustermann
    Alter: 28 Jahre
    Altersstatus: Volljährig
    Premium-Mitglied: Ja
    Kontostand: 1.234,56 €
    Mitglied seit: 2020
    Mitgliedsjahre: 5

 */
