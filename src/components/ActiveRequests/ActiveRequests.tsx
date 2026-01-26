import RequestCart from "../RequestCart/RequestCart";
import "./ActiveRequests.scss"

export default function ActiveRequests() {
  return (
    <div className="home-active-requests__carts">
      <RequestCart />
      <RequestCart />
      <RequestCart />
    </div>
  )
}
