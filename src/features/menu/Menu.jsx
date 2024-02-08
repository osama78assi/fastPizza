import MenuItem from "./MenuItem";
import { useLoaderData } from "react-router-dom";
import { getMenu } from "../../services/apiRestaurant";


function Menu() {
  const menu = useLoaderData();
  
  return (
    <ul className="divide-y divide-stone-200 px-2">
      {menu.map((pizza) => (
        <MenuItem
          pizza={pizza}
          key={pizza.id}
        />
      ))}
    </ul>
  );
}

// eslint-disable-next-line
export async function loader() {
  const data = await getMenu();
  return data;
}

export default Menu;
