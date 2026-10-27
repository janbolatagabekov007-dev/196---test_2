import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Home from './pages/Home'
import Products from './pages/Products'

const App = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      <Header />

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/product" element={<Products />} />
          <Route path="/product-by-category/:id" element={<Products />} />
          <Route path="/products-by-category/:id" element={<Products />} />
        </Routes>
      </main>
    </div>
  )
}

export default App
