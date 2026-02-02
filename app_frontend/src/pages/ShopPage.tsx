import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useProductStore } from "../store/Product/useProductStore";

function ShopPage() {
  const {categoryId, brandId} = useParams()
  const { products, getProducts, isGettingProducts } = useProductStore();
  const navigate = useNavigate();

  useEffect(() => {
    getProducts(1, 12, categoryId, brandId); // page 1, 12 products
  }, [categoryId]);

  return (
    <div className="min-h-screen px-6 md:px-20 py-12 text-white relative overflow-hidden">
      {/* Floating background circles */}
      <div className="absolute w-[500px] h-[500px] bg-pink-400/20 rounded-full blur-3xl -top-40 -left-20 animate-pulse"></div>
      <div className="absolute w-[400px] h-[400px] bg-indigo-400/20 rounded-full blur-3xl -bottom-40 right-0 animate-pulse delay-2000"></div>

      <div className="relative z-10">
        <h1 className="text-4xl font-extrabold mb-10">
          Our <span className="text-pink-400">Products</span>
        </h1>

        {isGettingProducts ? (
          <p className="text-center text-white/70">Loading products...</p>
        ) : products.length === 0 ? (
          <p className="text-center text-white/70">No products available</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-8">
            {products.map((product: any) => (
              <div
                key={product.id}
                onClick={() => navigate(`/product/${product.id}`)}
                className="bg-white/10 backdrop-blur-lg rounded-2xl p-4 shadow-lg hover:scale-105 transition-transform duration-300 cursor-pointer"
              >
                <div className="w-full h-48 mb-4 rounded-xl overflow-hidden bg-white/20 flex items-center justify-center">
                  <img
                    src={product.media?.[0]?.url || "https://via.placeholder.com/200"}
                    alt={product.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <h2 className="text-lg font-semibold">{product.name}</h2>
                <p className="text-pink-300 font-medium">
                  ₹{product.productVariants?.[0]?.price || "N/A"}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ShopPage;
