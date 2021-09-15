import { defineComponent, onUpdated, reactive, ref, watch, computed } from '@nuxtjs/composition-api';
import { xor, cloneDeep } from 'lodash';
import { newsTypeOptions, platformOptions, langOptions, frontTagsOptions, tagsOptions } from './config/selectOptions';
import { editorConfig } from './config';
import { NewsReq, Stock } from '~/types/news';

type FormData = Partial<NewsReq>;
type FormHelper = {
  hasDigest: boolean,
  relatedStocks: Stock[],
}

const initFormData = (): FormData => ({
  // title: '',
  // image: '',
  // languageType: 0,
  // newsType: 1,
  // keywordsList: [],
  // relatedStocks: [],
  // content: '',
  // content: '<table id="responsiveTable" style="width: 100%"><tr><td></td></tr></table>',
})

const initFormHlper = (): FormHelper => ({
  hasDigest: true,
  relatedStocks: [],
})

const initPdfData = () => ({src: null, current: 0, total: 0});

export default defineComponent({
  setup() {
    const form = ref(initFormData());
    const formHelper = ref(initFormHlper());
    const pdfData = ref(initPdfData());
    onUpdated(() => {
      console.log(111, 'updated')
    });
    // watch(() => cloneDeep(formHelper.value), (curr, old) => {
    //   if (curr.relatedStocks !== old.relatedStocks) {
    //     form.value.relatedStocks = curr.relatedStocks.map(item => item.code)
    //   }
    // })
    watch(() => formHelper.value.relatedStocks, (relatedStocks) => {
      form.value.relatedStocks = relatedStocks.map(item => item.code)
    })
    watch(() => form.value.source, (source) => {
      if (source) form.value.isOriginal = true;
    })
    const onImageInputChange = (e: string) => {form.value = {...form.value, image: e}};
    const toggleDigest = () => {
      formHelper.value.hasDigest = !formHelper.value.hasDigest;
    }
    const displayDropdownText = (field: keyof FormData): string => {
      const dropdownList = { newsTypeOptions, platformOptions, langOptions, frontTagsOptions };
      const formField = form.value[field];
      const dropdown = dropdownList[(field + 'Options') as keyof typeof dropdownList];
      if (formField) {
        return dropdown.find(item => item.value === formField)?.text || '- 请选择 -'
      }
      return '- 请选择 -'
    }
    const updateFormData = (key: keyof FormData, value: any) => {
      if (Array.isArray(form.value[key]) && !Array.isArray(value)) {
        const idx = (form.value[key] as any[])?.indexOf(value)
        idx !== -1 
          ? (form.value[key] as any[]).splice(idx, 1) 
          : (form.value[key] as any[]).push(value);
      } else {
        form.value = {...form.value, [key]: value}
      }
    }
    const onDocUpload = (meta: FormData) => {
      form.value = {
        ...form.value,
        ...meta
      }
    }
    const onPdfUpload = (pdf: {src: any, total: number, current: number}) => {
      pdfData.value = pdf;
    } 
    const onStockChange = (stocks: Stock[]) => {
      formHelper.value.relatedStocks = stocks;
      // updateFormData('relatedStocks', stocks)
    }
    const onSelectedStockItemClick = (stock: string):void => {
      form.value.relatedStocks = xor(form.value.relatedStocks, [stock]);
    }
    const switchToTextEditor = () => {
      pdfData.value = initPdfData();
    }
    return {
      form,
      formHelper,
      pdfData,
      newsTypeOptions, 
      platformOptions, 
      langOptions, 
      frontTagsOptions,
      tagsOptions,
      editorConfig,
      onImageInputChange,
      toggleDigest,
      displayDropdownText,
      updateFormData,
      onDocUpload,
      onPdfUpload,
      onSelectedStockItemClick,
      onStockChange,
      switchToTextEditor
    }
  },
})