const mongoose = require('mongoose')
const supertest = require('supertest')
const helper = require('./blog_test_helper')
const app = require('../app')

const api = supertest(app)
const Blog = require('../models/blog')

beforeEach(async () => {
    await Blog.deleteMany({})
    const blogList = helper.initialBlogs.map(blog => new Blog(blog))
    const promiseArray = blogList.map(blog => blog.save())
    await Promise.all(promiseArray)
})

test('all blogs are returned in correct json format', async () => {
    const response = await api
        .get('/api/blogs')
        .expect(200)
        .expect('Content-Type', /application\/json/)
    console.log(response.body)
    expect(response.body).toHaveLength(helper.initialBlogs.length)
})

test('field id exists', async () => {
    const response = await api.get('/api/blogs')
    expect(response.body[0].id).toBeDefined()
})

test('succesfull post request to db', async () => {
    const newBlog = {
        title: '2525253 test',
        author: 'some dude',
        url: 'some url',
        likes: 140
    }
    await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const blogs = await helper.blogsInDb()
    expect(blogs).toHaveLength(helper.initialBlogs.length + 1)
    expect(blogs.map(blog => blog.title)).toContain(newBlog.title)
    expect(blogs.map(blog => blog.author)).toContain(newBlog.author)
    expect(blogs.map(blog => blog.url)).toContain(newBlog.url)
})

test('default likes value', async () => {
    const newBlog = {
        title: '2525253 test',
        author: 'some dude',
        url: 'some url',
    }
    const response = await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(201)
        .expect('Content-Type', /application\/json/)

    const blogs = await helper.blogsInDb()
    const blog = blogs.find(blog => blog.id === response.body.id)
    expect(blog.likes).toBe(0)
    expect(response.body.likes).toBe(0)
})

test('error message when title field is missing', async () => {
    const newBlog = {
        author: 'some dude',
        url: 'some url',
    }
    const response = await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)

    expect(response.body.error).toEqual('Blog validation failed: title: Path `title` is required.')
})

test('error message when url field is missing', async () => {
    const newBlog = {
        title: '2525253 test',
        author: 'some dude',
    }
    const response = await api
        .post('/api/blogs')
        .send(newBlog)
        .expect(400)

    expect(response.body.error).toEqual('Blog validation failed: url: Path `url` is required.')
})




afterAll(async () => {
    await mongoose.connection.close()
})