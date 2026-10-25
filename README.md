# Nachwuchsfußball Netlify

## Deployment
1. ZIP entpacken und den Ordner als neues Netlify-Projekt deployen, am besten über Git.
2. Unter **Site configuration > Environment variables** setzen:
   - `ADMIN_PASSWORD`: eigenes starkes Admin-Passwort
   - `SESSION_SECRET`: mindestens 32 zufällige Zeichen
3. Danach einen neuen Deploy auslösen.
4. Website öffnen und mit `ADMIN_PASSWORD` anmelden.

## Live-Ansicht
Im aktiven Spiel **Live-Ansicht aktivieren** und danach **Öffentlichen Live-Link teilen**. Zuschauer haben nur Leserechte. Die Ansicht aktualisiert sich alle 4 Sekunden.

## Teams und Gegner
Eigene Mannschaften und Gegner werden beide unter **Teams** angelegt. Gegnerteams können ohne Spieler bleiben; für Gegner-Torschützen können optional Spieler ergänzt werden. Beim Anlegen eines Spiels werden Mannschaft und Gegner aus den angelegten Teams gewählt, der Gegnerkader wird für das Spiel übernommen und das eigene Team wird in der Gegnerliste ausgeblendet. Einzelne Spieler können im **Ändern**-Fenster gelöscht werden; bereits gespeicherte Spiele behalten ihren Kader-Snapshot und ihre Ereignisse.

## Tore bearbeiten
Jedes Tor im Spielverlauf kann über **Ändern** einzeln bearbeitet werden: Typ (eigenes Tor/Gegentor), Torschütze, Spielminute und Abschnitt. Bei Gegentoren kann der Torschütze aus dem Gegnerkader gewählt werden; bei Bedarf wird das Tor ohne Torschützen gespeichert. Über **Löschen** wird ein einzelnes Tor entfernt. Danach werden die Ereignisse chronologisch sortiert und alle Zwischenstände neu berechnet. Die öffentliche Live-Ansicht übernimmt die Korrektur beim nächsten Abruf.

## Spielerwechsel
Für das eigene Team und den Gegner gibt es getrennte Buttons für Spielerwechsel. Im Dialog werden der Spieler, der rausgeht, und der Spieler, der hereinkommt, aus dem jeweiligen Kader gewählt. Wechsel können beliebig oft erfasst, nachträglich geändert und gelöscht werden. Sie erscheinen chronologisch im Spielverlauf, verändern aber weder Spielstand noch Torschützenliste. Der Gegnerkader muss dafür unter **Teams** mit Spielern gepflegt sein.

## Speicherung
Die zentrale Speicherung erfolgt in Netlify Blobs im Store `football-data`. Der Browser speichert keine Admin-Daten dauerhaft, nur das Session-Token bis zum Schließen des Tabs.

## Sicherheit
- Schreibzugriff erfolgt nur mit einem signierten Admin-Token.
- Das Admin-Passwort und der Session-Schlüssel gehören ausschließlich in die Netlify-Umgebungsvariablen.
- Der öffentliche Endpunkt liefert nur freigegebene Spieldaten.
- Für mehrere gleichzeitige Admins oder sehr umfangreiche Daten sollte später Netlify Database/Postgres eingesetzt werden.
