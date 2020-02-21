module.exports = {
    name: "ping",
    category: "info",
    description: "Показывает задержку команд(пинг)",
    run: async (client, message, args) => {        
        const msg = await message.channel.send(`🏓 Pinging....`);

        msg.edit(`🏓 Pong!\nLatency is ${Math.floor(msg.createdTimestap - message.createdTimestap)}ms\nAPI Latency is ${Math.round(client.ping)}ms`);
    }
}