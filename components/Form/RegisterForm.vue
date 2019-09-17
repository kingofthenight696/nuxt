<template>
    <v-container grid-list-xl text-xs-center>
        <v-layout row wrap>
            <v-flex md6 offset-md3>
                <Form
                        :isShowToolbar="true"
                        :toolbarTitle="formTitle"
                        :isNeedButton="true"
                        :buttonTitle="formTitle"
                        @submit="register"
                >
                    <template>
                        <Name
                                v-model="form.name"
                        />
                        <Phone/>
                        <Email
                                v-model="form.email"
                        />
                        <Password
                                v-model="form.password"
                        />
                    </template>
                </Form>
            </v-flex>
        </v-layout>
    </v-container>
</template>
<script>
    import Form from '~/components/Form/FormWrapper.vue'
    import Name from '~/components/Control/Name.vue'
    import Email from '~/components/Control/Email.vue'
    import Password from '~/components/Control/Password.vue'
    import Phone from '~/components/Control/Phone.vue'

    export default {
        middleware: 'guest',
        components: {
            Name,
            Email,
            Password,
            Phone,
            Form
        },
        data() {
            return {
                formTitle: 'Register',
                valid: true,
                form: {
                    name: '',
                    email: '',
                    password: ''
                },
            }
        },
        methods: {
            async register() {

                await this.$axios.post('/auth/register', this.form)
                    .then(response => {
                        this.$auth.login({data: this.form});

                        this.$router.push({
                            name: 'users.vue'
                        });
                    })
                    .catch(error => {
                        // this.errors = error;
                        // console.log(error)
                    });
            }
        },
    };
</script>
