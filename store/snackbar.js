export const state = () => ({
  snackbar:{
    message: '',
    color: 'sucess',
    timeout: 6000,
  }
});

export const getters = {
  getSnackbar (state) {
    return state.snackbar;
  }
};

export const mutations = {
  SET_SNACKBAR (state, snackbar) {
    state.snackbar = snackbar
  }
};

export const actions = {
  setSnackbar ({commit}, snackbar) {
    commit('SET_SNACKBAR',  snackbar);
  }
};
