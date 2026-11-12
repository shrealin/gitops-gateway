<script setup lang="ts">
import { computed, ref } from 'vue'
import { withBase } from 'vitepress'
import { ArrowRight, ArrowUpRight, Building2, ShieldCheck, Network, Boxes, Waypoints, ListChecks, Check, FolderGit2 } from '@lucide/vue'
import { tasks, github } from '../data'

const selected = ref('network')
const current = computed(() => tasks.find(task => task.id === selected.value)!)
const icons = { account: Building2, identity: ShieldCheck, network: Network, resources: Boxes, connect: Waypoints, policy: ListChecks }

function moveTab(event: KeyboardEvent, index: number) {
  let next = index
  if (event.key === 'ArrowDown' || event.key === 'ArrowRight') next = (index + 1) % tasks.length
  else if (event.key === 'ArrowUp' || event.key === 'ArrowLeft') next = (index - 1 + tasks.length) % tasks.length
  else if (event.key === 'Home') next = 0
  else if (event.key === 'End') next = tasks.length - 1
  else return
  event.preventDefault()
  selected.value = tasks[next].id
  ;(event.currentTarget as HTMLElement).parentElement?.querySelectorAll<HTMLButtonElement>('[role="tab"]')[next]?.focus()
}
</script>

<template>
  <div class="task-navigator">
    <div class="task-tabs" role="tablist" aria-label="选择要办理的事情" aria-orientation="vertical">
      <button v-for="(task, index) in tasks" :id="`task-tab-${task.id}`" :key="task.id"
        class="task-tab" :class="{ selected: selected === task.id }" role="tab"
        :aria-selected="selected === task.id" :aria-controls="`task-panel-${task.id}`"
        :tabindex="selected === task.id ? 0 : -1" @click="selected = task.id" @keydown="moveTab($event, index)">
        <span class="task-icon"><component :is="icons[task.icon as keyof typeof icons]" :size="20" :stroke-width="1.6" /></span>
        <span class="task-tab-copy"><strong>{{ task.label }}</strong><small>{{ task.hint }}</small></span>
        <ArrowUpRight :size="17" class="task-tab-arrow" aria-hidden="true" />
      </button>
    </div>
    <div v-for="task in tasks" v-show="selected === task.id" :id="`task-panel-${task.id}`" :key="task.id"
      class="task-panel" role="tabpanel" :aria-labelledby="`task-tab-${task.id}`" tabindex="0">
      <template v-if="selected === task.id">
        <div class="panel-eyebrow"><span class="small-dot"></span> {{ task.repoLabel }} <span class="panel-counter">0{{ tasks.indexOf(task) + 1 }} / 06</span></div>
        <h3>{{ current.title }}</h3>
        <p class="panel-description">{{ task.description }}</p>
        <a class="repo-inline" :href="github + task.repo" target="_blank" rel="noreferrer"><FolderGit2 :size="17" /><span>{{ task.repo }}</span><ArrowUpRight :size="14" /></a>
        <a v-if="task.secondRepo" class="repo-inline secondary-repo" :href="github + task.secondRepo" target="_blank" rel="noreferrer"><FolderGit2 :size="17" /><span>{{ task.secondRepo }}</span><ArrowUpRight :size="14" /></a>
        <div class="prepare-list">
          <h4>提交前，准备这几项</h4>
          <ul><li v-for="item in task.prepare" :key="item"><Check :size="16" aria-hidden="true" />{{ item }}</li></ul>
        </div>
        <div class="task-outcome"><span>接下来</span><p>{{ task.result }}</p></div>
        <a class="text-link" :href="withBase(task.link)">查看完整办理步骤 <ArrowRight :size="17" /></a>
      </template>
    </div>
  </div>
</template>
