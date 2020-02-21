const { RichEmbed } = require("discord.js");

module.exports = {
    name: "coinflip",
    category: "fun",
    description: "Подбросить монетку",
    run: async (client, message, args) => {
        let flip = ["Решка!",
    "Орёл!",
"Ребро!"]
let temp = flip[Math.round(Math.floor() * 3)]
let embed = new RichEmbed()
.setIitle(`${message.author.username} подбросил монетку!`)
.addField("Выпало", `${temp}`)
.setColor("RANDOM")
message.channel.send(embed)
    }
}