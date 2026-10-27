import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import dbData from "../../data/db.json";

function Products() {
  const { id } = useParams();
  const [data, setData] = useState(() => {
    const initialProducts = dbData.products || [];
    return id ? initialProducts.filter((p) => String(p.categoryId) === String(id)) : initialProducts;
  });

  useEffect(() => {
    fetch("http://localhost:3000/products")
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);
        return res.json();
      })
      .then((products) => {
        if (id) {
          const productsByCategory = products.filter((p) => String(p.categoryId) === String(id));
          setData(productsByCategory);
        } else {
          setData(products);
        }
      })
      .catch((err) => {
        console.warn("json-server is offline on port 3000, using local db.json data:", err);
        const localProducts = dbData.products || [];
        if (id) {
          const productsByCategory = localProducts.filter((p) => String(p.categoryId) === String(id));
          setData(productsByCategory);
        } else {
          setData(localProducts);
        }
      });
  }, [id]);

  const currentCategory = (dbData.categories || []).find((c) => String(c.id) === String(id));
  const categoryName = currentCategory ? (currentCategory.name || currentCategory.title) : `Category #${id}`;

  return (
    <div className="max-w-6xl mx-auto px-6 py-10">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
        <div>
          <h1 className="text-3xl font-extrabold text-gray-900 tracking-tight">
            {id ? `${categoryName} Products` : "All Products"}
          </h1>
          <p className="text-gray-500 mt-1">
            {id ? `Showing products in category "${categoryName}"` : "Showing all available products"}
          </p>
        </div>

        {id && (
          <Link
            to="/products"
            className="inline-flex items-center text-sm font-semibold text-blue-600 hover:text-blue-700 hover:underline"
          >
            ← View All Products
          </Link>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {data.map((p) => (
          <div
            key={p.id}
            className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition flex flex-col justify-between"
          >
            <div>
              <div className="flex items-start justify-between gap-2 mb-2">
                <h2 className="text-xl font-bold text-gray-900">{p.title}</h2>
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

      {data.length === 0 && !loading && (
        <div className="text-center py-16 bg-white rounded-2xl border border-gray-100 p-8">
          <p className="text-gray-500 text-lg">No products found</p>
          <p className="text-xs text-gray-400 mt-2">
            No products available in this category.
          </p>
        </div>
      )}
    </div>
  );
}

export default Products;