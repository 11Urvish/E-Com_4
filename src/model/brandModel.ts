import { model, Schema } from 'mongoose';

const BrandSchema: Schema = new Schema({

    name: { type: String, required: true, trim: true },
    //companyId: { type: Schema.Types.ObjectId, ref: 'Company' },
    status: { type: Number, required: true, trim: true, default: 1 },

});

export default model('Brand', BrandSchema);