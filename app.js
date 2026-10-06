/**
 * 오늘 뭐 먹지? (Random Menu Recommendation App)
 * Rich interactive features:
 * - Slot machine spinning animation
 * - Procedural sound effects via Web Audio API
 * - Canvas confetti particle celebration
 * - Category filter tabs
 * - History chip tracking
 * - Clipboard copy & map search
 */

// 1. Menu Dataset (한식, 중식, 일식, 양식, 분식 등 22개 메뉴)
const MENU_DATA = [
  // --- 한식 (Korean) ---
  {
    id: 1,
    name: '김치찌개',
    category: 'korean',
    categoryName: '한식',
    emoji: '🥘',
    tag: '#얼큰칼칼 #든든한한끼',
    desc: '돼지고기 듬뿍 숭덩숭덩 썰어 넣은 얼큰 칼칼한 대한민국 대표 밥도둑!',
    tip: '계란말이나 김과 함께 먹으면 더 완벽해요.'
  },
  {
    id: 2,
    name: '삼겹살',
    category: 'korean',
    categoryName: '한식',
    emoji: '🥓',
    tag: '#지글지글 #기력보충',
    desc: '노릇노릇 바삭하게 구운 삼겹살에 쌈장과 파채의 환상 조합!',
    tip: '된장찌개와 시원한 음료 곁들이기 추천!'
  },
  {
    id: 3,
    name: '비빔밥',
    category: 'korean',
    categoryName: '한식',
    emoji: '🥗',
    tag: '#신선건강 #영양만점',
    desc: '다채로운 오색 나물과 고소한 참기름, 매콤한 고추장의 황금 밸런스!',
    tip: '반숙 계란후라이 노른자를 톡 터뜨려 비벼보세요.'
  },
  {
    id: 4,
    name: '된장찌개',
    category: 'korean',
    categoryName: '한식',
    emoji: '🍲',
    tag: '#구수한맛 #집밥감성',
    desc: '두부와 애호박, 바지락이 듬뿍 들어가 구수하고 속 편안한 찌개!',
    tip: '따끈한 쌀밥에 슥슥 비벼 먹으면 밥 한 공기 뚝딱!'
  },
  {
    id: 5,
    name: '제육볶음',
    category: 'korean',
    categoryName: '한식',
    emoji: '🥩',
    tag: '#매콤달콤 #불맛가득',
    desc: '매콤달콤 양념에 불맛 입혀 볶아낸 직장인·학생 불패의 최애 점심 메뉴!',
    tip: '싱싱한 상추쌈에 마늘 한 점 올려 드셔보세요.'
  },
  {
    id: 6,
    name: '소고기 국밥',
    category: 'korean',
    categoryName: '한식',
    emoji: '🥣',
    tag: '#뜨끈한국물 #속풀이해장',
    desc: '진하고 깊은 국물에 부드러운 소고기와 무가 푹 끓여진 든든한 뚝배기!',
    tip: '아삭한 깍두기 국물을 살짝 넣어 먹는 것도 별미!'
  },

  // --- 중식 (Chinese) ---
  {
    id: 7,
    name: '짜장면',
    category: 'chinese',
    categoryName: '중식',
    emoji: '🥢',
    tag: '#달콤짭조름 #국민면요리',
    desc: '달콤 짭조름한 춘장에 양파와 돼지고기를 달달 볶아낸 매력적인 면요리!',
    tip: '고춧가루 팍팍 뿌려 비벼 먹으면 느끼함 제로!'
  },
  {
    id: 8,
    name: '짬뽕',
    category: 'chinese',
    categoryName: '중식',
    emoji: '🌶️',
    tag: '#얼큰시원 #불맛해물',
    desc: '오징어, 홍합과 신선한 채소가 어우러져 화끈한 불맛을 내는 얼큰 짬뽕!',
    tip: '면을 다 먹고 밥 한 숟갈 말아먹으면 완벽한 마무리!'
  },
  {
    id: 9,
    name: '탕수육',
    category: 'chinese',
    categoryName: '중식',
    emoji: '🥟',
    tag: '#겉바속촉 #새콤달콤',
    desc: '바삭하게 튀겨낸 등심 고기에 새콤달콤한 과일 소스를 곁들인 요리!',
    tip: '부먹 vs 찍먹? 오늘은 취향대로 골라 즐겨보세요.'
  },
  {
    id: 10,
    name: '마라탕',
    category: 'chinese',
    categoryName: '중식',
    emoji: '🥘',
    tag: '#얼얼중독 #스트레스타파',
    desc: '알싸하고 얼얼한 마라향 육수에 내가 좋아하는 재료를 듬뿍 담은 마라탕!',
    tip: '땅콩 소스(즈마장)를 듬뿍 찍어 먹으면 고소함이 2배!'
  },

  // --- 일식 (Japanese) ---
  {
    id: 11,
    name: '초밥 (스시)',
    category: 'japanese',
    categoryName: '일식',
    emoji: '🍣',
    tag: '#신선깔끔 #고급진한끼',
    desc: '신선한 제철 생선과 새콤달콤 초밥의 깔끔하고 담백한 조화!',
    tip: '간장은 밥이 아니라 생선 쪽에 살짝 묻혀야 풍미가 살아요.'
  },
  {
    id: 12,
    name: '돈가스',
    category: 'japanese',
    categoryName: '일식',
    emoji: '🍱',
    tag: '#극강바삭 #육즙팡팡',
    desc: '두툼한 고기를 바삭바삭하게 튀겨내 겉은 바삭 속은 촉촉한 남녀노소 최애 메뉴!',
    tip: '와사비나 돈가스 소스를 듬뿍 찍어 아삭한 양배추 샐러드와 함께 드세요.'
  },
  {
    id: 13,
    name: '라멘',
    category: 'japanese',
    categoryName: '일식',
    emoji: '🍜',
    tag: '#진한국물 #차슈가득',
    desc: '오랜 시간 푹 끓여낸 진한 돈코츠 육수와 쫄깃한 면발, 차슈의 조합!',
    tip: '달콤 짭조름한 반숙 아지타마고(맛달걀) 추가는 필수!'
  },
  {
    id: 14,
    name: '연어덮밥 (사케동)',
    category: 'japanese',
    categoryName: '일식',
    emoji: '🐟',
    tag: '#부드러운식감 #건강미식',
    desc: '도톰하고 부드러운 생연어를 특제 간장 소스와 양파 위에 얹은 덮밥!',
    tip: '연어 위에 생와사비와 무순을 살짝 얹어 밥과 함께 떠먹기!'
  },

  // --- 양식 (Western) ---
  {
    id: 15,
    name: '파스타',
    category: 'western',
    categoryName: '양식',
    emoji: '🍝',
    tag: '#풍미작렬 #분위기맛집',
    desc: '고소한 크림 파스타부터 상큼한 토마토, 향긋한 오일 파스타까지!',
    tip: '마늘 바게트를 소스에 푹 찍어 먹으면 환상적이에요.'
  },
  {
    id: 16,
    name: '햄버거',
    category: 'western',
    categoryName: '양식',
    emoji: '🍔',
    tag: '#육즙가득 #헤비한행복',
    desc: '불향 가득한 두툼한 패티와 신선한 채소, 치즈가 한입 가득 어우러지는 햄버거!',
    tip: '갓 튀긴 바삭한 감자튀김과 시원한 탄산음료와 함께 즐겨보세요.'
  },
  {
    id: 17,
    name: '피자',
    category: 'western',
    categoryName: '양식',
    emoji: '🍕',
    tag: '#치즈쭉쭉 #파티푸드',
    desc: '노릇하게 구워진 도우 위에 고소한 모짜렐라 치즈와 풍성한 토핑의 축제!',
    tip: '핫소스와 파마산 치즈가루를 톡톡 뿌려 드세요.'
  },
  {
    id: 18,
    name: '스테이크',
    category: 'western',
    categoryName: '양식',
    emoji: '🥩',
    tag: '#스페셜데이 #겉바속촉',
    desc: '풍부한 육즙과 부드러운 식감, 그릴 향이 가득한 프리미엄 스테이크!',
    tip: '구운 아스파라거스와 매시드 포테이토를 곁들여보세요.'
  },

  // --- 분식 & 캐주얼 (Snack) ---
  {
    id: 19,
    name: '떡볶이',
    category: 'snack',
    categoryName: '분식',
    emoji: '🍢',
    tag: '#매콤달콤 #영혼의힐링푸드',
    desc: '쫀득쫀득 쌀떡과 밀떡에 매콤달콤한 고추장 소스가 쏙 배어든 분식 1등!',
    tip: '바삭한 모둠튀김을 떡볶이 국물에 푹 찍어 먹는 것은 국룰!'
  },
  {
    id: 20,
    name: '김밥 & 라면',
    category: 'snack',
    categoryName: '분식',
    emoji: '🍙',
    tag: '#영원한짝꿍 #가성비최고',
    desc: '고소한 참기름 바른 김밥 한 줄과 꼬들꼬들 끓여낸 얼큰 라면의 조합!',
    tip: '라면 국물에 김밥을 적셔 먹으면 감칠맛 폭발!'
  },
  {
    id: 21,
    name: '수제 샌드위치 / 샐러드',
    category: 'snack',
    categoryName: '분식',
    emoji: '🥪',
    tag: '#가볍고상쾌 #클린식단',
    desc: '신선한 채소와 닭가슴살, 아보카도가 어우러져 속 편하고 산뜻한 한 끼!',
    tip: '따뜻한 아메리카노나 착즙 주스와 함께 즐겨보세요.'
  },
  {
    id: 22,
    name: '쌀국수',
    category: 'snack',
    categoryName: '분식',
    emoji: '🍜',
    tag: '#시원깔끔 #향긋한육수',
    desc: '깊고 맑게 우려낸 소고기 육수에 아삭한 숙주와 부드러운 쌀면의 조화!',
    tip: '해선장과 칠리소스를 7:3 비율로 섞어 고기를 찍어 드세요.'
  },
  {
    id: 23,
    name: '샤브샤브',
    category: 'korean',
    categoryName: '한식',
    emoji: '🍲',
    tag: '#뜨끈담백 #야채듬뿍 #마무리죽',
    desc: '신선한 야채와 얇게 썬 소고기를 따끈한 육수에 살랑살랑 익혀 먹는 웰빙 요리!',
    tip: '고기와 야채를 다 건져 먹은 뒤 칼국수 사리와 고소한 계란죽은 필수!'
  },

  // --- 괴식 & 벌칙 (Weird / Penalty) ---
  {
    id: 24,
    name: '바퀴벌레 튀김',
    category: 'weird',
    categoryName: '괴식 (벌칙)',
    emoji: '🪳',
    tag: '#바삭바삭(?) #단백질폭탄 #생존전문가',
    desc: '눈을 의심케 하는 충격의 비주얼! 기름에 바삭하게 튀겨낸 미지의 야생 단백질...',
    tip: '지금 당장 젓가락을 내려놓고 전력질주로 도망치세요! 🏃💨'
  },
  {
    id: 25,
    name: '갠지스강 음료',
    category: 'weird',
    categoryName: '괴식 (벌칙)',
    emoji: '🥤',
    tag: '#신성한맛(?) #면역력시험 #생사의기로',
    desc: '온갖 영혼과 미네랄이 농축된 신비의 성수! 한 모금 마시는 순간 장 건강과 영혼이 시험받습니다.',
    tip: '119 구급차를 미리 집 앞에 대기시켜 두는 것을 강력히 권장합니다. 🚑'
  },
  {
    id: 26,
    name: '민트초코 청국장',
    category: 'weird',
    categoryName: '괴식 (벌칙)',
    emoji: '🤢',
    tag: '#혼돈의카오스 #구수싸아 #치약된장',
    desc: '구수한 토종 청국장에 상쾌한 민트초코가 사르르 녹아든 인류 최대의 금기 퓨전 요리!',
    tip: '민초파와 청국장파 모두를 대통합 분노로 이끄는 마법의 메뉴.'
  },
  {
    id: 27,
    name: '두리안 김치찌개',
    category: 'weird',
    categoryName: '괴식 (벌칙)',
    emoji: '🍈',
    tag: '#화학무기 #후각파괴 #천상의지옥',
    desc: '얼큰한 묵은지 국물 속에 과일의 왕 두리안이 푹 익어 독가스급 향기를 뿜어내는 지옥의 뚝배기!',
    tip: '방독면 착용 없이 냄비 뚜껑을 여는 행위는 극도로 위험합니다. ☣️'
  },
  {
    id: 28,
    name: '초코 시럽 멸치 피자',
    category: 'weird',
    categoryName: '괴식 (벌칙)',
    emoji: '🍫',
    tag: '#단짠대재앙 #이탈리아대통곡',
    desc: '바삭한 도우 위에 볶음 멸치와 꾸덕한 다크 초콜릿 시럽을 듬뿍 끼얹은 충격의 피자!',
    tip: '이탈리아인 친구에게 보여주면 바로 절교당할 수 있습니다.'
  },
  {
    id: 29,
    name: '지네 꼬치구이',
    category: 'weird',
    categoryName: '괴식 (벌칙)',
    emoji: '🐛',
    tag: '#다리백개 #오독오독 #공포의야식',
    desc: '수많은 다리가 불에 그을려 오독오독 씹히는 야시장의 공포 스릴러 꼬치!',
    tip: '눈을 감고 씹어도 입안에서 다리 개수가 고스란히 느껴집니다.'
  }
];

