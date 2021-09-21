import { Request, Response } from 'express';

import { IssuesService } from '../services/IssuesService';

class IssuesController {
  async showAllOpennedIssues(request: Request, response: Response): Promise<Response> {
    const issuesService = new IssuesService();

    const issues = await issuesService.showAllOpennedIssues();

    return response.json(issues);
  }

  async finishIssue(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;
    const { solution } = request.body;

    const issuesService = new IssuesService();

    const issue = await issuesService.finishIssue(id, solution);

    return response.json(issue);
  }

  async showAllClosedIssues(request: Request, response: Response): Promise<Response> {
    const issuesService = new IssuesService();

    const issues = await issuesService.showAllClosedIssues();

    return response.json(issues);
  }
}

export { IssuesController };