import { defineConfig } from 'vitepress'

export default defineConfig({
  lang: 'zh-CN',
  title: '利林商业 · 基础设施指南',
  description: '从申请云账号到配置网络，一站了解利林商业的基础设施协作方式。找对仓库，写清申请，审查后执行。',
  base: '/gitops-gateway/',
  cleanUrls: false,
  appearance: false,
  lastUpdated: true,
  head: [
    ['link', { rel: 'icon', type: 'image/svg+xml', href: '/gitops-gateway/favicon.svg' }],
    ['meta', { name: 'theme-color', content: '#f7f8f4' }],
    ['meta', { property: 'og:locale', content: 'zh_CN' }],
    ['meta', { property: 'og:type', content: 'website' }],
  ],
  themeConfig: {
    logo: { src: '/favicon.svg', alt: '利林商业' },
    siteTitle: '利林商业',
    nav: [
      { text: '首页', link: '/' },
      { text: '办事指南', link: '/guide/requests', activeMatch: '/guide/(requests|start)' },
      { text: '体系架构', link: '/guide/architecture' },
      { text: '网络与地址', link: '/guide/network' },
      { text: '仓库目录', link: '/guide/repositories' },
    ],
    sidebar: [
      {
        text: '从这里开始',
        items: [
          { text: '第一次来？先读这页', link: '/guide/start' },
          { text: '我要办什么事', link: '/guide/requests' },
        ],
      },
      {
        text: '了解这套体系',
        items: [
          { text: '各环节如何配合', link: '/guide/architecture' },
          { text: '仓库目录与职责', link: '/guide/repositories' },
          { text: '网络地址怎么申请', link: '/guide/network' },
          { text: '常见词语解释', link: '/guide/glossary' },
        ],
      },
      {
        text: '维护这个入口',
        items: [{ text: '内容更新与网站发布', link: '/guide/maintenance' }],
      },
    ],
    socialLinks: [{ icon: 'github', link: 'https://github.com/shrealin/gitops-gateway', ariaLabel: '在 GitHub 查看本站仓库' }],
    search: {
      provider: 'local',
      options: {
        miniSearch: {
          options: {
            tokenize: (text: string) => Array.from(
              new Intl.Segmenter('zh-CN', { granularity: 'word' }).segment(text),
            ).filter(part => part.isWordLike).map(part => part.segment),
          },
          searchOptions: { combineWith: 'AND', fuzzy: false },
        },
        locales: {
          root: {
            translations: {
              button: { buttonText: '搜索指南', buttonAriaLabel: '搜索指南' },
              modal: {
                displayDetails: '显示详细内容',
                resetButtonTitle: '清除搜索',
                backButtonTitle: '关闭搜索',
                noResultsText: '没有找到相关内容',
                footer: { selectText: '选择', navigateText: '切换', closeText: '关闭' },
              },
            },
          },
        },
      },
    },
    outline: { label: '本页内容', level: [2, 3] },
    docFooter: { prev: '上一篇', next: '下一篇' },
    editLink: {
      pattern: 'https://github.com/shrealin/gitops-gateway/edit/main/docs/:path',
      text: '在 GitHub 上改进这页',
    },
    lastUpdated: { text: '本页最后更新', formatOptions: { dateStyle: 'medium' } },
    returnToTopLabel: '回到顶部',
    sidebarMenuLabel: '指南目录',
    darkModeSwitchLabel: '显示模式',
    skipToContentLabel: '跳到正文',
    notFound: {
      title: '这条路径还没有内容',
      quote: '回到首页，找到你要办理的事情。',
      linkLabel: '返回首页',
      linkText: '返回首页',
    },
    footer: {
      message: '利林商业 · 让基础设施变更有据可查，让协作有路可循。',
      copyright: '由 GitHub 记录与协作 · 由阿里云承载',
    },
  },
})
