import connection from './database';
import { IssuesService } from "../services/IssuesService";

describe("Issue Service", () => {
    let issuesService: IssuesService;

    beforeAll(async ()=>{
        await connection.create();
        issuesService = new IssuesService();
    });

    afterAll(async ()=>{
        await connection.close();
    });

    beforeEach(async () => {
        await connection.clear();
    });

    it("should be able to create a new issue", async () => {
        const issue = await issuesService.create({ customerContactId: "5521988888888" });

        expect(issue).toHaveProperty("id");
    });

    // ...
})
