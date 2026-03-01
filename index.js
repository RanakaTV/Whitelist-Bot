const http = require("http");
const { Client, GatewayIntentBits } = require("discord.js");

// Render braucht offenen Port
const port = process.env.PORT || 3000;
http.createServer((req, res) => {
  res.writeHead(200, { "Content-Type": "text/plain" });
  res.end("OK");
}).listen(port, () => console.log("HTTP listening on", port));

const token = process.env.DISCORD_TOKEN;
console.log("TOKEN CHECK:", token ? "VORHANDEN" : "FEHLT");

if (!token) {
  console.error("DISCORD_TOKEN fehlt.");
  process.exit(1);
}

const client = new Client({
  intents: [
    GatewayIntentBits.Guilds
  ],
});

client.once("ready", () => {
  console.log("BOT IST ONLINE ALS:", client.user.tag);
});

client.on("error", console.error);
process.on("unhandledRejection", console.error);

client.login(token)
  .then(() => console.log("Login erfolgreich gesendet"))
  .catch((err) => {
    console.error("LOGIN FEHLER:", err);
    process.exit(1);
  });
