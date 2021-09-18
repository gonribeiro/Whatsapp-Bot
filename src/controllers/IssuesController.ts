import { Request, Response } from 'express';

import { IssuesService } from '../services/IssuesService';

class IssuesController {
  async create(request: Request, response: Response): Promise<Response> {
    const { subject, solicitation, username, usercontact } = request.body;

    const issuesService = new IssuesService();

    const issue = await issuesService.create({
      subject,
      solicitation,
      username,
      usercontact
    });

    return response.json(issue);
  }

  async update(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { solution } = request.body;

    const issuesService = new IssuesService();

    await issuesService.update(id, solution);

    return response.send();
  }

  async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const issuesService = new IssuesService();

    const issue = await issuesService.show(id);

    return response.json(issue);
  }
}

export { IssuesController };