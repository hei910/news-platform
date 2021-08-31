import { Options } from 'types/options';

type TagsGroupItem = '市场' | '大类资产' | '行业主题';

interface TagsGroup {
  label: TagsGroupItem,
  items: Options<string>[],
}

type TagsGroups = TagsGroup[]
// interface TagsGroup extends Record<keyof TagsGroup, Options<string>[]> {}


export const newsTypeOptions: Options[] = [{
    text: "盘前简报",
    value: 1
  }, {
    text: "周度脉搏",
    value: 2
  }, {
    text: "金马要评",
    value: 3
  }, {
    text: "结构化产品",
    value: 4
  }, {
    text: "银行信息",
    value: 5
  }, {
    text: "金融街亮点",
    value: 6
  }, {
    text: "市场动态",
    value: 7
  }, {
    text: "Wall Street Highlights",
    value: 8
  }, {
    text: "债券周报",
    value: 9
  }, {
    text: "市场快讯",
    value: 10
  }, {
    text: "投行视角",
    value: 11
  }, {
    text: "私募要闻",
    value: 12
  }, {
    text: "私行视角",
    value: 13
  }
]

export const platformOptions: Options[] = [{
  text: "华港科技APP",
  value: 0,
},{
  text: "金马分销平台",
  value: 1,
},{
  text: "华港CRM后台",
  value: 2,
}]

export const langOptions: Options[] = [{
  text: "中",
  value: 0,
},{
  text: "英",
  value: 1,
}]

export const frontTagsOptions: Options[] = [{
  text: "独家",
  value: 0,
},{
  text: "必读",
  value: 1,
},{
  text: "热文",
  value: 2,
},{
  text: "专题",
  value: 3,
},{
  text: "投行直击",
  value: 4,
},{
  text: "华港观点",
  value: 5,
}]

export const tagsOptions: TagsGroups = [
  {
    label: '市场',
    items: [
      {
        text: "中国内地",
        value: "中国内地",
      },{
        text: "中国香港",
        value: "中国香港",
      },{
        text: "美国",
        value: "美国",
      },{
        text: "亚太",
        value: "亚太",
      },{
        text: "欧洲",
        value: "欧洲",
      },
    ],
  }, {
    label: '大类资产',
    items: [
      {
        text: "股票",
        value: "股票",
      },{
        text: "债券",
        value: "债券",
      },{
        text: "外汇",
        value: "外汇",
      },{
        text: "大宗商品",
        value: "大宗商品",
      },{
        text: "另类投资",
        value: "另类投资",
      },{
        text: "宏观",
        value: "宏观",
      },
    ],
  }, {
    label: '行业主题',
    items: [
      {
        text: "互联网信息服务",
        value: "互联网信息服务",
      },{
        text: "新能源汽车",
        value: "新能源汽车",
      },{
        text: "互联网零售",
        value: "互联网零售",
      },{
        text: "手机硬件",
        value: "手机硬件",
      },{
        text: "传统汽车",
        value: "传统汽车",
      },{
        text: "新媒体",
        value: "新媒体",
      },{
        text: "芯片",
        value: "芯片",
      },{
        text: "消费",
        value: "消费",
      },{
        text: "金融",
        value: "金融",
      },{
        text: "工业",
        value: "工业",
      },{
        text: "能源",
        value: "能源",
      },{
        text: "教育",
        value: "教育",
      },{
        text: "生物医药",
        value: "生物医药",
      },{
        text: "博彩",
        value: "博彩",
      },{
        text: "原材料",
        value: "原材料",
      },{
        text: "公共事业",
        value: "公共事业",
      },
    ]
  }
]