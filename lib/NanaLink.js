module.exports = async (client, msg) => {
  if (!msg.channel.nsfw)
    return msg.channel
      .send(`NSFW channel please.`)
      .then(msg => msg.delete({ timeout: 5000 }));
  
  let BookID = msg.content.match(/[\d]+/g)[0];
  await client.embeds.getInfoEmbed(BookID, msg);
};
