<template>
 <button @click="count++" class="mt-5 text-green-900 hover:text-blue-300">{{ $t('count',  { count }) }} </button>

 
  
</template>

<script setup>
import { ref } from 'vue'
// import { useI18n } from 'vue-i18n'

const count = ref(0)

// // use local scope
// const { t } = useI18n({
//   // `locale` inherit from global scope
//   inheritLocale: true
// })
</script>

