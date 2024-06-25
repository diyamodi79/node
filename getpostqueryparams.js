let express = require("express");

let app = express();
let product = [];
app.use(express.json());

app.get('/Hello', (req, res) => {
   res.send("Hello");
});

app.post('/createProduct', (req, res) => {
   let obj = req.body
   obj.id = product.length + 1;
   product.push(obj)
   console.log("product")
   console.log(req.body)
   res.send({
      msg: "Product added successfully",
      Product : obj
   })
})

   app.get('/getProductdata', (req, res) => {
      res.send(product)
   })
   app.get('/hello', (req,res)=>{
      console.log(res.query)
      let name= res.query.name
      console.log(name);
      res.send('Hello ${name}')
   })

app.get('/hello/:name', (req,res)=>{
   let name=req.params.name
   res.send("Hello" + name)
})

app.listen(9000, (err) => {
   if (!err) {
      console.log("Server running on 9000")
   }
});