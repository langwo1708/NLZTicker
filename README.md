# Nachwuchsfußball Netlify

Admin- und Live-Ticker für Nachwuchsfußballspiele. Spiele, Teams, Tore, Spielerwechsel und Saisonen werden zentral in Netlify Blobs gespeichert.

## Funktionen

- Eigene Mannschaften und Gegner mit Spielerkadern verwalten
- Spiele mit Datum, Ort, Spielart und Abschnitten anlegen
- Live-Spielstand mit Uhr, Zwischenständen und Spielstatus
- Tore für eigenes Team und Gegner erfassen
- Spielerwechsel für eigenes Team und Gegner erfassen
- Spielverlauf mit Toren und Wechseln chronologisch anzeigen
- Tore und Wechsel nachträglich bearbeiten und löschen
- Torschützenliste für das aktuelle Spiel und für Saisonen
- Öffentliche Live-Ansicht zum Teilen
- Automatische Speicherung nach jeder Änderung

## Deployment

1. ZIP entpacken und den Ordner als neues Netlify-Projekt deployen, am besten über Git.
2. Unter **Site configuration > Environment variables** setzen:
   - `ADMIN_PASSWORD`: eigenes starkes Admin-Passwort
   - `SESSION_SECRET`: mindestens 32 zufällige Zeichen
3. Danach einen neuen Deploy auslösen.
4. Website öffnen und mit `ADMIN_PASSWORD` anmelden.

## Teams und Spieler

Eigene Mannschaften und Gegner werden beide unter **Teams** angelegt. Gegnerteams können ohne Spieler bleiben; für Gegner-Torschützen und Gegner-Wechsel können optional Spieler ergänzt werden.

- Spieler werden mit Nummer und Name angelegt.
- Über **Ändern** können Spieler bearbeitet oder gelöscht werden.
- Spieler werden in Teamliste und allen Auswahllisten aufsteigend nach Nummer sortiert; bei gleicher Nummer entscheidet der Name.
- Beim Anlegen eines Spiels werden Mannschaft und Gegner aus den angelegten Teams gewählt.
- Der eigene Kader und der Gegnerkader werden für das Spiel als Snapshot übernommen.
- Für Gegner wird bei vorhandenem Gegnerteam der aktuelle Teamkader für neue Auswahlen verwendet; der gespeicherte Gegnerkader dient als Fallback.
- Bereits erfasste Tore und Wechsel bleiben auch nach Kaderänderungen, Umbenennungen oder Löschungen unverändert.
- Teamnamen werden im Spiel gespeichert; spätere Umbenennungen verändern die Anzeige bestehender Spiele nicht.
- Das eigene Team wird in der Gegnerauswahl ausgeblendet.

## Neues Spiel

Unter **Neues Spiel** werden Mannschaft, Gegner, Datum, Ort, Spielart, Anzahl der Abschnitte und Minuten pro Abschnitt festgelegt. Als Spielarten stehen Meisterschaft, Freundschaftsspiel, Testspiel und Turnierspiel zur Verfügung.

Nach dem Anlegen wird das Spiel direkt geöffnet und kann gesteuert werden.

## Spiel steuern

Im aktiven Spiel stehen folgende Aktionen zur Verfügung:

- **Tor eigenes Team** und **Tor Gegner**
- **Spielerwechsel eigenes Team** und **Spielerwechsel Gegner**
- Timer starten bzw. pausieren
- Nächsten Abschnitt starten
- Spiel beenden
- Live-Ansicht aktivieren bzw. deaktivieren
- Öffentlichen Live-Link teilen

Die Aktions-Buttons zeigen die Mannschaftsnamen des aktiven Spiels. Der Spielstand wird ausschließlich aus den erfassten Toren berechnet. Spielerwechsel verändern den Spielstand nicht.

## Tore

Bei einem Tor wird der Torschütze aus dem jeweiligen Kader gewählt.

