const { RichEmbed } = require("discord.js");

module.exports = {
    name: "ban",
    category: "moderation",
    description: "Бан участника",
    run: async (client, message, args) => {
        if(!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send("Вы не можете банить участника")

        let reason = args.slice(1).join(" ") || "Не указана"
        let member = message.guild.member(message.mentions.users.first() || message.guild.members.find(m => m.user.username == args[0] || m.id == args[0]))
        if (!args[0]) return message.channel.send("Вы не указали участника которого хотите забанить")
        if (!member) return message.channel.send("Участник был не найден на данном сервере")

        let embed = new RichEmbed()
        .setTitle("Бан!")
        .addField("Админ", `<@${message.author.id}>`)
        .addField("Пользователь", `<@${member.user.id}>`)
        .addField("Причина", `${reason}`)
        member.ban(`Был забанен - ${member.user.username} админом - ${message.author.username} по причине - ${reason}`)
    }
}