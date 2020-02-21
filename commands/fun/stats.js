const { RichEmbed } = require("discord.js");
const database = require("../../database");

module.exports = {
    name: "stats",
    aliases: ["stt", "tat", "st"],
    category: "fun",
    description: "Показывает статистику",
    run: async (client, message, args, database) => {
        let member = message.guild.member(message.mentions.users.first() || message.guild.members.find(m => m.user.username == args[0] || m.id == args[0]))
        if(!member) {
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
        let embed = new RichEmbed()
        .setTitle(`Статистика ${message.author.username}`)
        .addField("Опыт", `${(await database.getAccount(member)).xp}`)
        .addField("Уровень", `${(await database.getAccount(member)).lvl}`)
        .addField("Предупреждений", `${(await database.getAccount(member)).warns}`)
        .addField("Жалоб", `${(await database.getAccount(member)).reports}`)
        .setColor("RANDOM")
        message.channel.send(embed)
        database.save("../../database")
    }

}