import { getCustomRepository, IsNull, Not } from 'typeorm';
import { Issue } from '../entities/Issue';

import { IssuesRepository } from '../repositories/IssuesRepository';

import { sendMessageFinishIssueForCustomer } from './BotService';

interface IIssueRequest {
    id?: string;
    solicitation?: string;
    solution?: string
    customerContactId?: string;
}

class IssuesService {
    private issuesRepository: IssuesRepository;

    constructor() {
        this.issuesRepository = getCustomRepository(IssuesRepository);
    }

    async issueStarted({ customerContactId }: IIssueRequest) {
        const issue = await this.issuesRepository.findOne({
            where: {
                customerContactId,
                solicitation: IsNull()
            },
            order: { id: 'DESC' }
        });

        return issue;
    }

    async create({ customerContactId }: IIssueRequest) {
        const newIssue = this.issuesRepository.create({ customerContactId });

        await this.issuesRepository.save(newIssue);

        return newIssue;
    }

    // Customer updates the ticket with a solicitaton
    async update({ id, solicitation }: IIssueRequest) {
        await this.issuesRepository
            .createQueryBuilder()
            .update(Issue)
            .set({ solicitation })
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

        const issue = await this.issuesRepository.findOne(id);

        sendMessageFinishIssueForCustomer(issue.customerContactId, solution);

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
