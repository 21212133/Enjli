const { RichEmbed, Discord } = require("discord.js")

module.exports = {
    name: "offline",
    category: "creator",
    description: "Статут оффлайн",
    run: async (client, message, args) => {
        if(message.author.id != 388218132067516417) return message.channel.send("Вы не создатель бота")

        client.user.setPresence({
            status: "offline"
        })
        message.channel.send("Статус был изменён на offline")
    }
}