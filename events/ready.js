const pkg = require("../package.json");
const axios = require("axios");

module.exports = async client => {
  const version = pkg.version;

  const guilds = client.guilds.cache.size

  console.log(
    `${client.user.username} Preparing to playing with ${guilds} guilds...`
  );

  client.setInterval(async () => {
    let guildFormat = client.util.nFormatter(guilds);

    let status = [
      `Bot v${version}`,
      `in ${guildFormat} server 🎉 | ${parseInt(client.shard.ids) + 1} of ${client.shard.count}`,
      `Help me to buy a VPS, please | nh donate`,
      `Ara ara ara`,
      `now with downloader | nh dl 177013`
    ];
    let rand = client.util.getRandInt(status.length);

    client.user.setActivity(status[rand], { type: "PLAYING" });
  }, 6e4);
};
