import { defineStore } from 'pinia'
import { ref } from 'vue'

export interface IProduct {
  id: number
  title: string
  price: number
  description: string
  image: string
}

const api = 'https://fakestoreapi.com/products'

export const useProductStore = defineStore('product', () => {
  const products = ref<IProduct[]>([])
  const product = ref<IProduct>()
  const categories = ref<string[]>([])
  const loading = ref(false)

  async function fetchProducts() {
    loading.value = true
    const res = await fetch(api)
    const json = await res.json()
    return json as IProduct[]
  }

  async function getProducts() {
    const data = await fetchProducts()
    products.value = data
    loading.value = false
  }

  async function fetchProduct(productId: string | string[]) {
    loading.value = true
    const res = await fetch(`${api}/${productId}`)
    const json = await res.json()
    return json as IProduct
  }

  async function getCategories() {
    const res = await fetch('https://fakestoreapi.com/products/categories')
    const data = await res.json()
    categories.value = data
  }

  async function fetchProductsByCategory(categoryName: string | null) {
    loading.value = true
    const res = await fetch(`${api}/category/${categoryName}`)
    const json = await res.json()
    return json as IProduct[]
  }

  return {
    products,
    product,
    loading,
    getProducts,
    fetchProduct,
    fetchProductsByCategory,
    getCategories,
    categories
  }
})
