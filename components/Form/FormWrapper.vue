<template>
    <div>
        <v-toolbar
                color="indigo"
                dark
                v-if="isShowToolbar"
        >
            <v-toolbar-title>{{toolbarTitle}}</v-toolbar-title>
        </v-toolbar>
        <v-card>
            <v-container
                    fluid
                    grid-list-lg
            >
                <v-layout row wrap>
                    <v-flex xs12>
                        <v-form
                                v-model="valid" @submit.prevent="submit">
                            <slot></slot>
                            <v-btn @click="submit" :disabled="!valid  || !isActiveSendButton"  :loading="sending" v-if="isShowButton">submit</v-btn>
                        </v-form>
                    </v-flex>
                </v-layout>
            </v-container>
        </v-card>
    </div>
</template>
<script>
    import Name from '~/components/Control/Name.vue'

    export default {
        components: {
            Name,
        },
        props: {
            isShowToolbar: {
                type: Boolean,
                default: false
            },
            toolbarTitle: {
                type: String,
                default: ''
            },
            isShowButton: {
                type: Boolean,
                default: true
            },
            buttonTitle: {
                type: String,
                default: ''
            },
            sending:{
                type: Boolean,
                default: false
            },
            isActiveSendButton:{
                type: Boolean,
                default: true
            },
        },
        data() {
            return {
                valid: false,
            }
        },
        methods: {
            submit() {
                this.$emit('submit')
            },
        },
        watch: {
            valid: function (valid) {
                this.$emit('valid', valid);

            }
        }
    }
</script>
