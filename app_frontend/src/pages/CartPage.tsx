import { useEffect, useState } from "react";
import { Trash2, Plus, Minus } from "lucide-react";
import { useCartStore } from "../store/Cart/useCartStore";
import toast from "react-hot-toast";

declare global {
  interface Window {
    Cashfree: any;
  }
}

function CartPage() {
  const {
    getCart,
    addToCart,
    updateCartItem,
    removeFromCart,
  } = useCartStore();

  const [items, setItems] = useState<any[]>([]);
  const [cartId, setCartId] = useState<number | null>(null);
  const [shippingAddress, setShippingAddress] = useState("");

  useEffect(() => {
    const fetchCart = async () => {
      const resp = await getCart();
      if (resp.status !== 200) {
        toast.error(resp.message);
        return;
      }

      setItems(resp.data.items);
      if (resp.data.cart_id) setCartId(resp.data.cart_id);
    };

    fetchCart();
  }, []);

  const increaseQty = async (item: any) => {
    const resp = await addToCart(item.productVariant.id, 1);
    if (resp.status !== 200) return toast.error(resp.message);

    const fresh = await getCart();
    if (fresh.status === 200) setItems(fresh.data.items);
  };

  const decreaseQty = async (item: any) => {
    if (item.quantity > 1) {
      const resp = await updateCartItem(
        item.productVariant.id,
        item.quantity - 1
      );
      if (resp.status !== 200) return toast.error(resp.message);
    } else {
      const resp = await removeFromCart(item.productVariant.id);
      if (resp.status !== 200) return toast.error(resp.message);
    }

    const fresh = await getCart();
    if (fresh.status === 200) setItems(fresh.data.items);
  };

  const removeItem = async (item: any) => {
    const resp = await removeFromCart(item.productVariant.id);
    if (resp.status !== 200) return toast.error(resp.message);

    const fresh = await getCart();
    if (fresh.status === 200) setItems(fresh.data.items);
  };

  const total = () =>
    items.reduce(
      (sum, item: any) => sum + item.price * item.quantity,
      0
    );

  // 🔥 CASHFREE CHECKOUT HANDLER
  const handleCheckout = async () => {
    if (!cartId) return toast.error("Cart ID missing");
    if (!shippingAddress)
      return toast.error("Please enter shipping address");

    const resp = await useCartStore
      .getState()
      .createOrder(cartId, shippingAddress, "cashfree");

    if (resp.status !== 200) {
      toast.error(resp.message);
      return;
    }

    const paymentSessionId =
      resp.data?.pg_response?.payment_session_id;

    if (!paymentSessionId) {
      toast.error("Payment session not received");
      return;
    }

    const cashfree = new window.Cashfree({
      mode: "sandbox", // 🔁 change to "production" in live
    });

    cashfree.checkout({
      paymentSessionId,
      redirectTarget: "_self",
    });
  };

  return (
    <div className="min-h-screen text-white px-6 md:px-20 py-12">
      <h1 className="text-4xl font-extrabold mb-10">
        Shopping Cart
      </h1>

      <div className="grid lg:grid-cols-3 gap-8">
        {/* CART ITEMS */}
        <div className="lg:col-span-2 space-y-6">
          {items.length ? (
            items.map((item: any) => (
              <div
                key={item.id}
                className="flex justify-between bg-white/10 p-4 rounded-xl"
              >
                <div className="flex gap-4">
                  <img
                    src={item.productVariant.media[0].url}
                    className="w-20 h-20 rounded-lg"
                  />
                  <div>
                    <h2 className="font-semibold">{item.name}</h2>
                    <p>₹{item.price}</p>
                  </div>
                </div>

                <div className="flex items-center gap-3">
                  <button onClick={() => decreaseQty(item)}>
                    <Minus size={16} />
                  </button>
                  <span>{item.quantity}</span>
                  <button onClick={() => increaseQty(item)}>
                    <Plus size={16} />
                  </button>
                </div>

                <div className="flex items-center gap-4">
                  <p>₹{item.price * item.quantity}</p>
                  <button onClick={() => removeItem(item)}>
                    <Trash2 size={18} />
                  </button>
                </div>
              </div>
            ))
          ) : (
            <p>Your cart is empty</p>
          )}
        </div>

        {/* SUMMARY */}
        <div className="bg-white/10 p-6 rounded-xl">
          <h2 className="text-xl mb-4">Order Summary</h2>

          <div className="flex justify-between">
            <span>Total</span>
            <span>₹{total()}</span>
          </div>

          <textarea
            placeholder="Shipping address"
            className="w-full mt-4 p-3 rounded text-black"
            value={shippingAddress}
            onChange={(e) => setShippingAddress(e.target.value)}
          />

          <button
            onClick={handleCheckout}
            className="w-full mt-4 py-3 bg-gradient-to-r from-pink-500 to-yellow-400 rounded-xl font-bold"
          >
            Checkout
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
