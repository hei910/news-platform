import { ref, defineComponent } from '@nuxtjs/composition-api';
import mammoth from 'mammoth-styled';
import pdf from 'vue-pdf';
import { formKeyMap, formValMap } from './config';
import { NewsReq } from '~/types/news';

type MetaData = Partial<NewsReq>;


export default defineComponent({
  setup(_, { emit }) {
    const fileInputRef = ref<any>(null);
    const metaData = ref<MetaData>({});
    const pdfObj = ref<any>({});

    const getFormKey = (key: string): string => {
      return formKeyMap[key] || key.toLowerCase().replace(' ', '');
    }

    const getFormVal = (key: string, val: string): any => {
      return formValMap[key] ? formValMap[key](val) : val;
    }

    const transformDocument = mammoth.transforms.paragraph((el: any) => {
      // console.log(111, 'el', el)
      // if (el.styleName === 'Metadata') {
      //   const str: string = el.children.map((run: any) => run.children[0].value).join('');
      //   const [id, ...val] = str.split(':');
      //   const key = id.toLowerCase() as keyof IMetaData
      //   metaData[key] = val.join(':');
      // }

      // Grab metadata by #___# notation
      const str: string = el.children.map((run: any) => run.children?.[0].value).join('');
      const regex = /#.*?#/g;
      const match = str.match(regex)?.[0];
      if (match) {
        if (match !== '#Content#') {
          const key = match.replaceAll('#', '');
          const val = str.replace(match, '').trim();
          if (val) {
            const formKey = getFormKey(key);
            const formVal = getFormVal(formKey, val);
            metaData.value = {
              ...metaData.value,
              [formKey]: formVal,
            }
          }
        }
        el.children = [];
      }
      return el;
    })
    const handlePdf = (file: File) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = (ev: ProgressEvent<FileReader>): void => {
        const dataUrl = ev.target?.result; 
        const src = pdf.createLoadingTask(dataUrl);
        src.promise.then(function(pdf: any) {
          const { numPages: total } = pdf;
          emit('pdfUpload', {
            src,
            total,
            current: 1,
          });
        });
      }
    }
    const handleDoc = (file: File) => {
      const reader = new FileReader();
      reader.readAsArrayBuffer(file);
      reader.onload = (ev: ProgressEvent<FileReader>): void => {
        const arrayBuffer = ev.target?.result as ArrayBuffer;  
        if (arrayBuffer) {
          const options = {
            styleMap: [
              "p[style-name='Metadata'] => !",
            ]
          };
          mammoth.convertToHtml({arrayBuffer}, { ...options, transformDocument }).then((result: any) => {
            emit('docUpload', {
              content: result.value.replace(/\\/,''), 
              ...metaData.value
            });
          });
        }
      }
    }
    const onFileUpload = ({ target }: { target: HTMLInputElement }) => {
      const file = target.files?.[0];
      if (file) {
        const isPdf = file.type === 'application/pdf';
        isPdf ? handlePdf(file) : handleDoc(file);
      }
    }
    const onClick = () => {
      if (fileInputRef.value) fileInputRef.value.$refs.input.click();
    }
    return {
      onFileUpload,
      onClick,
      fileInputRef
    }
  },
})
