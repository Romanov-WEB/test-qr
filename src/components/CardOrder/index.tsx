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
    const order: ProductOrderInstance = {
        id: props.id,
        product: {
            id: props.id,
            title: props.title,
            imgUrl: props.imgUrl,
            price: props.price,
        },
    }

    return (
        <div className={styles.cardOrderWrapper}>
            <div className={styles.title}>{props.title}</div>

            <div className={styles.wrapperImage}>
                <img className={styles.image} src={props.imgUrl} alt={props.title}/>
            </div>

            <div className={styles.counterProductWrapper}>
                <div className={styles.counterProduct}>
                    Количество товара:
                    { store.listOrder.filter(item => item.id === props.id).length}
                </div>
                <div className={styles.btnWrapper}>
                    <button className={styles.btn}
                        onClick={() => store.addListOrder(order)}
                    >
                        +
                    </button>
                    <button className={styles.btn}
                        onClick={() => store.deleteItemOrder(order)}
                    >
                        -
                    </button>
                </div>
            </div>
        </div>
    );
})

export default CardOrder;
