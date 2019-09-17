<template>
<v-textarea
:value="this.value"
:rules="rules"
@input="input"
name="input-7-1"
box
label="Comment"
 auto-grow
 ></v-textarea>
</template>
<script>
    export default{
        props:{
          value:{
                type: String,
                default: ''
            }
        },
        data(){
            return{
                rules: [
                    v => !!v || 'Field is required',
                    v => (v && v.length <= 100 && v.length >= 5) || 'Field must be less than 5 characters'
                ],

            }
        },
        methods:{
            input(value) {
                this.$emit('input', value)
            }
        },
    }
</script>
