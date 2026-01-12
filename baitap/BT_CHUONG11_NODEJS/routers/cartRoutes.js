const router = require('express').Router();
const authenticate = require('../middlewares/authMiddleware');
const { addToCart, getCart, removeFromCart } = require('../controllers/cartController');

router.post('/add', authenticate , addToCart);
router.get('/', authenticate, getCart);
router.delete('/remove/:id', authenticate, removeFromCart);

module.exports = router;
