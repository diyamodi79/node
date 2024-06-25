let express = require("express");

let app = express();
let product = [];
require('dotenv').config()
app.use(express.json());

app.post('/createProduct', (req, res) => {
   try{
   console.log(req.body)
   let obj = req.body
   obj.isDeleted=false
   obj.id = product.length + 1
   product.push(obj)
   console.log("product",product)
   
   res.status(201).send({
      msg: "Product added successfully",
      Product : obj
   })
   }catch(err){
      res.status(500).send("internal error")
   }
})

   app.get('/getProductdata', (req, res) => {
      try{
      let x=product.filter((val)=>{
         if((val.isDeleted==false)){
            return true;
         }
      })
      res.status(200).send({isSuccess:true , data:x});
   }catch(err){
      res.status(500).send("internal error")
   } 
  })

app.put('/updateProduct',(req,res)=>{
   try{
   console.log(req.query)
   let id=req.query.id
   let obj=req.body
   let searchpro=product.find((val)=>{
     
      return val.id==id
   })
   if(searchpro && searchpro.isDeleted == true){
   res.status(404).send({isSuccess:false,msg:"product not found"})
   }else{
   searchpro.productname=obj.productname?obj.productname:searchpro.productname
   searchpro.cost=obj.cost?obj.cost:searchpro.cost
   searchpro.description=obj.description?obj.description:searchpro.description
   product.push(searchpro)
   console.log("product", product)
   res.status(200).send({
      msg:"product updated successfully"
   
   })
   console.log("searchpro", searchpro)
   
   }
}catch(err){
   res.status(500).send("internal error")
}
})
app.put("/softDelete",(req,res)=>{
try {
   let id=req.query.id;
   let ind=product.findIndex((fld)=>{
      if(fld.id==id){
         return true
      }
   });
   product[ind].isDeleted=true;
   res.status(200).send({isSuccess: true,id:ind})
} catch (error) {
   res.status(500).send("internal error")
}
})
app.get("/sortcost",(req,res)=>{
   try{
      let sor =req.query.sort
      product.sort((a,b)=>{
         if(sort == "asc" ){
            return a.cost - b.cost
         }
         else if(sor == "des"){
            return b.cost-a.cost
         }
         else{
            res.status(404).send({msg:"product is not there"})
         }
      })

   }catch (err){
      res.status(500).send("internal server error")
   }
})

app.listen(process.env.PORT,(err) => {
   if (!err) {
      console.log("Server is running on "+process.env.PORT)
   }
});