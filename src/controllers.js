
export const getProducts = async (req, res, productManager) => {
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
}

export const getproductById = async (req, res, productManager) => {
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
}