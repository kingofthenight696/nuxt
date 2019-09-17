<template>
    <v-text-field
            :min="1"
            v-model="quantity"
            type="number"
            label="Number"
            readable
            :rules="rules"
            append-outer-icon="add_circle"
            @click:append-outer="incrementQty"
            :prepend-icon="(quantity === 1) ? undefined : 'remove_circle'"
            @click:prepend="decrementQty"
            @input="input"
    >
    </v-text-field>

</template>
<script>
export default {
    props:{
        qty:{
            type: Number,
            default: 1
        },
    },
    data () {
        return {
            quantity: this.qty,
            rules: [
                v => !!v || 'Quantity is required',
                v =>  /[\d\.]+/i.test(v) || 'Quantity must be number'
            ],
        }
    },
    methods: {
        incrementQty () {
            this.$emit('input', ++this.quantity);
        },
        decrementQty () {
            this.$emit('input', --this.quantity);
        },
        input(quantity){
            this.$emit('input', quantity);
        }
    },
}
</script>
<style>
    .v-input__control{
        min-width: 60px;
    }
</style>
