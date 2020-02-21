const { RichEmbed } = require("discord.js");

module.exports = {
    name: "avatar",
    description: "Показывает твой или чей-то аватар",
    category: "member",
    run: async (client, message, args) => {
        let member = message.guild.member(message.mentions.users.first() || message.guild.members.find(m => m.user.username == args[0] || m.id == args[0]))
        if(!member) {
            let embed = new RichEmbed()
            .setTitle("Твой аватар")
            .setImage(message.author.avatarURL)
            .setColor("RANDOM")
            message.channel.send(embed)
        }

        let embed2 = new RichEmbed()
        .setTitle(`Аватар ${member.user.username}`)
        .setImage(`${member.user.avatarURL}`)
        .setColor("RANDOM")
        message.channel.send(embed2)
    }
}