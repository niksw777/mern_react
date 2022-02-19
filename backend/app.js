const express = require('express')
const app = express()
require('dotenv/config')
const morgan = require('morgan')
const mongoose = require('mongoose')


const api = process.env.API_URL

app.use(express.json()) // to parse json 
app.use(morgan('tiny'))


const productSchema = mongoose.Schema({
    name: String, 
    image: String, 
    countInStock: Number
}) // template of each item

// create model -> representation of collections
const Product = mongoose.model('Product', productSchema)

app.get(`${api}/products`, (req, res) => {
    const product = {
        id: 1,
        name: "NikeSh",
        img: "some_url", 
        price: 100
    }
    res.send(product) // to the frontend
})

app.post(`${api}/products`, (req, res) => {
   const newProduct = req.body // сейвим тело фронтенда 
   console.log(newProduct)
    res.send(newProduct) // to the frontend
})


mongoose.connect(process.env.CONNECT_DB, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    dbName: 'eshop-database'
}).then(() => {
    console.log('Db connection is OK')
}).catch((err) => {
    console.log(err) 
})


app.listen(3000, () => {
    console.log("server is running now")
})
