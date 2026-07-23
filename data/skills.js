export const skillMaterials = {
  foundation: {
    listening: {
      title: "周末计划",
      passage: "Hi, I’m Maya. On Saturday morning, I’m going to visit the city library with my brother. We need to return two books. In the afternoon, we’ll meet our friends at a small café near the park. On Sunday, I usually stay home and practise English for twenty minutes.",
      question: "Maya 周六上午要去哪里？",
      options: ["城市图书馆", "公园", "学校", "电影院"],
      answer: 0,
      note: "录音中提到 visit the city library。",
    },
    speaking: {
      title: "介绍你的周末",
      prompt: "用 3–4 句话说说你这个周末准备做什么，并提到一个时间点。",
      model: "This weekend, I’m going to visit my grandparents on Saturday morning. On Sunday afternoon, I’ll play badminton with my friends.",
    },
    reading: {
      title: "A New Study Habit",
      passage: "Leo used to study English only before tests. He often forgot new words because he tried to learn too many at once. This month, he started a new routine. Every evening, he reviews five words and writes one sentence with each word. On Fridays, he reads all the sentences again. The routine takes only fifteen minutes, but Leo now remembers more and feels less nervous before tests.",
      question: "Leo 的新方法为什么有效？",
      options: ["每天学习时间很长", "定期少量复习并使用单词", "只在周五背单词", "完全不参加考试"],
      answer: 1,
      note: "文章强调少量、持续复习并用新词造句。",
    },
    writing: {
      title: "写一段学习计划",
      prompt: "用英语写 40–60 词，说明你准备如何改进英语学习习惯。",
      minWords: 40,
      checklist: ["说明一个具体目标", "写出每周学习安排", "使用 because 或 so 解释原因"],
      sample: "I want to improve my speaking this month. I will practise for fifteen minutes after dinner from Monday to Friday. I will record myself because listening to my own voice helps me notice pronunciation problems.",
    },
  },
  intermediate: {
    listening: {
      title: "改约牙医",
      passage: "Hello, this is Mr. Chen calling about my dental appointment. I was scheduled for Thursday at four, but I have a work meeting at the same time. Could I move it to Friday morning, preferably after nine? If Friday is full, Saturday before noon also works for me.",
      question: "Mr. Chen 最希望把预约改到什么时候？",
      options: ["周四下午四点", "周五上午九点之后", "周六下午", "下周一任意时间"],
      answer: 1,
      note: "他明确提出 Friday morning, preferably after nine。",
    },
    speaking: {
      title: "描述一次小麻烦",
      prompt: "用 4–5 句话讲述一次迟到、迷路或改计划的经历，说明原因和结果。",
      model: "Last week I was late for class because the bus was delayed. I sent a message to my teacher and arrived ten minutes later. Next time I’ll leave home earlier.",
    },
    reading: {
      title: "Choosing a Study Café",
      passage: "Mina wanted a quiet place to revise vocabulary. The first café near her school was popular, but the music was loud and tables were crowded. The second café was farther away, yet it had free Wi-Fi, soft lighting, and only a few customers in the afternoon. Mina decided the extra ten-minute walk was worth it. She now studies there three times a week and finishes her flashcards faster.",
      question: "Mina 为什么选择第二家咖啡馆？",
      options: ["离学校更近", "音乐更热闹", "环境更适合专注学习", "完全没有其他顾客"],
      answer: 2,
      note: "第二家更安静、人少，更适合复习，尽管距离更远。",
    },
    writing: {
      title: "写一封简短邮件",
      prompt: "用英语写 60–80 词邮件：向老师说明你需要改交作业时间，并给出一个新日期。",
      minWords: 60,
      checklist: ["有礼貌的开头和结尾", "说明改期原因", "提出明确的新时间"],
      sample: "Dear Ms. Lee, I am writing to ask if I may submit my writing homework on Thursday instead of Tuesday. I have been sick since Monday and need one more day to revise carefully. Thank you for your understanding. Best regards, Mina",
    },
  },
  advanced: {
    listening: {
      title: "远程工作的选择",
      passage: "The company has decided to let employees work remotely two days a week. Managers believe the policy will reduce commuting stress, but they also want teams to spend enough time together. After a three-month trial, the company will review productivity data and employee feedback before making a final decision. Staff have been asked to keep meeting notes shared and respond to messages within one working day.",
      question: "公司为什么设置三个月试行期？",
      options: ["为了取消远程工作", "为了收集数据再作最终决定", "为了减少员工数量", "为了更换管理层"],
      answer: 1,
      note: "录音说明会评估 productivity data 和 employee feedback。",
    },
    speaking: {
      title: "表达并支持观点",
      prompt: "录制一段 45–60 秒的回答：远程工作是否应该成为常态？请给出至少两个理由，并回应一个可能的反对意见。",
      model: "I believe remote work should remain an option rather than a fixed rule. It can reduce commuting time, while regular office days still help teams communicate and build trust. Some people worry about isolation, so clear check-ins can address that concern.",
    },
    reading: {
      title: "Why Productive Struggle Matters",
      passage: "When learners receive an answer immediately, they may feel that learning is easy, but the memory they form is often weak. A short period of productive struggle can lead to deeper learning. Trying to retrieve an idea, making a reasonable mistake, and then studying clear feedback forces the brain to reorganize knowledge. The difficulty must remain manageable: if a task is far beyond the learner’s current level, frustration replaces useful effort. Effective teaching therefore balances challenge with timely support.",
      question: "作者对 productive struggle 的核心观点是什么？",
      options: ["学习越困难越好", "应完全避免错误", "适度挑战配合及时支持能加深学习", "教师应立即给出所有答案"],
      answer: 2,
      note: "文章主张 manageable difficulty 与 timely support 之间的平衡。",
    },
    writing: {
      title: "写一段观点论证",
      prompt: "用英语写 90–120 词：Technology makes language learning better. 你是否同意？",
      minWords: 90,
      checklist: ["开头明确表达立场", "至少提供两个理由或例子", "使用 however、therefore 等连接词"],
      sample: "Technology can make language learning more effective, but only when it supports a clear learning goal. Apps provide immediate feedback and make regular practice easier. However, watching videos passively is not enough. Learners still need to retrieve vocabulary, speak, write, and respond to feedback. Therefore, technology works best as part of an active learning routine.",
    },
  },
};

export function skillTierForLevel(level) {
  if (level === "B1" || level === "B2") return "advanced";
  if (level === "A2") return "intermediate";
  return "foundation";
}
