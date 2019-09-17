<template>
<v-rating
:value="this.value"
@input="ratingChanged"
 class="text-xs-center"
color="yellow darken-3"
 background-color="grey darken-1"
 empty-icon="$vuetify.icons.ratingFull"
 hover/>
</template>
<script>

    export default{
        props:{
            value:{
                type: Number,
                default: 0
            }
        },
        methods:{
            ratingChanged(rating) {
                this.$emit('input', rating)
            }
        }
    }

</script>