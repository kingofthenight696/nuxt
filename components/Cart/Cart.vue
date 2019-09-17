<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <div>
        <v-data-table
            :headers="headers"
            :items="cartItems"
            hide-actions
        >
            <template v-slot:items="props">
                <td>
                    <v-img
                        :src="props.item.preview"
                        aspect-ratio="3"
                        :alt=" props.item.title "
                    ></v-img>
                </td>
                <td class="text-xs-center">{{ props.item.title }}</td>
                <td class="justify-center">
                    <input-number
                        :qty="productQuantity(props.item)"
                        @input="(quantity)=>{changeQtyHandler(props.item, quantity)}"
                    />
                </td>
                <td class="text-xs-center">{{ printPrice(props.item) }}</td>
                <td class="justify-center layout px-0">
                    <v-icon
                        small
                        @click="removeProduct(props.item.id)"
                    >
                        delete
                    </v-icon>
                </td>
            </template>

        </v-data-table>
        <v-toolbar flat class="mt-2">
            <v-spacer></v-spacer>
            <v-toolbar-title v-if="shippingPrice">Delivery price: $ {{shippingPrice}}</v-toolbar-title>
            <v-toolbar-title>Total: $ {{totalPrice}}</v-toolbar-title>
            <v-divider
                class="mx-2"
                inset
                vertical
            ></v-divider>
            <v-btn color="primary" :disabled="canBuy" @click="buy" dark class="mb-2">Buy</v-btn>
        </v-toolbar>
    </div>
</template>

<script>
    import InputNumber from '~/components/Control/InputNumber.vue'
    import {mapActions, mapGetters} from 'vuex'

    export default {
        components: {
            InputNumber
        },
        data() {
            return {
                headers: [
                    {
                        text: 'Preview',
                        align: 'center',
                        sortable: false,
                        value: 'preview'
                    },
                    {text: 'Title', value: 'title', sortable: false, align: 'center'},
                    {text: 'Qty', value: 'quantity', sortable: false, align: 'center'},
                    {text: 'Price', value: 'price', sortable: false, align: 'center'},
                    {text: 'Delete', value: 'title', sortable: false, align: 'center'},
                ],
            }
        },
        computed: {
            ...mapGetters({
                cart: 'cart/getCart',
                cartItems: 'cart/getCartItems',
                activeStep: 'checkout/getActiveStep',
                shipping: 'cart/getShipping',
            }),
            shippingPrice() {
                return (this.shipping) ? this.shipping.price : undefined;
            },
            totalPrice() {
                return this.cart.total_price;
            },
            canBuy() {
                return !(this.cart.shipping.delivery_id && this.cart.shipping.department_id && (this.activeStep == 2));
            },
        },
        methods: {
            ...mapActions({
                changeProductQty: 'cart/changeProductQty',
                removeProduct: 'cart/removeProduct',
                fetchCartItems: 'cart/fetchCartItems',
            }),
            productQuantity(cartItem) {
                return cartItem.quantity;
            },
            printPrice(cartItem) {
                return cartItem.price * cartItem.quantity;
            },
            changeQtyHandler(cartItem, quantity) {
                let product = {...cartItem};
                product.quantity = quantity;
                this.changeProductQty(product)
            },
            async buy() {
                await this.$axios.put(`/buy`, {},
                    {withCredentials: true})
                    .then(response => {

                        this.fetchCartItems();
                        this.$router.push('order/my');
                    })
                    .catch(error => {
                        console.log('city error', error);
                    });
            }
        }
    }
</script>
