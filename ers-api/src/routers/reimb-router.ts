import { Request, Response } from 'express';
import express from 'express';
import * as reimbDao from '../dao/reimb-dao';
import {authorization} from '../security/authorization';

export const reimbRouter = express.Router();

reimbRouter.post('', [authorization(1),
async (req, resp) => {
    try {
      const id = await reimbDao.createReimb(req.body);
      resp.status(201);
      resp.json(id);
    } catch (err) {
      console.log(err);
      resp.sendStatus(500);
    }
  }]);

  reimbRouter.get('/user/:id',[authorization(1),
    async (req, resp) => {
        try{
            const id = +req.params.id;
            let reimbs = await reimbDao.getReimbsByUserId(id);
            resp.json(reimbs);
        }
        catch (err) {
            console.log(err);
            resp.sendStatus(500);
        }
}]);

reimbRouter.put('/approve/:id',[authorization(2),
        async (req, resp) => {
            try{
                const manager = req.session.user;
                const reimbId = +req.params.id;
                await reimbDao.approveReimb(reimbId, manager);
                resp.json(true);
            }
            catch (err) {
                console.log(err);
                resp.sendStatus(500);
            }
}]);

reimbRouter.put('/deny/:id',[authorization(2),
        async (req, resp) => {
            try{
                const manager = req.session.user;
                const reimbId = +req.params.id;
                await reimbDao.denyReimb(reimbId, manager);
                resp.json(true);
            }
            catch (err) {
                console.log(err);
                resp.sendStatus(500);
            }
        }
]);
reimbRouter.get('/status/:id', [authorization(2),
  async (req, resp) => {
    const statusId = +req.params.id; 
    try {
        let reimbs = await reimbDao.getStatus(statusId);
        resp.json(reimbs);
    } catch (err) {
        resp.sendStatus(500);
    }
}]);