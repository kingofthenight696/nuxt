<template>
    <v-card dark color="dark">
        <v-card-title class="pb-0">
            {{comment.user.name}}
            <v-divider
                    class="mx-3"
                    inset
                    vertical
            ></v-divider>
            <v-rating
                    :value="comment.rating"
                    readonly
                    color="yellow darken-3"
                    background-color="grey darken-1"
                    empty-icon="$vuetify.icons.ratingFull"
                    half-increments
                    :small="true"
            >
            </v-rating>
        </v-card-title >
        <v-card-text >
            {{comment.comment}}
        </v-card-text>
    </v-card>
</template>
<script>
    export default {
        props:{
            comment:{
                user: {
                    name: {
                        type: String
                    }
                },
                comment:{
                    type: String
                },
                rating:{
                    type: Number
                },
                type: Object,
                required: true
            },
        }
    }
</script>
