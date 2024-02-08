// Test ID: IIDSAT

import { useFetcher, useLoaderData } from "react-router-dom";
import { getOrder } from "../../services/apiRestaurant";
import {
  calcMinutesLeft,
  formatCurrency,
  formatDate,
  transferToObject,
} from "../../utilities/helpers";
import OrderItem from "./OrderItem";
import { useDispatch } from "react-redux";
import { clearCart } from "../cart/cartSlice";
import { useEffect } from "react";
import UpdateOrder from "./UpdateOrder";

// GLXPZW

function Order() {
  /*Everyone can search for all orders,
  so for privacy reasons we're gonna
  exclude names or address, these are only for the restaurant staff*/
  const order = useLoaderData();
  const {
    id,
    status,
    priority,
    priorityPrice,
    orderPrice,
    estimatedDelivery,
    cart,
  } = order;
  const fetcher = useFetcher();
  const deliveryIn = calcMinutesLeft(estimatedDelivery);
  const dispatch = useDispatch();

  const fetcherData = transferToObject(fetcher.data);

  useEffect(() => {
    dispatch(clearCart());
  }, [dispatch]);

  useEffect(() => {
    if (!fetcher.data && fetcher.state === "idle") {
      fetcher.load("/menu");
    }
  }, [fetcher]);

  // console.log(fetcherData);

  return (
    <div className="space-y-8 px-4 py-6">
      <div className="flex flex-wrap items-center justify-between gap-5 sm:gap-2">
        <div>
          <h2 className="text-xl font-semibold">Order #{id} Status</h2>
          <span className="rounded-xl bg-red-100 px-2 py-1.5 text-xs font-bold !text-red-700">
            Save This Id To Check The Order
          </span>
        </div>

        <div className="space-x-2 ">
          {priority && (
            <span className="rounded-full bg-red-500 px-3 py-2 text-sm font-semibold uppercase tracking-wide text-red-50">
              Priority
            </span>
          )}
          <span className="rounded-full bg-green-500 px-3 py-2 text-sm font-semibold uppercase tracking-wide text-green-50">
            {status} order
          </span>
        </div>
      </div>

      <div className="flex flex-wrap items-center justify-between gap-2 bg-stone-200 px-5 py-6">
        <p className="font-medium ">
          {deliveryIn >= 0
            ? `Only ${calcMinutesLeft(estimatedDelivery)} minutes left 😃`
            : "Order should have arrived"}
        </p>
        <p className="text-xs text-stone-500">
          (Estimated delivery: {formatDate(estimatedDelivery)})
        </p>
      </div>

      <ul className="divide-y divide-stone-200 border-b border-t ">
        {cart.map((item) => (
          <OrderItem
            key={item.pizzaId}
            item={item}
            isLoadingIngredients={fetcher.state === "loading"}
            ingredients={
              typeof fetcherData === "object"
                ? fetcherData[item.pizzaId].ingredients
                : []
            }
          />
        ))}
      </ul>

      <div className="space-y-2 bg-stone-200 px-6 py-5">
        <p className="text-sm font-medium text-stone-600">
          Price pizza: {formatCurrency(orderPrice)}
        </p>
        {priority && (
          <p className="text-sm font-medium text-stone-600">
            Price priority: {formatCurrency(priorityPrice)}
          </p>
        )}
        <p className="text-sm font-bold text-stone-600">
          To pay on delivery: {formatCurrency(orderPrice + priorityPrice)}
        </p>
      </div>

      {!priority && <UpdateOrder order={order} />}
    </div>
  );
}

// eslint-disable-next-line
export async function loader({ params }) {
  const order = await getOrder(params.orderId);
  return order;
}

export default Order;
