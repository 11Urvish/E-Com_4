import { model, Schema } from 'mongoose';

const ProductSchema: Schema = new Schema({

  name: { type: String, required: true, trim: true },
  //companyId: { type: Schema.Types.ObjectId, ref: 'Company' },
  //categoryId: { type: Schema.Types.ObjectId, ref: 'Category' },
  //brandId: { type: Schema.Types.ObjectId, ref: 'Brand' },
  description: { type: String, required: true, trim: true },
  quantity: { type: Number, required: true, trim: true },
  price: { type: Number, required: true, trim: true },
  status: { type: Number, required: true, trim: true, default: 1 },

});

export default model('Product', ProductSchema);
