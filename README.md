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
Eigene Mannschaften und Gegner werden beide unter **Teams** angelegt. Gegnerteams bleiben einfach ohne Spieler. Beim Anlegen eines Spiels werden Mannschaft und Gegner aus den angelegten Teams gewählt; das eigene Team wird in der Gegnerliste ausgeblendet.

## Tore bearbeiten
Jedes Tor im Spielverlauf kann über **Ändern** einzeln bearbeitet werden: Typ (eigenes Tor/Gegentor), Torschütze, Spielminute und Abschnitt. Über **Löschen** wird ein einzelnes Tor entfernt. Danach werden die Ereignisse chronologisch sortiert und alle Zwischenstände neu berechnet. Die öffentliche Live-Ansicht übernimmt die Korrektur beim nächsten Abruf.

## Speicherung
Die zentrale Speicherung erfolgt in Netlify Blobs im Store `football-data`. Der Browser speichert keine Admin-Daten dauerhaft, nur das Session-Token bis zum Schließen des Tabs.

## Sicherheit
- Schreibzugriff erfolgt nur mit einem signierten Admin-Token.
- Das Admin-Passwort und der Session-Schlüssel gehören ausschließlich in die Netlify-Umgebungsvariablen.
- Der öffentliche Endpunkt liefert nur freigegebene Spieldaten.
- Für mehrere gleichzeitige Admins oder sehr umfangreiche Daten sollte später Netlify Database/Postgres eingesetzt werden.
