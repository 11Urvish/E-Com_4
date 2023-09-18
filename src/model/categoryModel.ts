import { model, Schema } from 'mongoose';

const CategorySchema: Schema = new Schema({

    name: { type: String, required: true, trim: true },
    description: { type: String, required: true, trim: true },
    status: { type: Number, required: true, trim: true, default: 1 },

});

export default model('Category', CategorySchema);