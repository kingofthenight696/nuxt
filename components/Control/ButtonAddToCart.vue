<template>
    <v-card-actions>
        <template v-if="isExistInCart(product)">
            <v-btn
                block
                aria-disabled="true"
                color="info">
                class="add-to-cart"
                <v-icon left>cloud_upload</v-icon>
                ALREADY IN CART
            </v-btn>
        </template>
        <template v-else>
            <v-btn
                @click="addToCart(product)"
                block
                class="add-to-cart"
                color="success">
                <v-icon left>cloud_upload</v-icon>
                ADD TO CART
            </v-btn>
        </template>
    </v-card-actions>

</template>
<script>
	import {mapActions, mapGetters} from 'vuex';

	export default {
		props: {
			product: {
				type: Object,
				required: true
			},
		},
		computed: {
			...mapGetters({
				cartItems: 'cart/getCartItems'
			})
		},
		methods: {
			...mapActions({
				addToCart: 'cart/addToCart'
			}),
			isExistInCart(product) {
				return !!this.cartItems.find(cartItem => product.id === cartItem.product_id);
			},
		},
	}
</script>
