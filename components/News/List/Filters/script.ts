import { computed, defineComponent } from '@nuxtjs/composition-api'
import useDictionary from '~/hooks/useDictionary'
import useForm from '~/hooks/useForm';
import { News } from '~/types/news';

const initForm = (): Partial<News> => ({
})
const initFormHelper = (): Record<string, unknown> => ({
})

const dateRangeOptions = [
  { text: '当天', value: 1,},
  { text: '近一周', value: 2,},
  { text: '近一月', value: 3,},
  { text: '近三月', value: 4,},
  { text: '近六月', value: 5,}
]

export default defineComponent({
  setup(_, { emit } ) {
    const form = useForm(initForm());
    const formHelper = useForm(initFormHelper());
    const { getDictOptions, getDictLabelById } = useDictionary();

    const newsTypeOptions = computed(() => getDictOptions('info_type'));
    const newsTypeLabel = computed(() => getDictLabelById.value('info_type', form.data.value.newsType) || '-- 文章类型 --');

    const resetFilter = () => {
      form.data.value = initForm();
      emit('resetFilter');
    }

    const onFilterChange = <T = any>(type: string, val: T) => {
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
      resetFilter,
      onFilterChange,
    }
  },
})
