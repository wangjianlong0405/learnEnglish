export const agePrograms = {
  preschool: {
    title: "幼儿英语启蒙",
    level: "4–6 岁 · 听说启蒙",
    description: "不用认字，跟着声音点图片。十五个主题分成身边世界、认识自己、每天生活三组；每组可「听声音点图片」或「看图片找声音」。",
    pace: ["8 分钟", "每次建议"],
    goal: ["90 个", "听说词图"],
    modules: [
      { type: "animals", icon: "🐱", label: "听音选图", title: "小动物", description: "听声音，找出小猫、小狗、小兔子、小鸟、小鱼和小鸭子。" },
      { type: "colors", icon: "🎨", label: "听音选图", title: "魔法颜色", description: "认识 red、blue、yellow、green、orange、purple。" },
      { type: "weather", icon: "☀️", label: "听音选图", title: "看看外面", description: "认识太阳、雨、云、风、雪和星星。" },
      { type: "toys", icon: "🧸", label: "听音选图", title: "玩具盒", description: "找出娃娃、小汽车、积木、风筝、鼓和机器人。" },
      { type: "transport", icon: "🚌", label: "听音选图", title: "出行工具", description: "听辨 car、bus、bike、train、plane、boat。" },
      { type: "family", icon: "👨‍👩‍👧", label: "听音选图", title: "我的家人", description: "认识妈妈、爸爸、宝宝、姐姐、哥哥和奶奶。" },
      { type: "body", icon: "🙌", label: "听音选图", title: "我的身体", description: "听辨 hand、head、eye、ear、nose、mouth。" },
      { type: "actions", icon: "🏃", label: "听音选图", title: "我会动", description: "听动作词：run、jump、sing、play、walk、sleep。" },
      { type: "clothes", icon: "👕", label: "听音选图", title: "穿衣出门", description: "找出帽子、鞋子、衬衫、书包、外套和袜子。" },
      { type: "emotions", icon: "😊", label: "听音选图", title: "我的心情", description: "听辨 happy、sad、angry、sleepy、hungry、cold。" },
      { type: "snacks", icon: "🍎", label: "听音选图", title: "好吃的食物", description: "听声音，找出苹果、香蕉、牛奶、蛋糕、面包和鸡蛋。" },
      { type: "numbers", icon: "🔢", label: "听音选图", title: "一起数数", description: "听辨 one 到 six。" },
      { type: "school", icon: "📚", label: "听音选图", title: "上学用品", description: "听辨 book、pencil、ball、bus、eraser、desk。" },
      { type: "home", icon: "🏠", label: "听音选图", title: "在家里", description: "听辨 bed、door、window、table、lamp、sofa。" },
      { type: "bath", icon: "🛁", label: "听音选图", title: "洗漱时间", description: "认识 water、soap、towel、brush、bath、wash。" },
    ],
  },
  kids: {
    title: "少儿英语启蒙",
    level: "Pre-A1 · 趣味启蒙",
    description: "通过图片、节奏和短句建立语感，先敢开口，再逐步认识单词结构和基础规则。",
    pace: ["15 分钟", "每日建议"],
    goal: ["300+", "核心词汇"],
    modules: [
      { type: "vocabulary", icon: "🧩", label: "词汇", title: "看图认识生活词汇", description: "从动物、颜色、食物和家庭开始，把声音、图像与含义连起来。", tags: ["Animals", "Colors", "My family"], points: ["认识常见动物与颜色词", "使用 What is it? 提问", "完成看图选词练习", "听音选图巩固记忆"], example: "This is a panda. It is black and white." },
      { type: "phonetics", icon: "🔤", label: "音标", title: "自然拼读与基础音标", description: "从字母音出发，认识 /æ/、/e/、/ɪ/ 等常见发音。", tags: ["Letter sounds", "Short vowels", "Blending"], points: ["区分字母名和字母音", "跟读三个短元音", "拼读 cat、bed、fish", "对比易混音 /e/ 与 /æ/"], example: "/k/ + /æ/ + /t/ → cat" },
      { type: "grammar", icon: "🧱", label: "语法", title: "用短句介绍身边事物", description: "在场景中学习 This is、I have 和 I like，不背抽象规则。", tags: ["This is", "I have", "I like"], points: ["使用 This is 介绍物品", "用 I have 表达拥有", "完成单复数配对", "把三句拼成自我介绍"], example: "This is my book. I have two pencils." },
    ],
  },
  teens: {
    title: "青少年能力成长",
    level: "A1–A2 · 基础成长",
    description: "围绕校园、兴趣与朋友等熟悉主题，系统扩充表达，并开始建立清晰的语法框架。",
    pace: ["20 分钟", "每日建议"],
    goal: ["1200+", "核心词汇"],
    modules: [
      { type: "vocabulary", icon: "🎯", label: "词汇", title: "校园与兴趣主题词汇", description: "用词块和情景对话掌握学校生活、运动、科技与社交表达。", tags: ["School", "Hobbies", "Technology"], points: ["掌握课程与校园设施词汇", "学习 play / do / go 搭配", "用三个句子介绍爱好"], example: "I’m interested in science, and I enjoy playing basketball." },
      { type: "phonetics", icon: "🎧", label: "音标", title: "音标、音节与单词重音", description: "学习完整元辅音体系，并用音节和重音提升单词辨识度。", tags: ["IPA", "Syllables", "Word stress"], points: ["区分长元音和短元音", "判断单词音节数量", "标出常用多音节词重音"], example: "PHOtograph → phoTOGraphy" },
      { type: "grammar", icon: "🧠", label: "语法", title: "时态与句子结构", description: "对比一般现在时、现在进行时和一般过去时的真实使用场景。", tags: ["Present", "Past", "Questions"], points: ["识别三种基础时态", "正确使用助动词提问", "描述昨天发生的事情"], example: "I usually walk to school, but today I’m taking the bus." },
    ],
  },
  exam: {
    title: "高中与考试英语",
    level: "B1–B2 · 学术进阶",
    description: "连接校内学习与考试任务，强化篇章理解、准确表达和复杂句分析能力。",
    pace: ["30 分钟", "每日建议"],
    goal: ["3500+", "考试词汇"],
    modules: [
      { type: "vocabulary", icon: "📖", label: "词汇", title: "高频考试与学术词汇", description: "通过词根、搭配和语境掌握阅读与写作中的高频词。", tags: ["Word roots", "Collocations", "Academic"], points: ["拆解常见前后缀", "积累高频动词搭配", "在段落中推断词义"], example: "The evidence indicates a significant change in behavior." },
      { type: "phonetics", icon: "🎙️", label: "音标", title: "连读、弱读与语调", description: "从单词发音走向真实语流，提高听力理解和口语自然度。", tags: ["Linking", "Weak forms", "Intonation"], points: ["识别辅音与元音连读", "听出功能词弱读", "用语调表达态度"], example: "Could_you tell_me where_it_is?" },
      { type: "grammar", icon: "🔍", label: "语法", title: "长难句与从句系统", description: "掌握定语从句、名词性从句和非谓语结构，读懂也写得出。", tags: ["Clauses", "Non-finite", "Inversion"], points: ["识别句子主干", "判断从句功能", "改写一个复杂句"], example: "The book that you recommended has changed how I think." },
    ],
  },
  adults: {
    title: "成人实用英语",
    level: "A1–A2 · 生活沟通",
    description: "用 4 个递进主题单元完成日常沟通，从第一次见面到出行、计划和问题处理。",
    pace: ["20 分钟", "每日建议"],
    goal: ["20 节", "主题课程"],
    modules: [
      { type: "vocabulary", icon: "💼", label: "词汇", title: "旅行与职场表达", description: "不孤立背词，重点学习会议、邮件、出行中的常用词块。", tags: ["Travel", "Meetings", "Email"], points: ["掌握机场与酒店表达", "学习会议高频词块", "写出礼貌的邮件开头"], example: "Could we move the meeting to Thursday afternoon?" },
      { type: "phonetics", icon: "🗣️", label: "音标", title: "清晰发音与英语节奏", description: "纠正常见发音问题，练习重音、节奏和礼貌语调。", tags: ["Clear sounds", "Rhythm", "Tone"], points: ["检查易混元辅音", "突出句子关键词", "练习自然停顿"], example: "I’d LIKE to BOOK a ROOM for TWO nights." },
      { type: "grammar", icon: "🧭", label: "语法", title: "解决实际问题的语法", description: "围绕请求、建议、经历和计划，学习真正影响表达准确性的语法。", tags: ["Polite requests", "Experience", "Plans"], points: ["使用情态动词礼貌请求", "区分过去时与完成时", "表达确定和不确定计划"], example: "I’ve visited London twice, but I went there for work last year." },
    ],
  },
};

