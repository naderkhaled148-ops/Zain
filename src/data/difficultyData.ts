import { DifficultyLevel, MathItem, QuizQuestion } from '../types';

export interface DifficultyConfig {
  id: DifficultyLevel;
  label: string;
  labelShort: string;
  englishLabel: string;
  icon: string;
  badge: string;
  ageGroup: string;
  summary: string;
  color: string;
  borderClass: string;
  bgClass: string;
  activeBadgeClass: string;
  textClass: string;
  mathDetails: string;
  languageDetails: string;
  gamesDetails: string;
  speechAnnouncement: string;
  rewardMultiplier: number;
}

export const DIFFICULTY_CONFIGS: Record<DifficultyLevel, DifficultyConfig> = {
  easy: {
    id: 'easy',
    label: 'مُسْتَوَى التَّأْسِيس (سَهْل)',
    labelShort: 'سَهْل',
    englishLabel: 'Easy / Beginner',
    icon: '🌱',
    badge: 'سَهْل 🟢',
    ageGroup: '٤ - ٦ سَنَوَات (مُبْتَدِئ)',
    summary: 'مُصَمَّمٌ لِبِدَايَةِ رِحْلَةِ التَّعَلُّمِ بِهُدُوءٍ وَدُونِ أَيِّ ضَغْط، مَعَ أَرْقَامٍ بَسِيطَةٍ وَتَلْمِيحَاتٍ بَصَرِيَّةٍ دَائِمَة.',
    color: 'emerald',
    borderClass: 'border-emerald-300',
    bgClass: 'bg-emerald-50/80',
    activeBadgeClass: 'bg-emerald-600 text-white',
    textClass: 'text-emerald-900',
    mathDetails: 'أَعْدَادٌ مِنْ ١ إِلَى ٥ وَ١٠، مَعَ عَدٍّ بَصَرِيٍّ مُبَاشِرٍ وَعَمَلِيَّاتِ جَمْعٍ وَطَرْحٍ بَسِيطَة جِدًّا.',
    languageDetails: 'خِيَارَانِ أَوْ ثَلَاثَة فَقَط، مَعَ نُطْقٍ صَوْتِيٍّ تَوْجِيهِيٍّ وَتَلْمِيحَاتِ إِيمُوجِي ظَاهِرَة.',
    gamesDetails: 'حَرَكَةٌ هَادِئَةٌ وَأَبْطَأ، مَعَ مُحَاوَلَاتٍ مَفْتُوحَةٍ لِبِنَاءِ الثِّقَةِ فِي النَّفْس.',
    speechAnnouncement: 'تَمَّ اخْتِيَارُ الْمُسْتَوَى السَّهْل، رَائِعٌ جِدًّا لِلْبِدَايَةِ يَا بَطَل!',
    rewardMultiplier: 1.0
  },
  medium: {
    id: 'medium',
    label: 'الْمُسْتَوَى الْقِيَاسِيّ (مُتَوَسِّط)',
    labelShort: 'مُتَوَسِّط',
    englishLabel: 'Medium / Standard',
    icon: '🌟',
    badge: 'مُتَوَسِّط 🟡',
    ageGroup: '٦ سَنَوَات (مَنْهَج الصَّفّ الْأَوَّل)',
    summary: 'الْمُسْتَوَى الرَّسْمِيُّ الْمُعْتَمَدُ لِمَنْهَجِ الصَّفِّ الْأَوَّلِ الِابْتِدَائِيِّ الْمِصْرِيّ، تَحَدٍّ مُتَوَازِنٌ وَمُمْتِع.',
    color: 'amber',
    borderClass: 'border-amber-300',
    bgClass: 'bg-amber-50/80',
    activeBadgeClass: 'bg-amber-500 text-white',
    textClass: 'text-amber-900',
    mathDetails: 'أَعْدَادٌ مِنْ ١ إِلَى ٢٠، جَمْعٌ وَطَرْحٌ، مُقَارَنَةُ الْأَعْدَادِ (> < =)، وَالْأَشْكَالُ الْهَنْدَسِيَّة.',
    languageDetails: 'أَرْبَعَةُ خِيَارَاتٍ قِيَاسِيَّة، كَلِمَاتُ الْحَرَكَاتِ الثَّلَاث، وَتَرْكِيبُ الْكَلِمَاتِ الصَّفِّيَّة.',
    gamesDetails: 'سُرْعَةٌ قِيَاسِيَّةٌ مُتَوَازِنَة، تَحَدٍّ تَعْلِيمِيٌّ مُمَتِّعٌ يُنَمِّي التَّرْكِيز.',
    speechAnnouncement: 'تَمَّ اخْتِيَارُ الْمُسْتَوَى الْمُتَوَسِّط، مُسْتَوَى الصَّفِّ الأَوَّلِ النَّمُوذَجِيّ!',
    rewardMultiplier: 1.0
  },
  hard: {
    id: 'hard',
    label: 'مُسْتَوَى التَّحَدِّي وَالتَّفَوُّق (صَعْب)',
    labelShort: 'صَعْب',
    englishLabel: 'Hard / Advanced',
    icon: '🚀',
    badge: 'صَعْب 🔴',
    ageGroup: '٦ - ٧ سَنَوَات (لِلْمُتَفَوِّقِين)',
    summary: 'لِلْأَبْطَالِ الصِّغَارِ الَّذِينَ يُرِيدُونَ تَحَدِّيَاتٍ ذِهْنِيَّةً مُمَيَّزَةً وَمَسَائِلَ أَعْمَقَ مَعَ نِقَاطِ خِبْرَةٍ مُضَاعَفَة.',
    color: 'rose',
    borderClass: 'border-rose-300',
    bgClass: 'bg-rose-50/80',
    activeBadgeClass: 'bg-rose-600 text-white',
    textClass: 'text-rose-900',
    mathDetails: 'أَعْدَادٌ حَتَّى ٣٠+، جَمْعٌ وَطَرْحٌ ثُنَائِيٌّ، مَسَائِلُ ذَكَاءٍ ذِهْنِيَّة، وَأَنْمَاطٌ حِسَابِيَّة.',
    languageDetails: 'تَمْيِيزٌ دَقِيقٌ بَيْنَ الْحُرُوفِ الْمُتَشَابِهَة (ص/ض، س/ش، ط/ظ)، وَسُكُونٌ وَتَنْوِين.',
    gamesDetails: 'سُرْعَةٌ أَعْلَى، تَحَدٍّ لِسُرْعَةِ الْبَدِيهَة، وَمُكَافَآتُ خِبْرَةٍ (XP) مُضَاعَفَة (x1.5).',
    speechAnnouncement: 'تَمَّ اخْتِيَارُ مُسْتَوَى التَّحَدِّي الصَّعْب، انْطَلِقْ يَا عَبْقَرِيّ!',
    rewardMultiplier: 1.5
  }
};

