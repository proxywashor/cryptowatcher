import { Document } from 'mongoose';

export interface IUser extends Document {
   rpc: string;
   network: string;
   pk: string[];
   userName: string;
   address: string;
}
