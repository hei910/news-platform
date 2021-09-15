export const newsTypeMap = [
  '未设定类型',
  '盘前简报',
  '周度脉搏',
  '金马要评',
  '结构化产品',
  '银行信息',
  '金融街亮点',
  '资金动向',
  'Wall Street Highlights',
  '金马个债精选',
  '债券周报',
  '周度债券一览表',
  '金马个股精选',
  '市场快讯',
  'IB Persperctives'
]

export const formKeyMap: Record<string, string> = {
  'Category': 'newsType',
  'Date': 'publishTime',
  'Summary': 'digest',
  'Tags': 'keywordsList',
  'From': 'source',
  'Stock': 'source',
  'Stock Rating': '',
  '12m Price Target': '',
  'Related Stock List': 'relatedStocks',
  'Related Stock Rating': '',
  'Recommend Expire Time': '',
}

export const formValMap: Record<string, (val: string) => any> = {
  newsType: (val) => newsTypeMap.indexOf(val),
  keywordsList: (val) => split(val),
  relatedStocks: (val) => split(val),
}

function split(val: string): string[] {
  return val.split(',').map(txt => txt.trim());
}