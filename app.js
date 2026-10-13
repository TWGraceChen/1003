const TEAMS = [
  { id: 'red', name: '紅隊', color: '#eb5b58' },
  { id: 'blue', name: '藍隊', color: '#3784df' },
  { id: 'yellow', name: '黃隊', color: '#e9b623' },
  { id: 'green', name: '綠隊', color: '#3fab72' },
  { id: 'purple', name: '紫隊', color: '#9067cd' },
];

const CATEGORIES = [
  { id: 'insight', name: '洞察力', icon: '👀' },
  { id: 'reasoning', name: '推理力', icon: '🧩' },
  { id: 'reaction', name: '反應力', icon: '⚡' },
  { id: 'teamwork', name: '合作力', icon: '🤝' },
];

const SPECIALS = {
  4: { type: 'extraTurn', icon: '🎁', label: '再一次', description: '立即再選一項任務挑戰。' },
  8: { type: 'advance', value: 2, icon: '🚀', label: '前進 2 格', description: '立即前進 2 格。' },
  12: { type: 'skip', icon: '⏸', label: '暫停一輪', description: '下一次輪到此隊時直接跳過。' },
  16: { type: 'back', value: 3, icon: '↩️', label: '後退 3 格', description: '立即後退 3 格。' },
  20: { type: 'extraTurn', icon: '🎁', label: '再一次', description: '立即再選一項任務挑戰。' },
  23: { type: 'advance', value: 2, icon: '🚀', label: '前進 2 格', description: '立即前進 2 格。' },
};

// 固定 25 格的大富翁外圈；8 欄 × 7 列的外框剛好容納 START + 25 格。
const TRACK_LAYOUT = [
  [0, 6], [1, 6], [2, 6], [3, 6], [4, 6], [5, 6], [6, 6], [7, 6],
  [7, 5], [7, 4], [7, 3], [7, 2], [7, 1], [7, 0], [6, 0], [5, 0],
  [4, 0], [3, 0], [2, 0], [1, 0], [0, 0], [0, 1], [0, 2], [0, 3],
  [0, 4], [0, 5],
];

const COLOR_TRAP_COLORS = {
  red: { label: '紅', hex: '#e3474d' },
  blue: { label: '藍', hex: '#2878db' },
  yellow: { label: '黃', hex: '#d69d00' },
  green: { label: '綠', hex: '#24965b' },
};

