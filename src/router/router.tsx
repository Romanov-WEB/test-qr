import React from 'react'
import { Route, createBrowserRouter, createRoutesFromElements } from 'react-router-dom'
import { Layout } from "../components/Layout";
import { ProductPage, productLoader } from "../pages/ProductPage";
import { OrderPage } from "../pages/OrderPage";
import { NotFoundPage } from "../pages/404";

const router = createBrowserRouter(createRoutesFromElements(
    <>
        <Route path={'/'} element={<Layout />} errorElement={<NotFoundPage />}>
            <Route index element={<ProductPage />} loader={productLoader} />
            <Route path={'order'} element={<OrderPage />} />
        </Route>
        <Route path={'*'} element={<NotFoundPage />} />
    </>
))

export default router
