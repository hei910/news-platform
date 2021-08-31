<template>
  <b-table 
    :items="rowData" 
    :fields="tableColumns" 
    table-class="list"
    borderless 
    hover
    current-page="1"
    per-page="30"
  >
    <template #cell(newsType)="{ value }">
      {{ getDictLabelById('info_type', value) }}
    </template>
    <template #cell(publishTime)="{ value }">
      {{ toDateString(value) }}
    </template>
    <template #cell(languageType)="{ value }">
      {{ getDictLabelById('language', value) }}
    </template>
    <template #cell(shares)="data">
      <div class="counts">
        <span class="count view">
          <b-icon-eye-fill class="icon view" />{{ data.item.view || 0 }}
        </span>
        <span class="count like">
          <b-icon-heart-fill class="icon like" />{{ data.item.like || 0 }}
        </span>
        <span class="count share">
          <b-icon-share-fill class="icon share" />{{ data.item.share || 0 }}
        </span>
      </div>
    </template>
    <template #cell(actions)="data">
      <b-button variant="primary">查看</b-button>
      <b-button variant="secondary">修改</b-button>
      <b-button variant="light"><b-icon-trash/></b-button>
    </template>
  </b-table>
</template>

<script lang="ts" src="./script.ts"></script>
<style lang="scss" src="./styles.scss" scoped></style>