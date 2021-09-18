const qrcode = require('qrcode-terminal');

const { Client } = require('whatsapp-web.js');
const client = new Client();

client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.initialize();

// abrir chamado
// ser notificado sobre chamado encerrado

client.on('message', message => {
	if(message.body === 'ping') {
		message.reply('pong');
	}
});
