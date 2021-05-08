const Discord = require('discord.js')
const client = new Discord.Client()
const token = 'example'//change that to your bot token. 
const prefix = 'p!'

client.on('ready', () => {
    console.log('Bot is ready!')
})

client.on('message', async msg => {
    if (msg.content === `${prefix}help`) {
        const options = new Discord.MessageEmbed()
        .setTitle('Help GUI')
        .setDescription(':hammer: Moderation\n:magic_wand: Utility\n:rofl: Fun')
        .setFooter('The reactions were added to your message.')
        msg.channel.send(options)
        const hammer = new Discord.MessageEmbed()
        .setTitle('Moderation')
        .setDescription('Soon')
        .setTimestamp()
        const rofl = new Discord.MessageEmbed()
        .setTitle('Fun')
        .setDescription('soon')
        .setTimestamp()
        const cog = new Discord.MessageEmbed()
        .setTitle('Utility')
        .setDescription('soon')
        .setTimestamp()
        msg.react('🔨').then(() => msg.react('🤣')).then(msg.react('⚙'));
        const filter = (reaction, user) => {
            return ['🔨', '🤣', '⚙'].includes(reaction.emoji.name) && user.id === msg.author.id;

            
        };
        msg.awaitReactions(filter, { max: 1, time: 60000, errors: ['time'] })
	.then(collected => {
		const reaction = collected.first();

		if (reaction.emoji.name === '🔨') {
			msg.reply(hammer);
		} else if (reaction.emoji.name === '🤣') {
			msg.reply(rofl);
		} else {
            msg.reply(cog)
        }
	})
	.catch(collected => {
		msg.reply('DAMN IT! YOU IGNORED ME!');
	});
    }
})

client.on('message', msg => {
 if (msg.content.startsWith(`${prefix}purge`)) {
    if (!msg.content.startsWith(prefix) || msg.author.bot) return;

	const args = msg.content.slice(prefix.length).trim().split(' ');
    if (!msg.member.hasPermission("MANAGE_MESSAGES")) {
        const noperms = new Discord.MessageEmbed()
        .setTitle('Permissions error!')
        .setDescription('I did not detect that any of your roles have the "MANAGE MESSAGES" permission. Please get thsi permission and try again.')
        .setFooter('Sorry for the iconvenience.')
        msg.channel.send(noperms)
    } else {
        if (!args) {
const noargs = new Discord.MessageEmbed()
.setTitle('Arguments error!')
.setDescription('I did not detect any arguments in your message. Make sure you provided something after `p!purge`.')
.setFooter('If you think this is an error, do `p!support` to join our support server.')
msg.channel.send(noargs)
        } else {
            if (isNaN(args)) {
                const nanargs = new Discord.MessageEmbed()
                .setTitle('Arguments error!')
                .setDescription('The arguments that I detected in your message are not valid. Please make sure your arguments are a valid number and try again')
                .setFooter('If you think this is an error, do `p!support` to join our support server.')
            } else {
                MessageAttachment.channel.bulkDelete(args)
                const deleted = new Discord.MessageEmbed()
                .setTitle('Deleted messages!')
                .setDescription(`I have deleted ${args} messages!`)
                .setColor('GREEN')
            }
        }
    }
 }
})

client.login(token)
