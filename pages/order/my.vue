<template>
    <div>
        <div class="text-xs-center mb-3"></div>
        <v-expansion-panel
                expand
        >
            <v-expansion-panel-content
              v-for="(order,i) in orders"
              :key="i"
            >
              <div slot="header">Order #{{order.id}} {{order.created_at.date}} <v-spacer/>{{order.order_status}}</div>
              <v-container>
                  <v-layout>
                    <v-flex xs-8>
                      <v-data-table
                        :headers="headers"
                        :items="order.item"
                        hide-actions
                      >
                        <template v-slot:items="props">
                          <td>
                            <v-img
                              :src="props.item.preview"
                              aspect-ratio="3"
                              :alt=" props.item.title "
                            ></v-img>
                          </td>
                          <td class="text-xs-center">{{ props.item.title }}</td>
                          <td class="justify-center">
                            {{props.item.quantity}}
                          </td>
                          <td class="text-xs-center">{{ printPrice(props.item) }}</td>
                        </template>

                      </v-data-table>
                      <v-toolbar flat class="mt-2">
                        <v-spacer></v-spacer>
                        <v-toolbar-title >Delivery price: $ {{order.full_shipment.price}}</v-toolbar-title>
                        <v-toolbar-title>Total: $ {{order.total_price}}</v-toolbar-title>
                      </v-toolbar>
                    </v-flex>
                    <v-flex xs-4>
                      <v-card
                        class="mx-auto ml-4"
                      >
                        <v-card-text class="headline text--primary">
                          <p>Order status: <span class="text--primary">{{order.order_status}}</span></p>
                          <p>Delivery: <span class="text--primary">{{order.full_shipment.delivery.name}}</span></p>
                          <p>Department: <span class="text--primary">{{order.full_shipment.department.full_address}}</span></p>
                          <p>Phone: <span class="text--primary">{{order.full_shipment.department.phone}}</span></p>
                        </v-card-text>
                      </v-card>
                    </v-flex>
                  </v-layout>
              </v-container>
            </v-expansion-panel-content>
        </v-expansion-panel>
    </div>
</template>
<script>
    export default {
      async asyncData({params, error, $axios, route, store}) {
        let {data} = await $axios.get(`/orders`, {withCredentials: true});

        return {
          orders: data.data,

          headers: [
            {
              text: 'Preview',
              align: 'center',
              sortable: false,
              value: 'preview'
            },
            {text: 'Title', value: 'title', sortable: false, align: 'center'},
            {text: 'Qty', value: 'quantity', sortable: false, align: 'center'},
            {text: 'Price', value: 'price', sortable: false, align: 'center'},
          ],
        };
      },
      methods:{
        printPrice(item) {
          return item.price * item.quantity;
        },
        shippingPrice() {
          return (this.cart.shipping) ? this.cart.shipping.price : undefined;
        },
        totalPrice() {
          return this.cart.total_price;
        },
      }
    }
</script>
