import { model, Schema } from 'mongoose';
import { IUser } from './user.interface';

// Schema
const UserSchema: Schema = new Schema({
  rpc: { type: String },
  pk: { type: Array },
  network: { type: String },
  userName: { type: String },
  address: { type: String }
});

const UserEntity = model<IUser>('User', UserSchema);

export default UserEntity;
