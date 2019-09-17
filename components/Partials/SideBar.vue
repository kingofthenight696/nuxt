<template>
    <v-navigation-drawer
        v-model="drawer"
        :mini-variant="miniVariant"
        :clipped="clipped"
        fixed
        app
    >
        <v-list>
            <v-list-tile
                v-for="(category, i) in categories"
                :key="i"
                :to="`/category/${category.slug}`"
                router
            >
                <v-list-tile-content>
                    <v-list-tile-title v-text="category.name"/>
                </v-list-tile-content>
            </v-list-tile>
        </v-list>
    </v-navigation-drawer>
</template>
<script>
    import {mapGetters} from 'vuex'

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
            miniVariant: {
                type: Boolean,
                default: false
            }
        },

        computed: {
            ...mapGetters({
                categories: 'categories/getCategories'
            }),
        },
    }
</script>
