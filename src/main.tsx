import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import "react-loading-skeleton/dist/skeleton.css";
import { CartProvider } from "contexts/Cart.tsx";
import { ProductProvider } from "contexts/Product.tsx";
ReactDOM.createRoot(document.getElementById("root")!).render(
    <ProductProvider>
      <CartProvider>
        <App />
      </CartProvider>
    </ProductProvider>
);
