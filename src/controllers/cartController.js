const cartController = {};

// Sepeti goster
cartController.index = (req, res) => {
  const cart = req.session.cart || [];

  let toplam = 0; 
  cart.forEach(item => {
    toplam += item.price * item.qty;
  }, 0);
  res.render("cart", { cart, toplam });
};

// sepete ekle
cartController.add = (req, res) => {
  if (!req.session.cart) {
    req.session.cart = [];
  };

  const { id, title, price } = req.body;
  const cart = req.session.cart;
  
  // Urun var mi, kontroller ediyoruz
  const existing = cart.find(item => item.id === id);
  
  if(existing){
    existing.qty += 1;
  } else{
    cart.push({
      id,
      title,
      price: Number(price),
      qty: 1
    });
  }

  req.flash("success", "Ürünler sepete eklendi");
  res.redirect("/cart");
};


// Urun sayisini cogalt
cartController.ajaxIncrease = (req, res) => {
  const id = req.params.id;
  const cart = req.session.cart || [];

  const item = cart.find(i => i.id == id);
  if(item)
    item.qty += 1;

  res.json({success: true, cart});
};

// Urun sayisin azalt
cartController.ajaxDecrease = (req, res) => {
  const id = String(req.params.id);
  let cart = req.session.cart || [];

  const item = cart.find(i => String(i.id) == id);

  if(item){
    item.qty -= 1;
  }

  if(item.qty <= 0){
    cart = cart.filter(i => (i.id) != id);
  }

  req.session.cart = cart;
  res.json({success: true, cart});
};

// Urun sayisi 0 oldugunda sepetten sil
cartController.ajaxRemove = (req, res) => {
  const id = req.params.id;
  const cart = (req.session.cart || []).filter(i => i.id != id);
  req.session.cart = cart;

  res.json({success: true, cart});
};


module.exports = cartController;
