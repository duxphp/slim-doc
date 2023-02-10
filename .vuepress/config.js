import {defaultTheme, defineUserConfig} from 'vuepress'
import { recoTheme } from 'vuepress-theme-reco'
export default defineUserConfig({
  base: '/',
  lang: 'zh-CN',
  title: 'DuxSlim',
  description: '这是我的第一个 VuePress 站点',
  theme: recoTheme({
    navbar: [
      // NavbarItem
      {
        text: '文档',
        link: '/docs/guide/',
      },
    ],
    series: {
      '/docs/': [
        {
          text: '基础',
          children: [ '/docs/guide/' ]
        },
        {
          text: '高级',
          children: [ 'home', 'series', 'comments' ]
        }
      ]
    },
  }),
})