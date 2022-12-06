import React, { useState } from 'react'
import { observer } from 'mobx-react-lite'
import store from "../../store/RootStore"
import styles from './styles.module.scss'
import axios from "axios";
import { API_ORDER } from "../../config";
import { ModalInfo } from "../../components/ModalInfo";
const OrderPage = observer(() => {
    const [status, setStatus] = useState(false)

    const onSubmit = (): void => {
        const result = store.listOrder.map(item => item)

        axios.post(API_ORDER,{
            result
        })
            .then((res) => {
                if (res.status === 201) {
                    setStatus(true)
                    store.openModal(true)
                }
            })
            .catch((error) => {
                if (error.response.status === 404) {
                    setStatus(false)
                    store.openModal(true)
                }
            })
        store.removeList()
    }

    return (
        <div className={styles.orderPage}>
            <ModalInfo status={status} />

            {
                Boolean(store.lengthOrder)?<>
                    <h2 className={styles.header}>Ваш заказ на общую стоимость товара {store.getCost}p</h2>
                    <div className={styles.listOrder}>
                        {
                            store.getOrder.map((item, i) => {
                                return(
                                    <div className={styles.productItem} key={i}>
                                        <div className={styles.description}>
                                            <div className={styles.title}>
                                                Название товара: {item.product.title}
                                            </div>
                                            <div className={styles.price}>
                                                Цена товара: {item.product.price}
                                            </div>
                                            <div className={styles.counter}>
                                                Количество товара: {
                                                store.listOrder.filter(product => product.id === item.id).length
                                            }
                                            </div>
                                        </div>
                                        <button className={styles.btnDelete}
                                                onClick={() => store.deleteProduct(item.id)}
                                        >
                                            Удалить товар
                                        </button>

                                    </div>
                                )
                            })
                        }
                    </div>
                    <button className={styles.btnSubmit}
                            onClick={() => onSubmit()}
                    >
                        Отправить заказ
                    </button>
                </>:
                <h2 className={styles.header}>Корзина пуста</h2>
            }
        </div>
    );
})

export {OrderPage};
