const { RichEmbed } = require("discord.js");

module.exports = {
    name: "kick",
    category: "moderation",
    description: "Кик участника",
    run: async (client, message, args) => {
        if(!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send("Вы не можете кикать участника!")

        let member = message.guild.member(message.mentions.users.first() || message.guild.members.find(m => m.user.username == args[0] || m.id == args[0]))
        if (!args[0]) return message.channel.send("Вы не указали участника которого хотите кикнуть")
        if (!member) return message.channel.send("Участник был не найден на данном сервере")

        let reason = args.slice(1).join(" ") || "Не указана"

        let embed = new RichEmbed()
        .setTitle("Кик!")
        .addField("Админ", `<@${message.author.id}>`)
        .addField("Пользователь", `<@${member.user.id}>`)
        .addField("Причина", `${reason}`)
        .setColor("RED")
        member.kick(`Был кикнут - ${member.user.username} админом - ${message.author.username} по причине - ${reason}`)
        message.channel.send(embed)
    }
}