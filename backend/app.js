
let allProducts = [{
    id:2,
    title:"Iphon",
    price : 122,
},
{
    id:2,
    title:"Iphon",
    price : 122,
},
{
    id:3,
    title:"Laptop",
    price : 1200,
},
{
    id:4,
    title:"Camera",
    price : 1000,
},
{
    id:5,
    title:"Samsung",
    price : 500,
},
];



const express = require('express')
var mongoose = require('mongoose')
var Product = require('./models/product');
const exp = require('constants');
var server = express()

server.use(express.urlencoded({extended:true}))

server.use(express.json())

//connect to DataBase
mongoose.connect('mongodb+srv://hiba30018:Iohsm12345@cluster0.a9hr7hq.mongodb.net/ecommerce')
.then(()=>{
    console.log("Connected to database");
})
.catch((err)=>{
    console.log("error connecttion");
});
//All Products
server.get('/products',function(req,res){
    Product.find()
    .then((productData)=>{
        res.send(productData)
    })
    .catch((err)=>{
        res.send({
            error:'Error getting product'
        })
    })
});
//Get Product by ID

server.get('/products/:id',function(req,res){
    let prodId = req.params.id;
    console.log(prodId)
    Product.findOne({id:prodId}).then((singleProduct)=>{
        res.send(singleProduct)
    }).catch((err)=>{
        console.log(err);
    })
})

// Add Product
server.post("/addProduct",function(req,res){
    let productData = req.body;
    let newProduct = new Product({
        id: +productData.id,
        title : productData.title,
        price: +productData.price,
        image : productData.image,
        isAvalibale : productData.isAvalibale
    })

    newProduct.save().then(
        (msg)=>{
            res.send({
                msg: "product added successfully"
            })
        }
    ).catch((err)=>{
        console.log(err)
    })

})

// Update Product
server.put("/products/:id",function(req,res){
   
    let prodId = +req.params.id;
    Product.updateOne(
        {id:prodId},
        {
            title: "apple tv",
        }
    ).then((msg)=>{
        res.send({
            msg: "product Updated successfully"
        })
    }).catch((err)=>{
        console.log(err)
    })

})


// Delete Product
server.delete("/products/:id",function(req,res){
   
    let prodId = +req.params.id;
    Product.deleteOne(
        {id:prodId}
    ).then((msg)=>{
        res.send({
            msg: "product Deleted successfully"
        })
    }).catch((err)=>{
        console.log(err)
    })

})
server.listen(3002,function(){
    console.log("Server connected");
})