let result = `/*面试官你好，
现在我用代码来接扫下自己
首先准备一些样式*/

*{
    transition:all 1s;
    padding:0;
    margin:0;
}
html{
    background:rgb(222,222,222);
    font-size:16px;
}
#code{
    border:1px solid red;
    padding:16px;
}

/*我需要一个代码高亮*/
.token.selector {
    color:#690;
}
.token.property{
    color:#905;
}
.token.function {
    color:#DD4A68;
}

/*我来介绍一下自己*/
/*我需要一张白纸*/
#code{
    position:fixed;
    left:0;
    width:50%;
    height:100%
}
#paper{
    position:fixed;
    right:0;
    width:50%;
    height:100%;
    background:#ddd;
    display:flex;
    justify-content:center;
    align-items:center;
    padding:16px;
}
#paper>.content{
    background:white;
    height:100%;
    width:100%;
}
`
let result2 = `
/*接着我们把Markdown变成HTML*/

/*接着我们来加点样式*/

/*这就是的会动的简历*/
    `
let md = `# 自我介绍
我叫方欣芮
1994年8月出生
自学前端半余载
希望应聘前端开发岗位

# 技能介绍

熟悉 JavaScript css vue.js jquery等
# 项目介绍
1. xxxxx
2. xxxxx
3. xxxxx
# 联系方式
qq:xxxxx
wechat:sssrrr
手机:xxxxxxx
Email:xxxxxx
`
writeCode('', result, () => {
    creatPaper(() => {
        writeCode(result, result2, () => { 
            writeMarkdown(md)
        })
    })
})

function writeMarkdown(markdown, fn) {
    let domPaper = document.querySelector('#paper>.content')
    let n = 0
    let id = setInterval(() => {
        n = n + 1
        domPaper.innerHTML = markdown.substring(0, n)
        domPaper.scrollTop = domPaper.scrollHeight //可以拉到的最底部
        if (n > markdown.length) {
            window.clearInterval(id)
            fn.call()
        }
    }, 0)
}

function creatPaper(fn) {
    let paper = document.createElement('div')
    let content = document.createElement('pre')
    content.className = 'content'
    paper.id = 'paper'
    paper.appendChild(content)
    document.body.appendChild(paper)
    fn()
}

function writeCode(prefix, nowcode, fn) {
    let domCode = document.querySelector('#code')
    document.innerHTML = prefix || ''
    let n = 0
    let id = setInterval(() => {
        n = n + 1
        domCode.innerHTML = Prism.highlight(
            prefix + nowcode.substring(0, n),
            Prism.languages.css
        ) //Prism库
        domCode.scrollTop = domCode.scrollHeight //可以拉到的最底部
        styleTag.innerHTML = prefix + nowcode.substring(0, n)
        if (n > nowcode.length) {
            window.clearInterval(id)
            fn()
        }
    }, 0)
}
