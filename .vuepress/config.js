import {defaultTheme, defineUserConfig} from 'vuepress'
import {recoTheme} from 'vuepress-theme-reco'
import {mdEnhancePlugin} from "vuepress-plugin-md-enhance"

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
          children: ['/docs/guide/introduce', '/docs/guide/life', '/docs/guide/quick', '/docs/guide/directory', '/docs/guide/config']
        },
        {
          text: '应用',
          children: ['/docs/app/introduce', '/docs/app/quick', '/docs/app/route', '/docs/app/permission', '/docs/app/menu', '/docs/app/model', '/docs/app/event']
        },
        {
          text: '高级',
          children: ['/docs/extend/lib', '/docs/extend/func', '/docs/extend/middleware', '/docs/extend/command', '/docs/extend/package']
        },
        {
          text: '前端',
          children: ['/docs/client/introduce']
        },
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