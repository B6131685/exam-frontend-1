import { createContext, useReducer, ReactNode } from "react";
import toast from 'react-hot-toast';
interface ICart {
    id: number;
    amount: number;
}

interface ICartContext{
    state: ICart[]
    add: (id:number)=>void
    increase: (id:number)=>void
    minus: (id:number)=>void
    remove: (id:number)=>void
}

const CartContext = createContext<ICartContext | null>(null);

type Add = { type: "add"; playload: number };
type Increase = { type: "increase"; playload: number };
type Minus = { type: "minus"; playload: number };
type Remove = { type: "remove"; playload: number };

function cartReducer( cart:ICart[], action: Add | Increase| Minus | Remove):ICart[]{
  switch (action.type) {
    case "add":
      if(cart.find((item)=>item.id === action.playload)){
        return cart
      }else{
        toast('success',{
          style:{
            backgroundColor: "#C4DFDF"
          }
        });
        return [...cart, { id: action.playload, amount: 1 }]
      }
    case "increase":
      return cart.map((item) => {
        if (item.id === action.playload) item.amount+=1;
        return item;
      })
    case "minus":
        return cart.filter((item) => {
          if (item.id === action.playload) item.amount--
          if (item.amount > 0)
           return item;
          return 
      });
    case "remove":
      return cart.filter((item) => item.id !== action.playload);
    default:
      return cart;
  }
}

const CartProvider = ({ children }: { children: ReactNode }) => {
    
  const [cart, dispatch] = useReducer( cartReducer, [])
  function add(id:number){
    dispatch({type:'add',  playload: id })
  }
  function increase(id:number){
    dispatch({type:'increase',  playload: id })
  }

  function minus(id:number){
    dispatch({type:'minus',  playload: id })
  }

  function remove(id:number){
    dispatch({type:'remove',  playload: id })
  }
  return (
    <CartContext.Provider value={{state:cart, add, increase , minus, remove}}>
      {children}
    </CartContext.Provider>
  )
};

export { CartProvider };
export default CartContext