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
app.put('/updateProduct',(req,res)=>{
   console.log(req.query)
   let id=req.query.id
   let obj=req.body
   let searchpro=product.find((val)=>{
     
      return val.id==id
   })
   searchpro.productname=obj.productname?obj.productname:searchpro.productname
   searchpro.cost=obj.cost?obj.cost:searchpro.cost
   searchpro.description=obj.description?obj.description:searchpro.description
   product.push(searchpro)
   console.log("product", product)
   res.send({
      msg:"product updated successfully"
   
   })
   console.log("searchpro", searchpro)
})
app.delete('/deleteProduct',(req,res)=>{
   let id= req.query.id
   let ind=product.findIndex((val)=>{
      val.id==id
   })
   product.splice(ind,1)
   console.log(product)
})

app.listen(6000,(err) => {
   if (!err) {
      console.log("Server running on 6000")
   }
});