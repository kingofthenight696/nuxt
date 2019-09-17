<template>
  <v-app>
    <v-container bg  grid-list-md :class="{ 'fill-height': !cartItems }"  text-xs-center>
      <template v-if="cartItems">
        <v-layout row wrap>

          <v-toolbar flat>
            <v-toolbar-title>Checkout</v-toolbar-title>
          </v-toolbar>
          <v-flex md6>

            <v-stepper
                    :value="activeStep"
                    vertical
            >
              <v-stepper-step :complete="activeStep > 1" step="1" editable @click="changeActiveStep(1)">
                Contacts
                <small>Set you contact data here</small>
              </v-stepper-step>

              <v-stepper-content step="1">
                <template v-if="authenticated">
                  <checkout-order-form/>
                </template>
                <template v-else>
                  <checkout-tabs/>
                </template>
              </v-stepper-content>

              <v-stepper-step :complete="activeStep > 2" step="2">
                Delivery settings
                <small>Set you delivery data here</small>
              </v-stepper-step>
              <v-stepper-content step="2">
                <Delivery/>
              </v-stepper-content>
            </v-stepper>
          </v-flex>
          <v-flex md6>
            <cart class="cart"/>
          </v-flex>

        </v-layout>
      </template>
      <template v-else>
          <empty-cart />
      </template>
        </v-container>
        </v-app>
</template>

<script>
    import Cart from '~/components/Cart/Cart'
    import CheckoutTabs from '~/components/Cart/CheckoutTabs'
    import Delivery from '~/components/Cart/Delivery'
    import CheckoutOrderForm from '~/components/Form/CheckoutOrderForm'
    import EmptyCart from '~/components/Error/EmptyCart'
    import {mapActions, mapGetters} from 'vuex'

    export default {
        layout: 'clear',
        components:
            {
            Cart,
            CheckoutTabs,
            Delivery,
           CheckoutOrderForm,
            EmptyCart
        },
        data() {
            return {
                activeCity: null,
            }
        },
        async fetch({store, error}){
            await store.dispatch('checkout/fetchCities');
            let contacts = store.getters['cart/getContacts'];
            let cart = store.getters['cart/getCart'];

            let product_ids = cart.cart_items.map((cart_items) => {
                return cart_items.product_id });

            if(contacts.city_id !== undefined){
                let params = {
                    city_id: contacts.city_id,
                    product_ids
                };

              await store.dispatch('checkout/fetchDeliveries', params);
            }
        },
        methods: {
            ...mapActions({
                changeActiveStep: 'checkout/changeActiveStep',
                fetchCities: 'checkout/fetchCities',
            }),
        },
        computed: {
            ...mapGetters({
                activeStep: 'checkout/getActiveStep',
                cart: 'cart/getCart',
                getContacts: 'cart/getContacts'
            }),
            cartItems() {
              return this.cart.cart_items;
            },
        },
    }
</script>
<style>
    .v-stepper {
        box-shadow: none;
    }

    .cart {
        margin-top: 87px;
    }
</style>
