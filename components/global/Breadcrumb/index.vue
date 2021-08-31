<template>
  <b-breadcrumb :items="items.length ? items : defaultItems"></b-breadcrumb>
</template>

<script lang="ts">
import { defineComponent, useRoute } from '@nuxtjs/composition-api'
import { startCase } from 'lodash';

export default defineComponent({
  props: {
    items: {
      type: Array,
      default: () => [],
    }
  },
  setup() {
    const route = useRoute();
    const getBreadcrumb = () => {
      const items = route.value.path.split('/');
      return items.map((item: any, idx: number) => {
        return {
          text: idx === 0 ? '资讯发布平台' : startCase(item),
          to: items.slice(0, idx + 1).join('/'),
        }
      })
    }
    const defaultItems = getBreadcrumb();

    return {
      defaultItems
    }
  },
})
</script>

<style lang="scss" scoped>

.breadcrumb {
  font-size: 14px;
  margin: 1rem 0;
  padding: 0;
  background: none;
  
  a {
    color: $gray;

    &:hover {
      color: $link-color;
    }
  }
  span {
    color: $primary;
  }
}
</style>