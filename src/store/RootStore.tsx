import {types, Instance} from 'mobx-state-tree';

const Product = types.model('Product', {
    id: types.number,
    title: types.string,
    imgUrl: types.string,
    price: types.number,
})

const ProductOrder = types.model('ProductOrder',{
    id: types.number,
    product: Product

});

const RootStore = types.model('RootStore', {
        listOrder: types.array(ProductOrder),
        modalInfo: types.boolean,
    }).views((self) => ({
        get getOrder() {
            return Array.from(self.listOrder.reduce((acc, curr) => {
                return acc.set(curr.id, {
                    ...curr
                })
            }, new Map()).values())
        },

        get getCost() {
            return self.listOrder.reduce((acc, curr) => {
                return curr.product.price + acc
            }, 0)
        },

        get lengthOrder() {
            return self.listOrder.length
        },
    }))
    .actions(self => ({
        addListOrder (order: ProductOrderInstance) {
            if(self.listOrder.length !== 0) {
                const indexPush = self.listOrder.findIndex(({id} )=> id === order.id)
                self.listOrder.splice(indexPush + 1, 0, order)
            }
            else {
                self.listOrder.push(order)
            }
        },

        deleteItemOrder(order: ProductOrderInstance) {
            const index = self.listOrder.findIndex(({id}) => id === order.id)
            self.listOrder.splice(index, 1)
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
