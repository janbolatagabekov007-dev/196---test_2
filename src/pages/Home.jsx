import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import dbData from '../../data/db.json'

const Home = () => {
  const [categories, setCategories] = useState(() => dbData.categories || [])
  const [products, setProducts] = useState(() => dbData.products || [])

  useEffect(() => {
    fetch('http://localhost:3000/categories')
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)
        return res.json()
      })
      .then((catList) => setCategories(catList))
      .catch((err) => {
        console.warn('json-server is offline on port 3000, using local categories:', err)
        setCategories(dbData.categories || [])
      })

    fetch('http://localhost:3000/products')
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`)
        return res.json()
      })
      .then((prodList) => setProducts(prodList))
      .catch((err) => {
        console.warn('json-server is offline on port 3000, using local products:', err)
        setProducts(dbData.products || [])
      })
  }, [])

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <div className="mb-8">
        <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">Categories</h1>
        <p className="text-gray-500 mt-2">Select a category to explore our products</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {categories.map((c) => (
          <div
            key={c.id}
            className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition flex flex-col justify-between"
          >
            <div>
              <span className="inline-block px-2.5 py-1 text-xs font-semibold text-blue-700 bg-blue-50 rounded-full mb-3">
                ID: {c.id}
              </span>
              <h2 className="text-xl font-bold text-gray-800 mb-2">
                {c.title || c.name}
              </h2>
            </div>

            <div className="mt-6 pt-4 border-t border-gray-50">
              <Link
                to={`/product-by-category/${c.id}`}
                className="inline-flex items-center justify-between w-full font-medium text-blue-600 hover:text-blue-700 group"
              >
                <span>{c.name || c.title}</span>
                <span className="transform group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>
          </div>
        ))}
      </div>

      {categories.length === 0 && (
        <div className="text-center py-16 bg-white rounded-2xl border border-gray-100 p-8">
          <p className="text-gray-500 text-lg">No categories found</p>
        </div>
      )}

      {/* Featured Products preview on Home */}
      <div className="mt-16">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-900 tracking-tight">Featured Products</h2>
            <p className="text-gray-500 mt-1">Browse our top selection</p>
          </div>
          <Link
            to="/products"
            className="text-sm font-semibold text-blue-600 hover:text-blue-700 hover:underline"
          >
            View All Products →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {products.slice(0, 6).map((p) => (
            <div
              key={p.id}
              className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2 mb-2">
                  <h3 className="text-xl font-bold text-gray-900">{p.title}</h3>
                  <span className="text-xs font-semibold px-2 py-0.5 bg-gray-100 text-gray-600 rounded">
                    #{p.id}
                  </span>
                </div>
                <p className="text-gray-500 text-sm leading-relaxed mb-6">{p.desc}</p>
              </div>

              <div className="flex items-center justify-between pt-4 border-t border-gray-50 mt-auto">
                <span className="text-2xl font-black text-blue-600">${p.price}</span>
                <button
                  type="button"
                  className="px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-xl hover:bg-blue-700 active:scale-95 transition"
                >
                  Add to Cart
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default Home