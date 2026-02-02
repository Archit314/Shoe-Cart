import { useParams, useNavigate } from "react-router-dom"
import { useState, useEffect } from "react"
import { useProductStore } from "../store/Product/useProductStore"
import { useCartStore } from "../store/Cart/useCartStore"

type Variant = {
  id?: number
  color: string
  size: string
  price: string
  media: { url: string }[]
}

function ProductDetailPage () {
    const { getProductVariants } = useProductStore()
    const { id } = useParams()
    const navigate = useNavigate()

    const [variants, setVariants] = useState<Variant[]>([])
    const [selectedVariant, setSelectedVariant] = useState<Variant | null>(null)
    const [selectedImage, setSelectedImage] = useState<string>("")

    // Fetch Product Variants
    useEffect(() => {
        const fetchData = async () => {
            if (!id) return
            const res = await getProductVariants(id)
            if (res && res.status === 200 && res.data.length > 0) {
                setVariants(res.data)
                // Default select first variant
                setSelectedVariant(res.data[0])
                setSelectedImage(res.data[0].media[0]?.url || "")
            }
        }
        fetchData()
    }, [id, getProductVariants])

    const { addToCart } = useCartStore()

    const handleAddToCart = async () => {
        if (!selectedVariant) {
        alert("⚠️ Please select size and color")
        return
        }

        if (!selectedVariant.id) {
            alert("⚠️ Variant id missing")
            return
        }

        const res = await addToCart(selectedVariant.id, 1)
        if (res && res.status === 200) {
            alert(`✅ Added to cart: ${selectedVariant.color}, Size ${selectedVariant.size}`)
            navigate("/cart")
        } else {
            alert(`⚠️ ${res?.message || 'Failed to add to cart'}`)
        }
    }

    return (
        <div className="min-h-screen px-6 md:px-20 py-12 text-white relative overflow-hidden">
            {/* Floating Background Circles */}
            <div className="absolute w-[500px] h-[500px] bg-pink-400/20 rounded-full blur-3xl -top-40 -left-20 animate-pulse"></div>
            <div className="absolute w-[400px] h-[400px] bg-indigo-400/20 rounded-full blur-3xl -bottom-40 right-0 animate-pulse delay-2000"></div>

            <div className="relative z-10 grid grid-cols-1 md:grid-cols-2 gap-12 bg-white/10 backdrop-blur-lg rounded-2xl p-8 shadow-xl">
                {/* Left: Image Gallery */}
                <div>
                <div className="w-full h-[400px] rounded-2xl overflow-hidden shadow-lg bg-white/20 flex items-center justify-center">
                    {selectedImage ? (
                    <img
                        src={selectedImage}
                        alt="product"
                        className="w-full h-full object-cover"
                    />
                    ) : (
                    <p className="text-gray-300">Loading...</p>
                    )}
                </div>

                {/* Thumbnail images */}
                <div className="flex gap-3 mt-4 justify-center">
                    {variants.map((variant, idx) => (
                    <img
                        key={idx}
                        src={variant.media[0]?.url}
                        alt="thumb"
                        onClick={() => {
                        setSelectedImage(variant.media[0]?.url)
                        setSelectedVariant(variant)
                        }}
                        className={`w-24 h-24 rounded-xl object-cover cursor-pointer border-2 transition ${
                        selectedImage === variant.media[0]?.url
                            ? "border-pink-400 shadow-lg"
                            : "border-white/30 hover:border-pink-300"
                        }`}
                    />
                    ))}
                </div>
                </div>

                {/* Right: Details */}
                <div className="flex flex-col justify-between">
                <div>
                    <h1 className="text-4xl font-extrabold mb-4">Product</h1>
                    <p className="text-white/80 leading-relaxed mb-6">
                    Stylish shoes with premium quality and comfort.
                    </p>
                    <p className="text-3xl font-bold text-pink-300 mb-8">
                    ₹{selectedVariant?.price}
                    </p>

                    {/* Variants */}
                    <div>
                    <h2 className="text-xl font-semibold mb-3">Choose Variant</h2>
                    <div className="grid grid-cols-2 gap-3">
                        {variants.map((variant, idx) => (
                        <button
                            key={idx}
                            onClick={() => {
                            setSelectedVariant(variant)
                            setSelectedImage(variant.media[0]?.url)
                            }}
                            className={`px-4 py-3 rounded-xl font-medium border backdrop-blur-md transition text-sm ${
                            selectedVariant?.color === variant.color &&
                            selectedVariant?.size === variant.size
                                ? "bg-pink-500/20 border-pink-400 text-white shadow-lg"
                                : "bg-white/10 border-white/30 hover:border-pink-300"
                            }`}
                        >
                            {variant.color} • Size {variant.size}
                        </button>
                        ))}
                    </div>
                    </div>
                </div>

                {/* Add to Cart */}
                <button
                    onClick={handleAddToCart}
                    className="mt-10 w-full px-6 py-4 bg-gradient-to-r from-pink-500 to-yellow-400 rounded-full font-bold shadow-lg hover:scale-105 transition-transform duration-300"
                >
                    Add to Cart
                </button>
                </div>
            </div>
        </div>
    )
}

export default ProductDetailPage
