Хорошо, сейчас **добавляю недостающий и важный блок** — **ЧЁТКО: как зайти как админ**, без воды и путаницы.
Ниже **ГОТОВЫЙ ОБНОВЛЁННЫЙ ТЕКСТ**, который ты можешь **целиком вставить в README / PDF**.

---

# 🛒 Mini Shop (Node.js + Express + MySQL)

**Mini Shop**, Node.js ve Express kullanılarak geliştirilmiş **basit bir e-ticaret (mini shop) projesidir**.
Bu proje eğitim amaçlıdır ve temel e-ticaret mantığını öğretmeyi hedefler.

Kullanıcılar:

* ürünleri görüntüleyebilir
* sepete ekleyebilir
* sipariş oluşturabilir

Admin kullanıcılar ise ek yetkilere sahiptir.

---

## 🚀 Özellikler

* Kullanıcı kayıt (register) ve giriş (login) sistemi
* Session tabanlı kimlik doğrulama
* Ürün listeleme
* Sepet (cart) sistemi
* Sipariş oluşturma
* Sipariş geçmişi görüntüleme
* Rol tabanlı admin sistemi (`user / admin`)
* EJS template engine
* MySQL veritabanı

---

## 🧱 Kullanılan Teknolojiler

* Node.js
* Express.js
* MySQL
* EJS
* express-session
* bcrypt
* dotenv

---

## 📂 Proje Yapısı

```
mini-shop/
│
├── src/
│   ├── controllers/
│   │   ├── authController.js
│   │   ├── orderController.js
│   │   └── productController.js
│   │
│   ├── routes/
│   │   ├── authRoutes.js
│   │   ├── orderRoutes.js
│   │   └── productRoutes.js
│   │
│   ├── middleware/
│   │   └── requireLogin.js
│   │
│   ├── views/
│   │   ├── products.ejs
│   │   ├── auth.ejs
│   │   ├── orders.ejs
│   │   └── partials/
│   │       ├── header.ejs
│   │       └── footer.ejs
│   │
│   └── config/
│       └── db.js
│
├── app.js
├── .env
└── README.md
```

---

## ⚙️ Kurulum

### 1️⃣ Projeyi klonla

```bash
git clone https://github.com/username/mini-shop.git
cd mini-shop
```

### 2️⃣ Paketleri yükle

```bash
npm install
```

### 3️⃣ `.env` dosyasını oluştur

```env
PORT=3000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=mini_shop
SESSION_SECRET=supersecretkey
```

---

## 🗄️ MySQL Tabloları

```sql
CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email VARCHAR(255) UNIQUE,
  password VARCHAR(255),
  role VARCHAR(20) DEFAULT 'user'
);

CREATE TABLE orders (
  id INT AUTO_INCREMENT PRIMARY KEY,
  user_id INT,
  total_price DECIMAL(10,2),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE order_items (
  id INT AUTO_INCREMENT PRIMARY KEY,
  order_id INT,
  product_id INT,
  title VARCHAR(255),
  price DECIMAL(10,2),
  qty INT
);
```

---

## ▶️ Çalıştırma

```bash
node app.js
```

Tarayıcıdan aç:

```
http://localhost:3000/products
```

---

## 🔐 Giriş ve Yetkilendirme Mantığı

* Kullanıcı **giriş yapmadan**:

  * ürünleri görebilir
  * **sipariş veremez**

* Sipariş vermeye çalışırsa:

  * otomatik olarak `/auth` sayfasına yönlendirilir

Bu kontrol şu middleware ile yapılır:

```
requireLogin
```

---

## 🛠️ Admin Sistemi (Rol Tabanlı)

### ❗ ÖNEMLİ: Admin için **ayrı bir login sayfası YOKTUR**

Admin girişi **normal kullanıcı login sayfası üzerinden yapılır**.

Admin = `users` tablosunda

```
role = 'admin'
```

olan kullanıcıdır.

---

### 🔑 Admin Olarak Nasıl Giriş Yapılır? (ADIM ADIM)

#### 1️⃣ Normal kullanıcı olarak kayıt ol

Tarayıcıdan:

```
/auth
```

sayfasına git ve **register** ile kullanıcı oluştur.

---

#### 2️⃣ Kullanıcıyı veritabanından admin yap

MySQL’de şu sorguyu çalıştır:

```sql
UPDATE users 
SET role = 'admin' 
WHERE email = 'admin@mail.com';
```

---

#### 3️⃣ Normal login sayfasından giriş yap

Tarayıcıdan:

```
/auth
```

Email + şifre ile **normal şekilde giriş yap**.

---

#### 4️⃣ Sistem otomatik olarak admin’i tanır

Login sırasında:

```js
if (user.role === 'admin') {
  req.session.isAdmin = true;
}
```

---

#### 5️⃣ Admin arayüzü otomatik görünür

Header (üst menü) içinde:

```ejs
<% if (user && user.role === 'admin') { %>
  <a href="/admin">Admin Panel</a>
<% } %>
```

Admin olmayan kullanıcılar **bu linki göremez**.

---

## ✅ Projeyi Kontrol Etmek İçin (Checklist)

* [ ] Kullanıcı kayıt olabiliyor mu
* [ ] Kullanıcı giriş yapabiliyor mu
* [ ] Giriş yapmadan sipariş verilemiyor mu
* [ ] Giriş sonrası sepet çalışıyor mu
* [ ] Sipariş oluşturuluyor mu
* [ ] Sipariş geçmişi görüntüleniyor mu
* [ ] Admin rolü olan kullanıcı admin linkini görüyor mu

---

## ⚠️ Notlar

* Bu proje **eğitim amaçlıdır**
* Güvenlik ve validasyon **basit tutulmuştur**
* Gerçek projelerde:

  * input validation
  * CSRF
  * rate limiting
  * gelişmiş role-based authorization
    uygulanmalıdır

---

## ✨ Sonuç

Mini Shop projesi:

* Node.js + Express mantığını
* Session & authentication yapısını
* Rol tabanlı admin yetkilendirmeyi
* Temel e-ticaret akışını

---
