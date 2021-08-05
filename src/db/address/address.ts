import { model, Schema } from 'mongoose';
import { IAddress } from './address.interface';

// Schema
const AddressSchema: Schema = new Schema({
  address: { type: String },
  pk: { type: String },
  coins: { type: String },
  name: { type: String },
  network: { type: String },
  userId: { type: String },
  isTracked: { type: Boolean }
});

const AddressEntity = model<IAddress>('Address', AddressSchema);

export default AddressEntity;
