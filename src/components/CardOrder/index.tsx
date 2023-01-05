import React from 'react';
import { observer } from 'mobx-react-lite'
import store, { ProductOrderInstance } from "../../store/RootStore"
import styles from "./styles.module.scss"

interface CardOrder {
    id: number
    title: string
    imgUrl: string
    price: number
}

const CardOrder = observer((props: CardOrder): JSX.Element => {
    return (
        <div className={styles.cardOrderWrapper}>
            <div className={styles.title}>{props.title}</div>

            <div className={styles.wrapperImage}>
                <img className={styles.image} src={props.imgUrl} alt={props.title}/>
            </div>

            <div className={styles.counterProductWrapper}>
                <div className={styles.counterProduct}>
                    Количество товара:
                    { store.listOrder.filter(item => item.id === props.id)[0].counter}
                </div>
                <div className={styles.btnWrapper}>
                    <button className={styles.btn}
                        onClick={() => store.addItemOrder(props.id)}
                    >
                        +
                    </button>
                    <button className={styles.btn}
                        onClick={() => store.deleteItemOrder(props.id)}
                    >
                        -
                    </button>
                </div>
            </div>
        </div>
    );
})

export default CardOrder;
