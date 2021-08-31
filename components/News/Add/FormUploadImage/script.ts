
import { defineComponent } from '@vue/composition-api'

export default defineComponent({
  props: {
    image: { type: String, default: '' },
  },
  setup(_, { emit }) {
    const onImageInputChange = (file: File) => {
      const reader = new FileReader();
      reader.readAsDataURL(file)
      reader.onload = () => {
        emit('imageInputChange', reader.result as string);
      };
    }
    return {
      onImageInputChange
    }
  },
})