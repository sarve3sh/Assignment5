import { Link } from "react-router-dom";
import { useUser } from "@/context/UserContext";
import { IMAGE_BASE_URL } from "@/core/constants";
import { formatPrice } from "@/core/pricing";

export const CartView = () => {
  const { cart, removeFromCart, clearCart, cartTotal } = useUser();

  if (cart.length === 0) {
    return (
      <div className="flex min-h-[60vh] flex-col items-center justify-center gap-4 text-center">
        <div className="text-6xl">🛒</div>
        <h2 className="font-semibold text-2xl text-gray-300">Your cart is empty</h2>
        <Link className="rounded-lg bg-[#4a7c59] px-5 py-2 transition-colors hover:bg-[#3a6347]" to="/">
          Explore Content
        </Link>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-3xl px-4 py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="font-bold text-3xl">
          Your Cart{" "}
          <span className="font-normal text-gray-400 text-lg">
            ({cart.length} {cart.length === 1 ? "item" : "items"})
          </span>
        </h1>
        <button className="text-red-400 text-sm underline transition-colors hover:text-red-300" onClick={clearCart}>
          Clear all
        </button>
      </div>
      <div className="mb-8 space-y-3">
        {cart.map((item) => {
          const key = item.mediaType === "tv" ? `tv-${item.id}-s${item.seasonNumber ?? 0}` : `movie-${item.id}`;
          const linkTo = item.mediaType === "tv" ? `/tv/${item.id}/seasons/${item.seasonNumber}` : `/movies/${item.id}`;
          return (
            <div className="flex items-center gap-4 rounded-xl bg-gray-800 p-3" key={key}>
              <Link className="shrink-0" to={linkTo}>
                {item.posterPath ? (
                  <img alt={item.title} className="h-20 w-14 rounded-lg object-cover" src={`${IMAGE_BASE_URL}${item.posterPath}`} />
                ) : (
                  <div className="flex h-20 w-14 items-center justify-center rounded-lg bg-gray-700 px-1 text-center text-gray-400 text-xs">
                    No image
                  </div>
                )}
              </Link>
              <div className="min-w-0 flex-1">
                <Link className="line-clamp-1 font-semibold transition-colors hover:text-[#4a7c59]" to={linkTo}>
                  {item.title}
                </Link>
                {item.mediaType === "tv" && item.seasonName && <p className="text-gray-400 text-sm">{item.seasonName}</p>}
                <p className="text-gray-500 text-xs capitalize">{item.mediaType}</p>
              </div>
              <div className="flex shrink-0 flex-col items-end gap-2">
                <span className="font-bold text-[#4a7c59] text-lg">{formatPrice(item.price)}</span>
                <button
                  className="text-red-400 text-xs transition-colors hover:text-red-300"
                  onClick={() => removeFromCart(item.id, item.mediaType, item.seasonNumber)}
                >
                  Remove
                </button>
              </div>
            </div>
          );
        })}
      </div>
      <div className="rounded-xl bg-gray-800 p-5">
        <div className="mb-3 flex items-center justify-between text-gray-400">
          <span>Subtotal</span>
          <span className="font-medium text-white">{formatPrice(cartTotal)}</span>
        </div>
        <div className="mb-5 flex items-center justify-between font-bold text-lg">
          <span>Total</span>
          <span className="text-[#4a7c59]">{formatPrice(cartTotal)}</span>
        </div>
        <button
          className="w-full rounded-xl bg-[#4a7c59] py-3 font-semibold transition-all hover:bg-[#3a6347]"
          onClick={() => alert("Checkout not implemented — this is a demo!")}
        >
          Proceed to Checkout
        </button>
      </div>
    </div>
  );
};
