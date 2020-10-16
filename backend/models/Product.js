const mongoose = require('mongoose');
const AutoIncrement = require('mongoose-sequence')(mongoose);
const Schema = mongoose.Schema;

// Define collection and schema
let Product = new Schema({
   pname: {
      type: String,
      required: true
   },
   costPrice: {
      type: Number,
      required: true
   },
   sellPrice: {
      type: Number,
      required: true
   },
   quantity: {
     type: Number,
     required: true
   }
}, {
   collection: 'products'
});

Product.plugin(AutoIncrement, {inc_field: 'pid'});

//   id?: number;
//   name: string;
//   costPrice: number;
//   sellPrice: number;
//   quantity: number;

module.exports = mongoose.model('Product', Product);
