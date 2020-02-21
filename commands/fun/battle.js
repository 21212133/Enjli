const Discord = require("discord.js");

module.exports = {
    name: "duel",
    aliases: ["battle"],
    category: "fun",
    description: "Битва",
    run: async (client, message, args) => {
        let member = message.guild.member(message.mentions.users.first() || message.guild.members.find(m => m.user.username == args[0] || m.id == args[0]))
        if (!member) return message.reply('Укажите пожалуйста участника с которым вы хотите сразиться')
    
        let battle = [`${member.user.username}`,
    `${message.author.username}`]
    let temp = battle[Math.floor(Math.random() * 2)]
    
        let embed = new Discord.RichEmbed()
        .setTitle("Дуэль!:drop_of_blood:")
        .addField("Вызвал дуэль", `${message.author.username}`)
        .addField("Кого вызвал", `${member.user.username}`)
        .addField("В этой кровавой битве победил...", `${temp}`)
        .setColor("RED")
        message.channel.send(embed)
        
    }
}