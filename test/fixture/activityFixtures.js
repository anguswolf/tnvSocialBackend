import { postStatus } from '../../src/const/const.js';
import { postModel } from '../../src/schema/postSchema.js';

class ActivityFixtures {
  async addActivityToDb (userId, data) {
    let activity =  {
      name: 'olio di r2d2',
      description: 'controllare olio r2d2 dopo la passeggiata su Tatooine',
      dueDate: new Date(),
      status: postStatus.open,
      ownerId: userId
    }
    if (data) {
      activity = {...activity, ...data}
    }
    const activityDoc = await postModel.create(activity);
    return activityDoc.toJSON({flattenObjectIds:true, versionKey:false})
  }

  async restore() {
    await postModel.deleteMany();
  }
  async getFromDb(activityId){
    const activityDoc = await postModel.findById(activityId)
    return activityDoc.toJSON({flattenObjectIds:true, versionKey:false})
  }

  async getByUser(ownerId){
    const activityDoc = await postModel.find({ownerId:ownerId})
    return activityDoc.map(item => item.toJSON({ flattenObjectIds: true, versionKey: false }));
  }


}

export const activityFixtures = new ActivityFixtures();