import { Form, redirect, useActionData, useNavigation } from "react-router-dom";
import { createOrder } from "../../services/apiRestaurant";
import Button from "../../ui/Button";
import { useDispatch, useSelector } from "react-redux";
import EmptyCart from "../cart/EmptyCart";
import { formatCurrency } from "../../utilities/helpers";
import { useState } from "react";
import { fetchAddress } from "../user/userSlice";

// https://uibakery.io/regex-library/phone-number
const isValidPhone = (str) =>
  /^\+?\d{1,4}?[-.\s]?\(?\d{1,3}?\)?[-.\s]?\d{1,4}[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/.test(
    str,
  );

function CreateOrder() {
  const [withPriority, setWithPriority] = useState();
  const {
    username,
    status: addressStatus,
    position,
    address,
    error: errorAdreess,
  } = useSelector((state) => state.user);
  const cart = Object.values(useSelector((state) => state.cart.cart));
  const totalCartPrice = useSelector((state) => state.cart.totalPrice);
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const isLoading = navigation.state === "submitting";
  const priorityPrice = withPriority ? totalCartPrice * 0.2 : 0;
  const totalPrice = totalCartPrice + priorityPrice;
  // Used This As Error Container
  const formData = useActionData();

  if (!cart.length) return <EmptyCart />;

  return (
    <div className="px-4 py-8">
      <h2 className="mb-8 text-xl font-semibold">
        Ready to order? Let&apos;s go!
      </h2>

      <Form method="POST">
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="pl-2 sm:basis-40 sm:pl-0">First Name</label>
          <input
            className="input grow"
            type="text"
            name="customer"
            defaultValue={username}
            required
          />
        </div>

        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="pl-2 sm:basis-40 sm:pl-0">Phone number</label>
          <div className="grow">
            <input className="input w-full" type="tel" name="phone" required />
            {formData?.phone && (
              <p className="mt-2 rounded-md bg-red-100 p-2 text-xs text-red-700">
                {formData.phone}
              </p>
            )}
          </div>
        </div>

        <div className="relative mb-5 flex flex-col gap-2 sm:flex-row sm:items-center">
          <label className="pl-2 sm:basis-40 sm:pl-0">Address</label>
          <div className="flex grow flex-wrap items-center gap-y-3 sm:gap-y-0">
            <input
              className="input basis-[100%] sm:basis-[80%] sm:rounded-r-none"
              type="text"
              name="address"
              disabled={addressStatus === "loading"}
              defaultValue={address}
              required
            />
            <Button
              type="group"
              additionClass="py-2.5 md:py-3.5 px-0.5 basis-[100%] sm:basis-[20%] sm:rounded-l-none"
              onClick={() => {
                dispatch(fetchAddress());
              }}
              disabled={
                addressStatus === "loading" ||
                (position.latitude && position.longitude)
              }
            >
              Get Address
            </Button>
            {addressStatus === "error" && (
              <p className="mt-2 w-full break-words rounded-md bg-red-100 p-2 text-xs text-red-700">
                {errorAdreess}
              </p>
            )}
          </div>
        </div>

        <div className="mb-12 flex items-center gap-5">
          <input
            className="h-6 w-6 accent-yellow-400 focus:outline-none focus:ring focus:ring-yellow-400 focus:ring-offset-2"
            type="checkbox"
            name="priority"
            id="priority"
            value={withPriority}
            onChange={(e) => setWithPriority(e.target.checked)}
          />
          <label htmlFor="priority" className="font-medium">
            Want to yo give your order priority?
          </label>
        </div>

        <div>
          <input type="hidden" name="cart" value={JSON.stringify(cart)} />
          <input
            type="hidden"
            name="poition"
            value={
              position.latitude
                ? `${position.latitude},${position.longitude}`
                : ""
            }
          />
          <Button
            type="primary"
            disabled={isLoading || addressStatus === "loading"}
          >
            {isLoading
              ? "Placing An Order..."
              : `Order now for ${formatCurrency(totalPrice)}`}
          </Button>
        </div>
      </Form>
    </div>
  );
}

// eslint-disable-next-line
export async function action({ request }) {
  const formData = await request.formData();

  const data = Object.fromEntries(formData);
  const order = {
    ...data,
    cart: JSON.parse(data.cart),
    priority: data.priority === "true",
  };

  const errors = {};
  if (!isValidPhone(order.phone)) {
    errors.phone = "Please Add A Valid Phone Number, Maybe We Will Need It";
  }

  if (Object.keys(errors).length) {
    return errors;
  }

  const newOrder = await createOrder(order);
  return redirect(`/order/${newOrder.id}`);
}

export default CreateOrder;
