<template>
  <section class="news-add">
    <b-container>
      <b-form class="form">
        <header class="mb-2">
          <h3 class="my-0"><b-icon-pencil/> 新建资讯</h3>
          <div class="btns">
            <News-Add-FormUploadWordTpl class="mx-3" @wordUpload="onWordUpload" />
            <b-button >立即发布</b-button>
            <b-button variant="success">草稿</b-button>
            <b-button variant="light">取消</b-button>
          </div>
        </header>
        <hr class="mb-4">
        <b-row>
          <!-- Left Hand Side -->
          <b-col cols="8" tag="main">

            <!-- Upload Image -->
            <News-Add-FormUploadImage v-bind="{ image: form.image }" @imageInputChange="onImageInputChange" />

            <div class="row">
              <div class="col-8">
                <!-- Title -->
                <b-form-group label="文章標題：" label-for="form-item-title">
                  <b-form-input id="form-item-title" v-model="form.title" type="text" required />
                </b-form-group>
              </div>
                
              <div class="col-4">
                <!-- News Type -->
                <b-form-group label="类型：" label-for="form-item-newsType">
                  <b-dropdown :text="displayDropdownText('newsType')" variant="outline-white" class="w-100">
                    <b-dropdown-item v-for="{text, value} in newsTypeOptions" :key="value" @click="updateFormData('newsType', value)">{{ text }}</b-dropdown-item>
                  </b-dropdown>
                </b-form-group>
              </div>
            </div>

            <!-- Body -->
            <div>
              <label for="form-item-digest text-primary">
                內容： 
                <small class="btn btn-sm my-n1" @click="toggleDigest">
                  <b-icon-dash-square v-if="formHelper.hasDigest" class="text-primary" />
                  <b-icon-plus-square-fill v-else class="text-primary" /> 
                    <span class="ml-1">添加摘要</span>
                </small>
              </label>
              <b-form-textarea
                v-if="formHelper.hasDigest"
                v-model="form.digest"
                class="form-item-digest"
                placeholder="点击输入摘要，限制240字内"
                trim
              ></b-form-textarea>
              <ckeditor v-model="form.content" :config="editorConfig" editor-url="https://cdn.ckeditor.com/4.16.2/full/ckeditor.js" type="inline" />
            </div>
          </b-col>
          
          <!-- Right Hand Side -->
          <b-col cols="4" tag="aside">
            
            <!-- Language Type -->
            <b-form-group label="文章语言：" class="w-50">
              <b-form-radio-group
                v-model="form.languageType"
                :options="langOptions"
                buttons
                size="sm"
                button-variant="outline-primary"
                required
              />
            </b-form-group>

            <!-- Tags -->
            <b-form-group id="popover-addTags" label="文章标签：" label-for="form-item-keywords">
              <b-input-group>
                <b-form-tags id="form-item-keywords" v-model="form.keywords" placeholder="添加标签...(可自定义)" tag-variant="primary"/>
                <b-input-group-append>
                  <b-button variant="outline-secondary" @click="form.keywords = []"><b-icon-x /></b-button>
                </b-input-group-append>
              </b-input-group>
              <div class="desc">注：文章标签用于相关资讯推荐</div>
            </b-form-group>

            <!-- Tags Popover -->
            <b-popover target="popover-addTags" triggers="hover" custom-class="popover-addTags" delay="200">
              <template #title>添加文章标签 (可多选)</template>
              <div v-for="group in tagsOptions" :key="group.label" class="group">
                <span class="label">{{ group.label }}</span>
                <div class="btns">
                    <b-button 
                      v-for="{text, value} in group.items" 
                      :key="value"
                      :class="{active: form.keywords.indexOf(value) !== -1}"
                      variant="outline-primary" 
                      size="sm" 
                      @click="updateFormData('keywords', value)"
                    >
                      {{ text }}
                    </b-button>
                </div>
              </div>
            </b-popover>

            <!-- Add Related Stocks -->
            <b-form-group id="popover-relatedStocks" label="添加相關股票" label-for="form-item-relatedStocks">
              <div class="selected m-n1 mb-2">
                <b-button v-for="item in form.relatedStocks" :key="item.id" variant="primary" size="sm" class="m-1" @click="onSelectedStockItemClick(item)">
                  {{ item.code }} <b-icon-x/>
                </b-button>
                <b-button variant="outline-primary" class="m-1" :class="{'w-100': !form.relatedStocks.length}" @click="$bvModal.show('modal-addStocks')">點擊添加股票 <b-icon-plus/></b-button>
              </div>
              <News-Add-ModalAddStocks ref="modalAddStocks" :relatedStocks="form.relatedStocks" @selectedStocksChange="onSelectedStocksChange"/>
            </b-form-group>
            
            <b-form-group label="发布对象：" >
              <b-form-checkbox-group
                v-model="form.platform"
                :options="platformOptions"
                buttons
                size="sm"
                button-variant="outline-primary"
                required
              />
            </b-form-group>
            
            <div>
              <b-form-checkbox v-model="formHelper.hasScheduling" name="form-hasScheduling" class="my-2" switch>是否预约发布</b-form-checkbox>
              <div v-if="formHelper.hasScheduling" class="mb-4">
                <b-form-datepicker id="form-item-schedulingTime" v-model="form.schedulingTime" :disabled="!formHelper.hasScheduling" placeholder="选择预约发布时间" />
                <div class="desc">填写发布后将不允许修改</div>
              </div>
            </div>
            
            <div>
              <b-form-checkbox v-model="form.allowShare" name="form-allowShare" class="my-2" switch>允许分享</b-form-checkbox>
            </div>
            
            <div>
              <b-form-checkbox v-model="formHelper.showAtFront" name="form-hasScheduling" class="my-2" switch>
                推荐APP首页
                <small>注：仅对华港科技APP有效</small>
              </b-form-checkbox>
              <template v-if="formHelper.showAtFront">
                <b-form-group label="文章语言：" >
                  <b-form-radio-group
                    v-model="formHelper.frontTagsOptions"
                    :options="frontTagsOptions"
                    name="checkbox-btn-default"
                    buttons
                    size="sm"
                    button-variant="outline-primary"
                    required
                  />
                </b-form-group>
                <b-form-datepicker v-model="form.schedulingTimeFront" :disabled="!formHelper.showAtFront" placeholder="推荐首页有效时间" />
              </template>
            </div>

    
          </b-col>
        </b-row>
      </b-form>
    </b-container>
  </section>
</template>

<script lang="ts" src="./script.ts"></script>
<style lang="scss" scoped src="./styles.scss"></style>
<style lang="scss">
.popover-addTags {
  max-width: 500px;

  .group {
    display: flex;
    margin: 1em 0;
  }
  .label {
    min-width: 4em;
    margin-right: 1em;
  }
  .btns {
    display: flex;
    flex-wrap: wrap;
    justify-content: flex-start;
    align-items: top;
  }
  .btn {
    margin: 2px;
  }
} 
</style>