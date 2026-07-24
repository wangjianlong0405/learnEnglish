/** Listening-first picture units for children aged 4-6. No reading is required. */
export const preschoolGroupMeta = {
  "world": {
    "title": "身边世界",
    "blurb": "动物、颜色、天气、玩具和出行"
  },
  "me": {
    "title": "认识自己",
    "blurb": "家人、身体、动作、衣物和心情"
  },
  "daily": {
    "title": "每天生活",
    "blurb": "食物、数字、上学、家里和洗漱"
  }
};

export const preschoolUnits = [
  {
    "id": "animals",
    "icon": "🐱",
    "title": "Animal Friends",
    "titleZh": "小动物",
    "color": "#ffe0cf",
    "instruction": "先点图片听一听，再听声音找出小动物。",
    "items": [
      {
        "word": "cat",
        "zh": "小猫",
        "visual": "🐱"
      },
      {
        "word": "dog",
        "zh": "小狗",
        "visual": "🐶"
      },
      {
        "word": "rabbit",
        "zh": "小兔子",
        "visual": "🐰"
      },
      {
        "word": "bird",
        "zh": "小鸟",
        "visual": "🐦"
      },
      {
        "word": "fish",
        "zh": "小鱼",
        "visual": "🐟"
      },
      {
        "word": "duck",
        "zh": "小鸭子",
        "visual": "🦆"
      }
    ],
    "questions": [
      {
        "prompt": "小猫在哪里？",
        "audio": "cat",
        "answer": "cat",
        "choices": [
          "dog",
          "cat",
          "bird"
        ]
      },
      {
        "prompt": "小狗在哪里？",
        "audio": "dog",
        "answer": "dog",
        "choices": [
          "rabbit",
          "cat",
          "dog"
        ]
      },
      {
        "prompt": "小兔子在哪里？",
        "audio": "rabbit",
        "answer": "rabbit",
        "choices": [
          "bird",
          "rabbit",
          "dog"
        ]
      },
      {
        "prompt": "小鸟在哪里？",
        "audio": "bird",
        "answer": "bird",
        "choices": [
          "cat",
          "bird",
          "fish"
        ]
      },
      {
        "prompt": "小鱼在哪里？",
        "audio": "fish",
        "answer": "fish",
        "choices": [
          "duck",
          "fish",
          "rabbit"
        ]
      },
      {
        "prompt": "小鸭子在哪里？",
        "audio": "duck",
        "answer": "duck",
        "choices": [
          "duck",
          "cat",
          "fish"
        ]
      }
    ],
    "group": "world"
  },
  {
    "id": "colors",
    "icon": "🎨",
    "title": "Magic Colors",
    "titleZh": "魔法颜色",
    "color": "#dceee8",
    "instruction": "点颜色听英文，再听声音找出一样的颜色。",
    "items": [
      {
        "word": "red",
        "zh": "红色",
        "visual": "●",
        "swatch": "#e95b4b"
      },
      {
        "word": "blue",
        "zh": "蓝色",
        "visual": "■",
        "swatch": "#3f7fd8"
      },
      {
        "word": "yellow",
        "zh": "黄色",
        "visual": "▲",
        "swatch": "#f2c84b"
      },
      {
        "word": "green",
        "zh": "绿色",
        "visual": "◆",
        "swatch": "#3faf6c"
      },
      {
        "word": "orange",
        "zh": "橙色",
        "visual": "●",
        "swatch": "#f08a3a"
      },
      {
        "word": "purple",
        "zh": "紫色",
        "visual": "■",
        "swatch": "#8b6ad8"
      }
    ],
    "questions": [
      {
        "prompt": "红色在哪里？",
        "audio": "red",
        "answer": "red",
        "choices": [
          "blue",
          "yellow",
          "red"
        ]
      },
      {
        "prompt": "蓝色在哪里？",
        "audio": "blue",
        "answer": "blue",
        "choices": [
          "blue",
          "green",
          "yellow"
        ]
      },
      {
        "prompt": "黄色在哪里？",
        "audio": "yellow",
        "answer": "yellow",
        "choices": [
          "red",
          "yellow",
          "green"
        ]
      },
      {
        "prompt": "绿色在哪里？",
        "audio": "green",
        "answer": "green",
        "choices": [
          "green",
          "red",
          "blue"
        ]
      },
      {
        "prompt": "橙色在哪里？",
        "audio": "orange",
        "answer": "orange",
        "choices": [
          "purple",
          "orange",
          "blue"
        ]
      },
      {
        "prompt": "紫色在哪里？",
        "audio": "purple",
        "answer": "purple",
        "choices": [
          "yellow",
          "green",
          "purple"
        ]
      }
    ],
    "group": "world"
  },
  {
    "id": "snacks",
    "icon": "🍎",
    "title": "Yummy Snacks",
    "titleZh": "好吃的食物",
    "color": "#fff1b8",
    "instruction": "先听食物的英文名字，再帮它找到正确的图片。",
    "items": [
      {
        "word": "apple",
        "zh": "苹果",
        "visual": "🍎"
      },
      {
        "word": "banana",
        "zh": "香蕉",
        "visual": "🍌"
      },
      {
        "word": "milk",
        "zh": "牛奶",
        "visual": "🥛"
      },
      {
        "word": "cake",
        "zh": "蛋糕",
        "visual": "🍰"
      },
      {
        "word": "bread",
        "zh": "面包",
        "visual": "🍞"
      },
      {
        "word": "egg",
        "zh": "鸡蛋",
        "visual": "🥚"
      }
    ],
    "questions": [
      {
        "prompt": "苹果在哪里？",
        "audio": "apple",
        "answer": "apple",
        "choices": [
          "banana",
          "apple",
          "cake"
        ]
      },
      {
        "prompt": "香蕉在哪里？",
        "audio": "banana",
        "answer": "banana",
        "choices": [
          "milk",
          "banana",
          "apple"
        ]
      },
      {
        "prompt": "牛奶在哪里？",
        "audio": "milk",
        "answer": "milk",
        "choices": [
          "cake",
          "apple",
          "milk"
        ]
      },
      {
        "prompt": "蛋糕在哪里？",
        "audio": "cake",
        "answer": "cake",
        "choices": [
          "cake",
          "banana",
          "milk"
        ]
      },
      {
        "prompt": "面包在哪里？",
        "audio": "bread",
        "answer": "bread",
        "choices": [
          "egg",
          "bread",
          "apple"
        ]
      },
      {
        "prompt": "鸡蛋在哪里？",
        "audio": "egg",
        "answer": "egg",
        "choices": [
          "milk",
          "cake",
          "egg"
        ]
      }
    ],
    "group": "daily"
  },
  {
    "id": "numbers",
    "icon": "🔢",
    "title": "Count With Me",
    "titleZh": "一起数数",
    "color": "#e4ddff",
    "instruction": "点数字听英文，再听声音找出正确的数字。",
    "items": [
      {
        "word": "one",
        "zh": "一",
        "visual": "1️⃣"
      },
      {
        "word": "two",
        "zh": "二",
        "visual": "2️⃣"
      },
      {
        "word": "three",
        "zh": "三",
        "visual": "3️⃣"
      },
      {
        "word": "four",
        "zh": "四",
        "visual": "4️⃣"
      },
      {
        "word": "five",
        "zh": "五",
        "visual": "5️⃣"
      },
      {
        "word": "six",
        "zh": "六",
        "visual": "6️⃣"
      }
    ],
    "questions": [
      {
        "prompt": "一在哪里？",
        "audio": "one",
        "answer": "one",
        "choices": [
          "two",
          "one",
          "four"
        ]
      },
      {
        "prompt": "二在哪里？",
        "audio": "two",
        "answer": "two",
        "choices": [
          "three",
          "two",
          "one"
        ]
      },
      {
        "prompt": "三在哪里？",
        "audio": "three",
        "answer": "three",
        "choices": [
          "four",
          "one",
          "three"
        ]
      },
      {
        "prompt": "四在哪里？",
        "audio": "four",
        "answer": "four",
        "choices": [
          "four",
          "two",
          "three"
        ]
      },
      {
        "prompt": "五在哪里？",
        "audio": "five",
        "answer": "five",
        "choices": [
          "six",
          "five",
          "one"
        ]
      },
      {
        "prompt": "六在哪里？",
        "audio": "six",
        "answer": "six",
        "choices": [
          "three",
          "four",
          "six"
        ]
      }
    ],
    "group": "daily"
  },
  {
    "id": "family",
    "icon": "👨‍👩‍👧",
    "title": "My Family",
    "titleZh": "我的家人",
    "color": "#ffe8f0",
    "instruction": "先认识家人图片，再听声音找出对应的家人。",
    "items": [
      {
        "word": "mother",
        "zh": "妈妈",
        "visual": "👩"
      },
      {
        "word": "father",
        "zh": "爸爸",
        "visual": "👨"
      },
      {
        "word": "baby",
        "zh": "宝宝",
        "visual": "👶"
      },
      {
        "word": "sister",
        "zh": "姐姐/妹妹",
        "visual": "👧"
      },
      {
        "word": "brother",
        "zh": "哥哥/弟弟",
        "visual": "👦"
      },
      {
        "word": "grandma",
        "zh": "奶奶/外婆",
        "visual": "👵"
      }
    ],
    "questions": [
      {
        "prompt": "妈妈在哪里？",
        "audio": "mother",
        "answer": "mother",
        "choices": [
          "father",
          "mother",
          "baby"
        ]
      },
      {
        "prompt": "爸爸在哪里？",
        "audio": "father",
        "answer": "father",
        "choices": [
          "sister",
          "father",
          "mother"
        ]
      },
      {
        "prompt": "宝宝在哪里？",
        "audio": "baby",
        "answer": "baby",
        "choices": [
          "baby",
          "sister",
          "father"
        ]
      },
      {
        "prompt": "姐姐在哪里？",
        "audio": "sister",
        "answer": "sister",
        "choices": [
          "mother",
          "baby",
          "sister"
        ]
      },
      {
        "prompt": "哥哥在哪里？",
        "audio": "brother",
        "answer": "brother",
        "choices": [
          "brother",
          "grandma",
          "baby"
        ]
      },
      {
        "prompt": "奶奶在哪里？",
        "audio": "grandma",
        "answer": "grandma",
        "choices": [
          "father",
          "grandma",
          "sister"
        ]
      }
    ],
    "group": "me"
  },
  {
    "id": "body",
    "icon": "🙌",
    "title": "My Body",
    "titleZh": "我的身体",
    "color": "#dff3ff",
    "instruction": "摸摸自己，再听英文找出正确的身体部位图片。",
    "items": [
      {
        "word": "hand",
        "zh": "手",
        "visual": "✋"
      },
      {
        "word": "head",
        "zh": "头",
        "visual": "🙂"
      },
      {
        "word": "eye",
        "zh": "眼睛",
        "visual": "👁️"
      },
      {
        "word": "ear",
        "zh": "耳朵",
        "visual": "👂"
      },
      {
        "word": "nose",
        "zh": "鼻子",
        "visual": "👃"
      },
      {
        "word": "mouth",
        "zh": "嘴巴",
        "visual": "👄"
      }
    ],
    "questions": [
      {
        "prompt": "手在哪里？",
        "audio": "hand",
        "answer": "hand",
        "choices": [
          "head",
          "hand",
          "ear"
        ]
      },
      {
        "prompt": "头在哪里？",
        "audio": "head",
        "answer": "head",
        "choices": [
          "eye",
          "ear",
          "head"
        ]
      },
      {
        "prompt": "眼睛在哪里？",
        "audio": "eye",
        "answer": "eye",
        "choices": [
          "eye",
          "hand",
          "head"
        ]
      },
      {
        "prompt": "耳朵在哪里？",
        "audio": "ear",
        "answer": "ear",
        "choices": [
          "hand",
          "ear",
          "eye"
        ]
      },
      {
        "prompt": "鼻子在哪里？",
        "audio": "nose",
        "answer": "nose",
        "choices": [
          "mouth",
          "nose",
          "hand"
        ]
      },
      {
        "prompt": "嘴巴在哪里？",
        "audio": "mouth",
        "answer": "mouth",
        "choices": [
          "ear",
          "head",
          "mouth"
        ]
      }
    ],
    "group": "me"
  },
  {
    "id": "actions",
    "icon": "🏃",
    "title": "I Can Move",
    "titleZh": "我会动",
    "color": "#e8f8df",
    "instruction": "听动作词，点出正在做这个动作的图片。",
    "items": [
      {
        "word": "run",
        "zh": "跑",
        "visual": "🏃"
      },
      {
        "word": "jump",
        "zh": "跳",
        "visual": "🤸"
      },
      {
        "word": "sing",
        "zh": "唱",
        "visual": "🎤"
      },
      {
        "word": "play",
        "zh": "玩",
        "visual": "🧸"
      },
      {
        "word": "walk",
        "zh": "走",
        "visual": "🚶"
      },
      {
        "word": "sleep",
        "zh": "睡觉",
        "visual": "😴"
      }
    ],
    "questions": [
      {
        "prompt": "跑在哪里？",
        "audio": "run",
        "answer": "run",
        "choices": [
          "jump",
          "run",
          "play"
        ]
      },
      {
        "prompt": "跳在哪里？",
        "audio": "jump",
        "answer": "jump",
        "choices": [
          "sing",
          "jump",
          "run"
        ]
      },
      {
        "prompt": "唱在哪里？",
        "audio": "sing",
        "answer": "sing",
        "choices": [
          "play",
          "run",
          "sing"
        ]
      },
      {
        "prompt": "玩在哪里？",
        "audio": "play",
        "answer": "play",
        "choices": [
          "play",
          "jump",
          "sing"
        ]
      },
      {
        "prompt": "走在哪里？",
        "audio": "walk",
        "answer": "walk",
        "choices": [
          "sleep",
          "walk",
          "run"
        ]
      },
      {
        "prompt": "睡觉在哪里？",
        "audio": "sleep",
        "answer": "sleep",
        "choices": [
          "jump",
          "play",
          "sleep"
        ]
      }
    ],
    "group": "me"
  },
  {
    "id": "clothes",
    "icon": "👕",
    "title": "Clothes Day",
    "titleZh": "穿衣出门",
    "color": "#fff0e0",
    "instruction": "听衣物名字，再找出正确的图片。",
    "items": [
      {
        "word": "hat",
        "zh": "帽子",
        "visual": "🎩"
      },
      {
        "word": "shoes",
        "zh": "鞋子",
        "visual": "👟"
      },
      {
        "word": "shirt",
        "zh": "衬衫",
        "visual": "👕"
      },
      {
        "word": "bag",
        "zh": "书包",
        "visual": "🎒"
      },
      {
        "word": "coat",
        "zh": "外套",
        "visual": "🧥"
      },
      {
        "word": "socks",
        "zh": "袜子",
        "visual": "🧦"
      }
    ],
    "questions": [
      {
        "prompt": "帽子在哪里？",
        "audio": "hat",
        "answer": "hat",
        "choices": [
          "shoes",
          "hat",
          "bag"
        ]
      },
      {
        "prompt": "鞋子在哪里？",
        "audio": "shoes",
        "answer": "shoes",
        "choices": [
          "shirt",
          "shoes",
          "hat"
        ]
      },
      {
        "prompt": "衬衫在哪里？",
        "audio": "shirt",
        "answer": "shirt",
        "choices": [
          "bag",
          "hat",
          "shirt"
        ]
      },
      {
        "prompt": "书包在哪里？",
        "audio": "bag",
        "answer": "bag",
        "choices": [
          "bag",
          "shoes",
          "shirt"
        ]
      },
      {
        "prompt": "外套在哪里？",
        "audio": "coat",
        "answer": "coat",
        "choices": [
          "socks",
          "coat",
          "hat"
        ]
      },
      {
        "prompt": "袜子在哪里？",
        "audio": "socks",
        "answer": "socks",
        "choices": [
          "shirt",
          "bag",
          "socks"
        ]
      }
    ],
    "group": "me"
  },
  {
    "id": "school",
    "icon": "📚",
    "title": "School Things",
    "titleZh": "上学用品",
    "color": "#eef2ff",
    "instruction": "听听这些上学用品的英文，再点出正确图片。",
    "items": [
      {
        "word": "book",
        "zh": "书",
        "visual": "📖"
      },
      {
        "word": "pencil",
        "zh": "铅笔",
        "visual": "✏️"
      },
      {
        "word": "ball",
        "zh": "球",
        "visual": "⚽"
      },
      {
        "word": "bus",
        "zh": "校车",
        "visual": "🚌"
      },
      {
        "word": "eraser",
        "zh": "橡皮",
        "visual": "🧼"
      },
      {
        "word": "desk",
        "zh": "课桌",
        "visual": "🪑"
      }
    ],
    "questions": [
      {
        "prompt": "书在哪里？",
        "audio": "book",
        "answer": "book",
        "choices": [
          "pencil",
          "book",
          "bus"
        ]
      },
      {
        "prompt": "铅笔在哪里？",
        "audio": "pencil",
        "answer": "pencil",
        "choices": [
          "ball",
          "pencil",
          "book"
        ]
      },
      {
        "prompt": "球在哪里？",
        "audio": "ball",
        "answer": "ball",
        "choices": [
          "bus",
          "book",
          "ball"
        ]
      },
      {
        "prompt": "校车在哪里？",
        "audio": "bus",
        "answer": "bus",
        "choices": [
          "bus",
          "pencil",
          "ball"
        ]
      },
      {
        "prompt": "橡皮在哪里？",
        "audio": "eraser",
        "answer": "eraser",
        "choices": [
          "desk",
          "eraser",
          "book"
        ]
      },
      {
        "prompt": "课桌在哪里？",
        "audio": "desk",
        "answer": "desk",
        "choices": [
          "ball",
          "bus",
          "desk"
        ]
      }
    ],
    "group": "daily"
  },
  {
    "id": "weather",
    "icon": "☀️",
    "title": "Look Outside",
    "titleZh": "看看外面",
    "color": "#fff7d6",
    "instruction": "听天气词，找出外面正在发生什么。",
    "items": [
      {
        "word": "sun",
        "zh": "太阳",
        "visual": "☀️"
      },
      {
        "word": "rain",
        "zh": "雨",
        "visual": "🌧️"
      },
      {
        "word": "cloud",
        "zh": "云",
        "visual": "☁️"
      },
      {
        "word": "wind",
        "zh": "风",
        "visual": "💨"
      },
      {
        "word": "snow",
        "zh": "雪",
        "visual": "❄️"
      },
      {
        "word": "star",
        "zh": "星星",
        "visual": "⭐"
      }
    ],
    "questions": [
      {
        "prompt": "太阳在哪里？",
        "audio": "sun",
        "answer": "sun",
        "choices": [
          "rain",
          "sun",
          "cloud"
        ]
      },
      {
        "prompt": "雨在哪里？",
        "audio": "rain",
        "answer": "rain",
        "choices": [
          "wind",
          "rain",
          "sun"
        ]
      },
      {
        "prompt": "云在哪里？",
        "audio": "cloud",
        "answer": "cloud",
        "choices": [
          "cloud",
          "snow",
          "star"
        ]
      },
      {
        "prompt": "风在哪里？",
        "audio": "wind",
        "answer": "wind",
        "choices": [
          "sun",
          "wind",
          "rain"
        ]
      },
      {
        "prompt": "雪在哪里？",
        "audio": "snow",
        "answer": "snow",
        "choices": [
          "star",
          "cloud",
          "snow"
        ]
      },
      {
        "prompt": "星星在哪里？",
        "audio": "star",
        "answer": "star",
        "choices": [
          "star",
          "sun",
          "wind"
        ]
      }
    ],
    "group": "world"
  },
  {
    "id": "toys",
    "icon": "🧸",
    "title": "Toy Box",
    "titleZh": "玩具盒",
    "color": "#ffe4f1",
    "instruction": "打开玩具盒，听名字找出正确的玩具。",
    "items": [
      {
        "word": "doll",
        "zh": "娃娃",
        "visual": "🎎"
      },
      {
        "word": "car",
        "zh": "小汽车",
        "visual": "🚗"
      },
      {
        "word": "block",
        "zh": "积木",
        "visual": "🧱"
      },
      {
        "word": "kite",
        "zh": "风筝",
        "visual": "🪁"
      },
      {
        "word": "drum",
        "zh": "鼓",
        "visual": "🥁"
      },
      {
        "word": "robot",
        "zh": "机器人",
        "visual": "🤖"
      }
    ],
    "questions": [
      {
        "prompt": "娃娃在哪里？",
        "audio": "doll",
        "answer": "doll",
        "choices": [
          "car",
          "doll",
          "kite"
        ]
      },
      {
        "prompt": "小汽车在哪里？",
        "audio": "car",
        "answer": "car",
        "choices": [
          "block",
          "car",
          "drum"
        ]
      },
      {
        "prompt": "积木在哪里？",
        "audio": "block",
        "answer": "block",
        "choices": [
          "block",
          "robot",
          "doll"
        ]
      },
      {
        "prompt": "风筝在哪里？",
        "audio": "kite",
        "answer": "kite",
        "choices": [
          "drum",
          "car",
          "kite"
        ]
      },
      {
        "prompt": "鼓在哪里？",
        "audio": "drum",
        "answer": "drum",
        "choices": [
          "drum",
          "block",
          "robot"
        ]
      },
      {
        "prompt": "机器人在哪里？",
        "audio": "robot",
        "answer": "robot",
        "choices": [
          "kite",
          "robot",
          "doll"
        ]
      }
    ],
    "group": "world"
  },
  {
    "id": "home",
    "icon": "🏠",
    "title": "At Home",
    "titleZh": "在家里",
    "color": "#e8f0ff",
    "instruction": "听家里的物品名字，再点出正确图片。",
    "items": [
      {
        "word": "bed",
        "zh": "床",
        "visual": "🛏️"
      },
      {
        "word": "door",
        "zh": "门",
        "visual": "🚪"
      },
      {
        "word": "window",
        "zh": "窗户",
        "visual": "🪟"
      },
      {
        "word": "table",
        "zh": "桌子",
        "visual": "🪵"
      },
      {
        "word": "lamp",
        "zh": "灯",
        "visual": "💡"
      },
      {
        "word": "sofa",
        "zh": "沙发",
        "visual": "🛋️"
      }
    ],
    "questions": [
      {
        "prompt": "床在哪里？",
        "audio": "bed",
        "answer": "bed",
        "choices": [
          "door",
          "bed",
          "sofa"
        ]
      },
      {
        "prompt": "门在哪里？",
        "audio": "door",
        "answer": "door",
        "choices": [
          "window",
          "door",
          "lamp"
        ]
      },
      {
        "prompt": "窗户在哪里？",
        "audio": "window",
        "answer": "window",
        "choices": [
          "window",
          "table",
          "bed"
        ]
      },
      {
        "prompt": "桌子在哪里？",
        "audio": "table",
        "answer": "table",
        "choices": [
          "sofa",
          "lamp",
          "table"
        ]
      },
      {
        "prompt": "灯在哪里？",
        "audio": "lamp",
        "answer": "lamp",
        "choices": [
          "lamp",
          "door",
          "window"
        ]
      },
      {
        "prompt": "沙发在哪里？",
        "audio": "sofa",
        "answer": "sofa",
        "choices": [
          "bed",
          "sofa",
          "table"
        ]
      }
    ],
    "group": "daily"
  },
  {
    "id": "emotions",
    "icon": "😊",
    "title": "My Feelings",
    "titleZh": "我的心情",
    "color": "#ffe9f4",
    "instruction": "先点表情听英文，再听声音找出一样的心情。",
    "items": [
      {
        "word": "happy",
        "zh": "开心",
        "visual": "😄"
      },
      {
        "word": "sad",
        "zh": "难过",
        "visual": "😢"
      },
      {
        "word": "angry",
        "zh": "生气",
        "visual": "😠"
      },
      {
        "word": "sleepy",
        "zh": "困了",
        "visual": "😪"
      },
      {
        "word": "hungry",
        "zh": "饿了",
        "visual": "😋"
      },
      {
        "word": "cold",
        "zh": "觉得冷",
        "visual": "🥶"
      }
    ],
    "questions": [
      {
        "prompt": "开心在哪里？",
        "audio": "happy",
        "answer": "happy",
        "choices": [
          "sad",
          "happy",
          "angry"
        ]
      },
      {
        "prompt": "难过在哪里？",
        "audio": "sad",
        "answer": "sad",
        "choices": [
          "sleepy",
          "sad",
          "happy"
        ]
      },
      {
        "prompt": "生气在哪里？",
        "audio": "angry",
        "answer": "angry",
        "choices": [
          "angry",
          "cold",
          "hungry"
        ]
      },
      {
        "prompt": "困了在哪里？",
        "audio": "sleepy",
        "answer": "sleepy",
        "choices": [
          "hungry",
          "happy",
          "sleepy"
        ]
      },
      {
        "prompt": "饿了在哪里？",
        "audio": "hungry",
        "answer": "hungry",
        "choices": [
          "hungry",
          "sad",
          "cold"
        ]
      },
      {
        "prompt": "觉得冷在哪里？",
        "audio": "cold",
        "answer": "cold",
        "choices": [
          "sleepy",
          "cold",
          "angry"
        ]
      }
    ],
    "group": "me"
  },
  {
    "id": "transport",
    "icon": "🚌",
    "title": "Go Go Go",
    "titleZh": "出行工具",
    "color": "#e4f4ff",
    "instruction": "听听这些车和船的英文，再点出正确图片。",
    "items": [
      {
        "word": "car",
        "zh": "小汽车",
        "visual": "🚗"
      },
      {
        "word": "bus",
        "zh": "公交车",
        "visual": "🚌"
      },
      {
        "word": "bike",
        "zh": "自行车",
        "visual": "🚲"
      },
      {
        "word": "train",
        "zh": "火车",
        "visual": "🚆"
      },
      {
        "word": "plane",
        "zh": "飞机",
        "visual": "✈️"
      },
      {
        "word": "boat",
        "zh": "小船",
        "visual": "⛵"
      }
    ],
    "questions": [
      {
        "prompt": "小汽车在哪里？",
        "audio": "car",
        "answer": "car",
        "choices": [
          "bus",
          "car",
          "bike"
        ]
      },
      {
        "prompt": "公交车在哪里？",
        "audio": "bus",
        "answer": "bus",
        "choices": [
          "train",
          "bus",
          "plane"
        ]
      },
      {
        "prompt": "自行车在哪里？",
        "audio": "bike",
        "answer": "bike",
        "choices": [
          "bike",
          "boat",
          "car"
        ]
      },
      {
        "prompt": "火车在哪里？",
        "audio": "train",
        "answer": "train",
        "choices": [
          "plane",
          "car",
          "train"
        ]
      },
      {
        "prompt": "飞机在哪里？",
        "audio": "plane",
        "answer": "plane",
        "choices": [
          "plane",
          "bus",
          "boat"
        ]
      },
      {
        "prompt": "小船在哪里？",
        "audio": "boat",
        "answer": "boat",
        "choices": [
          "bike",
          "boat",
          "train"
        ]
      }
    ],
    "group": "world"
  },
  {
    "id": "bath",
    "icon": "🛁",
    "title": "Bath Time",
    "titleZh": "洗漱时间",
    "color": "#e8fff6",
    "instruction": "先听洗漱用品的英文，再帮它们找到正确图片。",
    "items": [
      {
        "word": "water",
        "zh": "水",
        "visual": "💧"
      },
      {
        "word": "soap",
        "zh": "肥皂",
        "visual": "🧼"
      },
      {
        "word": "towel",
        "zh": "毛巾",
        "visual": "🧻"
      },
      {
        "word": "brush",
        "zh": "牙刷",
        "visual": "🪥"
      },
      {
        "word": "bath",
        "zh": "洗澡",
        "visual": "🛁"
      },
      {
        "word": "wash",
        "zh": "洗手",
        "visual": "🙌"
      }
    ],
    "questions": [
      {
        "prompt": "水在哪里？",
        "audio": "water",
        "answer": "water",
        "choices": [
          "soap",
          "water",
          "bath"
        ]
      },
      {
        "prompt": "肥皂在哪里？",
        "audio": "soap",
        "answer": "soap",
        "choices": [
          "towel",
          "soap",
          "brush"
        ]
      },
      {
        "prompt": "毛巾在哪里？",
        "audio": "towel",
        "answer": "towel",
        "choices": [
          "towel",
          "wash",
          "water"
        ]
      },
      {
        "prompt": "牙刷在哪里？",
        "audio": "brush",
        "answer": "brush",
        "choices": [
          "bath",
          "brush",
          "soap"
        ]
      },
      {
        "prompt": "洗澡在哪里？",
        "audio": "bath",
        "answer": "bath",
        "choices": [
          "bath",
          "towel",
          "wash"
        ]
      },
      {
        "prompt": "洗手在哪里？",
        "audio": "wash",
        "answer": "wash",
        "choices": [
          "water",
          "brush",
          "wash"
        ]
      }
    ],
    "group": "daily"
  }
];

export function preschoolUnitById(id) {
  return preschoolUnits.find((unit) => unit.id === id);
}

export function preschoolUnitsByGroup() {
  const order = ["world", "me", "daily"];
  return order.map((id) => ({
    id,
    ...preschoolGroupMeta[id],
    units: preschoolUnits.filter((unit) => unit.group === id),
  })).filter((group) => group.units.length);
}
