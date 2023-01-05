import {types, Instance} from 'mobx-state-tree';

const Product = types.model('Product', {
    id: types.number,
    title: types.string,
    imgUrl: types.string,
    price: types.number,
})

const ProductOrder = types.model('ProductOrder',{
    id: types.number,
    product: Product,
    counter: types.number
});

const RootStore = types.model('RootStore', {
        listOrder: types.array(ProductOrder),
        modalInfo: types.boolean,
    }).views((self) => ({
        get getOrder() {
            // return Array.from(self.listOrder.reduce((acc, curr) => {
            //     return acc.set(curr.id, {
            //         ...curr
            //     })
            // }, new Map()).values())
            return self.listOrder
        },

        get getCost() {
            return self.listOrder.reduce((acc, curr) => {
                return (curr.counter * curr.product.price ) + acc
            }, 0)
        },

        get lengthOrder() {
            return self.listOrder.length
        },
    }))
    .actions(self => ({
        addListOrder (order: ProductOrderInstance) {
            if (self.listOrder.length === 0) {
                return self.listOrder.push(order)
            }
            if (self.listOrder.every((item) => item.id !== order.id)) {
                return self.listOrder.unshift(order)
            }
            // if(self.listOrder.length !== 0) {
            //     const indexPush = self.listOrder.findIndex(({id} )=> id === order.id)
            //     self.listOrder.splice(indexPush + 1, 0, order)
            // } else {
            //     self.listOrder.push(order)
            // }
        },

        addItemOrder(idProduct: number) {
            self.listOrder.forEach(item => {
                if (item.id === idProduct) {
                    item.counter = item.counter + 1
                }
            })
        },

        deleteItemOrder(idProduct: number) {
            self.listOrder.forEach(item => {
                if (item.id === idProduct && item.counter >= 1) {
                    item.counter = item.counter - 1
                }
                if (item.id === idProduct && item.counter === 0) {
                    const index = self.listOrder.findIndex(({id}) => id === idProduct)
                    self.listOrder.splice(index, 1)
                }
            })
            // const index = self.listOrder.findIndex(({id}) => id === order.id)
            // self.listOrder.splice(index, 1)
        },

        deleteProduct(idProduct: number) {
            const indexStart = self.listOrder.findIndex(({id} )=> id === idProduct)
            const indexEnd = self.listOrder.filter(({id}) => id === idProduct).length
            self.listOrder.splice(indexStart, indexEnd)
        },

        removeList() {
            self.listOrder.splice(0, self.listOrder.length)
        },


        openModal(open: boolean) {
            self.modalInfo = open
        }
    }))


export type ProductOrderInstance = Instance<typeof ProductOrder>
const store = RootStore.create({
    listOrder: [],
    modalInfo: false
});
export default store;
