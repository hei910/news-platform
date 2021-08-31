import { computed, defineComponent, reactive } from '@nuxtjs/composition-api'
import useDictionary from '~/hooks/useDictionary'

interface Form {
  keywords: string,
  newsType: number | null,
  from: string,
  to: string,
  [propName: string]: any,
}
interface FormHelper {
  dateRange: number | null,
}
const initFormValue: Form = {
  keywords: '',
  newsType: 1,
  from: '',
  to: '',
}
const initFormHelper: FormHelper = {
  dateRange: null,
}
const dateRangeOptions = [
  { text: '当天', value: 1,},
  { text: '近一周', value: 2,},
  { text: '近一月', value: 3,},
  { text: '近三月', value: 4,},
  { text: '近六月', value: 5,}
]
export default defineComponent({
  setup(_, { emit } ) {
    const form = reactive(initFormValue)
    const formHelper = reactive(initFormHelper)
    const { getDictOptions, getDictLabelById } = useDictionary();

    const newsTypeOptions = computed(() => getDictOptions('info_type'));
    const newsTypeLabel = computed(() => getDictLabelById.value('info_type', form.newsType) || '-- 文章类型 --');

    const onFilterChange = <T = any>(type: string, val: T): void => {
      emit('onFilterChange', {type, val});
    }
    return {
      form,
      formHelper,
      getDictOptions,
      getDictLabelById,
      dateRangeOptions,
      newsTypeLabel,
      newsTypeOptions,
      onFilterChange,
      test: (data: any) => console.log(111, data.toString(), data)
    }
  },
})
