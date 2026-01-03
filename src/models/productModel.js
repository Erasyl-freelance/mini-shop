const db = require('../config/db') // SQL sorguleri uretmek icin
const ProductModel = {}; // fonksyionlari depolamak icin


ProductModel.getAll = async ()=>{
    const [rows] = await db.execute('select id, title, price, description, image_url, stock from products');
    console.log('DB PRODUCTS:', rows[0]);
    return rows;
};


ProductModel.getById = async (id) =>{
    const[rows] = await db.execute('select * from products where id = ?', [id]);
    return rows;
};


ProductModel.search = async (keyword) => {
    const sql = `select * from products where title like ?`;

    const [rows] = await db.execute(sql, [`%${keyword}%`]);
    return rows;
};


ProductModel.getSortedByPrice = async (order) => {
    const direction = order === "desc" ? "DESC" : "ASC";

    const sql = `
    select * from products order by price ${direction} 
    `;

    const [rows] = await db.execute(sql);
    return rows;
};


ProductModel.getPaginated = async (limit, offset) => {
    console.log("getPaginated params:", limit, offset);

    const sql = `SELECT * FROM products LIMIT ${limit} OFFSET ${offset}`;
    
    const [rows] = await db.execute(sql);

    return rows;
};


ProductModel.countAll = async () => {
    const [rows] = await db.execute(
        "SELECT COUNT(*) AS total FROM   products"
    );

    return rows[0].total;
}


ProductModel.create = async (product) => {
    const {title, price, description, image_url, stock} = product;
    const [result] = await db.execute(
        "INSERT INTO products (title, price, description, image_url, stock) VALUES (?, ?, ?, ?, ?)", 
        [title, price, description, image_url, stock]
    );
    
    return result.insertId;
};


ProductModel.update = async (id, product) => {
    const {title, price, description, image_url, stock} = product;
    const [result] = await db.execute(
        "UPDATE products SET title=?, price=?, description=?, image_url=?, stock=? WHERE id=?",
        [title, price, description, image_url, stock, id]
    );
    return result.affectedRows;
};


ProductModel.delete = async (id) => {
    const [result] = await db.execute(
        "DELETE FROM products WHERE id=?",
        [id]
    );
    return result.affectedRows;
};


module.exports = ProductModel; // ihrac ediyoruz, controllerde kullanmak icin
