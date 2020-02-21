const { RichEmbed } = require("discord.js");

module.exports = {
    name: "bc",
    category: "moderation",
    description: "Объявление",
    run: async (client, message, args) => {
        message.delete().catch()

        let text = args.slice(0).join(" ") || "Ничего не объявил"

        let embed = new RichEmbed()
        .setTitle("Объявление!")
        .setDescription(`${text}`)
        .setTimestamp()
        .setFooter(`Объявление сделал ${message.author.username}`, `${message.author.avatarURL}`)
        .setColor("RANDOM")
        message.channel.send(embed)
    }
}