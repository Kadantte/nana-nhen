const { version, MessageEmbed } = require("discord.js");
const pkg = require("../package.json");

exports.run = async (client, msg, args, color) => {
  const uptime = client.util.parseDur(client.uptime);
  const botVersion = pkg.version;
  const usersTotal = await client.shard.fetchClientValues("guilds.cache.size");
  const users = await client.shard.fetchClientValues("users.cache.size");
  const channelsTotal = await client.shard.fetchClientValues("guilds.cache.size");
  const channels = await client.shard.fetchClientValues("channels.cache.size");
  const serversTotal = await client.util.getShardTotal("guilds.cache.size");
  const servers = await client.shard.fetchClientValues("guilds.cache.size");

  msg.channel.send(`\`\`\`asciidoc
Mem. Usage :: ${Math.floor(process.memoryUsage().heapUsed / 1048576)} MB
Uptime     :: ${uptime}
WS Ping    :: ${client.ws.ping}ms
Users      :: ${users[client.shard.ids].toLocaleString()}/${usersTotal.toLocaleString()}
Channels   :: ${channels[client.shard.ids].toLocaleString()}/${channelsTotal.toLocaleString()}
Servers    :: ${servers[client.shard.ids].toLocaleString()}/${serversTotal.toLocaleString()}
Shards     :: ${parseInt(client.shard.ids) + 1} of ${client.shard.count}
Bot Vers.  :: ${botVersion}
D.js-light :: v${version}
Node       :: ${process.version}\`\`\``);
};

exports.conf = {
  aliases: [],
  cooldowns: "10"
};

exports.help = {
  name: "stats",
  description: "Show bot status",
  usage: "stats"
};
