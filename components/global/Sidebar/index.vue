<template>
  <aside id="sidebar" class="sidebar">
    <div class="avatar">
      <b-avatar variant="light" badge-variant="success" badge />
      <div>Test User</div>
    </div>
    <div id="main-menu" class="main-menu">
      <ul>
        <li v-for="({title, iconClass, link, exact}) in menuItems" :key="title">
          <router-link :to="link" :exact="exact">
            <div class="icon"><span :class="iconClass"></span></div>
            <span class="text">{{ title }}</span>
          </router-link>
        </li>
      </ul>
    </div>
  </aside>
</template>

<script lang="ts" src="./script.ts"></script>
<style lang="scss" scoped src="./styles.scss"></style>