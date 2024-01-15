import { useContext, useEffect, useState } from "react";
import ProductContext from "contexts/Product";
import CartContext from "contexts/Cart";
import style from "./style.module.scss";
import bxCart from 'src/assets/bx-cart.svg'
interface IDisplayCart {
  total: number;
  items: {
    id: number;
    image: string;
    title: string;
    amount: number;
    sum: number;
  }[];
}
const Cart = () => {
  const [carts, setCart] = useState<IDisplayCart>({ total: 0, items: [] });
  const productContext = useContext(ProductContext);
  const cartContext = useContext(CartContext);

  useEffect(() => {
    let temp: IDisplayCart = { total: 0, items: [] };
    for (const cartItem of cartContext?.state ?? []) {
      const find = (productContext?.products ?? []).find(
        (product) => product.id === cartItem.id
      );
      if (find) {
        const { id, image, title, price } = find;
        const sum = ((price ?? 0) * cartItem.amount);
        
        temp = {
          total: (temp.total + sum),
          items: [
            ...temp.items,
            {
              id,
              image,
              title,
              amount: cartItem.amount,
              sum,
            },
          ],
        };
      }
    }
    console.log(temp);
    
    setCart(temp)
  }, [cartContext]);

  return (
    <>
      {
      carts.items.length !==0 
      ?
      (carts.items ?? []).map((cartItem) => {
        return (
          <div key={cartItem?.id} className={style.container}>
            <img src={cartItem?.image} />
            <div className={style.title}>{cartItem?.title}</div>
            <div className={style.action}>
              <div
                className={style.btn}
                onClick={() => cartContext?.minus(cartItem.id)}
              >
                -
              </div>
              <div>{cartItem.amount}</div>
              <div
                className={style.btn}
                onClick={() => cartContext?.increase(cartItem.id)}
              >
                +
              </div>
            </div>
            <div
              className={style.delete}
              onClick={() => cartContext?.remove(cartItem.id)}
            >
              delete
            </div>
            <div className={style.sum}>
              ${cartItem.sum.toFixed(2)}
            </div>
            <div></div>
          </div>
        );
      })
      :
      <div className={style.emtyCart}>
        <span>emty</span>
        <img src={bxCart} alt="bx-cart.svg" />
      </div>
      }
      <footer>
        <div className={style.text}>Total</div>
        <div>${carts.total.toFixed(2)}</div>
      </footer>
    </>
  );
};

export default Cart;
