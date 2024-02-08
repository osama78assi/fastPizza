import { useDispatch, useSelector } from "react-redux";
import Button from "../../ui/Button";
import { formatCurrency } from "../../utilities/helpers";
import {
  addItem,
  deleteItem,
  decreasePizzaCount,
  decreaseTotalPrice,
  icreaseTotalPrice,
  increasePizzaCount,
} from "../cart/cartSlice";
import UpdateQuantity from "../cart/UpdateQuantity";

/* eslint-disable */
function MenuItem({ pizza }) {
  const { id, name, unitPrice, ingredients, soldOut, imageUrl } = pizza;
  const dispatch = useDispatch();
  // This Line Is More Than Enough To Know If The Pizza Is In The Cart & Its Quantity
  const quantity = useSelector((state) => state.cart.cart[pizza.id]?.quantity);

  function handelAddToCart() {
    const newItem = {
      pizzaId: id,
      name,
      quantity: 1,
      unitPrice,
      totalPrice: unitPrice * 1,
    };

    dispatch(addItem(newItem));
    dispatch(increasePizzaCount(1));
    dispatch(icreaseTotalPrice(unitPrice));
  }

  function handelRemoveFromChart() {
    dispatch(deleteItem(id));
    dispatch(decreasePizzaCount(quantity));
    dispatch(decreaseTotalPrice(quantity * unitPrice));
  }

  return (
    <li className="flex gap-4 py-2">
      <img
        src={imageUrl}
        alt={name}
        className={`h-24 ${soldOut ? "opacity-70 grayscale" : ""}`}
      />
      <div className="flex grow flex-col">
        <p className="font-medium">{name}</p>
        <p className="text-sm capitalize italic text-stone-500">
          {ingredients.join(", ")}
        </p>
        <div className="mt-auto flex items-center justify-between pt-0.5">
          {!soldOut ? (
            <p className="text-sm">{formatCurrency(unitPrice)}</p>
          ) : (
            <p className="text-sm font-medium uppercase text-stone-500">
              Sold out
            </p>
          )}

          {!soldOut &&
            (quantity !== undefined ? (
              <div className="flex items-center pl-1 gap-2 sm:gap-8 sm:pl-0">
                <UpdateQuantity
                  quantity={quantity}
                  pizzaId={id}
                  unitPrice={unitPrice}
                />
                <Button type="small" onClick={handelRemoveFromChart}>
                  Remove
                </Button>
              </div>
            ) : (
              <Button type="small" onClick={handelAddToCart}>
                Add To Cart
              </Button>
            ))}
        </div>
      </div>
    </li>
  );
}

export default MenuItem;
