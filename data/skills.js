export const skillMaterials = {
  foundation: {
    listening: [
      {
        title: "周末计划",
        passage: "Hi, I’m Maya. On Saturday morning, I’m going to visit the city library with my brother. We need to return two books. In the afternoon, we’ll meet our friends at a small café near the park. On Sunday, I usually stay home and practise English for twenty minutes.",
        question: "Maya 周六上午要去哪里？",
        options: ["城市图书馆", "公园", "学校", "电影院"],
        answer: 0,
        note: "录音中提到 visit the city library。",
      },
      {
        title: "自我介绍",
        passage: "Hello, my name is Ben. I’m twelve years old. I live with my parents and my little sister. I like football and drawing. After school, I usually do my homework and then play outside for thirty minutes.",
        question: "Ben 放学后通常先做什么？",
        options: ["先踢球", "先做作业", "先画画", "先去公园"],
        answer: 1,
        note: "他说 usually do my homework and then play outside。",
      },
      {
        title: "今天天气",
        passage: "Good morning, class. It’s rainy and a bit cold today, so please wear your jackets. We will stay inside for PE. After lunch, we can still read in the library if you bring your books.",
        question: "今天体育课为什么待在室内？",
        options: ["因为考试", "因为下雨且较冷", "因为图书馆关闭", "因为没有老师"],
        answer: 1,
        note: "It’s rainy and a bit cold，所以室内上体育。",
      },
      {
        title: "超市购物",
        passage: "Mum and I went to the supermarket after school. We bought apples, milk, and bread. Mum also asked for a small bottle of orange juice. At the checkout, I helped put the bags into the trolley. We walked home because the supermarket is only five minutes away.",
        question: "他们为什么走路回家？",
        options: ["因为下雨", "因为超市很近", "因为忘记带钱", "因为公交停运"],
        answer: 1,
        note: "the supermarket is only five minutes away。",
      },
    ],
    speaking: [
      {
        title: "介绍你的周末",
        prompt: "用 3–4 句话说说你这个周末准备做什么，并提到一个时间点。",
        model: "This weekend, I’m going to visit my grandparents on Saturday morning. On Sunday afternoon, I’ll play badminton with my friends.",
      },
      {
        title: "介绍你的家人",
        prompt: "用 3–4 句话介绍你的家庭：有几口人，以及一位家人的特点或喜好。",
        model: "There are four people in my family. My mother is kind, and my father likes cooking. I have one sister. She enjoys music.",
      },
      {
        title: "说说你的爱好",
        prompt: "用 3 句话说明一个爱好、你多久做一次，以及你为什么喜欢它。",
        model: "My hobby is swimming. I usually swim on Saturday morning. I like it because it makes me feel happy and strong.",
      },
      {
        title: "说说你的心情",
        prompt: "用 3 句话说说今天的心情，并给出一个原因。",
        model: "I feel happy today. I finished my homework early. I also played football with my friends after school.",
      },
    ],
    reading: [
      {
        title: "A New Study Habit",
        passage: "Leo used to study English only before tests. He often forgot new words because he tried to learn too many at once. This month, he started a new routine. Every evening, he reviews five words and writes one sentence with each word. On Fridays, he reads all the sentences again. The routine takes only fifteen minutes, but Leo now remembers more and feels less nervous before tests.",
        question: "Leo 的新方法为什么有效？",
        options: ["每天学习时间很长", "定期少量复习并使用单词", "只在周五背单词", "完全不参加考试"],
        answer: 1,
        note: "文章强调少量、持续复习并用新词造句。",
      },
      {
        title: "A Rainy School Day",
        passage: "It was rainy on Monday, so Mia wore her jacket and took an umbrella. At school, her class stayed inside for PE and played word games. After lunch, Mia went to the library with two friends. They read a short story and wrote three new words in their notebooks. Mia said the rainy day was quiet but useful.",
        question: "Mia 午饭后做了什么？",
        options: ["回家睡觉", "去图书馆读故事并记单词", "在操场跑步", "取消所有课程"],
        answer: 1,
        note: "After lunch, Mia went to the library… read… and wrote three new words.",
      },
      {
        title: "Helping at Home",
        passage: "Every Saturday morning, Ben helps his family at home. First, he makes his bed and puts his toys in a box. Then he waters the plants near the window. After that, he and his sister wash the fruit for lunch. Ben says helping at home makes the house tidy and makes him feel proud.",
        question: "Ben 说帮忙做家务让他有什么感觉？",
        options: ["无聊", "害怕", "自豪", "生气"],
        answer: 2,
        note: "makes him feel proud。",
      },
    ],
    writing: [
      {
        title: "写一段学习计划",
        prompt: "用英语写 40–60 词，说明你准备如何改进英语学习习惯。",
        minWords: 40,
        checklist: ["说明一个具体目标", "写出每周学习安排", "使用 because 或 so 解释原因"],
        sample: "I want to improve my speaking this month. I will practise for fifteen minutes after dinner from Monday to Friday. I will record myself because listening to my own voice helps me notice pronunciation problems.",
      },
      {
        title: "写一条约朋友的短信",
        prompt: "用英语写 40–50 词短信：约朋友明天下午在公园见面，并说明时间。",
        minWords: 40,
        checklist: ["有问候", "提出时间和地点", "有结束语"],
        sample: "Hi Sam, are you free tomorrow afternoon? Let’s meet at the park at three. We can walk and practise English for thirty minutes. See you tomorrow!",
      },
      {
        title: "写一段心情日记",
        prompt: "用英语写 40–55 词：描述今天的心情，并说明一件让你有这种感觉的事。",
        minWords: 40,
        checklist: ["写出心情词", "说明一件具体事情", "有一句总结"],
        sample: "Today I feel excited. I learned five new words and used them in short sentences. After dinner I read a story with my sister. It was a happy day for me.",
      },
    ],
  },
  intermediate: {
    listening: [
      {
        title: "改约牙医",
        passage: "Hello, this is Mr. Chen calling about my dental appointment. I was scheduled for Thursday at four, but I have a work meeting at the same time. Could I move it to Friday morning, preferably after nine? If Friday is full, Saturday before noon also works for me.",
        question: "Mr. Chen 最希望把预约改到什么时候？",
        options: ["周四下午四点", "周五上午九点之后", "周六下午", "下周一任意时间"],
        answer: 1,
        note: "他明确提出 Friday morning, preferably after nine。",
      },
      {
        title: "咖啡店点单",
        passage: "I’d like a medium cappuccino, please. Could I have it with oat milk and less sugar? I’d also like a bottle of water. That’s all, thanks. Oh, and could I have the coffee to go?",
        question: "顾客点的咖啡有哪些要求？",
        options: ["大杯、全糖、堂食", "中杯、燕麦奶、少糖、外带", "小杯、无奶、加冰", "只点了水"],
        answer: 1,
        note: "medium、oat milk、less sugar，并且 to go。",
      },
      {
        title: "问路",
        passage: "Excuse me, could you tell me the way to the train station? Go straight for two blocks, then turn left at the traffic lights. The station is next to the park. It’s about seven minutes on foot, so you can’t miss it.",
        question: "到火车站大约需要多久？",
        options: ["两分钟车程", "步行约七分钟", "半小时", "需要换乘地铁"],
        answer: 1,
        note: "about seven minutes on foot。",
      },
      {
        title: "健康小贴士",
        passage: "If you have a cough or a mild fever, stay home and rest. Drink warm water and take medicine only as directed. Light exercise can help when you feel better, but don’t push yourself too hard. If symptoms last more than three days, make an appointment with a doctor.",
        question: "症状持续超过三天时应该做什么？",
        options: ["立刻剧烈运动", "预约看医生", "停止喝水", "忽略所有症状"],
        answer: 1,
        note: "make an appointment with a doctor。",
      },
    ],
    speaking: [
      {
        title: "描述一次小麻烦",
        prompt: "用 4–5 句话讲述一次迟到、迷路或改计划的经历，说明原因和结果。",
        model: "Last week I was late for class because the bus was delayed. I sent a message to my teacher and arrived ten minutes later. Next time I’ll leave home earlier.",
      },
      {
        title: "介绍日常安排",
        prompt: "用 4 句话描述你的工作日：起床、上午、晚饭后、睡前。",
        model: "I usually get up at seven. In the morning I study English for twenty minutes. After dinner I review new words. Before bed I read a short article.",
      },
      {
        title: "礼貌请求帮助",
        prompt: "录制 30–45 秒：你在商店想换一件衣服，礼貌说明问题并请求帮助。",
        model: "Excuse me, I bought this shirt yesterday, but it doesn’t fit. Could I exchange it for a larger size, please? I still have the receipt.",
      },
      {
        title: "推荐一个地方",
        prompt: "用 4 句话推荐图书馆、公园或博物馆：它在哪里、适合做什么、为什么值得去。",
        model: "I recommend the city library near the park. It is quiet and has free Wi-Fi. You can read, review vocabulary, and meet friends there. I go every Saturday afternoon.",
      },
    ],
    reading: [
      {
        title: "Choosing a Study Café",
        passage: "Mina wanted a quiet place to revise vocabulary. The first café near her school was popular, but the music was loud and tables were crowded. The second café was farther away, yet it had free Wi-Fi, soft lighting, and only a few customers in the afternoon. Mina decided the extra ten-minute walk was worth it. She now studies there three times a week and finishes her flashcards faster.",
        question: "Mina 为什么选择第二家咖啡馆？",
        options: ["离学校更近", "音乐更热闹", "环境更适合专注学习", "完全没有其他顾客"],
        answer: 2,
        note: "第二家更安静、人少，更适合复习，尽管距离更远。",
      },
      {
        title: "A Useful Delay",
        passage: "Sam planned to meet his friend at 2 p.m., but the subway was delayed. Instead of getting angry, he used the extra fifteen minutes to review five phrases for his English class. When he finally arrived, his friend was also late. They laughed and practised the phrases together on the way to the café. Sam later said the delay helped him feel more prepared.",
        question: "Sam 如何利用延误时间？",
        options: ["回家睡觉", "复习英语短语", "取消见面", "投诉地铁公司"],
        answer: 1,
        note: "he used the extra fifteen minutes to review five phrases。",
      },
      {
        title: "Screen Time Rules",
        passage: "Lina’s family made a simple screen-time plan. After homework, she can use her tablet for thirty minutes. Before bed, phones stay in the kitchen so everyone sleeps better. On weekends, the family goes to the museum or the beach instead of watching videos all day. Lina says the rules felt strict at first, but now she feels healthier and less tired.",
        question: "Lina 的家庭周末更倾向做什么？",
        options: ["整天看视频", "去博物馆或海滩", "取消所有作业", "增加夜间刷手机"],
        answer: 1,
        note: "goes to the museum or the beach instead of watching videos。",
      },
    ],
    writing: [
      {
        title: "写一封简短邮件",
        prompt: "用英语写 60–80 词邮件：向老师说明你需要改交作业时间，并给出一个新日期。",
        minWords: 60,
        checklist: ["有礼貌的开头和结尾", "说明改期原因", "提出明确的新时间"],
        sample: "Dear Ms. Lee, I am writing to ask if I may submit my writing homework on Thursday instead of Tuesday. I have been sick since Monday and need one more day to revise carefully. Thank you for your understanding. Best regards, Mina",
      },
      {
        title: "写一段购物说明",
        prompt: "用英语写 60–70 词：向店员说明商品问题，并请求退款或换货。",
        minWords: 60,
        checklist: ["说明购买时间或商品", "清楚描述问题", "提出退款或换货请求"],
        sample: "Excuse me, I bought this jacket yesterday, but there is a small hole near the pocket. I still have the receipt. Could I get a refund, or exchange it for another jacket in the same size? Thank you for your help.",
      },
      {
        title: "写一段健康建议",
        prompt: "用英语写 60–75 词：给同学三条保持健康的建议，并解释其中一条。",
        minWords: 60,
        checklist: ["至少三条建议", "解释一条原因", "语气友好"],
        sample: "To stay healthy, sleep enough, drink water, and do light exercise every day. I especially recommend a short walk after dinner because it helps you relax and focus better the next morning. Small habits are easier to keep than big sudden changes.",
      },
    ],
  },
  advanced: {
    listening: [
      {
        title: "远程工作的选择",
        passage: "The company has decided to let employees work remotely two days a week. Managers believe the policy will reduce commuting stress, but they also want teams to spend enough time together. After a three-month trial, the company will review productivity data and employee feedback before making a final decision. Staff have been asked to keep meeting notes shared and respond to messages within one working day.",
        question: "公司为什么设置三个月试行期？",
        options: ["为了取消远程工作", "为了收集数据再作最终决定", "为了减少员工数量", "为了更换管理层"],
        answer: 1,
        note: "录音说明会评估 productivity data 和 employee feedback。",
      },
      {
        title: "会议改期通知",
        passage: "Hi everyone, this is a quick update about Thursday’s project meeting. We need to move it to Friday at ten because two clients requested a longer review session. Please send your slides by Thursday evening and keep the agenda focused on risks and next steps. If Friday morning doesn’t work for you, message me today so I can arrange an alternative slot.",
        question: "会议改到什么时候？",
        options: ["周四晚上", "周五上午十点", "下周一任意时间", "取消会议"],
        answer: 1,
        note: "move it to Friday at ten。",
      },
      {
        title: "旅行保险提醒",
        passage: "Before you travel, check whether your insurance covers medical costs and delayed luggage. Keep your policy number and a digital copy of your passport. If you feel unwell, describe your symptoms clearly and ask whether you need a prescription. For urgent problems, contact the emergency number on your insurance card first.",
        question: "材料建议旅行前检查什么？",
        options: ["只检查酒店评分", "保险是否覆盖医疗与行李延误", "只兑换货币", "取消所有行程"],
        answer: 1,
        note: "check whether your insurance covers medical costs and delayed luggage。",
      },
      {
        title: "隐私与更新",
        passage: "Before you download a new learning app, check its privacy settings and update history. Turn off unnecessary notifications so they do not become a distraction. Allocate a short daily block for practice, then close the app when the timer ends. A pragmatic routine with clear limits is easier to sustain than long unfocused sessions.",
        question: "材料建议下载新应用前先检查什么？",
        options: ["仅检查图标颜色", "隐私设置与更新记录", "只看广告评分", "取消所有下载"],
        answer: 1,
        note: "check its privacy settings and update history。",
      },
    ],
    speaking: [
      {
        title: "表达并支持观点",
        prompt: "录制一段 45–60 秒的回答：远程工作是否应该成为常态？请给出至少两个理由，并回应一个可能的反对意见。",
        model: "I believe remote work should remain an option rather than a fixed rule. It can reduce commuting time, while regular office days still help teams communicate and build trust. Some people worry about isolation, so clear check-ins can address that concern.",
      },
      {
        title: "比较两个方案",
        prompt: "录制 45–60 秒：比较自学 App 与线下班课，说出各自一个优点，并给出你的选择。",
        model: "Apps are more flexible and cheaper, but classes give better feedback. I recommend a mix: use an app for daily words, and take a weekly class to practise speaking.",
      },
      {
        title: "总结一段经历",
        prompt: "用 45 秒总结一次旅行或学习经历：主旨一句、细节两句、收获一句。",
        model: "Last year I joined a short English camp. We practised every morning and gave a presentation on the final day. I felt nervous at first, but clear feedback helped me improve.",
      },
      {
        title: "反驳并折中",
        prompt: "录制 45–60 秒：有人说“每天刷题就够了”。先反驳一点，再提出一个更平衡的方案。",
        model: "I disagree that drills alone are enough. They build accuracy, but without speaking and writing you can’t articulate ideas fluently. A better plan is short drills plus one output task each day.",
      },
    ],
    reading: [
      {
        title: "Why Productive Struggle Matters",
        passage: "When learners receive an answer immediately, they may feel that learning is easy, but the memory they form is often weak. A short period of productive struggle can lead to deeper learning. Trying to retrieve an idea, making a reasonable mistake, and then studying clear feedback forces the brain to reorganize knowledge. The difficulty must remain manageable: if a task is far beyond the learner’s current level, frustration replaces useful effort. Effective teaching therefore balances challenge with timely support.",
        question: "作者对 productive struggle 的核心观点是什么？",
        options: ["学习越困难越好", "应完全避免错误", "适度挑战配合及时支持能加深学习", "教师应立即给出所有答案"],
        answer: 2,
        note: "文章主张 manageable difficulty 与 timely support 之间的平衡。",
      },
      {
        title: "Making Better Decisions at Work",
        passage: "Teams often rush to a decision when time feels urgent. A better approach is to compare two or three options, list the main benefit and risk of each, and then choose. The process does not need to be long. Even ten minutes of structured comparison can reduce costly mistakes. After the decision, write down the reason. This record helps the team review results later and improve the next time.",
        question: "作者建议做决定前先做什么？",
        options: ["立刻投票", "比较两三个方案并列出利弊", "完全交给领导", "拖延到下周"],
        answer: 1,
        note: "compare two or three options, list the main benefit and risk。",
      },
      {
        title: "Evaluating Conflicting Advice",
        passage: "Online advice about language learning is often contradictory. One article may advocate long immersion sessions, while another implies that short spaced practice is better. A resilient learner evaluates claims against personal evidence: What improved fluency last month? What created only distraction? Instead of chasing every new tip, allocate time to methods that have already produced coherent progress, then sustain them long enough to judge results.",
        question: "作者建议学习者如何对待相互矛盾的建议？",
        options: ["全部照做", "立刻换方法", "用自己的证据评估并坚持有效方法", "只相信最长的文章"],
        answer: 2,
        note: "evaluates claims against personal evidence，并持续有效方法。",
      },
    ],
    writing: [
      {
        title: "写一段观点论证",
        prompt: "用英语写 90–120 词：Technology makes language learning better. 你是否同意？",
        minWords: 90,
        checklist: ["开头明确表达立场", "至少提供两个理由或例子", "使用 however、therefore 等连接词"],
        sample: "Technology can make language learning more effective, but only when it supports a clear learning goal. Apps provide immediate feedback and make regular practice easier. However, watching videos passively is not enough. Learners still need to retrieve vocabulary, speak, write, and respond to feedback. Therefore, technology works best as part of an active learning routine.",
      },
      {
        title: "写一段方案建议",
        prompt: "用英语写 90–110 词：你们小组要在图书馆自学和咖啡店讨论之间做选择。比较后给出建议。",
        minWords: 90,
        checklist: ["比较两个选项", "明确推荐一个", "说明至少一个风险或让步"],
        sample: "We should compare the library and the café carefully. The library is quieter and more efficient for reading, while the café is more flexible for discussion. However, loud music may reduce focus. I recommend the library for the first hour, then a short café meeting if we need to talk. This plan keeps both concentration and collaboration.",
      },
      {
        title: "写一段评估报告摘要",
        prompt: "用英语写 90–120 词：评估“每天只背单词”的学习方案，给出结论和改进建议。",
        minWords: 90,
        checklist: ["评估至少一个优点和一个局限", "给出明确结论", "提出可执行改进"],
        sample: "Memorising word lists can build recognition quickly, but it rarely develops fluency by itself. Learners may know meanings yet struggle to articulate ideas in speech or writing. A more pragmatic approach is to allocate part of each session to retrieval, example sentences, and short output tasks. Therefore, word lists should support practice, not replace it.",
      },
    ],
  },
};

/** Normalize skill slot to an array (supports legacy single-object shape). */
export function skillItemList(tierMaterials, skill) {
  const value = tierMaterials?.[skill];
  if (Array.isArray(value)) return value;
  return value ? [value] : [];
}

export function skillTierForLevel(level) {
  if (level === "B1" || level === "B2") return "advanced";
  if (level === "A2") return "intermediate";
  return "foundation";
}
