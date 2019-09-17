export const state = () => ({
    product: {
        product: {},
        comments: [],
        pagination: {}
    },
});
export const getters = ({
    getProduct(state) {
        return state.product.product;
    },
    getComments(state) {
        return state.product.comments;
    },
    getCommentsPagination(state) {
        return state.product.pagination;
    },
});
export const mutations = ({
    SET_PRODUCT(state, product) {
        state.product.product = product;
    },
    SET_COMMENTS(state, comments) {
        state.product.comments = comments;
    },
    SET_COMMENTS_PAGINATION(state, pagination) {
        state.product.pagination = pagination;
    },
});

export const actions = ({
    async fetchProduct({commit}, query) {
        let {params, slug} = query;
        await this.$axios.get(`/products/${slug.slug}`, {params})
            .then(response => {

              let {product, comments} = response.data;
                commit('SET_PRODUCT', product.data);
                commit('SET_COMMENTS', comments.data);
                commit('SET_COMMENTS_PAGINATION', comments.meta );
            })
            .catch((e) => {
                error({statusCode: 404, message: 'Post not found'})
            });
    },
    async fetchComments({commit}, params) {

        await this.$axios.get('/comments', {params} )
            .then(response => {

              let {data, meta} = response.data;
                commit('SET_COMMENTS', data);
                commit('SET_COMMENTS_PAGINATION', meta );
            })
            .catch((e) => {
                error({statusCode: 404, message: 'Post not found'})
            });
    }
});
