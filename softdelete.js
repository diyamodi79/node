let express = require("express");

let app = express();
let product = [];

app.use(express.json());

app.get('/Hello', (req, res) => {
   res.send("Hello");
});

app.post('/createProduct', (req, res) => {
   console.log(req.body)
   let obj = req.body
   obj.isDeleted=false
   obj.id = product.length + 1
   product.push(obj)
   console.log("product",product)
   res.send({
      msg: "Product added successfully",
      Product : obj
   })
})
   app.get('/getProductdata', (req, res) => {
      let x=product.filter((val)=>{
         if((val.isDeleted==false)){
            return true;
         }
      })
      res.send({isSuccess:true , data:x});
   })
app.put('/updateProduct',(req,res)=>{
   console.log(req.query)
   let id=req.query.id
   let obj=req.body
   let searchpro=product.find((val)=>{
     
      return val.id==id
   })
   if(searchpro && searchpro.isDeleted == true){
   res.send({isSuccess:false,msg:"product not found"})
   }else{
   searchpro.productname=obj.productname?obj.productname:searchpro.productname
   searchpro.cost=obj.cost?obj.cost:searchpro.cost
   searchpro.description=obj.description?obj.description:searchpro.description
   product.push(searchpro)
   console.log("product", product)
   res.send({
      msg:"product updated successfully"
   
   })
   console.log("searchpro", searchpro)
}
})
app.delete('/deleteProduct',(req,res)=>{
   let id= req.query.id
   let ind=product.findIndex((val)=>{
      val.id==id
   })
   product.splice(ind,1)
   console.log(product)
})
app.put("/softDelete",(req,res)=>{
   let id=req.query.id;
   let ind=product.findIndex((fld)=>{
      if(fld.id==id){
         return true
      }
   });
   product[ind].isDeleted=true;
   res.send({isSuccess: true,id:ind})
})

app.listen(6000,(err) => {
   if (!err) {
      console.log("Server running on 6000")
   }
});