export const DEFAULT_DIFFICULTY_LEVEL: DifficultyLevel = 'medium';

export function getDifficultyConfig(level?: DifficultyLevel | string): DifficultyConfig {
  if (level && (level === 'easy' || level === 'medium' || level === 'hard')) {
    return DIFFICULTY_CONFIGS[level];
  }
  return DIFFICULTY_CONFIGS[DEFAULT_DIFFICULTY_LEVEL];
}

// Math datasets tailored for each difficulty level
export const EASY_MATH_DATA: MathItem[] = [
  {
    id: 'em1',
    type: 'count',
    title: 'عَدُّ التُّفَّاحَاتِ اللَّذِيذَة',
    question: 'كَمْ تُفَّاحَةً حَمْرَاءَ أَمَامَكَ؟ 🍎',
    itemsEmoji: '🍎',
    itemCount1: 3,
    options: [2, 3, 4],
    correctAnswer: 3,
    visualLabel: 'عَدٌّ بَسِيطٌ (١، ٢، ٣)'
  },
  {
    id: 'em2',
    type: 'count',
    title: 'عَدُّ النُّجُومِ اللَّامِعَة',
    question: 'كَمْ نَجْمَةً تَلْمَعُ فِي السَّمَاءِ؟ ⭐',
    itemsEmoji: '⭐',
    itemCount1: 5,
    options: [4, 5, 6],
    correctAnswer: 5,
    visualLabel: 'عَدٌّ حَتَّى ٥'
  },
  {
    id: 'em3',
    type: 'add',
    title: 'جَمْعُ الْبَالُونَاتِ الْمُلَوَّنَة',
    question: 'مَعَكَ بَالُونَتَانِ 🎈🎈 وَأَعْطَاكَ صَدِيقُكَ بَالُونَةً 🎈.. كَمْ كُلُّ الْبَالُونَات؟',
    itemsEmoji: '🎈',
    itemCount1: 2,
    itemCount2: 1,
    operator: '+',
    options: [2, 3, 4],
    correctAnswer: 3,
    visualLabel: '٢ + ١'
  },
  {
    id: 'em4',
    type: 'subtract',
    title: 'طَرْحُ السَّمَكَات',
    question: 'كَانَتْ هُنَاكَ ٣ سَمَكَات 🐟، سَبَحَتْ وَاحِدَةٌ بَعِيدًا، كَمْ بَقِيَ؟',
    itemsEmoji: '🐟',
    itemCount1: 3,
    itemCount2: 1,
    operator: '-',
    options: [1, 2, 3],
    correctAnswer: 2,
    visualLabel: '٣ - ١'
  },
  {
    id: 'em5',
    type: 'shapes',
    title: 'شَكْلُ الدَّائِرَة',
    question: 'أَيُّ شَكْلٍ هُوَ الدَّائِرَةُ الْمُسْتَدِيرَة؟ 🔴',
    itemsEmoji: '🔴',
    itemCount1: 1,
    shapeTarget: 'دائرة',
    options: ['دَائِرَة', 'مُرَبَّع'],
    correctAnswer: 'دَائِرَة',
    visualLabel: 'شكل مستدير'
  }
];

