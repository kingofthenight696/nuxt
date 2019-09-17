<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">
    <v-layout>
        <v-flex>
            <v-card>
                <v-container fluid grid-list-md>
                    <list-wrapper
                        :list="products"
                        :greedClasses="['xs12', 'md6', 'lg3']"
                    >
                        <template v-slot:item="{ item }">
                            <ProductCard
                                :product="item"
                            />
                        </template>
                    </list-wrapper>
                    <div class="text-xs-center pt-2">
                        <v-pagination
                            v-model="pagination.current"
                            :length="pagination.total"
                            :total-visible="5"
                            @input="onPageChange"
                        ></v-pagination>
                    </div>
                </v-container>
            </v-card>
        </v-flex>
    </v-layout>
</template>
<script>

    import ProductCard from '~/components/Product/ProductCard'
    import ListWrapper from '~/components/List/ListWrapper'
    import {mapGetters} from 'vuex'

    export default {
        layout: 'default',
        components: {
            ProductCard,
            ListWrapper
        },
        async asyncData({params, error, $axios, route, store}) {

            store.dispatch('categories/setCategories');

            let {data} = await $axios.get(`/products`, {params: {...route.query, ...params}});

            return {
                products: data.data,
                pagination: {
                    current: data.meta.current_page,
                    total: data.meta.last_page
                }
            };
        },
        computed: {
            ...mapGetters({
                cartItems: 'cart/getCartItems'
            }),
        },
        methods: {
            getProduct() {
                this.$axios.get(`/products`, {params: {...this.$route.query, ...this.$route.params}})
                    .then(response => {
                        this.products = response.data.data;
                        this.pagination = {
                            current: response.data.meta.current_page,
                            total: response.data.meta.last_page
                        }
                    })
                    .catch(error => {
                        console.log(error)
                    });
            },
            onPageChange(page) {
                this.$router.push({
                    query: {
                        ...this.$route.query,
                        page: page,
                    },
                })
            },
        },
        watch: {
            '$route'() {
                this.getProduct();
            },
        },
    }
</script>
