import express from 'express';
const router = express.Router();
import PurchaseController from '../controllers/purchase.controller.js';
import validation from '../middlwares/validation.js';
//import purchaseController from '../controllers/purchase.controller.js';

router.post('/purchase', validation, PurchaseController.buyTicket);
router.get('/history', validation, PurchaseController.viewPurchase);

export default router;