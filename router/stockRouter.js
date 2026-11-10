import express from 'express';
import { addStock, getStock, removeStock, addQuantity, deleteStock } from '../controller/stockController.js';
import { requireLogin } from '../middleware/auth.js';

const router = express.Router();

router.post('/stock', requireLogin, addStock);
router.get('/stock', requireLogin, getStock);
router.put('/stock/:id/remove', requireLogin, removeStock);
router.put('/stock/:id/add', requireLogin, addQuantity);
router.delete('/stock/:id', requireLogin, deleteStock);

export default router;