 // 语言映射
 export interface NewsLanguageType {
  type                   : number; // 资讯语言类型 0 未知 1-中文 2- 英文
  mapping                : string; // 对应的 语言映射值
}

 // 单个资讯详情   uri /news/view  免签名校验接口 /news/withOutSignature/view
export interface NewsDetailReq {
  id                     : number; // 资讯id
}
 // 热点资讯
export interface NewsHot {
  id                     : number;
  title                  : string;
  desc                   : string;
  image                  : string;
  publishTime            : number;
  publisher              : string;
  keywords               : string[];
}

export enum IntervalType {
  INTERVAL_TYPE_ALL, // 查詢所有
  INTERVAL_TYPE_NOW, // 查詢當天
  INTERVAL_TYPE_A_WEEK, // 最近一周
  INTERVAL_TYPE_A_MONTH, // 最近 30天
  INTERVAL_TYPE_THREE_MONTHS, // 近三个月
  INTERVAL_TYPE_SIX_MONTHS, // 最近 6个月
  INTERVAL_TYPE_FIVE_DAY, // 最近五天
}
 // 股票相关信息
export interface Stock {
  code                   : string; // 产品代码
  codeExchange           : string; // 交易所代码
  codeBloomberg          : string; // 彭博代码
  nameEn                 : string; // 英文名称
  lastPrice              : string; // 最新股价
  riseFallPer            : string; // 涨跌幅 eg：跌 -5.03 涨 2.3
  name                   : string; // 产品名称
  market                 : string; // 市场
  uptime                 : number; // 股票最新价格时间
}

export interface FeaturedStock {
  scode                  : string; // 股票编号
  currency               : string; // 货币
  sname                  : string; // 股票名称 （公司名称）
  targetPrice            : string; // 彭博综合 目标价
  lastPrice              : string; // 当前价 （现价）
  riseFallPer            : string; // 涨跌幅 上升/下跌 空间 （%）
  firstFiscalYearPER     : string; // 第一年 财政（务）年度 预测 市盈率（倍） FY1
  firstFiscalYearDY      : string; // 第一年 财政（务）年度 预测 股息率（倍） FY1
  secondFiscalYearPER    : string; // 第二年 财政（务）年度 预测 市盈率（倍） FY2
  earningsGrowthRate     : string; // FY1-FY2 盈利增长率（%）
  advice                 : string; // 个股建议
  changeDate             : string; // 更新时间
  existInSystem          : boolean; // 库内 标的是否存在
}

export interface FeaturedBond {
  isInCode               : string; // 国际证券代码 isin 码
  issuer                 : string; // 发行商
  initiator              : string; // 发行人 （中文）
  moodyRating            : string; // Moody's Rating 穆迪评级
  fitchRating            : string; // Fitch Rating 惠誉评级
  spRating               : string; // 标准普尔（Standard & Poor's）评
  coupon                 : string; // coupon 票息 也叫 息票
  guidePrice             : string; // 指示性价格
  nextCallbackDate       : string; // 下一个 callback Date 债券赎回日期
  expiryDate             : string; // 债券 到期日
  duration               : string; // 存续期限
  guideEarningsYield     : string // 指示性收益率 Earnings yiel
  advice                 : string; // 个债建议
  changeDate             : string; // 更新时间
}

export interface WeeklyBond {
  isInCode               : string; // ISIN 码
  issuer                 : string; // 发行商
  initiator              : string; // 发行人 （中文）
  coupon                 : string; // coupon 票息 也叫 息票
  spRating               : string; // 标准普尔（Standard & Poor's）评级
  expiryDate             : string; // 债券 到期日
  moodyRating            : string; // Moody's Rating 穆迪评级
  fitchRating            : string; // Fitch Rating 惠誉评级
  proposedPrice          : string; // 参考价格
  expEarningsYield       : string; // 预估收益率 Expected Earnings Yield
  fiveDayChange          : string; // 5D Chg (%) --5 day change 5天 变化
  oneMonthChange         : string; // 1M Chg (%) -- 1 month change 一个月变
  duration               : string; // 久期(年)--指的是 债券平均到期时间 是一个计算出的敏感数
  nextCallbackDate       : string; // 下一个 callback Date 债券赎回日期
  riskArea               : string; // 风险地区
  industrialDistribution : string // 行业分布
}

export interface News {
  id                     : number;
  title                  : string;
  image                  : string;
  publishTime            : string;
  isOriginal             : number;
  publisher              : string;
  content                : string; // 资讯内容
  source                 : string; // 面向对象类型
  newsType               : number; // 资讯类型
  desc                   : string; // 是否推荐首页
  languageType           : number; // 资讯语言类型 0 未知 1-中文 2- 英文
  languageBucket         : NewsLanguageType[]; // 语言映射集合
  relatedStocks          : Stock[]; // 资讯关联股票
  featuredStocks         : FeaturedStock[]; // 个股精选
  increaseStocks         : FeaturedStock[]; // 新增 股票
  decreaseStocks         : FeaturedStock[]; // 调出 股票
  featuredBonds          : FeaturedBond[]; // 个债精选
  increaseBond           : FeaturedBond[]; // 增加 个债
  decreaseBond           : FeaturedBond[]; // 调出 个债
  weeklyBonds            : WeeklyBond[]; // 周度债券
  viewCount              : number; // 浏览次数
  platform               : number[] ;
  allowShare             : boolean;
  keywordsList           : string[]; // 关键字
}

export interface NewsDetail {
  content                : string; // 资讯内容
  contentType            : number; // 资讯类型
  isOriginal             : number; // 是否原创
  updateUser             : string; // 发布人
  updateTime             : number; // 更新时间
  before                 : News; // 上一条
  after                  : News; // 下一条
  id                     : number; // 资讯id
  title                  : string; // 标题
  image                  : string; // 图片
  publishTime            : number; // 发布时间
  publisher              : string; // 发布者
  source                 : string; // 来源
  digest                 : string; // 摘要
  keywordsList           : string[]; // 关键字
  objectType             : number; // 面向对象类型
  newsType               : number; // 资讯类型  0--未设定类型，1--市场资讯，2--产品资讯，3--生活资讯 4--结合化产品 5--银行信息
  desc                   : string; // 描述
  isHomePage             : number; // 是否推荐
  languageType           : number; // 资讯语言类型 0 未知 1-中文 2- 英文
  languageBucket         : NewsLanguageType[]; // 语言映射集合
  relations              : News[]; // 相关资讯
  relatedStocks          : Stock[]; // 资讯关联股票
  featuredStocks         : FeaturedStock[]; // 个股精选
  increaseStocks         : FeaturedStock[]; // 新增 股票
  decreaseStocks         : FeaturedStock[]; // 调出 股票
  featuredBonds          : FeaturedBond[]; // 个债精选
  increaseBond           : FeaturedBond[]; // 增加 个债
  decreaseBond           : FeaturedBond[]; // 调出 个债
  weeklyBonds            : WeeklyBond[]; // 周度债券
  relatedProductsNews    : News; // 相关结构化资讯 --具有共同标的
  viewCount              : number; // 浏览次数
  collected              : boolean; // 是否收藏过
}