// 2. Audio Synthesizer (Web Audio API - No external mp3 files needed)
class SoundFx {
  constructor() {
    this.ctx = null;
    this.enabled = true;
  }

  init() {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || window.webkitAudioContext;
      if (AudioCtx) {
        this.ctx = new AudioCtx();
      }
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playTick() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    try {
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();
      
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(400 + Math.random() * 200, this.ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime(120, this.ctx.currentTime + 0.04);
      
      gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.04);
      
      osc.connect(gain);
      gain.connect(this.ctx.destination);
      
      osc.start();
      osc.stop(this.ctx.currentTime + 0.04);
    } catch (e) {
      // Audio autoplay policy fallback
    }
  }

  playFanfare() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    try {
      const notes = [523.25, 659.25, 783.99, 1046.50]; // C5, E5, G5, C6
      notes.forEach((freq, idx) => {
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();

        const startTime = this.ctx.currentTime + idx * 0.08;
        const duration = 0.35;

        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, startTime);

        gain.gain.setValueAtTime(0.18, startTime);
        gain.gain.exponentialRampToValueAtTime(0.001, startTime + duration);

        osc.connect(gain);
        gain.connect(this.ctx.destination);

        osc.start(startTime);
        osc.stop(startTime + duration);
      });
    } catch (e) {}
  }

  playShock() {
    if (!this.enabled) return;
    this.init();
    if (!this.ctx) return;

    try {
      const osc1 = this.ctx.createOscillator();
      const osc2 = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc1.type = 'sawtooth';
      osc2.type = 'square';

      const startTime = this.ctx.currentTime;
      osc1.frequency.setValueAtTime(260, startTime);
      osc1.frequency.exponentialRampToValueAtTime(55, startTime + 0.55);

      osc2.frequency.setValueAtTime(275, startTime);
      osc2.frequency.exponentialRampToValueAtTime(58, startTime + 0.55);

      gain.gain.setValueAtTime(0.2, startTime);
      gain.gain.exponentialRampToValueAtTime(0.001, startTime + 0.55);

      osc1.connect(gain);
      osc2.connect(gain);
      gain.connect(this.ctx.destination);

      osc1.start(startTime);
      osc2.start(startTime);
      osc1.stop(startTime + 0.55);
      osc2.stop(startTime + 0.55);
    } catch (e) {}
  }
}

