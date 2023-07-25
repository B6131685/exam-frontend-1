import Skeleton from "react-loading-skeleton";
import style from "./style.module.scss";
import { IProducts } from "../products/interface";
import star from '../../assets/star.svg'
import middleDot from '../../assets/middle-dot.svg'
import { useContext } from "react";
import CartContext from "../../contexts/Cart";
const Card = ({title, rating, category, image, price, id }: IProducts) => {
  const cartContext = useContext(CartContext);
  function Add2Cart(){
    cartContext?.add(id)
  }
  return (
    <div className={style.container}>
      <div className={style.img}>
        <div className={style.category}>{category}</div>
        <img src={image} alt={title} />
      </div>
      <div className={style.info}>
        <div className={style.title}>
            <span>{title}</span>
        </div>
        <div className={style.rating}>
            <img src={star} alt="star" />
            <span >{rating.rate}</span>
            <img src={middleDot} alt="middle dot"/>
            <span >{rating.count} review</span>
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
    <div  className={style.skeleton_container}>
      <Skeleton style={{ height: "100%" }} />
      <div className={style.info}>
        <Skeleton />
        <Skeleton style={{ width: "100px", height: "10px"}} />
        <div style={{display: "grid", gap: "10px", gridTemplateColumns:"1fr 1fr"}}>
          <Skeleton style={{height:"20px"}}/>
          <Skeleton style={{height:"20px"}}/>
        </div>
      </div>
    </div>
  );
}


export { Card_Skeleton };
export default Card;
