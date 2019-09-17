<template>
  <v-app dark>
    <SideBar
            :miniVariant=miniVariant
            :drawer=drawer
    />
    <Header
            :title=title
            :miniVariant=miniVariant
            :drawer=drawer
            @toggleMenu="changeMenuState"
    />
    <custom-snackbar/>
    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
  </v-app>

</template>

<script>
  import Header from '../components/Partials/Header';
  import SideBar from '../components/Partials/SideBar';
  import Footer from '../components/Partials/Footer';
  import CustomSnackbar from "~/components/Control/CustomSnackbar";
  export default {
    components: {
      Header,
      SideBar,
      Footer,
      CustomSnackbar,
    },
    data() {
      return {
        clipped: true,
        drawer: false,
        fixed: false,

        miniVariant: false,
        right: true,
        title: 'Vuetify.js'
      }
    },
    methods: {
      changeMenuState(drawer) {
        this.drawer = !drawer
      }
    },
    computed: {}
  }
</script>
