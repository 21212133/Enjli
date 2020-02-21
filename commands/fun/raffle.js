const { RichEmbed } = require("discord.js");
const { promptMessage } = require("../../functions.js");

const chooseArr = ["✅"];

module.exports = {
    name: "raffle",
    category: "fun",
    description: "Розыгрыш",
    run: async (client, message, args) => {
        if(!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send("У Вас недостаточно прав")

        let raffletext = args.slice(0).join(" ")
        if(!raffletext) return  message.channel.send("Укажите пожалуйста текст и условия")

        message.delete().catch()

        let embed = new RichEmbed()
        .setTitle("Розыгрыш!")
        .setDescription(`${raffletext}`)
        .setColor("RANDOM")
        .setFooter(`Розыгрыш сделал ${message.author.username}`, `${message.author.avatarURL}`)

        const m = await message.channel.send(embed);
        const reacted = await promptMessage(m, message.author, 30, chooseArr);

        const botChoice = chooseArr[Math.floor(Math.random() * chooseArr.length)];

        message.delete().catch()
    }
}