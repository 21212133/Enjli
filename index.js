const { Client, Collection, RichEmbed, Discord } = require("discord.js");
const { config } = require("dotenv");
const fs = require("fs");
const utils = require("./utils.js");
const database = require("./database.js");
const util = require("util");

const client = new Client({
    disableEveryone: true
});

const bot = new Client({
    disableEveryone: true
})

client.commands = new Collection();
client.aliases = new Collection();

client.categories = fs.readdirSync("./commands/");

config({
    path: __dirname + "/.env"
});

["command"].forEach(handler => {
    require(`./handler/${handler}`)(client);
});

client.on("ready", async () => {
	await database.load('./database.json');
});

client.on("ready", async () => {
    console.log(`${client.user.username} Успешно запустился!`)
    client.user.setActivity({
        status: "dnd",
        game: {
            name: `${client.guilds.size} серверов, ${client.users.size} пользователей!`,
            type: "LISTENING",
            url: "discordapp.com/users/388218132067516417"
        }
    });
});

client.on("message", async message => {
    const prefix = database.getGuildData(message.guild).prefix;

	if (message.author.bot || message.channel.type != "text") return;
    if (!message.guild) return;
    if (!message.content.startsWith(prefix)) return;
    if (!message.member) message.member = await message.guild.fetchMember(message);

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    const msg = message;
    let member = message.guild.member(message.mentions.users.first() || message.guild.members.find(m => m.user.username == args[0] || m.id == args[0]))
    
    if (cmd.length === 0) return;
    
    let command = client.commands.get(cmd);
    if (!command) command = client.commands.get(client.aliases.get(cmd));

    if (command) 
        command.run(client, message, args, database);
});


client.on("message", async message=> {
    let acc = database.getAccount(message.member);
    acc.xp++;
    if(acc.xp>= (acc.lvl * 5)){
        acc.lvl += 1;
        acc.xp = 0;
        await database.save("./database.json")
    }
});

process.on("SIGINT", async () => {
	console.log('Closing...');
	await client.destroy();
	await database.save('./database.json');
});

client.on("message", async message => {
    if (message.author.bot || message.channel.type != "text") return;
    console.log(`${message.author.username} сказал: ${message.content}
     сообщение было отправлено с сервера: ${message.guild.name}`)
})

client.send = function(msg){
    message.channel.send(msg);
}

client.login(process.env.TOKEN);