import { computed, onMounted } from "@nuxtjs/composition-api";
import { useStore } from "~/store";
import { Options } from "~/types/options";
import { Tag } from '~/types/dictionary';

export default () => {
  
  const store = useStore();
  const dictionary = computed( () => store.state.dictionary )

  const getDictOptions = (item: keyof typeof dictionary.value.list): Options[] => {
    const dictItem = dictionary.value.list[item];
    return dictItem?.tags ? dictItem.tags.map((tag: Tag) => ({
      text: tag.description,
      value: tag.id
    })) : []
  }

  const getDictTitle = (item: keyof typeof dictionary.value.list): string => {
    const dictItem = dictionary.value.list[item] || {};
    return dictItem?.description ?? '';
  }
  const getDictLabelById = computed( () => store.getters['dictionary/getDictLabelById'] )

  onMounted(() => {
    store.dispatch('dictionary/getDictionary');
  })

  return {
    getDictOptions,
    getDictTitle,
    getDictLabelById,
  }
}