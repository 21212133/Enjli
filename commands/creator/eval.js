const { RichEmbed } = require("discord.js");
const beautify = require("beautify");

module.exports = {
    name: "eval",
    aliases: ["e"],
    description: "Выполняет команды",
    usage: "<code to eval>",
    run: async (client, message, args) => {
        if(message.author.id != "388218132067516417") {
        client.send("Ты не создатель данного бота!!")
        .then(m => m.delete(5000));
        }

        if (!args[0]) {
            client.send("Ты должен указать __**СУЩЕСТВУЮЩУЮ**__ команду, пожалуйста?")
            .then(m => m.delete(5000));
        }

    try {
        if (args.join(" ").toLowerCase().includes("token")) {
            return;
        }

        const toEval = args.join(" ");
        const evaluated = eval(toEval);

        let embed = new RichEmbed()
        .setColor("#00FF00")
        .setTimestamp()
        .setFooter(client.user.username, client.user.displayAvatarURL)
        .setTitle("Eval")
        .addField("To evaluate:", `\`\`\`js\n${beautify(args.join(" "), { format: "js"})}\n\`\`\``)
        .addField("Evaluated:", evaluated)
        .addField("Тип:", typeof(evaluated))

        message.channel.send(embed)
    } catch (e) {
        let embed = new RichEmbed()
        .setColor("RED")
        .setTitle("\:x: Error!")
        .setDescription(e)
        .setFooter(client.user.username, client.user.displayAvatarURL)

        message.channel.send(embed);
    }     
    }
}