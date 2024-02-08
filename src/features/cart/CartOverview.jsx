import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { formatCurrency } from "../../utilities/helpers";

function CartOverview() {
  const totalPizzas = useSelector((state) => state.cart.totalPizzas);
  const totalPrice = useSelector((state) => state.cart.totalPrice);
  const showDetails = totalPizzas !== 0;

  return (
    <div className={`bg-stone-800 text-stone-200 transition-all`}>
      <div
        className={` flex items-center justify-between px-4 py-4 text-sm uppercase transition-[opacity] sm:px-6 md:text-base ${showDetails ? "opacity-100" : "opacity-0 pointer-events-none"}`}
      >
        <p className="space-x-4 font-semibold text-stone-300 sm:space-x-6">
          <span>{totalPizzas} pizzas</span>
          <span>{formatCurrency(totalPrice)}</span>
        </p>
        <Link to={"/cart"}>Open cart &rarr;</Link>
      </div>
    </div>
  );
}

export default CartOverview;