const TASK_DEFINITIONS = {
  teamwork_1: [{
    title: '全員到齊！',
    timeLimit: 20,
    scene: 'camera',
    reusable: true,
    content: {
      kind: 'timerOnly',
      icon: '📷',
      timerLabel: '全員笑一個！',
      rules: [
        '全隊開啟鏡頭。',
        '所有人一起露齒笑。',
        '全員完成就挑戰成功！',
      ],
    },
  }],
  teamwork_2: ['耶穌愛我', '因他活著', '我神真偉大'].map(song => ({
    title: '詩歌接力賽',
    scene: 'music',
    content: {
      kind: 'songRelay',
      song,
    },
  })),
  teamwork_3: ['教會', '動物', '運動', '愛心', '交通工具'].map(prompt => ({
    title: '想到什麼比什麼',
    timeLimit: 10,
    scene: 'gesture',
    content: {
      kind: 'gestureSingle',
      intro: '每個人同時用動作比出自己第一個想到的答案。只要全隊裡有三種不同的答案，就算挑戰成功。',
      prompt,
    },
  })),
  teamwork_5: [{
    title: '我說你畫',
    timeLimit: 60,
    scene: 'whisper',
    reusable: true,
    content: {
      kind: 'timerOnly',
      timerLabel: '開始畫！',
      rules: [
        '主持人私訊該隊其中一位成員一個題目。',
        '這位成員不能直接說出答案，也不能說「像什麼」。',
        '只能描述畫法，其他隊員一邊聽、一邊畫。',
        '最後要在時間內猜出答案。',
      ],
      example: {
        title: '範例：題目是「太陽」',
        steps: ['畫一個圓。', '圓的外面畫很多短短的線。', '線要朝不同方向。'],
      },
    },
  }],
  teamwork_4: [{
    title: '關鍵字快傳',
    timeLimit: 20,
    scene: 'whisper',
    reusable: true,
    content: {
      kind: 'timerOnly',
      timerLabel: '開始提示！',
      rules: [
        '主持人私訊該隊其中一位成員一個題目。',
        '該成員只能說 3 個提示詞。',
        '不能直接說出答案，也不能說出答案裡的字。',
        '其他隊員要在時間內猜出答案。',
      ],
    },
  }],
  insight_4: [{
    title: '誰是新朋友',
    timeLimit: 15,
    scene: 'missingPerson',
    content: {
      kind: 'missingPerson',
      intro: '請記住畫面中的所有人。15 秒後畫面會切換，請找出哪一位是新加入的人。',
      beforeImage: 'images/1-4-1-1.png',
      afterImage: 'images/1-4-1-2.png',
      comparisonType: 'newFriend',
    },
    answer: true,
  }],
  insight_5: [{
    title: '隱藏的五個需要',
    timeLimit: 60,
    scene: 'care',
    content: {
      kind: 'hiddenNeeds',
      intro: '請找出圖片中五個需要被協助的地方，並說出你可以如何協助。',
      image: 'images/1-5-1.png',
      alt: '公園中需要被協助的情境',
      count: 5,
    },
  }],
  insight_3: [{
    title: '觀察員的秘密任務',
    timeLimit: 20,
    scene: 'memory',
    content: {
      kind: 'memoryQuestions',
      intro: '請仔細觀察愛宴現場的所有細節。20 秒後，畫面會切換為記憶題。',
      image: 'images/1-3-1.png',
      questions: [
        '有幾個人在搬椅子？',
        '女孩拿著什麼動物的玩偶？',
        '在玩車的男孩戴什麼顏色的帽子？',
      ],
      answers: ['2位', '兔子', '藍色'],
    },
    answer: true,
  }],
  insight_2: [{
    title: '教會誰來找碴',
    timeLimit: 30,
    scene: 'detective',
    content: {
      kind: 'findDifference',
      intro: '兩張圖片包含 5 處不同，請在 30 秒內找出至少 3 處。',
      image: 'images/1-2-1.png',
    },
  }],
  insight_1: [{
    title: '誰不見了？',
    timeLimit: 10,
    scene: 'missingPerson',
    content: {
      kind: 'missingPerson',
      intro: '請記住九宮格中的人物。10 秒後畫面會切換，找出哪一位不見了。',
      beforeImage: 'images/1-1-1-1.png',
      afterImage: 'images/1-1-1-2.png',
    },
    answer: true,
  }],
  reaction_2: [
    {
      title: '快找快回・第 1 題',
      timeLimit: 30,
      scene: 'findItems',
      content: { kind: 'findItems', intro: '限時 30 秒找到指定物品。', prefix: '找出五個', focus: '藍色', suffix: '的東西。', tone: 'blue' },
    },
    {
      title: '快找快回・第 2 題',
      timeLimit: 30,
      scene: 'findItems',
      content: { kind: 'findItems', intro: '限時 30 秒找到指定物品。', prefix: '找三個', focus: '可以黏住東西', suffix: '的物品。', tone: 'gold' },
    },
    {
      title: '快找快回・第 3 題',
      timeLimit: 30,
      scene: 'findItems',
      content: { kind: 'findItems', intro: '限時 30 秒找到指定物品。', prefix: '找四個', focus: '摸起來軟軟的', suffix: '東西。', tone: 'pink' },
    },
  ],
  reaction_3: [
    {
      title: '支援前線・第 1 題',
      timeLimit: 60,
      scene: 'findItems',
      content: { kind: 'findItems', intro: '限時 1 分鐘找到指定物品。', prefix: '找三個', focus: '可以發出聲音', suffix: '，但不是樂器的東西。', tone: 'purple' },
    },
    {
      title: '支援前線・第 2 題',
      timeLimit: 60,
      scene: 'findItems',
      content: { kind: 'findItems', intro: '限時 1 分鐘找到指定物品。', prefix: '找三個', focus: '可以讓別人感到溫暖', suffix: '的東西。', tone: 'orange' },
    },
    {
      title: '支援前線・第 3 題',
      timeLimit: 60,
      scene: 'findItems',
      content: { kind: 'findItems', intro: '限時 1 分鐘找到指定物品。', prefix: '找三個', focus: '可以裝東西', suffix: '，但不是袋子或盒子的物品。', tone: 'green' },
    },
  ],
  reaction_4: [
    {
      title: '圖像搜查令・第 1 組',
      timeLimit: 30,
      scene: 'iconSearch',
      content: {
        kind: 'iconRiddle',
        intro: '看每張卡的 3 個圖像，猜出對應的職業。',
        label: '猜出相關的職業',
        riddles: [
          { icons: ['🩺', '💊', '✚'], answer: '醫生' },
          { icons: ['📚', '✏️', '🧑‍🏫'], answer: '老師' },
          { icons: ['📷', '⚡', '🖼️'], answer: '攝影師' },
        ],
      },
      answer: true,
    },
    {
      title: '圖像搜查令・第 2 組',
      timeLimit: 30,
      scene: 'iconSearch',
      content: {
        kind: 'iconRiddle',
        intro: '看每張卡的 3 個圖像，猜出對應的教會服事崗位。',
        label: '猜出相關的教會服事崗位',
        riddles: [
          { icons: ['🎤', '🎵', '🎸'], answer: '敬拜主領' },
          { icons: ['🎧', '🔊', '🎤'], answer: '音控' },
          { icons: ['🚪', '🪪', '😊'], answer: '招待／接待同工' },
        ],
      },
      answer: true,
    },
    {
      title: '圖像搜查令・第 3 組',
      timeLimit: 30,
      scene: 'iconSearch',
      content: {
        kind: 'iconRiddle',
        intro: '看每張卡的 3 個圖像，猜出對應的聖經故事。',
        label: '猜出相關的聖經故事',
        riddles: [
          { icons: ['⛵', '🌧️', '🐘'], answer: '挪亞方舟' },
          { icons: ['🍞', '🐟', '🧺'], answer: '五餅二魚' },
          { icons: ['⛵', '🌊', '💤'], answer: '耶穌平靜風浪' },
        ],
      },
      answer: true,
    },
  ],
  reasoning_3: [
    {
      title: '找出不合理・第 1 題',
      timeLimit: 60,
      scene: 'detective',
      content: {
        kind: 'spotImage',
        intro: '找出圖片當中 3 處不合理的地方。',
        image: 'images/2-3-1.png',
        alt: '公園中的人、自行車與長椅',
      },
      answer: [
        '腳踏車的後輪異常小',
        '長椅少了一個支撐腳',
        '中間遛狗男子的影子方向不對',
      ],
    },
    {
      title: '找出不合理・第 2 題',
      timeLimit: 60,
      scene: 'detective',
      content: {
        kind: 'spotImage',
        intro: '找出圖片當中 3 處不合理的地方。',
        image: 'images/2-3-2.png',
        alt: '教室中的學生、時鐘與世界地圖',
      },
      answer: [
        '學生的書本拿反了',
        '時鐘數字順序錯誤',
        '世界地圖上下顛倒',
      ],
    },
  ],
  reaction_5: [
    {
      title: '語言急轉彎・第 1 組',
      timeLimit: 30,
      scene: 'language',
      content: {
        kind: 'languageTwister',
        intro: '會連續出現 6 個中文詞語。請在 30 秒內，用中文以外的語言說出對應詞語。',
        words: ['耶穌', '教會', '朋友', '一起', '幫助', '分享'],
      },
    },
    {
      title: '語言急轉彎・第 2 組',
      timeLimit: 30,
      scene: 'language',
      content: {
        kind: 'languageTwister',
        intro: '會連續出現 6 個中文詞語。請在 30 秒內，用中文以外的語言說出對應詞語。',
        words: ['基督', '大家', '身體', '需要', '照顧', '禱告'],
      },
    },
    {
      title: '語言急轉彎・第 3 組',
      timeLimit: 30,
      scene: 'language',
      content: {
        kind: 'languageTwister',
        intro: '會連續出現 6 個中文詞語。請在 30 秒內，用中文以外的語言說出對應詞語。',
        words: ['聖經', '家庭', '孩子', '不同', '合作', '敬拜'],
      },
    },
  ],
  reaction_1: [
    {
      title: '顏色陷阱・第 1 組',
      timeLimit: 20,
      scene: 'color',
      content: {
        kind: 'colorTrap',
        intro: '請依序說出每個字的「顯示顏色」，不要讀出文字內容。',
        words: [['紅','blue'], ['藍','yellow'], ['黃','green'], ['綠','red'], ['紅','green'], ['藍','red'], ['黃','blue'], ['綠','yellow'], ['紅','yellow'], ['藍','green']],
      },
    },
    {
      title: '顏色陷阱・第 2 組',
      timeLimit: 20,
      scene: 'color',
      content: {
        kind: 'colorTrap',
        intro: '請依序說出每個字的「顯示顏色」，不要讀出文字內容。',
        words: [['綠','blue'], ['黃','red'], ['藍','green'], ['紅','yellow'], ['綠','red'], ['黃','blue'], ['藍','yellow'], ['紅','green'], ['綠','yellow'], ['黃','green']],
      },
    },
    {
      title: '顏色陷阱・第 3 組',
      timeLimit: 20,
      scene: 'color',
      content: {
        kind: 'colorTrap',
        intro: '請依序說出每個字的「顯示顏色」，不要讀出文字內容。',
        words: [['黃','blue'], ['綠','red'], ['紅','green'], ['藍','yellow'], ['黃','red'], ['綠','yellow'], ['紅','blue'], ['藍','green'], ['黃','green'], ['綠','blue']],
      },
    },
  ],
  reasoning_2: [{
    title: '順序大解密',
    timeLimit: 120,
    scene: 'path',
    content: {
      kind: 'sequence',
      intro: '根據以弗所書 4:15–16，找出四個關鍵線索，並排出正確順序！',
      references: ['以弗所書 4:15–16'],
      pieces: [
        '身體漸漸增長',
        '連於基督',
        '在愛中建立自己',
        '各按各職、彼此相助',
      ],
      correctOrder: [1, 3, 0, 2],
    },
    answer: true,
  }],
  reasoning_1: [{
    title: '破解通行碼',
    timeLimit: 120,
    scene: 'lock',
    content: {
      kind: 'quiz',
      intro: '找出三道線索的正確答案，拼出密碼，成功解鎖下一關。',
      references: ['哥林多前書 12:12', '以弗所書 1:22', '哥林多前書 12:21'],
      answerCode: '132',
      questions: [
        {
          label: '線索 1',
          prompt: '哥林多前書 12:12 提到「身子有幾個」？',
          options: ['1 個', '2 個', '3 個'],
          correctIndex: 0,
        },
        {
          label: '線索 2',
          prompt: '以弗所書 1:22 說神使基督作萬有的什麼？',
          options: ['手', '腳', '頭', '心臟'],
          correctIndex: 2,
        },
        {
          label: '線索 3',
          prompt: '哥林多前書 12:21 記載，眼睛對手說「我用不著你！」接著，「頭」也對哪個部位說「我用不著你」？',
          options: ['肚子', '腳', '耳朵'],
          correctIndex: 1,
        },
      ],
    },
    answer: true,
  }],
  reasoning_4: [{
    title: '解鎖教會的大門',
    timeLimit: 120,
    scene: 'door',
    content: {
      kind: 'quiz',
      intro: '教會的門鎖住了！必須解開四道線索才能取得密碼。',
      references: ['哥林多前書 12:14', '哥林多前書 12:26–27'],
      answerCode: '3331',
      questions: [
        {
          label: '線索 1',
          prompt: '哥林多前書 12:14 說「身子原不是一個肢體，乃是（ ）個肢體」。',
          options: ['兩個', '三個', '許多個'],
          correctIndex: 2,
        },
        {
          label: '線索 2',
          prompt: '「你們就是基督的身體，並且各自作肢體。」這節核心經文，是哥林多前書 12 章的第幾節？',
          options: ['第 12 節', '第 22 節', '第 27 節'],
          correctIndex: 2,
        },
        {
          label: '線索 3',
          prompt: '哥林多前書 12:26 說：「若一個肢體受苦，（ ）的肢體就一同受苦」。請問括號裡是指百分之幾的肢體？',
          options: ['10%', '50%', '100%'],
          correctIndex: 2,
        },
        {
          label: '線索 4',
          prompt: '教會的「頭」（基督）與「身體」（我們）加起來，總共是幾個合一的教會？',
          options: ['1 個', '2 個', '3 個'],
          correctIndex: 0,
        },
      ],
    },
    answer: true,
  }],
  reasoning_5: [{
    title: '真假情報局',
    timeLimit: 120,
    content: {
      intro: '下面 6 張情報卡中，有 3 張完全符合經文，3 張被偷偷改過。請查閱指定經文，在 2 分鐘內找出所有被竄改的情報。注意：錯的情報意思可能聽起來沒問題，但和經文實際寫法不完全一致。',
      references: ['哥林多前書 12:14–27', '羅馬書 12:6–8', '以弗所書 4:15–16'],
      cards: [
        ['A', '身子原不是一個肢體，乃是許多肢體。'],
        ['B', '腳若說：「我不是手，所以不屬乎身子。」它不能因此就不屬乎身子。'],
        ['C', '眼不能對腳說：「我用不著你」；頭也不能對手說：「我用不著你」。'],
        ['D', '神隨自己的意思，把肢體俱各安排在身上。'],
        ['E', '或勸化的，就當專一勸化；施捨的，就當殷勤；治理的，就當誠實；憐憫人的，就當甘心。'],
        ['F', '全身靠著他聯絡得合式，百節各按各職，照著各人的恩賜彼此相助，便叫身體漸漸增長。'],
      ],
    },
    answer: [
      {
        card: 'C',
        note: '「手」與「腳」被對調',
        shown: '眼不能對<span class="diff-wrong">腳</span>說：「我用不著你」；頭也不能對<span class="diff-wrong">手</span>說：「我用不著你」。',
        actual: '眼不能對<span class="diff-correct">手</span>說：「我用不著你」；頭也不能對<span class="diff-correct">腳</span>說：「我用不著你」。',
      },
      {
        card: 'E',
        note: '「誠實」與「殷勤」被對調',
        shown: '施捨的，就當<span class="diff-wrong">殷勤</span>；治理的，就當<span class="diff-wrong">誠實</span>。',
        actual: '施捨的，就當<span class="diff-correct">誠實</span>；治理的，就當<span class="diff-correct">殷勤</span>。',
      },
      {
        card: 'F',
        note: '關鍵描述被替換',
        shown: '照著<span class="diff-wrong">各人的恩賜</span>彼此相助。',
        actual: '照著<span class="diff-correct">各體的功用</span>彼此相助。',
      },
    ],
  }],
};

