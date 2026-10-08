import { QuizQuestion, DifficultyLevel, QuizSubject } from '../types';

/**
 * بنك الأسئلة الشامل لمنهج الصف الأول الابتدائي المصري المطور
 * يشمل: اللغة العربية، الرياضيات والحساب، الذكاء والأنماط
 */
export const COMPREHENSIVE_QUESTION_BANK: QuizQuestion[] = [
  // ==========================================
  // اللغة العربية - أصوات الحروف والحركات (Phonics & Vowels)
  // ==========================================
  {
    id: 'ar_snd_1',
    subject: 'arabic',
    type: 'sound',
    categoryLabel: 'أَصْوَاتُ الْحُرُوف',
    question: 'مَا هُوَ الْحَرْفُ الَّذِي يَبْدَأُ بِهِ صَوْتُ كَلِمَةِ «أَرْنَب»؟ 🐇',
    audioPrompt: 'أَرْنَب',
    options: ['أَ', 'بَ', 'مَ', 'دَ'],
    correctAnswer: 'أَ',
    explanation: 'أَحْسَنْتَ! كَلِمَةُ «أَرْنَب» تَبْدَأُ بِحَرْفِ الأَلِفِ الْمَفْتُوحَة (أَ).',
    emojiHint: '🐇',
    difficulty: 'easy'
  },
  {
    id: 'ar_snd_2',
    subject: 'arabic',
    type: 'sound',
    categoryLabel: 'أَصْوَاتُ الْحُرُوف',
    question: 'أَيُّ صُورَةٍ تَبْدَأُ بِصَوْتِ «بَـ» الْمَفْتُوح؟',
    audioPrompt: 'بَـ',
    options: ['بَقَرَة 🐄', 'أَسَد 🦁', 'دُبّ 🐻', 'فِيل 🐘'],
    correctAnswer: 'بَقَرَة 🐄',
    explanation: 'رَائِع! «بَقَرَة» تَبْدَأُ بِحَرْفِ الْبَاءِ الْمَفْتُوح (بَـ).',
    emojiHint: '🐄',
    difficulty: 'easy'
  },
  {
    id: 'ar_snd_3',
    subject: 'arabic',
    type: 'sound',
    categoryLabel: 'الْحَرَكَاتُ الْقَصِيرَة',
    question: 'مَا هِيَ حَرَكَةُ حَرْفِ الْمِيمِ فِي كَلِمَةِ «مُعَلِّم»؟ 👨‍🏫',
    audioPrompt: 'مُعَلِّم',
    options: ['الضَّمَّة (مُـ)', 'الْفَتْحَة (مَـ)', 'الْكَسْرَة (مِـ)', 'السُّكُون (مْـ)'],
    correctAnswer: 'الضَّمَّة (مُـ)',
    explanation: 'صَحِيح! «مُعَلِّم» تَبْدَأُ بِمِيمٍ مَضْمُومَة (مُـ).',
    emojiHint: '👨‍🏫',
    difficulty: 'medium'
  },
  {
    id: 'ar_snd_4',
    subject: 'arabic',
    type: 'sound',
    categoryLabel: 'الْحَرَكَاتُ الْقَصِيرَة',
    question: 'مَا هِيَ حَرَكَةُ حَرْفِ الرَّاءِ فِي كَلِمَةِ «رِجْل»؟ 🦵',
    audioPrompt: 'رِجْل',
    options: ['الْكَسْرَة (رِ)', 'الْفَتْحَة (رَ)', 'الضَّمَّة (رُ)', 'السُّكُون (رْ)'],
    correctAnswer: 'الْكَسْرَة (رِ)',
    explanation: 'عَفَارِم! «رِجْل» تَبْدَأُ بِرَاءٍ مَكْسُورَة (رِ).',
    emojiHint: '🦵',
    difficulty: 'medium'
  },
  {
    id: 'ar_snd_5',
    subject: 'arabic',
    type: 'sound',
    categoryLabel: 'أَصْوَاتُ الْحُرُوف',
    question: 'مَا الْحَرْفُ الَّذِي يَبْدَأُ بِهِ اسْمُ «فِيل»؟ 🐘',
    audioPrompt: 'فِيل',
    options: ['فِـ', 'قِـ', 'تِـ', 'نِـ'],
    correctAnswer: 'فِـ',
    explanation: 'مُمْتَاز! «فِيل» يَبْدَأُ بِحَرْفِ الْفَاءِ الْمَكْسُورَة (فِـ).',
    emojiHint: '🐘',
    difficulty: 'easy'
  },
  {
    id: 'ar_snd_6',
    subject: 'arabic',
    type: 'sound',
    categoryLabel: 'الْحَرَكَاتُ الْقَصِيرَة',
    question: 'مَا هِيَ الْحَرَكَةُ الصَّحِيحَةُ لِحَرْفِ اللام فِي كَلِمَةِ «لُعْبَة»؟ 🧸',
    audioPrompt: 'لُعْبَة',
    options: ['الضَّمَّة (لُ)', 'الْفَتْحَة (لَ)', 'الْكَسْرَة (لِ)', 'السُّكُون (لْ)'],
    correctAnswer: 'الضَّمَّة (لُ)',
    explanation: 'صَحِيح! «لُعْبَة» تَبْدَأُ بِلَامٍ مَضْمُومَة (لُ).',
    emojiHint: '🧸',
    difficulty: 'medium'
  },
  {
    id: 'ar_snd_7',
    subject: 'arabic',
    type: 'sound',
    categoryLabel: 'الْمُدُود (حَرَكَاتٌ طَوِيلَة)',
    question: 'كَلِمَةُ «بَاب» 🚪 فِيهَا مَدٌّ بِـ...؟',
    audioPrompt: 'بَاب',
    options: ['الْمَدّ بِالأَلِف (ـَا)', 'الْمَدّ بِالْوَاو (ـُو)', 'الْمَدّ بِالْيَاء (ـِي)', 'لا يُوجَد مَدّ'],
    correctAnswer: 'الْمَدّ بِالأَلِف (ـَا)',
    explanation: 'بَطَل! كَلِمَةُ «بَاب» فِيهَا مَدٌّ بِالأَلِف (بَــا).',
    emojiHint: '🚪',
    difficulty: 'medium'
  },
  {
    id: 'ar_snd_8',
    subject: 'arabic',
    type: 'sound',
    categoryLabel: 'الْمُدُود (حَرَكَاتٌ طَوِيلَة)',
    question: 'كَلِمَةُ «تُوت» 🫐 فِيهَا مَدٌّ بِـ...؟',
    audioPrompt: 'تُوت',
    options: ['الْمَدّ بِالْوَاو (ـُو)', 'الْمَدّ بِالأَلِف (ـَا)', 'الْمَدّ بِالْيَاء (ـِي)', 'فَتْحَة قَصِيرَة'],
    correctAnswer: 'الْمَدّ بِالْوَاو (ـُو)',
    explanation: 'أَحْسَنْتَ! «تُوت» فِيهَا صَوْتُ مَدٍّ بِالْوَاو (تُــو).',
    emojiHint: '🫐',
    difficulty: 'medium'
  },
  {
    id: 'ar_snd_9',
    subject: 'arabic',
    type: 'sound',
    categoryLabel: 'الْمُدُود (حَرَكَاتٌ طَوِيلَة)',
    question: 'أَيُّ كَلِمَةٍ مِمَّا يَلِي تَحْتَوِي عَلَى «مَدٍّ بِالْيَاء»؟',
    audioPrompt: 'سَرِير',
    options: ['سَرِير 🛏️', 'قَلَم ✏️', 'أَسَد 🦁', 'وَلَد 👦'],
    correctAnswer: 'سَرِير 🛏️',
    explanation: 'عَبْقَرِيّ! كَلِمَةُ «سَرِير» فِيهَا مَدٌّ طَوِيلٌ بِالْيَاء (رِي).',
    emojiHint: '🛏️',
    difficulty: 'hard'
  },
  {
    id: 'ar_snd_10',
    subject: 'arabic',
    type: 'sound',
    categoryLabel: 'السُّكُون',
    question: 'فِي كَلِمَةِ «شَمْس» ☀️ الْحَرْفُ السَّاكِنُ هُوَ:',
    audioPrompt: 'شَمْس',
    options: ['حَرْفُ الْمِيم (مْ)', 'حَرْفُ الشِّين (شَ)', 'حَرْفُ السِّين (سُ)', 'لا يُوجَد سَاكِن'],
    correctAnswer: 'حَرْفُ الْمِيم (مْ)',
    explanation: 'مُمْتَاز! شَمْـس، نَقِفُ عَلَى الْمِيمِ بِالسُّكُون (مْ).',
    emojiHint: '☀️',
    difficulty: 'hard'
  },

  // ==========================================
  // اللغة العربية - إكمال الحرف الناقص ودمج الحروف (Spelling & Word Building)
  // ==========================================
  {
    id: 'ar_msg_1',
    subject: 'arabic',
    type: 'missing-letter',
    categoryLabel: 'إِكْمَالُ الْحُرُوف',
    question: 'مَا الْحَرْفُ النَّاقِصُ لِتَكْوِينِ كَلِمَةِ «أُ...ـرَتِي»؟ 👨‍👩‍👧‍👦',
    options: ['س', 'ب', 'ن', 'ل'],
    correctAnswer: 'س',
    explanation: 'عَبْقَرِيّ! كَلِمَةُ «أُسْرَتِي» تَحْتَاجُ حَرْفَ السِّين (س).',
    emojiHint: '👨‍👩‍👧‍👦',
    difficulty: 'easy'
  },
  {
    id: 'ar_msg_2',
    subject: 'arabic',
    type: 'missing-letter',
    categoryLabel: 'دَمْجُ الْحُرُوف',
    question: 'ادْمِجِ الْحُرُوفَ التَّالِيَة: (نَ + مْ + ل) = ؟ 🐜',
    options: ['نَمْل', 'لَبَن', 'نَخْل', 'نَمِر'],
    correctAnswer: 'نَمْل',
    explanation: 'مُمْتَاز جِدًّا! نَ + مْ + ل تُعْطِينَا كَلِمَةَ «نَمْل».',
    emojiHint: '🐜',
    difficulty: 'easy'
  },
  {
    id: 'ar_msg_3',
    subject: 'arabic',
    type: 'missing-letter',
    categoryLabel: 'دَمْجُ الْحُرُوف',
    question: 'ادْمِجِ الْحُرُوفَ التَّالِيَة: (لَ + بَ + ن) = ؟ 🥛',
    options: ['لَبَن', 'بَلَح', 'حَبْل', 'لَحْم'],
    correctAnswer: 'لَبَن',
    explanation: 'رَائِع! لَـ + بَـ + ن = «لَبَن» صِحِّيّ وَلَذِيذ.',
    emojiHint: '🥛',
    difficulty: 'easy'
  },
  {
    id: 'ar_msg_4',
    subject: 'arabic',
    type: 'missing-letter',
    categoryLabel: 'إِكْمَالُ الْحُرُوف',
    question: 'مَا الْحَرْفُ النَّاقِصُ فِي: «كِـ...ـاب» لِيُصْبِحَ اسْمَ كِتَاب؟ 📖',
    options: ['ت', 'ب', 'م', 'س'],
    correctAnswer: 'ت',
    explanation: 'أَحْسَنْتَ! كِـ + تـ + اب = «كِتَاب» نَقْرَأُ فِيهِ.',
    emojiHint: '📖',
    difficulty: 'easy'
  },
  {
    id: 'ar_msg_5',
    subject: 'arabic',
    type: 'missing-letter',
    categoryLabel: 'دَمْجُ الْحُرُوف',
    question: 'ادْمِجِ الْحُرُوف: (قَ + لَ + م) = ؟ ✏️',
    options: ['قَلَم', 'قَمَر', 'قِطّ', 'قَفَص'],
    correctAnswer: 'قَلَم',
    explanation: 'بَطَل! قَـ + لَـ + م = «قَلَم» نَكْتُبُ بِهِ.',
    emojiHint: '✏️',
    difficulty: 'easy'
  },
  {
    id: 'ar_msg_6',
    subject: 'arabic',
    type: 'missing-letter',
    categoryLabel: 'إِكْمَالُ الْحُرُوف',
    question: 'أَكْمِلِ الْكَلِمَة: «شَـ...ـرَة» تَنْمُو فِي الْحَدِيقَةِ 🌳',
    options: ['ج', 'خ', 'ح', 'ف'],
    correctAnswer: 'ج',
    explanation: 'مُمْتَاز! شَـ + جَـ + رَة = «شَجَرَة».',
    emojiHint: '🌳',
    difficulty: 'medium'
  },

  // ==========================================
  // اللغة العربية - القواعد والأساليب (Grammar & Sight Words)
  // ==========================================
  {
    id: 'ar_grm_1',
    subject: 'arabic',
    type: 'grammar',
    categoryLabel: 'أَسْمَاءُ الإِشَارَة',
    question: 'نَقُولُ: «... وَلَدٌ نَشِيط» 👦',
    options: ['هَذَا', 'هَذِهِ', 'أَنَا', 'هُوَ'],
    correctAnswer: 'هَذَا',
    explanation: 'صَحِيح! «هَذَا» اسْمُ إِشَارَةٍ لِلْمُفْرَدِ الْمُذَكَّر (هَذَا وَلَد).',
    emojiHint: '👦',
    difficulty: 'easy'
  },
  {
    id: 'ar_grm_2',
    subject: 'arabic',
    type: 'grammar',
    categoryLabel: 'أَسْمَاءُ الإِشَارَة',
    question: 'نَقُولُ: «... بِنْتٌ جَمِيلَة» 👧',
    options: ['هَذِهِ', 'هَذَا', 'نَحْنُ', 'هُمْ'],
    correctAnswer: 'هَذِهِ',
    explanation: 'أَحْسَنْتَ! «هَذِهِ» اسْمُ إِشَارَةٍ لِلْمُفْرَدَةِ الْمُؤَنَّثَة (هَذِهِ بِنْت).',
    emojiHint: '👧',
    difficulty: 'easy'
  },
  {
    id: 'ar_grm_3',
    subject: 'arabic',
    type: 'grammar',
    categoryLabel: 'أَسْمَاءُ الإِشَارَة',
    question: 'اخْتَرِ اسْمَ الإِشَارَةِ الْمُنَاسِب: «... قِطَّةٌ صَغِيرَة» 🐱',
    options: ['هَذِهِ', 'هَذَا', 'أَنْتَ', 'هُوَ'],
    correctAnswer: 'هَذِهِ',
    explanation: 'رَائِع! «هَذِهِ قِطَّةٌ صَغِيرَة».',
    emojiHint: '🐱',
    difficulty: 'medium'
  },
  {
    id: 'ar_grm_4',
    subject: 'arabic',
    type: 'grammar',
    categoryLabel: 'ضَمَائِرُ الْمُتَكَلِّم',
    question: 'اخْتَرِ الْكَلِمَةَ الَّتِي نَقُولُهَا عِنْدَمَا نَتَحَدَّثُ عَنْ أَنْفُسِنَا (شَخْص وَاحِد):',
    options: ['أَنَا', 'نَحْنُ', 'هُوَ', 'هِيَ'],
    correctAnswer: 'أَنَا',
    explanation: 'بَطَل! «أَنَا» ضَمِيرُ الْمُتَكَلِّمِ لِلْمُفْرَد (أَنَا أُحِبُّ أُسْرَتِي).',
    emojiHint: '🧒',
    difficulty: 'easy'
  },
  {
    id: 'ar_grm_5',
    subject: 'arabic',
    type: 'grammar',
    categoryLabel: 'ضَمَائِرُ الْمُتَكَلِّم',
    question: 'عِنْدَمَا نَتَحَدَّثُ مَعًا كَمَجْمُوعَةٍ مِنَ الأَصْدِقَاءِ نَقُولُ: «... نَلْعَبُ مَعًا» 👫',
    options: ['نَحْنُ', 'أَنَا', 'هَذَا', 'أَنْتَ'],
    correctAnswer: 'نَحْنُ',
    explanation: 'عَفَارِم! «نَحْنُ» لِلْجَمْع (نَحْنُ نَلْعَبُ مَعًا).',
    emojiHint: '👫',
    difficulty: 'medium'
  },
  {
    id: 'ar_grm_6',
    subject: 'arabic',
    type: 'grammar',
    categoryLabel: 'الْكَلِمَاتُ الشَّائِعَة',
    question: 'عِنْدَمَا يَتَكَلَّمُ أَبِي نَقُولُ: «... أَبِي: أَنَا أُحِبُّكُمْ»',
    options: ['قَالَ', 'قَالَتْ', 'هَذِهِ', 'فِي'],
    correctAnswer: 'قَالَ',
    explanation: 'صَحِيح! «قَالَ» مَعَ الْمُذَكَّر (قَالَ أَبِي).',
    emojiHint: '👨',
    difficulty: 'medium'
  },
  {
    id: 'ar_grm_7',
    subject: 'arabic',
    type: 'grammar',
    categoryLabel: 'الْكَلِمَاتُ الشَّائِعَة',
    question: 'عِنْدَمَا تَتَكَلَّمُ أُمِّي نَقُولُ: «... أُمِّي: حَانَ وَقْتُ النَّوْم»',
    options: ['قَالَتْ', 'قَالَ', 'هَذَا', 'إِلَى'],
    correctAnswer: 'قَالَتْ',
    explanation: 'مُمْتَاز! «قَالَتْ» مَعَ الْمُؤَنَّث (قَالَتْ أُمِّي).',
    emojiHint: '👩',
    difficulty: 'medium'
  },
  {
    id: 'ar_grm_8',
    subject: 'arabic',
    type: 'grammar',
    categoryLabel: 'التَّاءُ الْمَرْبُوطَةُ وَالْمَفْتُوحَة',
    question: 'أَيُّ كَلِمَةٍ مِمَّا يَلِي تَنْتَهِي بِـ «تَاءٍ مَرْبُوطَة» (ـة / ة)؟',
    options: ['وَرْدَة 🌸', 'بِنْت 👧', 'بَيْت 🏠', 'أُخْت 👱‍♀️'],
    correctAnswer: 'وَرْدَة 🌸',
    explanation: 'عَبْقَرِيّ! «وَرْدَة» تَنْتَهِي بِتَاءٍ مَرْبُوطَة (ـة).',
    emojiHint: '🌸',
    difficulty: 'hard'
  },
  {
    id: 'ar_grm_9',
    subject: 'arabic',
    type: 'grammar',
    categoryLabel: 'اللاَّمُ الشَّمْسِيَّةُ وَالْقَمَرِيَّة',
    question: 'كَلِمَةُ «الْقَمَر» 🌙 لَامُهَا لَامٌ...؟',
    options: ['قَمَرِيَّة (تُنْطَق)', 'شَمْسِيَّة (لا تُنْطَق)', 'مَمْدُودَة', 'سَاكِنَة فَقَط'],
    correctAnswer: 'قَمَرِيَّة (تُنْطَق)',
    explanation: 'بَطَل! اللاَّمُ فِي «الْقَمَر» نَنْطِقُهَا وَعَلَيْهَا سُكُون: لَامٌ قَمَرِيَّة.',
    emojiHint: '🌙',
    difficulty: 'hard'
  },

  // ==========================================
  // اللغة العربية - مطابقة الكلمة ومعانيها (Vocabulary & Meaning)
  // ==========================================
  {
    id: 'ar_wrd_1',
    subject: 'arabic',
    type: 'word-match',
    categoryLabel: 'مُطَابَقَةُ الْكَلِمَات',
    question: 'اخْتَرِ الْكَلِمَةَ الَّتِي تَدُلُّ عَلَى الصُّورَة: 🍯',
    options: ['عَسَل', 'لَحْم', 'جُبْن', 'بَلَح'],
    correctAnswer: 'عَسَل',
    explanation: 'مُمْتَاز! عَسَل النَّحْلِ لَذِيذٌ وَمُفِيد.',
    emojiHint: '🍯',
    difficulty: 'easy'
  },
  {
    id: 'ar_wrd_2',
    subject: 'arabic',
    type: 'word-match',
    categoryLabel: 'مُطَابَقَةُ الْكَلِمَات',
    question: 'اخْتَرِ الْكَلِمَةَ الَّتِي تَدُلُّ عَلَى الصُّورَة: 🦁',
    options: ['أَسَد', 'نَمِر', 'فَهْد', 'ذِئْب'],
    correctAnswer: 'أَسَد',
    explanation: 'صَحِيح! هَذَا أَسَدٌ شُجَاعٌ مَلِكُ الْغَابَة.',
    emojiHint: '🦁',
    difficulty: 'easy'
  },
  {
    id: 'ar_wrd_3',
    subject: 'arabic',
    type: 'word-match',
    categoryLabel: 'مُطَابَقَةُ الْكَلِمَات',
    question: 'اخْتَرِ الْكَلِمَةَ الَّتِي تَدُلُّ عَلَى الصُّورَة: 🌴',
    options: ['نَخْلَة', 'زَهْرَة', 'شَجَرَة', 'عُشْب'],
    correctAnswer: 'نَخْلَة',
    explanation: 'أَحْسَنْتَ! نَخْلَة تُعْطِينَا التَّمَرَ اللَّذِيذ.',
    emojiHint: '🌴',
    difficulty: 'easy'
  },
  {
    id: 'ar_wrd_4',
    subject: 'arabic',
    type: 'word-match',
    categoryLabel: 'مُطَابَقَةُ الْكَلِمَات',
    question: 'اخْتَرِ الْكَلِمَةَ الَّتِي تَدُلُّ عَلَى الصُّورَة: 🚢',
    options: ['سَفِينَة', 'سَيَّارَة', 'طَائِرَة', 'قِطَار'],
    correctAnswer: 'سَفِينَة',
    explanation: 'رَائِع! سَفِينَة تَبْحُرُ فِي الْبَحْرِ الْوَاسِع.',
    emojiHint: '🚢',
    difficulty: 'easy'
  },

  // ==========================================
  // الرياضيات - العد والأعداد (Counting & Numbers)
  // ==========================================
  {
    id: 'ma_cnt_1',
    subject: 'math',
    type: 'math',
    categoryLabel: 'عَدُّ الأَشْيَاء',
    question: 'عُدَّ التُّفَّاحَاتِ اللَّذِيذَة: كَمْ تُفَّاحَةً أَمَامَك؟ 🍎 🍎 🍎 🍎',
    options: ['٤', '٣', '٥', '٢'],
    correctAnswer: '٤',
    explanation: 'أَحْسَنْتَ! يُوجَدُ ٤ تُفَّاحَاتٍ شَهِيَّة.',
    emojiHint: '🍎 🍎 🍎 🍎',
    difficulty: 'easy'
  },
  {
    id: 'ma_cnt_2',
    subject: 'math',
    type: 'math',
    categoryLabel: 'عَدُّ الأَشْيَاء',
    question: 'عُدَّ النُّجُومَ اللَّامِعَة: ⭐ ⭐ ⭐ ⭐ ⭐ ⭐',
    options: ['٦', '٥', '٧', '٨'],
    correctAnswer: '٦',
    explanation: 'مُمْتَاز! لَدَيْنَا ٦ نُجُومٍ بَرَّاقَة.',
    emojiHint: '⭐⭐⭐⭐⭐⭐',
    difficulty: 'easy'
  },
  {
    id: 'ma_cnt_3',
    subject: 'math',
    type: 'math',
    categoryLabel: 'عَدُّ الأَشْيَاء',
    question: 'عُدَّ الْبَالُونَات: 🎈 🎈 🎈',
    options: ['٣', '٢', '٤', '١'],
    correctAnswer: '٣',
    explanation: 'بَطَل! هُنَاكَ ٣ بَالُونَاتٍ جَمِيلَة.',
    emojiHint: '🎈🎈🎈',
    difficulty: 'easy'
  },
  {
    id: 'ma_cnt_4',
    subject: 'math',
    type: 'math',
    categoryLabel: 'تَرْتِيبُ الأَعْدَاد',
    question: 'مَا هُوَ الْعَدَدُ الَّذِي يَأْتِي بَعْدَ الْعَدَدِ ( ٧ ) مُبَاشَرَةً؟',
    options: ['٨', '٦', '٩', '١٠'],
    correctAnswer: '٨',
    explanation: 'صَحِيح! بَعْدَ ٧ يَأْتِي الْعَدَدُ ٨ (٧، ٨).',
    emojiHint: '٧ ➡️ ٨',
    difficulty: 'easy'
  },
  {
    id: 'ma_cnt_5',
    subject: 'math',
    type: 'math',
    categoryLabel: 'تَرْتِيبُ الأَعْدَاد',
    question: 'مَا هُوَ الْعَدَدُ الَّذِي يَأْتِي قَبْلَ الْعَدَدِ ( ٥ ) مُبَاشَرَةً؟',
    options: ['٤', '٦', '٣', '٥'],
    correctAnswer: '٤',
    explanation: 'عَفَارِم! الْعَدَدُ السَّابِقُ لِلْعَدَدِ ٥ هُوَ ٤.',
    emojiHint: '٤ ⬅️ ٥',
    difficulty: 'medium'
  },
  {
    id: 'ma_cnt_6',
    subject: 'math',
    type: 'math',
    categoryLabel: 'تَرْتِيبُ الأَعْدَاد',
    question: 'مَا هُوَ الْعَدَدُ الَّذِي يَقَعُ بَيْنَ ( ٨ ) وَ ( ١٠ )؟',
    options: ['٩', '٧', '١١', '٦'],
    correctAnswer: '٩',
    explanation: 'رَائِع! الْعَدَدُ بَيْنَ ٨ وَ ١٠ هُوَ ٩ (٨، ٩، ١٠).',
    emojiHint: '٨ ، ٩ ، ١٠',
    difficulty: 'medium'
  },

  // ==========================================
  // الرياضيات - الجمع والطرح (Addition & Subtraction)
  // ==========================================
  {
    id: 'ma_op_1',
    subject: 'math',
    type: 'math',
    categoryLabel: 'عَمَلِيَّاتُ الْجَمْع',
    question: 'كَمْ يُسَاوِي: ٣ + ٢ = ؟',
    options: ['٥', '٤', '٦', '٣'],
    correctAnswer: '٥',
    explanation: 'أَحْسَنْتَ يَا بَطَل الْحِسَاب! ٣ + ٢ = ٥.',
    emojiHint: '🖐️',
    difficulty: 'easy'
  },
  {
    id: 'ma_op_2',
    subject: 'math',
    type: 'math',
    categoryLabel: 'عَمَلِيَّاتُ الْجَمْع',
    question: 'كَمْ يُسَاوِي: ٤ + ٤ = ؟ 🍓',
    options: ['٨', '٧', '٩', '٦'],
    correctAnswer: '٨',
    explanation: 'مُمْتَاز! ٤ + ٤ = ٨.',
    emojiHint: '🍓🍓🍓🍓 + 🍓🍓🍓🍓',
    difficulty: 'easy'
  },
  {
    id: 'ma_op_3',
    subject: 'math',
    type: 'math',
    categoryLabel: 'عَمَلِيَّاتُ الْجَمْع',
    question: 'كَمْ يُسَاوِي: ٥ + ٥ = ؟ 🖐️🖐️',
    options: ['١٠', '٩', '١١', '٨'],
    correctAnswer: '١٠',
    explanation: 'عَبْقَرِيّ! ٥ أَصَابِع + ٥ أَصَابِع = ١٠ أَصَابِع.',
    emojiHint: '🖐️ + 🖐️',
    difficulty: 'easy'
  },
  {
    id: 'ma_op_4',
    subject: 'math',
    type: 'math',
    categoryLabel: 'عَمَلِيَّاتُ الطَّرْح',
    question: 'كَمْ يُسَاوِي: ٥ - ٢ = ؟ 🍌',
    options: ['٣', '٢', '٤', '١'],
    correctAnswer: '٣',
    explanation: 'بَطَل! إِذَا كَانَ مَعَنَا ٥ مَوْزَاتٍ وَأَكَلْنَا ٢ يَتَبَقَّى ٣.',
    emojiHint: '🍌🍌🍌',
    difficulty: 'easy'
  },
  {
    id: 'ma_op_5',
    subject: 'math',
    type: 'math',
    categoryLabel: 'عَمَلِيَّاتُ الطَّرْح',
    question: 'كَمْ يُسَاوِي: ٦ - ٣ = ؟ 🍪',
    options: ['٣', '٢', '٤', '٥'],
    correctAnswer: '٣',
    explanation: 'أَحْسَنْتَ! ٦ - ٣ = ٣.',
    emojiHint: '🍪🍪🍪',
    difficulty: 'medium'
  },
  {
    id: 'ma_op_6',
    subject: 'math',
    type: 'math',
    categoryLabel: 'عَمَلِيَّاتُ الْجَمْع',
    question: 'كَمْ يُسَاوِي: ٧ + ٣ = ؟',
    options: ['١٠', '٩', '٨', '١١'],
    correctAnswer: '١٠',
    explanation: 'رَائِع! ٧ + ٣ تُكَوِّنُ الْعَدَدَ ١٠ (مُكَمِّلَاتُ الْعَشَرَة).',
    emojiHint: '🔟',
    difficulty: 'medium'
  },
  {
    id: 'ma_op_7',
    subject: 'math',
    type: 'math',
    categoryLabel: 'عَمَلِيَّاتُ الطَّرْح',
    question: 'كَمْ يُسَاوِي: ١٠ - ٤ = ؟ 🎈',
    options: ['٦', '٥', '٧', '٤'],
    correctAnswer: '٦',
    explanation: 'عَفَارِم! ١٠ - ٤ = ٦.',
    emojiHint: '🎈🎈🎈🎈🎈🎈',
    difficulty: 'medium'
  },
  {
    id: 'ma_op_8',
    subject: 'math',
    type: 'math',
    categoryLabel: 'عَمَلِيَّاتُ الْجَمْع',
    question: 'كَمْ يُسَاوِي: ٨ + ٥ = ؟ (تَحَدِّي الأَبْطَال)',
    options: ['١٣', '١٢', '١٤', '١٥'],
    correctAnswer: '١٣',
    explanation: 'مُمْتَاز جِدًّا! ٨ + ٥ = ١٣.',
    emojiHint: '🌟',
    difficulty: 'hard'
  },
  {
    id: 'ma_op_9',
    subject: 'math',
    type: 'math',
    categoryLabel: 'عَمَلِيَّاتُ الطَّرْح',
    question: 'كَمْ يُسَاوِي: ١٢ - ٥ = ؟',
    options: ['٧', '٦', '٨', '٩'],
    correctAnswer: '٧',
    explanation: 'بَطَل مُتَفَوِّق! ١٢ - ٥ = ٧.',
    emojiHint: '🎯',
    difficulty: 'hard'
  },
  {
    id: 'ma_op_10',
    subject: 'math',
    type: 'math',
    categoryLabel: 'مَسْأَلَةٌ كَلَامِيَّة',
    question: 'مَعَ أَحْمَد ٤ أَقْلَام ✏️ وَأَعْطَاهُ صَدِيقُهُ ٣ أَقْلَام.. كَمْ قَلَمًا مَعَ أَحْمَد الآن؟',
    options: ['٧ أَقْلَام', '٦ أَقْلَام', '٨ أَقْلَام', '٥ أَقْلَام'],
    correctAnswer: '٧ أَقْلَام',
    explanation: 'عَبْقَرِيّ! ٤ + ٣ = ٧ أَقْلَام.',
    emojiHint: '✏️✏️✏️✏️ + ✏️✏️✏️',
    difficulty: 'medium'
  },

  // ==========================================
  // الرياضيات - المقارنة والأشكال (Comparison & Geometry)
  // ==========================================
  {
    id: 'ma_cmp_1',
    subject: 'math',
    type: 'compare',
    categoryLabel: 'مُقَارَنَةُ الأَعْدَاد',
    question: 'قَارِنْ: ٧ ... ٤ (اخْتَرِ الْعَلامَةَ الصَّحِيحَة)',
    options: ['أَكْبَرُ مِنْ ( > )', 'أَصْغَرُ مِنْ ( < )', 'يُسَاوِي ( = )'],
    correctAnswer: 'أَكْبَرُ مِنْ ( > )',
    explanation: 'أَحْسَنْتَ! ٧ أَكْبَرُ مِنْ ٤.',
    emojiHint: '٧ > ٤',
    difficulty: 'easy'
  },
  {
    id: 'ma_cmp_2',
    subject: 'math',
    type: 'compare',
    categoryLabel: 'مُقَارَنَةُ الأَعْدَاد',
    question: 'قَارِنْ: ٣ ... ٨ (اخْتَرِ الْعَلامَةَ الصَّحِيحَة)',
    options: ['أَصْغَرُ مِنْ ( < )', 'أَكْبَرُ مِنْ ( > )', 'يُسَاوِي ( = )'],
    correctAnswer: 'أَصْغَرُ مِنْ ( < )',
    explanation: 'صَحِيح! ٣ أَصْغَرُ مِنْ ٨.',
    emojiHint: '٣ < ٨',
    difficulty: 'easy'
  },
  {
    id: 'ma_cmp_3',
    subject: 'math',
    type: 'compare',
    categoryLabel: 'مُقَارَنَةُ الأَعْدَاد',
    question: 'قَارِنْ: ٦ ... ٦ (اخْتَرِ الْعَلامَةَ الصَّحِيحَة)',
    options: ['يُسَاوِي ( = )', 'أَكْبَرُ مِنْ ( > )', 'أَصْغَرُ مِنْ ( < )'],
    correctAnswer: 'يُسَاوِي ( = )',
    explanation: 'رَائِع! ٦ تُسَاوِي ٦ (كِلا الْعَدَدَيْنِ مُتَمَاثِلَان).',
    emojiHint: '٦ = ٦',
    difficulty: 'easy'
  },
  {
    id: 'ma_shp_1',
    subject: 'math',
    type: 'shape',
    categoryLabel: 'الأَشْكَالُ الْهَنْدَسِيَّة',
    question: 'مَا اسْمُ هَذَا الشَّكْلِ الْهَنْدَسِيّ: ⭕؟',
    options: ['دَائِرَة', 'مُرَبَّع', 'مُثَلَّث', 'مُسْتَطِيل'],
    correctAnswer: 'دَائِرَة',
    explanation: 'مُمْتَاز! الدَّائِرَةُ شَكْلٌ مُسْتَدِيرٌ لَيْسَ لَهُ أَضْلاع.',
    emojiHint: '⭕',
    difficulty: 'easy'
  },
  {
    id: 'ma_shp_2',
    subject: 'math',
    type: 'shape',
    categoryLabel: 'الأَشْكَالُ الْهَنْدَسِيَّة',
    question: 'شَكْلٌ هَنْدَسِيٌّ لَهُ ٣ أَضْلاع وَ ٣ رُؤُوس: 🔺 هُوَ...؟',
    options: ['مُثَلَّث', 'مُرَبَّع', 'دَائِرَة', 'مُسْتَطِيل'],
    correctAnswer: 'مُثَلَّث',
    explanation: 'بَطَل! الْمُثَلَّثُ لَهُ ثَلاثَةُ أَضْلاع.',
    emojiHint: '🔺',
    difficulty: 'easy'
  },
  {
    id: 'ma_shp_3',
    subject: 'math',
    type: 'shape',
    categoryLabel: 'الأَشْكَالُ الْهَنْدَسِيَّة',
    question: 'شَكْلٌ هَنْدَسِيٌّ لَهُ ٤ أَضْلاع مُتَسَاوِيَة تَمَامًا: 🟩 هُوَ...؟',
    options: ['مُرَبَّع', 'مُسْتَطِيل', 'دَائِرَة', 'مُثَلَّث'],
    correctAnswer: 'مُرَبَّع',
    explanation: 'عَفَارِم! الْمُرَبَّعُ أَضْلاعُهُ الأَرْبَعَةُ مُتَسَاوِيَة.',
    emojiHint: '🟩',
    difficulty: 'medium'
  },
  {
    id: 'ma_shp_4',
    subject: 'math',
    type: 'shape',
    categoryLabel: 'الْوَقْتُ وَالأَيَّام',
    question: 'كَمْ يَوْمًا فِي الأُسْبُوع؟ 📅',
    options: ['٧ أَيَّام', '٥ أَيَّام', '٦ أَيَّام', '١٠ أَيَّام'],
    correctAnswer: '٧ أَيَّام',
    explanation: 'صَحِيح! فِي الأُسْبُوعِ سَبْعَةُ أَيَّام: السَّبْت، الأَحَد، الإِثْنَيْن...',
    emojiHint: '📅',
    difficulty: 'easy'
  },

  // ==========================================
  // الذكاء والأنماط والتصنيف (Logic, Patterns & Categories)
  // ==========================================
  {
    id: 'lg_pat_1',
    subject: 'logic',
    type: 'pattern',
    categoryLabel: 'إِكْمَالُ الأَنْمَاط',
    question: 'أَكْمِلِ النَّمَطَ الْعَدَدِيّ: ( ٢ ، ٤ ، ٦ ، ... )',
    options: ['٨', '٧', '٩', '١٠'],
    correctAnswer: '٨',
    explanation: 'عَبْقَرِيّ! كُلَّ مَرَّةٍ نَزِيدُ ٢: ٢، ٤، ٦، ٨.',
    emojiHint: '➕ ٢',
    difficulty: 'medium'
  },
  {
    id: 'lg_pat_2',
    subject: 'logic',
    type: 'pattern',
    categoryLabel: 'إِكْمَالُ الأَنْمَاط',
    question: 'أَكْمِلِ النَّمَطَ الْبَصَرِيّ: 🔴 🔵 🔴 🔵 ... ؟',
    options: ['🔴 (أَحْمَر)', '🔵 (أَزْرَق)', '🟡 (أَصْفَر)', '🟢 (أَخْضَر)'],
    correctAnswer: '🔴 (أَحْمَر)',
    explanation: 'مُمْتَاز! النَّمَطُ يَتَبَادَلُ بَيْنَ الأَحْمَرِ وَالأَزْرَق، فَيَأْتِي دَوْرُ 🔴.',
    emojiHint: '🔴 🔵 🔴 🔵 🔴',
    difficulty: 'easy'
  },
  {
    id: 'lg_pat_3',
    subject: 'logic',
    type: 'pattern',
    categoryLabel: 'إِكْمَالُ الأَنْمَاط',
    question: 'أَكْمِلِ النَّمَطَ التَّنَازُلِيّ: ( ١٠ ، ٩ ، ٨ ، ... )',
    options: ['٧', '٦', '٩', '٨'],
    correctAnswer: '٧',
    explanation: 'أَحْسَنْتَ! نَنْزِلُ خَطْوَةً لِلْخَلْف: ١٠، ٩، ٨، ٧.',
    emojiHint: '🔟 ➡️ ٧',
    difficulty: 'medium'
  },
  {
    id: 'lg_cat_1',
    subject: 'logic',
    type: 'category',
    categoryLabel: 'تَصْنِيفُ الأَشْيَاءِ',
    question: 'أَيٌّ مِمَّا يَلِي يَنْتَمِي لِمَجْمُوعَةِ «الْفَوَاكِه»؟',
    options: ['مَوْز 🍌', 'خِيَار 🥒', 'جَزَر 🥕', 'بَصَل 🧅'],
    correctAnswer: 'مَوْز 🍌',
    explanation: 'صَحِيح! الْمَوْزُ فَاكِهَةٌ حُلْوَةٌ وَلَذِيذَة.',
    emojiHint: '🍌',
    difficulty: 'easy'
  },
  {
    id: 'lg_cat_2',
    subject: 'logic',
    type: 'category',
    categoryLabel: 'تَصْنِيفُ الأَشْيَاءِ',
    question: 'أَيٌّ مِمَّا يَلِي يَنْتَمِي لِمَجْمُوعَةِ «الطُّيُور»؟',
    options: ['عُصْفُور 🐦', 'أَرْنَب 🐇', 'قِطّ 🐱', 'سَمَكَة 🐟'],
    correctAnswer: 'عُصْفُور 🐦',
    explanation: 'رَائِع! الْعُصْفُورُ مِنَ الطُّيُورِ الَّتِي تَطِيرُ فِي السَّمَاء.',
    emojiHint: '🐦',
    difficulty: 'easy'
  },
  {
    id: 'lg_odd_1',
    subject: 'logic',
    type: 'odd-one-out',
    categoryLabel: 'الْكَلِمَةُ الْمُخْتَلِفَة',
    question: 'اخْرِجِ الْكَلِمَةَ الْمُخْتَلِفَةَ الَّتِي لا تَنْتَمِي لِلْمَجْمُوعَة:',
    options: ['كِتَاب 📖', 'تُفَّاح 🍎', 'عِنَب 🍇', 'بُرْتُقَال 🍊'],
    correctAnswer: 'كِتَاب 📖',
    explanation: 'عَفَارِم! كُلُّهَا فَوَاكِه مَا عَدَا «الْكِتَاب» فَهُوَ لِلْقِرَاءَة.',
    emojiHint: '📖 🍎 🍇 🍊',
    difficulty: 'medium'
  },
  {
    id: 'lg_odd_2',
    subject: 'logic',
    type: 'odd-one-out',
    categoryLabel: 'الْكَلِمَةُ الْمُخْتَلِفَة',
    question: 'اخْتَرِ الشَّيْءَ الْمُخْتَلِفَ عَنْ بَاقِي وَسَائِلِ الْمُوَاصَلات:',
    options: ['سَرِير 🛏️', 'سَيَّارَة 🚗', 'قِطَار 🚆', 'طَائِرَة ✈️'],
    correctAnswer: 'سَرِير 🛏️',
    explanation: 'مُمْتَاز! السَّرِيرُ أَثَاثٌ لِلنَّوْم، وَالْبَاقِي وَسَائِلُ مُوَاصَلات.',
    emojiHint: '🚗 🚆 ✈️',
    difficulty: 'easy'
  },
  {
    id: 'lg_pat_4',
    subject: 'logic',
    type: 'pattern',
    categoryLabel: 'إِكْمَالُ الأَنْمَاط',
    question: 'أَكْمِلِ النَّمَط: ⭐ 🌙 ⭐ 🌙 ... ؟',
    options: ['⭐ (نَجْمَة)', '🌙 (هِلال)', '☀️ (شَمْس)', '☁️ (سَحَابَة)'],
    correctAnswer: '⭐ (نَجْمَة)',
    explanation: 'بَطَل! بَعْدَ الْهِلالِ يَتَكَرَّرُ النَّمَطُ فَتَأْتِي النَّجْمَة ⭐.',
    emojiHint: '⭐ 🌙 ⭐ 🌙 ⭐',
    difficulty: 'easy'
  }
];

