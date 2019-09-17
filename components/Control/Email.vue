<template>
    <v-text-field
            :value="this.value"
            :rules="emailRules"
            label="E-mail"
            required
            @input="emailChanged"
            :error="errors.email"
            :error-message="errors.email ? errors.email[0] : ''"
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
                emailRules: [
                    v => !!v || 'E-mail is required',
                    v => /.+@.+/.test(v) || 'E-mail must be valid'
                ],
            }
        },
        methods:{
            emailChanged(value) {
                this.$emit('input', value)
            },
        }
    }
</script>