export const HARD_MATH_DATA: MathItem[] = [
  {
    id: 'hm1',
    type: 'add',
    title: 'جَمْعُ الْأَبْطَالِ الْكِبَار',
    question: 'مَعَ كِيمُو ١٢ نَجْمَةً الذَّهَبِيَّة ⭐ وَحَصَلَ عَلَى ٦ نُجُومٍ أُخْرَى.. كَمْ مَجْمُوعُ النُّجُوم؟',
    itemsEmoji: '⭐',
    itemCount1: 12,
    itemCount2: 6,
    operator: '+',
    options: [16, 17, 18, 19],
    correctAnswer: 18,
    visualLabel: '١٢ + ٦'
  },
  {
    id: 'hm2',
    type: 'subtract',
    title: 'طَرْحُ التَّحَدِّي الذِّهْنِيّ',
    question: 'فِي الصَّنْدُوقِ ١٥ كُرَةً ⚽، أَخَذْنَا مِنْهَا ٧، كَمْ كُرَةً بَقِيَتْ؟',
    itemsEmoji: '⚽',
    itemCount1: 15,
    itemCount2: 7,
    operator: '-',
    options: [7, 8, 9, 6],
    correctAnswer: 8,
    visualLabel: '١٥ - ٧'
  },
  {
    id: 'hm3',
    type: 'compare',
    title: 'مُقَارَنَةُ الْأَعْدَادِ الْكَبِيرَة',
    question: 'مَا الْعَلَامَةُ الصَّحِيحَةُ بَيْنَ (٢٥) وَ (١٨)؟',
    itemsEmoji: '💎',
    itemCount1: 25,
    itemCount2: 18,
    operator: '>',
    options: ['أَكْبَر مِنْ (> )', 'أَصْغَر مِنْ (< )', 'يُسَاوِي (=)'],
    correctAnswer: 'أَكْبَر مِنْ (> )',
    visualLabel: '٢٥ مقابل ١٨'
  },
  {
    id: 'hm4',
    type: 'add',
    title: 'لُغْزُ الْعَشَرَاتِ الذِّهْنِيّ',
    question: 'كَمْ يُسَاوِي: ٢٠ عُصْفُورًا 🐦 + ١٠ عَصَافِيرَ 🐦؟',
    itemsEmoji: '🐦',
    itemCount1: 20,
    itemCount2: 10,
    operator: '+',
    options: [25, 30, 35, 40],
    correctAnswer: 30,
    visualLabel: '٢٠ + ١٠'
  },
  {
    id: 'hm5',
    type: 'shapes',
    title: 'أَضْلَاعُ وَزَوَايَا الْمُسْتَطِيل',
    question: 'مَا هُوَ الشَّكْلُ الرُّبَاعِيُّ الَّذِي فِيهِ كُلُّ ضِلْعَيْنِ مُتَقَابِلَيْنِ مُتَسَاوِيَان؟ 📐',
    itemsEmoji: '🧱',
    itemCount1: 1,
    shapeTarget: 'مستطيل',
    options: ['مُسْتَطِيل', 'مُثَلَّث', 'دَائِرَة', 'خُمَاسِي'],
    correctAnswer: 'مُسْتَطِيل',
    visualLabel: '٤ أضلاع و٤ زوايا قائمة'
  }
];
