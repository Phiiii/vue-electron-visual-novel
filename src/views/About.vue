<template>
  <div class="about">
    <h1>This is an about page</h1>
    <button @click="setScript">Add Script</button>
    <button @click="runText">Run Line</button>
    <p>{{line}}</p>
    <p>{{lineRunning}}</p>
  </div>
</template>

<script lang="ts">
import Vue from 'vue';
import { createNamespacedHelpers } from 'vuex';
import tutorialScript from '@/scripts/scripts/tutorial';

const {
  mapMutations,
  mapState,
  mapActions
} = createNamespacedHelpers('novel');

const About = Vue.extend({
  name: 'about',
  data() {
    return {
      foo: 'foo'
    }
  },
  computed: {
    ...mapState(['line', 'lineRunning'])
  },
  methods: {
    ...mapMutations(['SET_SCRIPT', 'INCREMENT']),
    ...mapActions(['runText']),
    setScript() {
      this.SET_SCRIPT(tutorialScript);
    }
  }
});

export default About;
</script>