// 每個「類別 × 難度」是一個任務池。日後只要在 tasks 陣列加上新物件，就能放入多題。
const taskPools = Object.fromEntries(CATEGORIES.flatMap(category => Array.from({ length: 5 }, (_, i) => {
  const difficulty = i + 1;
  const id = `${category.id}_${difficulty}`;
  return [id, {
    id,
    category: category.id,
    difficulty,
    tasks: (TASK_DEFINITIONS[id] || [{ title: '尚未設定', content: '尚未設定', timeLimit: 30 }]).map((task, index) => ({
      id: `${id}_${index + 1}`,
      category: category.id,
      difficulty,
      used: false,
      ...task,
    })),
  }];
})));

const state = {
  teams: Object.fromEntries(TEAMS.map(team => [team.id, { position: 0, extraTurn: 0, extraNow: false, skip: false }])),
  activeTeamIds: TEAMS.map(team => team.id),
  turn: 0,
  pendingTask: null,
  pendingPool: null,
  showAnswer: false,
  modal: null,
  timer: 30,
  timerPreset: 30,
  taskStarted: false,
  roundIndex: 0,
  roundComplete: false,
  missingPhase: 'briefing',
  memoryPhase: 'briefing',
  timerRunning: false,
  timerHandle: null,
  transitionHandle: null,
  justMovedTeam: null,
  awaitingSpecial: null,
  bonusAfterSpecial: null,
  imagePreview: null,
};

const app = document.querySelector('#app');
const team = id => TEAMS.find(t => t.id === id);
const activeTeams = () => TEAMS.filter(t => state.activeTeamIds.includes(t.id));
const currentTeam = () => activeTeams()[state.turn];
const category = id => CATEGORIES.find(c => c.id === id);
const stars = n => '★'.repeat(n);
const maxPosition = position => Math.max(0, Math.min(25, position));
const tokenStyle = t => `style="--team-color:${t.color}"`;
const getAllTasks = () => Object.values(taskPools).flatMap(pool => pool.tasks);
const getTask = id => getAllTasks().find(task => task.id === id);
const getAvailableTasks = poolId => taskPools[poolId].tasks.filter(task => task.reusable || !task.used);

function render() {
  app.innerHTML = `<div class="app-shell">
    <section class="game-layout">
      ${renderBoard()}
      <aside class="side-column">${renderTurn()}${renderStatus()}${renderControls()}</aside>
    </section>
  </div>${state.modal ? renderModal() : ''}${state.imagePreview ? renderImagePreview() : ''}`;
}

function renderBoard() {
  return `<section class="panel board-panel"><div class="board">${TRACK_LAYOUT.map(([column, row], position) => {
    const special = SPECIALS[position];
    const occupants = activeTeams().filter(t => state.teams[t.id].position === position);
    return `<div class="board-space ${position === 0 ? 'start' : ''} ${special ? `special special-${special.type}` : ''}" style="--column:${column + 1};--row:${row + 1}">
      <div class="space-number">${position === 0 ? 'START' : position}</div>
      ${special ? `<div class="space-label special-label">${special.label}</div><div class="space-icon">${special.icon}</div>` : position ? '' : '<div class="space-label">準備出發</div>'}
      <div class="tokens">${occupants.map(t => `<span class="token ${t.id === state.justMovedTeam ? 'token-arrive' : ''}" ${tokenStyle(t)} title="${t.name}"></span>`).join('')}</div>
    </div>`;
  }).join('')}${renderBoardCenter()}</div></section>`;
}

function renderBoardCenter() {
  return `<section class="board-center task-selector">${state.pendingPool ? renderPoolTaskPicker() : renderTaskGrid()}</section>`;
}

function renderTaskGrid() {
  return `<div class="task-buttons">${CATEGORIES.map(c => `<div class="mission-category mission-${c.id}">${[1,2,3,4,5].map(n => { const pool = taskPools[`${c.id}_${n}`]; const exhausted = getAvailableTasks(pool.id).length === 0; return `<button class="task-choice ${exhausted ? 'used' : ''}" ${exhausted ? 'disabled' : ''} onclick="selectTask('${pool.id}')"><span class="task-category">${c.icon} ${c.name}</span><span class="task-stars">${stars(n)}</span>${exhausted ? '<span class="task-used-label">✓ 已挑戰</span>' : ''}</button>`; }).join('')}</div>`).join('')}</div>`;
}

