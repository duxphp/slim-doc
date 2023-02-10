import {defaultTheme, defineUserConfig} from 'vuepress'
import { recoTheme } from 'vuepress-theme-reco'
import { mdEnhancePlugin } from "vuepress-plugin-md-enhance"
export default defineUserConfig({
  base: '/',
  lang: 'zh-CN',
  title: 'DuxLite',
  description: '这是我的第一个 VuePress 站点',
  theme: recoTheme({
    navbar: [
      // NavbarItem
      {
        text: '文档',
        link: '/docs/guide/introduce',
      },
    ],
    series: {
      '/docs/': [
        {
          text: '基础',
          children: [ '/docs/guide/introduce', '/docs/guide/life', '/docs/guide/quick', '/docs/guide/config' ]
        },
        {
          text: '进阶',
          children: []
        },
        {
          text: '高级',
          children: []
        }
      ]
    },
  }),
  plugins: [
    mdEnhancePlugin({
      mermaid: true,
      align: true,
      imgSize: true,
    })
  ]
})