<template>
  <section>
    <News-List-Filters @resetFilter="onResetFilter" />
    <News-List/>
    <b-pagination align="center"/>
    <News-List-AdvancedFilters ref="advancedFilterRef"/>
  </section>
</template>

<script>
import { defineComponent, ref } from '@vue/composition-api'

export default defineComponent({
  setup() {
    const advancedFilterRef = ref(null);
    const onResetFilter = () => {
      if (advancedFilterRef) advancedFilterRef.value.resetFilter();
    }

    return {
      onResetFilter,
      advancedFilterRef
    }
  },
})
</script>
