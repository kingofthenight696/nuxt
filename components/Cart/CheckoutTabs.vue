<template>
    <div>
        <v-tabs
                v-model="model"
                centered

        >
            <v-tab
                    :href="`#tab-${1}`"
            >
                I am a new user
            </v-tab>
            <v-tab
                    :href="`#tab-${2}`"
            >
                I have a user account
            </v-tab>
        </v-tabs>
        <v-tabs-items v-model="model">
            <v-tab-item
                    :value="`tab-${1}`"
            >
                <checkout-order-form/>
            </v-tab-item>
            <v-tab-item
                    :value="`tab-${2}`"
            >
                <login-form
                    :redirect="redirect"
                    :isShowToolbar="false"
                />
            </v-tab-item>
        </v-tabs-items>
    </div>
</template>
<script>
    import CheckoutOrderForm from '~/components/Form/CheckoutOrderForm.vue'
    import LoginForm from '~/components/Form/LoginForm.vue'

    export default {
        components: {
            CheckoutOrderForm,
            LoginForm
        },
        data() {
            return {
                model: 'tab-1',
                redirect : this.$route.path
            }
        },
    }
</script>