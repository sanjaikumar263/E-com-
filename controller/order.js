import mongoose  from "mongoose";

const orderSchema = new mongoose.Schema({
    productId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
    },
    quantity: {
        type: Number,
    },
    customerName: {
        type: String,

    },
    customerNumber: {
        type: String,

    },
    status: {
        type: String,
    },
    cancelled: {
        type: Boolean,
        default: false,
    },
    address:{
        type: String,

    }
})

const Order = mongoose.model("Order", orderSchema);
export default Order;