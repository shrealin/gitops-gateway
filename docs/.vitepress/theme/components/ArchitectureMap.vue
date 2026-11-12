<script setup lang="ts">
import { withBase } from 'vitepress'
import { Building2, ShieldCheck, GitPullRequest, Workflow, Cloud, ArrowRight, ArrowDown, Network, CircleCheck, FileCheck2 } from '@lucide/vue'
</script>

<template>
  <div class="architecture-map" aria-label="体系概览：账号和部署身份准备好后，提交变更申请，经过审查，由公共流程操作阿里云资源。共享网络统一登记地址。">
    <div class="map-heading"><span><i></i> 从一份申请，到一次变更</span><span class="map-heading-label">体系概览</span></div>
    <div class="map-foundation">
      <a :href="withBase('/guide/requests.html#account')" class="map-mini-node"><Building2 :size="18" /><span>云账号<small>业务的空间</small></span></a>
      <ArrowRight :size="16" class="map-arrow" />
      <a :href="withBase('/guide/requests.html#identity')" class="map-mini-node"><ShieldCheck :size="18" /><span>部署身份<small>仓库的权限</small></span></a>
    </div>
    <div class="map-connector"><span>准备就绪</span><ArrowDown :size="16" /></div>
    <div class="map-main-node">
      <div class="map-node-icon"><GitPullRequest :size="23" :stroke-width="1.6" /></div>
      <div><strong>在 GitHub 提交变更</strong><span>写明需求 · 预览影响 · 人工审查</span></div>
      <span class="map-node-tag">PR</span>
    </div>
    <div class="map-connector"><ArrowDown :size="16" /><span>审查通过并合并</span></div>
    <div class="map-workflow"><Workflow :size="18" /><strong>公共工作流</strong><span>检查与执行遵循同一套流程</span><CircleCheck :size="16" /></div>
    <div class="map-connector"><span>凭临时凭证操作</span><ArrowDown :size="16" /></div>
    <div class="map-cloud"><div class="map-cloud-heading"><Cloud :size="22" /><strong>阿里云 · 业务子账号</strong><span>资源落地</span></div><div class="map-environments"><span><i></i> 测试环境</span><span><i></i> 生产环境</span></div></div>
    <div class="map-support"><span><Network :size="14" />共享网络 · 地址统一登记</span><span class="map-future"><FileCheck2 :size="14" />规则检查 · 待接入</span></div>
  </div>
</template>
