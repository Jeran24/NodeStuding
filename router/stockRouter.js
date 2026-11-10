import express from 'express';
import { addStock, getStock, removeStock, addQuantity, deleteStock } from '../controller/stockController.js';

const router = express.Router();

router.post('/stock', addStock);
router.get('/stock', getStock);
router.put('/stock/:id/remove', removeStock);
router.put('/stock/:id/add', addQuantity);
router.delete('/stock/:id', deleteStock);

export default router;