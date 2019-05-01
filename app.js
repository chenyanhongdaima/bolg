// 引入 express 并且创建一个 express 实例赋值给 app
const express = require('express')
const bodyParser = require('body-parser')
const { log } = require('./utils')

var fs = require("fs");
console.log('log', log)

const app = express()

// 配置静态文件目录
app.use(express.static('static'))

app.use(bodyParser.json())



const registerRoutes = (app, routes) => {
    for (let i = 0; i < routes.length; i++) {
        let route = routes[i]
        app[route.method](route.path, route.func)
    }
}


const routeIndex = require('./route/index')
registerRoutes(app, routeIndex.routes)


const routeBlog = require('./route/blog')
registerRoutes(app, routeBlog.routes)


const routeComment = require('./route/comment')
registerRoutes(app, routeComment.routes)

const main = () => {
    let server = app.listen(5000, () => {
        let host = server.address().address
        let port = server.address().port

        log(`应用实例，访问地址为 http://${host}:${port}`)
    })
}

if (require.main === module) {
    main()
}
