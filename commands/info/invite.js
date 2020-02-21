const { RichEmbed } = require("discord.js");

module.exports = {
    name: "invite",
    aliases: ["link"],
    category: "info",
    description: "Пригласить бота на сервер",
    run: async (client, message, args) => {
        let embed = new RichEmbed()
        .setTitle("Ссылка чтобы пригласить бота")
        .setAuthor("Моя ссылка")
        .setDescription("[:robot:](https://discordapp.com/oauth2/authorize?client_id=" + client.user.id + "&scope=bot&permissions=8)")
        .setColor("RANDOM")
        message.channel.send(embed)
    }
}