// ==========================================
// مُوَلِّدُ الأَسْئِلَةِ الدِّينَامِيكِيّ غَيْرِ الْمُكَرَّرَة (Infinite Question Generator)
// ==========================================

const EMOJI_ITEMS = ['🍎', '🍓', '🍌', '🍊', '⭐', '🎈', '🚗', '🐱', '🍪', '🌸', '🧸', '🍬'];
const ARABIC_DIGITS = ['٠', '١', '٢', '٣', '٤', '٥', '٦', '٧', '٨', '٩', '١٠', '١١', '١٢', '١٣', '١٤', '١٥', '١٦', '١٧', '١٨', '١٩', '٢٠'];

export function toArabicNum(n: number): string {
  if (n >= 0 && n <= 20) return ARABIC_DIGITS[n];
  return n.toString();
}

/**
 * يولد سؤال جمع عشوائي ديناميكي لا يتكرر
 */
export function generateDynamicAddQuestion(level: DifficultyLevel = 'medium'): QuizQuestion {
  const max = level === 'easy' ? 5 : level === 'hard' ? 12 : 9;
  const min = level === 'easy' ? 1 : 2;
  const a = Math.floor(Math.random() * (max - min + 1)) + min;
  const b = Math.floor(Math.random() * (max - min + 1)) + min;
  const sum = a + b;
  const emoji = EMOJI_ITEMS[Math.floor(Math.random() * EMOJI_ITEMS.length)];

  // Generate 3 unique wrong options
  const wrongSet = new Set<number>();
  while (wrongSet.size < 3) {
    const delta = Math.floor(Math.random() * 5) - 2; // -2, -1, 1, 2
    const fake = sum + (delta === 0 ? 1 : delta);
    if (fake !== sum && fake > 0) wrongSet.add(fake);
  }

  const allOpts = Array.from(wrongSet);
  allOpts.push(sum);
  allOpts.sort(() => Math.random() - 0.5);

  const id = `dyn_add_${Date.now()}_${Math.floor(Math.random() * 1000)}`;

  return {
    id,
    subject: 'math',
    type: 'math',
    categoryLabel: 'عَمَلِيَّاتُ الْجَمْع (مُتَجَدِّد)',
    question: `كَمْ يُسَاوِي: ${toArabicNum(a)} + ${toArabicNum(b)} = ؟ ${emoji}`,
    options: allOpts.map(n => toArabicNum(n)),
    correctAnswer: toArabicNum(sum),
    explanation: `أَحْسَنْتَ! ${toArabicNum(a)} + ${toArabicNum(b)} = ${toArabicNum(sum)} ${emoji}.`,
    emojiHint: `${emoji.repeat(Math.min(a, 5))} + ${emoji.repeat(Math.min(b, 5))}`,
    difficulty: level
  };
}

