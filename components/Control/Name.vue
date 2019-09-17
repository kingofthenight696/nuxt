<template>
    <v-text-field
            class="test"
            :value="value"
            :counter="30"
            :rules="nameRules"
            label="Name"
            required
            @input="nameChanging"
            :error="errors.name"
            :error-message="errors.name ? errors.name[0] : ''"
    ></v-text-field>
</template>
<script>
    export default {
        props:{
            value:{
                type: String,
                default: ''
            }
        },
        data(){
            return{
                nameRules: [
                    v => !!v || 'Name is required',
                    v => (v && v.length <= 30 && v.length >= 2) || 'Name must be less than 10 characters'
                ],
            }
        },
        methods:{
            nameChanging(value) {
                this.$emit('input', value)
            }
        }
    }
</script>

