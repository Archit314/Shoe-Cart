import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useBrandStore } from "../../store/Brand/useBrandStore";
import { useNavigate } from "react-router-dom";

function BrandListPage() {

    const {getBrands, brands} = useBrandStore()
    const [search, setSearch] = useState("");
    const navigate = useNavigate()

    useEffect(() => {
        // Only fetch if no data exists
        if (brands.length === 0) {
        (async () => {
            const gotResponse = await getBrands();

            if (gotResponse.status !== 200) {
            toast.error(gotResponse.message);
            }
        })();
        }
    }, []);

    const filteredBrands = brands.filter((brand: { name: string }) =>
        brand.name.toLowerCase().includes(search.toLowerCase())
    );

    return (
    <div className="min-h-screen px-6 md:px-20 py-12 text-white relative overflow-hidden">
      {/* Floating Background Circles */}
      <div className="absolute w-[500px] h-[500px] bg-pink-400/20 rounded-full blur-3xl -top-40 -left-20 animate-pulse"></div>
      <div className="absolute w-[400px] h-[400px] bg-indigo-400/20 rounded-full blur-3xl -bottom-40 right-0 animate-pulse delay-2000"></div>

      <div className="relative z-10">
        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-center gap-4 mb-10">
          <h1 className="text-3xl md:text-4xl font-extrabold">
            All <span className="text-pink-400">Brands</span>
          </h1>
          <input
            type="text"
            placeholder="Search brands..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="px-4 py-2 rounded-full bg-white/10 backdrop-blur-lg text-white placeholder-white/50 focus:outline-none border border-white/20 w-full sm:w-72"
          />
        </div>

        {/* brands Grid */}
        {filteredBrands.length === 0 ? (
          <p className="text-white/70 text-center mt-10">No brands found</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8">
            {filteredBrands.map(
              (brand: { id: string; media: { url: string }[]; name: string }) => (
                <div
                  key={brand.id}
                  onClick={() => navigate(`/shop/brand/${brand.id}`)}
                  className="bg-white/10 backdrop-blur-lg rounded-xl p-4 flex flex-col items-center hover:scale-105 hover:shadow-[0_0_25px_rgba(255,255,255,0.4)] transition-transform duration-300 cursor-pointer"
                >
                  <div className="w-24 h-24 mb-3 rounded-lg overflow-hidden bg-white/20 flex items-center justify-center">
                    <img
                      src={brand.media[0]?.url || "https://via.placeholder.com/150"}
                      alt={brand.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <p className="font-semibold text-center">{brand.name}</p>
                </div>
              )
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default BrandListPage
