const { RichEmbed } = require("discord.js");

module.exports = {
    name: "setup",
    description: "Установить статистику сервера",
    category: "channels",
    run: async (client, message, args) => {
        if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("У Вас недостаточно прав")

        message.guild.createChannel(c => c.type = "voice")({
            name: `${message.guild.memberCount}`
        })
    }
}