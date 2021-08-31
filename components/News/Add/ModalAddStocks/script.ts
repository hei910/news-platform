import { defineComponent, ref, nextTick, watch, toRefs } from '@nuxtjs/composition-api';
import { xorBy } from 'lodash';
import { data, martketOptions } from './dummyData';
import { tableColumns } from './config';
import { Stock } from '~/types/news';

export default defineComponent({
  props: {
    show: {
      type: Boolean,
      default: false,
    },
    relatedStocks: {
      type: Array as () => Array<Stock>,
      default: () => [],
    }
  },
  setup(props, { emit }) {
    const { relatedStocks } = toRefs(props);
    const rowData = ref(data.pageDatas)
    const selected = ref<Stock[]>([]);
    const onRowSelected = (items: Stock[]):void => {
      selected.value = items;
      nextTick(selectedStocksChange)
    }
    const onSelectedItemClick = (item: Stock):void => {
      selected.value = xorBy(selected.value, [item], (item: Stock) => item.code);
      nextTick(selectedStocksChange)
    }
    const selectedStocksChange = () => {
      emit('selectedStocksChange', selected.value)
    }
    watch(relatedStocks, (newStocks) => {
      selected.value = newStocks;
    })
    return {
      rowData,
      tableColumns,
      martketOptions,
      selected,
      onRowSelected,
      onSelectedItemClick
    }
  }
})