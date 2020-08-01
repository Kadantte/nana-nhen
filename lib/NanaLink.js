module.exports = async (client, msg) => {
  let BookID = msg.content.match(/[\d]+/g)[0];
  await client.embeds.getInfoEmbed(BookID, msg);
};
