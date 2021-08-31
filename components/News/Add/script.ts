import { defineComponent, reactive } from '@nuxtjs/composition-api';
import { xorBy } from 'lodash';
import { newsTypeOptions, platformOptions, langOptions, frontTagsOptions, tagsOptions } from './config/selectOptions';
import { News, Stock } from '~/types/news';

interface IFormData extends News {
  [key: string]: any
}
const initFormData: Partial<IFormData> = {
  title: '',
  image: '',
  languageType: 0,
  newsType: 2,
  keywords: [],
  relatedStocks: [],
  content: '<table id="responsiveTable" style="width: 100%"><tr><td></td></tr></table>',
}

export default defineComponent({
  setup() {
    const form = reactive(initFormData);
    const formHelper = reactive({
      hasDigest: true,
    });
    const onImageInputChange = (e: string): void => {form.image = e};
    const editorConfig = {
      // toolbar: [
      //   [ 'Source', '-', 'Bold', 'Italic', 'Underline', 'Strike' ]
      // ],
      toolbarGroups: [
        { name: 'styles', groups: [ 'styles' ] },
        { name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
        { name: 'colors', groups: [ 'colors' ] },
        { name: 'paragraph', groups: [ 'list', 'indent', 'blocks', 'align' ] },
        { name: 'links', groups: [ 'links' ] },
        { name: 'insert', groups: [ 'insert' ] },
        // { name: 'document', groups: [ 'mode' ] },
      ],
      removeButtons: 'Language,CreateDiv,Smiley,SpecialChar,PageBreak,Iframe,FontSize,Font,ShowBlocks,About,Styles,Flash',
      allowedContent: true,
    }
    const toggleDigest = () => {
      formHelper.hasDigest = !formHelper.hasDigest;
    }
    const displayDropdownText = (field: string): string => {
      const dropdownList = { newsTypeOptions, platformOptions, langOptions, frontTagsOptions };
      const formField = form[field];
      const dropdown = dropdownList[(field + 'Options') as keyof typeof dropdownList];
      if (formField) {
        return dropdown.find(item => item.value === formField)?.text || '- 请选择 -'
      }
      return '- 请选择 -'
    }
    const updateFormData = (field: keyof IFormData, value: any): void => {
      if (Array.isArray(form[field])) {
        const idx = (form[field]).indexOf(value)
        idx !== -1 ? form[field].splice(idx, 1) : (form[field]).push(value);
      } else {
        form[field] = value
      }
    }
    const onWordUpload = ({html, meta}: {html: string, meta: Partial<IFormData>}) => {
      form.content = html;
      console.log(111, 'meta', meta)
      Object.keys(meta).forEach((key) => {
        if (key === 'category') {
          form.keywords = meta[key].split(', ');
        } else {
          form[key] = meta[key];
        }
      })
    }
    const onSelectedStocksChange = (items: Stock[]) => {
      form.relatedStocks = items;
    }
    const onSelectedStockItemClick = (item: Stock):void => {
      form.relatedStocks = xorBy(form.relatedStocks, [item], (item: Stock) => item.code);
    }
    return {
      form,
      formHelper,
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
      onWordUpload,
      onSelectedStocksChange,
      onSelectedStockItemClick
    }
  },
})