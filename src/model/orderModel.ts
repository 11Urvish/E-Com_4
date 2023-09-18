import { model, Schema } from 'mongoose';

const OrderSchema: Schema = new Schema({


    customerId: { type: Schema.Types.ObjectId, ref: 'Customer' },
    description: { type: String, required: true, trim: true },
    quantity: { type: Number, required: true, trim: true },
    totalPrice: { type: Number, required: true, trim: true },
    address: { type: String, required: true, trim: true },
    phoneNumber: { type: String, required: true, trim: true },
    status: { type: Number, required: true, trim: true, default: 1 },


});

export default model('Order', OrderSchema);
