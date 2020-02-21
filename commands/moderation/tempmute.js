const { RichEmbed } = require("discord.js");
const ms = require ("ms");

module.exports = {
    name: "tempmute",
    category: "moderation",
    description: "Замутить человека на время",
    run: async (client, message, args, database) => {
        if(!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send("У Вас недостаточно прав")

        let member = message.guild.member(message.mentions.users.first() || message.guild.members.find(m => m.user.username == args[0] || m.id == args[0]))
        if(!args[0]) return message.channel.send("Укажите пожалуйста пользователя")
        if(!member) return client.send("Пользователь был не найден")

        let muterole = message.guild.roles.find(`name`, `Muted`)
        if(!member.hasPermission("MANAGE_MESSAGES")) return client.send("Я не могу замутить этого пользователя")
        if(!muterole) {
            message.guild.createRole({
                name: "Muted",
                color: "#000000",
                permissions: [],
            })
            message.guild.channels.forEach(async (channel, id) => {
                await channel.overwritePermissions(muterole, {
                  SEND_MESSAGES: false,
                  ADD_REACTIONS: false
                });
              });

              let mutetime = args[1]
              if(!mutetime) return client.send("Укажите пожалуйста время(1s/m/h/d)")

              let reason = args.slice(2).join(" ") || "Не указана"
              if(!reason) return await client.send("Укажите пожалуйста причину(пример: e!mute @пользователь 1s/m/h/d причина(Вместо числа 1 ставьте своё число))")

              await(member.addRole(muterole.id));
              let embed = new RichEmbed()
              .setTitle("Мут!")
              .addField("Админ", `${message.author.username}`)
              .addField("Замучен", `${member.user.username}`)
              .addField("Причина", `${reason}`)
              .addField("Время", `${ms(ms(mutetime))}`)
              message.channel.send(embed)

              setTimeout(function(){
                  member.removeRole(muterole.id);
                  client.send(`${member.user.username} был размучен`)
                  
              }, ms(mutetime));
            }
        }
    }