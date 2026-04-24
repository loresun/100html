const formatNumber = (value) => {
  if (Number.isNaN(value)) return '0';
  return Number(value).toFixed(2).replace(/\.00$/, '');
};

const createFormulaTool = (config) => ({
  ...config,
  type: 'formula',
  values: config.fields.reduce((acc, field) => {
    acc[field.key] = field.default ?? 0;
    return acc;
  }, {}),
  result: null
});

const createGeneratorTool = (config) => ({
  ...config,
  type: 'generator',
  values: config.fields ? config.fields.reduce((acc, field) => {
    acc[field.key] = field.default ?? '';
    return acc;
  }, {}) : {},
  result: ''
});

const createListTool = (config) => ({
  ...config,
  type: 'list',
  input: '',
  items: [],
  allowCheck: config.allowCheck ?? true
});

const createNoteTool = (config) => ({
  ...config,
  type: 'note',
  content: ''
});

const createLedgerTool = (config) => ({
  ...config,
  type: 'ledger',
  form: { amount: 0, category: '', note: '' },
  entries: [],
  total: 0
});

const createTimerTool = (config) => ({
  ...config,
  type: 'timer',
  duration: config.duration ?? 25,
  remaining: (config.duration ?? 25) * 60,
  intervalId: null
});

const createPomodoroTool = (config) => ({
  ...config,
  type: 'pomodoro',
  workMinutes: 25,
  breakMinutes: 5,
  remaining: 25 * 60,
  phase: 'work',
  intervalId: null,
  phaseLabel: '专注中'
});

const createStopwatchTool = (config) => ({
  ...config,
  type: 'stopwatch',
  elapsed: 0,
  intervalId: null
});

const createTextTool = (config) => ({
  ...config,
  type: 'text',
  input: '',
  output: ''
});

const createConverterTool = (config) => ({
  ...config,
  type: 'converter',
  value: config.value ?? 0,
  from: config.options[0].value,
  to: config.options[1].value,
  result: ''
});

const createCounterTool = (config) => ({
  ...config,
  type: 'counter',
  target: config.target ?? 8,
  count: 0
});

