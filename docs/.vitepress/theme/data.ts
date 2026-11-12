export const github = 'https://github.com/shrealin/'

export const repositories = [
  { name: 'alicloud-account-vending-machine', title: '开好云账号', category: '账号准备', description: '为部门或系统创建阿里云子账号，把不同用途的资源分开管理。', status: '已有配置', icon: 'account' },
  { name: 'iac-alicloud-account-baseline', title: '配好部署身份', category: '权限接入', description: '规定哪个仓库的哪个环境，可以进入哪个子账号执行操作。', status: '已有配置', icon: 'identity' },
  { name: 'iac-shared-tools', title: '用同一套流程办事', category: '自动化流程', description: '集中维护检查、变更预览和执行流程，供业务仓库共同使用。', status: '已有工作流', icon: 'workflow' },
  { name: 'policy-library-shrealin', title: '制定统一检查规则', category: '规则管理', description: '未来用于检查各仓库的变更是否符合公司要求。', status: '规划中', icon: 'policy', planned: true },
  { name: 'iac-shared-network', title: '分配地址，规划互联', category: '共享网络', description: '集中登记内网地址；未来也在这里声明跨部门网络互联。', status: '已有地址规划', icon: 'network' },
  { name: 'iac-leasing-team', title: '管理业务自己的资源', category: '业务基础设施', description: '业务团队在自己的仓库维护资源配置，并接入统一的管理流程。', status: '接入示例', icon: 'resources' },
]

export const tasks = [
  {
    id: 'account', icon: 'account', label: '申请一个云账号', hint: '新部门 / 新系统',
    title: '先给你的业务一个独立的空间',
    description: '新部门、新系统需要自己的云资源时，先申请子账号。测试和正式使用的环境要分别说明。',
    repo: 'alicloud-account-vending-machine', repoLabel: '账号申请仓库',
    prepare: ['所属公司、部门和系统名称', '用途、负责人，以及测试 / 生产环境', '账号名称建议与归属位置'],
    result: '变更合并并执行成功后，确认账号信息，再申请仓库的部署权限。',
    link: '/guide/requests.html#account',
  },
  {
    id: 'identity', icon: 'identity', label: '让仓库可以部署', hint: '开通 / 调整权限',
    title: '让指定仓库进入指定云账号',
    description: '账号建好以后，还要登记“哪个仓库、哪个环境、哪个账号”的对应关系，自动化流程才能获得临时操作凭证。',
    repo: 'iac-alicloud-account-baseline', repoLabel: '账号基线仓库',
    prepare: ['目标 GitHub 仓库链接', '需要接入的环境，例如 test 或 prod', '对应子账号及业务负责人'],
    result: '配置执行成功后，由维护者完成业务仓库的环境设置与工作流接入。',
    link: '/guide/requests.html#identity',
  },
  {
    id: 'network', icon: 'network', label: '申请一段内网地址', hint: '创建网络前先登记',
    title: '先登记地址，再创建业务网络',
    description: '内部网络地址由共享网络仓库统一登记。团队先申请再使用，避免两个系统使用同一段地址。具体地址仅在私有仓库中查看。',
    repo: 'iac-shared-network', repoLabel: '共享网络仓库',
    prepare: ['所属公司 / 部门 / 系统与负责人', '网络规模、用途和部署环境', '是否需要与其他系统互通'],
    result: '先完成测试环境申请和验证，再单独申请生产；对应环境的登记实际生效后才可使用。',
    link: '/guide/requests.html#network',
  },
  {
    id: 'resources', icon: 'resources', label: '创建或修改业务资源', hint: '日常建设 / 调整',
    title: '在业务自己的仓库里提出变更',
    description: '例如创建网络、调整服务器或增加存储。下面是一个业务仓库入口；请向维护者确认你的项目对应哪个仓库。',
    repo: 'iac-leasing-team', repoLabel: '业务仓库示例',
    prepare: ['要新增、调整或删除什么资源', '涉及的环境和已批准的地址记录', '影响范围、验证方式与恢复安排'],
    result: '首次接入需确认仓库、环境和权限已准备好；后续提交资源变更，经审查合并，再确认执行结果。',
    link: '/guide/requests.html#resources',
  },
  {
    id: 'connect', icon: 'connect', label: '让两个系统互相访问', hint: '跨部门网络互联',
    title: '把互通需求交给共享网络统一规划',
    description: '地址不冲突，并不代表网络已经打通。跨部门、跨系统访问需要另外说明双方网络和访问用途。',
    repo: 'iac-shared-network', repoLabel: '共享网络仓库',
    prepare: ['需要互通的双方系统及负责人', '双方账号、地域和已登记地址段', '访问方向、服务端口和业务原因'],
    result: 'CEN 互联尚属后续建设。先提交需求与方案，待维护者实现并验证后，才能视为已开通。',
    link: '/guide/requests.html#connect',
  },
  {
    id: 'standards', icon: 'policy', label: '改进流程或统一规则', hint: '影响多个仓库',
    title: '把共同的做法集中维护',
    description: '修改自动化流程去 shared-tools；提出公司统一检查规则去 policy-library。规则库目前尚未接入工作流。',
    repo: 'iac-shared-tools', repoLabel: '公共工作流仓库',
    secondRepo: 'policy-library-shrealin',
    prepare: ['希望改进的流程或新增的规则', '哪些仓库受影响，以及具体例子', '测试、推广和兼容安排'],
    result: '修改公共流程后，确认调用仓库使用的版本；统一规则需连同工作流接入一起完成验证。',
    link: '/guide/requests.html#standards',
  },
]
