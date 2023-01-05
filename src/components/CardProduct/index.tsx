import React from 'react';
import { observer } from 'mobx-react-lite'
import styles from './styles.module.scss'
import store, { ProductOrderInstance } from "../../store/RootStore";

interface PopsCardProduct {
    id: number
    title: string
    imgUrl: string
    price: string
}
export const CardProduct = observer(({id, title, imgUrl, price}: PopsCardProduct): JSX.Element => {
    const order: ProductOrderInstance = {
        id,
        product: {
            id,
            title,
            imgUrl,
            price: +price,
        },
        counter: 0
    }

    return (
        <div className={styles.wrapperCard}
             onClick={() => {
                 store.addListOrder(order)
                 store.addItemOrder(id)
             }
        }>
            <h2 className={styles.title}>Название товара: {title}</h2>
            <div className={styles.wrapperImageCard}>
                <img className={styles.imageCard} src={imgUrl} alt={'#'}/>
            </div>
            <div className={styles.priceCard}>price: {price}</div>
        </div>
    );
})
