import { Document } from 'mongoose';

export interface IAddress extends Document {
    address: string;
    pk: string;
    coins: string;
    name: string;
    network: string;
    userId: string;
    isTracked: boolean;
}
