/** Teaching IPA chart. Example words drive TTS (browsers cannot reliably speak bare IPA). */
export const phoneticCategories = [
  { id: "all", title: "全部" },
  { id: "vowels", title: "元音" },
  { id: "diphthongs", title: "双元音" },
  { id: "consonants", title: "辅音" },
];

/**
 * tipZh: Chinese-only coaching text for TTS (no IPA glyphs).
 * example: English word spoken by English voice.
 */
export const phoneticSymbols = [
  { id: "ae", ipa: "æ", group: "vowels", label: "短元音", tipZh: "嘴巴张大、舌位靠前。听例词 cat，也就是猫。", example: "cat", gloss: "猫" },
  { id: "e", ipa: "e", group: "vowels", label: "短元音", tipZh: "嘴型比上一个音更收一点。听例词 bed，也就是床。", example: "bed", gloss: "床" },
  { id: "i", ipa: "ɪ", group: "vowels", label: "短元音", tipZh: "短而松，接近轻声的一，但更短。听例词 fish，也就是鱼。", example: "fish", gloss: "鱼" },
  { id: "o", ipa: "ɒ", group: "vowels", label: "短元音", tipZh: "嘴圆、开口短促。听例词 hot，也就是热的。", example: "hot", gloss: "热的" },
  { id: "u", ipa: "ʊ", group: "vowels", label: "短元音", tipZh: "短而圆，很快说完。听例词 book，也就是书。", example: "book", gloss: "书" },
  { id: "vowel-uh", ipa: "ʌ", group: "vowels", label: "短元音", tipZh: "嘴巴自然半开，声音短促。听例词 cup，也就是杯子。", example: "cup", gloss: "杯子" },
  { id: "schwa", ipa: "ə", group: "vowels", label: "弱读元音", tipZh: "最常见的弱读音，轻轻一带即可。听例词 about，也就是大约。", example: "about", gloss: "大约" },
  { id: "i-long", ipa: "iː", group: "vowels", label: "长元音", tipZh: "微笑着把声音拉长。听例词 see，也就是看见。", example: "see", gloss: "看见" },
  { id: "a-long", ipa: "ɑː", group: "vowels", label: "长元音", tipZh: "嘴巴张开，像医生让你说啊，并拉长。听例词 car，也就是汽车。", example: "car", gloss: "汽车" },
  { id: "o-long", ipa: "ɔː", group: "vowels", label: "长元音", tipZh: "圆唇并把声音拉长。听例词 door，也就是门。", example: "door", gloss: "门" },
  { id: "u-long", ipa: "uː", group: "vowels", label: "长元音", tipZh: "圆唇向前，声音拉长。听例词 moon，也就是月亮。", example: "moon", gloss: "月亮" },
  { id: "er-long", ipa: "ɜː", group: "vowels", label: "长元音", tipZh: "舌位居中，声音拉长。听例词 bird，也就是鸟。", example: "bird", gloss: "鸟" },
  { id: "ei", ipa: "eɪ", group: "diphthongs", label: "双元音", tipZh: "从前半个音滑到后半个音。听例词 day，也就是白天。", example: "day", gloss: "白天" },
  { id: "ai", ipa: "aɪ", group: "diphthongs", label: "双元音", tipZh: "从开口音滑到短促的一。听例词 my，也就是我的。", example: "my", gloss: "我的" },
  { id: "oi", ipa: "ɔɪ", group: "diphthongs", label: "双元音", tipZh: "从圆唇音滑到短促的一。听例词 boy，也就是男孩。", example: "boy", gloss: "男孩" },
  { id: "ou", ipa: "əʊ", group: "diphthongs", label: "双元音", tipZh: "从中间音滑到圆唇音。听例词 go，也就是去。", example: "go", gloss: "去" },
  { id: "au", ipa: "aʊ", group: "diphthongs", label: "双元音", tipZh: "从开口音滑到圆唇音。听例词 now，也就是现在。", example: "now", gloss: "现在" },
  { id: "ie", ipa: "ɪə", group: "diphthongs", label: "双元音", tipZh: "从短促的一滑到轻声。听例词 here，也就是这里。", example: "here", gloss: "这里" },
  { id: "ee", ipa: "eə", group: "diphthongs", label: "双元音", tipZh: "从前元音滑到轻声。听例词 hair，也就是头发。", example: "hair", gloss: "头发" },
  { id: "ue", ipa: "ʊə", group: "diphthongs", label: "双元音", tipZh: "从圆唇短音滑到轻声。听例词 tour，也就是旅行。", example: "tour", gloss: "旅行" },
  { id: "p", ipa: "p", group: "consonants", label: "清辅音", tipZh: "双唇闭合后突然打开，声带不振动。听例词 pen，也就是钢笔。", example: "pen", gloss: "钢笔" },
  { id: "b", ipa: "b", group: "consonants", label: "浊辅音", tipZh: "双唇闭合后打开，声带振动。听例词 book，也就是书。", example: "book", gloss: "书" },
  { id: "t", ipa: "t", group: "consonants", label: "清辅音", tipZh: "舌尖抵住上牙龈后放开。听例词 tea，也就是茶。", example: "tea", gloss: "茶" },
  { id: "d", ipa: "d", group: "consonants", label: "浊辅音", tipZh: "舌位和清辅音 t 相近，但声带振动。听例词 dog，也就是狗。", example: "dog", gloss: "狗" },
  { id: "k", ipa: "k", group: "consonants", label: "清辅音", tipZh: "舌后抵软腭再放开。听例词 cat，也就是猫。", example: "cat", gloss: "猫" },
  { id: "g", ipa: "g", group: "consonants", label: "浊辅音", tipZh: "舌位和清辅音 k 相近，声带振动。听例词 go，也就是去。", example: "go", gloss: "去" },
  { id: "f", ipa: "f", group: "consonants", label: "清辅音", tipZh: "上齿轻触下唇，吹气。听例词 fish，也就是鱼。", example: "fish", gloss: "鱼" },
  { id: "v", ipa: "v", group: "consonants", label: "浊辅音", tipZh: "口型和 f 相同，声带振动。听例词 very，也就是非常。", example: "very", gloss: "非常" },
  { id: "th-voiceless", ipa: "θ", group: "consonants", label: "清辅音", tipZh: "舌尖轻触上齿，轻轻吹气。听例词 think，也就是想。", example: "think", gloss: "想" },
  { id: "th-voiced", ipa: "ð", group: "consonants", label: "浊辅音", tipZh: "舌尖轻触上齿，声带振动。听例词 this，也就是这个。", example: "this", gloss: "这个" },
  { id: "s", ipa: "s", group: "consonants", label: "清辅音", tipZh: "齿间留缝，气流摩擦，像轻声的蛇音。听例词 sun，也就是太阳。", example: "sun", gloss: "太阳" },
  { id: "z", ipa: "z", group: "consonants", label: "浊辅音", tipZh: "口型和 s 相近，声带振动。听例词 zoo，也就是动物园。", example: "zoo", gloss: "动物园" },
  { id: "sh", ipa: "ʃ", group: "consonants", label: "清辅音", tipZh: "嘴唇略圆，气流摩擦。听例词 ship，也就是船。", example: "ship", gloss: "船" },
  { id: "zh", ipa: "ʒ", group: "consonants", label: "浊辅音", tipZh: "口型和 sh 相近，声带振动。听例词 measure，也就是测量。", example: "measure", gloss: "测量" },
  { id: "h", ipa: "h", group: "consonants", label: "清辅音", tipZh: "气流轻轻送出，不要用力。听例词 hat，也就是帽子。", example: "hat", gloss: "帽子" },
  { id: "ch", ipa: "tʃ", group: "consonants", label: "破擦音", tipZh: "先轻触再摩擦放出。听例词 chair，也就是椅子。", example: "chair", gloss: "椅子" },
  { id: "j", ipa: "dʒ", group: "consonants", label: "破擦音", tipZh: "和 ch 口型相近，声带振动。听例词 jump，也就是跳。", example: "jump", gloss: "跳" },
  { id: "m", ipa: "m", group: "consonants", label: "鼻音", tipZh: "双唇闭合，声音从鼻子出来。听例词 man，也就是男人。", example: "man", gloss: "男人" },
  { id: "n", ipa: "n", group: "consonants", label: "鼻音", tipZh: "舌尖抵上牙龈，声音从鼻子出来。听例词 no，也就是不。", example: "no", gloss: "不" },
  { id: "ng", ipa: "ŋ", group: "consonants", label: "鼻音", tipZh: "舌后抬起，声音从鼻子出来。听例词 sing，也就是唱歌。", example: "sing", gloss: "唱歌" },
  { id: "l", ipa: "l", group: "consonants", label: "流音", tipZh: "舌尖抵上牙龈，气流从两侧出去。听例词 light，也就是光。", example: "light", gloss: "光" },
  { id: "r", ipa: "r", group: "consonants", label: "近音", tipZh: "美式常略卷舌。听例词 red，也就是红色。", example: "red", gloss: "红色" },
  { id: "w", ipa: "w", group: "consonants", label: "近音", tipZh: "先圆唇，再接到后面的元音。听例词 we，也就是我们。", example: "we", gloss: "我们" },
  { id: "y", ipa: "j", group: "consonants", label: "近音", tipZh: "像很快的衣，马上接到元音。听例词 yes，也就是是。", example: "yes", gloss: "是" },
];

