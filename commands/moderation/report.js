const { RichEmbed } = require("discord.js");
const database = require("../../database.js");

module.exports = {
    name: "report",
    category: "moderation",
    description: "Жалоба",
    run: async (client, message, args, database) => {
        let text = args.slice(1).join(" ") || "Не указана"


        let member = message.guild.member(message.mentions.users.first() || message.guild.members.find(m => m.user.username == args[0] || m.id == args[0]))
        if (!member === message.author.id) return message.reply("Вы не можете выдать самому себе предупреждение!")

        let acc = database.getAccount(member)
        acc.reports += 1;

        let embed = new RichEmbed()
        .setTitle("Жалоба!")
        .addField("Пользователь", `<@${message.author.id}>`)
        .addField("Пожаловались на", `<@${member.user.id}>`)
        .addField("Причина", `${text}`)
        .addField("Кол-во жалоб" ,`${(await database.getAccount(member)).reports}`)
        .setColor("RANDOM")
        message.channel.send(embed)
        await database.save("../../database.json")
    }
}