/**
 * يولد سؤال طرح عشوائي ديناميكي
 */
export function generateDynamicSubQuestion(level: DifficultyLevel = 'medium'): QuizQuestion {
  const max = level === 'easy' ? 6 : level === 'hard' ? 15 : 10;
  const a = Math.floor(Math.random() * (max - 3)) + 3;
  const b = Math.floor(Math.random() * (a - 1)) + 1;
  const diff = a - b;
  const emoji = EMOJI_ITEMS[Math.floor(Math.random() * EMOJI_ITEMS.length)];

  const wrongSet = new Set<number>();
  while (wrongSet.size < 3) {
    const delta = Math.floor(Math.random() * 5) - 2;
    const fake = diff + (delta === 0 ? 1 : delta);
    if (fake !== diff && fake >= 0) wrongSet.add(fake);
  }

  const allOpts = Array.from(wrongSet);
  allOpts.push(diff);
  allOpts.sort(() => Math.random() - 0.5);

  const id = `dyn_sub_${Date.now()}_${Math.floor(Math.random() * 1000)}`;

  return {
    id,
    subject: 'math',
    type: 'math',
    categoryLabel: 'عَمَلِيَّاتُ الطَّرْح (مُتَجَدِّد)',
    question: `كَمْ يُسَاوِي: ${toArabicNum(a)} - ${toArabicNum(b)} = ؟ ${emoji}`,
    options: allOpts.map(n => toArabicNum(n)),
    correctAnswer: toArabicNum(diff),
    explanation: `مُمْتَاز! ${toArabicNum(a)} - ${toArabicNum(b)} = ${toArabicNum(diff)}.`,
    emojiHint: emoji,
    difficulty: level
  };
}

