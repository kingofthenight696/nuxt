<template>
    <v-toolbar
            :clipped-left="clipped"
            fixed
            app
    >
        <template v-if="needActions">
            <v-toolbar-side-icon @click="toggleMenu"/>
        </template>
        <nuxt-link class="navbar-brand" to="/">
            <v-toolbar-title v-text="title"/>
        </nuxt-link>
        <v-spacer/>
        <template v-if="needActions">
            <v-badge
                    :value="itemsInCart"
                    color="orange"
                    right
                    overlap
            >
                <v-btn
                        color="primary"
                        to="/checkout"
                        nuxt
                >Cart
                    <v-icon right>shopping_cart</v-icon>
                </v-btn>
                <template v-slot:badge>
                    <span>{{itemsInCart}}</span>
                </template>
            </v-badge>
            <template v-if="authenticated">
                <v-toolbar-title v-text="user.name"/>
                <v-menu bottom left>
                    <template v-slot:activator="{ on }">
                        <v-btn
                                dark
                                icon
                                v-on="on"
                        >
                            <v-icon>more_vert</v-icon>
                        </v-btn>
                    </template>

                    <v-list>
                        <v-list-tile
                                @click.prevent="signOut"
                        >
                            <v-list-tile-title>Sign out</v-list-tile-title>
                        </v-list-tile>
                    </v-list>
                </v-menu>
            </template>
            <template v-else>
                <v-toolbar-items class="hidden-sm-and">
                    <v-btn flat to="/auth/login" nuxt> Login</v-btn>
                    <v-btn flat to="/auth/register" nuxt> Register</v-btn>
                </v-toolbar-items>
            </template>
        </template>
    </v-toolbar>
</template>
<script>
    import {mapActions, mapGetters} from 'vuex'

    export default {
        props: {
            clipped: {
                type: Boolean,
                default: true
            },
            drawer: {
                type: Boolean,
                default: false
            },
            needActions: {
                type: Boolean,
                default: true
            },
            title: {
                type: String,
            }
        },
        data() {
            return {
                emptyCart: false,
            }
        },
        computed: {
            ...mapGetters({
                cart: 'cart/getCart'
            }),
            itemsInCart() {
                return (typeof this.cart.total_quantity == 'undefined')
                    ? null : this.cart.total_quantity;
            },
        },
        methods: {
            ...mapActions({
                fetchCartItems: 'cart/fetchCartItems',
            }),
            toggleMenu() {
                return this.$emit('toggleMenu', this.drawer);
            },
            signOut() {
                this.$auth.logout();
            },
        },
    }
</script>
