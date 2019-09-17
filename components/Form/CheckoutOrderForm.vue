<template>

    <Form
            :isShowToolbar="false"
            :toolbarTitle="formTitle"
            :isShowButton="true"
            :buttonTitle="formTitle"
            @valid="valid"
            @submit="onSubmit()"
    >
        <Name
               :value="contactName"
               @input="changeContactName"
        />
        <!--<Email-->
        <!--:value="contactEmail"-->
                <!--@input="changeContactEmail"-->
        <!--/>-->
        <!--<Phone-->
        <!--:value="contactPhone"-->
                <!--@input="changeContactPhone"-->
        <!--/>-->
        <v-select
                @input="loadDeliveries"
                :value="getSelectedCity"
                :items="cities"
                item-text="name"
                item-value="id"
                :rules="[(v) => !!v || 'Item is required']"
                required
                label="City"
        ></v-select>
    </Form>
</template>
<script>
    import {mapActions, mapGetters} from 'vuex';
    import Name from '~/components/Control/Name.vue'
    import Phone from '~/components/Control/Phone.vue'
    import Email from '~/components/Control/Email.vue'
    import Form from '~/components/Form/FormWrapper.vue'

    export default {
        components: {
            Name,
            Email,
            Phone,
            Form,
        },
        data() {
            return {
                formTitle: 'Continue',
            }
        },
        methods: {
            changeContactName1(val){
                console.log(val);
            },
            ...mapActions({
                changeContactName: 'cart/changeContactName',
                changeContactEmail: 'cart/changeContactEmail',
                changeContactPhone: 'cart/changeContactPhone',
                changeContactCity: 'cart/changeContactCity',
                addContacts: 'cart/addContacts',

                fetchDeliveries: 'checkout/fetchDeliveries',
                changeValidCheckoutContacts: 'checkout/changeValidCheckoutContacts',
                changeActiveStep: 'checkout/changeActiveStep',
            }),
            valid(value){
                this.changeValidCheckoutContacts(value);
            },
            onSubmit(){

                this.addContacts(this.getContacts);
                this.changeActiveStep(2);
            },
            loadDeliveries(city_id){
              let product_ids = this.cart.cart_items.map((cart_items) => {
                return cart_items.product_id });

              this.fetchDeliveries({product_ids, city_id});
              this.changeContactCity(city_id);
            },

        },
        computed: {
            getSelectedCity(){
                return this.cities.find(city => this.contactCity === city.id);
            },
            ...mapGetters({
                cart: 'cart/getCart',
                getContacts: 'cart/getContacts',
                contacts: 'cart/getContacts',
                contactName: 'cart/getContactName',
                contactEmail: 'cart/getContactEmail',
                contactPhone: 'cart/getContactPhone',
                contactCity: 'cart/getContactCity',

                cities: 'checkout/getCities',
                activeStep: 'checkout/getActiveStep',
            }),
        },
    }
</script>
