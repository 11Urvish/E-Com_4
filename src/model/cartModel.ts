import { model, Schema } from 'mongoose';

const CartSchema: Schema = new Schema({

    name: { type: String, required: true, trim: true },
    customerId: { type: Schema.Types.ObjectId, ref: 'Customer' },
    description: { type: String, required: true, trim: true },
    quantity: { type: Number, required: true, trim: true },
    price: { type: Number, required: true, trim: true },
    payment_date: { type: Date, default: Date.now },
    status: { type: Number, required: true, trim: true, default: 1 },

});

export default model('Cart', CartSchema);
