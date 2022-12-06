import fs from 'fs'

export class ProductManager {

  constructor(path) {
    this.products = []
    this.path = path
  }

  async addProduct(title, description, price, thumbnail, code, stock) {
    try {
      // Validate constructor data
      if (!this.#validateFields(title, description, price, thumbnail, code, stock))
        return

      // Read products from file
      await this.#readProducts()

      // Validate product code not repeat
      if (this.products.find((product) => product.code === code)) {
        console.log('Product code already exist')
        return
      }

      const product = {
        id: this.#getMaxId() + 1,
        title,
        description,
        price,
        thumbnail,
        code,
        stock
      }

      this.products.push(product)

      // Write on file
      await fs.promises.writeFile(this.path, JSON.stringify(this.products), 'utf-8')

    } catch (error) {
      throw new Error('Error adding new product')
    }

  }

  async loadTestData() {
    try {
      if (!fs.existsSync(this.path)) {
        await this.addProduct('Producto 1', 'Este es un producto de prueba', 100, 'Sin imagen', 'A1A1A1', 25)
        await this.addProduct('Producto 2', 'Este es un producto de prueba', 200, 'Sin imagen', 'B2B2B2', 35)
        await this.addProduct('Producto 3', 'Este es un producto de prueba', 300, 'Sin imagen', 'C3C3C3', 45)
        await this.addProduct('Producto 4', 'Este es un producto de prueba', 400, 'Sin imagen', 'D4D4D4', 29)
        await this.addProduct('Producto 5', 'Este es un producto de prueba', 500, 'Sin imagen', 'E5E5E5', 67)
        await this.addProduct('Producto 6', 'Este es un producto de prueba', 600, 'Sin imagen', 'F6F6F6', 35)
        await this.addProduct('Producto 7', 'Este es un producto de prueba', 700, 'Sin imagen', 'G6F7G7', 95)
        await this.addProduct('Producto 8', 'Este es un producto de prueba', 800, 'Sin imagen', 'H6F8H8', 35)
        await this.addProduct('Producto 9', 'Este es un producto de prueba', 900, 'Sin imagen', 'I6F9F9', 38)
        await this.addProduct('Producto 10', 'Este es un producto de prueba', 1000, 'Sin imagen', 'J6J1J1', 33)
      }
    } catch (error) {
      throw new Error('Error loading test data')
    }
  }

  // If file does not exist: crerate file and add some products
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
        console.log('Not found')
      }
    } catch (error) {
      throw new Error('Error getting product by ID')
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
    this.products.map((event) => {
      if (event.id > maxId) maxId = event.id
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

  #validateFields(title, description, price, thumbnail, code, stock) {

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
