import express from 'express';
import { createProduct, deleteProduct, getProductById, getProducts, updateProduct } from '../controller/products.js';
import { createOrder, getOrderById, getOrders, updateOrderStaus } from '../models/ordermodels.js';
const router = express.Router();

router.post('/create', createProduct);

router.post('/update', updateProduct);

router.get('/getProducts',getProducts);

router.post('/getProductById', getProductById);

router.post('/deleteProduct', deleteProduct);

// Order
router.post('/createOrder', createOrder); 

router.get('/getOrders', getOrders);

router.post('/getOrderById', getOrderById);

router.post('/UpdateOrderStatus',updateOrderStaus);

export default router;