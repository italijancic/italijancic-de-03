import express from 'express'

import { ProductManager } from './productManager.js'

const PORT = 3000

const app = express()
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Class instace creation
const productManager = new ProductManager('./src/store/products.json')
// Load testing data
await productManager.loadTestData()

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
    limit = Number(limit)
    const products = await productManager.getProducts()

    if (limit && !isNaN(limit)) {
      res.status(200).json({
        success: true,
        limit: products.slice(0, limit)
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
    pid = Number(pid)

    if (pid && !isNaN(pid)) {
      const foundedProduct = await productManager.getproductById(pid)
      res.status(200).json({
        success: true,
        pid: foundedProduct
      })
    } else {
      res.status(401).json({
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

app.listen(3000, () => {
  console.log(`[index.js]: 🚀 Server running on por ${PORT}`)
})
