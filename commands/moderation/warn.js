const { RichEmbed } = require("discord.js");
const database = require("../../database.js");

module.exports = {
    name: "warn",
    category: "moderation",
    description: "Предупреждение",
    run: async (client, message, args, database) => {
        if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("У Вас недостаточно прав")
        let text = args.slice(1).join(" ") || "Не указана"


        let member = message.guild.member(message.mentions.users.first() || message.guild.members.find(m => m.user.username == args[0] || m.id == args[0]))
        if (!member === message.author.id) return message.reply("Вы не можете выдать самому себе предупреждение!")

        let acc = database.getAccount(message.member)
        acc.warns += 1

        let embed = new RichEmbed()
        .setTitle("Предупреждение!")
        .addField("Администратор", `<@${message.author.id}>`)
        .addField("Предупредили", `<@${member.user.id}>`)
        .addField("Причина", `${text}`)
        .addField("Кол-во предпуреждений" ,`${(await database.getAccount(message.member)).warns}`)
        .setColor("RANDOM")
        message.channel.send(embed)
        await database.save("../../database.json")
    }
}