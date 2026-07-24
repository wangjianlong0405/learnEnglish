import { LEVEL_RANK, AGE_LEVELS } from "./words.js";

export const unitQuestions = [
  { level: "A2", type: "词汇搭配", question: "选择最自然的搭配：", options: ["make a decision", "do a decision", "build a decision", "take a decisioning"], answer: 0, note: "make a decision 是固定搭配。" },
  { level: "A2", type: "词汇搭配", question: "哪个搭配最自然？", options: ["do a mistake", "make a mistake", "build a mistake", "create mistake"], answer: 1, note: "犯错通常说 make a mistake。" },
  { level: "A2", type: "词汇搭配", question: "“取得进步”更自然的是：", options: ["do progress", "make progress", "build a progress", "take progressing"], answer: 1, note: "make progress 是常见搭配。" },
  { level: "B1", type: "时态", question: "I ___ this book twice, so I know the story well.", options: ["read", "have read", "am reading", "had read yesterday"], answer: 1, note: "未说明具体过去时间的人生经历使用现在完成时。" },
  { level: "B1", type: "时态", question: "While I ___ dinner, the phone rang.", options: ["cook", "was cooking", "have cooked", "am cook"], answer: 1, note: "过去进行时描述电话响起时正在进行的动作。" },
  { level: "B2", type: "时态", question: "By next month, she ___ here for a year.", options: ["works", "will have worked", "is working", "worked"], answer: 1, note: "到将来某时为止已完成的动作，用将来完成时。" },
  { level: "A1", type: "语音", question: "哪个单词的第一音节重读？", options: ["reLAX", "beGIN", "TAble", "aRRIVE"], answer: 2, note: "table 的重音在第一音节：/ˈteɪbəl/。" },
  { level: "B1", type: "语音", question: "photograph 与 photography 的重音变化说明：", options: ["词性变化不影响重音", "派生后重音可能移动", "所有多音节词重音都在词首", "重音只出现在动词中"], answer: 1, note: "英语派生词常出现重音转移，如 PHOtograph → phoTOGraphy。" },
  { level: "A2", type: "情景表达", question: "礼貌请求对方重复，应说：", options: ["Say again now.", "Could you say that again, please?", "You are wrong.", "Repeat is needed."], answer: 1, note: "Could you...? 加 please 是自然礼貌的请求。" },
  { level: "B2", type: "情景表达", question: "开会时想礼貌插话，较合适的是：", options: ["Stop. Listen to me.", "Sorry to interrupt, may I add something?", "You must hear me now.", "I talk first always."], answer: 1, note: "Sorry to interrupt... 是职场中常见的礼貌插话方式。" },
  { level: "A2", type: "情景表达", question: "想确认截止日期，较自然的是：", options: ["Deadline when?", "Just to confirm, is the deadline Friday?", "You tell deadline now!", "Deadline is ask."], answer: 1, note: "Just to confirm... 是礼貌确认信息的常用说法。" },
  { level: "B2", type: "条件句", question: "If she had left earlier, she ___ the train.", options: ["would catch", "would have caught", "caught", "will catch"], answer: 1, note: "对过去事实的假设使用 would have + 过去分词。" },
  { level: "B1", type: "条件句", question: "If it rains tomorrow, we ___ indoors.", options: ["will stay", "would stayed", "staying", "have stay"], answer: 0, note: "真实条件句：If + 现在时，主句常用 will。" },
  { level: "B2", type: "阅读推断", question: "“The plan is practical, although its cost remains a concern.” 表明作者：", options: ["完全反对计划", "认为计划可行但担心成本", "不知道计划内容", "只关注时间"], answer: 1, note: "although 引出与主要判断并存的保留意见。" },
  { level: "B1", type: "从句", question: "The person ___ helped me was very patient.", options: ["which", "who", "where", "whose book"], answer: 1, note: "先行词是 person，并在从句中作主语，使用 who。" },
  { level: "B2", type: "语篇连接", question: "The data was limited. ___, the team avoided making a final claim.", options: ["For example", "As a result", "Meanwhile person", "In addition to"], answer: 1, note: "后句是前句的结果，使用 As a result。" },
  { level: "A2", type: "词汇搭配", question: "“提出建议”更自然的是：", options: ["make a suggestion", "do a suggestion", "build suggestion", "take suggesting"], answer: 0, note: "make a suggestion 是固定搭配。" },
  { level: "B1", type: "时态", question: "She ___ in London since 2020.", options: ["lives", "has lived", "is live", "lived always"], answer: 1, note: "since + 时间点，用现在完成时表示持续到现在。" },
  { level: "A2", type: "情景表达", question: "商店里想试穿外套，较自然的是：", options: ["I try this now.", "Could I try this on, please?", "Give try coat.", "Trying is must."], answer: 1, note: "try on 表示试穿，Could I... please? 更礼貌。" },
  { level: "B1", type: "从句", question: "This is the café ___ we first met.", options: ["who", "which person", "where", "whose"], answer: 2, note: "先行词是地点，用 where。" },
  { level: "Pre-A1", type: "基础词汇", question: "cat 的中文意思是：", options: ["狗", "猫", "鸟", "鱼"], answer: 1, note: "cat 表示猫。" },
  { level: "Pre-A1", type: "基础句型", question: "选择正确句子：", options: ["This is a book.", "This are a book.", "This be book.", "Book this is a."], answer: 0, note: "This is + a + 单数名词。" },
  { level: "Pre-A1", type: "颜色数字", question: "banana 常见颜色是：", options: ["blue", "yellow", "black", "pink"], answer: 1, note: "香蕉通常是 yellow。" },
  { level: "Pre-A1", type: "颜色数字", question: "“三个”英语是：", options: ["two", "three", "ten", "one"], answer: 1, note: "three = 三。" },
  { level: "Pre-A1", type: "动作", question: "“我能跳”较自然的是：", options: ["I can jump.", "I can to jump.", "I cans jump.", "Jump I can."], answer: 0, note: "can + 动词原形。" },
  { level: "Pre-A1", type: "家庭", question: "介绍爸爸，可以说：", options: ["This is my father.", "Father this is.", "My father this.", "Is father my."], answer: 0, note: "This is my father." },
  { level: "Pre-A1", type: "学校", question: "book 的意思是：", options: ["书", "包", "牛奶", "狮子"], answer: 0, note: "book 表示书。" },
  { level: "Pre-A1", type: "喜好", question: "I ___ cake.", options: ["like", "likes", "liking", "liked always"], answer: 0, note: "主语 I 用 like。" },
  { level: "A1", type: "日常表达", question: "表达喜欢音乐，较自然的是：", options: ["I like music.", "I likes music.", "Me like music.", "Like I music."], answer: 0, note: "I like + 名词。" },
  { level: "A1", type: "时态", question: "She ___ breakfast at seven every day.", options: ["eat", "eats", "eating", "eated"], answer: 1, note: "第三人称单数一般现在时用 eats。" },
  { level: "A1", type: "情景表达", question: "询问天气，可以说：", options: ["What’s the weather like today?", "How weather?", "Weather you?", "Today weather say."], answer: 0, note: "What’s the weather like…? 是标准问法。" },
  { level: "B2", type: "词汇", question: "nuance 最接近：", options: ["细微差别", "行李箱", "收据", "香蕉"], answer: 0, note: "nuance 表示细微差别。" },
  { level: "B2", type: "语篇连接", question: "补充另一优点，较合适的是：", options: ["However", "In addition", "Instead of person", "As a result only wrong"], answer: 1, note: "In addition 表补充。" },
];

