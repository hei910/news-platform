import { defineComponent, ref } from '@vue/composition-api';

export default defineComponent({
  props: {
    image: { type: String, default: '' },
  },
  setup(_, { emit }) {
    const uploadInputRef = ref<any>(null);
    const onImageInputChange = (file: File) => {
      const reader = new FileReader();
      reader.readAsDataURL(file)
      reader.onload = () => {
        emit('imageInputChange', reader.result as string);
      };
    }
    const onUpload = () => {
      if (uploadInputRef.value) uploadInputRef.value.$refs.input.click()
    }
    return {
      onImageInputChange,
      uploadInputRef,
      onUpload,
    }
  },
})