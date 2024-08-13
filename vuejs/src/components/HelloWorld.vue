<template>
  <div>
    <h1>{{ message }}</h1>
  </div>
</template>

<script>
import { mapGetters } from 'vuex';
export default {
  computed: {
    ...mapGetters(['message'])
  },
  mounted() {
    this.$store.dispatch('fetchMessage');
  }
};
</script>