export const state = () => ({
    categories: {
        'categories': [],
    },
});
export const getters = ({
    getCategories(state) {

        return state.categories.categories;
    },
});
export const mutations = ({
    SET_CATEGORIES(state, categories) {
        state.categories.categories = categories;
    },
});

export const actions = ({
    async setCategories({commit}) {
        await this.$axios.get('/categories')
            .then(response => {
                commit('SET_CATEGORIES', response.data.data);
            })
            .catch(error => {
                console.log('carts error', error);
            });
    },

});