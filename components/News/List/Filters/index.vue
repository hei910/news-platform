<template>
  <div class="filters form">
    <div class="row">

      <!-- Keywords -->
      <div class="col flex-grow-1">
        <!-- <label for="form-item-keywords">关键字</label> -->
        <div class="prepend-icon w-100">
          <b-icon-search/>
          <b-form-input id="form-item-keywords" v-model="form.data.value.keywords" placeholder="输入并搜寻关键字..." trim></b-form-input>
        </div>
      </div>
      
      <!-- News Types -->
      <div class="col">
        <b-dropdown class="select" variant="outline-white">
          <template #button-content>
            <strong class="mr-2">类型：</strong>{{ newsTypeLabel }}
          </template>
          <b-dropdown-item v-for="{ text, value } in newsTypeOptions" :key="value" @click="form.set('newsType', value)">
            {{ text }}
          </b-dropdown-item>
        </b-dropdown>
      </div>

      <!-- Date -->
      <div class="col">
        <b-form-radio-group
          v-model="formHelper.data.value.dateRange"
          :options="dateRangeOptions"
          button-variant="outline-primary"
          buttons
        />
      </div>

      <!-- Actions -->
      <div class="col form-actions">
        <b-button>搜索</b-button>
        <b-button @click="resetFilter">重设</b-button>
        <b-button v-b-toggle.sidebarAdvancedFilter variant="dark">进阶搜索</b-button>
      </div>

      <!-- Add Content -->
      <div class="col addNews ml-auto">
        <b-button to="/news/add"><b-icon-plus-square-fill class="mr-2" />新增文章</b-button>
      </div>
    </div>
  </div>
</template>

<script lang="ts" src="./script.ts"></script>
<style lang="scss" src="./styles.scss" scoped></style>
