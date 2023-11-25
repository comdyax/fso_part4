const blogRouter = require('express').Router()
const Blog = require('../models/blog')
require('express-async-errors')

blogRouter.get('/', async (request, response) => {
    const blogs = await Blog.find({})
    return response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
    const blog = new Blog(request.body)
    const result = await blog.save()
    return response.status(201).json(result)
})

blogRouter.delete('/:id', async (request, response) => {
    await Blog.findByIdAndDelete(request.params.id)
    return response.status(204).end()
})

blogRouter.put('/:id', async (request, response) => {
    const updateBlog = {
        title: request.body.title,
        author: request.body.author,
        url: request.body.url,
        likes: request.body.likes
    }
    const updatedBlog = await Blog.findByIdAndUpdate(request.params.id, updateBlog, { new: true })
    return response.json(updatedBlog)
})

module.exports = blogRouter