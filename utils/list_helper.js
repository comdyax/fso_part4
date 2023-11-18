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

module.exports = { dummy, totalLikes }