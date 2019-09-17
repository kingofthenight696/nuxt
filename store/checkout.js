export const state = () => ({
  checkout: {
    'validCheckoutContacts': false,
    'activeStep': 1,
    'activeDepartment': null,
    'deliveries': [],
    'cities': [],
  }
});
export const getters = ({
  getDeliveries(state) {
    return state.checkout.deliveries;
  },
  activeDelivery(state) {
    return state.checkout.cities;
  },
  getCities(state) {
    return state.checkout.cities;
  },
  getActiveStep(state) {
    return state.checkout.activeStep;
  },
  getValidCheckoutContacts(state) {
    return state.checkout.validCheckoutContacts;
  },

});
export const mutations = ({
  SET_DELIVERIES(state, deliveries) {
    state.checkout.deliveries = deliveries;
  },
  SET_CITIES(state, cities) {
    state.checkout.cities = cities;
  },
  SET_ACTIVE_STEP(state, activeStep) {
    state.checkout.activeStep = activeStep;
  },
  SET_VALID_CHECKOUT_CONTACTS(state, validCheckoutContacts) {
    state.checkout.validCheckoutContacts = validCheckoutContacts;
  },
  SET_ACTIVE_DEPARTMENT(state, activeDepartment) {
    state.checkout.activeDepartment = activeDepartment;
  },
});

export const actions = ({

  changeActiveStep({commit, state}, activeStep) {
    commit('SET_ACTIVE_STEP', activeStep);
  },
  changeValidCheckoutContacts({commit}, validCheckoutContacts) {
    commit('SET_VALID_CHECKOUT_CONTACTS', validCheckoutContacts);
  },

  async fetchDeliveries({commit}, parameters) {

    await this.$axios.get('/deliveries-departments', {
        params: parameters
      },
      {withCredentials: true}
    )
      .then(response => {
        commit('SET_DELIVERIES', response.data.data);
      })
      .catch(error => {
        console.log('delivery error', error);
      });
  },

  async fetchCities({commit}) {

    await this.$axios.get(`/cities`)
      .then(response => {
        commit('SET_CITIES', response.data.data);
      })
      .catch(error => {
        console.log('city error', error);
      });
  },
});
