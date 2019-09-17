<template>
    <v-card hover height="100%" class="card-outter">
        <v-img
            :src="product.preview"
            aspect-ratio="0.75"
            :alt="product.title"

        ></v-img>
        <nuxt-link :to="{ path: `/${product.slug}`}">
            <v-card-title primary-title>
                <div>
                    <h3 class="headline mb-0">{{product.title}}</h3>
                </div>
            </v-card-title>
        </nuxt-link>
        <v-layout column align-center mb-2>
            <v-rating
                :value="product.avg_rating"
                readonly
                class="text-xs-center "
                color="yellow darken-3"
                background-color="grey darken-1"
                empty-icon="$vuetify.icons.ratingFull"
                half-increments
                hover>
            </v-rating>
            <div class="text-xs-center ">
                <span class="title"> ${{product.price}}</span>
                <del class="ml-2">${{product.price}}</del>
            </div>
        </v-layout>
        <v-card-actions class="card-actions">
            <button-add-to-cart
                :product="product"
            />
        </v-card-actions>
    </v-card>
</template>
<script>
    import ButtonAddToCart from "~/components/Control/ButtonAddToCart";

    export default {
        components: {ButtonAddToCart},
        props: {
            product: {
                type: Object,
            },
        },
    }
</script>
<style scoped>
    .card-outter {
        position: relative;
        padding-bottom: 50px;
    }

    .card-actions {
        position: absolute;
        bottom: 0;
        width: 100%;
    }

    .v-card__actions {
        width: 100%;
    }
</style>
