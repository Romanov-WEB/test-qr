import React from 'react';
import { observer } from 'mobx-react-lite'
import styles from './styles.module.scss'
import store from "../../store/RootStore"
import { useNavigate } from "react-router-dom";

interface ModalInfo {
    status: boolean
}
export const ModalInfo = observer(({status}: ModalInfo): JSX.Element => {
    const navigate = useNavigate();

    const close = () => {
        store.openModal(false)
        navigate('/')
    }

    return (
        <div className={store.modalInfo? styles.modalWrapper: styles.hidden}>
            <div className={styles.contentModal}>
                <div className={styles.text}>
                    {
                        status?
                            'Ваш заказ отправлен':
                            'Произошла ошибка'
                    }
                </div>
                <button className={status?styles.btn: styles.btnError}
                        onClick={() => close()}
                >
                    Ok
                </button>
            </div>
        </div>
    );
})
