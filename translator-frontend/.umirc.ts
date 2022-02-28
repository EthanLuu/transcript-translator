import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  dynamicImport: {
    loading: '@/components/Loading',
  },
  routes: [
    {
      exact: false,
      path: '/',
      component: '@/layouts/index',
      routes: [
        { exact: true, path: '/', component: '@/pages/multi/index' },
        { exact: true, path: '/single', component: '@/pages/single/index' },
      ],
    },
  ],
  fastRefresh: {},
  mfsu: {},
  favicon: 'https://cdn.ethanloo.cn/img/favicon.png',
  title: '课程名称辅助翻译',
});
