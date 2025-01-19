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
let user2;
let token;
let token2;
let activity;
let listUserActivities = [];

const buildPath = () => {
    return '/post/';
}
//Mocha.process.removeListener("uncaughtException");

describe('----- List Activity Controller Tests -----', () => {
    beforeEach(async () => {
        
        user = await userFixtures.addUserInDb();
        user2 = await userFixtures.addUserInDb({email: 'fake2@test.com'});
        
        for (let index = 0; index < 3; index++) {
            listUserActivities.push(await activityFixtures.addActivityToDb(user._id))   
        }
        token = CryptoUtils.generateTokens(user);
        token2 = CryptoUtils.generateTokens(user2);
    });

    afterEach(async () => {
        await userFixtures.restore();
        await activityFixtures.restore();
        listUserActivities = []; //Svuota la lista prima di ogni test
    })


    describe('/GET List Activity Failure', () => {

        it('it should return 401 when no Token is provided', async () => {
            const res = await request.execute(app)
            .get(buildPath())
            .set('Content-type', 'application/json')
            .send();
            const error = JSON.parse(res.error.text);
            expect(res.status).eq(401);
            expect(error.message).eq('Authentication error. Token required.')
        });
        
        it('it should return 401 when invalid Token is provided', async () => {
            const res = await request.execute(app)
            .get(buildPath())
            .set('Authorization', 'Bearer ' + 'invalid Token')
            .set('Content-type', 'application/json')
            .send();
            const error = JSON.parse(res.error.text);
            expect(res.status).eq(401);
            expect(error.message).eq('Authentication error. Invalid token.Invalid JWT')
        });
    });

    describe('/GET List Activity Success', () => {
        it('it should return 200 and return an empty array if user has no activities', async () => {
            const res = await request.execute(app)
            .get(buildPath())
            .set('Authorization', 'Bearer ' + token2.accessToken)
            .set('Content-type', 'application/json')
            .send();
            expect(res.status).eq(200);
            expect(res.body).has.length(0);
           
        });

        it('it should return 200 and all users activities', async () => {
            const res = await request.execute(app)
            .get(buildPath())
            .set('Authorization', 'Bearer ' + token.accessToken)
            .set('Content-type', 'application/json')
            .send();
            expect(res.status).eq(200);
            expect(res.body).has.length(3);
            expect(res.body[0].ownerId).not.exist
            expect(res.body[0].updatedAt).not.exist
            
        });

        it('it should return 200 and all the users activities if the ownerId matches the ownerId present in the database.', async () => {
            const res = await request.execute(app)
            .get(buildPath())
            .set('Authorization', 'Bearer ' + token.accessToken)
            .set('Content-type', 'application/json')
            .send();
            //console.log(listUserActivities)
            expect(res.status).eq(200);  
            const activitiesFromDb = await activityFixtures.getByUser(user._id);
            //console.log(activitiesFromDb)
            expect(activitiesFromDb).not.null;
            expect(listUserActivities[0].ownerId).eq(activitiesFromDb[0].ownerId)
            expect(listUserActivities[1].ownerId).eq(activitiesFromDb[1].ownerId)
            expect(listUserActivities[2].ownerId).eq(activitiesFromDb[2].ownerId)
        });
    });
    
});