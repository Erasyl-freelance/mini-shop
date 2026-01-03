// Kutuphanelerdi importladim(Express'i aciyorum, Nodejs icin)
const express = require('express');
const session = require('express-session'); // Middlwere: sepetler, giris/cikis vs. icin
const flash = require('connect-flash'); //
const path = require('path'); // Node'in bir moduli, dosya path'larla calismak icin
const dotenv = require("dotenv"); // sifre, kullanici datalari vb. ortam degiskenlere koymak icin
dotenv.config(); // .env dosyasini bulup, icindeki degiskinleri process.env'e yukler

//Express uygulanmasi, yollari yuklemesi
const app = express(); // express objesi/ornegi
const PORT = process.env.PORT || 3000; // PORT ortam degiskenleri okur, yoksa 3000


app.set('views', path.join(__dirname, 'src/views')); // EJS-sablonlar nerde kaydetilmis/depolanmis
app.set('view engine', 'ejs'); // gorunum motorunu kuruyoruz - EJS

// puplic dosyasine url ile ulasabilmek icin
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: false})); // formlarin islenmesi (application/)
app.use(express.json()); // jSON islemesi (application/JSON)


app.use(session({
    secret: process.env.SESSION_SECRET || 'secret123',
    resave: false,
    saveUninitialized: true
}));


app.use(flash());


const authRoutes = require("./src/routes/authRoutes");
const cartRoutes = require("./src/routes/cartRoutes");
const productRoutes = require('./src/routes/productRoutes');
const orderRoutes = require("./src/routes/orderRoutes");

app.use((req, res, next) => {
    res.locals.isAdmin = !!req.session.isAdmin;
    next();
});

app.use((req, res, next) => {
    res.locals.user = req.session.user || null;
    next();
});

app.get("/admin/login", (req, res) => {
    req.session.isAdmin = true;
    req.flash("success", "Admin modu açıldı");
    res.redirect("/products");
  });
  
app.get("/admin/logout", (req, res) => {
    req.session.isAdmin = false;
    req.flash("success", "Admin modu kapandı");
    res.redirect("/products");
});



app.use((req, res, next) => {
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    res.locals.isAdmin = !!req.session.isAdmin;
    res.locals.user = req.session?.user || null;
    next();
});


// productRoutes'tan koke rota cizmek
app.use('/', productRoutes);
app.use("/", cartRoutes);
app.use("/", authRoutes);
app.use("/", orderRoutes);

// middleware
app.use((req,res)=>{
    res.status(404).send('Sayfa bulunmadi')
})



// Sunucuyu baslatiyorum
app.listen(PORT, ()=>{
    // sunucu calisti mi kontrol ediyoruz.
    console.log(`Sunucu calisiyor: https://localhost:${PORT}`);
});