function renderPoolTaskPicker() {
  const pool = taskPools[state.pendingPool];
  const cat = category(pool.category);
  const available = getAvailableTasks(pool.id);
  return `<div class="pool-picker"><div class="pool-picker-head"><button class="close" onclick="backToTaskGrid()">←</button><div><div class="eyebrow">選擇題目</div><h2>${cat.icon} ${cat.name} ${stars(pool.difficulty)}</h2></div></div><div class="individual-task-buttons">${available.map((task, index) => `<button class="individual-task-button" onclick="chooseTask('${task.id}')"><span>任務 ${index + 1}</span><strong>${task.title === '尚未設定' ? '尚未設定' : task.title}</strong></button>`).join('')}</div></div>`;
}

function renderTurn() {
  const active = currentTeam();
  const effects = state.teams[active.id];
  const effectText = effects.skip ? '下一回合將暫停' : effects.extraNow ? `🎁 還有 ${effects.extraTurn} 次加開任務` : effects.extraTurn ? `🎁 完成本題後可加開 ${effects.extraTurn} 題` : '選擇一項尚未挑戰的任務';
  return `<section class="panel turn-card"><div class="turn-caption">CURRENT TURN</div><div class="turn-team"><span class="team-orb" ${tokenStyle(active)}></span>${active.name}</div><div class="turn-note">${effectText}</div></section>`;
}

function renderStatus() {
  return `<section class="panel status-card"><div class="card-title"><span>隊伍狀態</span><span style="font-size:11px;color:var(--muted)">位置／狀態</span></div><div class="team-list">${activeTeams().map((t, i) => {
    const info = state.teams[t.id];
    const badge = info.skip ? '⏸ 暫停' : (info.extraNow || info.extraTurn) ? `🎁 ${info.extraTurn} 次` : i === state.turn ? '目前回合' : '正常';
    return `<div class="team-row ${i === state.turn ? 'active' : ''}"><span class="row-token" ${tokenStyle(t)}></span><span class="position">${info.position} 格</span><span class="effect-badge ${badge === '正常' ? 'muted' : ''}">${badge}</span></div>`;
  }).join('')}</div></section>`;
}

function renderControls() {
  return `<section class="panel controls-card"><button class="button ghost" onclick="openHost()">主持人控制</button><button class="button ghost end-game" onclick="openFinal()">結束遊戲</button></section>`;
}

function renderModal() {
  const renderers = {
    picker: renderPicker, confirm: renderConfirm, task: renderTask,
    result: renderResult, special: renderSpecial, host: renderHost, final: renderFinal, skip: renderSkip,
  };
  const content = renderers[state.modal]();
  return `<div class="modal-backdrop ${state.modal === 'task' ? 'mission-backdrop' : ''}"><section class="modal ${['confirm','result','special','final','skip'].includes(state.modal) ? 'narrow' : ''} ${state.modal === 'task' ? 'mission-modal' : ''}">${content}</section></div>`;
}

function closeModal() { stopTimer(); clearTransition(); state.modal = null; state.pendingTask = null; state.pendingPool = null; state.showAnswer = false; render(); }
function openImagePreview(src, alt) { state.imagePreview = { src, alt }; render(); }
function closeImagePreview() { state.imagePreview = null; render(); }
function renderImagePreview() { const image = state.imagePreview; return `<div class="image-preview-backdrop" onclick="closeImagePreview()"><button class="image-preview-close" aria-label="關閉全螢幕圖片" onclick="closeImagePreview()">×</button><img src="${image.src}" alt="${image.alt}" onclick="event.stopPropagation()"><div class="image-preview-hint">點擊畫面外側即可關閉</div></div>`; }
function taskImage(src, alt) { return `<img class="zoomable-image" src="${src}" alt="${alt}" onclick="openImagePreview('${src}', '${alt}')">`; }
function renderPicker() {
  return `<div class="modal-header"><div><h2>選擇任務</h2><p>${currentTeam().name}，請選擇一項尚未挑戰的固定任務。</p></div><button class="close" onclick="closeModal()">×</button></div>${renderTaskGrid()}<div class="modal-actions"><button class="button ghost" onclick="closeModal()">取消</button></div>`;
}
function renderConfirm() {
  const task = getTask(state.pendingTask); const cat = category(task.category); const t = currentTeam();
  return `<div class="modal-header"><div><div class="eyebrow">MISSION CONFIRMATION</div><h2>確認選擇</h2></div><button class="close" onclick="state.modal='picker';render()">×</button></div><div class="selected-card"><div class="selected-label">${t.name} 選擇</div><h3>${cat.icon} ${cat.name} ${stars(task.difficulty)}</h3><p>挑戰成功可前進 ${task.difficulty} 格。</p></div><div class="modal-actions"><button class="button ghost" onclick="state.modal='picker';render()">重新選擇</button><button class="button primary" onclick="startTask()">開始挑戰</button></div>`;
}
function renderTask() {
  const task = getTask(state.pendingTask); const cat = category(task.category);
  const hasContent = typeof task.content === 'object';
  const isTimerOnly = task.content?.kind === 'timerOnly';
  const isGestureRounds = task.content?.kind === 'gestureSingle';
  const isSongRelay = task.content?.kind === 'songRelay';
  const taskBody = hasContent ? (isTimerOnly ? renderTimerOnly(task.content) : isGestureRounds ? renderGestureRounds(task.content) : isSongRelay ? renderSongRelay(task.content) : task.content.kind === 'quiz' ? renderQuizContent(task.content, state.showAnswer) : task.content.kind === 'sequence' ? renderSequenceContent(task.content, state.showAnswer) : task.content.kind === 'colorTrap' ? renderColorTrap(task.content) : task.content.kind === 'languageTwister' ? renderLanguageTwister(task.content) : task.content.kind === 'iconRiddle' ? renderIconRiddle(task.content, state.showAnswer) : task.content.kind === 'findItems' ? renderFindItems(task.content) : task.content.kind === 'findDifference' ? renderFindDifference(task.content) : task.content.kind === 'hiddenNeeds' ? renderHiddenNeeds(task.content) : task.content.kind === 'memoryQuestions' ? renderMemoryQuestions(task.content, state.showAnswer) : task.content.kind === 'missingPerson' ? renderMissingPerson(task.content, state.showAnswer) : task.content.kind === 'spotImage' ? renderSpotImage(task.content, task.answer, state.showAnswer) : (state.showAnswer ? renderTaskAnswer(task.answer) : renderTaskContent(task.content))) : '<div class="placeholder">任務內容<br><strong>COMING SOON ／ 尚未設定</strong></div>';
  const isReactionBriefing = ['timerOnly', 'gestureSingle', 'colorTrap', 'languageTwister', 'iconRiddle', 'findItems', 'findDifference', 'hiddenNeeds'].includes(task.content?.kind) && !state.taskStarted;
  const isMissingPerson = task.content?.kind === 'missingPerson';
  const isMissingBriefing = isMissingPerson && !state.taskStarted;
  const isMissingObserve = isMissingPerson && state.missingPhase === 'observe';
  const isMemoryTask = task.content?.kind === 'memoryQuestions';
  const isMemoryBriefing = isMemoryTask && !state.taskStarted;
  const isMemoryObserve = isMemoryTask && state.memoryPhase === 'observe';
  const timerSelect = `<select onchange="setTimerPreset(this.value)"><option value="10" ${state.timerPreset === 10 ? 'selected' : ''}>10 秒</option><option value="15" ${state.timerPreset === 15 ? 'selected' : ''}>15 秒</option><option value="20" ${state.timerPreset === 20 ? 'selected' : ''}>20 秒</option><option value="30" ${state.timerPreset === 30 ? 'selected' : ''}>30 秒</option><option value="60" ${state.timerPreset === 60 ? 'selected' : ''}>60 秒</option><option value="120" ${state.timerPreset === 120 ? 'selected' : ''}>120 秒</option></select>`;
  const timerControls = isTimerOnly || isGestureRounds || isSongRelay ? '' : isMissingPerson || isMemoryTask
    ? `<div class="mission-timer missing-timer"><div class="timer">${formatTimer(state.timer)}</div><div class="timer-phase">${isMissingBriefing || isMemoryBriefing ? '規則講解中' : isMissingObserve || isMemoryObserve ? '觀察中…' : isMissingPerson ? '請作答' : '回答問題'}</div></div>`
    : `<div class="mission-timer"><div class="timer">${formatTimer(state.timer)}</div><div class="timer-controls">${timerSelect}${isReactionBriefing ? '<span class="timer-briefing">規則講解中</span>' : `<button class="button secondary" onclick="toggleTimer()">${state.timerRunning ? '暫停' : '開始'}</button><button class="button ghost" onclick="resetTimer()">重設</button>`}</div></div>`;
  const scene = task.scene ? renderMissionScene(task.scene) : `<div class="task-icon">${cat.icon}</div>`;
  const taskActions = isReactionBriefing || isMissingBriefing || isMissingObserve || isMemoryBriefing || isMemoryObserve ? '' : `<div class="modal-actions">${hasContent && task.answer ? `<button class="button dark" onclick="toggleAnswer()">${state.showAnswer ? '返回題目' : '公布答案'}</button>` : ''}<button class="button ghost" onclick="failTask()">❌ 挑戰失敗</button><button class="button primary" onclick="succeedTask()">✅ 挑戰成功</button></div>`;
  return `<div class="task-screen ${hasContent ? 'task-screen-rich' : ''} ${task.scene ? `task-theme-${task.scene}` : ''}"><div class="task-head"><div class="task-heading">${scene}<div><h2>${task.title === '尚未設定' ? cat.name : task.title}</h2><div class="task-meta">${cat.name}・${stars(task.difficulty)}</div></div></div>${state.showAnswer ? '' : timerControls}</div>${taskBody}${taskActions}</div>`;
}

