<template>
    <v-app dark>
        <Header
                :needActions="false"
                :title=title
        />
        <v-content>
            <v-container>
                <nuxt />
            </v-container>
        </v-content>
    </v-app>
</template>

<script>
    import Header from '../components/Partials/Header';
    import Footer from '../components/Partials/Footer';

    export default {
        components: {
            Header,
            Footer,
        },
        data() {
            return {
                title: 'Vuetify.js'
            }
        },
    }
</script>