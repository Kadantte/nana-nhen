module.exports = async (client, msg) => {
  if (!msg.channel.nsfw || msg.channel.nsfw == false) return;
  client.channels.fetch(msg.channel.id);
  
  let BookID = msg.content.match(/[\d]+/g)[0];
  await client.embeds.getInfoEmbed(BookID, msg);
};
