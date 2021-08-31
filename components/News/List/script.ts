import { computed, defineComponent, onMounted, ref } from '@nuxtjs/composition-api';
import { tableColumns } from './config';
import { useStore } from '~/store';
import { toDateString } from '~/utils/presenter/date';
import useDictionary from '~/hooks/useDictionary';

export default defineComponent({
  setup() {
    const store = useStore();
    const { getDictLabelById } = useDictionary();
    const rowData = computed( () => store.state.news.list.pageDatas )

    onMounted(() => {
      store.dispatch('news/getNewsList');
    })
    
    return {
      rowData,
      tableColumns,
      getDictLabelById,
      toDateString,
      test: (data) => console.log(111, data)
    }
  },
})