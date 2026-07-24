/** Adult A1-A2 pathway: four practical units, five course packs each. */
export const adultCourseUnits = [
  {
    id: "meet-start",
    title: "Meet & Start",
    subtitle: "认识与开始",
    level: "A1",
    goal: "在第一次见面时介绍自己、聊一点日常，并约定下一步。",
    lessons: [
      ["A1", "介绍自己和家人"],
      ["A1", "认识新朋友"],
      ["A1", "描述喜好与能力"],
      ["A1", "写一条简短消息"],
      ["A1", "安排一次见面"],
    ],
    task: "真实听说任务：录一段 30 秒语音，介绍自己、一个兴趣，并邀请对方在具体时间见面。",
  },
  {
    id: "daily-life",
    title: "Daily Life",
    subtitle: "日常生活",
    level: "A1",
    goal: "说清日常安排、天气与简单的生活需求。",
    lessons: [
      ["A1", "谈论每天的生活"],
      ["A1", "谈论天气与穿着"],
      ["A1", "完成基础生活任务"],
      ["A1", "在酒店办理入住"],
      ["A2", "聊聊日常安排"],
    ],
    task: "真实听说任务：看着自己的日程，用 45 秒说明一天安排、天气和一项生活需求。",
  },
  {
    id: "out-about",
    title: "Out & About",
    subtitle: "外出办事",
    level: "A1-A2",
    goal: "完成点餐、出行、问路与购物中的基本交流。",
    lessons: [
      ["A1", "问路与搭乘交通"],
      ["A2", "在咖啡店点单"],
      ["A2", "问路与指路"],
      ["A2", "购物退换与询问"],
      ["A2", "确认旅行安排"],
    ],
    task: "真实听说任务：角色扮演一次出行，完成点单、问路或确认车次中的两轮来回对话。",
  },
  {
    id: "people-plans",
    title: "People & Plans",
    subtitle: "人物与计划",
    level: "A2",
    goal: "描述人物与经历，礼貌调整安排，并说明接下来的计划。",
    lessons: [
      ["A1", "描述熟悉的人"],
      ["A2", "预约与改期"],
      ["A2", "讲述昨天的经历"],
      ["A2", "制定周末计划"],
      ["A2", "处理简单服务问题"],
    ],
    task: "真实听说任务：录一段 60 秒语音，介绍一个人、讲一件昨天的事，并提出一个周末计划。",
  },
];

export function adultUnitById(id) {
  return adultCourseUnits.find((unit) => unit.id === id);
}
