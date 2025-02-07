import express, { Request, Response } from "express";
import { authenticateUser, authUsers, createUser, deleteUser, getUsers } from "../controllers/user_controller";


export const routes = (app: express.Application) => {
    const router: express.Router = express.Router();

    router.get("/", async (req: Request, res: Response) => {  
        res.json("Server is running");
    });

    router.post("/users", async (req: Request, res: Response) => {

        var user = await createUser(req.body.name, req.body.email, req.body.password, 'Администратор')
        res.json(user);
    });

    router.post("/authenticate", async (req: Request, res: Response) => {
        let user = await authenticateUser(req.body.token)
        res.json(user);
    });

    router.post("/auth", async (req: Request, res: Response) => {
      console.log(req.body)
      let user = await authUsers(req.body.email, req.body.password)
      res.json(user);
    });

    router.get("/", async (req: Request, res: Response) => {  
      res.json("Server is running");
    });

    router.delete('/users', async (req: Request, res: Response) => {
        let user = await deleteUser(req.query.id?.toString())
        res.json(user);
    });

    router.get("/users", async (req: Request, res: Response) => {
      let users;
      users = await getUsers();
      res.json(users);
    });


    app.use(router)
}