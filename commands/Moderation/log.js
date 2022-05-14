export default {
    name:"log",
    execute(message,MessageActionRow,MessageButton){
        const row = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setCustomId('primary')
					.setLabel('Primary')
					.setStyle('PRIMARY'),
			);
        message.channel.send({content:"Test",components:[row]})
    }
}