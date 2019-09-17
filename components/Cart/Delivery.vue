<template>
    <div>


            <v-radio-group
                            @change="changeActiveDelivery"
                            :value="deliveryGetter"
                            :rules="[v => !!v || 'Item is required']"
            >
              <div
                v-for="( delivery, i) in deliveries"
                :key="i">
                <v-radio
                        :label="delivery.name"
                        :value="delivery.id"
                ></v-radio>

                <div v-if="deliveryGetter === delivery.id">
                    <v-select
                            :value="activeDepartment"
                            @input="changeActiveDepartment"
                            :items="delivery.departments"
                            item-text="full_address"
                            item-value="id"
                            label="Delivery departments"
                    ></v-select>
                    <v-textarea
                            label="Delivery department contacts"
                            value="The Woodman set to work at once, and so sharp was his axe that the tree was soon chopped nearly through."
                            hint="Hint text"
                    ></v-textarea>
                </div>
              </div>
            </v-radio-group>
    </div>
</template>
<script>
  //TODO add departments by default
    import {mapActions, mapGetters} from 'vuex'
    export default {
        props: {
            city: {
                type: Number,
                default: null
            }
        },
        data() {
            return {
            }
        },
        methods: {
            ...mapActions({
                changeActiveDepartment: 'cart/changeActiveDepartment',
                changeActiveDelivery: 'cart/changeActiveDelivery',
            }),
        },
        computed: {
          deliveryGetter(){
            return this.activeDelivery
          },
          departmentGetter(){
              return this.activeDelivery
          },
          selectedDepartment(){
            return
          },
            ...mapGetters({
                deliveries: 'checkout/getDeliveries',
                activeDepartment: 'cart/getActiveDepartment',
                activeDelivery: 'cart/getActiveDelivery',
            }),
        },
    }
</script>
<style>
    .v-input__control {
        width: 100% !important
    }
    .v-label {
        width: 100% !important
    }
</style>
