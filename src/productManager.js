import fs from 'fs'

export class ProductManager {

  constructor(path) {
    this.products = []
    this.path = path
  }

  async addProduct(newProduct) {
    try {
      // Validate constructor data
      if (!this.#validateFields(newProduct))
        return

      // Read products from file
      await this.#readProducts()

      // Validate product code not repeat
      if (this.products.find((product) => product.code === newProduct.code)) {
        console.log('Product code already exist')
        return
      }

      const product = {
        id: this.#getMaxId() + 1,
        title: newProduct.title,
        description: newProduct.description,
        price: newProduct.price,
        thumbnail: newProduct.thumbnail,
        code: newProduct.code,
        stock: newProduct.stock
      }

      this.products.push(product)

      // Write on file
      await fs.promises.writeFile(this.path, JSON.stringify(this.products), 'utf-8')

    } catch (error) {
      throw new Error('Error adding new product')
    }

  }

  async getProducts() {
    try {
      await this.#readProducts()
      return this.products
    } catch (error) {
      throw new Error('Error reading products from file')
    }
  }

  async getproductById(productId) {
    try {
      await this.#readProducts()
      const foundedProduct = this.products.find((product) => product.id === productId)
      if (foundedProduct){
        return foundedProduct
      }
      else {
        throw new Error('Bad or missing product ID. Product not found')
      }
    } catch (error) {
      throw new Error(error.message)
    }
  }

  async updateProduct(productId, updatedProduct) {
    try {
      this.#readProducts
      // Find index of product
      const foundedIndex = this.products.findIndex((product) => product.id === productId)
      // If product id exist
      if (foundedIndex != undefined) {
        // Update data
        const updatedProducts = this.products.map((product, index) => {
          if (index === foundedIndex) {
            return updatedProduct
          } else {
            return product
          }
        })
        this.products = updatedProducts
        // Write on file
        await fs.promises.writeFile(this.path, JSON.stringify(this.products), 'utf-8')
      } else {
        console.log('Bad or missing porduct id')
      }

    } catch (error) {
      throw new Error('Error updating product')
    }
  }

  async deleteProduct(productId) {
    try {
      this.#readProducts
      this.products = this.products.filter((product) => product.id !== productId)
      // Write on file
      await fs.promises.writeFile(this.path, JSON.stringify(this.products), 'utf-8')
    } catch (error) {
      throw new Error('Error deleting product')
    }
  }

  #getMaxId() {
    let maxId = 0
    this.products.map((product) => {
      if (product.id > maxId) maxId = product.id
    })
    return maxId
  }

  async #readProducts() {
    try {
      if (fs.existsSync(this.path)) {
        const products = JSON.parse(await fs.promises.readFile(this.path, 'utf-8'))
        this.products = products
      } else {
        this.products = []
      }
    } catch (error) {
      throw new Error('Error reading products from file')
    }
  }

  #validateFields(newProduct) {

    const { title, description, price, thumbnail, code, stock } = newProduct

    if( !title || !isNaN(title)) {
      console.log('Bad or missing title. Must be a string')
      return false
    }

    if( !description || !isNaN(description)) {
      console.log('Bad or missing description. Must be a string')
      return false
    }

    if( !price || isNaN(price) || price < 0) {
      console.log(`Bad or missing price. Must be a number grather than zero. price = ${price}`)
      return false
    }

    if( !thumbnail || !isNaN(thumbnail)) {
      console.log('Bad or missing thumbnail. Must be a string')
      return false
    }

    if( !code || !isNaN(code)) {
      console.log('Bad or missing code. Must be a string')
      return false
    }

    if( !stock || isNaN(stock) || stock < 0) {
      console.log(`Bad or missing stock. Must be a number grather than zero. stock = ${stock}`)
      return false
    }

    return true

  }

}
// End class
