var http = require('http')
var fs = require('fs')
var template = require('art-template')
var url = require('url')
var sd = require('silly-datetime')
var updatetimes = sd.format(new Date(), 'YYYY-MM-DD');
var comments = [
  {
    name: 'jixianlxc@163.com',
    message: 'this is interesting',
    date: '2019-3-18'
  },
  {
    name: 'liuxinchuan@tomahawk33.com',
    message: 'emmm....',
    date: '2019-3-19'
  }
]

http
  .createServer(function(req, res){
    console.log('req:'+req.url)

    var parseObj = url.parse(req.url, true)

    var pathname = parseObj.pathname

    // var url = req.url

      if(pathname==='/index'){
        fs.readFile('./view/index.html',function (err, data) {
          if(err){
            return res.end('not found page1')
          }
          var htmlStr = template.render(data.toString(), {
            comments: comments
          })
          res.end(htmlStr)
        })
      }else if (pathname === '/postreview'){
        // res.end(JSON.stringify(parseObj.query))

        var comment = parseObj.query
        comment.date = updatetimes
        comments.push(comment)

        res.statusCode = 302
        res.setHeader('Location', '/index')
        res.end()
      }else if(pathname === '/post'){

        fs.readFile('./view/post.html',function (err, data) {
          if(err){
            return res.end('not found post.html')
          }
          res.end(data)
        })

      }else if(pathname.indexOf('/public' === 0)){

        fs.readFile('.' + pathname, function (err, data) {
          if(err){
            return res.end('not found page2')
          }
          res.end(data)        
        })

      }else{
        res.end('zzzzz')
      }
      console.log(comments)
  })
  .listen(5000, function () {
    console.log('server is running at 5000')
  })

