import { defineConfig } from 'umi';

export default defineConfig({
  nodeModulesTransform: {
    type: 'none',
  },
  routes: [
    { path: '/', component: '@/pages/index' },
  ],
  fastRefresh: {},
  mfsu: {},
  favicon: "https://cdn.ethanloo.cn/img/favicon.png",
  title: "课程名称辅助翻译"
});
