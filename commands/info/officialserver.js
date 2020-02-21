const { RichEmbed } = require("discord.js");

module.exports = {
    name: "officialserver",
    aliases: ["offserver", "ofserver", "serverbot"],
    category: "info",
    decription: "Отправляет приглашение на оффициальный сервер бота",
    run: async (client, message, args, database) => {
        let embed = new RichEmbed()
        .setTitle("Мой оффициальный сервер")
        .setAuthor("Вот ссылка")
        .setDescription("[:green_heart:](https://discord.gg/DB3Wb89)")
        message.author.send(embed)
    }
}