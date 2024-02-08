import { useRouteError } from "react-router-dom";
import LinkButton from "./LinkButton";

function Error() {
  const err = useRouteError();

  return (
    <div className="pl-5">
      <h1>Something went wrong 😢</h1>
      <p>{err.data || err.message}</p>

      <LinkButton to="/" addtionClass="block mb-3 mt-3">&larr; Go Home</LinkButton>
      <LinkButton to="-1">&larr; Go back</LinkButton>
    </div>
  );
}

export default Error;
