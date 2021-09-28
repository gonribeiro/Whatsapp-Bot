import client from '../bot';
import { IssuesService } from './IssuesService';

client.on('message', async message => {
    let getContact = await message.getContact();

    let issuesService = new IssuesService();

    let issue = await issuesService.issueStarted({ customerContactId: getContact.id['_serialized'] });

    if (issue === undefined) {
        if (message.body.toLowerCase() === 'novo') {
            await issuesService.create({
                customerContactId : getContact.id['_serialized']
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

function sendMessageFinishIssueForCustomer(customerContactId: string, solution: string) {
    client.sendMessage(customerContactId, 'Seu chamado foi finalizado com a resposta: ' + solution);
}

export { sendMessageFinishIssueForCustomer }