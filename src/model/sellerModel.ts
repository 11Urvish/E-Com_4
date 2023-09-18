import { model, Schema } from 'mongoose';

const SellerSchema: Schema = new Schema({


    productId: { type: Schema.Types.ObjectId, ref: 'Product' },
    description: { type: String, required: true, trim: true },
    price: { type: Number, required: true, trim: true },
    phoneNumber: { type: String, required: true, trim: true },
    status: { type: Number, required: true, trim: true, default: 1 },
    //seller_type: { type: String, required: true, trim: true, enum: ['buyer', 'seller'] },


});

export default model('Seller', SellerSchema);
