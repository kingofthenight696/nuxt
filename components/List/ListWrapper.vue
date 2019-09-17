<template>
    <v-layout row wrap>
        <v-flex
            :class="greedClasses"
            v-for="(item, n) in list"
            :key="n"
        >
          <slot name="item" v-bind:item="item"></slot>
        </v-flex>
    </v-layout>
</template>
<script>
  export default {
    props: {
      list:{
        type: Array,
        default: []
      },
      greedClasses:{
        type: Array,
        default: []
      }
    }
  };
</script>
