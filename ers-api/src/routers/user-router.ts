import { Request, Response } from 'express';
import express from 'express';
import * as userDao from '../dao/user-dao';
import {authorization} from '../security/authorization';

export const userRouter = express.Router(); 

userRouter.get('/:id', [authorization(1,2),
    async (req, resp) => {
    const id = +req.params.id; // convert the id to a number
    console.log(`retrieving user with id  ${id}`);
    try {
        let user = await userDao.findById(id); 
        if (user !== undefined) 
            resp.json(user);
        else 
            resp.sendStatus(400);
    } catch (err) {
        resp.sendStatus(500);
    }
}]);

userRouter.post('/login',
     async (req, resp) => {
    try {
        const user = await userDao.findByUsernameAndPassword(req.body.username, req.body.password);
        if (user) {
            req.session.user = user;
            resp.json(user);
        } else {
            resp.sendStatus(401);
        }
    } catch (err) {
        console.log(err);
        resp.sendStatus(500);
    }
});