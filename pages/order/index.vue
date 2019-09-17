<template>
    <v-container>
        <v-layout>
            <v-flex xs-12>
                <h1>
                    Your order id is {{order.id}}.
                </h1>
            </v-flex>
        </v-layout>
    </v-container>
</template>
<script>
export default {
    async fetch({store, error}){

        try{
            if(store.getters['order/getOrder'].length === 0){
                store.dispatch('order/fetchLastOrder');
            }
        }catch(e){
            error(e);
        }
    },
    computed:{
        order(){
            return this.$store.getters['order/getOrder'];
        }
    }
}
</script>