import express from 'express';
import { createProduct, deleteProduct, getProductById, getProducts, updateProduct } from '../controller/products.js';
import { createOrder, getOrderById, getOrders, updateOrderStaus } from '../models/ordermodels.js';
const router = express.Router();

router.post('/create', createProduct);

router.post('/update', updateProduct);

router.get('/getProducts',getProducts);

router.get('/getProductById', getProductById);

router.delete('/deleteProduct', deleteProduct);

// Order
router.post('/createOrder', createOrder); 

router.get('/getOrders', getOrders);

router.get('/getOrderById', getOrderById);

router.post('/UpdateOrderStatus',updateOrderStaus);

export default router;