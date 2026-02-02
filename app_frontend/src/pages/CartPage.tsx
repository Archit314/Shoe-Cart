import { useEffect, useState } from "react";
import { Trash2, Plus, Minus } from "lucide-react";
import { useCartStore } from "../store/Cart/useCartStore";
import toast from "react-hot-toast";

function CartPage() {

  const {getCart} = useCartStore()
  const [items, setItems] = useState([]);

  useEffect(() => {
    const fetchCart = async () => {
      console.log(`Fetching user cart`);
      
      const gotResponse = await getCart();

      if (gotResponse.status !== 200) {
        toast.error(gotResponse.message);
      } else {
        setItems(gotResponse.data.items);
      }
    };

    fetchCart();
  }, []);

  // const increaseQty = (id: number) => {
  //   setItems((prev) =>
  //     prev.map((item) =>
  //       item.id === id ? { ...item, quantity: item.quantity + 1 } : item
  //     )
  //   );
  // };

  // const decreaseQty = (id: number) => {
  //   setItems((prev) =>
  //     prev.map((item) =>
  //       item.id === id && item.quantity > 1
  //         ? { ...item, quantity: item.quantity - 1 }
  //         : item
  //     )
  //   );
  // };

  // const removeFromCart = (id: number) => {
  //   setItems((prev) => prev.filter((item) => item.id !== id));
  // };

  const clearCart = () => {
    setItems([]);
  };

  const total = () =>
    items.reduce((sum, item: any) => sum + item.price * item.quantity, 0);

  return (
    <div className="min-h-screen text-white px-6 md:px-20 py-12 relative overflow-hidden">
      {/* Floating background circles like HomePage */}
      <div className="absolute w-[400px] h-[400px] bg-pink-400/20 rounded-full blur-3xl -top-40 -left-20 animate-pulse"></div>
      <div className="absolute w-[350px] h-[350px] bg-indigo-400/20 rounded-full blur-3xl -bottom-40 right-0 animate-pulse delay-2000"></div>

      <h1 className="text-4xl font-extrabold mb-10 relative z-10 drop-shadow-lg">
        Shopping Cart
      </h1>

      <div className="grid lg:grid-cols-3 gap-8 relative z-10">
        {/* Cart Items */}
        <div className="lg:col-span-2 space-y-6">
          {items.length > 0 ? (
            items.map((item: any) => (
              <div
                key={item.id}
                className="flex items-center justify-between bg-white/10 backdrop-blur-lg p-4 rounded-2xl shadow-lg hover:scale-[1.02] transition"
              >
                <div className="flex items-center gap-4">
                  <img
                    src={item.productVariant.media[0].url}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-xl shadow-md"
                  />
                  <div>
                    <h2 className="text-lg font-semibold">{item.name}</h2>
                    <p className="text-pink-300 font-medium">₹{item.price}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button
                    // onClick={() => decreaseQty(item.id)}
                    className="p-2 rounded-lg bg-white/10 hover:bg-white/20"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="font-bold">{item.quantity}</span>
                  <button
                    // onClick={() => increaseQty(item.id)}
                    className="p-2 rounded-lg bg-white/10 hover:bg-white/20"
                  >
                    <Plus size={16} />
                  </button>
                </div>

                <div className="flex items-center gap-4">
                  <p className="font-bold">₹{item.price * item.quantity}</p>
                  <button
                    // onClick={() => removeFromCart(item.id)}
                    className="p-2 text-red-400 hover:text-red-600"
                  >
                    <Trash2 size={20} />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p className="text-gray-300">Your cart is empty.</p>
          )}
        </div>

        {/* Summary */}
        <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Order Summary</h2>
          <div className="flex justify-between mb-2">
            <span>Subtotal</span>
            <span>₹{total()}</span>
          </div>
          <div className="flex justify-between mb-2">
            <span>Shipping</span>
            <span className="text-green-400">Free</span>
          </div>
          <hr className="my-3 border-white/20" />
          <div className="flex justify-between font-bold text-lg">
            <span>Total</span>
            <span>₹{total()}</span>
          </div>

          <button className="w-full mt-6 px-6 py-3 bg-gradient-to-r from-pink-500 to-yellow-400 hover:scale-105 rounded-xl font-bold shadow-lg transition-transform duration-300">
            Checkout
          </button>

          {items.length > 0 && (
            <button
              onClick={clearCart}
              className="w-full text-red-400 mt-4 hover:text-red-600"
            >
              Clear Cart
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default CartPage;
