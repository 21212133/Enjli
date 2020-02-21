const { RichEmbed } = require("discord.js");
const database = require("../../database");

module.exports = {
    name: "mystats",
    aliases: ["mstt", "mstat", "mst"],
    category: "fun",
    description: "Показывает статистику",
    run: async (client, message, args, database) => {
        let embed = new RichEmbed()
        .setTitle(`Статистика ${message.author.username}`)
        .addField("Опыт", `${(await database.getAccount(message.member)).xp}`)
        .addField("Уровень", `${(await database.getAccount(message.member)).lvl}`)
        .addField("Предупреждений", `${(await database.getAccount(message.member)).warns}`)
        .addField("Жалоб", `${(await database.getAccount(message.member)).reports}`)
        .setColor("RANDOM")
        message.channel.send(embed)
        database.save("../../database")
    }

}