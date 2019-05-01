const fs = require('fs')
const comment = require('../model/comment')

const sendHtml = (path, response) => {
    let options = {
        encoding: 'utf-8'
    }
    path = 'template/' + path
    fs.readFile(path, options, (error, data) => {
        // console.log(`读取的html文件 ${path} 内容是`, data)
        response.send(data)
    })
}

const index = {
    path: '/',
    method: 'get',
    func: (request, response) => {
        let path = 'blog_index.html'
        sendHtml(path, response)
    }
}

const detailBlog = {
    path: '/blog/:id',
    method: 'get',
    func: (request, response) => {
        let id = request.params.id
        let path = 'blog_detail.html'
        // sendHtml(path, response)
        let options = {
            encoding: 'utf-8'
        }
        path = 'template/' + path
        fs.readFile(path, options, (error, data) => {
            console.log(`读取的html文件 ${path} 内容是`, data)
            data = data.replace('{{id}}', id)
            response.send(data)
        })
    }
}

const blog_allBlog = {
    path: '/allBlog',
    method: 'get',
    func: (request, response) => {
        let path = 'blog_allBlog.html'
        sendHtml(path, response)
    }
}

const routes = [
    index,
    detailBlog,
    blog_allBlog
]

module.exports.routes = routes
