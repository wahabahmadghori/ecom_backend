const express = require('express')
const { Category } = require('../models/category')
const categoryRouter = express.Router()

categoryRouter.get('/', async(req, res)=>{
    const categories = await Category.find({})
    if(!categories)
        return res.json({success: false, data: "No Data Found"})
    res.status(200).json({success: true, data: categories})
})
categoryRouter.get('/:id', (req, res)=>{
    Category.findById(req.params.id).then(category=>{
        if(!category)
            return res.status(500).send('No Category Found')
        res.status(200).json(category)
    })
})
categoryRouter.post('/', (req, res)=>{
    let category = Category({
        name: req.body.name,
        icon: req.body.icon,
        color: req.body.color
    })
    category.save().then(createdCategory=>{
        res.status(201).json(createdCategory)
    }).catch(e=>{
        req.status(500).json(e)
    })
})
categoryRouter.delete('/:id', (req, res)=>{
    Category.findByIdAndRemove(req.params.id).then(category=>{
        if(category)
            return res.status(200).send("Category has been deleted")
        res.status(200).send("No Category Found")
    }).catch(e=>{
        res.status(500).json(e)
    })
})

categoryRouter.put('/:id', async(req, res)=>{
    const category = await Category.findByIdAndUpdate(req.params.id, {
            name: req.body.name,
            icon: req.body.icon,
            color: req.body.color
    },{
        new:true
    })
    if(!category)
        return res.status(400).send("Category Not Found")
    res.status(200).json(category)
})

module.exports = categoryRouter