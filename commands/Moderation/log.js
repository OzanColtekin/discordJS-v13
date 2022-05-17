export default {
    name:"log",
    execute(message,args,isAdmin,permlvl,MessageActionRow,MessageButton,MesajGönder){
        const row = new MessageActionRow()
			.addComponents(
				new MessageButton()
					.setCustomId('createticket')
					.setLabel('Primary')
					.setStyle('PRIMARY'),
			);
        message.channel.send({content:"Test",components:[row]})
    }
}