export const grammarCategories = [
  {
    id: "all",
    title: "全部",
    description: "浏览完整语法目录"
  },
  {
    id: "basics",
    title: "基础句型",
    description: "be 动词、There be、简单句"
  },
  {
    id: "tenses",
    title: "时态",
    description: "现在、过去、进行与完成"
  },
  {
    id: "modals",
    title: "情态与语态",
    description: "情态动词、被动语态"
  },
  {
    id: "clauses",
    title: "从句与非谓语",
    description: "定语从句、条件句、非谓语"
  }
];

export const grammarTopics = [
  {
    id: "be-verb",
    category: "basics",
    level: "Pre-A1",
    title: "be 动词",
    summary: "用 am / is / are 描述身份、状态和特征。",
    formula: "I am / He is / They are + 名词或形容词",
    example: "This is my book. They are happy.",
    tips: ["I 配 am，he/she/it 配 is，you/we/they 配 are", "否定在 be 后加 not：isn’t / aren’t"],
    questions: [
      {
        question: "She ___ a teacher.",
        options: ["am", "is", "are", "be"],
        answer: 1,
        note: "主语 she 使用 is。"
      },
      {
        question: "选择正确的否定句：",
        options: ["They not are ready.", "They aren’t ready.", "They no are ready.", "They isn’t ready."],
        answer: 1,
        note: "复数主语用 aren’t。"
      },
      {
        question: "I ___ ready for class.",
        options: ["am", "is", "are", "be"],
        answer: 0,
        note: "主语 I 配 am。"
      },
      {
        question: "选择正确句子：",
        options: ["He are my friend.", "He is my friend.", "He am my friend.", "He be my friend."],
        answer: 1,
        note: "he 配 is。"
      }
    ]
  },
  {
    id: "there-be",
    category: "basics",
    level: "A1",
    title: "There be 句型",
    summary: "表示某处存在某人或某物。",
    formula: "There is + 单数 / There are + 复数",
    example: "There is a café near the park.",
    tips: ["就近原则：看紧跟的名词是单数还是复数", "提问常用 Is there / Are there"],
    questions: [
      {
        question: "___ two pencils on the desk.",
        options: ["There is", "There are", "There have", "There has"],
        answer: 1,
        note: "two pencils 是复数，用 There are。"
      },
      {
        question: "选择正确问句：",
        options: ["Have there a bus?", "Is there a bus stop nearby?", "Are there a bus?", "There is bus?"],
        answer: 1,
        note: "单数存在用 Is there…?"
      },
      {
        question: "There ___ a book and two pens on the table.",
        options: ["are", "is", "have", "has"],
        answer: 1,
        note: "就近原则：紧跟的 a book 是单数，用 is。"
      },
      {
        question: "___ any seats left?",
        options: ["Is there", "Are there", "Have there", "There are"],
        answer: 1,
        note: "seats 复数，疑问用 Are there。"
      }
    ]
  },
  {
    id: "present-simple",
    category: "tenses",
    level: "A1",
    title: "一般现在时",
    summary: "表达习惯、事实和重复发生的动作。",
    formula: "主语 + V / Vs(+es)",
    example: "She goes to school every day.",
    tips: ["第三人称单数动词加 -s/-es", "常用 every day、usually、always"],
    questions: [
      {
        question: "He ___ coffee every morning.",
        options: ["drink", "drinks", "drinking", "drank"],
        answer: 1,
        note: "he 是第三人称单数，用 drinks。"
      },
      {
        question: "选择正确句子：",
        options: ["I goes home at six.", "She go home at six.", "They go home at six.", "He go home at six."],
        answer: 2,
        note: "they 用原形 go。"
      },
      {
        question: "She ___ to school by bus.",
        options: ["go", "goes", "going", "gone"],
        answer: 1,
        note: "第三人称单数加 -es：goes。"
      },
      {
        question: "We ___ breakfast at seven every day.",
        options: ["eats", "eat", "eating", "ate"],
        answer: 1,
        note: "we 用动词原形 eat。"
      }
    ]
  },
  {
    id: "present-continuous",
    category: "tenses",
    level: "A1",
    title: "现在进行时",
    summary: "表达此刻或现阶段正在发生的动作。",
    formula: "主语 + am/is/are + V-ing",
    example: "Look! The children are playing in the garden.",
    tips: ["常和 now、Look!、at the moment 连用", "也可表示近期临时安排"],
    questions: [
      {
        question: "Listen! Someone ___ the piano.",
        options: ["plays", "is playing", "play", "played"],
        answer: 1,
        note: "Listen! 提示正在发生，用现在进行时。"
      },
      {
        question: "Today I ___ the bus instead of walking.",
        options: ["take", "am taking", "takes", "took"],
        answer: 1,
        note: "today 表示临时安排，可用进行时。"
      },
      {
        question: "Look! They ___ football in the park.",
        options: ["play", "plays", "are playing", "played"],
        answer: 2,
        note: "Look! 提示此刻正在发生。"
      },
      {
        question: "选择正确句子：",
        options: ["I am study now.", "I studying now.", "I am studying now.", "I studies now."],
        answer: 2,
        note: "am/is/are + V-ing。"
      }
    ]
  },
  {
    id: "past-simple",
    category: "tenses",
    level: "A2",
    title: "一般过去时",
    summary: "描述过去某个时间发生并已结束的动作。",
    formula: "主语 + V-ed / 不规则过去式",
    example: "Yesterday we finished a science project.",
    tips: ["常和 yesterday、last week、ago 连用", "不规则动词需单独记忆：go→went"],
    questions: [
      {
        question: "They ___ the museum last Sunday.",
        options: ["visit", "visited", "are visiting", "have visit"],
        answer: 1,
        note: "last Sunday 提示一般过去时。"
      },
      {
        question: "She ___ to London two years ago.",
        options: ["go", "goes", "went", "gone"],
        answer: 2,
        note: "go 的过去式是 went。"
      },
      {
        question: "We ___ home late last night.",
        options: ["arrive", "arrived", "arriving", "have arrive"],
        answer: 1,
        note: "last night 用一般过去时。"
      },
      {
        question: "选择正确问句：",
        options: ["Did you went there?", "Did you go there?", "Do you went there?", "Were you go there?"],
        answer: 1,
        note: "Did + 原形：Did you go…?"
      }
    ]
  },
  {
    id: "present-perfect",
    category: "tenses",
    level: "A2",
    title: "现在完成时",
    summary: "连接过去经历与现在结果，或不强调具体过去时间。",
    formula: "主语 + have/has + 过去分词",
    example: "I have visited London twice.",
    tips: ["常和 ever、never、already、yet、since、for 连用", "有明确过去时间点时多用一般过去时"],
    questions: [
      {
        question: "I ___ this book twice, so I know the story.",
        options: ["read", "have read", "am reading", "had read yesterday"],
        answer: 1,
        note: "人生经历、未给具体过去时间，用现在完成时。"
      },
      {
        question: "She has lived here ___ 2020.",
        options: ["for", "since", "from", "during"],
        answer: 1,
        note: "since + 时间点。"
      },
      {
        question: "___ you ever tried sushi?",
        options: ["Do", "Did", "Have", "Has"],
        answer: 2,
        note: "ever 常和现在完成时连用：Have you ever…?"
      },
      {
        question: "I have studied English ___ three years.",
        options: ["since", "for", "from", "during"],
        answer: 1,
        note: "for + 一段时间。"
      }
    ]
  },
  {
    id: "modals-request",
    category: "modals",
    level: "A2",
    title: "情态动词（请求与建议）",
    summary: "用 can / could / should / would 表达能力、请求和建议。",
    formula: "情态动词 + 动词原形",
    example: "Could you help me with this form?",
    tips: ["情态动词后不加 to", "could / would 通常比 can / will 更礼貌"],
    questions: [
      {
        question: "You ___ bring an umbrella; it might rain.",
        options: ["must to", "should", "should to", "are should"],
        answer: 1,
        note: "should + 原形表示建议。"
      },
      {
        question: "礼貌请求帮助，应选：",
        options: ["Help me now.", "Could you help me, please?", "You help.", "Must you helping?"],
        answer: 1,
        note: "Could you… please? 更礼貌。"
      },
      {
        question: "___ I open the window?",
        options: ["Would", "May", "Should to", "Must to"],
        answer: 1,
        note: "May I…? 可表示礼貌请求许可。"
      },
      {
        question: "选择正确句子：",
        options: ["You should to rest.", "You should rest.", "You should resting.", "You should rests."],
        answer: 1,
        note: "情态动词后接原形。"
      }
    ]
  },
  {
    id: "passive",
    category: "modals",
    level: "B1",
    title: "被动语态",
    summary: "强调动作承受者，或施事者不重要时使用。",
    formula: "主语 + be + 过去分词",
    example: "The report was finished yesterday.",
    tips: ["时态体现在 be 动词上", "by + 施事者可省略"],
    questions: [
      {
        question: "The report ___ yesterday.",
        options: ["finished", "was finished", "has finish", "is finish"],
        answer: 1,
        note: "过去被动：was/were + 过去分词。"
      },
      {
        question: "选择正确被动句：",
        options: ["English speaks in many countries.", "English is spoken in many countries.", "English is speaking in many countries.", "English spoken is many countries."],
        answer: 1,
        note: "一般现在时被动：is/are + 过去分词。"
      },
      {
        question: "These emails ___ every morning.",
        options: ["check", "are checked", "are checking", "have check"],
        answer: 1,
        note: "一般现在时被动：are + 过去分词。"
      },
      {
        question: "The cake ___ by my sister.",
        options: ["made", "was made", "was making", "has make"],
        answer: 1,
        note: "过去被动：was made。"
      }
    ]
  },
  {
    id: "comparatives",
    category: "basics",
    level: "A2",
    title: "比较级与最高级",
    summary: "比较两个或多个事物的程度差异。",
    formula: "形容词 -er / more + adj；the -est / the most + adj",
    example: "This lesson is easier than the last one.",
    tips: ["单音节常用 -er/-est", "多音节常用 more/most", "注意不规则：good→better→best"],
    questions: [
      {
        question: "This lesson is ___ than the last one.",
        options: ["more easy", "easier", "easyer", "most easy"],
        answer: 1,
        note: "easy 变比较级为 easier。"
      },
      {
        question: "This is ___ book in the series.",
        options: ["the more interesting", "the most interesting", "most interesting", "interestingest"],
        answer: 1,
        note: "多音节形容词最高级用 the most。"
      },
      {
        question: "My bag is ___ than yours.",
        options: ["more heavy", "heavier", "heavyer", "heaviest"],
        answer: 1,
        note: "heavy → heavier。"
      },
      {
        question: "He is ___ student in our class.",
        options: ["taller", "the taller", "the tallest", "more tall"],
        answer: 2,
        note: "三者及以上用最高级 the tallest。"
      }
    ]
  },
  {
    id: "conditionals",
    category: "clauses",
    level: "B1",
    title: "条件句",
    summary: "表达真实可能或虚拟假设的条件与结果。",
    formula: "If + 条件，主句结果",
    example: "If it rains tomorrow, we will stay indoors.",
    tips: ["真实条件：If + 现在，will + 原形", "与现在相反：If + 过去，would + 原形", "与过去相反：If + had done，would have done"],
    questions: [
      {
        question: "If it rains tomorrow, we ___ indoors.",
        options: ["will stay", "would stayed", "staying", "have stay"],
        answer: 0,
        note: "真实条件句主句常用 will。"
      },
      {
        question: "If I had more time, I ___ another language.",
        options: ["learn", "learned", "would learn", "will learn"],
        answer: 2,
        note: "与现在事实相反，用 would + 原形。"
      },
      {
        question: "If she had left earlier, she ___ the train.",
        options: ["would catch", "would have caught", "caught", "will catch"],
        answer: 1,
        note: "与过去相反：would have + 过去分词。"
      },
      {
        question: "If you heat water to 100°C, it ___.",
        options: ["boils", "would boil", "boiled", "is boiling"],
        answer: 0,
        note: "客观真理可用 If + 现在，主句一般现在时。"
      }
    ]
  },
  {
    id: "relative-clauses",
    category: "clauses",
    level: "B1",
    title: "定语从句",
    summary: "用关系词修饰名词，补充说明人或物。",
    formula: "名词 + who/that/which + 从句",
    example: "The book that you recommended was excellent.",
    tips: ["人常用 who/that，物常用 which/that", "关系词在从句中作宾语时常可省略"],
    questions: [
      {
        question: "The person ___ helped me was very patient.",
        options: ["which", "who", "where", "whose book"],
        answer: 1,
        note: "先行词是人且作主语，用 who。"
      },
      {
        question: "This is the book ___ changed my mind.",
        options: ["who", "where", "that", "whose"],
        answer: 2,
        note: "先行词是物，用 that/which。"
      },
      {
        question: "This is the café ___ we first met.",
        options: ["who", "which person", "where", "whose"],
        answer: 2,
        note: "先行词是地点，用 where。"
      },
      {
        question: "I know a girl ___ brother is a doctor.",
        options: ["who", "which", "whose", "where"],
        answer: 2,
        note: "表示所属关系用 whose。"
      }
    ]
  },
  {
    id: "non-finite",
    category: "clauses",
    level: "B2",
    title: "非谓语动词",
    summary: "用 to do / doing / done 在句中充当非谓语成分。",
    formula: "to do / V-ing / V-ed",
    example: "Despite being tired, she finished the report.",
    tips: ["介词后常用 V-ing：despite being", "表目的常用 to do", "注意逻辑主语是否一致"],
    questions: [
      {
        question: "Despite ___ tired, she finished the report.",
        options: ["be", "being", "was", "to be"],
        answer: 1,
        note: "despite 后接名词或动名词。"
      },
      {
        question: "I decided ___ earlier next time.",
        options: ["leaving", "to leave", "leave", "left"],
        answer: 1,
        note: "decide to do 是固定搭配。"
      },
      {
        question: "She left early ___ the last train.",
        options: ["catching", "to catch", "catch", "caught"],
        answer: 1,
        note: "表目的常用 to do。"
      },
      {
        question: "I’m interested in ___ new languages.",
        options: ["learn", "to learn", "learning", "learned"],
        answer: 2,
        note: "介词 in 后接动名词 learning。"
      }
    ]
  },
  {
    id: "articles",
    category: "basics",
    level: "A1",
    title: "冠词 a / an / the",
    summary: "用不定冠词引入新信息，用定冠词指双方已知的对象。",
    formula: "a/an + 可数单数；the + 特指",
    example: "I saw a dog. The dog was friendly.",
    tips: ["首次提及常用 a/an，再次提及时用 the", "元音音素开头用 an：an hour / an umbrella"],
    questions: [
      {
        question: "She bought ___ umbrella because it was raining.",
        options: ["a", "an", "the", "—"],
        answer: 1,
        note: "umbrella 以元音音素开头，用 an。"
      },
      {
        question: "I saw a film yesterday. ___ film was excellent.",
        options: ["A", "An", "The", "Any"],
        answer: 2,
        note: "第二次提及同一部电影，用 the。"
      },
      {
        question: "He is ___ honest man.",
        options: ["a", "an", "the", "—"],
        answer: 1,
        note: "honest 以元音音素开头，用 an。"
      },
      {
        question: "Please close ___ door.",
        options: ["a", "an", "the", "any"],
        answer: 2,
        note: "双方都知道是哪扇门，用 the。"
      }
    ]
  },
  {
    id: "quantifiers",
    category: "basics",
    level: "A2",
    title: "数量词 some / any / much / many",
    summary: "根据可数/不可数以及肯定/疑问/否定选择合适的数量词。",
    formula: "some（肯定）/ any（疑问否定）；many + 可数 / much + 不可数",
    example: "I have some time. Do you have any questions?",
    tips: ["肯定句常用 some，疑问和否定常用 any", "many 修饰可数复数，much 修饰不可数"],
    questions: [
      {
        question: "There aren’t ___ apples left.",
        options: ["much", "many", "a little", "an"],
        answer: 1,
        note: "apples 可数复数，否定句用 many。"
      },
      {
        question: "We don’t have ___ milk left.",
        options: ["some", "any", "many", "a few"],
        answer: 1,
        note: "不可数名词在否定句中常用 any。"
      },
      {
        question: "Would you like ___ tea?",
        options: ["any", "some", "many", "much"],
        answer: 1,
        note: "提出邀请的疑问句也可用 some。"
      },
      {
        question: "How ___ money do you need?",
        options: ["many", "much", "a few", "several"],
        answer: 1,
        note: "money 不可数，用 much。"
      }
    ]
  },
  {
    id: "reported-speech",
    category: "clauses",
    level: "B1",
    title: "间接引语",
    summary: "转述他人话语时，注意时态和人称的回移。",
    formula: "She said (that) + 回移后的从句",
    example: "He said, “I am tired.” → He said (that) he was tired.",
    tips: ["一般现在时常回移为一般过去时", "tomorrow → the next day，today → that day"],
    questions: [
      {
        question: "She said, “I work here.” → She said she ___ there.",
        options: ["works", "worked", "is working", "work"],
        answer: 1,
        note: "间接引语中一般现在时通常回移为一般过去时。"
      },
      {
        question: "He said, “I will call you tomorrow.” → He said he would call me ___.",
        options: ["tomorrow", "the next day", "today", "yesterday"],
        answer: 1,
        note: "tomorrow 在间接引语中常变为 the next day。"
      },
      {
        question: "Tom said, “I can swim.” → Tom said he ___ swim.",
        options: ["can", "could", "will", "may"],
        answer: 1,
        note: "can 常回移为 could。"
      },
      {
        question: "She said, “I am busy today.” → She said she was busy ___.",
        options: ["today", "that day", "tomorrow", "now"],
        answer: 1,
        note: "today 常变为 that day。"
      }
    ]
  },
  {
    id: "connectors",
    category: "clauses",
    level: "B2",
    title: "语篇连接词",
    summary: "用连接词标示因果、对比、补充和举例，让段落更清晰。",
    formula: "However / Therefore / In addition / For example",
    example: "The plan is useful. However, it needs more time.",
    tips: ["However 表转折，Therefore/As a result 表结果", "In addition 表补充，For example 表举例"],
    questions: [
      {
        question: "The evidence is weak. ___, we should not draw a strong conclusion.",
        options: ["For example", "Therefore", "In addition", "Meanwhile person"],
        answer: 1,
        note: "后句是前句的结果，用 Therefore。"
      },
      {
        question: "The café is quiet. ___, it has free Wi-Fi.",
        options: ["However", "In addition", "As a result only", "Instead of"],
        answer: 1,
        note: "补充另一优点，用 In addition。"
      },
      {
        question: "I like tea. ___, I don’t like coffee.",
        options: ["Therefore", "However", "For example", "In addition"],
        answer: 1,
        note: "转折对比用 However。"
      },
      {
        question: "Bring a notebook. ___, bring a pen.",
        options: ["As a result", "In addition", "However", "Instead"],
        answer: 1,
        note: "补充另一项用 In addition。"
      }
    ]
  }
];
