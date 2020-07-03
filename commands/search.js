const nHentaiAPI = require("nana-api");
let api = new nHentaiAPI();

exports.run = async (client, msg, args, color) => {
  if (!msg.channel.nsfw)
    return msg.channel
      .send(`NSFW channel please.`)
      .then(msg => msg.delete({ timeout: 5000 }));
  if (!args[0])
    return msg.channel
      .send(
        `the command you are using is incorrect\nExample: \`nh search <Query> [language]\``
      )
      .then(msg => msg.delete({ timeout: 10000 }));
  let nick =
    msg.member.nickname !== null
      ? `${msg.member.nickname}`
      : msg.author.username;

  let input = args.join(" ").match(/\w+|('|")([^"]|[^'])+('|")/g);
  let search = input[0].replace(/["']/g, "").toLowerCase();
  let patt = /^\d+$/;
  if (patt.test(search))
    return msg.channel.send(
      `You can use \`nh read ${search}\` to search with ID`
    );

  let lang = input[1];
  if (!lang) lang = "english";
  if (lang == "ch") {
    lang = "chinese";
  } else if (lang == "en") {
    lang = "english";
  } else if (lang == "jp") {
    lang = "japanese";
  }
  if (!client.config.LANG.includes(lang.toLowerCase()))
    return msg.channel
      .send("Available langauge is `English`, `Japanese` & `Chinese`")
      .then(msg => msg.delete({ timeout: 5000 }));

  let numPages = await api.search(search);
  if (!numPages.results || numPages.results.length == 0)
    return msg.channel.send(`No doujin found with query \`${search}\``);
  if (!numPages.num_pages) {
    let query = numPages.results.filter(x => x.language == lang.toLowerCase());
    let rand = client.util.getRandInt(query.length);
    await client.embeds.getInfoEmbed(query[rand].id, msg);
    return;
  }
  try {
    let id = await api.search(search, client.util.getRandInt(numPages.num_pages));
    let langs = id.results.map(x => x.language == lang.toLowerCase() && x.id);
    let query = id.results.find(x => x.language == lang.toLowerCase()).id;
    await client.embeds.getInfoEmbed(query, msg);
  } catch(err) {
    console.err(err);
  }
  
};

exports.conf = {
  aliases: [],
  cooldown: "10"
};

exports.help = {
  name: "search",
  description: "Search nHentai site",
  usage: [
    "search <query>",
    "search Milf",
    "search Yaoi <english/japanese/chinese>"
  ]
};
