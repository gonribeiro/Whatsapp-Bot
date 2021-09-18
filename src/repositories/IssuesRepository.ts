import { EntityRepository, Repository } from 'typeorm';

import { Issue } from '../entities/Issue';

@EntityRepository(Issue)
class IssuesRepository extends Repository<Issue> {}

export { IssuesRepository };