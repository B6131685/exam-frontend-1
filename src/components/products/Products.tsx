import { useContext, useEffect, useState } from "react";
import style from "./style.module.css";
import axios from "axios";
import { IProducts } from "./interface";
import Card, { Card_Skeleton } from "../card/Card";
import ProductContext from "../../contexts/Product";

const Products = () => {
  const productContext = useContext(ProductContext);
  const [select, setSelect] = useState<string[]>([])
  const [category, setCategory] = useState<string[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  useEffect(() => {
    if (!productContext?.products) {
      axios
        .get<IProducts[]>("https://fakestoreapi.com/products")
        .then((res) => {
          productContext?.setProducts(res.data);
        })
        .catch(() => {
          productContext?.setProducts([]);
        })
        .finally(() => setLoading(false));
    }
  }, []);

  useEffect(() => {
    const temp = new Set(
      (productContext?.products ?? []).map((item) => item.category)
    );
    setCategory([...temp]);
  }, [productContext]);

  function handleSelect(item:string){
    if(select.includes(item)){
      setSelect(prev=> prev.filter((el)=> el !== item ))
    }
    else setSelect([...select, item])
  }
  return (
    <div className={style.container}>
      {
        <div className={style.category}>
          {category.map((item) => (
            <span key={item} className={`${style.item} ${select.includes(item) ? style.active : ''}`} onClick={()=>handleSelect(item)}>{item}</span>
          ))}
        </div>
      }
      <div className={style.listProducts}>
        {loading === true ? (
          <>
            <Card_Skeleton />
            <Card_Skeleton />
            <Card_Skeleton />
            <Card_Skeleton />
            <Card_Skeleton />
            <Card_Skeleton />
            <Card_Skeleton />
            <Card_Skeleton />
          </>
        ) : (
          productContext?.products &&
          productContext.products.map((item: IProducts) => {
            if(select.length === 0)
              return <Card key={item.id} {...item} />
            else if(select.includes(item.category))
              return <Card key={item.id} {...item} />
          })
        )}
      </div>
    </div>
  );
};

export default Products;
