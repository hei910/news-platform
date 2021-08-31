<template>
  <b-sidebar id="sidebarAdvancedFilter" title="進階搜索" right shadow>
    <div class="form">
      <div class="px-3">
        <div>
          <!-- Platform -->
          <label for="form-item-platform">{{ getDictTitle('target') }}</label>
          <b-form-checkbox
            v-for="item in getDictOptions('target')"
            :key="item.value"
            v-model="form.platform"
            size="sm"
            button
          >
            {{ item.text }}
          </b-form-checkbox>
        </div>
        <!-- From To -->
        <div>
          <label for="form-item-from">發佈時間</label>
          <date-picker
            :value="[form.from, form.to]"
            type="date"
            placeholder="Select date range"
            range
            @input="form.from = $event[0]; form.to = $event[1]"
          ></date-picker>
        </div>
      </div>
    </div>
  </b-sidebar>
</template>

<script lang="ts" src="./script.ts"></script>
<style lang="scss" src="./styles.scss" scoped></style>
