const express = require("express");
const app = express();
app.listen(3000, function () {
  console.log("Server is listening on port 3000. Ready to accept requests!");
});

const { Pool } = require("pg");

const db = new Pool({
  user: "junitalama", // replace with you username
  host: "localhost",
  database: "cyf_ecommerce",
  password: "Manita53",
  port: 5432,
});
//     '
app.get("/products", function (req, res) {
  db.query(
    //"select product_name as name from products"
    'select product_name as name, unit_price as price, supplier_name as "supplierName" from products p join product_availability pa on(pa.prod_id = p.id) join suppliers s on (pa.supp_id = s.id)'
  )
    .then((result) => {
      res.json(result.rows);
    })
    .catch((error) => {
      console.log(error);
    });
});

app.get("/products/:name", function (req,res){
    const productName = req.params.name;
    db.query("select * from products where product_name ilike $1 || '%'", [productName])
      .then((result) => {
        res.json(result.rows[0]);
      })
      .catch((error) => {
        console.log(error);
      });
})
module.exports = app;
