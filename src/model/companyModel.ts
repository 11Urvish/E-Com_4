import { model, Schema } from 'mongoose';

const CompanySchema: Schema = new Schema({

    name: { type: String, required: true, trim: true },
    status: { type: Number, required: true, trim: true, default: 1 },

});

export default model('Company', CompanySchema);