- Bei Gegentoren kann auch **Ohne Torschütze** gewählt werden.
- Jedes Tor kann über **Ändern** bearbeitet werden: Typ, Torschütze, Spielminute und Abschnitt.
- Über **Löschen** wird ein Tor entfernt.
- Nach Änderungen werden die Ereignisse chronologisch sortiert und alle Zwischenstände neu berechnet.
- Die öffentliche Live-Ansicht übernimmt Korrekturen beim nächsten Abruf.

## Spielerwechsel

Für das eigene Team und den Gegner gibt es getrennte Wechsel-Buttons. Im Dialog werden der Spieler, der rausgeht, und der Spieler, der hereinkommt, aus dem jeweiligen Kader gewählt.

- Wechsel können beliebig oft erfasst werden.
- Wechsel können nachträglich bearbeitet und gelöscht werden.
- Wechsel erscheinen chronologisch im Spielverlauf.
- Wechsel verändern weder Spielstand noch Torschützenliste.
- Der Gegnerkader muss dafür unter **Teams** mit Spielern gepflegt sein.

## Spielverlauf

Der Spielverlauf zeigt Tore und Spielerwechsel gemeinsam; die neuesten Einträge stehen oben.

- Tore zeigen Spielminute, Mannschaft und Torschützen; im Admin zusätzlich den Zwischenstand.
- Die Mannschaft steht vor dem Spielernamen, z. B. `⚽ [U10 Test]: #9 Max Muster`.
- Wechsel zeigen Mannschaft sowie Spieler raus und Spieler rein, z. B. `🔄 [U10 Test]: #5 Anna raus, #7 Ben rein`.
- Die im Spiel gespeicherten Mannschaftsnamen werden verwendet; spätere Team-Umbenennungen verändern alte Spiele nicht.
- Das eigene Team wird grün dargestellt, der Gegner rot.

## Torschützen und Saisonen

Die Torschützenliste zeigt alle Torschützen des aktiven Spiels mit Mannschaft und Anzahl der Tore. Gegner-Torschützen erscheinen nur, wenn ein echter Spieler aus dem Gegnerkader ausgewählt wurde.

Unter **Saisonen** können mehrere Spiele zu einer Saison zusammengefasst werden. Die Saison-Torschützenliste summiert die Tore der ausgewählten Spiele. Gleichnamige Spieler unterschiedlicher Mannschaften werden getrennt geführt.

## Gespeicherte Spiele

Unter **Spiele** werden alle angelegten Spiele angezeigt. Spiele können geöffnet oder gelöscht werden. Beim Löschen eines Spiels wird es auch aus den zugeordneten Saisonen entfernt.

## Live-Ansicht

Im aktiven Spiel **Live-Ansicht aktivieren** und danach **Öffentlichen Live-Link teilen**.

- Zuschauer haben nur Leserechte.
- Die Ansicht aktualisiert sich alle 4 Sekunden.
- Angezeigt werden Spielstand, Uhr, Status, Spielverlauf und Torschützen.
- Tore und Spielerwechsel erscheinen mit Mannschaftsnamen.
- Die Live-Ansicht zeigt das NLZ-Logo im Kopfbereich und als Browser-Favicon.
- Nicht freigegebene Spiele sind über den öffentlichen Endpunkt nicht abrufbar.

## Speicherung

Die zentrale Speicherung erfolgt in Netlify Blobs im Store `football-data`. Änderungen werden nach jeder Aktion automatisch gespeichert. Der Browser speichert keine Admin-Daten dauerhaft, nur das Session-Token bis zum Schließen des Tabs.

Bei mehreren gleichzeitig arbeitenden Admins gilt das Prinzip „letzter Schreibvorgang gewinnt“. Für mehrere gleichzeitige Admins oder sehr umfangreiche Daten sollte später Netlify Database/Postgres eingesetzt werden.

## Sicherheit

- Schreibzugriff erfolgt nur mit einem signierten Admin-Token.
- Das Admin-Passwort und der Session-Schlüssel gehören ausschließlich in die Netlify-Umgebungsvariablen.
- Der öffentliche Endpunkt liefert nur freigegebene Spieldaten.
- Die öffentliche Live-Ansicht enthält keine internen Spieler-IDs.
