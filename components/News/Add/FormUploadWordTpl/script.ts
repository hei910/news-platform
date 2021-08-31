import { ref, defineComponent } from '@nuxtjs/composition-api';
import mammoth from 'mammoth-styled';

type IMetaData = {
  title: string;
}

export default defineComponent({
  setup(_, { emit }) {
    const fileInput = ref<HTMLInputElement | null>(null);
    const metaData: IMetaData = {
      title: '',
    };
    const transformDocument = mammoth.transforms.paragraph((el: any) => {
      if (el.styleName === 'Metadata') {
        const str: string = el.children.map((run: any) => run.children[0].value).join('');
        const [id, ...val] = str.split(':');
        const key = id.toLowerCase() as keyof IMetaData
        metaData[key] = val.join(':');
      }
      return el;
    })
    const onFileUpload = ({ target }: { target: HTMLInputElement }) => {
      const reader = new FileReader();
      reader.onload = (ev: ProgressEvent<FileReader>): void => {
        const arrayBuffer = ev.target?.result;  
        const options = {
            styleMap: [
                "p[style-name='Metadata'] => !",
                "r[style-name='red'] => span.red",
                "r[style-name='green'] => span.green",
            ]
        };
        if (arrayBuffer) mammoth.convertToHtml({arrayBuffer}, { ...options, transformDocument }).then((result: any) => {
            emit('wordUpload', {
              html: result.value.replace(/\\/,''), 
              meta: metaData
            }); // 1: HTML, 2: Metadata
        });
      }
      if (target.files) reader.readAsArrayBuffer(target.files[0]);
    }
    const onClick = () => {
      if (fileInput.value) fileInput.value.click();
    }
    return {
      onFileUpload,
      onClick,
      fileInput
    }
  },
})
