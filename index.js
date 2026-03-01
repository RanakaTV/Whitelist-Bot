const http = require("http");
const { Client, GatewayIntentBits } = require("discord.js");

// Render Web Service braucht einen offenen Port
const port = process.env.PORT || 3000;
http
  .createServer((req, res) => {
    res.writeHead(200, { "Content-Type": "text/plain" });
    res.end("OK");
  })
  .listen(port, () => console.log("HTTP listening on", port));

const token = process.env.DISCORD_TOKEN;
console.log("TOKEN CHECK:", token ? "VORHANDEN" : "FEHLT");

if (!token) {
  console.error("DISCORD_TOKEN fehlt (Environment Variable).");
  process.exit(1);
}

const client = new Client({
  intents: [GatewayIntentBits.Guilds], // minimal, aber sauber
});

client.on("ready", () => {
  console.log("ich bin online als", client.user.tag);
  client.user.setActivity({ name: "Am aufpassen", type: 0 }); // 0 = PLAYING
});

client.on("error", (err) => console.error("DISCORD CLIENT ERROR:", err));
process.on("unhandledRejection", (err) => console.error("UNHANDLED REJECTION:", err));

client.login(token).catch((e) => {
  console.error("LOGIN FEHLER:", e);
  process.exit(1);
});
