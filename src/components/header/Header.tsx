import { useContext,useState } from "react";
import style from "./style.module.css";
import CartContext from "../../contexts/Cart";
import Cart from "../cart/cart";
import { Toaster } from "react-hot-toast";
const Header = () => {
  const cartContext = useContext(CartContext);
  const [open, setOpen] = useState<boolean>(false);
  function handleCart(e) {
    if (e.target.id === "cart-btn") setOpen((prev) => !prev);
  }
  return (
    <>
      <div className={style.wrapper}>
        <div className={style.shop}>My Shop</div>
        <div id="cart-btn" className={style.cart} onClick={handleCart}>
          Cart({cartContext?.state.length})
          <div
            id="model-cart"
            className={`${style.cart_info}`}
            style={{ display: `${open ? "block" : "none"}` }}
          >
            <Cart />
          </div>
        </div>
      </div>
      <Toaster />
    </>
  );
};

export default Header;
