<template>

  <b-modal id="modal-addStocks" hide-footer scrollable size="lg" @hidden="onClose">
    <template slot="modal-header">
      <div class="">
        <b-icon-graph-up class="mr-2"/> 添加相關股票
        <b-button class="btn-close ml-auto my-n2" variant="light" @click="$bvModal.hide('modal-addStocks')"><b-icon-x/></b-button>
      </div>
    </template>
    <div class="selected">
      <div v-for="item in selected" :key="item.id" class="item" @click="onSelectedItemClick(item)">
        {{ item.code }}
        <b-icon-x-circle-fill class="ml-1"/>
      </div>
    </div>
    <div class="row filters">
      <div class="col col-4">
        <label for="filter-code">代码</label>
        <b-input placeholder="搜索" size="sm"></b-input>
      </div>
      <div class="col col-4">
        <label for="filter-code">名称</label>
        <b-input placeholder="搜索" size="sm"></b-input>
      </div>
      <div class="col col-4">
        <label for="filter-code">市场</label>
        <b-form-select placeholder="請選擇" :options="martketOptions" size="sm"></b-form-select>
      </div>
    </div>
    <b-table 
      id="stockListTable"
      ref="tableRef"
      :items="rowData" 
      :fields="tableColumns" 
      table-class="list"
      select-mode="multi"
      selectable
      borderless 
      sticky-header
      :current-page="pager.page"
      :per-page="pager.pageSize"
      @row-selected="onRowSelected"
      @refreshed="onTableRefreshed"
    >
      <template #cell(selected)="{ rowSelected }">
        <b-icon-check v-if="rowSelected" size="lg"/>
      </template>
    </b-table>
    <b-pagination
      v-model="pager.page"
      :total-rows="pager.total"
      :per-page="pager.pageSize"
      aria-controls="stockListTable"
    />
  </b-modal>
  
</template>

<script lang="ts" src="./script.ts"></script>
<style lang="scss" scoped src="./styles.scss"></style>