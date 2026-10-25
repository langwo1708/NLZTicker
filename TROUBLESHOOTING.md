# Troubleshooting

## Netlify zeigt „Error – Request ID: …“ oder leitet auf einen Netlify-Login um

### Symptom

- Die Netlify-URL zeigt eine generische Fehlerseite mit einer **Request ID**.
- Oder die Seite leitet zu `https://app.netlify.com/edge-access?...` weiter.
- Auch `/api/health` und die öffentliche Live-Ansicht sind betroffen.
- Die App selbst wird gar nicht geladen.

### Ursache

Das Netlify-Projekt ist auf **Private** bzw. **Team login protection** gestellt. Dann schützt Netlify die komplette Site am Edge, bevor die eigentliche App oder eine Function ausgeführt wird. Das ist **kein Fehler im Code** und auch kein Function-Crash.

Typische Antwort in diesem Fall:

```http
HTTP/2 401
content-type: text/html
server: Netlify
x-nf-request-id: 01...
```

Im HTML steht dann unter anderem:

```html
<title>Login Redirect</title>
```

und ein Link auf `app.netlify.com/edge-access`.

### Diagnose

Mit `curl` prüfen:

```bash
curl -i https://nlzticker.netlify.app/
curl -i https://nlzticker.netlify.app/api/health
```

Wenn bereits `/` oder `/api/health` mit **401** und „Login Redirect“ antwortet, liegt es an der Netlify-Zugriffsbeschränkung.

Zum Vergleich: Ist die Site öffentlich und die Functions laufen, sollte `/api/health` ungefähr so antworten:

```json
{"ok":true,...}
```

`/api/admin-data` ohne Admin-Token darf weiterhin `401` liefern – dann aber als JSON mit einer App-Fehlermeldung, nicht als Netlify-Login-Seite.

### Lösung

In Netlify:

1. Das Projekt **nlzticker** öffnen.
2. Zu **Project configuration** gehen (in älteren UIs: **Site configuration**).
3. **General → Visitor access** öffnen.
4. Je nach Netlify-UI:
   - **Project visibility → Edit visibility → Public → Save**
   - oder **Password Protection** entfernen bzw. **No protection / Public** wählen.
5. Falls ein Team-Standard gesetzt ist:
   - **Customize this project's visibility** wählen
   - und ebenfalls **Public** setzen.
6. Speichern und die URL neu laden.

Bei älteren/Enterprise-Oberflächen kann die Einstellung auch unter **Team settings → Access & security → Visitor access → Default Password Protection settings** liegen.

### Danach prüfen

```bash
curl -i https://nlzticker.netlify.app/
curl -i https://nlzticker.netlify.app/api/health
curl -i https://nlzticker.netlify.app/api/admin-data
```

Erwartung:

- `/` → `200` mit der App
- `/api/health` → `200` mit JSON
- `/api/admin-data` → `401` mit JSON (App-Login erforderlich)

### Wichtig

- Die Admin-Seite ist bereits durch das eigene Login mit `ADMIN_PASSWORD` geschützt.
- Die Netlify-Zugriffssperre ist zusätzlich und blockiert auch die **öffentliche Live-Ansicht**. Für einen öffentlichen Ticker muss die Produktions-Site **Public** sein.
- Das Ändern der Sichtbarkeit löscht keine Daten. Die Spiele liegen weiterhin in Netlify Blobs im Store `football-data`.
- Die Request ID ist eine Netlify-Request-ID. Sie steht auch im Response-Header `x-nf-request-id` und hilft dem Netlify-Support beim Zuordnen eines Edge-/Plattformfehlers.
