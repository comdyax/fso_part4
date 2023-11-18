const dummy = (blogs) => {
    const result = blogs
    const number = 1
    return number === 1 ? 1 : result.length
}

const totalLikes = (blogs) => {
    return blogs.length === 0
        ? 0
        : blogs.map(blog => blog.likes).reduce((accu, value) => accu + value, 0)
}

const favoriteBlog = (blogs) => {
    if(blogs.length === 0)
        return {}
    let highestLikes = 0;
    blogs.forEach(blog => {
        if (blog.likes > highestLikes)
            highestLikes = blog.likes
    })
    return blogs.map(blog => { 
        return { 
            title: blog.title, 
            author: blog.author, 
            likes: blog.likes 
        } 
    })
    .find(blog => blog.likes === highestLikes)
}

module.exports = { dummy, totalLikes, favoriteBlog }