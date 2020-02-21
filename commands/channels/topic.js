const { RichEmbed } = require("discord.js")

module.exports = {
    name: "topic",
    category: "channels",
    description: "Ставит описание канала/текст сверху",
    run: async (client, message, args, database) => {
        if(!message.member.hasPermission("MANAGE_CHANNELS")) return client.send("У Вас недостаточно прав")
        
        let tt = args.slice(0).join(" ") || "Не указано"
        message.channel.setTopic(`${tt}`)

        let embed = new RichEmbed()
        .setTitle("Топик")
        .addField("Команда", `message.channel.setTopic`)
        .addField("Текст", `${tt}`)
        message.channel.send(embed)
    }
}