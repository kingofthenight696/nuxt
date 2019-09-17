export const state = () => ({
    order: {},
});
export const getters = ({
    getOrder(state) {
        return state.order;
    },
});
export const mutations = ({
    SET_ORDER(state, order) {
        state.order = order;
    },
});

export const actions = ({
   async fetchLastOrder({commit}) {
        await this.$axios.get('/order/last')
            .then(response => {
                commit('SET_ORDER', response.data.data);
            })
            .catch((e) => {
                error({statusCode: 404, message: `You don't have any orders yet`})
            });
    }
});