// 3. Canvas Confetti System
class ConfettiEngine {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.particles = [];
    this.animating = false;
    this.colors = ['#ff5e36', '#ffaa00', '#2ec4b6', '#e71d36', '#8338ec', '#3a86ff'];
    
    this.resize();
    window.addEventListener('resize', () => this.resize());
  }

  resize() {
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
  }

  fire(count = 70, customColors = null) {
    this.particles = [];
    const centerX = this.canvas.width / 2;
    const centerY = this.canvas.height * 0.45;
    const palette = customColors || this.colors;

    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = 4 + Math.random() * 9;
      this.particles.push({
        x: centerX,
        y: centerY,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed - 3,
        size: 6 + Math.random() * 7,
        color: palette[Math.floor(Math.random() * palette.length)],
        rotation: Math.random() * 360,
        rotationSpeed: (Math.random() - 0.5) * 12,
        alpha: 1,
        gravity: 0.18,
        drag: 0.96
      });
    }

    if (!this.animating) {
      this.animating = true;
      this.render();
    }
  }

  render() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);

    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.vx *= p.drag;
      p.vy *= p.drag;
      p.vy += p.gravity;
      p.x += p.vx;
      p.y += p.vy;
      p.rotation += p.rotationSpeed;
      p.alpha -= 0.012;

      if (p.alpha <= 0 || p.y > this.canvas.height) {
        this.particles.splice(i, 1);
        continue;
      }

      this.ctx.save();
      this.ctx.translate(p.x, p.y);
      this.ctx.rotate((p.rotation * Math.PI) / 180);
      this.ctx.globalAlpha = p.alpha;
      this.ctx.fillStyle = p.color;
      this.ctx.fillRect(-p.size / 2, -p.size / 2, p.size, p.size * 0.7);
      this.ctx.restore();
    }

    if (this.particles.length > 0) {
      requestAnimationFrame(() => this.render());
    } else {
      this.animating = false;
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
  }
}

