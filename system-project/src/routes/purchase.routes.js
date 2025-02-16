import express from 'express';
const router = express.Router();
import PurchaseController from '../controllers/purchase.controller';
import authMiddleware from '../middlwares/validation';

router.post('/purchase', authMiddleware, PurchaseController.buyTicket);
router.get('/history', authMiddleware, PurchaseController.viewPurchase);

module.exports = router;