function renderMissionScene(scene) {
  if (scene === 'door') return '<div class="mission-scene door-scene" aria-hidden="true"><i class="door-panel left"></i><i class="door-panel right"></i><b class="door-lock">🔒</b></div>';
  if (scene === 'path') return '<div class="mission-scene path-scene" aria-hidden="true"><i></i><i></i><i></i><i></i></div>';
  if (scene === 'color') return '<div class="mission-scene color-scene" aria-hidden="true"><i></i><i></i><i></i><i></i></div>';
  if (scene === 'language') return '<div class="mission-scene language-scene" aria-hidden="true"><b>文</b><i>Ａ</i><em>あ</em></div>';
  if (scene === 'music') return '<div class="mission-scene music-scene" aria-hidden="true"><b>♪</b><i>♫</i><i>✦</i><em>♫</em></div>';
  if (scene === 'camera') return '<div class="mission-scene camera-scene" aria-hidden="true"><b>⌑</b><i>●</i><em>✦</em></div>';
  if (scene === 'detective') return '<div class="mission-scene detective-scene" aria-hidden="true"><b>⌕</b><i></i><i></i><i></i></div>';
  if (scene === 'iconSearch') return '<div class="mission-scene icon-search-scene" aria-hidden="true"><b>⌕</b><i>?</i><em>✦</em></div>';
  if (scene === 'findItems') return '<div class="mission-scene find-items-scene" aria-hidden="true"><b>⌕</b><i>✦</i><i>✦</i><em>✓</em></div>';
  if (scene === 'whisper') return '<div class="mission-scene whisper-scene" aria-hidden="true"><b>✦</b><i>⌁</i><i>⌁</i><em>→</em></div>';
  if (scene === 'gesture') return '<div class="mission-scene gesture-scene" aria-hidden="true"><b>✋</b><i>✦</i><i>✦</i><em>↗</em></div>';
  if (scene === 'care') return '<div class="mission-scene care-scene" aria-hidden="true"><b>♥</b><i>✦</i><i>✦</i><em>↗</em></div>';
  if (scene === 'missingPerson') return '<div class="mission-scene missing-person-scene" aria-hidden="true"><i></i><i></i><i></i><i></i><b>?</b></div>';
  if (scene === 'memory') return '<div class="mission-scene memory-scene" aria-hidden="true"><i></i><i></i><i></i><b>👁</b></div>';
  return '<div class="mission-scene lock-scene" aria-hidden="true"><b>🔐</b><i></i><i></i><i></i><i></i></div>';
}

function renderTaskContent(content) {
  return `<div class="task-content"><p class="task-intro">${content.intro}</p><div class="reference-list">${content.references.map(reference => `<span>📖 ${reference}</span>`).join('')}</div><div class="info-card-grid">${content.cards.map(([label, text]) => `<article class="info-card"><b>${label}</b><p>${text}</p></article>`).join('')}</div></div>`;
}

function renderQuizContent(content, reveal = false) {
  const missionIntro = reveal ? '' : `<p class="task-intro">${content.intro}</p><div class="reference-list">${content.references.map(reference => `<span>📖 ${reference}</span>`).join('')}</div>`;
  return `<div class="task-content">${missionIntro}${reveal ? `<div class="quiz-answer-banner">✅ 正確選項已標示 <strong>通行碼：${content.answerCode}</strong></div>` : ''}<div class="quiz-card-grid ${content.questions.length === 4 ? 'four' : ''}">${content.questions.map(question => `<article class="quiz-card"><div class="quiz-label">${question.label}</div><p class="quiz-question">${question.prompt}</p><div class="quiz-options">${question.options.map((option, index) => `<span class="quiz-option ${reveal && index === question.correctIndex ? 'correct' : ''}"><b>${index + 1}</b><span>${option}</span>${reveal && index === question.correctIndex ? '<em>✓</em>' : ''}</span>`).join('')}</div></article>`).join('')}</div></div>`;
}

function renderSequenceContent(content, reveal = false) {
  const intro = reveal ? '' : `<p class="task-intro">${content.intro}</p><div class="reference-list">${content.references.map(reference => `<span>📖 ${reference}</span>`).join('')}</div>`;
  const orderedPieces = content.correctOrder.map(index => ({ label: String.fromCharCode(65 + index), text: content.pieces[index] }));
  const cards = reveal
    ? `<div class="sequence-answer-title">✅ 答案：${orderedPieces.map(piece => piece.label).join(' → ')}</div><div class="sequence-answer">${orderedPieces.map((piece, index) => `<article class="sequence-step"><b>${piece.label}</b><span>${piece.text}</span>${index < orderedPieces.length - 1 ? '<i>→</i>' : ''}</article>`).join('')}</div>`
    : `<div class="sequence-hint">請將四張線索卡排出經文中的正確順序</div><div class="sequence-cards">${content.pieces.map((piece, index) => `<article class="sequence-card"><b>線索 ${String.fromCharCode(65 + index)}</b><span>${piece}</span></article>`).join('')}</div>`;
  return `<div class="task-content sequence-content">${intro}${cards}</div>`;
}

function renderColorTrap(content) {
  if (!state.taskStarted) return `<div class="color-trap-rules"><div class="rule-icon">🎨</div><h3>規則說明</h3><p>${content.intro}</p><div class="rule-example"><span class="example-word">紅</span><span>應回答：<b>藍</b></span></div><p class="rule-note">共 10 題，請從第 1 題開始依序作答。</p><button class="button primary start-challenge" onclick="beginReactionTask()">開始挑戰</button></div>`;
  return `<div class="task-content color-trap-content"><p class="task-intro">${content.intro}</p><div class="color-trap-grid">${content.words.map(([word, color], index) => `<article class="color-word" style="--word-color:${COLOR_TRAP_COLORS[color].hex}"><small>${index + 1}</small><span>${word}</span></article>`).join('')}</div></div>`;
}

