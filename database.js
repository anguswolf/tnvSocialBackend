import mongoose from 'mongoose';
import { MongoMemoryServer } from 'mongodb-memory-server';
/*
const user='augustociuccatosti'
const password='pippocalogero'
const cluster = 'ClusterToDoList'
const dbName = 'todolist'
*/
/*const connectionUrl = `mongodb+srv://
${user}:${password}
@clustertodolist.lc6tm.mongodb.net/${dbName}?retryWrites=true&w=majority&appName=ClusterToDoList'`*/

const user='tnvsocialuser'
const password='paolinopaperino'
const cluster = 'ClusterTnvSocialApp'
const dbName = 'socialAppDb'

const connectionUrl = `mongodb+srv://
${user}:${password}
@clustertnvsocialapp.g4vgd.mongodb.net/${dbName}?retryWrites=true&w=majority&appName=${cluster}'`


const connect = async () => {
  try {
    console.log("NODE_ENV: -" + process.env.NODE_ENV +"-", typeof process.env.NODE_ENV)
    if (process.env.NODE_ENV !== undefined && process.env.NODE_ENV.toString() === 'test') {
      const mongoServer = await MongoMemoryServer.create();
      await mongoose.connect(mongoServer.getUri(), {dbName: dbName});
      console.log('connected to in memory db');
    }
    else {
      await mongoose.connect(connectionUrl);
      console.log('- Connected to MongoDB server');
    }
  } catch (error) {
    console.log('- Connection error', error);
    throw(error);
  }
}
export default connect;