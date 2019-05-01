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
const e = function(selector) {
    let element = document.querySelector(selector)
    if (element === null) {
        let s = `元素没找到，选择器 ${selector} 没有找到或者 js 没有放在 body 里`
        alert(s)
        // return null, 方便后续处理 e 函数的返回值
        return null
    } else {
        return element
    }
}
const appendHtml = (element, html) => element.insertAdjacentHTML('beforeend', html)
const bindEvent = (element, eventName, callback) => element.addEventListener(eventName, callback)
const templateGuaAlert = (title) => {
    let t = `
   <div class="modal-container">
        <div class="modal-mask"></div>
        <div class="modal-alert vertical-center">
                
                <form action="" method="post" class="basic-grey">
<h1>Contact Form
<span>Please fill all the texts in the fields.</span>
</h1>

<label>
<span>标题 :</span>
<input id="id-input-title" type="text" name="name"  />
</label>
<label>
<span>作者 :</span>
<input id="id-input-author" type="email" name="email"  />
</label>

<label>
<span>内容 :</span>
<textarea id="id-input-content" name="message" ></textarea>
</label>

<label>

<input type="button" class="button-ok" value="Send" />
<input type="button" class="button-cancel" value="Cancel" />
</label>
</form>
     </div>
    </div>
         `
    return t
}
const bindEventGuaAlert = (title) =>{
    let m = e('.h-footer .fa-camera-retro')
    m.addEventListener("click",function(){
        console.log("绑定事件了吗")
        let container = e('.modal-cell')
        let html = templateGuaAlert(title)
        appendHtml(container, html)
    })

}
const toggleClass = (element, className) => {
    let l = element.classList
    if (l.contains(className)) {
        l.remove(className)
    } else {
        l.add(className)
    }
}

const templateBlog = function(blog) {

    let id = blog.id
    let title = blog.title
    let author = blog.author
    let content = blog.content.slice(0, 80) + '......'
    let d = new Date(blog.created_time * 1000)
    let time = d.toLocaleString()
    let t = `
  
    <div class="post" id="post">
            <a class="post-cover" href="/blog/${id}" title="${title}">
                   <img src="/images/cover${id}.jpg" alt="">
            </a>
            <div class="post-text">
                <p class="post-time">
                    ${time}
                </p>
                <h3 class="post-title" id="post-title-index">
                    <a href="/blog/${id}" >
                        <i class="fa fa-paper-plane-o" aria-hidden="true"></i>
                    </a>
                    <a href="/blog/${id}">
                        ${title}
                    </a>
                </h3>
                <p class="post-content">
                        ${content}
                </p>
                <p class="post-meta">
                    <span class="">
                    <a href="/blog/${id}">
                        继续阅读
                        </a>
                        <i class="leancloud_visitors_count" id="leancloud_visitors_count"></i>
                    </span>
                    /
                       <span class="add-comment">
                   
                        评论
                  
                        <i class="leancloud_visitors_count" id="leancloud_visitors_count"></i>
                    </span>
                    
    
                    
                </p>
            </div>
            <div class="comment-container hide"  data-id="${id}">
						<input id="id-comment-input" type="text" name="comment">
						<button id="id-comment-button" class ="add-comment-button" type="button" name="button">添加评论</button>
					</div>
        </div>
  
   
                
        `
    return t
}



const insertBlogAll = function(blogs) {
    let html = ''
    for (let i = 0; i < blogs.length; i++) {
        let b = blogs[i]
        let t = templateBlog(b)
        html += t
    }
    // 把数据写入 .gua-blogs 中，直接用覆盖式写入
    let div = document.querySelector('#layout-cart')
    div.innerHTML = html
}

const blogAll = function() {
    let request = {
        method: 'GET',
        url: '/api/blog/all',
        contentType: 'application/json',
        callback: function(response) {
            let blogs = JSON.parse(response)
            insertBlogAll(blogs)
        }
    }
    ajax(request)
}


const blogNew = function(form) {
    let data = JSON.stringify(form)
    console.log(data)
    let request = {
        method: 'POST',
        url: '/api/blog/add',
        contentType: 'application/json',
        // es6 的 object 增强模式
        data,
        callback: function(response) {
            console.log('响应', response)
        }
    }
    ajax(request)
}

const bindEventBlogAdd = function() {
    // 绑定发表新博客事件
    let button = e('.button-ok')
    button.addEventListener('click', function(event) {
        // console.log('click new')
        // 得到用户填写的数据
        let form = {
            title: e('#id-input-title').value,
            author: e('#id-input-author').value,
            content: e('#id-input-content').value,
            mima: e('#id-input-mima').value,
        }
        // 用这个数据调用 blogNew 来创建一篇新博客
        blogNew(form)
    })


}

const bindEventNew = (callback) => {

    let cell = e('.modal-cell')
    cell.addEventListener('click', (event) => {
        let self = event.target
        let has = self.classList.contains.bind(self.classList)
        if (has('button-cancel')) {
            console.log('你点击了按钮 false')
            let modalCell = self.closest('.modal-container')
            modalCell.remove()
        }
        if(has('button-ok')) {
            console.log('你点击了按钮 true')
            let form = {
                title: e('#id-input-title').value,
                author: e('#id-input-author').value,
                content: e('#id-input-content').value,
            }
            callback(form)
            let modalCell = self.closest('.modal-container')
            modalCell.remove()
        }
        if(has('button-cancel')) {
            console.log('你点击了按钮 false')
            let modalCell = self.closest('.modal-container')
            modalCell.remove()
        }
    })
}






const toggleCommentInput = (container) => {
    bindEvent(container, 'click', (event) => {
        let target = event.target
        if (target.classList.contains('add-comment')) {
            let commentContainer = target.closest('.post').querySelector('.comment-container')
            toggleClass(commentContainer, 'hide')
        }
        if (target.id === 'id-comment-button') {
            let div = target.closest('.comment-container')
            let content = div.querySelector('#id-comment-input').value
            let id = Number(div.dataset.id)
            let d = {
                author: '',
                content: content,
                blog_id: id,
            }
            let d1 = JSON.stringify(d)
            let request = {
                method: 'POST',
                url: '/api/comment/add',
                data: d1,
                contentType: 'application/json',
                callback: (res) => {
                    let r = JSON.parse(res)
                    callback(r)
                }
            }
            ajax(request)
        }
    })

}

const bindEventComment = () => {
    let container = e('.gua-blogs')
    toggleCommentInput(container)
}

const bindEvents = () => {
    bindEventGuaAlert()
    bindEventNew(blogNew)
    bindEventComment()


}

const __main = function() {
    // 载入博客列表
    blogAll()

    // 绑定事件
    bindEvents()


}

__main()
