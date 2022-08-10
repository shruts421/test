const mysql = require('mysql')

// const connection = mysql.createConnection(
//     {
//         host:'localhost',
//         user:'root',
//         password:'password',
//         database:'blogdb'
//     }
// )

// Configuration will be picked up from RM Variables or Vault
const connection = mysql.createConnection(
    {
        host:'blogsdb.czatqolo4czl.ap-south-1.rds.amazonaws.com',
        user:'root',
        password:'password',
        database:'blogsdb',
        port: '3306'
    }
)

connection.connect((err) => {
    if(!err) {
        console.log("Connected to database")
        connection.query('SELECT 1 FROM blogs', (err,result) => {
            if(err) {
                console.log("Creating Table")
                connection.query('CREATE TABLE blogs( id INT AUTO_INCREMENT PRIMARY KEY NOT NULL, title VARCHAR(60) NOT NULL,  category TEXT NOT NULL, content VARCHAR(100) NOT NULL ,  created TIMESTAMP DEFAULT CURRENT_TIMESTAMP)')

                console.log("Table is Created")
            }
            else {
                console.log("Table Already Exist")
            }
        })
    } else {
        console.log(err)
        console.log("Failed To Connect")
    }
})

const getAllBlogs = () => {
    return new Promise((resolve, reject) => {
        connection.query(`select * from blogs`, (err, rows) => {
            if(err){
                reject(err)
            }
            resolve(rows)
        })

    })
}

const getBlogById = (id) => {
    return new Promise((resolve, reject) => {
        connection.query(`select * from blogs where id = ${id}`, (err, rows) => {
            if(err){
                reject(err)
            }
            resolve(rows)
        })

    })
}

const addNewBlog = (title, content, category) => {
    return new Promise((resolve, reject) => {
        connection.query(`insert into blogs(title,category,content) values (?,?,?)`,
         [title, category, content],(err, rows) => {
            if(err){
                reject(err)
            }
            resolve(rows)
        })

    })
}

const editBlog = (id, blog) => {
    return new Promise((resolve, reject) => {
        connection.query(`update blogs set title = ?, category = ?, content = ? where id = ?`,
         [blog.title, blog.category, blog.content, id], (err, rows) => {
            if(err){
                reject(err)
            }
            resolve(rows)
        })

    })
}

const deleteBlog = (id) => {
    return new Promise((resolve, reject) => {
        connection.query(`delete from blogs where id = ${id}`, (err, rows) => {
            if(err){
                reject(err)
            }
            resolve(rows)
        })

    })
}

module.exports = {
    getAllBlogs,
    addNewBlog,
    editBlog,
    deleteBlog,
    getBlogById
}