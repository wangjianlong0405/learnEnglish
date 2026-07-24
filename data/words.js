/** Vocabulary cards: level (CEFR), theme, and tags for deck filtering. */
export const LEVEL_RANK = {
  "Pre-A1": 0,
  "A1": 1,
  "A2": 2,
  "B1": 3,
  "B2": 4
};

export const AGE_LEVELS = {
  "preschool": [
    "Pre-A1"
  ],
  "kids": [
    "Pre-A1",
    "A1"
  ],
  "teens": [
    "A1",
    "A2",
    "B1"
  ],
  "exam": [
    "B1",
    "B2"
  ],
  "adults": [
    "A2",
    "B1",
    "B2"
  ]
};

/** Active deck by placement level, or by age track when level is unset. */
export function activeWordDeck(learnerLevel, selectedAge = "kids") {
  if (learnerLevel in LEVEL_RANK) {
    const max = LEVEL_RANK[learnerLevel];
    const deck = words.filter((item) => LEVEL_RANK[item.level] <= max);
    return deck.length ? deck : words;
  }
  const allowed = AGE_LEVELS[selectedAge] || AGE_LEVELS.kids;
  const deck = words.filter((item) => allowed.includes(item.level));
  return deck.length ? deck : words;
}

export const words = [
  {
    "word": "red",
    "phonetic": "/red/",
    "meaning": "红色",
    "example": "I like the red apple.",
    "translation": "我喜欢这个红苹果。",
    "level": "Pre-A1",
    "theme": "colors",
    "tags": [
      "kids"
    ]
  },
  {
    "word": "blue",
    "phonetic": "/bluː/",
    "meaning": "蓝色",
    "example": "The sky is blue today.",
    "translation": "今天天空是蓝色的。",
    "level": "Pre-A1",
    "theme": "colors",
    "tags": [
      "kids"
    ]
  },
  {
    "word": "green",
    "phonetic": "/ɡriːn/",
    "meaning": "绿色",
    "example": "Look at the green tree.",
    "translation": "看那棵绿树。",
    "level": "Pre-A1",
    "theme": "colors",
    "tags": [
      "kids"
    ]
  },
  {
    "word": "yellow",
    "phonetic": "/ˈjeləʊ/",
    "meaning": "黄色",
    "example": "This is a yellow banana.",
    "translation": "这是一根黄香蕉。",
    "level": "Pre-A1",
    "theme": "colors",
    "tags": [
      "kids"
    ]
  },
  {
    "word": "black",
    "phonetic": "/blæk/",
    "meaning": "黑色",
    "example": "The cat is black and white.",
    "translation": "这只猫是黑白相间的。",
    "level": "Pre-A1",
    "theme": "colors",
    "tags": [
      "kids"
    ]
  },
  {
    "word": "white",
    "phonetic": "/waɪt/",
    "meaning": "白色",
    "example": "I have a white bag.",
    "translation": "我有一个白色的包。",
    "level": "Pre-A1",
    "theme": "colors",
    "tags": [
      "kids"
    ]
  },
  {
    "word": "orange",
    "phonetic": "/ˈɒrɪndʒ/",
    "meaning": "橙色",
    "example": "An orange ball is under the table.",
    "translation": "一个橙色的球在桌子下面。",
    "level": "Pre-A1",
    "theme": "colors",
    "tags": [
      "kids"
    ]
  },
  {
    "word": "pink",
    "phonetic": "/pɪŋk/",
    "meaning": "粉色",
    "example": "She has a pink hat.",
    "translation": "她有一顶粉色帽子。",
    "level": "Pre-A1",
    "theme": "colors",
    "tags": [
      "kids"
    ]
  },
  {
    "word": "one",
    "phonetic": "/wʌn/",
    "meaning": "一",
    "example": "I have one book.",
    "translation": "我有一本书。",
    "level": "Pre-A1",
    "theme": "numbers",
    "tags": [
      "kids"
    ]
  },
  {
    "word": "two",
    "phonetic": "/tuː/",
    "meaning": "二",
    "example": "I see two birds.",
    "translation": "我看见两只鸟。",
    "level": "Pre-A1",
    "theme": "numbers",
    "tags": [
      "kids"
    ]
  },
  {
    "word": "three",
    "phonetic": "/θriː/",
    "meaning": "三",
    "example": "There are three cats.",
    "translation": "有三只猫。",
    "level": "Pre-A1",
    "theme": "numbers",
    "tags": [
      "kids"
    ]
  },
  {
    "word": "four",
    "phonetic": "/fɔːr/",
    "meaning": "四",
    "example": "I have four pencils.",
    "translation": "我有四支铅笔。",
    "level": "Pre-A1",
    "theme": "numbers",
    "tags": [
      "kids"
    ]
  },
  {
    "word": "five",
    "phonetic": "/faɪv/",
    "meaning": "五",
    "example": "Count with me: one, two, three, four, five.",
    "translation": "跟我数：一、二、三、四、五。",
    "level": "Pre-A1",
    "theme": "numbers",
    "tags": [
      "kids"
    ]
  },
  {
    "word": "six",
    "phonetic": "/sɪks/",
    "meaning": "六",
    "example": "She is six years old.",
    "translation": "她六岁了。",
    "level": "Pre-A1",
    "theme": "numbers",
    "tags": [
      "kids"
    ]
  },
  {
    "word": "seven",
    "phonetic": "/ˈsevn/",
    "meaning": "七",
    "example": "There are seven days in a week.",
    "translation": "一周有七天。",
    "level": "Pre-A1",
    "theme": "numbers",
    "tags": [
      "kids"
    ]
  },
  {
    "word": "eight",
    "phonetic": "/eɪt/",
    "meaning": "八",
    "example": "I can see eight stars.",
    "translation": "我能看见八颗星星。",
    "level": "Pre-A1",
    "theme": "numbers",
    "tags": [
      "kids"
    ]
  },
  {
    "word": "nine",
    "phonetic": "/naɪn/",
    "meaning": "九",
    "example": "Nine is after eight.",
    "translation": "九在八后面。",
    "level": "Pre-A1",
    "theme": "numbers",
    "tags": [
      "kids"
    ]
  },
  {
    "word": "ten",
    "phonetic": "/ten/",
    "meaning": "十",
    "example": "I can count to ten.",
    "translation": "我能数到十。",
    "level": "Pre-A1",
    "theme": "numbers",
    "tags": [
      "kids"
    ]
  },
  {
    "word": "family",
    "phonetic": "/ˈfæməli/",
    "meaning": "家庭",
    "example": "This is my family.",
    "translation": "这是我的家庭。",
    "level": "Pre-A1",
    "theme": "family",
    "tags": [
      "kids"
    ]
  },
  {
    "word": "mother",
    "phonetic": "/ˈmʌðər/",
    "meaning": "妈妈",
    "example": "My mother is kind.",
    "translation": "我的妈妈很温柔。",
    "level": "Pre-A1",
    "theme": "family",
    "tags": [
      "kids"
    ]
  },
  {
    "word": "father",
    "phonetic": "/ˈfɑːðər/",
    "meaning": "爸爸",
    "example": "My father can cook.",
    "translation": "我的爸爸会做饭。",
    "level": "Pre-A1",
    "theme": "family",
    "tags": [
      "kids"
    ]
  },
  {
    "word": "sister",
    "phonetic": "/ˈsɪstər/",
    "meaning": "姐姐；妹妹",
    "example": "I have a little sister.",
    "translation": "我有一个小妹妹。",
    "level": "Pre-A1",
    "theme": "family",
    "tags": [
      "kids"
    ]
  },
  {
    "word": "brother",
    "phonetic": "/ˈbrʌðər/",
    "meaning": "哥哥；弟弟",
    "example": "My brother likes football.",
    "translation": "我哥哥喜欢足球。",
    "level": "Pre-A1",
    "theme": "family",
    "tags": [
      "kids"
    ]
  },
  {
    "word": "grandma",
    "phonetic": "/ˈɡrænmɑː/",
    "meaning": "奶奶；外婆",
    "example": "Grandma reads me a story.",
    "translation": "奶奶给我读故事。",
    "level": "Pre-A1",
    "theme": "family",
    "tags": [
      "kids"
    ]
  },
  {
    "word": "grandpa",
    "phonetic": "/ˈɡrænpɑː/",
    "meaning": "爷爷；外公",
    "example": "Grandpa walks in the park.",
    "translation": "爷爷在公园散步。",
    "level": "Pre-A1",
    "theme": "family",
    "tags": [
      "kids"
    ]
  },
  {
    "word": "baby",
    "phonetic": "/ˈbeɪbi/",
    "meaning": "婴儿；宝宝",
    "example": "The baby is sleeping.",
    "translation": "宝宝在睡觉。",
    "level": "Pre-A1",
    "theme": "family",
    "tags": [
      "kids"
    ]
  },
  {
    "word": "cat",
    "phonetic": "/kæt/",
    "meaning": "猫",
    "example": "This is a cat.",
    "translation": "这是一只猫。",
    "level": "Pre-A1",
    "theme": "animals",
    "tags": [
      "kids"
    ]
  },
  {
    "word": "dog",
    "phonetic": "/dɒɡ/",
    "meaning": "狗",
    "example": "The dog is happy.",
    "translation": "这只狗很开心。",
    "level": "Pre-A1",
    "theme": "animals",
    "tags": [
      "kids"
    ]
  },
  {
    "word": "bird",
    "phonetic": "/bɜːrd/",
    "meaning": "鸟",
    "example": "A bird is in the tree.",
    "translation": "树上有一只鸟。",
    "level": "Pre-A1",
    "theme": "animals",
    "tags": [
      "kids"
    ]
  },
  {
    "word": "fish",
    "phonetic": "/fɪʃ/",
    "meaning": "鱼",
    "example": "I see a little fish.",
    "translation": "我看见一条小鱼。",
    "level": "Pre-A1",
    "theme": "animals",
    "tags": [
      "kids"
    ]
  },
  {
    "word": "panda",
    "phonetic": "/ˈpændə/",
    "meaning": "熊猫",
    "example": "The panda is black and white.",
    "translation": "熊猫是黑白的。",
    "level": "Pre-A1",
    "theme": "animals",
    "tags": [
      "kids"
    ]
  },
  {
    "word": "rabbit",
    "phonetic": "/ˈræbɪt/",
    "meaning": "兔子",
    "example": "The rabbit likes carrots.",
    "translation": "兔子喜欢胡萝卜。",
    "level": "Pre-A1",
    "theme": "animals",
    "tags": [
      "kids"
    ]
  },
  {
    "word": "duck",
    "phonetic": "/dʌk/",
    "meaning": "鸭子",
    "example": "The duck can swim.",
    "translation": "鸭子会游泳。",
    "level": "Pre-A1",
    "theme": "animals",
    "tags": [
      "kids"
    ]
  },
  {
    "word": "lion",
    "phonetic": "/ˈlaɪən/",
    "meaning": "狮子",
    "example": "The lion is big.",
    "translation": "狮子很大。",
    "level": "Pre-A1",
    "theme": "animals",
    "tags": [
      "kids"
    ]
  },
  {
    "word": "apple",
    "phonetic": "/ˈæpl/",
    "meaning": "苹果",
    "example": "I like apples.",
    "translation": "我喜欢苹果。",
    "level": "Pre-A1",
    "theme": "food",
    "tags": [
      "kids"
    ]
  },
  {
    "word": "banana",
    "phonetic": "/bəˈnɑːnə/",
    "meaning": "香蕉",
    "example": "This banana is yellow.",
    "translation": "这根香蕉是黄色的。",
    "level": "Pre-A1",
    "theme": "food",
    "tags": [
      "kids"
    ]
  },
  {
    "word": "bread",
    "phonetic": "/bred/",
    "meaning": "面包",
    "example": "I eat bread for breakfast.",
    "translation": "我早餐吃面包。",
    "level": "Pre-A1",
    "theme": "food",
    "tags": [
      "kids"
    ]
  },
  {
    "word": "milk",
    "phonetic": "/mɪlk/",
    "meaning": "牛奶",
    "example": "Drink your milk, please.",
    "translation": "请喝牛奶。",
    "level": "Pre-A1",
    "theme": "food",
    "tags": [
      "kids"
    ]
  },
  {
    "word": "water",
    "phonetic": "/ˈwɔːtər/",
    "meaning": "水",
    "example": "I want some water.",
    "translation": "我想要一些水。",
    "level": "Pre-A1",
    "theme": "food",
    "tags": [
      "kids"
    ]
  },
  {
    "word": "egg",
    "phonetic": "/eɡ/",
    "meaning": "鸡蛋",
    "example": "An egg is in the box.",
    "translation": "盒子里有一个鸡蛋。",
    "level": "Pre-A1",
    "theme": "food",
    "tags": [
      "kids"
    ]
  },
  {
    "word": "rice",
    "phonetic": "/raɪs/",
    "meaning": "米饭",
    "example": "We eat rice for lunch.",
    "translation": "我们午餐吃米饭。",
    "level": "Pre-A1",
    "theme": "food",
    "tags": [
      "kids"
    ]
  },
  {
    "word": "cake",
    "phonetic": "/keɪk/",
    "meaning": "蛋糕",
    "example": "Happy birthday! Here is a cake.",
    "translation": "生日快乐！这是蛋糕。",
    "level": "Pre-A1",
    "theme": "food",
    "tags": [
      "kids"
    ]
  },
  {
    "word": "school",
    "phonetic": "/skuːl/",
    "meaning": "学校",
    "example": "I go to school.",
    "translation": "我去学校。",
    "level": "Pre-A1",
    "theme": "school",
    "tags": [
      "kids"
    ]
  },
  {
    "word": "book",
    "phonetic": "/bʊk/",
    "meaning": "书",
    "example": "This is my book.",
    "translation": "这是我的书。",
    "level": "Pre-A1",
    "theme": "school",
    "tags": [
      "kids"
    ]
  },
  {
    "word": "pencil",
    "phonetic": "/ˈpensl/",
    "meaning": "铅笔",
    "example": "I have two pencils.",
    "translation": "我有两支铅笔。",
    "level": "Pre-A1",
    "theme": "school",
    "tags": [
      "kids"
    ]
  },
  {
    "word": "bag",
    "phonetic": "/bæɡ/",
    "meaning": "包",
    "example": "My bag is blue.",
    "translation": "我的包是蓝色的。",
    "level": "Pre-A1",
    "theme": "school",
    "tags": [
      "kids"
    ]
  },
  {
    "word": "teacher",
    "phonetic": "/ˈtiːtʃər/",
    "meaning": "老师",
    "example": "My teacher is nice.",
    "translation": "我的老师很好。",
    "level": "Pre-A1",
    "theme": "school",
    "tags": [
      "kids"
    ]
  },
  {
    "word": "friend",
    "phonetic": "/frend/",
    "meaning": "朋友",
    "example": "She is my friend.",
    "translation": "她是我的朋友。",
    "level": "Pre-A1",
    "theme": "school",
    "tags": [
      "kids"
    ]
  },
  {
    "word": "hand",
    "phonetic": "/hænd/",
    "meaning": "手",
    "example": "Clap your hands.",
    "translation": "拍拍手。",
    "level": "Pre-A1",
    "theme": "body",
    "tags": [
      "kids"
    ]
  },
  {
    "word": "head",
    "phonetic": "/hed/",
    "meaning": "头",
    "example": "Touch your head.",
    "translation": "摸摸你的头。",
    "level": "Pre-A1",
    "theme": "body",
    "tags": [
      "kids"
    ]
  },
  {
    "word": "eye",
    "phonetic": "/aɪ/",
    "meaning": "眼睛",
    "example": "Close your eyes.",
    "translation": "闭上眼睛。",
    "level": "Pre-A1",
    "theme": "body",
    "tags": [
      "kids"
    ]
  },
  {
    "word": "ear",
    "phonetic": "/ɪr/",
    "meaning": "耳朵",
    "example": "Listen with your ears.",
    "translation": "用耳朵听。",
    "level": "Pre-A1",
    "theme": "body",
    "tags": [
      "kids"
    ]
  },
  {
    "word": "run",
    "phonetic": "/rʌn/",
    "meaning": "跑",
    "example": "I can run fast.",
    "translation": "我能跑得很快。",
    "level": "Pre-A1",
    "theme": "actions",
    "tags": [
      "kids"
    ]
  },
  {
    "word": "jump",
    "phonetic": "/dʒʌmp/",
    "meaning": "跳",
    "example": "I can jump high.",
    "translation": "我能跳得很高。",
    "level": "Pre-A1",
    "theme": "actions",
    "tags": [
      "kids"
    ]
  },
  {
    "word": "sing",
    "phonetic": "/sɪŋ/",
    "meaning": "唱",
    "example": "We sing a song.",
    "translation": "我们唱一首歌。",
    "level": "Pre-A1",
    "theme": "actions",
    "tags": [
      "kids"
    ]
  },
  {
    "word": "read",
    "phonetic": "/riːd/",
    "meaning": "读",
    "example": "I read a book.",
    "translation": "我读一本书。",
    "level": "Pre-A1",
    "theme": "actions",
    "tags": [
      "kids"
    ]
  },
  {
    "word": "write",
    "phonetic": "/raɪt/",
    "meaning": "写",
    "example": "I write my name.",
    "translation": "我写我的名字。",
    "level": "Pre-A1",
    "theme": "actions",
    "tags": [
      "kids"
    ]
  },
  {
    "word": "play",
    "phonetic": "/pleɪ/",
    "meaning": "玩；玩耍",
    "example": "Let’s play together.",
    "translation": "我们一起玩吧。",
    "level": "Pre-A1",
    "theme": "actions",
    "tags": [
      "kids"
    ]
  },
  {
    "word": "like",
    "phonetic": "/laɪk/",
    "meaning": "喜欢",
    "example": "I like cats.",
    "translation": "我喜欢猫。",
    "level": "Pre-A1",
    "theme": "actions",
    "tags": [
      "kids"
    ]
  },
  {
    "word": "have",
    "phonetic": "/hæv/",
    "meaning": "有",
    "example": "I have a red ball.",
    "translation": "我有一个红球。",
    "level": "Pre-A1",
    "theme": "actions",
    "tags": [
      "kids"
    ]
  },
  {
    "word": "hello",
    "phonetic": "/həˈləʊ/",
    "meaning": "你好",
    "example": "Hello! What’s your name?",
    "translation": "你好！你叫什么名字？",
    "level": "A1",
    "theme": "social",
    "tags": [
      "kids",
      "daily"
    ]
  },
  {
    "word": "thanks",
    "phonetic": "/θæŋks/",
    "meaning": "谢谢",
    "example": "Thanks for your help.",
    "translation": "谢谢你的帮助。",
    "level": "A1",
    "theme": "social",
    "tags": [
      "kids",
      "daily"
    ]
  },
  {
    "word": "please",
    "phonetic": "/pliːz/",
    "meaning": "请",
    "example": "Can I have some water, please?",
    "translation": "请给我一些水，好吗？",
    "level": "A1",
    "theme": "social",
    "tags": [
      "kids",
      "daily"
    ]
  },
  {
    "word": "sorry",
    "phonetic": "/ˈsɒri/",
    "meaning": "对不起",
    "example": "I’m sorry I’m late.",
    "translation": "对不起，我迟到了。",
    "level": "A1",
    "theme": "social",
    "tags": [
      "daily"
    ]
  },
  {
    "word": "name",
    "phonetic": "/neɪm/",
    "meaning": "名字",
    "example": "My name is Amy.",
    "translation": "我的名字是艾米。",
    "level": "A1",
    "theme": "social",
    "tags": [
      "kids"
    ]
  },
  {
    "word": "age",
    "phonetic": "/eɪdʒ/",
    "meaning": "年龄",
    "example": "I’m ten years of age.",
    "translation": "我十岁。",
    "level": "A1",
    "theme": "social",
    "tags": [
      "kids"
    ]
  },
  {
    "word": "home",
    "phonetic": "/həʊm/",
    "meaning": "家",
    "example": "I go home after school.",
    "translation": "放学后我回家。",
    "level": "A1",
    "theme": "daily",
    "tags": [
      "kids"
    ]
  },
  {
    "word": "morning",
    "phonetic": "/ˈmɔːrnɪŋ/",
    "meaning": "早晨",
    "example": "Good morning, class!",
    "translation": "同学们，早上好！",
    "level": "A1",
    "theme": "time",
    "tags": [
      "kids",
      "daily"
    ]
  },
  {
    "word": "afternoon",
    "phonetic": "/ˌɑːftərˈnuːn/",
    "meaning": "下午",
    "example": "See you this afternoon.",
    "translation": "下午见。",
    "level": "A1",
    "theme": "time",
    "tags": [
      "daily"
    ]
  },
  {
    "word": "evening",
    "phonetic": "/ˈiːvnɪŋ/",
    "meaning": "晚上",
    "example": "Good evening!",
    "translation": "晚上好！",
    "level": "A1",
    "theme": "time",
    "tags": [
      "daily"
    ]
  },
  {
    "word": "today",
    "phonetic": "/təˈdeɪ/",
    "meaning": "今天",
    "example": "What do you do today?",
    "translation": "你今天做什么？",
    "level": "A1",
    "theme": "time",
    "tags": [
      "daily"
    ]
  },
  {
    "word": "tomorrow",
    "phonetic": "/təˈmɒrəʊ/",
    "meaning": "明天",
    "example": "See you tomorrow.",
    "translation": "明天见。",
    "level": "A1",
    "theme": "time",
    "tags": [
      "daily"
    ]
  },
  {
    "word": "yesterday",
    "phonetic": "/ˈjestərdeɪ/",
    "meaning": "昨天",
    "example": "I played football yesterday.",
    "translation": "我昨天踢足球了。",
    "level": "A1",
    "theme": "time",
    "tags": [
      "daily"
    ]
  },
  {
    "word": "weather",
    "phonetic": "/ˈweðər/",
    "meaning": "天气",
    "example": "The weather is sunny today.",
    "translation": "今天天气晴朗。",
    "level": "A1",
    "theme": "weather",
    "tags": [
      "daily"
    ]
  },
  {
    "word": "sunny",
    "phonetic": "/ˈsʌni/",
    "meaning": "晴朗的",
    "example": "It’s a sunny day.",
    "translation": "今天是晴天。",
    "level": "A1",
    "theme": "weather",
    "tags": [
      "kids"
    ]
  },
  {
    "word": "rainy",
    "phonetic": "/ˈreɪni/",
    "meaning": "下雨的",
    "example": "It’s rainy, so take an umbrella.",
    "translation": "下雨了，带上伞。",
    "level": "A1",
    "theme": "weather",
    "tags": [
      "daily"
    ]
  },
  {
    "word": "cold",
    "phonetic": "/kəʊld/",
    "meaning": "冷的",
    "example": "It’s cold outside.",
    "translation": "外面很冷。",
    "level": "A1",
    "theme": "weather",
    "tags": [
      "kids"
    ]
  },
  {
    "word": "hot",
    "phonetic": "/hɒt/",
    "meaning": "热的",
    "example": "The tea is hot.",
    "translation": "茶很烫。",
    "level": "A1",
    "theme": "weather",
    "tags": [
      "kids"
    ]
  },
  {
    "word": "clothes",
    "phonetic": "/kləʊðz/",
    "meaning": "衣服",
    "example": "I put on my clothes.",
    "translation": "我穿上衣服。",
    "level": "A1",
    "theme": "clothes",
    "tags": [
      "daily"
    ]
  },
  {
    "word": "shirt",
    "phonetic": "/ʃɜːrt/",
    "meaning": "衬衫",
    "example": "This shirt is blue.",
    "translation": "这件衬衫是蓝色的。",
    "level": "A1",
    "theme": "clothes",
    "tags": [
      "daily"
    ]
  },
  {
    "word": "shoes",
    "phonetic": "/ʃuːz/",
    "meaning": "鞋子",
    "example": "My shoes are new.",
    "translation": "我的鞋子是新的。",
    "level": "A1",
    "theme": "clothes",
    "tags": [
      "kids"
    ]
  },
  {
    "word": "jacket",
    "phonetic": "/ˈdʒækɪt/",
    "meaning": "夹克；外套",
    "example": "Wear a jacket when it’s cold.",
    "translation": "冷的时候穿上外套。",
    "level": "A1",
    "theme": "clothes",
    "tags": [
      "daily"
    ]
  },
  {
    "word": "breakfast",
    "phonetic": "/ˈbrekfəst/",
    "meaning": "早餐",
    "example": "I eat breakfast at seven.",
    "translation": "我七点吃早餐。",
    "level": "A1",
    "theme": "food",
    "tags": [
      "daily"
    ]
  },
  {
    "word": "lunch",
    "phonetic": "/lʌntʃ/",
    "meaning": "午餐",
    "example": "We have lunch at school.",
    "translation": "我们在学校吃午餐。",
    "level": "A1",
    "theme": "food",
    "tags": [
      "kids"
    ]
  },
  {
    "word": "dinner",
    "phonetic": "/ˈdɪnər/",
    "meaning": "晚餐",
    "example": "Dinner is ready.",
    "translation": "晚饭好了。",
    "level": "A1",
    "theme": "food",
    "tags": [
      "daily"
    ]
  },
  {
    "word": "hungry",
    "phonetic": "/ˈhʌŋɡri/",
    "meaning": "饥饿的",
    "example": "I’m hungry. Can I eat now?",
    "translation": "我饿了。现在可以吃吗？",
    "level": "A1",
    "theme": "food",
    "tags": [
      "kids"
    ]
  },
  {
    "word": "thirsty",
    "phonetic": "/ˈθɜːrsti/",
    "meaning": "口渴的",
    "example": "I’m thirsty. I need water.",
    "translation": "我渴了。我需要水。",
    "level": "A1",
    "theme": "food",
    "tags": [
      "kids"
    ]
  },
  {
    "word": "happy",
    "phonetic": "/ˈhæpi/",
    "meaning": "开心的",
    "example": "I feel happy today.",
    "translation": "我今天感到开心。",
    "level": "A1",
    "theme": "feelings",
    "tags": [
      "kids"
    ]
  },
  {
    "word": "sad",
    "phonetic": "/sæd/",
    "meaning": "伤心的",
    "example": "Don’t be sad. I’m here.",
    "translation": "别难过。我在这儿。",
    "level": "A1",
    "theme": "feelings",
    "tags": [
      "kids"
    ]
  },
  {
    "word": "tired",
    "phonetic": "/ˈtaɪərd/",
    "meaning": "疲倦的",
    "example": "I’m tired after school.",
    "translation": "放学后我很累。",
    "level": "A1",
    "theme": "feelings",
    "tags": [
      "daily"
    ]
  },
  {
    "word": "hobby",
    "phonetic": "/ˈhɒbi/",
    "meaning": "爱好",
    "example": "My hobby is drawing.",
    "translation": "我的爱好是画画。",
    "level": "A1",
    "theme": "hobbies",
    "tags": [
      "teens"
    ]
  },
  {
    "word": "music",
    "phonetic": "/ˈmjuːzɪk/",
    "meaning": "音乐",
    "example": "I like listening to music.",
    "translation": "我喜欢听音乐。",
    "level": "A1",
    "theme": "hobbies",
    "tags": [
      "teens",
      "kids"
    ]
  },
  {
    "word": "sport",
    "phonetic": "/spɔːrt/",
    "meaning": "运动",
    "example": "Football is my favourite sport.",
    "translation": "足球是我最喜欢的运动。",
    "level": "A1",
    "theme": "hobbies",
    "tags": [
      "teens"
    ]
  },
  {
    "word": "swim",
    "phonetic": "/swɪm/",
    "meaning": "游泳",
    "example": "I can swim in the pool.",
    "translation": "我能在泳池游泳。",
    "level": "A1",
    "theme": "hobbies",
    "tags": [
      "kids"
    ]
  },
  {
    "word": "draw",
    "phonetic": "/drɔː/",
    "meaning": "画画",
    "example": "I draw a cat.",
    "translation": "我画一只猫。",
    "level": "A1",
    "theme": "hobbies",
    "tags": [
      "kids"
    ]
  },
  {
    "word": "help",
    "phonetic": "/help/",
    "meaning": "帮助",
    "example": "Can you help me, please?",
    "translation": "你能帮我一下吗？",
    "level": "A1",
    "theme": "social",
    "tags": [
      "daily"
    ]
  },
  {
    "word": "open",
    "phonetic": "/ˈəʊpən/",
    "meaning": "打开",
    "example": "Please open the door.",
    "translation": "请开门。",
    "level": "A1",
    "theme": "actions",
    "tags": [
      "kids"
    ]
  },
  {
    "word": "close",
    "phonetic": "/kləʊz/",
    "meaning": "关上",
    "example": "Close your book.",
    "translation": "把书合上。",
    "level": "A1",
    "theme": "actions",
    "tags": [
      "kids"
    ]
  },
  {
    "word": "listen",
    "phonetic": "/ˈlɪsn/",
    "meaning": "听",
    "example": "Listen to the teacher.",
    "translation": "听老师说。",
    "level": "A1",
    "theme": "actions",
    "tags": [
      "kids",
      "school"
    ]
  },
  {
    "word": "speak",
    "phonetic": "/spiːk/",
    "meaning": "说",
    "example": "Please speak slowly.",
    "translation": "请说慢一点。",
    "level": "A1",
    "theme": "actions",
    "tags": [
      "daily"
    ]
  },
  {
    "word": "buy",
    "phonetic": "/baɪ/",
    "meaning": "买",
    "example": "I buy milk at the shop.",
    "translation": "我在商店买牛奶。",
    "level": "A1",
    "theme": "daily",
    "tags": [
      "daily"
    ]
  },
  {
    "word": "shop",
    "phonetic": "/ʃɒp/",
    "meaning": "商店；购物",
    "example": "There is a shop near my home.",
    "translation": "我家附近有一家商店。",
    "level": "A1",
    "theme": "daily",
    "tags": [
      "daily"
    ]
  },
  {
    "word": "bus",
    "phonetic": "/bʌs/",
    "meaning": "公共汽车",
    "example": "I take the bus to school.",
    "translation": "我坐公交车去学校。",
    "level": "A1",
    "theme": "travel",
    "tags": [
      "daily"
    ]
  },
  {
    "word": "park",
    "phonetic": "/pɑːrk/",
    "meaning": "公园",
    "example": "We play in the park.",
    "translation": "我们在公园玩。",
    "level": "A1",
    "theme": "places",
    "tags": [
      "kids"
    ]
  },
  {
    "word": "city",
    "phonetic": "/ˈsɪti/",
    "meaning": "城市",
    "example": "I live in a big city.",
    "translation": "我住在一座大城市。",
    "level": "A1",
    "theme": "places",
    "tags": [
      "daily"
    ]
  },
  {
    "word": "greeting",
    "phonetic": "/ˈɡriːtɪŋ/",
    "meaning": "问候；招呼",
    "example": "She smiled and offered a friendly greeting.",
    "translation": "她微笑着，友好地打了个招呼。",
    "level": "A2",
    "theme": "social",
    "tags": [
      "daily"
    ]
  },
  {
    "word": "introduce",
    "phonetic": "/ˌɪntrəˈduːs/",
    "meaning": "介绍；引见",
    "example": "Let me introduce myself — I’m Emma.",
    "translation": "让我自我介绍一下——我是艾玛。",
    "level": "A1",
    "theme": "social",
    "tags": [
      "daily"
    ]
  },
  {
    "word": "pleasure",
    "phonetic": "/ˈpleʒər/",
    "meaning": "愉快；荣幸",
    "example": "It’s a pleasure to meet you.",
    "translation": "很高兴认识你。",
    "level": "A2",
    "theme": "social",
    "tags": [
      "daily"
    ]
  },
  {
    "word": "conversation",
    "phonetic": "/ˌkɑːnvərˈseɪʃn/",
    "meaning": "交谈；对话",
    "example": "We had a short conversation over coffee.",
    "translation": "我们喝咖啡时进行了一次简短的交谈。",
    "level": "A2",
    "theme": "social",
    "tags": [
      "daily"
    ]
  },
  {
    "word": "confident",
    "phonetic": "/ˈkɑːnfɪdənt/",
    "meaning": "自信的",
    "example": "Speak slowly and sound confident.",
    "translation": "慢慢说，听起来会更自信。",
    "level": "B1",
    "theme": "study",
    "tags": [
      "exam"
    ]
  },
  {
    "word": "friendly",
    "phonetic": "/ˈfrendli/",
    "meaning": "友好的；亲切的",
    "example": "A friendly smile makes people feel welcome.",
    "translation": "亲切的微笑会让人感到受欢迎。",
    "level": "A1",
    "theme": "social",
    "tags": [
      "kids",
      "daily"
    ]
  },
  {
    "word": "schedule",
    "phonetic": "/ˈskedʒuːl/",
    "meaning": "日程；安排",
    "example": "What’s on your schedule this afternoon?",
    "translation": "你今天下午的安排是什么？",
    "level": "A2",
    "theme": "daily",
    "tags": [
      "work"
    ]
  },
  {
    "word": "prefer",
    "phonetic": "/prɪˈfɜːr/",
    "meaning": "更喜欢",
    "example": "I prefer tea to coffee in the morning.",
    "translation": "早上我更喜欢喝茶而不是咖啡。",
    "level": "A1",
    "theme": "daily",
    "tags": [
      "daily"
    ]
  },
  {
    "word": "direction",
    "phonetic": "/dəˈrekʃn/",
    "meaning": "方向；指引",
    "example": "Could you give me directions to the station?",
    "translation": "你能告诉我去车站怎么走吗？",
    "level": "A2",
    "theme": "travel",
    "tags": [
      "daily"
    ]
  },
  {
    "word": "appointment",
    "phonetic": "/əˈpɔɪntmənt/",
    "meaning": "预约；约定",
    "example": "I have a dentist appointment at three.",
    "translation": "我三点有牙医预约。",
    "level": "A2",
    "theme": "daily",
    "tags": [
      "health"
    ]
  },
  {
    "word": "recommend",
    "phonetic": "/ˌrekəˈmend/",
    "meaning": "推荐",
    "example": "Can you recommend a quiet café nearby?",
    "translation": "你能推荐附近一家安静的咖啡馆吗？",
    "level": "A2",
    "theme": "social",
    "tags": [
      "daily"
    ]
  },
  {
    "word": "available",
    "phonetic": "/əˈveɪləbl/",
    "meaning": "有空的；可用的",
    "example": "Are you available for a quick call later?",
    "translation": "你稍后有空快速通个电话吗？",
    "level": "A2",
    "theme": "work",
    "tags": [
      "daily"
    ]
  },
  {
    "word": "experience",
    "phonetic": "/ɪkˈspɪriəns/",
    "meaning": "经历；经验",
    "example": "Traveling alone was a valuable experience.",
    "translation": "独自旅行是一次宝贵的经历。",
    "level": "A2",
    "theme": "travel",
    "tags": [
      "exam"
    ]
  },
  {
    "word": "opinion",
    "phonetic": "/əˈpɪnjən/",
    "meaning": "观点；看法",
    "example": "In my opinion, practice matters more than talent.",
    "translation": "在我看来，练习比天赋更重要。",
    "level": "B1",
    "theme": "study",
    "tags": [
      "exam"
    ]
  },
  {
    "word": "improve",
    "phonetic": "/ɪmˈpruːv/",
    "meaning": "改进；提高",
    "example": "I want to improve my listening this month.",
    "translation": "这个月我想提高听力。",
    "level": "A1",
    "theme": "study",
    "tags": [
      "daily"
    ]
  },
  {
    "word": "challenge",
    "phonetic": "/ˈtʃælɪndʒ/",
    "meaning": "挑战",
    "example": "Learning idioms can be a real challenge.",
    "translation": "学习习语可能是个真正的挑战。",
    "level": "B1",
    "theme": "study",
    "tags": [
      "exam"
    ]
  },
  {
    "word": "explain",
    "phonetic": "/ɪkˈspleɪn/",
    "meaning": "解释",
    "example": "Could you explain that idea in simpler words?",
    "translation": "你能用更简单的话解释那个想法吗？",
    "level": "A1",
    "theme": "study",
    "tags": [
      "daily"
    ]
  },
  {
    "word": "decision",
    "phonetic": "/dɪˈsɪʒn/",
    "meaning": "决定",
    "example": "We need to make a decision by Friday.",
    "translation": "我们需要在周五前做出决定。",
    "level": "A2",
    "theme": "work",
    "tags": [
      "collocation"
    ]
  },
  {
    "word": "evidence",
    "phonetic": "/ˈevɪdəns/",
    "meaning": "证据；依据",
    "example": "The evidence supports a different conclusion.",
    "translation": "证据支持另一个结论。",
    "level": "B2",
    "theme": "academic",
    "tags": [
      "exam"
    ]
  },
  {
    "word": "significant",
    "phonetic": "/sɪɡˈnɪfɪkənt/",
    "meaning": "重要的；显著的",
    "example": "There has been a significant change in her writing.",
    "translation": "她的写作有了显著变化。",
    "level": "B2",
    "theme": "academic",
    "tags": [
      "exam"
    ]
  },
  {
    "word": "perspective",
    "phonetic": "/pərˈspektɪv/",
    "meaning": "视角；看法",
    "example": "The article offers a fresh perspective on remote work.",
    "translation": "这篇文章为远程工作提供了新视角。",
    "level": "B2",
    "theme": "academic",
    "tags": [
      "exam"
    ]
  },
  {
    "word": "negotiate",
    "phonetic": "/nɪˈɡoʊʃieɪt/",
    "meaning": "协商；谈判",
    "example": "They negotiated a more flexible deadline.",
    "translation": "他们协商出了一个更灵活的截止日期。",
    "level": "B2",
    "theme": "work",
    "tags": [
      "adults"
    ]
  },
  {
    "word": "clarify",
    "phonetic": "/ˈklærɪfaɪ/",
    "meaning": "澄清；阐明",
    "example": "Let me clarify what I meant by “practical”.",
    "translation": "让我澄清一下我说的“实用”是什么意思。",
    "level": "B1",
    "theme": "work",
    "tags": [
      "adults"
    ]
  },
  {
    "word": "contribute",
    "phonetic": "/kənˈtrɪbjuːt/",
    "meaning": "贡献；促成",
    "example": "Everyone should contribute ideas in the meeting.",
    "translation": "每个人都应该在会议上贡献想法。",
    "level": "B1",
    "theme": "work",
    "tags": [
      "adults"
    ]
  },
  {
    "word": "habit",
    "phonetic": "/ˈhæbɪt/",
    "meaning": "习惯",
    "example": "Reading every night has become a helpful habit.",
    "translation": "每晚阅读已经变成一个有益的习惯。",
    "level": "A1",
    "theme": "study",
    "tags": [
      "daily"
    ]
  },
  {
    "word": "routine",
    "phonetic": "/ruːˈtiːn/",
    "meaning": "日常安排；惯例",
    "example": "My morning routine includes ten minutes of vocabulary review.",
    "translation": "我的晨间安排包括十分钟词汇复习。",
    "level": "A2",
    "theme": "daily",
    "tags": [
      "study"
    ]
  },
  {
    "word": "deadline",
    "phonetic": "/ˈdedlaɪn/",
    "meaning": "截止日期",
    "example": "Please send the draft before the Friday deadline.",
    "translation": "请在周五截止日期前发送草稿。",
    "level": "A2",
    "theme": "work",
    "tags": [
      "adults"
    ]
  },
  {
    "word": "feedback",
    "phonetic": "/ˈfiːdbæk/",
    "meaning": "反馈",
    "example": "Clear feedback helped me fix my pronunciation.",
    "translation": "清晰的反馈帮助我纠正了发音。",
    "level": "B1",
    "theme": "study",
    "tags": [
      "work"
    ]
  },
  {
    "word": "progress",
    "phonetic": "/ˈprɑːɡres/",
    "meaning": "进步；进展",
    "example": "Small daily tasks create real progress over time.",
    "translation": "每天的小任务会随时间带来真正的进步。",
    "level": "A2",
    "theme": "study",
    "tags": [
      "collocation"
    ]
  },
  {
    "word": "focus",
    "phonetic": "/ˈfoʊkəs/",
    "meaning": "专注；重点",
    "example": "I need to focus on listening for twenty minutes.",
    "translation": "我需要专注听力二十分钟。",
    "level": "A2",
    "theme": "study",
    "tags": [
      "daily"
    ]
  },
  {
    "word": "patient",
    "phonetic": "/ˈpeɪʃnt/",
    "meaning": "有耐心的",
    "example": "Be patient with yourself when learning new sounds.",
    "translation": "学习新发音时，要对自己有耐心。",
    "level": "A2",
    "theme": "daily",
    "tags": [
      "kids"
    ]
  },
  {
    "word": "curious",
    "phonetic": "/ˈkjʊriəs/",
    "meaning": "好奇的",
    "example": "Curious learners ask more questions and remember more.",
    "translation": "好奇的学习者会问更多问题，也记得更多。",
    "level": "A2",
    "theme": "study",
    "tags": [
      "kids"
    ]
  },
  {
    "word": "arrange",
    "phonetic": "/əˈreɪndʒ/",
    "meaning": "安排",
    "example": "Can we arrange a call tomorrow morning?",
    "translation": "我们能安排明天上午通个电话吗？",
    "level": "A2",
    "theme": "work",
    "tags": [
      "daily"
    ]
  },
  {
    "word": "confirm",
    "phonetic": "/kənˈfɜːrm/",
    "meaning": "确认",
    "example": "Please confirm the meeting time by email.",
    "translation": "请通过邮件确认会议时间。",
    "level": "A2",
    "theme": "work",
    "tags": [
      "daily"
    ]
  },
  {
    "word": "delay",
    "phonetic": "/dɪˈleɪ/",
    "meaning": "延误；推迟",
    "example": "The train delay made me late for class.",
    "translation": "火车延误让我上课迟到了。",
    "level": "A2",
    "theme": "travel",
    "tags": [
      "daily"
    ]
  },
  {
    "word": "urgent",
    "phonetic": "/ˈɜːrdʒənt/",
    "meaning": "紧急的",
    "example": "This is not urgent, so we can discuss it tomorrow.",
    "translation": "这件事不紧急，我们可以明天再讨论。",
    "level": "B1",
    "theme": "work",
    "tags": [
      "adults"
    ]
  },
  {
    "word": "polite",
    "phonetic": "/pəˈlaɪt/",
    "meaning": "礼貌的",
    "example": "A polite request often gets a better response.",
    "translation": "礼貌的请求通常会得到更好的回应。",
    "level": "A2",
    "theme": "social",
    "tags": [
      "daily"
    ]
  },
  {
    "word": "request",
    "phonetic": "/rɪˈkwest/",
    "meaning": "请求；要求",
    "example": "She made a request for more practice time.",
    "translation": "她请求获得更多练习时间。",
    "level": "A2",
    "theme": "social",
    "tags": [
      "daily"
    ]
  },
  {
    "word": "solution",
    "phonetic": "/səˈluːʃn/",
    "meaning": "解决方案",
    "example": "Taking notes while listening was a simple solution.",
    "translation": "边听边记笔记是一个简单的解决办法。",
    "level": "B1",
    "theme": "study",
    "tags": [
      "exam"
    ]
  },
  {
    "word": "benefit",
    "phonetic": "/ˈbenɪfɪt/",
    "meaning": "益处；受益",
    "example": "Spaced review has a clear benefit for memory.",
    "translation": "间隔复习对记忆有明显益处。",
    "level": "B1",
    "theme": "study",
    "tags": [
      "exam"
    ]
  },
  {
    "word": "compare",
    "phonetic": "/kəmˈper/",
    "meaning": "比较",
    "example": "Compare the two answers before you choose.",
    "translation": "选择之前先比较这两个答案。",
    "level": "A2",
    "theme": "study",
    "tags": [
      "exam"
    ]
  },
  {
    "word": "summarize",
    "phonetic": "/ˈsʌməraɪz/",
    "meaning": "总结；概括",
    "example": "Can you summarize the article in three sentences?",
    "translation": "你能用三句话概括这篇文章吗？",
    "level": "B1",
    "theme": "study",
    "tags": [
      "exam"
    ]
  },
  {
    "word": "argue",
    "phonetic": "/ˈɑːrɡjuː/",
    "meaning": "论证；争论",
    "example": "He argued that short lessons work better than long ones.",
    "translation": "他论证说短课比长课更有效。",
    "level": "B1",
    "theme": "academic",
    "tags": [
      "exam"
    ]
  },
  {
    "word": "assume",
    "phonetic": "/əˈsuːm/",
    "meaning": "假定；认为",
    "example": "Don’t assume every new word must be memorized today.",
    "translation": "不要假定每个新词今天都必须记住。",
    "level": "B1",
    "theme": "academic",
    "tags": [
      "exam"
    ]
  },
  {
    "word": "encourage",
    "phonetic": "/ɪnˈkɜːrɪdʒ/",
    "meaning": "鼓励",
    "example": "Teachers should encourage learners to speak early.",
    "translation": "教师应鼓励学习者尽早开口。",
    "level": "B1",
    "theme": "study",
    "tags": [
      "daily"
    ]
  },
  {
    "word": "achieve",
    "phonetic": "/əˈtʃiːv/",
    "meaning": "实现；达成",
    "example": "You can achieve fluency through steady practice.",
    "translation": "通过稳定练习你可以达成流利。",
    "level": "B1",
    "theme": "study",
    "tags": [
      "exam"
    ]
  },
  {
    "word": "maintain",
    "phonetic": "/meɪnˈteɪn/",
    "meaning": "保持；维持",
    "example": "I try to maintain a streak of daily study.",
    "translation": "我努力保持每天学习的连续记录。",
    "level": "B1",
    "theme": "study",
    "tags": [
      "exam"
    ]
  },
  {
    "word": "analyze",
    "phonetic": "/ˈænəlaɪz/",
    "meaning": "分析",
    "example": "Analyze the mistake before you move on.",
    "translation": "继续之前先分析这个错误。",
    "level": "B2",
    "theme": "academic",
    "tags": [
      "exam"
    ]
  },
  {
    "word": "accurate",
    "phonetic": "/ˈækjərət/",
    "meaning": "准确的",
    "example": "Her grammar is not perfect, but it is accurate enough.",
    "translation": "她的语法并不完美，但已经足够准确。",
    "level": "B1",
    "theme": "study",
    "tags": [
      "exam"
    ]
  },
  {
    "word": "efficient",
    "phonetic": "/ɪˈfɪʃnt/",
    "meaning": "高效的",
    "example": "An efficient study plan saves time and energy.",
    "translation": "高效的学习计划能节省时间和精力。",
    "level": "B1",
    "theme": "study",
    "tags": [
      "work"
    ]
  },
  {
    "word": "flexible",
    "phonetic": "/ˈfleksəbl/",
    "meaning": "灵活的",
    "example": "A flexible schedule helps busy adults keep learning.",
    "translation": "灵活的安排帮助忙碌的成年人坚持学习。",
    "level": "B1",
    "theme": "work",
    "tags": [
      "adults"
    ]
  },
  {
    "word": "reliable",
    "phonetic": "/rɪˈlaɪəbl/",
    "meaning": "可靠的",
    "example": "A reliable dictionary is useful for checking examples.",
    "translation": "可靠的词典对核对例句很有用。",
    "level": "B1",
    "theme": "study",
    "tags": [
      "daily"
    ]
  },
  {
    "word": "commute",
    "phonetic": "/kəˈmjuːt/",
    "meaning": "通勤",
    "example": "My commute takes about forty minutes each morning.",
    "translation": "我每天早上通勤大约四十分钟。",
    "level": "B1",
    "theme": "daily",
    "tags": [
      "adults"
    ]
  },
  {
    "word": "neighborhood",
    "phonetic": "/ˈneɪbərhʊd/",
    "meaning": "社区；街区",
    "example": "There is a small bakery in my neighborhood.",
    "translation": "我住的街区有一家小面包店。",
    "level": "A2",
    "theme": "daily",
    "tags": [
      "daily"
    ]
  },
  {
    "word": "ingredient",
    "phonetic": "/ɪnˈɡriːdiənt/",
    "meaning": "食材；成分",
    "example": "Flour is the main ingredient in this recipe.",
    "translation": "面粉是这个食谱的主要食材。",
    "level": "A2",
    "theme": "food",
    "tags": [
      "daily"
    ]
  },
  {
    "word": "reservation",
    "phonetic": "/ˌrezərˈveɪʃn/",
    "meaning": "预订",
    "example": "I made a reservation for two at seven.",
    "translation": "我订了七点两人的位子。",
    "level": "A2",
    "theme": "travel",
    "tags": [
      "adults"
    ]
  },
  {
    "word": "refund",
    "phonetic": "/ˈriːfʌnd/",
    "meaning": "退款",
    "example": "They offered a full refund for the delayed flight.",
    "translation": "他们对延误的航班提供全额退款。",
    "level": "A2",
    "theme": "travel",
    "tags": [
      "adults"
    ]
  },
  {
    "word": "luggage",
    "phonetic": "/ˈlʌɡɪdʒ/",
    "meaning": "行李",
    "example": "Please keep your luggage with you at all times.",
    "translation": "请随时看管好你的行李。",
    "level": "A2",
    "theme": "travel",
    "tags": [
      "adults"
    ]
  },
  {
    "word": "itinerary",
    "phonetic": "/aɪˈtɪnəreri/",
    "meaning": "行程安排",
    "example": "Our itinerary includes two museums and a river walk.",
    "translation": "我们的行程包括两座博物馆和一次河边散步。",
    "level": "B1",
    "theme": "travel",
    "tags": [
      "adults"
    ]
  },
  {
    "word": "currency",
    "phonetic": "/ˈkɜːrənsi/",
    "meaning": "货币",
    "example": "You can exchange currency at the airport.",
    "translation": "你可以在机场兑换货币。",
    "level": "B1",
    "theme": "travel",
    "tags": [
      "adults"
    ]
  },
  {
    "word": "symptom",
    "phonetic": "/ˈsɪmptəm/",
    "meaning": "症状",
    "example": "Fever is a common symptom of a cold.",
    "translation": "发烧是感冒的常见症状。",
    "level": "B1",
    "theme": "health",
    "tags": [
      "adults"
    ]
  },
  {
    "word": "prescription",
    "phonetic": "/prɪˈskrɪpʃn/",
    "meaning": "处方",
    "example": "The doctor wrote a prescription for cough medicine.",
    "translation": "医生开了止咳药的处方。",
    "level": "B1",
    "theme": "health",
    "tags": [
      "adults"
    ]
  },
  {
    "word": "insurance",
    "phonetic": "/ɪnˈʃʊrəns/",
    "meaning": "保险",
    "example": "Travel insurance can cover unexpected medical costs.",
    "translation": "旅行保险可以覆盖意外医疗费用。",
    "level": "B1",
    "theme": "travel",
    "tags": [
      "adults"
    ]
  },
  {
    "word": "budget",
    "phonetic": "/ˈbʌdʒɪt/",
    "meaning": "预算",
    "example": "We need a weekly budget for food and transport.",
    "translation": "我们需要一份食物和交通的每周预算。",
    "level": "A2",
    "theme": "daily",
    "tags": [
      "adults"
    ]
  },
  {
    "word": "discount",
    "phonetic": "/ˈdɪskaʊnt/",
    "meaning": "折扣",
    "example": "Students can get a ten percent discount.",
    "translation": "学生可以享受百分之十的折扣。",
    "level": "A2",
    "theme": "daily",
    "tags": [
      "daily"
    ]
  },
  {
    "word": "receipt",
    "phonetic": "/rɪˈsiːt/",
    "meaning": "收据",
    "example": "Keep the receipt in case you need a refund.",
    "translation": "留好收据，以防需要退款。",
    "level": "A2",
    "theme": "daily",
    "tags": [
      "adults"
    ]
  },
  {
    "word": "password",
    "phonetic": "/ˈpæswɜːrd/",
    "meaning": "密码",
    "example": "Never share your password with strangers.",
    "translation": "永远不要把密码告诉陌生人。",
    "level": "A2",
    "theme": "tech",
    "tags": [
      "daily"
    ]
  },
  {
    "word": "notification",
    "phonetic": "/ˌnoʊtɪfɪˈkeɪʃn/",
    "meaning": "通知",
    "example": "I turned off notifications during study time.",
    "translation": "学习时我关掉了通知。",
    "level": "B1",
    "theme": "tech",
    "tags": [
      "daily"
    ]
  },
  {
    "word": "collaborate",
    "phonetic": "/kəˈlæbəreɪt/",
    "meaning": "协作",
    "example": "We collaborate on group projects every Friday.",
    "translation": "我们每周五协作完成小组项目。",
    "level": "B2",
    "theme": "work",
    "tags": [
      "exam"
    ]
  },
  {
    "word": "presentation",
    "phonetic": "/ˌpriːzenˈteɪʃn/",
    "meaning": "演示；汇报",
    "example": "Her presentation was clear and well organized.",
    "translation": "她的汇报清晰且结构良好。",
    "level": "B1",
    "theme": "work",
    "tags": [
      "exam"
    ]
  },
  {
    "word": "agenda",
    "phonetic": "/əˈdʒendə/",
    "meaning": "议程",
    "example": "The first item on the agenda is the budget.",
    "translation": "议程第一项是预算。",
    "level": "B1",
    "theme": "work",
    "tags": [
      "adults"
    ]
  },
  {
    "word": "persuade",
    "phonetic": "/pərˈsweɪd/",
    "meaning": "说服",
    "example": "Can you persuade him to join the study group?",
    "translation": "你能说服他加入学习小组吗？",
    "level": "B1",
    "theme": "social",
    "tags": [
      "exam"
    ]
  },
  {
    "word": "compromise",
    "phonetic": "/ˈkɑːmprəmaɪz/",
    "meaning": "折中；妥协",
    "example": "We reached a compromise on the meeting time.",
    "translation": "我们就会议时间达成了折中方案。",
    "level": "B2",
    "theme": "work",
    "tags": [
      "adults"
    ]
  },
  {
    "word": "motivate",
    "phonetic": "/ˈmoʊtɪveɪt/",
    "meaning": "激励",
    "example": "Short goals help motivate me to keep going.",
    "translation": "短期目标帮助激励我坚持下去。",
    "level": "B1",
    "theme": "study",
    "tags": [
      "exam"
    ]
  },
  {
    "word": "distraction",
    "phonetic": "/dɪˈstrækʃn/",
    "meaning": "干扰；分心事物",
    "example": "Phone notifications are a major distraction.",
    "translation": "手机通知是主要的干扰源。",
    "level": "B1",
    "theme": "study",
    "tags": [
      "daily"
    ]
  },
  {
    "word": "comprehension",
    "phonetic": "/ˌkɑːmprɪˈhenʃn/",
    "meaning": "理解力",
    "example": "Listening comprehension improves with daily practice.",
    "translation": "听力理解力会随每日练习提高。",
    "level": "B2",
    "theme": "study",
    "tags": [
      "exam"
    ]
  },
  {
    "word": "fluency",
    "phonetic": "/ˈfluːənsi/",
    "meaning": "流利度",
    "example": "Fluency grows when you speak without stopping for every error.",
    "translation": "当你不为每个错误停下时，流利度会提升。",
    "level": "B2",
    "theme": "study",
    "tags": [
      "exam"
    ]
  },
  {
    "word": "idiom",
    "phonetic": "/ˈɪdiəm/",
    "meaning": "习语",
    "example": "Break a leg is an idiom that means good luck.",
    "translation": "Break a leg 是表示祝你好运的习语。",
    "level": "B2",
    "theme": "study",
    "tags": [
      "exam"
    ]
  },
  {
    "word": "nuance",
    "phonetic": "/ˈnuːɑːns/",
    "meaning": "细微差别",
    "example": "Advanced learners notice the nuance between similar words.",
    "translation": "进阶学习者会注意到近义词之间的细微差别。",
    "level": "B2",
    "theme": "academic",
    "tags": [
      "exam"
    ]
  },
  {
    "word": "angry",
    "phonetic": "/ˈæŋɡri/",
    "meaning": "生气的",
    "example": "He felt angry when his toy broke.",
    "translation": "玩具坏了时他很生气。",
    "level": "Pre-A1",
    "theme": "feelings",
    "tags": ["kids", "preschool"]
  },
  {
    "word": "scared",
    "phonetic": "/skerd/",
    "meaning": "害怕的",
    "example": "The little girl was scared of the dark.",
    "translation": "小女孩害怕黑暗。",
    "level": "Pre-A1",
    "theme": "feelings",
    "tags": ["kids", "preschool"]
  },
  {
    "word": "excited",
    "phonetic": "/ɪkˈsaɪtɪd/",
    "meaning": "兴奋的",
    "example": "I am excited about my birthday party.",
    "translation": "我对生日派对感到兴奋。",
    "level": "A1",
    "theme": "feelings",
    "tags": ["kids"]
  },
  {
    "word": "bored",
    "phonetic": "/bɔːrd/",
    "meaning": "无聊的",
    "example": "She feels bored when it rains all day.",
    "translation": "整天下雨时她觉得无聊。",
    "level": "A1",
    "theme": "feelings",
    "tags": ["kids"]
  },
  {
    "word": "proud",
    "phonetic": "/praʊd/",
    "meaning": "骄傲的；自豪的",
    "example": "Mom is proud of my drawing.",
    "translation": "妈妈为我的画感到自豪。",
    "level": "A1",
    "theme": "feelings",
    "tags": ["kids"]
  },
  {
    "word": "worried",
    "phonetic": "/ˈwɜːrid/",
    "meaning": "担心的",
    "example": "I was worried about the test.",
    "translation": "我担心这次考试。",
    "level": "A2",
    "theme": "feelings",
    "tags": ["teens"]
  },
  {
    "word": "library",
    "phonetic": "/ˈlaɪbreri/",
    "meaning": "图书馆",
    "example": "We read books in the library.",
    "translation": "我们在图书馆看书。",
    "level": "A1",
    "theme": "places",
    "tags": ["kids", "school"]
  },
  {
    "word": "hospital",
    "phonetic": "/ˈhɑːspɪtl/",
    "meaning": "医院",
    "example": "Dad works at the hospital.",
    "translation": "爸爸在医院工作。",
    "level": "A1",
    "theme": "places",
    "tags": ["kids"]
  },
  {
    "word": "supermarket",
    "phonetic": "/ˈsuːpərmɑːrkɪt/",
    "meaning": "超市",
    "example": "We buy fruit at the supermarket.",
    "translation": "我们在超市买水果。",
    "level": "A1",
    "theme": "places",
    "tags": ["daily"]
  },
  {
    "word": "museum",
    "phonetic": "/mjuˈziːəm/",
    "meaning": "博物馆",
    "example": "The class visited a science museum.",
    "translation": "全班参观了科学博物馆。",
    "level": "A2",
    "theme": "places",
    "tags": ["teens"]
  },
  {
    "word": "station",
    "phonetic": "/ˈsteɪʃn/",
    "meaning": "车站",
    "example": "Meet me at the train station.",
    "translation": "在火车站见我。",
    "level": "A2",
    "theme": "places",
    "tags": ["travel"]
  },
  {
    "word": "airport",
    "phonetic": "/ˈerpɔːrt/",
    "meaning": "机场",
    "example": "We arrived at the airport early.",
    "translation": "我们很早就到了机场。",
    "level": "A2",
    "theme": "places",
    "tags": ["travel"]
  },
  {
    "word": "beach",
    "phonetic": "/biːtʃ/",
    "meaning": "海滩",
    "example": "Children play on the beach in summer.",
    "translation": "夏天孩子们在海滩玩耍。",
    "level": "A1",
    "theme": "places",
    "tags": ["kids"]
  },
  {
    "word": "fever",
    "phonetic": "/ˈfiːvər/",
    "meaning": "发烧",
    "example": "She stayed home because she had a fever.",
    "translation": "她因为发烧待在家里。",
    "level": "A2",
    "theme": "health",
    "tags": ["daily"]
  },
  {
    "word": "cough",
    "phonetic": "/kɔːf/",
    "meaning": "咳嗽",
    "example": "Drink warm water if you have a cough.",
    "translation": "如果你咳嗽，喝点温水。",
    "level": "A2",
    "theme": "health",
    "tags": ["daily"]
  },
  {
    "word": "medicine",
    "phonetic": "/ˈmedɪsn/",
    "meaning": "药",
    "example": "Take this medicine after meals.",
    "translation": "饭后服用这种药。",
    "level": "A2",
    "theme": "health",
    "tags": ["daily"]
  },
  {
    "word": "healthy",
    "phonetic": "/ˈhelθi/",
    "meaning": "健康的",
    "example": "Eating vegetables helps you stay healthy.",
    "translation": "吃蔬菜有助于保持健康。",
    "level": "A1",
    "theme": "health",
    "tags": ["kids"]
  },
  {
    "word": "exercise",
    "phonetic": "/ˈeksərsaɪz/",
    "meaning": "锻炼；运动",
    "example": "I exercise for thirty minutes every day.",
    "translation": "我每天锻炼三十分钟。",
    "level": "A2",
    "theme": "health",
    "tags": ["daily"]
  },
  {
    "word": "app",
    "phonetic": "/æp/",
    "meaning": "应用程序",
    "example": "This app helps me practise English.",
    "translation": "这个应用帮我练习英语。",
    "level": "A2",
    "theme": "tech",
    "tags": ["study"]
  },
  {
    "word": "download",
    "phonetic": "/ˈdaʊnloʊd/",
    "meaning": "下载",
    "example": "Please download the worksheet before class.",
    "translation": "上课前请下载这份练习单。",
    "level": "A2",
    "theme": "tech",
    "tags": ["study"]
  },
  {
    "word": "update",
    "phonetic": "/ʌpˈdeɪt/",
    "meaning": "更新",
    "example": "Update the app to fix the bug.",
    "translation": "更新应用以修复这个错误。",
    "level": "B1",
    "theme": "tech",
    "tags": ["daily"]
  },
  {
    "word": "screen",
    "phonetic": "/skriːn/",
    "meaning": "屏幕",
    "example": "Too much screen time can hurt your eyes.",
    "translation": "过久盯着屏幕可能伤害眼睛。",
    "level": "A2",
    "theme": "tech",
    "tags": ["daily"]
  },
  {
    "word": "battery",
    "phonetic": "/ˈbætəri/",
    "meaning": "电池",
    "example": "My phone battery is low.",
    "translation": "我的手机电量低了。",
    "level": "A2",
    "theme": "tech",
    "tags": ["daily"]
  },
  {
    "word": "privacy",
    "phonetic": "/ˈpraɪvəsi/",
    "meaning": "隐私",
    "example": "Never share passwords if you care about privacy.",
    "translation": "如果在意隐私，就不要分享密码。",
    "level": "B1",
    "theme": "tech",
    "tags": ["exam"]
  },
  {
    "word": "nose",
    "phonetic": "/noʊz/",
    "meaning": "鼻子",
    "example": "Touch your nose with your finger.",
    "translation": "用手指摸摸你的鼻子。",
    "level": "Pre-A1",
    "theme": "body",
    "tags": ["preschool", "kids"]
  },
  {
    "word": "mouth",
    "phonetic": "/maʊθ/",
    "meaning": "嘴巴",
    "example": "Open your mouth and say ah.",
    "translation": "张开嘴巴说啊。",
    "level": "Pre-A1",
    "theme": "body",
    "tags": ["preschool", "kids"]
  },
  {
    "word": "foot",
    "phonetic": "/fʊt/",
    "meaning": "脚",
    "example": "I hurt my foot while running.",
    "translation": "我跑步时伤到了脚。",
    "level": "Pre-A1",
    "theme": "body",
    "tags": ["kids"]
  },
  {
    "word": "arm",
    "phonetic": "/ɑːrm/",
    "meaning": "手臂",
    "example": "Raise your arm and wave hello.",
    "translation": "举起手臂挥手问好。",
    "level": "Pre-A1",
    "theme": "body",
    "tags": ["kids"]
  },
  {
    "word": "hat",
    "phonetic": "/hæt/",
    "meaning": "帽子",
    "example": "Put on your hat when it is sunny.",
    "translation": "天晴时戴上帽子。",
    "level": "Pre-A1",
    "theme": "clothes",
    "tags": ["preschool", "kids"]
  },
  {
    "word": "coat",
    "phonetic": "/koʊt/",
    "meaning": "外套",
    "example": "Wear a warm coat in winter.",
    "translation": "冬天穿暖和的外套。",
    "level": "Pre-A1",
    "theme": "clothes",
    "tags": ["preschool", "kids"]
  },
  {
    "word": "socks",
    "phonetic": "/sɑːks/",
    "meaning": "袜子",
    "example": "These socks are soft and warm.",
    "translation": "这双袜子又软又暖。",
    "level": "Pre-A1",
    "theme": "clothes",
    "tags": ["preschool", "kids"]
  },
  {
    "word": "dress",
    "phonetic": "/dres/",
    "meaning": "连衣裙",
    "example": "She wore a red dress to the party.",
    "translation": "她穿红色连衣裙去派对。",
    "level": "A1",
    "theme": "clothes",
    "tags": ["kids"]
  },
  {
    "word": "pants",
    "phonetic": "/pænts/",
    "meaning": "裤子",
    "example": "My blue pants are in the bag.",
    "translation": "我的蓝色裤子在书包里。",
    "level": "A1",
    "theme": "clothes",
    "tags": ["kids"]
  },
  {
    "word": "elaborate",
    "phonetic": "/ɪˈlæbəreɪt/",
    "meaning": "详细说明",
    "example": "Could you elaborate on your main point?",
    "translation": "你能详细说明一下你的主要观点吗？",
    "level": "B2",
    "theme": "academic",
    "tags": ["exam"]
  },
  {
    "word": "hypothesis",
    "phonetic": "/haɪˈpɑːθəsɪs/",
    "meaning": "假设",
    "example": "We tested the hypothesis with a simple experiment.",
    "translation": "我们用一个简单实验检验了这个假设。",
    "level": "B2",
    "theme": "academic",
    "tags": ["exam"]
  },
  {
    "word": "evaluate",
    "phonetic": "/ɪˈvæljueɪt/",
    "meaning": "评估",
    "example": "Teachers evaluate essays with a clear rubric.",
    "translation": "老师用清晰的评分标准评估作文。",
    "level": "B2",
    "theme": "academic",
    "tags": ["exam"]
  },
  {
    "word": "imply",
    "phonetic": "/ɪmˈplaɪ/",
    "meaning": "暗示；意味着",
    "example": "His silence may imply disagreement.",
    "translation": "他的沉默可能意味着不同意。",
    "level": "B2",
    "theme": "academic",
    "tags": ["exam"]
  },
  {
    "word": "coherent",
    "phonetic": "/koʊˈhɪrənt/",
    "meaning": "条理清晰的",
    "example": "A coherent essay connects ideas smoothly.",
    "translation": "条理清晰的文章能把观点顺畅连接起来。",
    "level": "B2",
    "theme": "study",
    "tags": ["exam"]
  },
  {
    "word": "resilient",
    "phonetic": "/rɪˈzɪliənt/",
    "meaning": "有韧性的",
    "example": "Resilient learners recover quickly after mistakes.",
    "translation": "有韧性的学习者在犯错后能很快恢复。",
    "level": "B2",
    "theme": "study",
    "tags": ["exam"]
  },
  {
    "word": "advocate",
    "phonetic": "/ˈædvəkeɪt/",
    "meaning": "倡导；支持",
    "example": "Many teachers advocate daily reading habits.",
    "translation": "许多老师倡导每日阅读习惯。",
    "level": "B2",
    "theme": "social",
    "tags": ["exam"]
  },
  {
    "word": "allocate",
    "phonetic": "/ˈæləkeɪt/",
    "meaning": "分配",
    "example": "Allocate twenty minutes each day to listening practice.",
    "translation": "每天分配二十分钟做听力练习。",
    "level": "B2",
    "theme": "work",
    "tags": ["adults"]
  },
  {
    "word": "sustain",
    "phonetic": "/səˈsteɪn/",
    "meaning": "维持；支撑",
    "example": "Short daily sessions help sustain motivation.",
    "translation": "每天短时练习有助于维持动机。",
    "level": "B2",
    "theme": "study",
    "tags": ["exam"]
  },
  {
    "word": "pragmatic",
    "phonetic": "/præɡˈmætɪk/",
    "meaning": "务实的",
    "example": "A pragmatic plan focuses on the next useful step.",
    "translation": "务实的计划聚焦下一步真正有用的动作。",
    "level": "B2",
    "theme": "work",
    "tags": ["adults"]
  },
  {
    "word": "articulate",
    "phonetic": "/ɑːrˈtɪkjuleɪt/",
    "meaning": "清楚表达",
    "example": "She can articulate complex ideas in simple English.",
    "translation": "她能用简单英语清楚表达复杂想法。",
    "level": "B2",
    "theme": "social",
    "tags": ["exam"]
  },
  {
    "word": "contradictory",
    "phonetic": "/ˌkɑːntrəˈdɪktəri/",
    "meaning": "相互矛盾的",
    "example": "The two reports give contradictory advice.",
    "translation": "两份报告给出了相互矛盾的建议。",
    "level": "B2",
    "theme": "academic",
    "tags": ["exam"]
  }
];