function renderLanguageTwister(content) {
  if (!state.taskStarted) return `<div class="language-rules"><div class="rule-icon">🗣️</div><h3>規則說明</h3><p>${content.intro}</p><div class="language-example"><span>教會</span><b>→</b><span>Church</span></div><p class="rule-note">共 6 個詞語，請依序快速回答。</p><button class="button primary start-challenge" onclick="beginReactionTask()">開始挑戰</button></div>`;
  return `<div class="task-content language-twister-content"><p class="task-intro">${content.intro}</p><div class="language-word-grid">${content.words.map((word, index) => `<article class="language-word"><small>${index + 1}</small><span>${word}</span></article>`).join('')}</div></div>`;
}

function renderIconRiddle(content, reveal = false) {
  if (!state.taskStarted) return `<div class="icon-riddle-rules"><div class="rule-icon">🔎</div><h3>規則說明</h3><p>${content.intro}</p><div class="icon-rule-example"><span>🎤 ＋ 🎵 ＋ 🎸</span><b>猜出一個答案</b></div><p class="rule-note">本題有 3 組圖像，請依序快速作答。</p><button class="button primary start-challenge" onclick="beginReactionTask()">開始挑戰</button></div>`;
  return `<div class="task-content icon-riddle-content"><p class="task-intro">${content.intro}</p>${reveal ? '<div class="icon-answer-banner">✅ 公布答案</div>' : ''}<div class="icon-riddle-grid">${content.riddles.map((riddle, index) => `<article class="icon-riddle-card"><small>線索 ${index + 1}</small><div class="riddle-icons">${riddle.icons.map(icon => `<span>${icon}</span>`).join('<b>＋</b>')}</div>${reveal ? `<div class="riddle-answer">${riddle.answer}</div>` : ''}</article>`).join('')}</div></div>`;
}

function renderFindItems(content) {
  if (!state.taskStarted) return `<div class="find-items-rules"><div class="rule-icon">🧰</div><h3>規則說明</h3><p>${content.intro}</p><div class="find-rule-example">主持人按下「開始挑戰」後，才會公布本題要找的物品。</div><p class="rule-note">找到後請立刻帶回或向主持人展示。</p><button class="button primary start-challenge" onclick="beginReactionTask()">開始挑戰</button></div>`;
  return `<div class="task-content find-items-content"><div class="find-task-card tone-${content.tone}"><div class="find-label">本題目標</div><p>${content.prefix}<strong>${content.focus}</strong>${content.suffix}</p></div></div>`;
}

function renderFindDifference(content) {
  if (!state.taskStarted) return `<div class="find-difference-rules"><div class="rule-icon">🔍</div><h3>規則說明</h3><p>${content.intro}</p><div class="find-rule-example">仔細比較左右兩邊的教會場景，找出至少 3 處不同。</div><button class="button primary start-challenge" onclick="beginReactionTask()">開始挑戰</button></div>`;
  return `<div class="task-content find-difference-content"><div class="difference-label">找出至少 3 處不同</div>${taskImage(content.image, '左右兩張教會場景找不同圖片')}</div>`;
}

function renderTimerOnly(content) {
  if (!state.taskStarted) {
    const example = content.example ? `<div class='draw-rule-example'><b>${content.example.title}</b><ol>${content.example.steps.map(step => `<li>${step}</li>`).join('')}</ol></div>` : '';
    return `<div class='whisper-rules'><div class='rule-icon'>${content.icon || '💬'}</div><h3>活動規則</h3><ol>${content.rules.map(rule => `<li>${rule}</li>`).join('')}</ol>${example}<button class='button primary start-challenge' onclick='beginReactionTask()'>開始計時</button></div>`;
  }
  const timerSelect = `<select onchange="setTimerPreset(this.value)"><option value="10" ${state.timerPreset === 10 ? 'selected' : ''}>10 秒</option><option value="15" ${state.timerPreset === 15 ? 'selected' : ''}>15 秒</option><option value="20" ${state.timerPreset === 20 ? 'selected' : ''}>20 秒</option><option value="30" ${state.timerPreset === 30 ? 'selected' : ''}>30 秒</option><option value="60" ${state.timerPreset === 60 ? 'selected' : ''}>60 秒</option><option value="120" ${state.timerPreset === 120 ? 'selected' : ''}>120 秒</option></select>`;
  return `<div class='timer-only-stage'><div class='timer-only-label'>${content.timerLabel || '開始！'}</div><div class='timer'>${formatTimer(state.timer)}</div><div class='timer-controls'>${timerSelect}<button class='button secondary' onclick='toggleTimer()'>${state.timerRunning ? '暫停' : '開始'}</button><button class='button ghost' onclick='resetTimer()'>重設</button></div></div>`;
}

function renderSongRelay(content) {
  return `<div class='song-relay-stage'><div class='song-selected-label'>本次歌曲</div><div class='song-selected'>♫ ${content.song}</div><p>請由組員輪流接唱，完成後由主持人判定結果。</p></div>`;
}

function renderGestureRounds(content) {
  if (!state.taskStarted) return `<div class='gesture-rules'><div class='rule-icon'>🙌</div><h3>活動規則</h3><p>${content.intro}</p><div class='gesture-rule-note'>限時 10 秒。</div><button class='button primary start-challenge' onclick='beginReactionTask()'>開始挑戰</button></div>`;
  return `<div class='gesture-stage'><div class='gesture-prompt'>${content.prompt}</div><p>全員同時用動作比出第一個想到的答案</p><div class='gesture-timer timer'>${formatTimer(state.timer)}</div><div class='timer-controls'><button class='button secondary' onclick='toggleTimer()'>${state.timerRunning ? '暫停' : '繼續'}</button><button class='button ghost' onclick='resetTimer()'>重設</button></div></div>`;
}

function renderHiddenNeeds(content) {
  if (!state.taskStarted) return `<div class="care-rules"><div class="rule-icon">🤲</div><h3>規則說明</h3><p>${content.intro}</p><div class="find-rule-example">每找到一處，除了指出畫面位置，也要說出一個實際可行的協助方式。</div><p class="rule-note">請找出共 ${content.count} 個需要。</p><button class="button primary start-challenge" onclick="beginReactionTask()">開始找需要</button></div>`;
  return `<div class="task-content hidden-needs-content"><p class="task-intro">${content.intro}</p><div class="hidden-needs-layout"><figure class="hidden-needs-frame">${taskImage(content.image, content.alt)}</figure><section class="needs-checklist"><div class="needs-heading">🤲 找到後，說出你的協助方式</div><div class="needs-card-grid">${Array.from({ length: content.count }, (_, index) => `<article><b>${index + 1}</b><div><strong>需要被協助的地方</strong><span>你會怎麼幫忙？</span></div></article>`).join('')}</div></section></div></div>`;
}

function renderMemoryQuestions(content, reveal = false) {
  if (!state.taskStarted) return `<div class="memory-rules"><div class="rule-icon">👁️</div><h3>規則說明</h3><p>${content.intro}</p><p class="rule-note">請專心記住人物、物品與現場動作。</p><button class="button primary start-challenge" onclick="beginMemoryQuestions()">開始觀察</button></div>`;
  if (state.memoryPhase === 'observe') return `<div class="memory-image-stage"><div class="memory-stage-label">請仔細觀察愛宴現場</div>${taskImage(content.image, '教會愛宴現場')}</div>`;
  if (reveal) return `<div class="memory-answer-layout"><figure>${taskImage(content.image, '教會愛宴現場原圖')}</figure><section class="memory-answer-list"><div>✅ 公布答案</div>${content.questions.map((question, index) => `<article><b>${index + 1}</b><p>${question}</p><strong>${content.answers[index]}</strong></article>`).join('')}</section></div>`;
  return `<div class="memory-question-panel"><div class="memory-question-heading">🧠 根據剛剛的畫面回答問題</div><div class="memory-question-grid">${content.questions.map((question, index) => `<article><b>${index + 1}</b><p>${question}</p></article>`).join('')}</div></div>`;
}

