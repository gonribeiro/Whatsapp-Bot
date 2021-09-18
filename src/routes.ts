import { Router } from 'express';

import { IssuesController } from './controllers/IssuesController';

const routes = Router();

const issuesController = new IssuesController();

routes.post("/issue/create", issuesController.create);
routes.post("/issue/update/:id", issuesController.update);
routes.post("/issue/show/:id", issuesController.show);

export { routes };
