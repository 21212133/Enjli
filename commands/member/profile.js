const { RichEmbed } = require("discord.js");

module.exports = {
    name: "profile",
    description: "Информация о пользователе",
    usage: "<e!profile/e!profile @пользователь>",
    category: "member",
    run: async (client, message, args) => {
        let member = message.guild.member(message.mentions.users.first() || message.guild.members.find(m => m.user.username == args[0] || m.id == args[0]))
        let BoN = ["Да", "Нет"]
        let vf = ["Да", "Нет"]

        if(!member) {
            let embed = new RichEmbed()
            .setTitle("Твоя информация")
            .addField("ID", `${message.author.id}`)
            .addField("Дискрим", `${message.author.discriminator}`)
            .addField("Имя", `${message.author.username}`)
            .addField("Бот", BoN[message.author.bot])
            .addField("Проверен ли пользователь", vf[message.author.verified])
            .setThumbnail(`${message.author.avatarURL}`)
            .setColor("RANDOM")
            message.channel.send(embed)
        }

        let embed = new RichEmbed()
        .setTitle(`Профиль ${member.user.username}`)
        .addField("ID", `${member.user.id}`)
        .addField("Дискрим", `${member.user.discriminator}`)
        .addField("Имя", `${member.user.username}`)
        .addField("Бот", BoN[member.user.bot])
        .addField("Проверен ли пользователь", vf[member.user.verified])
        .setThumbnail(`${member.user.avatarURL}`)
        .setColor("RANDOM")
        message.channel.send(embed)
    }
}