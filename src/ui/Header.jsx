import { Link } from "react-router-dom";
import SearchOrder from "../features/order/SearchOrder";
import Username from "../features/user/Username";

function Header() {
  return (
    <header className="flex items-center justify-between border-b border-stone-200 bg-yellow-400 px-4 py-3 uppercase sm:px-6">
      <Link
        to={"/"}
        className="flex items-center text-lg font-bold tracking-widest"
      >
        Fast
        <img
          src="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🍕</text></svg>"
          alt="logo"
          className="h-7 w-9"
        />
      </Link>
      <SearchOrder />
      <Username />
    </header>
  );
}

export default Header;
