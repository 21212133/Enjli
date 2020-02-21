const { RichEmbed } = require("discord.js");

module.exports = {
    name: "say",
    category: "moderation",
    description: "Сообщение",
    run: async (client, message, args) => {
        message.delete().catch()

        let text = args.slice(0).join(" ") || "Ничего не сказал"

        let embed = new RichEmbed()
        .setTitle("Сообщение!")
        .setDescription(`${text}`)
        .setTimestamp()
        .setFooter(`Сказал ${message.author.username}`, `${message.author.avatarURL}`)
        .setColor("RANDOM")
        message.channel.send(embed)
    }
}