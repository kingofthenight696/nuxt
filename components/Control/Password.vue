<template>
    <v-text-field
            v-model="password"
            :append-icon="showPassword ? 'visibility' : 'visibility_off'"
            :rules="passwordRules"
            :type="showPassword ? 'text' : 'password'"
            label="Password"
            required
            @input="passwordChanging"
            @click:append="showPassword = !showPassword"
            :error="errors.password"
            :error-message="errors.email ? errors.email[0] : ''"
    ></v-text-field>
</template>
<script>
    export default {
        data() {
            return {
                showPassword: false,
                password: '',
                passwordRules: [
                    v => !!v || 'Password is required',
                    v => (v && v.length <= 30 && v.length >= 2) || 'Password must be larger than 8 characters'
                ],
            }
        },
        methods: {
            passwordChanging() {
                this.$emit('input', this.password)
            }
        }
    }
</script>
