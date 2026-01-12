const addToCart = (req, res) => {
    const { productId, quantity } = req.body;

    if (!req.session.cart) req.session.cart = [];

    req.session.cart.push({ productId, quantity });
    res.json({ message: "Added", cart: req.session.cart });
};

const getCart = (req, res) => {
    res.json(req.session.cart || []);
};

const removeFromCart = (req, res) => {
    const { productId } = req.params;
    req.session.cart = (req.session.cart || []).filter(p => p.productId != productId);
    res.json({ message: "Removed", cart: req.session.cart });
};

module.exports = {
    addToCart , 
    getCart ,
    removeFromCart
}
