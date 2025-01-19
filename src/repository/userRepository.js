import MongoInternalException from '../exception/MongoInternalException.js';
import NotFoundException from '../exception/NotFoundException.js';
import UserAlreadyExistsException from '../exception/UserAlreadyExistException.js';
import { userStatus } from '../const/const.js';
import { userModel } from '../schema/userSchema.js';
import UnauthorizedException from '../exception/UnathorizedException.js';
import LoginException from "../exception/LoginException.js";

const add = async (content) => {
  try {
    const res = await new userModel(content).save();
    return res.toJSON({versionKey:false})
  } catch (e) {
    if(e.message.indexOf('E11000 duplicate key error') > -1) {
      throw new UserAlreadyExistsException(`user ${content.email} already exists`, 100100)
    }
    throw new MongoInternalException(e.message, 100101)
  }
}

const confirmRegistration = async (id, token) => {
    try {
      const result = await userModel.findOneAndUpdate(
        {_id: id, registrationToken: token},
        {
          status:userStatus.active,
          registrationToken: null
        },
        {new: true}
      )
      if(!result) {
        throw new NotFoundException('user not found', 100102)
      }
  
      if(result.status === userStatus.active) {
        return result.toJSON({versionKey:false})
      }
  
    } catch (e) {
      if(e.code === 100102) {
        throw e
      }
      throw new MongoInternalException(e.message, 100103)
    }
  }

  const getByEmail = async (email) => {
    const result = await userModel.findOne({email:email, status: userStatus.active})
    if(!result) {
      /*throw new UnauthorizedException('login failed', 100104);*/
      throw new LoginException('Email o password non valide', 100104);
    }
    return result.toJSON({versionKey:false})
  }

  const checkEmailExists = async (email) => {
    const result = await userModel.findOne({email:email})
    if (!result) {
      return false
    }
    return true;

  }
  
  export default {
    add,
    confirmRegistration,
    getByEmail,
    checkEmailExists
  }