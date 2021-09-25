import { getCustomRepository, IsNull, Not } from 'typeorm';
import { Issue } from '../entities/Issue';

import { IssuesRepository } from '../repositories/IssuesRepository';

import client from '../bot';

interface IIssueRequest {
    id?: string;
    solicitation?: string;
    solution?: string
    clientContactId?: string;
    issueStarted?: boolean;
}

class IssuesService {
    private issuesRepository: IssuesRepository;

    constructor() {
        this.issuesRepository = getCustomRepository(IssuesRepository);
    }

    async issueStarted({ clientContactId }: IIssueRequest) {
        const issue = await this.issuesRepository.findOne({
            where: {
                clientContactId,
                issueStarted: true
            },
            order: { id: 'DESC' }
        });

        return issue;
    }

    async create({ clientContactId }: IIssueRequest) {
        const newIssue = this.issuesRepository.create({
            clientContactId,
            issueStarted: true
        });

        await this.issuesRepository.save(newIssue);

        return newIssue;
    }

    async update({ id, solicitation }: IIssueRequest) {
        await this.issuesRepository
            .createQueryBuilder()
            .update(Issue)
            .set({ solicitation, issueStarted: false })
            .whereInIds(id)
            .execute();
    }

    async showAllOpenedIssues() {
        const oppenedIssues = await this.issuesRepository.find({
            where: { solution: IsNull() }
        });

        return oppenedIssues;
    }

    async finishIssue({ id, solution }: IIssueRequest) {
        await this.issuesRepository
            .createQueryBuilder()
            .update(Issue)
            .set({ solution })
            .whereInIds(id)
            .execute();

        const issue = await this.issuesRepository.findOne({
            where: { id }
        });

        client.sendMessage(issue.clientContactId, 'Seu chamado foi finalizado com a resposta: ' + solution);

        return issue;
    }

    async showAllClosedIssues() {
        const closedIssues = await this.issuesRepository.find({
            where: { solution: Not(IsNull()) }
        });

        return closedIssues;
    }
}

export { IssuesService };