function renderMissingPerson(content, reveal = false) {
  const isNewFriend = content.comparisonType === 'newFriend';
  const missingCount = content.missingCount || 1;
  if (!state.taskStarted) return `<div class="missing-person-rules"><div class="rule-icon">👥</div><h3>規則說明</h3><p>${content.intro}</p><p class="rule-note">第一張圖片結束後會自動切換，請找出新加入的那一位。</p><button class="button primary start-challenge" onclick="beginMissingPerson()">開始記憶</button></div>`;
  if (reveal) return `<div class="missing-comparison"><figure><figcaption>切換前</figcaption>${taskImage(content.beforeImage, '切換前的九宮格人物')}</figure><figure><figcaption>切換後</figcaption>${taskImage(content.afterImage, '切換後的九宮格人物')}</figure></div>`;
  const observing = state.missingPhase === 'observe';
  const stageLabel = observing ? '請記住每一位人物' : isNewFriend ? '找出新加入的那一位！' : `找出消失的 ${missingCount} 位肢體！`;
  const imageAlt = observing ? '請記住九宮格人物' : isNewFriend ? '請找出新加入的人' : `請找出不見的 ${missingCount} 位肢體`;
  return `<div class="missing-image-stage"><div class="missing-stage-label">${stageLabel}</div>${taskImage(observing ? content.beforeImage : content.afterImage, imageAlt)}</div>`;
}

function renderSpotImage(content, answer, reveal = false) {
  return `<div class="task-content spot-image-content ${reveal ? 'revealed' : ''}"><p class="task-intro">${content.intro}</p><div class="spot-image-layout"><figure class="spot-image-frame">${taskImage(content.image, content.alt)}</figure>${reveal ? `<section class="spot-answer-panel"><div>✅ 不合理處</div><ol>${answer.map(item => `<li>${item}</li>`).join('')}</ol></section>` : ''}</div></div>`;
}

function renderTaskAnswer(answer = []) {
  return `<section class="answer-panel"><div class="answer-heading">✅ 公布答案：被竄改的情報卡</div><div class="answer-diff-grid">${answer.map(item => `<article class="answer-diff-card"><div class="answer-card-title">情報卡 ${item.card}<span>${item.note}</span></div><div class="diff-line"><b>情報卡</b><p>${item.shown}</p></div><div class="diff-line actual"><b>經文實際</b><p>${item.actual}</p></div></article>`).join('')}</div></section>`;
}
function failureSteps(difficulty) { return Math.max(0, difficulty - 2); }
function renderResult() {
  const outcome = state.resultOutcome; const task = getTask(state.pendingTask); const success = outcome === 'success'; const back = failureSteps(task.difficulty);
  const message = success ? `${currentTeam().name} 前進 ${task.difficulty} 格` : back ? `${currentTeam().name} 後退 ${back} 格` : `${currentTeam().name} 停留原地`;
  return `<div class='result-icon'>${success ? '🎉' : '💭'}</div><div class='result-title'>${success ? '挑戰成功！' : '挑戰失敗'}</div><p class='result-copy'>${message}</p><div class='modal-actions'><button class='button ${success ? 'primary' : 'dark'}' onclick='continueAfterResult()'>確認</button></div>`;
}
function renderSpecial() { const sp = state.awaitingSpecial; return `<div class="result-icon">${sp.icon}</div><div class="result-title">特殊格：${sp.label}</div><div class="special-card"><h3>${currentTeam().name}</h3><p>${sp.description}</p></div><div class="modal-actions"><button class="button primary" onclick="applySpecial()">確認套用</button></div>`; }
function renderSkip() { const t = currentTeam(); return `<div class="result-icon">⏸</div><div class="result-title">${t.name}<br>本回合暫停</div><p class="result-copy">此隊的暫停效果已清除，請繼續下一隊。</p><div class="modal-actions"><button class="button primary" onclick="advanceTurn(true)">繼續</button></div>`; }
function renderFinal() { const sorted = [...activeTeams()].sort((a,b) => state.teams[b.id].position - state.teams[a.id].position); let prev = null; let rank = 0; const medals = ['🥇','🥈','🥉']; return `<div class="result-icon">🏆</div><div class="result-title">遊戲結果</div><p class="result-copy">依棋盤位置排名；同格隊伍並列。</p><div class="ranking">${sorted.map((t,index) => { const pos = state.teams[t.id].position; if (pos !== prev) rank = index + 1; prev = pos; return `<div class="ranking-row"><span class="rank-medal">${medals[rank-1] || `${rank}.`}</span><span class="final-token" ${tokenStyle(t)}></span><span>${t.name}</span><strong>${pos} 格</strong></div>`; }).join('')}</div><div class="modal-actions"><button class="button dark" onclick="closeModal()">回到棋盤</button></div>`; }

function renderHost() {
  return `<div class="modal-header"><div><h2>主持人控制</h2><p>臨時調整遊戲狀態，不影響已完成的操作流程。</p></div><button class="close" onclick="closeModal()">×</button></div>
    <div class="host-grid">
      <div class="host-section"><h3>隊伍位置與效果</h3>
        ${activeTeams().map(t => { const info = state.teams[t.id]; return `<div class="field-row"><span class="host-team-dot" ${tokenStyle(t)} title="${t.name}"></span><span class="host-team-name">${t.name}</span><button class="mini-button" onclick="moveTeam('${t.id}',-1)">−1</button><button class="mini-button" onclick="moveTeam('${t.id}',1)">+1</button><button class="mini-button host-effect ${info.extraTurn || info.extraNow ? 'active' : ''}" title="該隊完成下一題後，會立刻再多挑戰一題" onclick="toggleEffect('${t.id}','extraTurn')">🎁 加開一題</button><button class="mini-button host-effect ${info.skip ? 'active' : ''}" title="該隊下一次回合直接跳過" onclick="toggleEffect('${t.id}','skip')">⏸ 跳過下回</button><button class="mini-button remove-team" onclick="removeTeam('${t.id}')">移除</button></div>`; }).join('')}
        <p class="host-effect-help"><strong>🎁 加開一題</strong>：該隊完成下一題後，會立刻再挑戰一題；特殊格可累加次數。<br><strong>⏸ 跳過下回</strong>：該隊下一次輪到時直接略過。<br>再次點擊可移除效果。</p>
      </div>
      <div class="host-section"><h3>目前回合</h3><div class="field-row"><select id="turn-select">${activeTeams().map((t,i) => `<option value="${i}" ${i===state.turn?'selected':''}>${t.name}</option>`).join('')}</select><button class="mini-button" onclick="setCurrentTurn()">套用</button></div><h3 style="margin-top:20px">任務狀態</h3><div class="task-manage">${getAllTasks().map(t => { const c=category(t.category); return `<div class="task-manage-row"><span>${c.icon} ${c.name} ${stars(t.difficulty)}・${t.title}</span><button class="mini-button ${t.used ? 'reset' : ''}" onclick="setTaskUsed('${t.id}',${!t.used})">${t.used ? '重設為未挑戰' : '標為已挑戰'}</button></div>`; }).join('')}</div></div>
    </div>
    <div class="modal-actions"><button class="button dark" onclick="closeModal()">完成</button></div>`;
}