// 4. Main App Controller
class App {
  constructor() {
    this.currentCategory = 'all';
    this.isShuffling = false;
    this.currentResult = null;
    this.history = [];

    this.sound = new SoundFx();
    this.confetti = new ConfettiEngine(document.getElementById('confetti-canvas'));

    this.cacheElements();
    this.bindEvents();
  }

  cacheElements() {
    this.recommendBtn = document.getElementById('recommend-btn');
    this.categoryPills = document.querySelectorAll('.category-pill');
    
    // Views
    this.idleView = document.getElementById('idle-view');
    this.shufflingView = document.getElementById('shuffling-view');
    this.resultView = document.getElementById('result-view');
    this.slotReel = document.getElementById('slot-reel');

    // Result elements
    this.resultEmoji = document.getElementById('result-emoji');
    this.resultName = document.getElementById('result-name');
    this.resultCategory = document.getElementById('result-category');
    this.resultTag = document.getElementById('result-tag');
    this.resultDesc = document.getElementById('result-desc');
    this.resultTip = document.getElementById('result-tip');

    // Actions & Sound
    this.copyBtn = document.getElementById('copy-result-btn');
    this.mapBtn = document.getElementById('search-map-btn');
    this.soundToggleBtn = document.getElementById('sound-toggle-btn');
    this.soundIcon = document.getElementById('sound-icon');
    
    // History
    this.historyList = document.getElementById('history-list');
    this.clearHistoryBtn = document.getElementById('clear-history-btn');
    
    // Toast
    this.toast = document.getElementById('toast');
    this.toastMessage = document.getElementById('toast-message');
  }

