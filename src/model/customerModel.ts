import { model, Schema } from 'mongoose';

const CustomerSchema: Schema = new Schema({

    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    phoneNo: { type: Number, required: true, trim: true },
    password: { type: String, required: true, trim: true },
    gender: { type: String, required: true, trim: true },
    status: { type: Number, required: true, trim: true, default: 1 },

});

export default model('Customer', CustomerSchema);