const webtoolsToolConfigs = {
  tax_calculator: createFormulaTool({
    id: 'tax_calculator',
    name: '纳税计算器',
    desc: '估算应纳个人所得税金额。',
    category: 'calc',
    categoryLabel: '计算器',
    resultLabel: '预计纳税额 (元)',
    fields: [
      { key: 'income', label: '税前收入', unit: '元', default: 12000 },
      { key: 'deduction', label: '扣除项', unit: '元', default: 5000 },
      { key: 'rate', label: '税率', unit: '%', default: 10 }
    ],
    formula: (v) => Math.max(0, (v.income - v.deduction) * (v.rate / 100))
  }),
  salary_calculator: createFormulaTool({
    id: 'salary_calculator',
    name: '薪资计算器',
    desc: '综合薪资构成估算到手工资。',
    category: 'calc',
    categoryLabel: '计算器',
    resultLabel: '预计到手工资 (元)',
    fields: [
      { key: 'base', label: '基本工资', unit: '元', default: 8000 },
      { key: 'bonus', label: '绩效/奖金', unit: '元', default: 2000 },
      { key: 'insurance', label: '社保公积金', unit: '元', default: 1000 },
      { key: 'tax', label: '税费', unit: '元', default: 200 }
    ],
    formula: (v) => Math.max(0, v.base + v.bonus - v.insurance - v.tax)
  }),
  vat_calculator: createFormulaTool({
    id: 'vat_calculator',
    name: '增值税计算器',
    desc: '根据销售额和税率估算增值税。',
    category: 'calc',
    categoryLabel: '计算器',
    resultLabel: '增值税额 (元)',
    fields: [
      { key: 'sales', label: '含税销售额', unit: '元', default: 50000 },
      { key: 'rate', label: '税率', unit: '%', default: 6 }
    ],
    formula: (v) => v.sales * (v.rate / 100)
  }),
  hourly_rate: createFormulaTool({
    id: 'hourly_rate',
    name: '时薪计算器',
    desc: '将月薪转换为时薪水平。',
    category: 'calc',
    categoryLabel: '计算器',
    resultLabel: '预计时薪 (元/小时)',
    fields: [
      { key: 'monthly', label: '月薪', unit: '元', default: 12000 },
      { key: 'days', label: '月工作天数', unit: '天', default: 22 },
      { key: 'hours', label: '每日工时', unit: '小时', default: 8 }
    ],
    formula: (v) => v.monthly / (v.days * v.hours)
  }),
  overtime_pay: createFormulaTool({
    id: 'overtime_pay',
    name: '加班费计算器',
    desc: '估算加班补贴金额。',
    category: 'calc',
    categoryLabel: '计算器',
    resultLabel: '预计加班费 (元)',
    fields: [
      { key: 'hourly', label: '基础时薪', unit: '元', default: 50 },
      { key: 'hours', label: '加班时长', unit: '小时', default: 10 },
      { key: 'rate', label: '加班倍率', unit: '倍', default: 1.5 }
    ],
    formula: (v) => v.hourly * v.hours * v.rate
  }),
  loan_payment: createFormulaTool({
    id: 'loan_payment',
    name: '贷款月供计算器',
    desc: '根据本金、利率与期数估算月供。',
    category: 'calc',
    categoryLabel: '计算器',
    resultLabel: '预计月供 (元)',
    fields: [
      { key: 'principal', label: '贷款本金', unit: '元', default: 300000 },
      { key: 'rate', label: '年利率', unit: '%', default: 4 },
      { key: 'months', label: '期数', unit: '月', default: 360 }
    ],
    formula: (v) => {
      const monthlyRate = (v.rate / 100) / 12;
      if (monthlyRate === 0) return v.principal / v.months;
      return (v.principal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -v.months));
    }
  }),
  budget_split: createFormulaTool({
    id: 'budget_split',
    name: '预算分配计算器',
    desc: '按照 50/30/20 规则拆分预算。',
    category: 'calc',
    categoryLabel: '计算器',
    resultLabel: '预算分配 (元)',
    fields: [
      { key: 'income', label: '月可支配收入', unit: '元', default: 10000 }
    ],
    formula: (v) => [
      { label: '必要支出 (50%)', value: `${formatNumber(v.income * 0.5)} 元` },
      { label: '品质生活 (30%)', value: `${formatNumber(v.income * 0.3)} 元` },
      { label: '储蓄投资 (20%)', value: `${formatNumber(v.income * 0.2)} 元` }
    ]
  }),
  savings_goal: createFormulaTool({
    id: 'savings_goal',
    name: '储蓄目标计算器',
    desc: '根据目标与周期计算每月储蓄。',
    category: 'calc',
    categoryLabel: '计算器',
    resultLabel: '每月需储蓄 (元)',
    fields: [
      { key: 'goal', label: '目标金额', unit: '元', default: 50000 },
      { key: 'months', label: '计划月数', unit: '月', default: 12 }
    ],
    formula: (v) => v.goal / v.months
  }),
  discount_calc: createFormulaTool({
    id: 'discount_calc',
    name: '优惠折扣计算器',
    desc: '折扣价和节省金额一键算出。',
    category: 'calc',
    categoryLabel: '计算器',
    resultLabel: '折后价 (元)',
    fields: [
      { key: 'price', label: '原价', unit: '元', default: 299 },
      { key: 'discount', label: '折扣', unit: '%', default: 20 }
    ],
    formula: (v) => v.price * (1 - v.discount / 100)
  }),
  profit_margin: createFormulaTool({
    id: 'profit_margin',
    name: '利润率计算器',
    desc: '计算利润率与利润金额。',
    category: 'calc',
    categoryLabel: '计算器',
    resultLabel: '利润率 / 利润',
    fields: [
      { key: 'revenue', label: '收入', unit: '元', default: 50000 },
      { key: 'cost', label: '成本', unit: '元', default: 30000 }
    ],
    formula: (v) => {
      const profit = v.revenue - v.cost;
      const margin = v.revenue === 0 ? 0 : profit / v.revenue;
      return [
        { label: '利润金额', value: `${formatNumber(profit)} 元` },
        { label: '利润率', value: `${formatNumber(margin * 100)} %` }
      ];
    }
  }),
  break_even: createFormulaTool({
    id: 'break_even',
    name: '盈亏平衡点计算器',
    desc: '估算达到盈亏平衡所需销量。',
    category: 'calc',
    categoryLabel: '计算器',
    resultLabel: '盈亏平衡销量 (件)',
    fields: [
      { key: 'fixed', label: '固定成本', unit: '元', default: 20000 },
      { key: 'price', label: '单价', unit: '元', default: 120 },
      { key: 'unitCost', label: '单位成本', unit: '元', default: 60 }
    ],
    formula: (v) => v.fixed / Math.max(1, v.price - v.unitCost)
  }),
  tip_calculator: createFormulaTool({
    id: 'tip_calculator',
    name: '小费/AA 计算器',
    desc: '平均分摊账单与小费。',
    category: 'calc',
    categoryLabel: '计算器',
    resultLabel: '人均支付 (元)',
    fields: [
      { key: 'bill', label: '账单金额', unit: '元', default: 300 },
      { key: 'tip', label: '小费比例', unit: '%', default: 10 },
      { key: 'people', label: '人数', unit: '人', default: 3 }
    ],
    formula: (v) => (v.bill * (1 + v.tip / 100)) / v.people
  }),
  electricity_cost: createFormulaTool({
    id: 'electricity_cost',
    name: '用电成本计算器',
    desc: '估算电费成本。',
    category: 'calc',
    categoryLabel: '计算器',
    resultLabel: '预计电费 (元)',
    fields: [
      { key: 'kwh', label: '用电量', unit: '度', default: 100 },
      { key: 'rate', label: '电价', unit: '元/度', default: 0.6 }
    ],
    formula: (v) => v.kwh * v.rate
  }),
  fuel_cost: createFormulaTool({
    id: 'fuel_cost',
    name: '油耗成本计算器',
    desc: '估算出行油费。',
    category: 'calc',
    categoryLabel: '计算器',
    resultLabel: '预计油费 (元)',
    fields: [
      { key: 'distance', label: '行驶里程', unit: '公里', default: 300 },
      { key: 'consumption', label: '百公里油耗', unit: '升', default: 7 },
      { key: 'price', label: '油价', unit: '元/升', default: 8 }
    ],
    formula: (v) => (v.distance / 100) * v.consumption * v.price
  }),
  bmi_calculator: createFormulaTool({
    id: 'bmi_calculator',
    name: 'BMI 健康指数',
    desc: '估算 BMI 并提示体重区间。',
    category: 'health',
    categoryLabel: '健康生活',
    resultLabel: 'BMI 指数',
    fields: [
      { key: 'weight', label: '体重', unit: 'kg', default: 60 },
      { key: 'height', label: '身高', unit: 'cm', default: 165 }
    ],
    formula: (v) => {
      const h = v.height / 100;
      const bmi = v.weight / (h * h);
      let status = '正常';
      if (bmi < 18.5) status = '偏瘦';
      if (bmi >= 24) status = '偏胖';
      if (bmi >= 28) status = '肥胖';
      return [
        { label: 'BMI 数值', value: formatNumber(bmi) },
        { label: '体型建议', value: status }
      ];
    }
  }),
  pomodoro_timer: createPomodoroTool({
    id: 'pomodoro_timer',
    name: '番茄钟',
    desc: '专注 + 休息节奏管理。',
    category: 'time',
    categoryLabel: '时间管理'
  }),
  countdown_timer: createTimerTool({
    id: 'countdown_timer',
    name: '倒计时',
    desc: '快速设置倒计时提醒。',
    category: 'time',
    categoryLabel: '时间管理',
    duration: 15
  }),
  stopwatch: createStopwatchTool({
    id: 'stopwatch',
    name: '秒表',
    desc: '用于计时训练、测试。',
    category: 'time',
    categoryLabel: '时间管理'
  }),
  study_timer: createTimerTool({
    id: 'study_timer',
    name: '学习计时器',
    desc: '记录专注时长。',
    category: 'time',
    categoryLabel: '时间管理',
    duration: 45
  }),
  habit_streak: createFormulaTool({
    id: 'habit_streak',
    name: '习惯连续天数',
    desc: '记录连续坚持天数。',
    category: 'time',
    categoryLabel: '时间管理',
    resultLabel: '已坚持天数',
    fields: [
      { key: 'start', label: '开始日期 (时间戳)', unit: '', default: new Date().getTime() - 86400000 }
    ],
    formula: (v) => Math.max(1, Math.ceil((Date.now() - v.start) / 86400000))
  }),
  sleep_cycle: createFormulaTool({
    id: 'sleep_cycle',
    name: '睡眠周期计算器',
    desc: '估算适合的起床时间。',
    category: 'health',
    categoryLabel: '健康生活',
    resultLabel: '建议起床时间',
    fields: [
      { key: 'sleepTime', label: '入睡时间 (小时)', unit: '24h', default: 23 }
    ],
    formula: (v) => {
      const base = new Date();
      base.setHours(v.sleepTime, 0, 0, 0);
      const times = [
        new Date(base.getTime() + 90 * 60 * 1000),
        new Date(base.getTime() + 180 * 60 * 1000),
        new Date(base.getTime() + 270 * 60 * 1000),
        new Date(base.getTime() + 360 * 60 * 1000)
      ];
      return times.map((time, index) => ({
        label: `第 ${index + 1} 个周期`,
        value: time.toTimeString().slice(0, 5)
      }));
    }
  }),
  time_interval: createFormulaTool({
    id: 'time_interval',
    name: '时间间隔计算器',
    desc: '计算两个时间点的间隔。',
    category: 'time',
    categoryLabel: '时间管理',
    resultLabel: '时间差',
    fields: [
      { key: 'start', label: '开始时间戳', unit: '', default: Date.now() - 3600000 },
      { key: 'end', label: '结束时间戳', unit: '', default: Date.now() }
    ],
    formula: (v) => {
      const diff = Math.max(0, v.end - v.start);
      const hours = Math.floor(diff / 3600000);
      const minutes = Math.floor((diff % 3600000) / 60000);
      const seconds = Math.floor((diff % 60000) / 1000);
      return [
        { label: '小时', value: `${hours} h` },
        { label: '分钟', value: `${minutes} min` },
        { label: '秒', value: `${seconds} s` }
      ];
    }
  }),
  deadline_countdown: createFormulaTool({
    id: 'deadline_countdown',
    name: '重要日期倒计时',
    desc: '计算距离目标日期的天数。',
    category: 'time',
    categoryLabel: '时间管理',
    resultLabel: '剩余天数',
    fields: [
      { key: 'target', label: '目标日期 (时间戳)', unit: '', default: Date.now() + 86400000 * 10 }
    ],
    formula: (v) => Math.max(0, Math.ceil((v.target - Date.now()) / 86400000))
  }),
  todo_list: createListTool({
    id: 'todo_list',
    name: 'To-Do List',
    desc: '管理每日待办事项。',
    category: 'list',
    categoryLabel: '清单记录',
    storageKey: 'webtools_todo'
  }),
  shopping_list: createListTool({
    id: 'shopping_list',
    name: '购物清单',
    desc: '列出需要购买的物品。',
    category: 'list',
    categoryLabel: '清单记录',
    storageKey: 'webtools_shopping'
  }),
  idea_box: createListTool({
    id: 'idea_box',
    name: '灵感收集箱',
    desc: '随时记录灵感。',
    category: 'list',
    categoryLabel: '清单记录',
    storageKey: 'webtools_idea',
    allowCheck: false
  }),
  daily_notes: createNoteTool({
    id: 'daily_notes',
    name: '日常笔记',
    desc: '记录当日要点。',
    category: 'list',
    categoryLabel: '清单记录',
    storageKey: 'webtools_daily_notes'
  }),
  expense_tracker: createLedgerTool({
    id: 'expense_tracker',
    name: '个人记账',
    desc: '记录每日支出并自动汇总。',
    category: 'list',
    categoryLabel: '清单记录',
    storageKey: 'webtools_expense'
  }),
  habit_tracker: createListTool({
    id: 'habit_tracker',
    name: '习惯打卡',
    desc: '记录习惯完成情况。',
    category: 'list',
    categoryLabel: '清单记录',
    storageKey: 'webtools_habit'
  }),
  mood_journal: createListTool({
    id: 'mood_journal',
    name: '心情记录',
    desc: '记录心情与感受。',
    category: 'list',
    categoryLabel: '清单记录',
    storageKey: 'webtools_mood',
    allowCheck: false
  }),
  reading_list: createListTool({
    id: 'reading_list',
    name: '阅读清单',
    desc: '维护阅读计划。',
    category: 'list',
    categoryLabel: '清单记录',
    storageKey: 'webtools_reading'
  }),
  goals_planner: createListTool({
    id: 'goals_planner',
    name: '目标清单',
    desc: '拆解年度目标。',
    category: 'list',
    categoryLabel: '清单记录',
    storageKey: 'webtools_goals'
  }),
  meeting_notes: createNoteTool({
    id: 'meeting_notes',
    name: '会议记录',
    desc: '保存会议纪要与待办。',
    category: 'list',
    categoryLabel: '清单记录',
    storageKey: 'webtools_meeting_notes'
  }),
  random_picker: createGeneratorTool({
    id: 'random_picker',
    name: '随机抽取',
    desc: '从列表中随机抽取一个选项。',
    category: 'random',
    categoryLabel: '随机生成',
    resultLabel: '抽取结果',
    fields: [
      { key: 'options', label: '候选项 (用逗号分隔)', type: 'text', default: 'A,B,C,D' }
    ],
    generator: (v) => {
      const list = v.options.split(',').map(item => item.trim()).filter(Boolean);
      return list[Math.floor(Math.random() * list.length)] || '请先输入候选项';
    }
  }),
  lottery_generator: createGeneratorTool({
    id: 'lottery_generator',
    name: '大乐透号码生成器',
    desc: '随机生成一组大乐透号码。',
    category: 'random',
    categoryLabel: '随机生成',
    resultLabel: '号码组合',
    generator: () => {
      const front = new Set();
      const back = new Set();
      while (front.size < 5) front.add(Math.floor(Math.random() * 35) + 1);
      while (back.size < 2) back.add(Math.floor(Math.random() * 12) + 1);
      const frontNums = Array.from(front).sort((a, b) => a - b).map(n => String(n).padStart(2, '0'));
      const backNums = Array.from(back).sort((a, b) => a - b).map(n => String(n).padStart(2, '0'));
      return `${frontNums.join(' ')} + ${backNums.join(' ')}`;
    }
  }),
  meal_decider: createGeneratorTool({
    id: 'meal_decider',
    name: '今天吃什么',
    desc: '随机决定一顿美食。',
    category: 'random',
    categoryLabel: '随机生成',
    resultLabel: '推荐结果',
    generator: () => {
      const meals = ['火锅', '麻辣烫', '烧烤', '寿司', '轻食沙拉', '盖饭', '意面', '汤粉'];
      return meals[Math.floor(Math.random() * meals.length)];
    }
  }),
  name_generator: createGeneratorTool({
    id: 'name_generator',
    name: '随机昵称生成器',
    desc: '快速生成昵称。',
    category: 'random',
    categoryLabel: '随机生成',
    resultLabel: '昵称建议',
    generator: () => {
      const prefix = ['微光', '晨曦', '星野', '山河', '清风', '暖阳'];
      const suffix = ['漫步', '笔记', '拾光', '旅人', '航行', '信笺'];
      return prefix[Math.floor(Math.random() * prefix.length)] + suffix[Math.floor(Math.random() * suffix.length)];
    }
  }),
  quote_generator: createGeneratorTool({
    id: 'quote_generator',
    name: '每日一句',
    desc: '抽取一句激励语录。',
    category: 'random',
    categoryLabel: '随机生成',
    resultLabel: '今日语录',
    generator: () => {
      const quotes = ['今天也要保持热爱。', '专注当下，才能走得更远。', '每一次坚持都在向目标靠近。', '保持好奇心，世界会更宽广。'];
      return quotes[Math.floor(Math.random() * quotes.length)];
    }
  }),
  dice_roller: createGeneratorTool({
    id: 'dice_roller',
    name: '骰子模拟器',
    desc: '随机生成 1-6 点数。',
    category: 'random',
    categoryLabel: '随机生成',
    resultLabel: '点数',
    generator: () => Math.floor(Math.random() * 6) + 1
  }),
  color_palette: createGeneratorTool({
    id: 'color_palette',
    name: '配色生成器',
    desc: '随机生成 3 色搭配。',
    category: 'random',
    categoryLabel: '随机生成',
    resultLabel: '配色方案',
    generator: () => {
      const randomColor = () => `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`;
      return `${randomColor()} ${randomColor()} ${randomColor()}`;
    }
  }),
  password_generator: createGeneratorTool({
    id: 'password_generator',
    name: '密码生成器',
    desc: '生成强密码。',
    category: 'random',
    categoryLabel: '随机生成',
    resultLabel: '生成密码',
    fields: [
      { key: 'length', label: '密码长度', type: 'number', default: 12 }
    ],
    generator: (v) => {
      const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZabcdefghijkmnopqrstuvwxyz23456789!@#$%';
      let result = '';
      for (let i = 0; i < Number(v.length || 12); i += 1) {
        result += chars[Math.floor(Math.random() * chars.length)];
      }
      return result;
    }
  }),
  text_case: createTextTool({
    id: 'text_case',
    name: '文本大小写转换',
    desc: '快速转换大写或小写。',
    category: 'text',
    categoryLabel: '文本转换',
    resultLabel: '转换结果',
    handler: (input) => input ? `${input.toUpperCase()}\n${input.toLowerCase()}` : ''
  }),
  word_counter: createTextTool({
    id: 'word_counter',
    name: '字数统计',
    desc: '统计文本字数/字节。',
    category: 'text',
    categoryLabel: '文本转换',
    resultLabel: '统计结果',
    handler: (input) => {
      const chars = input.length;
      const words = input.trim() ? input.trim().split(/\s+/).length : 0;
      return `字符数：${chars}\n单词数：${words}`;
    }
  }),
  markdown_cleaner: createTextTool({
    id: 'markdown_cleaner',
    name: 'Markdown 清理器',
    desc: '移除 Markdown 格式符号。',
    category: 'text',
    categoryLabel: '文本转换',
    resultLabel: '纯文本',
    handler: (input) => input.replace(/[#*_>`\-]/g, '').replace(/\[(.*?)\]\(.*?\)/g, '$1')
  }),
  url_encoder: createTextTool({
    id: 'url_encoder',
    name: 'URL 编码解码',
    desc: '一键编码或解码 URL。',
    category: 'text',
    categoryLabel: '文本转换',
    resultLabel: '编码/解码结果',
    handler: (input) => input ? `${encodeURIComponent(input)}\n${decodeURIComponent(input)}` : ''
  }),
  currency_converter: createConverterTool({
    id: 'currency_converter',
    name: '汇率转换器',
    desc: '基于手动汇率快速换算。',
    category: 'text',
    categoryLabel: '文本转换',
    resultLabel: '换算结果',
    options: [
      { label: '人民币 CNY', value: 'CNY' },
      { label: '美元 USD', value: 'USD' },
      { label: '欧元 EUR', value: 'EUR' },
      { label: '日元 JPY', value: 'JPY' }
    ],
    rates: { CNY: 1, USD: 7.2, EUR: 7.9, JPY: 0.05 }
  }),
  unit_converter: createConverterTool({
    id: 'unit_converter',
    name: '长度/重量转换',
    desc: '厘米、米、千克之间换算。',
    category: 'text',
    categoryLabel: '文本转换',
    resultLabel: '换算结果',
    options: [
      { label: '厘米 cm', value: 'cm' },
      { label: '米 m', value: 'm' },
      { label: '千米 km', value: 'km' },
      { label: '克 g', value: 'g' },
      { label: '千克 kg', value: 'kg' }
    ],
    rates: { cm: 0.01, m: 1, km: 1000, g: 0.001, kg: 1 }
  }),
  water_reminder: createCounterTool({
    id: 'water_reminder',
    name: '喝水记录',
    desc: '每日喝水打卡。',
    category: 'health',
    categoryLabel: '健康生活',
    storageKey: 'webtools_water',
    target: 8
  }),
  calorie_estimator: createFormulaTool({
    id: 'calorie_estimator',
    name: '热量估算器',
    desc: '估算每日摄入热量。',
    category: 'health',
    categoryLabel: '健康生活',
    resultLabel: '估算热量 (千卡)',
    fields: [
      { key: 'carb', label: '碳水克数', unit: 'g', default: 200 },
      { key: 'protein', label: '蛋白克数', unit: 'g', default: 100 },
      { key: 'fat', label: '脂肪克数', unit: 'g', default: 60 }
    ],
    formula: (v) => v.carb * 4 + v.protein * 4 + v.fat * 9
  }),
  step_goal: createCounterTool({
    id: 'step_goal',
    name: '步数目标',
    desc: '记录每日步数完成度。',
    category: 'health',
    categoryLabel: '健康生活',
    storageKey: 'webtools_steps',
    target: 8000
  }),
  commute_cost_calculator: createFormulaTool({
    id: 'commute_cost_calculator',
    name: '通勤成本计算器',
    desc: '估算通勤交通成本。',
    category: 'calc',
    categoryLabel: '计算器',
    resultLabel: '预计通勤成本 (元)',
    fields: [
      { key: 'distance', label: '单程距离', unit: '公里', default: 15 },
      { key: 'days', label: '月通勤天数', unit: '天', default: 22 },
      { key: 'rate', label: '每公里成本', unit: '元', default: 1.2 }
    ],
    formula: (v) => v.distance * 2 * v.days * v.rate
  }),
  rent_ratio_calculator: createFormulaTool({
    id: 'rent_ratio_calculator',
    name: '房租负担比例',
    desc: '估算房租占收入比例。',
    category: 'calc',
    categoryLabel: '计算器',
    resultLabel: '房租占比 (%)',
    fields: [
      { key: 'rent', label: '月房租', unit: '元', default: 2500 },
      { key: 'income', label: '月收入', unit: '元', default: 12000 }
    ],
    formula: (v) => (v.rent / Math.max(1, v.income)) * 100
  }),
  utility_split_calculator: createFormulaTool({
    id: 'utility_split_calculator',
    name: '账单分摊计算器',
    desc: '计算多人分摊水电费。',
    category: 'calc',
    categoryLabel: '计算器',
    resultLabel: '人均分摊 (元)',
    fields: [
      { key: 'bill', label: '账单金额', unit: '元', default: 320 },
      { key: 'people', label: '分摊人数', unit: '人', default: 3 }
    ],
    formula: (v) => v.bill / Math.max(1, v.people)
  }),
  loan_interest_total_calculator: createFormulaTool({
    id: 'loan_interest_total_calculator',
    name: '贷款利息总额',
    desc: '估算贷款总利息支出。',
    category: 'calc',
    categoryLabel: '计算器',
    resultLabel: '利息总额 (元)',
    fields: [
      { key: 'principal', label: '贷款本金', unit: '元', default: 200000 },
      { key: 'rate', label: '年利率', unit: '%', default: 4.2 },
      { key: 'months', label: '期数', unit: '月', default: 240 }
    ],
    formula: (v) => {
      const monthlyRate = (v.rate / 100) / 12;
      if (monthlyRate === 0) return 0;
      const payment = (v.principal * monthlyRate) / (1 - Math.pow(1 + monthlyRate, -v.months));
      return payment * v.months - v.principal;
    }
  }),
  simple_interest_calculator: createFormulaTool({
    id: 'simple_interest_calculator',
    name: '简单利息计算器',
    desc: '按年利率估算利息收入。',
    category: 'calc',
    categoryLabel: '计算器',
    resultLabel: '利息收入 (元)',
    fields: [
      { key: 'principal', label: '本金', unit: '元', default: 10000 },
      { key: 'rate', label: '年利率', unit: '%', default: 3 },
      { key: 'years', label: '年限', unit: '年', default: 3 }
    ],
    formula: (v) => v.principal * (v.rate / 100) * v.years
  }),
  travel_budget_split_calculator: createFormulaTool({
    id: 'travel_budget_split_calculator',
    name: '旅行预算分配',
    desc: '将总预算拆分为交通、住宿、餐饮。',
    category: 'calc',
    categoryLabel: '计算器',
    resultLabel: '预算分配 (元)',
    fields: [
      { key: 'budget', label: '总预算', unit: '元', default: 6000 }
    ],
    formula: (v) => [
      { label: '交通 (40%)', value: `${formatNumber(v.budget * 0.4)} 元` },
      { label: '住宿 (40%)', value: `${formatNumber(v.budget * 0.4)} 元` },
      { label: '餐饮 (20%)', value: `${formatNumber(v.budget * 0.2)} 元` }
    ]
  }),
  childcare_cost_calculator: createFormulaTool({
    id: 'childcare_cost_calculator',
    name: '育儿成本估算',
    desc: '按月估算育儿日均成本。',
    category: 'calc',
    categoryLabel: '计算器',
    resultLabel: '日均成本 (元)',
    fields: [
      { key: 'monthly', label: '月度开销', unit: '元', default: 3500 },
      { key: 'days', label: '月天数', unit: '天', default: 30 }
    ],
    formula: (v) => v.monthly / Math.max(1, v.days)
  }),
  project_profit_calculator: createFormulaTool({
    id: 'project_profit_calculator',
    name: '项目利润计算器',
    desc: '估算项目利润与毛利率。',
    category: 'calc',
    categoryLabel: '计算器',
    resultLabel: '利润与毛利率',
    fields: [
      { key: 'revenue', label: '收入', unit: '元', default: 80000 },
      { key: 'cost', label: '成本', unit: '元', default: 50000 }
    ],
    formula: (v) => {
      const profit = v.revenue - v.cost;
      const margin = v.revenue === 0 ? 0 : profit / v.revenue * 100;
      return [
        { label: '利润', value: `${formatNumber(profit)} 元` },
        { label: '毛利率', value: `${formatNumber(margin)} %` }
      ];
    }
  }),
  break_even_time_calculator: createFormulaTool({
    id: 'break_even_time_calculator',
    name: '回本周期估算',
    desc: '估算项目回本天数。',
    category: 'calc',
    categoryLabel: '计算器',
    resultLabel: '回本周期 (天)',
    fields: [
      { key: 'investment', label: '初始投入', unit: '元', default: 30000 },
      { key: 'dailyProfit', label: '日利润', unit: '元', default: 800 }
    ],
    formula: (v) => v.investment / Math.max(1, v.dailyProfit)
  }),
  savings_interest_calculator: createFormulaTool({
    id: 'savings_interest_calculator',
    name: '储蓄利息估算',
    desc: '估算存款利息收入。',
    category: 'calc',
    categoryLabel: '计算器',
    resultLabel: '利息收入 (元)',
    fields: [
      { key: 'principal', label: '本金', unit: '元', default: 50000 },
      { key: 'rate', label: '年利率', unit: '%', default: 2.2 },
      { key: 'years', label: '年限', unit: '年', default: 2 }
    ],
    formula: (v) => v.principal * (v.rate / 100) * v.years
  }),
  salary_raise_calculator: createFormulaTool({
    id: 'salary_raise_calculator',
    name: '涨薪幅度计算器',
    desc: '计算涨薪后薪资水平。',
    category: 'calc',
    categoryLabel: '计算器',
    resultLabel: '涨薪后月薪 (元)',
    fields: [
      { key: 'current', label: '当前月薪', unit: '元', default: 10000 },
      { key: 'rate', label: '涨薪比例', unit: '%', default: 8 }
    ],
    formula: (v) => v.current * (1 + v.rate / 100)
  }),
  debt_ratio_calculator: createFormulaTool({
    id: 'debt_ratio_calculator',
    name: '负债率计算器',
    desc: '估算负债占收入比例。',
    category: 'calc',
    categoryLabel: '计算器',
    resultLabel: '负债率 (%)',
    fields: [
      { key: 'debt', label: '月负债支出', unit: '元', default: 2500 },
      { key: 'income', label: '月收入', unit: '元', default: 10000 }
    ],
    formula: (v) => (v.debt / Math.max(1, v.income)) * 100
  }),
  grocery_budget_calculator: createFormulaTool({
    id: 'grocery_budget_calculator',
    name: '买菜预算计算器',
    desc: '估算家庭每日餐饮预算。',
    category: 'calc',
    categoryLabel: '计算器',
    resultLabel: '每日预算 (元)',
    fields: [
      { key: 'monthly', label: '月餐饮预算', unit: '元', default: 3000 },
      { key: 'days', label: '月天数', unit: '天', default: 30 }
    ],
    formula: (v) => v.monthly / Math.max(1, v.days)
  }),
  electricity_savings_calculator: createFormulaTool({
    id: 'electricity_savings_calculator',
    name: '电费节省估算',
    desc: '比较节能前后的电费差额。',
    category: 'calc',
    categoryLabel: '计算器',
    resultLabel: '节省金额 (元)',
    fields: [
      { key: 'before', label: '节能前用电量', unit: '度', default: 180 },
      { key: 'after', label: '节能后用电量', unit: '度', default: 140 },
      { key: 'rate', label: '电价', unit: '元/度', default: 0.6 }
    ],
    formula: (v) => Math.max(0, (v.before - v.after) * v.rate)
  }),
  subscription_cost_calculator: createFormulaTool({
    id: 'subscription_cost_calculator',
    name: '订阅成本计算器',
    desc: '统计多平台订阅月费用。',
    category: 'calc',
    categoryLabel: '计算器',
    resultLabel: '订阅总成本 (元)',
    fields: [
      { key: 'monthly', label: '单个订阅费用', unit: '元', default: 30 },
      { key: 'count', label: '订阅数量', unit: '个', default: 4 }
    ],
    formula: (v) => v.monthly * v.count
  }),
  water_intake_calculator: createFormulaTool({
    id: 'water_intake_calculator',
    name: '每日饮水量估算',
    desc: '按体重估算每日饮水量。',
    category: 'health',
    categoryLabel: '健康生活',
    resultLabel: '建议饮水量 (ml)',
    fields: [
      { key: 'weight', label: '体重', unit: 'kg', default: 60 }
    ],
    formula: (v) => v.weight * 35
  }),
  ideal_weight_calculator: createFormulaTool({
    id: 'ideal_weight_calculator',
    name: '理想体重估算',
    desc: '根据身高估算理想体重。',
    category: 'health',
    categoryLabel: '健康生活',
    resultLabel: '理想体重 (kg)',
    fields: [
      { key: 'height', label: '身高', unit: 'cm', default: 170 }
    ],
    formula: (v) => v.height - 105
  }),
  calorie_burn_calculator: createFormulaTool({
    id: 'calorie_burn_calculator',
    name: '运动消耗估算',
    desc: '估算运动消耗热量。',
    category: 'health',
    categoryLabel: '健康生活',
    resultLabel: '消耗热量 (千卡)',
    fields: [
      { key: 'weight', label: '体重', unit: 'kg', default: 60 },
      { key: 'minutes', label: '运动时长', unit: '分钟', default: 45 },
      { key: 'met', label: '运动强度 MET', unit: '', default: 6 }
    ],
    formula: (v) => v.weight * v.met * (v.minutes / 60)
  }),
  heart_rate_zone_calculator: createFormulaTool({
    id: 'heart_rate_zone_calculator',
    name: '心率区间计算器',
    desc: '估算运动心率区间。',
    category: 'health',
    categoryLabel: '健康生活',
    resultLabel: '心率区间',
    fields: [
      { key: 'age', label: '年龄', unit: '岁', default: 28 }
    ],
    formula: (v) => {
      const max = 220 - v.age;
      return [
        { label: '燃脂区间 (60%)', value: `${Math.round(max * 0.6)} bpm` },
        { label: '耐力区间 (70%)', value: `${Math.round(max * 0.7)} bpm` },
        { label: '强度区间 (80%)', value: `${Math.round(max * 0.8)} bpm` }
      ];
    }
  }),
  sleep_debt_calculator: createFormulaTool({
    id: 'sleep_debt_calculator',
    name: '睡眠欠债计算器',
    desc: '计算一周睡眠缺口。',
    category: 'health',
    categoryLabel: '健康生活',
    resultLabel: '睡眠缺口 (小时)',
    fields: [
      { key: 'need', label: '每日需睡眠', unit: '小时', default: 8 },
      { key: 'actual', label: '每日实际睡眠', unit: '小时', default: 6.5 },
      { key: 'days', label: '统计天数', unit: '天', default: 7 }
    ],
    formula: (v) => Math.max(0, (v.need - v.actual) * v.days)
  }),
  meeting_countdown_timer: createTimerTool({
    id: 'meeting_countdown_timer',
    name: '会议倒计时',
    desc: '会议开始前倒计时提醒。',
    category: 'time',
    categoryLabel: '时间管理',
    duration: 30
  }),
  workout_interval_timer: createTimerTool({
    id: 'workout_interval_timer',
    name: '运动间歇计时',
    desc: '适用于运动训练的倒计时。',
    category: 'time',
    categoryLabel: '时间管理',
    duration: 20
  }),
  reading_timer: createTimerTool({
    id: 'reading_timer',
    name: '阅读计时器',
    desc: '记录每日阅读时长。',
    category: 'time',
    categoryLabel: '时间管理',
    duration: 30
  }),
  nap_timer: createTimerTool({
    id: 'nap_timer',
    name: '午休计时器',
    desc: '短时午休倒计时。',
    category: 'time',
    categoryLabel: '时间管理',
    duration: 20
  }),
  study_break_timer: createTimerTool({
    id: 'study_break_timer',
    name: '学习休息计时',
    desc: '安排学习间隔休息。',
    category: 'time',
    categoryLabel: '时间管理',
    duration: 10
  }),
  focus_timer: createTimerTool({
    id: 'focus_timer',
    name: '深度专注计时',
    desc: '保持 50 分钟专注节奏。',
    category: 'time',
    categoryLabel: '时间管理',
    duration: 50
  }),
  travel_checklist: createListTool({
    id: 'travel_checklist',
    name: '旅行准备清单',
    desc: '记录出行必备物品。',
    category: 'list',
    categoryLabel: '清单记录',
    storageKey: 'webtools_travel'
  }),
  home_cleaning_list: createListTool({
    id: 'home_cleaning_list',
    name: '家务清单',
    desc: '安排每周家务事项。',
    category: 'list',
    categoryLabel: '清单记录',
    storageKey: 'webtools_cleaning'
  }),
  meal_prep_list: createListTool({
    id: 'meal_prep_list',
    name: '备餐清单',
    desc: '记录一周备餐计划。',
    category: 'list',
    categoryLabel: '清单记录',
    storageKey: 'webtools_meal_prep'
  }),
  project_tasks_list: createListTool({
    id: 'project_tasks_list',
    name: '项目任务清单',
    desc: '拆解项目任务并跟进。',
    category: 'list',
    categoryLabel: '清单记录',
    storageKey: 'webtools_project_tasks'
  }),
  weekly_plan_notes: createNoteTool({
    id: 'weekly_plan_notes',
    name: '周计划笔记',
    desc: '记录每周重点事项。',
    category: 'list',
    categoryLabel: '清单记录',
    storageKey: 'webtools_weekly_plan'
  }),
  gratitude_journal_note: createNoteTool({
    id: 'gratitude_journal_note',
    name: '感恩日记',
    desc: '记录每日感恩瞬间。',
    category: 'list',
    categoryLabel: '清单记录',
    storageKey: 'webtools_gratitude'
  }),
  gift_idea_list: createListTool({
    id: 'gift_idea_list',
    name: '送礼灵感清单',
    desc: '记录送礼灵感与预算。',
    category: 'list',
    categoryLabel: '清单记录',
    storageKey: 'webtools_gift_ideas'
  }),
  movie_watchlist: createListTool({
    id: 'movie_watchlist',
    name: '观影清单',
    desc: '维护想看的电影列表。',
    category: 'list',
    categoryLabel: '清单记录',
    storageKey: 'webtools_movie'
  }),
  learning_goal_list: createListTool({
    id: 'learning_goal_list',
    name: '学习目标清单',
    desc: '记录学习目标与进度。',
    category: 'list',
    categoryLabel: '清单记录',
    storageKey: 'webtools_learning'
  }),
  shopping_budget_notes: createNoteTool({
    id: 'shopping_budget_notes',
    name: '购物预算笔记',
    desc: '记录购物预算与清单。',
    category: 'list',
    categoryLabel: '清单记录',
    storageKey: 'webtools_shopping_budget'
  }),
  coin_flip: createGeneratorTool({
    id: 'coin_flip',
    name: '抛硬币',
    desc: '随机输出正面或反面。',
    category: 'random',
    categoryLabel: '随机生成',
    resultLabel: '结果',
    generator: () => (Math.random() > 0.5 ? '正面' : '反面')
  }),
  random_number_generator: createGeneratorTool({
    id: 'random_number_generator',
    name: '随机数字生成器',
    desc: '生成指定范围内的随机数。',
    category: 'random',
    categoryLabel: '随机生成',
    resultLabel: '随机数',
    fields: [
      { key: 'min', label: '最小值', type: 'number', default: 1 },
      { key: 'max', label: '最大值', type: 'number', default: 100 }
    ],
    generator: (v) => {
      const min = Number(v.min || 0);
      const max = Number(v.max || 0);
      return Math.floor(Math.random() * (max - min + 1)) + min;
    }
  }),
  random_team_picker: createGeneratorTool({
    id: 'random_team_picker',
    name: '随机分组器',
    desc: '按照人数随机分组。',
    category: 'random',
    categoryLabel: '随机生成',
    resultLabel: '分组结果',
    fields: [
      { key: 'names', label: '成员名单 (逗号分隔)', type: 'text', default: 'A,B,C,D,E,F' },
      { key: 'size', label: '每组人数', type: 'number', default: 3 }
    ],
    generator: (v) => {
      const list = v.names.split(',').map(item => item.trim()).filter(Boolean);
      const size = Math.max(1, Number(v.size || 1));
      const shuffled = [...list].sort(() => Math.random() - 0.5);
      const groups = [];
      for (let i = 0; i < shuffled.length; i += size) {
        groups.push(shuffled.slice(i, i + size).join(' / '));
      }
      return groups.join(' | ');
    }
  }),
  random_seat_picker: createGeneratorTool({
    id: 'random_seat_picker',
    name: '随机座位抽取',
    desc: '从名单中随机抽取座位。',
    category: 'random',
    categoryLabel: '随机生成',
    resultLabel: '抽取结果',
    fields: [
      { key: 'names', label: '候选名单 (逗号分隔)', type: 'text', default: '1号座,2号座,3号座' }
    ],
    generator: (v) => {
      const list = v.names.split(',').map(item => item.trim()).filter(Boolean);
      return list[Math.floor(Math.random() * list.length)] || '请先填写候选项';
    }
  }),
  random_lucky_day: createGeneratorTool({
    id: 'random_lucky_day',
    name: '幸运星期几',
    desc: '随机抽取幸运日。',
    category: 'random',
    categoryLabel: '随机生成',
    resultLabel: '幸运日',
    generator: () => {
      const days = ['周一', '周二', '周三', '周四', '周五', '周六', '周日'];
      return days[Math.floor(Math.random() * days.length)];
    }
  }),
  random_activity: createGeneratorTool({
    id: 'random_activity',
    name: '随机活动选择',
    desc: '从活动清单中随机选择。',
    category: 'random',
    categoryLabel: '随机生成',
    resultLabel: '推荐活动',
    fields: [
      { key: 'options', label: '活动列表 (逗号分隔)', type: 'text', default: '跑步,看书,电影,散步' }
    ],
    generator: (v) => {
      const list = v.options.split(',').map(item => item.trim()).filter(Boolean);
      return list[Math.floor(Math.random() * list.length)] || '请先输入活动';
    }
  }),
  random_color_name: createGeneratorTool({
    id: 'random_color_name',
    name: '随机颜色名称',
    desc: '随机生成颜色名称。',
    category: 'random',
    categoryLabel: '随机生成',
    resultLabel: '颜色名称',
    generator: () => {
      const colors = ['晴空蓝', '薄荷绿', '珊瑚橘', '奶油黄', '烟灰紫'];
      return colors[Math.floor(Math.random() * colors.length)];
    }
  }),
  random_time_slot: createGeneratorTool({
    id: 'random_time_slot',
    name: '随机时间段',
    desc: '随机抽取一个时间段。',
    category: 'random',
    categoryLabel: '随机生成',
    resultLabel: '时间段',
    generator: () => {
      const slots = ['08:00-10:00', '10:00-12:00', '14:00-16:00', '16:00-18:00'];
      return slots[Math.floor(Math.random() * slots.length)];
    }
  }),
  random_city_picker: createGeneratorTool({
    id: 'random_city_picker',
    name: '随机城市抽取',
    desc: '随机选择一个城市目的地。',
    category: 'random',
    categoryLabel: '随机生成',
    resultLabel: '推荐城市',
    fields: [
      { key: 'cities', label: '城市列表 (逗号分隔)', type: 'text', default: '上海,成都,杭州,厦门' }
    ],
    generator: (v) => {
      const list = v.cities.split(',').map(item => item.trim()).filter(Boolean);
      return list[Math.floor(Math.random() * list.length)] || '请先输入城市';
    }
  }),
  random_reward: createGeneratorTool({
    id: 'random_reward',
    name: '随机奖励抽取',
    desc: '随机抽取奖励方案。',
    category: 'random',
    categoryLabel: '随机生成',
    resultLabel: '奖励',
    fields: [
      { key: 'rewards', label: '奖励列表 (逗号分隔)', type: 'text', default: '休息10分钟,喝奶茶,看一集剧' }
    ],
    generator: (v) => {
      const list = v.rewards.split(',').map(item => item.trim()).filter(Boolean);
      return list[Math.floor(Math.random() * list.length)] || '请先输入奖励';
    }
  }),
  trim_spaces_tool: createTextTool({
    id: 'trim_spaces_tool',
    name: '空格清理器',
    desc: '删除文本首尾空格。',
    category: 'text',
    categoryLabel: '文本转换',
    resultLabel: '清理结果',
    handler: (input) => input.trim()
  }),
  remove_blank_lines_tool: createTextTool({
    id: 'remove_blank_lines_tool',
    name: '空行删除器',
    desc: '删除文本中的空行。',
    category: 'text',
    categoryLabel: '文本转换',
    resultLabel: '处理结果',
    handler: (input) => input.split(/\n+/).filter(line => line.trim()).join('\n')
  }),
  temperature_converter: createConverterTool({
    id: 'temperature_converter',
    name: '温度转换器',
    desc: '摄氏度与华氏度换算。',
    category: 'text',
    categoryLabel: '文本转换',
    resultLabel: '换算结果',
    options: [
      { label: '摄氏度 ℃', value: 'C' },
      { label: '华氏度 ℉', value: 'F' }
    ],
    rates: { C: 1, F: 1 }
  }),
  data_size_converter: createConverterTool({
    id: 'data_size_converter',
    name: '数据大小转换',
    desc: 'KB、MB、GB 之间换算。',
    category: 'text',
    categoryLabel: '文本转换',
    resultLabel: '换算结果',
    options: [
      { label: 'KB', value: 'KB' },
      { label: 'MB', value: 'MB' },
      { label: 'GB', value: 'GB' }
    ],
    rates: { KB: 1, MB: 1024, GB: 1024 * 1024 }
  })
};

function webtoolPage(toolId) {
  return {
    showSettings: false,
    apiConfig: { deepseek: '', model: 'deepseek-v4-flash' },
    tool: null,

    init() {
      try {
        const saved = localStorage.getItem('global_llm_config');
        if (saved) {
          this.apiConfig = { ...this.apiConfig, ...JSON.parse(saved) };
        }
      } catch (e) {
        console.error('Failed to parse global_llm_config', e);
      }
      this.tool = JSON.parse(JSON.stringify(webtoolsToolConfigs[toolId] || null));
      if (!this.tool) return;

      if (this.tool.type === 'list') {
        this.loadList(this.tool);
      }
      if (this.tool.type === 'note') {
        this.loadNote(this.tool);
      }
      if (this.tool.type === 'ledger') {
        this.loadLedger(this.tool);
      }
      if (this.tool.type === 'counter') {
        this.loadCounter(this.tool);
      }
      if (typeof lucide !== 'undefined' && lucide.createIcons) {
        lucide.createIcons();
      }
    },

    saveConfig() {
      let current = {};
      try {
        current = JSON.parse(localStorage.getItem('global_llm_config') || '{}');
      } catch (e) {
        console.error('Failed to parse global_llm_config', e);
      }
      localStorage.setItem('global_llm_config', JSON.stringify({
        ...current,
        ...this.apiConfig
      }));
      this.showSettings = false;
    },

    calculate(tool) {
      const result = tool.formula(tool.values);
      tool.result = Array.isArray(result) ? result : `${formatNumber(result)} ${tool.unit || ''}`.trim();
    },

    startTimer(tool) {
      if (tool.intervalId) return;
      tool.remaining = tool.duration * 60;
      tool.intervalId = setInterval(() => {
        if (tool.remaining <= 0) {
          clearInterval(tool.intervalId);
          tool.intervalId = null;
        } else {
          tool.remaining -= 1;
        }
      }, 1000);
    },

    pauseTimer(tool) {
      clearInterval(tool.intervalId);
      tool.intervalId = null;
    },

    resetTimer(tool) {
      clearInterval(tool.intervalId);
      tool.intervalId = null;
      tool.remaining = tool.duration * 60;
    },

    startPomodoro(tool) {
      if (tool.intervalId) return;
      tool.intervalId = setInterval(() => {
        if (tool.remaining <= 0) {
          tool.phase = tool.phase === 'work' ? 'break' : 'work';
          tool.remaining = (tool.phase === 'work' ? tool.workMinutes : tool.breakMinutes) * 60;
          tool.phaseLabel = tool.phase === 'work' ? '专注中' : '休息中';
        } else {
          tool.remaining -= 1;
        }
      }, 1000);
    },

    pausePomodoro(tool) {
      clearInterval(tool.intervalId);
      tool.intervalId = null;
    },

    resetPomodoro(tool) {
      clearInterval(tool.intervalId);
      tool.intervalId = null;
      tool.phase = 'work';
      tool.phaseLabel = '专注中';
      tool.remaining = tool.workMinutes * 60;
    },

    startStopwatch(tool) {
      if (tool.intervalId) return;
      tool.intervalId = setInterval(() => {
        tool.elapsed += 1;
      }, 1000);
    },

    pauseStopwatch(tool) {
      clearInterval(tool.intervalId);
      tool.intervalId = null;
    },

    resetStopwatch(tool) {
      clearInterval(tool.intervalId);
      tool.intervalId = null;
      tool.elapsed = 0;
    },

    addListItem(tool) {
      const text = tool.input.trim();
      if (!text) return;
      tool.items.unshift({ id: crypto.randomUUID(), text, done: false });
      tool.input = '';
      this.saveList(tool);
    },

    removeListItem(tool, index) {
      tool.items.splice(index, 1);
      this.saveList(tool);
    },

    saveList(tool) {
      localStorage.setItem(tool.storageKey, JSON.stringify(tool.items));
    },

    loadList(tool) {
      const saved = localStorage.getItem(tool.storageKey);
      if (saved) {
        try {
          tool.items = JSON.parse(saved);
        } catch (e) {
          console.error('Failed to parse list data', e);
        }
      }
    },

    saveNote(tool) {
      localStorage.setItem(tool.storageKey, tool.content);
    },

    loadNote(tool) {
      const saved = localStorage.getItem(tool.storageKey);
      if (saved) {
        tool.content = saved;
      }
    },

    addLedgerEntry(tool) {
      if (!tool.form.amount || !tool.form.category) return;
      tool.entries.unshift({
        id: crypto.randomUUID(),
        amount: Number(tool.form.amount),
        category: tool.form.category,
        note: tool.form.note
      });
      tool.form = { amount: 0, category: '', note: '' };
      this.updateLedgerTotal(tool);
      this.saveLedger(tool);
    },

    removeLedgerEntry(tool, index) {
      tool.entries.splice(index, 1);
      this.updateLedgerTotal(tool);
      this.saveLedger(tool);
    },

    updateLedgerTotal(tool) {
      tool.total = tool.entries.reduce((sum, entry) => sum + entry.amount, 0);
    },

    saveLedger(tool) {
      localStorage.setItem(tool.storageKey, JSON.stringify(tool.entries));
    },

    loadLedger(tool) {
      const saved = localStorage.getItem(tool.storageKey);
      if (saved) {
        try {
          tool.entries = JSON.parse(saved);
          this.updateLedgerTotal(tool);
        } catch (e) {
          console.error('Failed to parse ledger data', e);
        }
      }
    },

    runGenerator(tool) {
      tool.result = tool.generator(tool.values || {});
    },

    runTextTool(tool) {
      tool.output = tool.handler(tool.input || '');
    },

    runConverter(tool) {
      if (tool.id === 'temperature_converter') {
        const value = Number(tool.value || 0);
        if (tool.from === tool.to) {
          tool.result = formatNumber(value);
          return;
        }
        if (tool.from === 'C' && tool.to === 'F') {
          tool.result = formatNumber(value * 9 / 5 + 32);
          return;
        }
        if (tool.from === 'F' && tool.to === 'C') {
          tool.result = formatNumber((value - 32) * 5 / 9);
          return;
        }
      }
      const base = tool.rates[tool.from];
      const target = tool.rates[tool.to];
      tool.result = formatNumber((tool.value * base) / target);
    },

    incrementCounter(tool) {
      tool.count += 1;
      this.saveCounter(tool);
    },

    resetCounter(tool) {
      tool.count = 0;
      this.saveCounter(tool);
    },

    saveCounter(tool) {
      if (!tool.storageKey) return;
      localStorage.setItem(tool.storageKey, JSON.stringify({ count: tool.count, target: tool.target }));
    },

    loadCounter(tool) {
      if (!tool.storageKey) return;
      const saved = localStorage.getItem(tool.storageKey);
      if (saved) {
        try {
          const data = JSON.parse(saved);
          tool.count = data.count ?? tool.count;
          tool.target = data.target ?? tool.target;
        } catch (e) {
          console.error('Failed to parse counter data', e);
        }
      }
    },

    formatTime(seconds) {
      const mins = Math.floor(seconds / 60).toString().padStart(2, '0');
      const secs = Math.floor(seconds % 60).toString().padStart(2, '0');
      return `${mins}:${secs}`;
    },

    formatCurrency(value) {
      return `${formatNumber(value)} 元`;
    }
  };
}

window.webtoolPage = webtoolPage;
