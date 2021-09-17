import { defineComponent } from '@nuxtjs/composition-api';
import useDictionary from '~/hooks/useDictionary';
import useForm from '~/hooks/useForm';

interface Form {
  platform: string,
  from: string,
  to: string,
  market: number[],
  [propName: string]: any,
}
const initForm = (): Form => ({
  platform: '',
  from: '',
  to: '',
  market: [],
})

export default defineComponent({
  setup() {
    const form = useForm(initForm())
    const { getDictOptions, getDictTitle } = useDictionary();

    const resetFilter = () => {
      form.data.value = initForm();
    }

    return {
      getDictOptions,
      getDictTitle,
      form,
      resetFilter,
    }
  },
})