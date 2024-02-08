import { useDispatch } from "react-redux";
import Button from "../../ui/Button";
import {
  decreaseItemQuantity,
  decreasePizzaCount,
  decreaseTotalPrice,
  icreaseTotalPrice,
  increaseItemQuantity,
  increasePizzaCount,
} from "./cartSlice";

// eslint-disable-next-line
function UpdateQuantity({ quantity, pizzaId, unitPrice }) {
  const dispatch = useDispatch();

  // Increase Pizza Count
  function handleIncrease() {
    dispatch(increaseItemQuantity(pizzaId));
    dispatch(increasePizzaCount(1));
    dispatch(icreaseTotalPrice(unitPrice));
  }

  // Decrease Pizza Count
  function handleDecrease() {
    if (quantity > 1) {
      dispatch(decreaseItemQuantity(pizzaId));
      dispatch(decreasePizzaCount(1));
      dispatch(decreaseTotalPrice(unitPrice));
    }
  }
  return (
    <div className="flex items-center gap-2 md:gap-3">
      <Button type="round" onClick={() => handleDecrease()}>
        -
      </Button>
      <span className="text-sm font-medium">{quantity}</span>
      <Button type="round" onClick={() => handleIncrease()}>
        +
      </Button>
    </div>
  );
}

export default UpdateQuantity;
