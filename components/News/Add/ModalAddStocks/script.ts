import { defineComponent, ref, nextTick, watch, toRefs, computed } from '@nuxtjs/composition-api';
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
    const tableRef = ref(null);
    const selected = ref<Stock[]>([]);
    const pager = ref({
      page: 1,
      pageSize: 10,
      total: rowData.value.length,
    })
    
    watch(relatedStocks, (newStocks) => {
      selected.value = newStocks;
    })

    const onRowSelected = (items: Stock[]):void => {
      selected.value = items;
      nextTick(stockChange)
    }
    const onSelectedItemClick = (item: Stock):void => {
      console.log(111, 'tableRef', tableRef)
      selected.value = xorBy(selected.value, [item], (item: Stock) => item.code);
      nextTick(stockChange)
    }
    const stockChange = () => {
      emit('stockChange', selected.value)
    }
    const onTableRefreshed = () => {
      alert(111)
    }
    const onClose = () => {
      selected.value = [];
    }
    return {
      rowData,
      tableColumns,
      martketOptions,
      pager,
      tableRef,
      selected,
      onRowSelected,
      onSelectedItemClick,
      onTableRefreshed,
      onClose,
    }
  }
})