const { Collection } = require("discord.js");
const { readdirSync } = require("fs");
const Nana = require("./lib/NanaClient");
//require("./server");

const client = new Nana({
  cacheGuilds: true,
  cacheChannels: true,
  fetchAllMembers: true,
  messageCacheMaxSize: 0
});

// events
for (const event of readdirSync("./events")) {
  client.on(event.split(".")[0], (...args) =>
    require(`./events/${event}`)(client, ...args)
  );
}

// modules
client.commands = new Collection();
client.aliases = new Collection();

for (const command of readdirSync(`./commands`).filter(x =>
  x.endsWith(".js")
)) {
  let cmd = require(`./commands/${command}`);
  client.commands.set(cmd.help.name.toLowerCase(), cmd);
  // get aliases command
  for (const alias of cmd.conf.aliases) {
    client.aliases.set(alias.toLowerCase(), cmd.help.name.toLowerCase());
  }
}

client.login(process.env.TOKEN);

module.exports = Nana;