/**
 * يولد سؤال مقارنة ديناميكي
 */
export function generateDynamicCompareQuestion(level: DifficultyLevel = 'medium'): QuizQuestion {
  const max = level === 'easy' ? 10 : 20;
  const a = Math.floor(Math.random() * max) + 1;
  let b = Math.floor(Math.random() * max) + 1;
  // Make equality appear ~30% of the time
  if (Math.random() < 0.3) b = a;

  let correct = '';
  if (a > b) correct = 'أَكْبَرُ مِنْ ( > )';
  else if (a < b) correct = 'أَصْغَرُ مِنْ ( < )';
  else correct = 'يُسَاوِي ( = )';

  const options = ['أَكْبَرُ مِنْ ( > )', 'أَصْغَرُ مِنْ ( < )', 'يُسَاوِي ( = )'].sort(() => Math.random() - 0.5);
  const id = `dyn_cmp_${Date.now()}_${Math.floor(Math.random() * 1000)}`;

  return {
    id,
    subject: 'math',
    type: 'compare',
    categoryLabel: 'مُقَارَنَةُ الأَعْدَاد (مُتَجَدِّد)',
    question: `قَارِنْ بَيْنَ الْعَدَدَيْن: ${toArabicNum(a)} ... ${toArabicNum(b)}`,
    options,
    correctAnswer: correct,
    explanation: `رَائِع! ${toArabicNum(a)} ${correct} ${toArabicNum(b)}.`,
    emojiHint: `${toArabicNum(a)} ⚖️ ${toArabicNum(b)}`,
    difficulty: level
  };
}

