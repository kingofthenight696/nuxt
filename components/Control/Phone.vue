<template>
    <v-text-field
            :value="this.value"
            return-masked-value
            mask="(###)###-##-##"
            :rules="phoneRules"
            label="Phone"
            required
            @input="phoneChanged"
            :error="errors.phone"
            :error-message="errors.phone ? errors.phone[0] : ''"
    ></v-text-field>
</template>
<script>
    export default {
        props:{
            phone:{
                type: String,
                default: ''
            }
        },
        data(){
            return{
                phoneRules: [
                    v => !!v || 'Phone is required',
                    v => (v && v.length <= 14 && v.length >= 14) || 'To short phone number'
                ],
            }
        },
        methods:{
          phoneChanged(value) {
                this.$emit('input', value)
            }
        }
    }
</script>

