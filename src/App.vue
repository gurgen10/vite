<script>

import { defineComponent, onMounted, watch } from "vue";
import { useI18n } from "vue-i18n";
import Test from "./components/Test.vue"
import Header from "./components/Header.vue"


export default defineComponent({
  name: "app",
  components: {
    Header,
    Test,
  },
  data() {
    return {};
  },

  setup() {
    // use global scope
    const { t, locale } = useI18n()
    return { t, locale }
  },
});
</script>

<template>
  <div class="container mx-auto p-4 text-center">
    <Header/>
    
    <h1 class="mt-6 text-2xl font-bold underline text-red-600">
      {{t('hello')}}
    </h1>
  <Test/>
  </div>
</template>

<style scoped>


</style>
