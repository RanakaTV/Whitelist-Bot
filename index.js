const { Client } = require('discord.js');

const token = process.env.DISCORD_TOKEN;
if (!token) {
  console.error('DISCORD_TOKEN fehlt (Environment Variable).');
  process.exit(1);
}

const client = new Client({ intents: [] });

client.once('ready', () => {
  console.log('ich bin online');
  client.user.setActivity({ name: 'Am aufpassen', type: 'PLAYING' });
});

client.login(token);
