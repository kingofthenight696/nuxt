<template>
  <v-snackbar v-model="show"
              color="success"
              :bottom="y === 'bottom'"
              :left="x === 'left'"
              :right="x === 'right'"
              :timeout="timeout"
              :top="y === 'top'"
              :vertical="mode === 'vertical'">

    {{message}}
    <v-btn
        dark
        flat
        @click.native="show = false">
      Close
    </v-btn>

  </v-snackbar>
</template>
<script>
  import {mapActions, mapGetters} from 'vuex'
  export default {
    data () {
      return {
        show: false,
        message: '',
        color: '',


        y: 'top',
        x: 'right',
        mode: 'multi-line',
        timeout: 6000
      }
    },
    computed:{
      ...mapGetters({
        snackbar: 'snackbar/getSnackbar'
      }),
    },
    methods:{
      ...mapActions({
        setSnackbar: 'snackbar/setSnackbar'
      })
    },
    watch:{
      snackbar(snackbarData){
        if (snackbarData.active !== false) {
          this.show = true;
          let {message, color} = snackbarData;
          this.message = message;
          this.color = color;
          this.setSnackbar({active: false})
        }

      }
    }
  }
</script>