export function phoneticById(id) {
  return phoneticSymbols.find((item) => item.id === id);
}

export function phoneticsInCategory(categoryId) {
  if (!categoryId || categoryId === "all") return phoneticSymbols;
  return phoneticSymbols.filter((item) => item.group === categoryId);
}

/** Minimal pairs for discrimination practice (listen → choose). */
export const phoneticMinimalPairs = [
  {
    id: "ship-sheep",
    left: { symbolId: "i", word: "ship", gloss: "船" },
    right: { symbolId: "i-long", word: "sheep", gloss: "羊" },
    tipZh: "长短对立：ship 短而松，sheep 拉长微笑。",
  },
  {
    id: "cat-cut",
    left: { symbolId: "ae", word: "cat", gloss: "猫" },
    right: { symbolId: "vowel-uh", word: "cut", gloss: "切" },
    tipZh: "cat 嘴张更大更靠前，cut 更居中短促。",
  },
  {
    id: "bed-bad",
    left: { symbolId: "e", word: "bed", gloss: "床" },
    right: { symbolId: "ae", word: "bad", gloss: "坏的" },
    tipZh: "bed 嘴型稍收，bad 嘴巴张得更开。",
  },
  {
    id: "full-fool",
    left: { symbolId: "u", word: "full", gloss: "满的" },
    right: { symbolId: "u-long", word: "fool", gloss: "傻瓜" },
    tipZh: "full 短圆，fool 把圆唇音拉长。",
  },
  {
    id: "pen-pan",
    left: { symbolId: "e", word: "pen", gloss: "钢笔" },
    right: { symbolId: "ae", word: "pan", gloss: "平底锅" },
    tipZh: "pen 稍收，pan 开口更大。",
  },
  {
    id: "not-nought",
    left: { symbolId: "o", word: "not", gloss: "不" },
    right: { symbolId: "o-long", word: "nought", gloss: "零" },
    tipZh: "not 短促圆唇，nought（英式）把 /ɔː/ 拉长。",
  },
  {
    id: "fan-van",
    left: { symbolId: "f", word: "fan", gloss: "风扇" },
    right: { symbolId: "v", word: "van", gloss: "厢式货车" },
    tipZh: "f 清音不振动，v 声带振动。",
  },
  {
    id: "sip-zip",
    left: { symbolId: "s", word: "sip", gloss: "小口喝" },
    right: { symbolId: "z", word: "zip", gloss: "拉链" },
    tipZh: "s 像轻声蛇音，z 声带振动。",
  },
  {
    id: "thin-this",
    left: { symbolId: "th-voiceless", word: "thin", gloss: "瘦的" },
    right: { symbolId: "th-voiced", word: "this", gloss: "这个" },
    tipZh: "thin 清音吹气，this 声带振动。",
  },
  {
    id: "light-right",
    left: { symbolId: "l", word: "light", gloss: "光" },
    right: { symbolId: "r", word: "right", gloss: "右边" },
    tipZh: "light 舌尖抵龈，right 略卷舌（美式）。",
  },
  {
    id: "day-they",
    left: { symbolId: "d", word: "day", gloss: "白天" },
    right: { symbolId: "th-voiced", word: "they", gloss: "他们" },
    tipZh: "day 舌尖抵龈爆破；they 舌尖轻触上齿并振动。",
  },
  {
    id: "go-cow",
    left: { symbolId: "ou", word: "go", gloss: "去" },
    right: { symbolId: "au", word: "cow", gloss: "牛" },
    tipZh: "go 是 /əʊ/，cow 是 /aʊ/，开口起点不同。",
  },
];

export function pairsForSymbol(symbolId) {
  if (!symbolId) return phoneticMinimalPairs;
  return phoneticMinimalPairs.filter(
    (pair) => pair.left.symbolId === symbolId || pair.right.symbolId === symbolId,
  );
}
