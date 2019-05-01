const ajax = function(request) {
    /*
    request 是一个 object，有如下属性
        method，请求的方法，string
        url，请求的路径，string
        data，请求发送的数据，如果是 GET 方法则没有这个值，string
        callback，响应回调，function
    */
    let r = new XMLHttpRequest()
    r.open(request.method, request.url, true)
    if (request.contentType !== undefined) {
        r.setRequestHeader('Content-Type', request.contentType)
    }
    r.onreadystatechange = () => {
        if (r.readyState === 4) {
            request.callback(r.response)
        }
    }
    if (request.method === 'GET') {
        r.send()
    } else {
        r.send(request.data)
    }
}

const mytemplateBlog = function (blog) {
    let id = blog.id
    let title = blog.title
    let author = blog.author
    let d = new Date(blog.created_time * 1000)
    let time = d.toLocaleString()
        let t1 = `
<a class="" href="/blog/${id}" title="">
                  <div>${title}---${author}<div/>
            </a>


`
    let t2 = `
        <a href="/blog/${id}">
        <div class="dt w-100 hover-border-main-color pointer pa3 border-color bl mv3">
            <div class="dtc v-mid w-20 black-50">
                <span class="f4 fw3 lh-copy">${time}</span>
            </div>
            <div class="dtc v-mid w-80 black-70">
                        <span class="f4 fw3 lh-copy">${title}
                            <span>
                            </span>
                        </span>
            </div>
        </div>
    </a>
    `
    return t2
}


const myinsertBlogAll = function (blogs) {
    let html = ''
    for (let i = 0; i < blogs.length; i++) {
        let b = blogs[i]
        console.log("#########",b)
        let t = mytemplateBlog(b)
        console.log("htmlhtml",t)
        html += t
    }
    console.log("最后的结果",html)
    // 把数据写入 .gua-blogs 中，直接用覆盖式写入
    let div = document.querySelector('#layout-cart')
    div.innerHTML = html
}

const myblogAll = function() {
    let request = {
        method: 'GET',
        url: '/api/blog/all',
        contentType: 'application/json',
        callback: function(response) {
            let m = JSON.parse(response)
            console.log("ggggggggggggggg",m)
            myinsertBlogAll(m)
        }
    }
    ajax(request)
}
const __main = function() {
    // 载入博客列表
    myblogAll()

}

__main()