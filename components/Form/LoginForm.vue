<template>
        <Form
                :isShowToolbar="isShowToolbar"
                :toolbarTitle="formTitle"
                :isShowButton="true"
                :buttonTitle="formTitle"
                @submit="login"
        >
            <template>
                <Email
                        v-model="form.email"
                />
                <Password
                        v-model="form.password"
                />
            </template>
        </Form>
</template>
<script>
    import Form from '~/components/Form/FormWrapper.vue'
    import Email from '~/components/Control/Email.vue'
    import Password from '~/components/Control/Password.vue'

    export default {
        middleware: 'guest',
        props:{
          redirect:{
              type: String,
              default: '/',
          },
            isShowToolbar:{
                type: Boolean,
                default: true,
            }
        },
        components: {
            Email,
            Password,
            Form
        },
        data() {
            return {
                formTitle: 'Login',
                form: {
                    email: '',
                    password: ''
                },
            }
        },
        methods: {
            async login() {

                await this.$axios.post('/auth/login', this.form)
                    .then(response => {
                        this.$auth.login({data: this.form});

                        this.$router.push(this.$route.query.redirect ? this.$route.redirect : this.redirect);
                    })
                    .catch(error => {
                        console.log(error)
                    });
            },
        }
    };
</script>
