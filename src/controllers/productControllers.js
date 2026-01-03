const ProductModel = require('../models/productModel'); // modeli bagliyotuz, db ile calisiyoruz
const productControllers = {}; // Bu obje ile urunleri yonetiyoruz, bu obje icinde index, show ve baska metodlar olacak

productControllers.index = async (req, res, next) => {
    try {
        const search = req.query.search || "";
        const sort = req.query.sort || "";
        const page = parseInt(req.query.page) || 1;

        const limit = 5;
        const offset = (page - 1) * limit;

        let products, total;

        if(search){
            products = await ProductModel.search(search);
            total = products.length;
        }
        else if (sort){
            total = await ProductModel.countAll();
            products = await ProductModel.getSortedByPrice(sort, limit, offset);
        }
        else{
            total = await ProductModel.countAll();
            products = await ProductModel.getPaginated(limit, offset);
        }

        const totalPages = Math.ceil(total/limit);

        res.render('products', {
            products: products,
            search,
            sort,
            currentPage: page,
            totalPages
        }); // products.ejs sablonu render ediyoruz ve datalari tasiyoruz
        
    } catch(err){
        console.error("productsControllers.index error:", err); // hata oldu zamanda onu ileriye veriyoruz
        next(err);
    }
};

// show metodu - id ile bir urun aliyorsun ve view(product.ejs) icinde gosteriyorsun
productControllers.show = async (req, res, next) => {
    try{
        const id = req.params.id; // id'i URL parametre icinden aliyoruz

        const result = await ProductModel.getById(id); // modelli cagiriyoruz ve getById metodunu aliyoruz(getById henuz yok olsada)

        if(!result || result.length === 0){
            return res.status(404).send('Ürün bulunmadı'); // Eger urun bulunmazsa, 404 veriyoruz (res.render('404'))
        }

        res.render('product-show', {product: result[0]}); // product.ejs sayfasini rend ediyoruz

    }catch(err){
        console.error('product.Controller.show error:', err);
        next(err);
    }
};




// Urun olusturma formu
productControllers.createForm = (req, res) =>{
    res.render("product-create");
};


// Yeni urun olusturma
productControllers.create = async (req, res) => {
    try{
        const {title, price, description} = req.body;

        if(!title || title.trim() === ""){
            req.flash("error", "Ürün adı boş olamaz");
            return res.redirect("/products/create");
        }

        if(!price || price < 0){
            req.flash("error", "Fiyat 0'dan büyük olmalıdır");
            res.redirect("/products/create");
        }

        if(!description || description.trim() === ""){
            req.flash("error", "Açıklama boş olamz");
            res.redirect("/products/create");
        }

        await ProductModel.create(req.body);
        req.flash('success', "Ürün başarıyla eklendi");
        res.redirect("/products");
    }catch(err){
        console.log(err);
    }
};



// Gunceleme Formu
productControllers.editForm = async (req, res, next) => {
    try {
        const id = req.params.id;
        const product = await ProductModel.getById(id);

        if(!product || product.length === 0)
            return res.status('404').send("Ürün bulunmadı!");
        
        console.log(product);
        
        res.render("product-edit", {product: product[0]});
    }catch(err){
        console.log(err);
        next(err);
    }
};


// Gunceleme
productControllers.update = async (req, res) => {
    try{
        const id = req.params.id;
        const {title, price, description} = req.body;

        if(!title || title.trim() === ""){
            req.flash("error", "Ürün adı boş olamaz!");
            return res.redirect(`/products/edit/${id}`);
        }
        else if(!price || price <= 0){
            req.flash("error", "Fiyat 0'dan küçük olamaz!");
            return res.redirect(`/products/edit/${id}`);
        }
        else if(!description || description.trim() ===""){
            req.flash("error", "Açıklama boş olamaz!");
            return res.redirect(`/products/edit/${id}`);
        }

        await ProductModel.update(id, req.body);
        req.flash('success', "Ürün güncellendi");
        res.redirect("/products");
    }catch(err){
        console.log(err);
    }
};


// Silme Formu
productControllers.deleteForm = async (req, res, next) => {
    try{
        const id = req.params.id;
        const products = await ProductModel.getById(id);

        if(products.length === 0){
            return res.redirect("/products");
        }
        
        res.render("product-delete", {product: products[0]});
    }catch(err){
        console.log(err);
        next(err);
    }
};


// Silme
productControllers.delete = async (req, res) => {
    try{
        if(!res.locals.isAdmin){
            return res.status(403).send("Yetkisiz erişim");
        }

        const id = req.params.id;
        await ProductModel.delete(id);
        req.flash('success', "Ürün silindi")
        res.redirect("/products");
    }catch(err){
        console.log(err);
    }
};


// controlleri ihrac ediyoruz, routes icinde kullanmak icin
module.exports = productControllers;