  bindEvents() {
    // Recommend Button
    this.recommendBtn.addEventListener('click', () => this.handleRecommendClick());

    // Category Tabs
    this.categoryPills.forEach(pill => {
      pill.addEventListener('click', (e) => {
        const cat = e.currentTarget.getAttribute('data-category');
        this.selectCategory(cat, e.currentTarget);
      });
    });

    // Sound Toggle
    this.soundToggleBtn.addEventListener('click', () => this.toggleSound());

    // Copy Result Button
    this.copyBtn.addEventListener('click', () => this.copyResultToClipboard());

    // Map Search Button
    this.mapBtn.addEventListener('click', () => this.searchNearbyRestaurants());

    // Clear History Button
    this.clearHistoryBtn.addEventListener('click', () => this.clearHistory());

    // Keyboard Space shortcut
    window.addEventListener('keydown', (e) => {
      if (e.code === 'Space' && e.target === document.body && !this.isShuffling) {
        e.preventDefault();
        this.handleRecommendClick();
      }
    });
  }

  selectCategory(category, activePill) {
    this.currentCategory = category;
    this.categoryPills.forEach(p => p.classList.remove('active'));
    activePill.classList.add('active');
  }

  getFilteredMenus() {
    if (this.currentCategory === 'all') {
      return MENU_DATA;
    }
    return MENU_DATA.filter(m => m.category === this.currentCategory);
  }

  handleRecommendClick() {
    if (this.isShuffling) return;
    this.sound.init();

    const pool = this.getFilteredMenus();
    if (pool.length === 0) return;

    this.isShuffling = true;
    this.recommendBtn.disabled = true;

    // Pick random item (avoid picking the same consecutive if pool > 1)
    let chosen;
    if (pool.length > 1 && this.currentResult) {
      const candidates = pool.filter(m => m.id !== this.currentResult.id);
      chosen = candidates[Math.floor(Math.random() * candidates.length)];
    } else {
      chosen = pool[Math.floor(Math.random() * pool.length)];
    }

    // Switch view to slot shuffling
    this.idleView.classList.add('hidden');
    this.resultView.classList.add('hidden');
    this.shufflingView.classList.remove('hidden');

    this.startShufflingAnimation(pool, chosen);
  }

  startShufflingAnimation(pool, targetMenu) {
    const totalSteps = 16;
    let currentStep = 0;
    let delay = 60; // initial rapid speed in ms

    const runShuffleStep = () => {
      // Pick random preview
      const preview = pool[Math.floor(Math.random() * pool.length)];
      this.slotReel.innerHTML = `
        <div class="slot-item">
          <span class="slot-item-emoji">${preview.emoji}</span>
          <span class="slot-item-name">${preview.name}</span>
        </div>
      `;

      this.sound.playTick();
      currentStep++;

      if (currentStep < totalSteps) {
        // Slow down toward end
        if (currentStep > totalSteps - 6) {
          delay += 35;
        }
        setTimeout(runShuffleStep, delay);
      } else {
        // Shuffling complete -> show target result
        this.finishShuffling(targetMenu);
      }
    };

    runShuffleStep();
  }

