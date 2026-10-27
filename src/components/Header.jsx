
import { Link } from 'react-router-dom'

const Header = () => {
  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-100 shadow-sm">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-6 py-4">
        <Link to="/" className="text-2xl font-bold text-blue-600 tracking-tight hover:opacity-90 transition">
          MyShop
        </Link>

        <nav className="flex items-center gap-6 font-medium text-gray-600 text-sm sm:text-base">
          <Link to="/" className="transition hover:text-blue-600 py-1">
            Home
          </Link>

          <Link to="/products" className="transition hover:text-blue-600 py-1">
            Products
          </Link>
        </nav>
      </div>
    </header>
  )
}

export default Header
