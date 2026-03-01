console.log("BOOT OK", new Date().toISOString());
console.log("NODE", process.version);

const http = require("http");
const { Client, GatewayIntentBits } = require("discord.js");

// Render Web Service Port
const port = process.env.PORT || 3000;
http.createServer((req, res) => res.end("OK")).listen(port, () => {
  console.log("HTTP listening on", port);
});

const token = process.env.DISCORD_TOKEN;
console.log("TOKEN CHECK:", token ? "VORHANDEN" : "FEHLT");
if (!token) process.exit(1);

const client = new Client({ intents: [GatewayIntentBits.Guilds] });

client.on("debug", (m) => console.log("DEBUG:", m));
client.on("warn", (m) => console.log("WARN:", m));
client.on("error", (e) => console.log("CLIENT ERROR:", e));

client.on("shardReady", (id) => console.log("SHARD READY:", id));
client.on("shardError", (e, id) => console.log("SHARD ERROR:", id, e));
client.on("shardDisconnect", (event, id) =>
  console.log("SHARD DISCONNECT:", id, event?.code, event?.reason)
);
client.on("shardReconnecting", (id) => console.log("SHARD RECONNECTING:", id));

client.once("ready", () => {
  console.log("READY:", client.user.tag);
});

process.on("unhandledRejection", (e) => console.log("UNHANDLED REJECTION:", e));
process.on("uncaughtException", (e) => console.log("UNCAUGHT EXCEPTION:", e));

client
  .login(token)
  .then(() => console.log("LOGIN PROMISE RESOLVED"))
  .catch((e) => {
    console.log("LOGIN PROMISE REJECTED:", e);
    process.exit(1);
  });

setTimeout(() => {
  console.log("TIMEOUT: nach 30s kein READY (Gateway-Verbindung kommt nicht zustande).");
