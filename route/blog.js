const blog = require('../model/blog')

const all = {
    path: '/api/blog/all',
    method: 'get',
    func: (request, response) => {
        let blogs = blog.all()
        let r = JSON.stringify(blogs)
        response.send(r)
    }
}

const add = {
    path: '/api/blog/add',
    method: 'post',
    func: (request, response) => {
        let form = request.body
        let r

            let b = blog.new(form)
            r = JSON.stringify(b)
        response.send(r)
    }
}


const deleteBlog = {
    path: '/api/blog/delete',
    method: 'post',
    func: (request, response) => {
        // 浏览器发过来的数据我们一般称之为 form（表单）
        let form = request.body
        // 删除数据并返回结果
        let success = blog.delete(form.id)
        let result = {
            success: success,
        }
        let r = JSON.stringify(result)
        response.send(r)
    }
}

const detailBlog = {
    path: '/api/blog/:id',
    method: 'get',
    func: (request, response) => {
        let id = Number(request.params.id)
        let b = blog.get(id)
        let r = JSON.stringify(b)
        response.send(r)
    }
}

const routes = [
    all,
    add,
    deleteBlog,
    detailBlog,
]

module.exports.routes = routes
