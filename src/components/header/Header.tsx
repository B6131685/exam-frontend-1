import React,{ useContext,useEffect,useRef,useState } from "react";
import style from "./style.module.css";
import CartContext from "contexts/Cart";
import Cart from "components/cart/cart";
import { Toaster } from "react-hot-toast";
const Header = () => {
  const cartContext = useContext(CartContext);
  const ref = useRef<HTMLDivElement | null>(null)
  const [open, setOpen] = useState<boolean>(false);
  function handleCart(e:React.MouseEvent<HTMLDivElement, globalThis.MouseEvent>):void {
    const target = e.target as HTMLDivElement;
    if (target.id === "cart-btn") setOpen((prev) => !prev);
  }

  useEffect(()=>{
    function clickOutSideCloseCart(e: globalThis.MouseEvent):void{
      if(ref && e.target && !ref.current?.contains(e.target as Node)){
        setOpen(false)
      }
    }
      window.addEventListener('click', clickOutSideCloseCart)
    return ()=>{
      window.removeEventListener('click',clickOutSideCloseCart)
    }
  },[])
  return (
    <>
      <div className={style.wrapper}>
        <div className={style.shop}>My Shop</div>
        <div id="cart-btn" className={style.cart} onClick={handleCart} ref={ref}>
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
