import { ref } from "@nuxtjs/composition-api";
import { isEmpty, xorBy } from 'lodash';
import { Obj } from '~/types/index';

export default <T extends Obj>(formData: T = {} as T) => {
  const data = ref(formData);

  const set = (key: keyof typeof data.value, value: any) => {
    data.value = {...data.value, [key]: value}
  }
  const toggle = (key: keyof typeof data.value, value: any, compareFn?: (item: any) => boolean) => {
    if (Array.isArray(data.value[key])) {
      data.value[key] = xorBy(data.value[key], Array.isArray(value) ? [...value] : [value], compareFn);
    } else {
      set(key, [value]);
    }
  }

  const setFormData = (key: keyof typeof data.value, value: any) => {
    if (Array.isArray(data.value[key]) && !Array.isArray(value)) {
      const ArrField = data.value[key] as any[];
      const idx = ArrField.indexOf(value)
      idx !== -1 
        ? ArrField.splice(idx, 1) 
        : ArrField.push(value);
      } else {
        data.value = {...data.value, [key]: value}
    }
  }

  const hasVal = (fieldKey: string, value: any, targetForm: Obj = data.value): boolean => {
    const fieldValue = targetForm[fieldKey];

    if (isEmpty(fieldValue)) {
      return false;
    } else {
      return Array.isArray(fieldValue)
        ? fieldValue.includes(value)
        : fieldValue === value;
    }
  }

  return {
    data,
    set,
    toggle,
    setFormData,
    hasVal
  }
}