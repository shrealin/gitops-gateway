<script setup lang="ts">
import { withBase } from 'vitepress'
import { ArrowRight, ArrowUpRight, GitPullRequest, ShieldCheck, Network, Building2, Workflow, ListChecks, Boxes, BookOpen, GitBranch, ChevronRight } from '@lucide/vue'
import { repositories, github } from '../data'
import ArchitectureMap from './ArchitectureMap.vue'
import TaskNavigator from './TaskNavigator.vue'

const icons = { account: Building2, identity: ShieldCheck, workflow: Workflow, policy: ListChecks, network: Network, resources: Boxes }
</script>

<template>
  <div class="gateway-home">
    <section class="home-hero home-container" aria-labelledby="hero-title">
      <div class="hero-copy">
        <div class="eyebrow"><span class="eyebrow-line"></span> 利林商业 · 基础设施协作入口</div>
        <h1 id="hero-title">每一次变更，<br>都有<span class="hero-accent">清晰的路径<span class="accent-dot">。</span></span></h1>
        <p class="hero-description">申请账号、开通权限、规划网络、建设业务。<br class="desktop-break">从这里找到该去的仓库，知道下一步怎么做。</p>
        <div class="hero-actions"><a class="button-primary" href="#get-started">找到我要办的事 <ArrowRight :size="18" /></a><a class="button-quiet" :href="withBase('/guide/start.html')"><BookOpen :size="17" />第一次来？从这里开始</a></div>
        <div class="hero-note"><GitBranch :size="15" /><span>用 GitHub 留下记录，让每次协作都有迹可循。</span></div>
      </div>
      <div class="hero-visual"><div class="visual-orbit orbit-one"></div><div class="visual-orbit orbit-two"></div><ArchitectureMap /><span class="visual-caption">GITHUB 记录变更 <span>↔</span> ALICLOUD 承载资源</span></div>
    </section>

    <section class="principles-strip" aria-label="协作的三个约定"><div class="home-container principles-inner">
      <div><span class="principle-number">01</span><GitPullRequest :size="21" /><span><strong>先申请，再执行</strong><small>通过 PR 提出和审查变更</small></span></div>
      <div><span class="principle-number">02</span><ShieldCheck :size="21" /><span><strong>临时授权，无需长期密钥</strong><small>让指定仓库操作指定账号</small></span></div>
      <div><span class="principle-number">03</span><Network :size="21" /><span><strong>地址先登记，使用不冲突</strong><small>统一规划公司内网地址</small></span></div>
    </div></section>

    <section id="get-started" class="home-container home-section tasks-section" aria-labelledby="tasks-heading">
      <div class="section-heading"><div><div class="eyebrow">从需求出发</div><h2 id="tasks-heading">今天，你想办什么事？</h2></div><p>选一件事，找到对应仓库和申请方式。<br>不熟悉代码也没关系，先把需求说清楚。</p></div>
      <TaskNavigator />
      <p class="section-footnote"><GitPullRequest :size="15" /><span><strong>PR 是什么？</strong> 可以把它理解为一份“变更申请单”：写清要改什么，让维护者审查后再合并执行。</span><a :href="withBase('/guide/start.html#first-pr')">了解提交方式 <ArrowRight :size="14" /></a></p>
    </section>

    <section class="repositories-section" aria-labelledby="repositories-heading"><div class="home-container home-section">
      <div class="section-heading"><div><div class="eyebrow">各司其职，协同工作</div><h2 id="repositories-heading">六个仓库，一套完整的协作方式。</h2></div><a class="text-link" :href="withBase('/guide/architecture.html')">看懂整体架构 <ArrowRight :size="17" /></a></div>
      <div class="repository-grid">
        <a v-for="(repo, index) in repositories" :key="repo.name" class="repository-card" :href="github + repo.name" target="_blank" rel="noreferrer">
          <div class="repo-card-top"><span class="repo-icon"><component :is="icons[repo.icon as keyof typeof icons]" :size="23" :stroke-width="1.5" /></span><span class="repo-category">0{{ index + 1 }} / {{ repo.category }}</span><ArrowUpRight :size="18" class="repo-external" /></div>
          <h3>{{ repo.title }}</h3><code>{{ repo.name }}</code><p>{{ repo.description }}</p>
          <span class="status-label" :class="{ planned: repo.planned }"><i></i>{{ repo.status }}</span>
        </a>
      </div>
      <div class="repository-footnote"><span>关联仓库为私有仓库，查看详细配置需要相应的访问权限。</span><a :href="withBase('/guide/repositories.html')">职责与入口说明 <ArrowRight :size="15" /></a></div>
    </div></section>

    <section class="home-container home-section network-section" aria-labelledby="network-heading">
      <div class="network-intro"><div class="eyebrow">共享一套申请方式</div><h2 id="network-heading">网络可以分开建设，<br>地址需要一起规划。</h2><p>把内网地址想象成公司的门牌号。<br>统一登记，才能避免重号，也为未来互联留好空间。</p><a class="text-link" :href="withBase('/guide/network.html')">了解地址申请流程 <ArrowRight :size="17" /></a><div class="network-notice"><span class="notice-dot"></span><span>具体地址、分配记录与网络拓扑，<br>请在获准访问的私有仓库中查看。</span></div></div>
      <div class="address-preview">
        <div class="address-root"><div><Network :size="20" /><strong>共享网络 · 统一登记</strong></div><span class="network-stage">申请入口</span></div>
        <div class="address-planned"><span>从提出需求，到获准使用</span></div>
        <div class="address-branches">
          <div class="address-row"><span class="address-branch-dot"></span><div><strong>说明用途与规模</strong><small>由维护者协助确认合适的地址方案</small></div><span class="network-stage">提出申请</span></div>
          <div class="address-row"><span class="address-branch-dot"></span><div><strong>先测试，再申请生产</strong><small>验证结果随申请记录，分阶段推进</small></div><span class="network-stage">审查验证</span></div>
          <div class="address-row"><span class="address-branch-dot"></span><div><strong>确认登记后使用</strong><small>业务仓库读取对应环境已获准的地址</small></div><span class="network-stage">业务使用</span></div>
        </div>
        <div class="address-bottom"><span>地址登记与网络互联分别申请</span><span>详细记录保留在私有仓库</span></div>
      </div>
    </section>

    <section class="home-container"><div class="start-banner"><div class="banner-icon"><BookOpen :size="26" :stroke-width="1.4" /></div><div><h2>第一次维护？先走通一次申请。</h2><p>从提出需求到确认完成，按步骤了解整个过程。</p></div><a :href="withBase('/guide/start.html')">阅读新手指南 <ChevronRight :size="18" /></a></div></section>
    <div class="home-container home-bottom"><span>GITOPS GATEWAY <i>/</i> 利林商业</span><a :href="withBase('/guide/maintenance.html')">一起维护这份指南 <ArrowUpRight :size="14" /></a></div>
  </div>
</template>