  finishShuffling(menu) {
    this.currentResult = menu;
    this.isShuffling = false;
    this.recommendBtn.disabled = false;

    // Switch view
    this.shufflingView.classList.add('hidden');
    this.resultView.classList.remove('hidden');

    // Populate data
    this.resultEmoji.textContent = menu.emoji;
    this.resultName.textContent = menu.name;
    this.resultCategory.textContent = menu.categoryName;
    this.resultTag.textContent = menu.tag;
    this.resultDesc.textContent = menu.desc;
    this.resultTip.textContent = `꿀팁: ${menu.tip}`;

    // Handle weird food vs regular food
    const isWeird = menu.category === 'weird';
    const menuCard = document.getElementById('menu-card');

    if (isWeird) {
      if (menuCard) menuCard.classList.add('weird-mode');
      this.resultCategory.classList.add('weird-badge');
      this.sound.playShock();
      this.confetti.fire(90, ['#7928ca', '#9d4edd', '#00f5d4', '#111111', '#ff0055']);
    } else {
      if (menuCard) menuCard.classList.remove('weird-mode');
      this.resultCategory.classList.remove('weird-badge');
      this.sound.playFanfare();
      this.confetti.fire(80);
    }

    // Add to history
    this.addToHistory(menu);
  }

  addToHistory(menu) {
    // Add to beginning of history, max 8 items
    this.history.unshift(menu);
    if (this.history.length > 8) {
      this.history.pop();
    }
    this.renderHistory();
  }

  renderHistory() {
    if (this.history.length === 0) {
      this.historyList.innerHTML = `<p class="history-empty">아직 추천받은 메뉴가 없어요. 첫 번째 메뉴를 추천받아보세요!</p>`;
      this.clearHistoryBtn.style.display = 'none';
      return;
    }

    this.clearHistoryBtn.style.display = 'inline-block';
    this.historyList.innerHTML = this.history
      .map(
        m => `
        <span class="history-chip" title="${m.categoryName} - ${m.name}">
          <span>${m.emoji}</span>
          <span>${m.name}</span>
        </span>
      `
      )
      .join('');
  }

  clearHistory() {
    this.history = [];
    this.renderHistory();
    this.showToast('히스토리가 초기화되었습니다.');
  }

  copyResultToClipboard() {
    if (!this.currentResult) return;
    const text = `오늘의 메뉴 추천: ${this.currentResult.name} ${this.currentResult.emoji}`;
    
    if (navigator.clipboard && navigator.clipboard.writeText) {
      navigator.clipboard.writeText(text).then(() => {
        this.showToast(`'${this.currentResult.name}' 메뉴가 복사되었습니다!`);
      }).catch(() => {
        this.fallbackCopy(text);
      });
    } else {
      this.fallbackCopy(text);
    }
  }

  fallbackCopy(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
    this.showToast(`'${this.currentResult.name}' 메뉴가 복사되었습니다!`);
  }

  searchNearbyRestaurants() {
    if (!this.currentResult) return;
    const query = encodeURIComponent(`주변 ${this.currentResult.name} 맛집`);
    // Open Naver Map / Search in a new tab
    const url = `https://m.map.naver.com/search2/search.naver?query=${query}`;
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  toggleSound() {
    this.sound.enabled = !this.sound.enabled;
    const label = this.soundToggleBtn.querySelector('.sound-label');
    if (this.sound.enabled) {
      this.soundIcon.textContent = '🔊';
      label.textContent = '효과음 켜짐';
      this.showToast('효과음이 켜졌습니다 🔔');
    } else {
      this.soundIcon.textContent = '🔇';
      label.textContent = '효과음 꺼짐';
      this.showToast('효과음이 꺼졌습니다 🔕');
    }
  }

  showToast(msg) {
    this.toastMessage.textContent = msg;
    this.toast.classList.add('show');
    clearTimeout(this.toastTimeout);
    this.toastTimeout = setTimeout(() => {
      this.toast.classList.remove('show');
    }, 2400);
  }
}

// Initialize on DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {
  window.app = new App();
});
