<template xmlns:v-slot="http://www.w3.org/1999/XSL/Transform">

    <v-container grid-list-md text-xs-center>
        <v-layout row wrap>

            <v-flex md6>
                <v-carousel>
                    <v-carousel-item
                        v-for="(image,i) in product.images"
                        :key="i"
                        :src="image.url"
                    ></v-carousel-item>
                </v-carousel>
            </v-flex>
            <v-flex md6>
                <v-card>

                    <v-card-title primary-title>
                        <div>
                            <h3 class="headline mb-0">{{product.title}}</h3>
                        </div>
                    </v-card-title>
                    <v-layout column align-center>
                        <v-rating
                            :value="product.avg_rating"
                            readonly
                            class="text-xs-center"
                            color="yellow darken-3"
                            background-color="grey darken-1"
                            empty-icon="$vuetify.icons.ratingFull"
                            half-increments
                            hover>
                        </v-rating>
                        <div class="text-xs-center ">

                            <span class="title mr-3"> ${{product.price}}</span>
                            <del class=""> ${{product.price}}</del>
                        </div>
                    </v-layout>
                    <v-card-title>

                        <div class="text-xs-left">
                            {{product.description}}
                        </div>
                    </v-card-title>
                    <button-add-to-cart
                        :product="product"
                    />
                </v-card>
            </v-flex>
            <list-wrapper
                :list="comments"
                :greedClasses="['xs12', 'mt-1', 'text-xs-left']"
            >
                <template v-slot:item="{ item }">
                    <comment
                        :comment="item"
                    />
                </template>
            </list-wrapper>
            <v-flex>
                <div class="text-xs-center pt-2">
                    <v-pagination
                        :value="commentsPagination.current_page"
                        :length="commentsPagination.last_page"
                        :total-visible="7"
                        @input="onPageChange"
                    ></v-pagination>
                </div>
            </v-flex>
            <v-flex xs12 mt-3>
                <comment-form
                    :productId="product.id"
                />
            </v-flex>
        </v-layout>
    </v-container>

</template>
<script>
    import {mapActions, mapGetters} from 'vuex'
    import Comment from "~/components/Comment/Comment";
    import ButtonAddToCart from "~/components/Control/ButtonAddToCart";
    import CommentForm from "~/components/Form/CommentForm";
    import ListWrapper from '~/components/List/ListWrapper'

    export default {
        head() {
            let product = this.product;

            return {
                title: `${product.seo_title}`,
                meta: [
                    {
                        hid: `description`,
                        name: 'description',
                        content: `${product.seo_description}`
                    }]
            }
        },
        components: {
            ButtonAddToCart,
            Comment,
            CommentForm,
            ListWrapper
        },
        async fetch({store, error, route, params}) {

            let query = {
                slug: params,
                params: route.query
            };
            store.dispatch('categories/setCategories');
            await store.dispatch('product/fetchProduct', query)
        },
        computed: {
            ...mapGetters({
                cartItems: 'cart/getCartItems',
                product: 'product/getProduct',
                comments: 'product/getComments',
                commentsPagination: 'product/getCommentsPagination',
            }),
        },
        methods: {
            ...mapActions({
                addToCart: 'cart/addToCart',
                fetchComments: 'product/fetchComments'
            }),
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
                let params = {
                    product_id: this.product.id,
                    ...this.$route.query
                };
                this.fetchComments(params);
            },
        },
    }
</script>
