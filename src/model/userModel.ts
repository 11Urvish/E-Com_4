import { model, Schema } from 'mongoose';

const UserSchema: Schema = new Schema({

    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: { type: String, required: true, trim: true },
    phoneNo: { type: String, required: true, trim: true },
    password: { type: String, required: true, trim: true },
    gender: { type: String, required: true, trim: true },
    status: { type: Number, required: true, trim: true, default: 1 },
    user_type: { type: String, required: true, trim: true, enum: ['super_admin', 'user'] },
    // otp: { type: Number, required: true, trim: true },
    // online: { type: String, required: true, trim: true, default: false },

    // created_by: { type: Schema.Types.ObjectId, ref: 'User' },
    // created_at: { type: Date, default: Date.now },
    // updated_by: { type: Schema.Types.ObjectId, ref: 'User' },
    // updated_at: { type: Date, default: Date.now },

});

export default model('User', UserSchema);
