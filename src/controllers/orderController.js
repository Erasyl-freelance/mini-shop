const db = require("../config/db");
const orderController = {};

orderController.checkout = async (req, res) => {
    try{
        const cart = req.session.cart;
        const userId = req.session.user?.id || null;


        if(!cart || cart.length === 0){
            return res.redirect("/cart");
        }

        let total = 0;
        cart.forEach(item => {
            total += item.price * item.qty;
        });

        // siparis olusturma
        const [orderResult] = await db.execute(
            "INSERT INTO orders (user_id, total_price) VALUES (?, ?)",
            [userId, total]
          );

        const orderId = orderResult.insertId;

        // siparis ogeleri ekle
        for(const item of cart){
            await db.execute(
                `INSERT INTO order_items (order_id, product_id, title, price, qty)
                VALUES (?, ?, ?, ?, ?)`,
                [orderId, item.id, item.title, item.price, item.qty]
            );
            
        }

        // sepeti temizle
        req.session.cart = [];
        res.redirect("/order/success");
    } catch(err){
        console.error("ORDER ERROR:", err);
        res.status(500).send("Sipariş oluşturulmadı");
    }
};


orderController.index = async (req, res) => {
    const userId = req.session.user.id;

    const [orders] = await db.execute(
        "SELECT * FROM orders WHERE user_id = ? ORDER BY created_at DESC",
        [userId]
    );

    res.render("orders", {orders});
};

orderController.show = async (req, res) => {
    const id = req.params.id;
    const userId = req.session.user.id;

    const [[order]] = await db.execute(
        "SELECT * FROM orders WHERE id = ? AND user_id = ?",
        [id, userId]
    );

    if(!order)
        return res.status(403).send("Erişim yok")

    const [items] = await db.execute(
        "SELECT * FROM order_items WHERE order_id = ?",
        [id]
    );

    if(!order)
        return res.status(404).send("Siparış bulunmadı");

    res.render("order-show", {order, items});

};

orderController.success =  (req, res) => {
    res.render("order-success");
}

module.exports = orderController;
