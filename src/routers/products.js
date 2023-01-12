const express = require('express')
const productRouter = express.Router()
const {Product} = require('../models/product')
const {Category} = require('../models/category')

productRouter.get(`/`, async(req, res) => {

  const products = await Product.find().select("name description image price category").populate('category')
  const countProducts = await Product.countDocuments()
  if(!products) return res.status(500).json({success: false, products:"Not Found"})

  res.status(200).json({success: true, count: countProducts, products: products})
});
productRouter.get(`/:id`, async(req, res) => {

  const product = await Product.findById(req.params.id).select("name description image price category").populate('category')
  
  if(!product) return res.status(500).json({success: false, products:"Not Found"})

  res.status(200).json(product)
});
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

  const product = await Product.findByIdAndRemove(req.params.id)
  if(!product) return res.status(500).send("Product Not Found")

  res.status(200).send("Product Deleted")
});
module.exports = productRouter