/**
 * يولد سؤال عد بصري متجدد
 */
export function generateDynamicCountQuestion(level: DifficultyLevel = 'medium'): QuizQuestion {
  const count = level === 'easy' ? Math.floor(Math.random() * 5) + 1 : Math.floor(Math.random() * 7) + 3;
  const emoji = EMOJI_ITEMS[Math.floor(Math.random() * EMOJI_ITEMS.length)];
  const visual = Array(count).fill(emoji).join(' ');

  const wrongSet = new Set<number>();
  while (wrongSet.size < 3) {
    const fake = count + (Math.random() > 0.5 ? 1 : -1) * (Math.floor(Math.random() * 3) + 1);
    if (fake !== count && fake > 0) wrongSet.add(fake);
  }
  const allOpts = Array.from(wrongSet);
  allOpts.push(count);
  allOpts.sort(() => Math.random() - 0.5);

  const id = `dyn_cnt_${Date.now()}_${Math.floor(Math.random() * 1000)}`;

  return {
    id,
    subject: 'math',
    type: 'math',
    categoryLabel: 'عَدُّ الأَشْيَاءِ (مُتَجَدِّد)',
    question: `عُدَّ الْعَنَاصِر: كَمْ عُنْصُرًا فِي الشَّاشَةِ؟\n${visual}`,
    options: allOpts.map(n => toArabicNum(n)),
    correctAnswer: toArabicNum(count),
    explanation: `أَحْسَنْتَ! هُنَاكَ ${toArabicNum(count)} مِنَ ${emoji}.`,
    emojiHint: visual,
    difficulty: level
  };
}

