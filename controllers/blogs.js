const blogRouter = require('express').Router()
const Blog = require('../models/blog')
const User = require('../models/user')
require('express-async-errors')

blogRouter.get('/', async (request, response) => {
    const blogs = await Blog
        .find({})
        .populate('user', { username: 1, name: 1 })
    return response.json(blogs)
})

blogRouter.post('/', async (request, response) => {
    const body = request.body

    const user = await User.findOne()

    const blog = new Blog({
        title: body.title,
        author: body.author,
        url: body.url,
        likes: body.likes,
        user: user.id
    })
    const result = await blog.save()

    user.blogs = user.blogs.concat(result._id)
    await user.save()

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