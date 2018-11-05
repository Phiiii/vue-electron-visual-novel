<template>
  <div class="about">
    <h1>This is an about page</h1>
    <button @click="INCREMENT_MAIN_COUNTER">Increment</button>
    <p>{{main}}</p>
    <p>{{double}}</p>
    <button @click="log">Log</button>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { createNamespacedHelpers } from 'vuex';
const {
  mapMutations: mapCounterMutations,
  mapState: mapCounterState,
  mapGetters: mapCounterGetters
} = createNamespacedHelpers('counter');

const About = Vue.extend({
  name: 'about',
  data() {
    return {
      foo: 'foo'
    }
  },
  computed: {
    ...mapCounterState(['main']),
    ...mapCounterGetters(['double'])
  },
  methods: {
    ...mapCounterMutations(['INCREMENT_MAIN_COUNTER']),
    log() {
      console.log(this.main);
    }
  }
});

export default About;
</script>