export const quiz = [
  { level: "A2", type: "选择最自然的表达", question: "第一次见面时，你会怎么说？", options: ["Nice to meet you.", "Nice meeting yesterday.", "Good to see yesterday.", "Meet you nice."], answer: 0, success: "很好！这是初次见面最自然的表达。" },
  { level: "A1", type: "补全句子", question: "Let me ___ myself. I’m Alex.", options: ["talk", "introduce", "say", "meet"], answer: 1, success: "正确！introduce myself 表示“自我介绍”。" },
  { level: "A2", type: "理解含义", question: "“How’s it going?” 最接近下面哪句话？", options: ["你要去哪里？", "事情进行了吗？", "最近怎么样？", "你怎么走？"], answer: 2, success: "答对了！它是很常见的非正式问候。" },
  { level: "A2", type: "情景应答", question: "别人说 “It’s a pleasure to meet you.”，你可以回答：", options: ["I’m pleasure.", "The pleasure is mine.", "Meet is good.", "You are welcome."], answer: 1, success: "非常棒！The pleasure is mine 表示“我也很荣幸”。" },
  { level: "A2", type: "选择最自然的表达", question: "想约朋友喝咖啡，较自然的是：", options: ["You come coffee now.", "Would you like to grab a coffee later?", "Coffee is order.", "I command coffee meeting."], answer: 1, success: "Would you like to... 是礼貌又自然的邀请。" },
  { level: "A2", type: "补全句子", question: "Could you ___ me the way to the library?", options: ["say", "tell", "speak", "talk"], answer: 1, success: "tell someone the way 表示给某人指路。" },
  { level: "B1", type: "理解含义", question: "“I’m tied up this afternoon.” 最接近：", options: ["我下午被绳子绑住了", "我下午很忙，抽不开身", "我下午要去运动", "我下午已经出发了"], answer: 1, success: "tied up 在口语里常表示忙得脱不开身。" },
  { level: "A2", type: "情景应答", question: "服务员问 “Anything else?”，你可以回答：", options: ["No, that’s all. Thanks.", "Yes, I am else.", "Anything is good bye.", "Else please stop."], answer: 0, success: "No, that’s all. 是结束点单时的常用回应。" },
  { level: "A2", type: "选择最自然的表达", question: "想请老师解释一遍，较合适的是：", options: ["Explain again now.", "Could you explain that once more, please?", "You must say.", "Say me again."], answer: 1, success: "Could you... please? 是课堂里礼貌提问的常用句式。" },
  { level: "A1", type: "补全句子", question: "I usually ___ vocabulary before breakfast.", options: ["review", "reviews", "reviewing", "reviewed always"], answer: 0, success: "主语是 I，一般现在时用 review。" },
  { level: "B1", type: "理解含义", question: "“Let’s keep it short.” 最接近：", options: ["我们把它留着", "我们说简短一点", "我们马上离开", "我们再写长一点"], answer: 1, success: "keep it short 表示尽量简短。" },
  { level: "A1", type: "情景应答", question: "同事说 “Thanks for your help.”，你可以回答：", options: ["You’re welcome.", "I am thanks.", "Help is you.", "No your welcome."], answer: 0, success: "You’re welcome. 是最自然的回应。" },
  { level: "A2", type: "选择最自然的表达", question: "想预约餐厅，较自然的是：", options: ["Give me table now.", "I’d like to make a reservation for two.", "Reservation is you.", "Table must come."], answer: 1, success: "make a reservation 是预订座位的常用说法。" },
  { level: "A2", type: "补全句子", question: "Please keep the ___ in case you need a refund.", options: ["receipt", "recipe", "receive", "recess"], answer: 0, success: "receipt 指收据；recipe 是食谱。" },
  { level: "B1", type: "理解含义", question: "“I’m under the weather.” 最接近：", options: ["我在天气下面", "我身体有点不舒服", "我很喜欢下雨", "我准备出门"], answer: 1, success: "under the weather 是表示身体不适的习语。" },
  { level: "A2", type: "情景应答", question: "朋友问 “Do you mind if I open the window?”，你可以回答：", options: ["Yes, I mind open.", "Not at all. Go ahead.", "Window is no.", "I am mind."], answer: 1, success: "Not at all. Go ahead. 表示不介意、请随意。" },
  { level: "B1", type: "选择最自然的表达", question: "会议上想确认理解，较合适的是：", options: ["You wrong.", "Just to clarify, do we start on Monday?", "Clarify me now.", "Start is Monday always yes?"], answer: 1, success: "Just to clarify... 是礼貌确认信息的常用表达。" },
  { level: "B1", type: "补全句子", question: "Turn off your phone to avoid ___.", options: ["distraction", "distract", "distracting always", "distracts"], answer: 0, success: "avoid 后接名词：distraction。" },
  { level: "B2", type: "理解含义", question: "“Let’s touch base next week.” 最接近：", options: ["下周一起打球", "下周再联系沟通一下", "下周搬家", "下周考试"], answer: 1, success: "touch base 在职场口语里表示简单联系/同步进度。" },
  { level: "A1", type: "情景应答", question: "店员说 “Would you like a bag?”，你可以回答：", options: ["Yes, please. / No, thanks.", "Bag is me.", "I am bag.", "Would you bag."], answer: 0, success: "Yes, please. 或 No, thanks. 是最自然的回应。" },
  { level: "Pre-A1", type: "看图选词", question: "“这是一只熊猫”较自然的是：", options: ["This is a panda.", "I like apples only.", "It are panda.", "Panda this."], answer: 0, success: "This is a panda. 适合启蒙介绍。" },
  { level: "Pre-A1", type: "颜色", question: "苹果常常是：", options: ["a red apple", "an apple red", "apple a red", "reds apple"], answer: 0, success: "形容词放在名词前：a red apple。" },
  { level: "Pre-A1", type: "数字", question: "I can count to ___.", options: ["ten", "tan", "tin", "tone"], answer: 0, success: "ten 表示十。" },
  { level: "Pre-A1", type: "指令", question: "“拍拍手”可以说：", options: ["Clap your hands.", "Eat your head.", "Close your milk.", "Jump your book."], answer: 0, success: "Clap your hands 是常见指令。" },
  { level: "Pre-A1", type: "动物", question: "fish 的意思是：", options: ["鱼", "鸟", "狗", "鸭子"], answer: 0, success: "fish 表示鱼。" },
  { level: "Pre-A1", type: "颜色", question: "The sky is ___.", options: ["blue", "bread", "brother", "bag"], answer: 0, success: "sky 常与 blue 搭配。" },
  { level: "Pre-A1", type: "学校", question: "I go to ___.", options: ["school", "swim only", "sunny", "sorry"], answer: 0, success: "go to school 是常用表达。" },
  { level: "Pre-A1", type: "拥有", question: "I ___ a pencil.", options: ["have", "has", "having", "had always"], answer: 0, success: "I have + 名词。" },
  { level: "A1", type: "家庭", question: "介绍家人，可以说：", options: ["This is my mother.", "Mother this is my.", "My mother this.", "Is mother my."], answer: 0, success: "This is my… 用于介绍家人。" },
  { level: "A1", type: "天气", question: "It’s ___ today. Take a jacket.", options: ["cold", "cake", "cat", "count"], answer: 0, success: "cold 表示冷，搭配穿外套。" },
  { level: "B2", type: "职场", question: "礼貌插话，较合适的是：", options: ["Stop now.", "Sorry to interrupt, may I add something?", "You listen me.", "I talk first always."], answer: 1, success: "Sorry to interrupt… 是得体插话。" },
  { level: "B2", type: "论证", question: "引出证据，较自然的是：", options: ["The evidence suggests…", "The evidence eats…", "Evidence me.", "Suggest the evidence you."], answer: 0, success: "The evidence suggests… 适合论证。" },
  { level: "B2", type: "词汇", question: "fluency 最接近：", options: ["流利度", "处方", "雨伞", "铅笔"], answer: 0, success: "fluency 表示流利度。" },
];

/** Filter practice items to the learner's CEFR band (or age track if unset). */
export function filterPracticeByLevel(items, learnerLevel, selectedAge = "kids") {
  let pool;
  if (learnerLevel in LEVEL_RANK) {
    const max = LEVEL_RANK[learnerLevel];
    pool = items.filter((item) => (LEVEL_RANK[item.level] ?? 99) <= max);
  } else {
    const allowed = AGE_LEVELS[selectedAge] || AGE_LEVELS.kids;
    pool = items.filter((item) => allowed.includes(item.level));
  }
  return pool.length ? pool : items;
}

/** Build a session deck: prefer current-level items, fill from lower levels, cap size. */
export function buildPracticeSession(items, learnerLevel, selectedAge = "kids", size = 12) {
  const pool = filterPracticeByLevel(items, learnerLevel, selectedAge);
  if (learnerLevel in LEVEL_RANK) {
    const exact = pool.filter((item) => item.level === learnerLevel);
    const lower = pool.filter((item) => item.level !== learnerLevel);
    const ordered = [...exact, ...lower];
    return ordered.slice(0, Math.min(size, ordered.length));
  }
  return pool.slice(0, Math.min(size, pool.length));
}
