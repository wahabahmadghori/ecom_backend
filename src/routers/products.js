const express = require('express')
const productRouter = express.Router()
const {Product} = require('../models/product')
const {Category} = require('../models/category')
const mongoose = require('mongoose')

productRouter.get(`/`, async(req, res) => {

  let filter = {}
  if(req.query.category){
    filter = {
      category : req.query.category.split(',').filter((x)=>mongoose.isValidObjectId(x))
    }
  }
  const products = await Product.find(filter)
  
  if(!products) return res.status(500).json({success: false, products:"Not Found"})

  res.status(200).json({success: true, products: products})
});

productRouter.get(`/:id`, async(req, res) => {

  const product = await Product.findById(req.params.id).select("name description image price category").populate('category')
  
  if(!product) return res.status(500).json({success: false, products:"Not Found"})

  res.status(200).json(product)
});

productRouter.get(`/get/count`, async(req, res)=>{
  const countProducts = await Product.countDocuments()
  if(!countProducts) return res.status(500).send("No Product")
  res.status(200).json({success: true,  count: countProducts})
})

productRouter.get(`/get/featured`, async(req, res)=>{
  const featuredProducts = await Product.find({isFeatured: true})
  if(!featuredProducts) return res.status(500).send("Not Product Found")
  res.status(200).json({success: true,  featuredProducts: featuredProducts})
})
productRouter.get(`/get/featured/:count`, async(req, res)=>{
  const count = req.params.count? req.params.count:0
  const featuredProducts = await Product.find({isFeatured: true}).limit(+count)
  if(!featuredProducts) return res.status(500).send("Not Product Found")
  res.status(200).json({success: true,  featuredProducts: featuredProducts})
})


productRouter.post(`/`, async(req, res)=>{
  try {
    const category = await Category.findById(req.body.category)
    if(!category) return res.status(400).send('Category not found')
  
    let product = new Product({
      name:req.body.name,
      description:req.body.description,
      richDescription:req.body.richDescription,
      image:req.body.image,
      images: req.body.images,
      brand: req.body.brand,
      price: req.body.price,
      category: req.body.category,
      countInStock: req.body.countInStock,
      rating: req.body.rating,
      numReviews: req.body.numReviews,
      isFeatured: req.body.isFeatured
    })
    product = await product.save()
    if(!product) return res.status(400).send('Product is not created')
    res.status(201).json(product)  
  } catch (error) {
    res.status(500).send(error)
  }
  
})
productRouter.delete(`/:id`, async(req, res) => {
console.log('Hello Delelte')
  if(!mongoose.isValidObjectId(req.params.id)) return res.status(400).send('Product Not Found')

  const product = await Product.findByIdAndRemove(req.params.id)
  if(!product) return res.status(500).send("Product Not Found")

  res.status(200).send("Product Deleted")
});

productRouter.put(`/:id`, async(req, res) => {
  try {
    const category = await Category.findById(req.body.category)
    if(!category) return res.status(400).send('Category not found')
    
    let product = await Product.findById(req.params.id)
    if(!product) return res.status(400).send('Product not found')
    
      product = await Product.findByIdAndUpdate(req.params.id,{
      name:req.body.name,
      description:req.body.description,
      richDescription:req.body.richDescription,
      image:req.body.image,
      images: req.body.images,
      brand: req.body.brand,
      price: req.body.price,
      category: req.body.category,
      countInStock: req.body.countInStock,
      rating: req.body.rating,
      numReviews: req.body.numReviews,
      isFeatured: req.body.isFeatured
    }, {
      new:true
    })
    res.status(201).json(product)  
  } catch (error) {
    res.status(500).send(error)
  }
  
});




module.exports = productRouter