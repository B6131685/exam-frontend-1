import Skeleton from "react-loading-skeleton";
import style from "./style.module.scss";
// import colorthief from 'colorthief'
import ColorThief from "@neutrixs/colorthief";
import { IProducts } from "../products/interface";
import star from "../../assets/star.svg";
import middleDot from "../../assets/middle-dot.svg";
import { SyntheticEvent, useContext, useRef } from "react";
import CartContext from "../../contexts/Cart";
const Card = ({ title, rating, category, image, price, id }: IProducts) => {
  const cartContext = useContext(CartContext);
  const ref = useRef<HTMLDivElement | null>(null)
  const colorThief = new ColorThief();
  function Add2Cart() {
    cartContext?.add(id);
  }
  return (
    <div ref={ref} className={style.container}>
      <div  className={style.img}>
        <div className={style.category}>{category}</div>
        <img
          src={image}
          alt={title}
          crossOrigin={"anonymous"}
          onLoad={(e: SyntheticEvent<HTMLImageElement>) => {
            // console.log(colorThief.getColor(e.target as HTMLImageElement));
            if(ref.current && ref.current?.style.backgroundColor !== undefined){
              // ref.current.style.backgroundColor = `rgb(${arr[0]}, ${arr[1]}, ${arr[2]})`
              ref.current.addEventListener('mouseover', () => {
                const arr = colorThief.getColor(e.target as HTMLImageElement)
                const shadow = `10px 10px 0px 0px rgba(${arr[0]}, ${arr[1]}, ${arr[2]}, 1)`
                 if(ref.current) ref.current.style.boxShadow = shadow;
              });

              ref.current.addEventListener('mouseout', () => {
                if(ref.current) ref.current.style.boxShadow = 'none';
              });
            } 
          }}
        />
      </div>
      <div  className={style.info}>
        <div className={style.title}>
          <span>{title}</span>
        </div>
        <div className={style.rating}>
          <img src={star} alt="star" />
          <span>{rating.rate}</span>
          <img src={middleDot} alt="middle dot" />
          <span>{rating.count} review</span>
        </div>
        <div className={style.price}>
          <div>${price}</div>
          <button onClick={Add2Cart}>Add to cart</button>
        </div>
      </div>
    </div>
  );
};

const Card_Skeleton = () => {
  return (
    <div className={style.skeleton_container}>
      <Skeleton style={{ height: "100%" }} />
      <div className={style.info}>
        <Skeleton />
        <Skeleton style={{ width: "100px", height: "10px" }} />
        <div
          style={{
            display: "grid",
            gap: "10px",
            gridTemplateColumns: "1fr 1fr",
          }}
        >
          <Skeleton style={{ height: "20px" }} />
          <Skeleton style={{ height: "20px" }} />
        </div>
      </div>
    </div>
  );
};

export { Card_Skeleton };
export default Card;
