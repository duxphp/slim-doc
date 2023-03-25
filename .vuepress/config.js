import {defaultTheme, defineUserConfig} from 'vuepress'
import {recoTheme} from 'vuepress-theme-reco'
import {mdEnhancePlugin} from "vuepress-plugin-md-enhance"

export default defineUserConfig({
  base: '/',
  lang: 'zh-CN',
  title: 'DuxLite',
  description: 'DuxLite 开发使用文档',
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
          children: ['/docs/extend/lib', '/docs/extend/func', '/docs/extend/middleware', '/docs/extend/command', '/docs/extend/package', '/docs/extend/debug']
        },
        {
          text: '前端',
          children: ['/docs/client/introduce']
        },
        {
          text: '应用',
          children: ['/docs/package/banner', '/docs/package/menu', '/docs/package/sms', '/docs/package/member', '/docs/package/mall', '/docs/package/mall-sale', '/docs/package/order', '/docs/package/account']
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