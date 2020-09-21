exports.run = async (client, msg, args, color) => {
  if (!msg.channel.nsfw || msg.channel.nsfw == false)
    return msg.channel
      .send(`NSFW channel please.`)
      .then(msg => msg.delete({ timeout: 5000 }));
  client.channels.fetch(msg.channel.id);

  let res = await client.embeds.getRandom();
  await client.embeds.getInfoEmbed(res.id, msg);
};

exports.conf = {
  aliases: [],
  cooldown: "15"
};

exports.help = {
  name: "random",
  description: "Get random nhentai book ID",
  usage: "random"
};
