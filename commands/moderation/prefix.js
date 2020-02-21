const { RichEmbed } = require("discord.js");

module.exports = {
    name: "prefix",
    aliases: ["pref", "prf"],
    category: "moderation",
    description: "Поменять префикс",
    run: async (client, message, args, database) => {
        if(!message.member.hasPermission("ADMINISTRATOR")) return message.channel.send("У Вас недостаточно прав")
        if (args[0]) {
            database.getGuildData(message.guild).prefix = args[0];
            await message.channel.send(`Новый префикс для команд: '${args[0]}'`);
        }
    }
}