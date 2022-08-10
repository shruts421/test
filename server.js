const express = require('express')
const app =  express()
const db = require('./db')
const port = process.env.PORT || 3000
app.use(express.static('public'))
app.use('/images', express.static('images')); 

app.set('view engine','ejs')

app.use(express.json());
app.use(express.urlencoded({ extended: true }))

app.get('/', (req, res) => {
    res.redirect('/blogs')
})

app.get('/error', (req, res) => {
    res.render('error')
})

app.get('/blogs', (req, res) => {
    db.getAllBlogs().then((result) => {
        res.render('home', {
            blogs: result
        })
    }).catch(() => {
        res.redirect('/error')
    })

})

app.get('/add-blog', (req, res) => {
    res.render('addBlog')
})

app.get('/edit-blog/:id', (req, res) => {
    db.getBlogById(req.params.id).then((result) => {
        res.render('editBlog', {
            blog: result
        })
    }).catch(()=>{
        res.redirect('/error') 
    })
    
})

app.get('/blog/:id', (req, res) => {
    db.getBlogById(req.params.id).then((result) => {
        res.render('blogDetails', {
            blog: result
        })
    }).catch(()=>{
        res.redirect('/error')
    })
    
})

app.post('/delete-blog/:id', (req, res) => {
    db.deleteBlog(req.params.id).then(() => {
        res.redirect('/blogs')
    }).catch(() => {
        res.redirect('/error')
    })

})

app.post('/edit-blog/:id', (req, res) => {
    const blog = {title: req.body.title, content: req.body.content, category: req.body.category}
    db.editBlog(req.params.id, blog).then(() => {
        res.redirect('/blogs')
    }).catch(() => {
        res.redirect('/error')
    })

})

app.post('/add-blog', (req, res) => {
    db.addNewBlog(req.body.title, req.body.content, req.body.category).then(()=>{
        res.redirect('/blogs')
    }).catch(() => {
        res.redirect('/error')
    })
})


app.listen(port, () => {
    console.log(`Server is Listening on port: ${port}`)
})