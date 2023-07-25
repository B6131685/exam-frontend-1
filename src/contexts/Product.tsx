import { createContext, useReducer, ReactNode } from "react";
import { IProducts } from "../components/products/interface";

type SetProducts = { type: "set"; playload: IProducts[] };
interface IContext {
    products:IProducts[] | null,
    setProducts: (products:IProducts[])=> void
}
const ProductContext = createContext< IContext | null>(null);

function productsReducer( products:IProducts[] | null, action: SetProducts):IProducts[] | null{
    switch (action.type) {
      case "set":
        return action.playload
      default:
        return products;
    }
}

const ProductProvider = ({ children }: { children: ReactNode }) => {
  const [ products, dispatch] = useReducer( productsReducer, null)
  function setProducts(products:IProducts[]){
    dispatch({type:'set', playload: products})
  }

  return (
    <ProductContext.Provider value={{products, setProducts}}>
        {children}
    </ProductContext.Provider>
  )
}


export { ProductProvider }
export default ProductContext