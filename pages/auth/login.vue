<template>
    <v-container grid-list-xl text-xs-center>
        <v-layout row wrap>
            <v-flex md6 offset-md3>
                <login
                :redirect="redirect"
                />
            </v-flex>
        </v-layout>
    </v-container>
</template>

<script>
    import Login from '~/components/Form/LoginForm.vue'

    export default {
        components: {
            login: Login
        },
        data(){
            return {
                redirect : '/'
            }
        }
    }
</script>