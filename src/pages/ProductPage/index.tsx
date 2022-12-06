import React, { Suspense } from 'react';
import { observer } from 'mobx-react-lite'
import { Await, defer, useLoaderData } from "react-router";
import styles from './styles.module.scss'
import { CardProduct } from "../../components/CardProduct";
import store from "../../store/RootStore";
import { getProduct } from "../../services/ApiProduct";
import CardOrder from "../../components/CardOrder";

interface Product {
    id: number
    name: string
    imageUrl: string
    price: string
}

interface Date {
    dataProduct: Array<Product>,
}

const ProductPage = observer((): JSX.Element => {
    const { dataProduct } = useLoaderData() as Date

    return (
        <div className={styles.wrapperPage}>
            <div className={styles.wrapperProduct}>
                <h2 className={styles.header}>Список товара</h2>
                <div className={styles.listProduct}>
                    <Suspense fallback={<div className={styles.loader}>Загрузка...</div>}>
                        <Await resolve={dataProduct}>
                            {
                                (resolvedPosts: Array<Product>) => (<>
                                    {
                                        resolvedPosts.map((post, index) => (
                                            <CardProduct
                                                key={index}
                                                title={post.name}
                                                imgUrl={post.imageUrl}
                                                price={post.price}
                                                id={post.id}
                                            />
                                        ))
                                    }
                                </>)
                            }
                        </Await>
                    </Suspense>
                </div>
            </div>

            <div className={styles.wrapperOrder}>
                <h2 className={styles.header}>Ваш заказ</h2>
                <div className={styles.cost}>Стоимость заказа: {store.getCost}</div>
                <div className={styles.listProductWrapper}>
                    {
                        store.getOrder.map((item, i) => (
                            <CardOrder id={item.id}
                                       title={item.product.title}
                                       imgUrl={item.product.imgUrl}
                                       price={item.product.price}
                                       key={i}
                            />
                        ))
                    }
                </div>
            </div>
        </div>

    );
})


function productLoader() {
    return defer({
        dataProduct: getProduct()
    })
}

export { ProductPage, productLoader };
