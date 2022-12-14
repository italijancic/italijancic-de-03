import express from 'express'

import { ProductManager } from './productManager.js'

const PORT = 8080

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Class instace creation
const productManager = new ProductManager('./src/store/products.json')

// const newProduct = {
//   title: 'Test',
//   description: 'Test product',
//   price: 24,
//   thumbnail: './imgs',
//   code: 'T2T4I',
//   stock: 2024
// }

// await productManager.addProduct(newProduct)

// To test server runnning
app.get('/', (req, res) => {

  res.status(200).json({
    success: true,
    message: 'Hello from Express server'
  })
})

app.get('/products', async (req, res) => {

  try {
    let { limit } = req.query
    const products = await productManager.getProducts()

    if (!isNaN(limit)) {
      res.status(200).json({
        success: true,
        limit: products.slice(0, Number(limit))
      })
    } else if (limit && isNaN(limit)) {
      res.status(400).json({
        success: false,
        message: 'Limit is must be a number'
      })
    } else {
      res.status(200).json({
        success: true,
        procuts: products
      })
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }

})

app.get('/products/:pid', async (req, res) => {

  try {
    let { pid } = req.params

    if (!isNaN(pid)) {
      const foundedProduct = await productManager.getproductById(Number(pid))
      res.status(200).json({
        success: true,
        pid: foundedProduct
      })
    } else {
      res.status(400).json({
        success: false,
        message: 'Bad or missing product ID'
      })
    }

  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message
    })
  }

})

app.listen(PORT, () => {
  console.log(`[app.js]: 🚀 Server running on por ${PORT}`)
})
