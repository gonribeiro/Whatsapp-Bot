import { getCustomRepository } from 'typeorm';
import { Issue } from '../entities/Issue';

import { IssuesRepository } from '../repositories/IssuesRepository';

interface IIssueRequest {
    subject: string,
    solicitation: string,
    username: string,
    usercontact: string
}

class IssuesService {
    private issuesRepository: IssuesRepository;

    constructor() {
        this.issuesRepository = getCustomRepository(IssuesRepository);
    }

    async create({ subject, solicitation, username, usercontact }: IIssueRequest) {
        const newIssue = this.issuesRepository.create({
            subject,
            solicitation,
            username,
            usercontact
        });

        await this.issuesRepository.save(newIssue);

        return newIssue;
    }

    async update(id: string, solution: string) {
        await this.issuesRepository
            .createQueryBuilder()
            .update(Issue)
            .set({ solution })
            .whereInIds(id)
            .execute();
    }

    async show(id: string) {
        const list = await this.issuesRepository.find({
            where: { id }
        });

        return list;
    }
}

export { IssuesService };
