import React from 'react';
import { useNavigate } from "react-router-dom";
import CartIcon from "../../components-svg/CartIcon";
import classNames from "classnames";
import styles from './styles.module.scss'

interface ButtonOrderProps {
    quantity: number

    styleProp?: string
}

const ButtonOrder = ({ quantity, styleProp }: ButtonOrderProps): JSX.Element => {
    const navigate = useNavigate();

    return (
        <button className={classNames(
            styles.btnOrder,
            styleProp,)}
                onClick={() => navigate('/order')}
        >
            <CartIcon />
            {
               Boolean(quantity)?
                   <div>{quantity}</div>:
                   <></>
            }
        </button>
    );
};

export default ButtonOrder;