/** Each module has a 3-question practice pack for the controlled practice stage. */
export const lessonChecks = {
  kids: {
    vocabulary: [
      { question: "哪句话表示“这是一只熊猫”？", options: ["This is a panda.", "I like apples.", "It is a blue book."], answer: 0, note: "This is + 单数名词，可以用来介绍眼前的人或事物。" },
      { question: "“红色的苹果”更自然的说法是：", options: ["a red apple", "an apple red", "apple a red"], answer: 0, note: "英语里形容词通常放在名词前面：a red apple。" },
      { question: "看到一只猫，你可以问：", options: ["What is it?", "Where you go?", "How many I?"], answer: 0, note: "What is it? 适合指着眼前物品提问。" },
    ],
    phonetics: [
      { question: "哪个单词包含短元音 /æ/？", options: ["cat", "bed", "fish"], answer: 0, note: "cat 的拼读是 /kæt/，中间的元音是 /æ/。" },
      { question: "bed 中间的短元音是：", options: ["/æ/", "/e/", "/ɪ/"], answer: 1, note: "bed 读作 /bed/，中间是短元音 /e/。" },
      { question: "/k/ + /æ/ + /t/ 拼出来是：", options: ["cot", "cat", "kit"], answer: 1, note: "三个音连起来就是 cat。" },
    ],
    grammar: [
      { question: "选择正确的句子：", options: ["This are my book.", "This is my book.", "These is my book."], answer: 1, note: "单数名词 book 前使用 This is。" },
      { question: "表达“我有两支铅笔”，应选：", options: ["I have two pencils.", "I has two pencils.", "I having two pencil."], answer: 0, note: "I have + 复数名词：I have two pencils。" },
      { question: "喜欢苹果时，自然的说法是：", options: ["I like apples.", "I likes apple.", "Me like apples."], answer: 0, note: "主语是 I 时，用 I like + 名词。" },
    ],
  },
  teens: {
    vocabulary: [
      { question: "选择正确的运动搭配：", options: ["do basketball", "play basketball", "go basketball"], answer: 1, note: "球类运动通常和 play 搭配：play basketball。" },
      { question: "“做家庭作业”更自然的是：", options: ["make homework", "do homework", "play homework"], answer: 1, note: "homework 常与 do 搭配。" },
      { question: "表达兴趣，较自然的是：", options: ["I interesting science.", "I’m interested in science.", "I interest for science."], answer: 1, note: "be interested in 是固定表达。" },
    ],
    phonetics: [
      { question: "photography 的重音在哪个音节？", options: ["PHO-to-gra-phy", "pho-TOG-ra-phy", "pho-to-gra-PHY"], answer: 1, note: "photography 的主要重音在第二个音节：/fəˈtɑːɡrəfi/。" },
      { question: "banana 通常有几个音节？", options: ["2", "3", "4"], answer: 1, note: "ba-na-na，三个音节。" },
      { question: "ship 与 sheep 的主要区别是：", options: ["词尾辅音不同", "元音长短不同", "重音位置不同"], answer: 1, note: "/ɪ/ 与 /iː/ 的长短对立，是常见易混点。" },
    ],
    grammar: [
      { question: "Today, Lily ___ the bus to school.", options: ["takes", "is taking", "took"], answer: 1, note: "Today 表示今天的临时情况，这里使用现在进行时。" },
      { question: "She usually ___ to school.", options: ["walk", "walks", "is walk"], answer: 1, note: "习惯动作用一般现在时，主语 she 用 walks。" },
      { question: "Yesterday we ___ a science project.", options: ["finish", "finished", "are finishing"], answer: 1, note: "yesterday 提示用一般过去时。" },
    ],
  },
  exam: {
    vocabulary: [
      { question: "句中 indicates 最接近哪个意思？", options: ["hides", "shows", "prevents"], answer: 1, note: "indicate 在学术语境中常表示 show or suggest，即“表明”。" },
      { question: "significant 在学术写作中最接近：", options: ["funny", "important", "temporary"], answer: 1, note: "significant 常表示重要或显著。" },
      { question: "make a decision 的近义表达是：", options: ["do a decide", "reach a decision", "play decision"], answer: 1, note: "reach / make a decision 都是常见搭配。" },
    ],
    phonetics: [
      { question: "自然语流中 could you 常听起来更接近：", options: ["could / you", "couldju", "cold you"], answer: 1, note: "/d/ 与 /j/ 相邻时常发生融合，听起来接近 /dʒ/。" },
      { question: "功能词在语流中常常：", options: ["全部重读", "弱读", "省略所有元音"], answer: 1, note: "a、to、of 等功能词常出现弱读形式。" },
      { question: "升调在英语中常用来：", options: ["结束陈述句", "表示疑问或不确定", "强调过去时"], answer: 1, note: "一般疑问句或不确定语气常用升调。" },
    ],
    grammar: [
      { question: "The book ___ you recommended was excellent.", options: ["who", "that", "where"], answer: 1, note: "先行词是物品 the book，that 在从句中作宾语。" },
      { question: "___ tired, she kept working.", options: ["Be", "Being", "Been"], answer: 1, note: "非谓语 Being tired 作原因状语。" },
      { question: "I don’t know ___ he will arrive.", options: ["that when", "when", "what time that"], answer: 1, note: "名词性从句用 when 引导时间，不再重复 that。" },
    ],
  },
  adults: {
    vocabulary: [
      { question: "哪句话适合礼貌地调整会议时间？", options: ["Move the meeting now.", "Could we move the meeting to Thursday?", "The meeting is wrong."], answer: 1, note: "Could we...? 是职场中提出建议或请求的礼貌表达。" },
      { question: "酒店前台想确认订单，较自然的是：", options: ["Give room.", "I’d like to check my reservation.", "Room is now."], answer: 1, note: "check my reservation 是常见入住表达。" },
      { question: "邮件开头较礼貌的是：", options: ["Hey worker,", "I hope this email finds you well.", "You must read now."], answer: 1, note: "I hope this email finds you well. 是常见商务开场。" },
    ],
    phonetics: [
      { question: "I’d like to BOOK a ROOM. 哪些词通常重读？", options: ["I’d / to / a", "like / book / room", "所有单词一样重"], answer: 1, note: "实义词通常承载关键信息，因此在句子中更突出。" },
      { question: "想听起来更礼貌，请求句末语调通常：", options: ["一直压低且生硬", "更柔和，可略上扬", "只喊关键词"], answer: 1, note: "礼貌请求常配合更柔和的语调。" },
      { question: "句子里的停顿最适合放在：", options: ["每个字母后", "意群之间", "任意介词后强制断开"], answer: 1, note: "按意群停顿，听起来更自然清晰。" },
    ],
    grammar: [
      { question: "表达人生经历，应选择：", options: ["I visited London twice.", "I have visited London twice.", "I am visiting London twice."], answer: 1, note: "不强调具体过去时间的人生经历通常使用现在完成时。" },
      { question: "礼貌请求帮助，较合适的是：", options: ["Help me now.", "Could you help me with this form?", "You help."], answer: 1, note: "Could you...? 比祈使句更礼貌。" },
      { question: "尚未确定的计划，可用：", options: ["I will definitely gone.", "I might visit the museum tomorrow.", "I am must go."], answer: 1, note: "might 表示不确定的可能性。" },
    ],
  },
};

export const lessonOutputTasks = {
  kids: {
    vocabulary: "看一张图或想一件东西，用 This is… / I like… 说一句完整的话（可请家长帮忙写下来）。",
    phonetics: "跟着读三遍例词，再说一说嘴巴要怎么张。",
    grammar: "用 This is / I have / I like 各说一句，介绍你身边的东西。",
  },
  teens: {
    vocabulary: "用本课 2 个关键词，写 3 句介绍你的校园生活或爱好。",
    phonetics: "标出示例词的重音音节，并大声朗读两遍。",
    grammar: "用一般现在时、现在进行时各写一句，描述“平时”和“今天”的不同。",
  },
  exam: {
    vocabulary: "用本课一个学术词造句，并写出它的一个常见搭配。",
    phonetics: "把示例里的连读点标出来，再用自然语速朗读一遍。",
    grammar: "改写示例句：保持原意，换成另一个从句引导词或结构。",
  },
  adults: {
    vocabulary: "用本课一个关键词，写一句能直接用于邮件或会议的表达。",
    phonetics: "朗读示例，并标出你想强调的关键词重音。",
    grammar: "模仿示例，写一句礼貌请求或说明计划的句子。",
  },
};