function selectTask(poolId) { const available = getAvailableTasks(poolId); if (available.length) chooseTask(available[0].id); }
function backToTaskGrid() { state.pendingPool = null; render(); }
function chooseTask(id) { state.pendingTask = id; state.pendingPool = null; const info = state.teams[currentTeam().id]; if (info.extraNow) { info.extraTurn = Math.max(0, info.extraTurn - 1); info.extraNow = false; } startTask(); }
function startTask() { clearTransition(); state.showAnswer = false; state.taskStarted = false; state.roundIndex = 0; state.roundComplete = false; state.missingPhase = 'briefing'; state.memoryPhase = 'briefing'; state.timerPreset = getTask(state.pendingTask).timeLimit || 30; state.timer = state.timerPreset; state.modal = 'task'; render(); }
function toggleAnswer() { stopTimer(); state.showAnswer = !state.showAnswer; render(); }
function succeedTask() { const task = getTask(state.pendingTask); stopTimer(); if (!task.reusable) task.used = true; state.teams[currentTeam().id].position = maxPosition(state.teams[currentTeam().id].position + task.difficulty); state.resultOutcome = 'success'; state.modal = 'result'; render(); }
function failTask() { stopTimer(); finalizeFailure(); }
function finalizeFailure() { const task = getTask(state.pendingTask); if (!task.reusable) task.used = true; state.teams[currentTeam().id].position = maxPosition(state.teams[currentTeam().id].position - failureSteps(task.difficulty)); state.resultOutcome = 'fail'; state.modal = 'result'; render(); }
function clearTransition() { if (state.transitionHandle) clearTimeout(state.transitionHandle); state.transitionHandle = null; }
function continueAfterResult() {
  clearTransition();
  const activeId = currentTeam().id;
  if (state.resultOutcome !== 'success') { state.pendingTask = null; resolveExtraOrAdvance(activeId); return; }
  const special = SPECIALS[state.teams[activeId].position];
  state.modal = null;
  state.pendingTask = null;
  state.justMovedTeam = activeId;
  render();
  state.transitionHandle = setTimeout(() => {
    state.justMovedTeam = null;
    if (special) { state.bonusAfterSpecial = state.teams[activeId].extraTurn ? activeId : null; state.awaitingSpecial = special; state.modal = 'special'; render(); return; }
    resolveExtraOrAdvance(activeId);
  }, 900);
}
function resolveExtraOrAdvance(id) { const info = state.teams[id]; if (info.extraTurn > 0) { info.extraNow = true; state.modal = null; render(); toast(`🎁 請立即再選一項任務（剩 ${info.extraTurn} 次）`); return; } advanceTurn(); }
function applySpecial() { const info = state.teams[currentTeam().id]; const sp = state.awaitingSpecial; const queuedBonus = state.bonusAfterSpecial; if (sp.type === 'extraTurn') { info.extraTurn += 1; info.extraNow = true; } if (sp.type === 'skip') info.skip = true; if (sp.type === 'advance') info.position = maxPosition(info.position + sp.value); if (sp.type === 'back') info.position = maxPosition(info.position - sp.value); if (queuedBonus) state.teams[queuedBonus].extraNow = true; state.awaitingSpecial = null; state.bonusAfterSpecial = null; state.pendingTask = null; if (info.extraNow) { state.modal = null; render(); toast(`🎁 請立即再選一項任務（剩 ${info.extraTurn} 次）`); return; } advanceTurn(); }
function nextTurn() { if (state.teams[currentTeam().id].skip) { state.modal='skip'; render(); return; } if (state.teams[currentTeam().id].extraNow) { toast('🎁 請先完成這次加開任務'); return; } advanceTurn(); }
function advanceTurn(fromSkip = false) { if (fromSkip) state.teams[currentTeam().id].skip = false; state.turn = (state.turn + 1) % activeTeams().length; state.modal = null; render(); if (state.teams[currentTeam().id].skip) setTimeout(() => { state.modal='skip'; render(); }, 120); }
function openHost() { state.modal = 'host'; render(); }
function openFinal() { state.modal = 'final'; render(); }
function moveTeam(id, amount) { state.teams[id].position = maxPosition(state.teams[id].position + amount); render(); }
function removeTeam(id) { const teams = activeTeams(); if (teams.length <= 2) { toast('至少保留兩隊才能繼續進行遊戲'); return; } const removedIndex = teams.findIndex(t => t.id === id); state.activeTeamIds = state.activeTeamIds.filter(teamId => teamId !== id); if (removedIndex < state.turn) state.turn -= 1; if (state.turn >= activeTeams().length) state.turn = 0; toast(`${team(id).name}已移除`); render(); }
function toggleEffect(id, effect) { const info = state.teams[id]; if (effect === 'extraTurn') { const enabled = !(info.extraTurn || info.extraNow); info.extraTurn = enabled ? 1 : 0; info.extraNow = false; toast(`${team(id).name}${enabled ? '已設定' : '已取消'}：加開一題（完成下一題後生效）`); render(); return; } info[effect] = !info[effect]; toast(`${team(id).name}${info[effect] ? '已設定' : '已取消'}：跳過下回`); render(); }
function setCurrentTurn() { state.turn = Number(document.querySelector('#turn-select').value); if (state.teams[currentTeam().id].skip) { state.modal = 'skip'; render(); return; } toast('目前回合已更新'); render(); }
function setTaskUsed(id, used) { const task = getTask(id); if (task.reusable) { toast('這是可重複進行的任務，無需設定完成狀態'); render(); return; } task.used = used; render(); }
function setTimerPreset(value) { state.timerPreset = Number(value); state.timer = state.timerPreset; stopTimer(); render(); }
function formatTimer(seconds) { return `${String(Math.floor(seconds / 60)).padStart(2,'0')}:${String(seconds % 60).padStart(2,'0')}`; }
function toggleTimer() { if (state.timerRunning) { stopTimer(); render(); return; } state.timerRunning = true; state.timerHandle = setInterval(() => { state.timer = Math.max(0, state.timer - 1); const display = document.querySelector('.timer'); if (display) display.textContent = formatTimer(state.timer); if (state.timer === 0) { stopTimer(); const task = getTask(state.pendingTask); if (task?.content?.kind === 'gestureRounds') { if (state.roundIndex < task.content.rounds.length - 1) { state.roundIndex += 1; state.timer = task.timeLimit || 10; toast(`第 ${state.roundIndex + 1} 輪開始！`); toggleTimer(); return; } state.roundComplete = true; toast('五輪完成！'); render(); return; } if (task?.content?.kind === 'missingPerson' && state.missingPhase === 'observe') { state.missingPhase = 'guess'; render(); return; } if (task?.content?.kind === 'memoryQuestions' && state.memoryPhase === 'observe') { state.memoryPhase = 'questions'; render(); return; } toast('時間到！'); render(); } }, 1000); render(); }
function beginReactionTask() { state.taskStarted = true; toggleTimer(); }
function beginGestureRounds() { state.taskStarted = true; state.roundIndex = 0; state.roundComplete = false; state.timer = getTask(state.pendingTask).timeLimit || 10; toggleTimer(); }
function restartGestureRound() { stopTimer(); state.timer = getTask(state.pendingTask).timeLimit || 10; toggleTimer(); }
function beginMissingPerson() { state.taskStarted = true; state.missingPhase = 'observe'; state.timer = state.timerPreset; toggleTimer(); }
function beginMemoryQuestions() { state.taskStarted = true; state.memoryPhase = 'observe'; state.timer = state.timerPreset; toggleTimer(); }
function stopTimer() { state.timerRunning = false; if (state.timerHandle) clearInterval(state.timerHandle); state.timerHandle = null; }
function resetTimer() { stopTimer(); state.timer = state.timerPreset; render(); }
function toast(message) { const old = document.querySelector('.toast'); if (old) old.remove(); const el = document.createElement('div'); el.className='toast'; el.textContent=message; document.body.append(el); setTimeout(() => el.remove(), 2200); }
render();
