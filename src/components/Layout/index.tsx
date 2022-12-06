import React from 'react'
import { observer } from 'mobx-react-lite'
import { useNavigate } from "react-router-dom";
import { Outlet } from "react-router"
import ButtonOrder from "../ButtonOrder"
import styles from './styles.module.scss'
import store from "../../store/RootStore";

// @ts-ignore
import logo from '../../assets/images/logo.png'

const Layout = observer((): JSX.Element => {
    const navigate = useNavigate();

    return (
        <>
            <header className={styles.header}>
                <div className={styles.wrapperLogo}
                     onClick={() => navigate('/')}
                >
                    <img src={logo} alt={'logo'}/>
                </div>

                <div className={styles.wrapperBtn}>
                    <button className={styles.btn}
                            onClick={() => navigate('/')}
                    >
                        Страница продуктов
                    </button>

                    <ButtonOrder styleProp={styles.btn} quantity={store.lengthOrder} />
                </div>
            </header>

            <div className={styles.container}>
                <Outlet />
            </div>

            <footer className={styles.footer}>
                <div className={styles.textFooter}>©все права защищены.</div>
            </footer>
        </>

    );
})

export {Layout};
