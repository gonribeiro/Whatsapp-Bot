import { Client } from 'whatsapp-web.js'
const qrcode = require('qrcode-terminal');
const fs = require('fs');

const SESSION_FILE_PATH = './session.json';
let sessionData;
if(fs.existsSync(SESSION_FILE_PATH)) {
    sessionData = JSON.parse(fs.readFileSync(SESSION_FILE_PATH, 'utf-8'));
}

const client = new Client({session: sessionData});

client.on('qr', qr => {
    qrcode.generate(qr, {small: true});
});

client.on('ready', () => {
    console.log('Client is ready!');
});

client.on('authenticated', (session) => {
    sessionData = session;
    fs.writeFile(SESSION_FILE_PATH, JSON.stringify(session), (err) => {
        if (err) {
            console.error(err);
        }
    });
});

client.initialize();

export default client;
