import {expect} from 'chai';
import { postStatus } from '../../src/const/const.js';
import activityRepository from '../../src/repository/postRepository.js';
import { postModel } from '../../src/schema/postSchema.js';
import mongoose from 'mongoose';
import sinon from 'sinon';

const objId = mongoose.Types.ObjectId;
const sandbox = sinon.createSandbox();

describe('----- Activity Repository Success Tests -----', () => {
    it('it should set post status to completed', async () => {
      const userId = new objId();
      const activity = {
        _id: new objId().toString(),
        name: 'olio di r2d2',
        description: 'controllare olio r2d2 dopo la passeggiata su Tatooine',
        dueDate: new Date(),
        status: postStatus.open,
        ownerId: userId,
      }
      sandbox.stub(postModel, 'findOneAndUpdate').callsFake(() => {
        activity.status = postStatus.completed
        activity.toJSON = () => activity
        return activity;
      });
      const completedActivity = await activityRepository.completedActivity(activity._id, userId)
      expect(completedActivity.status).eq(postStatus.completed);
      expect(completedActivity.ownerId).eq(userId);
      expect(completedActivity._id.toString()).eq(activity._id.toString());
      expect(completedActivity.description).eq(activity.description);
      sandbox.restore();
    });
});

describe('----- Activity Repository Failure Tests -----', () => {
  it('it should return null if no userId is provided', async () => {
    const activity = {
      _id: new objId().toString(),
      name: 'olio di r2d2',
      description: 'controllare olio r2d2 dopo la passeggiata su Tatooine',
      dueDate: new Date(),
      status: postStatus.open,
      ownerId: '',
    }
    sandbox.stub(postModel, 'findOneAndUpdate').callsFake(() => {
      activity.status = postStatus.completed
      activity.toJSON = () => activity
      return activity;
    });
    const completedActivity = await activityRepository.completedActivity(activity._id)
    expect(completedActivity).eq(null);
    sandbox.restore();
  });

  it('it should return null if no Activity id is provided', async () => {
    const userId = new objId();
    const activity = {
      _id: new objId().toString(),
      name: 'olio di r2d2',
      description: 'controllare olio r2d2 dopo la passeggiata su Tatooine',
      dueDate: new Date(),
      status: postStatus.open,
      ownerId: ''
    }
    sandbox.stub(postModel, 'findOneAndUpdate').callsFake(() => {
      activity.status = postStatus.completed
      activity.toJSON = () => activity
      return activity;
    });
    const completedActivity = await activityRepository.completedActivity(null,userId)
    expect(completedActivity).eq(null);
    sandbox.restore();
  });

  it('it should return null if no Activity is found on Db', async () => {
    const userId = new objId();
    const activity = {
      _id: new objId().toString(),
      name: 'olio di r2d2',
      description: 'controllare olio r2d2 dopo la passeggiata su Tatooine',
      dueDate: new Date(),
      status: postStatus.open,
      ownerId: ''
    }
    sandbox.stub(postModel, 'findOneAndUpdate').callsFake(() => {
      return null;
    });
    const completedActivity = await activityRepository.completedActivity(activity._id,userId)
    expect(completedActivity).eq(null);
    sandbox.restore();
  });

});

