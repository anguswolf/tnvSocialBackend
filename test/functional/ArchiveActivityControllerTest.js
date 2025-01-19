import * as chai from 'chai';
import {expect, use} from 'chai';
import mongoose from 'mongoose'
import app from '../../server.js';
import { postStatus } from '../../src/const/const.js';
import CryptoUtils from '../../src/utils/cryptoUtils.js';
import {userFixtures} from '../fixture/userFixtures.js'
import {activityFixtures} from '../fixture/activityFixtures.js'
import {default as chaiHttp, request} from "chai-http";
chai.use(chaiHttp);

let user;
let token;
let activity;
const buildPath = (value) => {
    return '/post/%%id%%/archive'.replace('%%id%%', value);
}

describe('----- Archive Activity Controller Tests -----', () => {
    beforeEach(async () => {
        user = await userFixtures.addUserInDb();
        activity = await activityFixtures.addActivityToDb(user._id,{status: postStatus.completed});
        token = CryptoUtils.generateTokens(user);
    });

    afterEach(async () => {
        await userFixtures.restore();
        await activityFixtures.restore();
    })


    describe('/PATCH Archive Activity Failure', () => {
        it('it should return 400 when activityId is invalid', async () => {
            const res = await request.execute(app)
            .patch(buildPath('IdNonValido'))
            .set('Authorization', 'Bearer ' + token.accessToken)
            .send();
            const error = JSON.parse(res.error.text);
            expect(res.status).eq(400);
            expect(error.message).eq('ValidationError: "id" with value "IdNonValido" fails to match the required pattern: /^[a-fA-F0-9]{24}$/')
        });

        it('it should return 404 when post does not exists', async () => {
            const res = await request.execute(app)
            .patch(buildPath(new mongoose.Types.ObjectId().toString()))
            .set('Authorization', 'Bearer ' + token.accessToken)
            .set('Content-type', 'application/json')
            .send();
            const error = JSON.parse(res.error.text);
            expect(res.status).eq(404);
            expect(error.message).eq('Activity not found')
            expect(error.code).eq(200100)
        });

        it('it should return 401 when no Token is provided', async () => {
            const res = await request.execute(app)
            .patch(buildPath(new mongoose.Types.ObjectId().toString()))
            .set('Content-type', 'application/json')
            .send();
            const error = JSON.parse(res.error.text);
            expect(res.status).eq(401);
            expect(error.message).eq('Authentication error. Token required.')
        });
        
        it('it should return 401 when invalid Token is provided', async () => {
            const res = await request.execute(app)
            .patch(buildPath(new mongoose.Types.ObjectId().toString()))
            .set('Authorization', 'Bearer ' + 'invalid Token')
            .set('Content-type', 'application/json')
            .send();
            const error = JSON.parse(res.error.text);
            expect(res.status).eq(401);
            expect(error.message).eq('Authentication error. Invalid token.Invalid JWT')
        });

        it('it should return 403 when post is not completed', async () => {
            const activity = await activityFixtures.addActivityToDb(user._id,{status: postStatus.open});
            const res = await request.execute(app)
            .patch(buildPath(activity._id))
            .set('Authorization', 'Bearer ' + token.accessToken)
            .set('Content-type', 'application/json')
            .send();
            const error = JSON.parse(res.error.text);
            expect(res.status).eq(403);
            expect(error.message).eq('Can not archive a not completed post')
        });

        it('it should return 403 when post is not completed', async () => {
            const activity = await activityFixtures.addActivityToDb(user._id,{status: postStatus.deleted});
            const res = await request.execute(app)
            .patch(buildPath(activity._id))
            .set('Authorization', 'Bearer ' + token.accessToken)
            .set('Content-type', 'application/json')
            .send();
            const error = JSON.parse(res.error.text);
            expect(res.status).eq(403);
            expect(error.message).eq('Can not archive a deleted post')
        });
    });

    describe('/PATCH Archive Activity Success', () => {
        it('it should return 200 and update the Status field to archived', async () => {
            const res = await request.execute(app)
            .patch(buildPath(activity._id))
            .set('Authorization', 'Bearer ' + token.accessToken)
            .set('Content-type', 'application/json')
            .send();
            expect(res.status).eq(200);
            expect(res.body._id).eq(activity._id);
            expect(res.body.name).eq(activity.name);
            expect(res.body.description).eq(activity.description);
            expect(res.body.status).eq(postStatus.archived);
            const activityFromDb = await activityFixtures.getFromDb(activity._id);
            expect(activityFromDb).not.null;
            expect(activityFromDb.status).eq(postStatus.archived);
        });

        it('it should return 200 if the post is already archived', async () => {
            const activity = await activityFixtures.addActivityToDb(user._id,{status: postStatus.archived});
            const res = await request.execute(app)
            .patch(buildPath(activity._id))
            .set('Authorization', 'Bearer ' + token.accessToken)
            .set('Content-type', 'application/json')
            .send();
            expect(res.status).eq(200);
            expect(res.body._id).eq(activity._id);
            expect(res.body.name).eq(activity.name);
            expect(res.body.description).eq(activity.description);
            expect(res.body.status).eq(postStatus.archived);
            const activityFromDb = await activityFixtures.getFromDb(activity._id);
            expect(activityFromDb).not.null;
            expect(activityFromDb.status).eq(postStatus.archived);
        });
    });
    
});