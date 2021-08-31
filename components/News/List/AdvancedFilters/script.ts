import { defineComponent, reactive } from '@nuxtjs/composition-api';
import useDictionary from '~/hooks/useDictionary';

interface FilterForm {
  platform: string,
  from: string,
  to: string,
  [propName: string]: any,
}
const initFormValue: FilterForm = {
  platform: '',
  from: '',
  to: '',
}

export default defineComponent({
  setup() {
    const form = reactive(initFormValue)
    const { getDictOptions, getDictTitle } = useDictionary();

    return {
      getDictOptions,
      getDictTitle,
      form,
    }
  },
})