export const state = () => ({
    cart: {
        'total_quantity': 0,
        'total_price': 0,
        'cart_items': [],
        'contacts': {
            'name': 'ыы',
            'email': 'email',
            'phone': 'phone',
            'city_id': undefined,
        },
        'shipping': {
            'delivery_id': undefined,
            'department_id': undefined,
        },
    },
});
export const getters = ({
    getCart(state) {
        return state.cart;
    },
    getCartItems(state) {
        return state.cart.cart_items;
    },
    getContacts(state) {
        return state.cart.contacts;
    },
    getContactName(state) {
        return (state.cart.contacts == null) ? '' : state.cart.contacts.name;//(Object.keys(state.cart.contacts).length !== 0) ? state.cart.contacts.name : '';
    },
    getContactEmail(state) {
        return (state.cart.contacts == null) ? '' : state.cart.contacts.email;//(Object.keys(state.cart.contacts).length !== 0) ? state.cart.contacts.email : '';
    },
    getContactPhone(state) {
        return (state.cart.contacts == null) ? '' : state.cart.contacts.phone;//(Object.keys(state.cart.contacts).length !== 0) ? state.cart.contacts.phone : '';
    },
    getContactCity(state) {
        return (state.cart.contacts == null) ? undefined : state.cart.contacts.city_id;//(Object.keys(state.cart.contacts).length !== 0) ? state.cart.contacts.city_id : '';
    },
    getActiveDelivery(state) {
        return state.cart.shipping.delivery_id;//(Object.keys(state.cart.contacts).length !== 0) ? state.cart.contacts.city_id : '';
    },
    getActiveDepartment(state) {
        return state.cart.shipping.department_id;//(Object.keys(state.cart.contacts).length !== 0) ? state.cart.contacts.city_id : '';
    },
    getShipping(state) {
        return state.cart.shipping
    },
    
});
export const mutations = ({
    SET_CART(state, cart) {
        state.cart.total_quantity = cart.total_quantity;
        state.cart.total_price = cart.total_price;
        state.cart.cart_items = cart.cart_items;
        if (cart.contacts != null) {
            state.cart.contacts = cart.contacts;
        }
        if (cart.shipping != null) {
            state.cart.shipping = cart.shipping;
        }
    },
    SET_CONTACT_NAME(state, name) {
        state.cart.contacts.name = name;
    },
    SET_CONTACT_EMAIL(state, email) {
        state.cart.contacts.email = email;
    },
    SET_CONTACT_PHONE(state, phone) {
        state.cart.contacts.phone = phone;
    },
    SET_CONTACT_CITY(state, city_id) {
        state.cart.contacts.city_id = city_id;
    },
    SET_CONTACTS(state, contacts) {
        if (typeof contacts != null) {
            state.cart.contacts = contacts;
        }
    },
    SET_ACTIVE_DELIVERY(state, delivery_id) {
        state.cart.shipping.delivery_id = delivery_id;
    },
    SET_ACTIVE_DEPARTMENT(state, department_id) {
        state.cart.shipping.department_id = department_id;
    }
});

export const actions = ({
    changeContactName({commit}, name) {
        commit('SET_CONTACT_NAME', name);
    },
    changeContactEmail({commit}, email) {
        commit('SET_CONTACT_EMAIL', email);
    },
    changeContactPhone({commit}, phone) {
        commit('SET_CONTACT_PHONE', phone);
    },
    changeContactCity({commit}, city_id) {
        commit('SET_CONTACT_CITY', city_id);
    },
    changeActiveDelivery({commit}, activeDelivery) {
        this.$axios.put(`/cart/delivery`,
            {delivery_id: activeDelivery},
            {withCredentials: true})
            .then(response => {
                commit('SET_CART', response.data.data);
            })
            .catch(error => {
                console.log('error, changeActiveDelivery')
            });
    },
    changeActiveDepartment({commit}, activeDepartment) {
        this.$axios.put(`/cart/department`,
            {department_id: activeDepartment},
            {withCredentials: true})
            .then(response => {
                commit('SET_CART', response.data.data);
            })
            .catch(error => {
                console.log('error, changeActiveDepartment')
            });
    },
    addContacts({commit, dispatch}, contacts) {
        this.$axios.put('/cart/contact', contacts,
            {withCredentials: true}
        )
            .then(response => {
                commit('SET_CART', response.data.data);
                commit('SET_CONTACTS', response.data.data.contacts);
            })
            .catch(error => {
                console.log('error, addContacts', error)
            });
    },
    addToCart({commit}, product) {
        this.$axios.post('/cart', {
                'product_id': product.id,
            },
            {withCredentials: true}
        )
            .then(response => {
                commit('SET_CART', response.data.data);
            })
            .catch(error => {
                console.log('error, addToCart', error)
            });
    },
    changeProductQty({commit}, cartItem) {
        this.$axios.post('/cart', cartItem,
            {withCredentials: true})
            .then(response => {
                commit('SET_CART', response.data.data);
            })
            .catch(error => {
                console.log('error, changeProductQty')
            });
    },
    removeProduct({commit}, rowId) {
        this.$axios.delete(`/cart/${rowId}`,
            {withCredentials: true})
            .then(response => {
                commit('SET_CART', response.data.data);
            })
            .catch(error => {
                console.log('error, removeProduct')
            });
    },
    async fetchCartItems({commit}) {
        await this.$axios.get('/cart',
            {withCredentials: true}
        )
            .then(response => {
                commit('SET_CART', response.data.data);
                
            })
            .catch(error => {
                console.log('carts error', error);
            });
    },
    
});
