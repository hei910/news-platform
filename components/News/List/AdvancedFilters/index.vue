<template>
  <b-sidebar id="sidebarAdvancedFilter" class="advanced-filter" width="360px" right shadow backdrop>
    <div class="form">
      <h4><b-icon-search class="mr-2"/>進階搜索</h4>
      <hr>
      <div>
        
        <!-- Platform -->
        <label for="form-item-platform">{{ getDictTitle('target') }}</label>
        <b-form-radio-group
          v-model="form.platform"
          :options="getDictOptions('target')"
          size="sm"
          class="w-100"
          button-variant="outline-primary"
          buttons
        />
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
      
      <!-- Language Type -->
      <div>
        <label for="form-item-from">文章语言</label>
        <b-form-radio-group
          v-model="form.language"
          :options="getDictOptions('language')"
          size="sm"
          button-variant="outline-primary" 
          buttons
        />
      </div>
      
      <hr>
      <h6>文章标签 (可多选)</h6>

      <!-- Market -->
      <div>
        <label for="form-item-market">市场</label>
        <div class="mx-n1">
          <b-button 
            v-for="{text, value} in getDictOptions('market')" 
            :key="value"
            class="m-1"
            :class="{active: form.hasVal('market', value)}"
            variant="outline-primary" 
            size="sm" 
            @click="form.toggle('market', value)"
          >
            {{ text }}
          </b-button>
        </div>
      </div>

      <!-- Asset -->
      <div>
        <label for="form-item-asset">大类资产</label>
        <div class="mx-n1">
          <b-button 
            v-for="{text, value} in getDictOptions('asset')" 
            :key="value"
            class="m-1"
            :class="{active: form.hasVal('asset', value)}"
            variant="outline-primary" 
            size="sm" 
            @click="form.toggle('asset', value)"
          >
            {{ text }}
          </b-button>
        </div>
      </div>

      <!-- Industry -->
      <div>
        <label for="form-item-industry">行业主题</label>
        <div class="mx-n1">
          <b-button 
            v-for="{text, value} in getDictOptions('industry')" 
            :key="value"
            class="m-1"
            :class="{active: form.hasVal('industry', value)}"
            variant="outline-primary" 
            size="sm" 
            @click="form.toggle('industry', value)"
          >
            {{ text }}
          </b-button>
        </div>
      </div>
    </div>
  </b-sidebar>
</template>

<script lang="ts" src="./script.ts"></script>
<style lang="scss" src="./styles.scss" scoped></style>
