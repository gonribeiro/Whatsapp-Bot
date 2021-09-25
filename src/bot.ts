import { Client } from 'whatsapp-web.js'
import { IssuesService } from './services/IssuesService';
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

client.on('message', async message => {
    let getContact = await message.getContact();

    let issuesService = new IssuesService();

    let issue = await issuesService.issueStarted({ clientContactId: getContact.id['_serialized'] });

    if (issue === undefined) {
        if (message.body.toLowerCase() === 'novo') {
            await issuesService.create({
                clientContactId : getContact.id['_serialized']
            });

            message.reply('Atendimento iniciado! Em apenas uma única mensagem, informe o seu problema e em breve iremos atendê-lo.');
        } else {
            message.reply('[Mensagem automática]: Envie a palavra "novo" para iniciar a abertura de um novo chamado.');
        }
    } else {
        await issuesService.update({
            id: issue.id,
            solicitation: message.body,
        });

        message.reply('Seu chamado foi registrado! Por favor aguarde o nosso contato dentro de um dia útil.');
    }
});

export default client;