import { defineComponent } from '@nuxtjs/composition-api';

interface MenuItem {
  title: string;
  iconClass: string;
  link: string;
  exact?: boolean;
}

export default defineComponent({
  setup() {
    const menuItems: MenuItem[] = [
      {
        title: '文章列表',
        iconClass: 'icon-note',
        link: '/',
        exact: true,
      },
      {
        title: '新增文章',
        iconClass: 'icon-pen',
        link: '/news/add'
      },
      {
        title: '设定',
        iconClass: 'icon-note',
        link: '#'
      },
    ]
    
    return {
      menuItems,
    }
  }
})