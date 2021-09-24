import { Router } from 'express';

import { IssuesController } from './controllers/IssuesController';

const routes = Router();

const issuesController = new IssuesController();

routes.get("/issues/opened", issuesController.showAllOpenedIssues);
routes.post("/issue/finish/:id", issuesController.finishIssue);
routes.get("/issues/closed", issuesController.showAllClosedIssues);

export { routes };