/**
 * خدمة إدارة الأسئلة الذكية التي تضمن عدم التكرار (Non-Repeating Question Engine)
 */
const SEEN_IDS_KEY = 'egyptian_grade1_seen_quiz_ids_v1';

export function getSeenQuestionIds(): string[] {
  try {
    const raw = localStorage.getItem(SEEN_IDS_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function markQuestionAsSeen(id: string) {
  try {
    const seen = getSeenQuestionIds();
    if (!seen.includes(id)) {
      seen.push(id);
      // Keep seen list bounded so memory doesn't bloat
      if (seen.length > 200) seen.splice(0, 100);
      localStorage.setItem(SEEN_IDS_KEY, JSON.stringify(seen));
    }
  } catch {
    // Ignore
  }
}

export function clearSeenQuestions() {
  try {
    localStorage.removeItem(SEEN_IDS_KEY);
  } catch {
    // Ignore
  }
}

/**
 * الحصول على حزمة أسئلة منوعة وغير مكررة حسب المادة والمستوى والعدد المطلوب
 */
export function getNonRepeatingQuestions({
  subject = 'all',
  difficulty = 'medium',
  count = 10
}: {
  subject?: QuizSubject;
  difficulty?: DifficultyLevel;
  count?: number;
}): QuizQuestion[] {
  const seenIds = new Set(getSeenQuestionIds());

  // 1. Filter bank by subject
  let pool = COMPREHENSIVE_QUESTION_BANK.filter(q => {
    if (subject === 'all') return true;
    return q.subject === subject;
  });

  // 2. Filter out already seen questions if we have enough unseen
  let unseen = pool.filter(q => !seenIds.has(q.id));

  // If we exhausted most questions, reset seen history for this category so the student can replay
  if (unseen.length < count) {
    clearSeenQuestions();
    unseen = [...pool];
  }

  // Shuffle unseen pool thoroughly
  unseen.sort(() => Math.random() - 0.5);

  const selected: QuizQuestion[] = [];

  // Pick from curated bank
  for (const q of unseen) {
    if (selected.length >= count) break;
    // Shuffle options so they don't appear in the same position
    const shuffledOptions = [...q.options].sort(() => Math.random() - 0.5);
    selected.push({
      ...q,
      options: shuffledOptions
    });
    seenIds.add(q.id);
  }

  // 3. If we still need more questions (or if user asked for Math/All), inject dynamic non-repeating questions!
  while (selected.length < count) {
    let dyn: QuizQuestion;
    const r = Math.random();
    if (subject === 'arabic') {
      // Pick another randomized variation from pool
      const pick = pool[Math.floor(Math.random() * pool.length)];
      dyn = {
        ...pick,
        id: `${pick.id}_rep_${Date.now()}_${Math.floor(Math.random() * 100)}`,
        options: [...pick.options].sort(() => Math.random() - 0.5)
      };
    } else if (r < 0.35) {
      dyn = generateDynamicAddQuestion(difficulty);
    } else if (r < 0.7) {
      dyn = generateDynamicSubQuestion(difficulty);
    } else if (r < 0.85) {
      dyn = generateDynamicCompareQuestion(difficulty);
    } else {
      dyn = generateDynamicCountQuestion(difficulty);
    }
    selected.push(dyn);
  }

  return selected;
}
