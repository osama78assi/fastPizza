import { useDispatch } from "react-redux";
import Button from "../../ui/Button";
import { formatCurrency } from "../../utilities/helpers";
import {
  decreasePizzaCount,
  decreaseTotalPrice,
  deleteItem,
} from "./cartSlice";
import UpdateQuantity from "./UpdateQuantity";
/* eslint-disable */
function CartItem({ item }) {
  const { pizzaId, name, quantity, unitPrice, totalPrice } = item;
  const dispatch = useDispatch();

  // Remove Pizza
  function handelRemoveFromChart() {
    dispatch(deleteItem(pizzaId));
    dispatch(decreasePizzaCount(quantity));
    dispatch(decreaseTotalPrice(quantity * unitPrice));
  }

  return (
    <li className="py-3 sm:flex sm:items-center sm:justify-between">
      <p className="mb-1 sm:mb-0">
        {quantity}&times; {name}
      </p>
      <div className="flex items-center justify-between sm:gap-6">
        <p className="text-sm font-bold">{formatCurrency(totalPrice)}</p>
        <UpdateQuantity
          quantity={quantity}
          pizzaId={pizzaId}
          unitPrice={unitPrice}
        />
        <Button type="small" onClick={() => handelRemoveFromChart()}>
          Delete
        </Button>
      </div>
    </li>
  );
}

export default CartItem;
