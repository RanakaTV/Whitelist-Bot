# Whitelist-Bot (Discord)

## Lokal starten

1. Abhängigkeiten installieren:

```bash
npm install
```

2. Token als Umgebungsvariable setzen und starten:

macOS/Linux:
```bash
export DISCORD_TOKEN="DEIN_TOKEN"
npm start
```

Windows (PowerShell):
```powershell
$env:DISCORD_TOKEN="DEIN_TOKEN"
npm start
```

## Render (einfach online)

- Repository zu GitHub pushen.
- Render: **New → Web Service**
  - Build Command: `npm install`
  - Start Command: `npm start`
- Environment Variable setzen:
  - `DISCORD_TOKEN` = dein Bot-Token
