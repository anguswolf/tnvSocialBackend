import ForbiddenException from '../exception/ForbiddenException.js';
import NotFoundException from '../exception/NotFoundException.js';
import { postModel } from '../schema/postSchema.js';
import {c} from "sinon/lib/sinon/spy-formatters.js";
import {userModel} from "../schema/userSchema.js";

const addPost = async (data) => {
  data.ownerId = data.userId;
  const result = await new postModel(data).save()
  return result.toJSON({versionKey: false})
}

const retrievePost = async (id) => {
  const res = await postModel
      .findById(id)
      .populate('ownerId', 'displayName displaySurname'); // Recupera i campi `name` e `email` dell'utente

  if (!res) {
    return null; // Nessun post trovato
  }
  return res.toJSON({ versionKey: false });
}

const listPosts = async (userId, pageId= 1) => {
  const pageSize = 3; // Numero di post per pagina
  const skip = (pageId - 1) * pageSize; // Calcola quanti documenti saltare
  let res;
  try {
    res = await postModel.find({})
        .populate('ownerId', 'displayName displaySurname')
        .skip(skip)
        .limit(pageSize)
        .exec();

  }catch(err) {
    console.log(err);
  }

  //console.log(res?.map(item => item.toJSON({versionKey:false})))
  //return post?.toJSON({versionKey:false}) || null
  return res?.map(item => item.toJSON({versionKey:false}));
}

/*const _changeStatus = async (id, userId, status) => {
  if(!(id && userId)){return null}
  const activity = await postModel.findOneAndUpdate({_id:id,ownerId:userId},{$set:{status}},{upsert:false,new:true})
  return activity?.toJSON({versionKey:false}) || null
}*/

export default {
  addPost,
  retrievePost,
  listPosts,
}
