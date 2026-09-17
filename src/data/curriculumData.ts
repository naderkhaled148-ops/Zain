import { LetterInfo, UnitInfo, MathItem, QuizQuestion, Sticker } from '../types';

export const UNITS: UnitInfo[] = [
  {
    id: 1,
    title: 'الْوَحْدَةُ الْأُولَى',
    theme: 'أُسْرَتِي',
    badge: '👨‍👩‍👧‍👦',
    color: 'from-amber-400 to-orange-500',
    description: 'تعلّم حروف الأسرة الجميلة: أ - ب - م - ح - ج - د - خ - ت والكلمات الشائعة',
    letters: ['أ', 'ب', 'م', 'ح', 'ج', 'د', 'خ', 'ت'],
    sightWords: ['أَنَا', 'وَ', 'أُسْرَتِي', 'أَبِي', 'أُمِّي'],
    story: {
      title: 'قِصَّةُ أَمِيرَة وَأُسْرَتِهَا السَّعِيدَة',
      content: [
        'أَمِيرَةُ طِفْلَةٌ جَمِيلَةٌ، تَجْلِسُ كُلَّ يَوْمٍ مَعَ أُسْرَتِهَا.',
        'يَعُودُ وَالِدُهَا وَأُمُّهَا مِنَ الْعَمَلِ، وَتَحْكِي لَهُمَا مَا حَدَثَ فِي يَوْمِهَا.',
        'أَمَّا الْجَدَّةُ فَتَحْكِي لِأَمِيرَةَ قَصَصًا مُشَوِّقَةً وَجَمِيلَةً.',
        'وَكَانَتِ الْأُخْتُ سَارَة تُسَاعِدُ أَمِيرَة فِي تَرْتِيبِ أَلْعَابِهَا، وَتُعَلِّمُهَا أَسْمَاءَ الْأَلْوَانِ وَالْأَشْكَالِ.',
        'قَالَتْ أَمِيرَة: «أَنَا أُحِبُّ أُسْرَتِي جِدًّا، وَسَأَكُونُ تِلْمِيذَةً شُجَاعَةً فِي الْمَدْرَسَةِ!»'
      ],
      sightWordsHighlighted: ['أَنَا', 'وَ', 'أُسْرَتِي', 'أُحِبُّ'],
      moral: 'الأسرة مصدر الدفء والمحبة والتعاون بين الجميع.'
    },
    song: {
      title: 'نَشِيدُ أُسْرَتِي',
      lyrics: [
        'أُمِّي أُمِّي نُورُ الْقَلْبِ .. وَأَبِي عِنْدِي رَمْزُ الْحُبِّ',
        'وَأَخِي الْغَالِي دَوْمًا قُرْبِي .. فَاحْفَظْهُمْ دَوْمًا يَا رَبِّي'
      ]
    }
  },
  {
    id: 2,
    title: 'الْوَحْدَةُ الثَّانِيَة',
    theme: 'حَيَوَانَاتِي',
    badge: '🦁',
    color: 'from-emerald-400 to-teal-600',
    description: 'رحلة الحروف مع عالم الحيوانات: ل - س - ن - ر - ف - ك - ق',
    letters: ['ل', 'س', 'ن', 'ر', 'ف', 'ك', 'ق'],
    sightWords: ['مَاذَا', 'الْـ', 'قَالَ', 'قَالَتْ'],
    story: {
      title: 'قِصَّةُ عَالَمِ الْحَيَوَانِ (مَاذَا تَأْكُلُ؟)',
      content: [
        'سَامِي يُحِبُّ الْحَيَوَانَاتِ وَيَجْمَعُ صُوَرَهَا فِي أَلْبُومِهِ الْجَمِيلِ.',
        'جَلَسَ مَعَ وَالِدِهِ يُشَاهِدُ فِيدْيُو عَنْ حَيَوَانَاتِ الْغَابَةِ.',
        'شَاهَدَ الأَسَدَ الْقَوِيَّ مَلِكَ الْغَابَةِ يَسْتَرِيحُ تَحْتَ شَجَرَةٍ.',
        'سَأَلَ الْكَلْبُ الدُّبَّ: «مَاذَا تَأْكُلُ؟» رَدَّ الدُّبُّ: «السَّمَكَ اللَّذِيذَ!»',
        'سَأَلَ الْجَمَلُ الْفَرَسَ: «مَاذَا تَأْكُلُ؟» رَدَّ الْفَرَسُ: «السُّكَّرَ وَالْعُشْبَ!»',
        'قَالَ سَامِي: «سُبْحَانَ اللهِ.. عَالَمُ الْحَيَوَانِ عَالَمٌ عَجِيبٌ وَمُمْتِعٌ!»'
      ],
      sightWordsHighlighted: ['مَاذَا', 'الْـ', 'قَالَ'],
      moral: 'التعرف على الكائنات الحية والرفق بالحيوان.'
    },
    song: {
      title: 'نَشِيدُ لَوْحَتِي الْجَدِيدَة',
      lyrics: [
        'سَأَرْسُمُ الْأُسُودَ .. وَالْفِيلَ وَالْقُرُودَ',
        'وَأَرْنَبًا وَقِطًّا .. وَثَعْلَبًا وَبَطًّا',
        'فَلَوْحَتِي الْجَدِيدَة .. عَنْ غَابَةٍ سَعِيدَة'
      ]
    }
  },
  {
    id: 3,
    title: 'الْوَحْدَةُ الثَّالِثَة',
    theme: 'أَجْزَاءُ جِسْمِي',
    badge: '👀',
    color: 'from-sky-400 to-blue-600',
    description: 'استكشاف حواس الجسم مع الحروف: ي - ع - ش - و - هـ - ذ - ظ',
    letters: ['ي', 'ع', 'ش', 'و', 'هـ', 'ذ', 'ظ'],
    sightWords: ['هَذَا', 'هَذِهِ'],
    story: {
      title: 'قِصَّةُ صُنْدُوقِ جَدَّتِي',
      content: [
        'جَمَعَتِ الْجَدَّةُ أَحْفَادَهَا وَقَالَتْ: «الْيَوْمَ سَنَلْعَبُ مَعَ صُنْدُوقِ الْبِطَاقَاتِ».',
        'فَتَحَ الْأَطْفَالُ الصُّنْدُوقَ، فَوَجَدُوا فِيهِ رُسُومَاتٍ لِأَجْزَاءِ جِسْمِ الإِنْسَانِ.',
        'سَحَبَتْ نَادِيَةُ بِطَاقَةً وَقَالَتْ: «هَذِهِ الْعَيْنُ، أَنَا أَرَى بِهَا الْأَشْيَاءَ وَالأَلْوَانَ».',
        'وَقَالَ سَمِيرٌ: «هَذِهِ الأُذُنُ، أَنَا أَسْمَعُ بِهَا صَوْتَ الْعَصَافِيرِ».',
        'وَقَالَتْ سَارَةُ: «هَذَا الأَنْفُ، أَشُمُّ بِهِ رَائِحَةَ الْوُرُودِ».',
        'قَالَتِ الْجَدَّةُ: «كُلُّ جُزْءٍ فِي أَجْسَامِكُمْ نِعْمَةٌ كَبِيرَةٌ نَشْكُرُ اللهَ عَلَيْهَا». '
      ],
      sightWordsHighlighted: ['هَذَا', 'هَذِهِ', 'قَالَ', 'قَالَتْ'],
      moral: 'شكر الله على نعمة الصحة وحواس الجسم والمحافظة عليها.'
    },
    song: {
      title: 'نَشِيدُ أُحِبُّ جِسْمِي',
      lyrics: [
        'أُبْصِرُ بِالْعَيْنَيْنِ .. طَيْرًا فِي السَّمَاءِ',
        'أَسْمَعُ بِالأُذُنَيْنِ .. صَوْتَ الأَصْدِقَاءِ',
        'وَأَسِيرُ بِالْقَدَمَيْنِ .. وَأَجْرِي فِي الْفَنَاءِ'
      ]
    }
  },
  {
    id: 4,
    title: 'الْوَحْدَةُ الرَّابِعَة',
    theme: 'مَدْرَسَتِي',
    badge: '🏫',
    color: 'from-purple-400 to-pink-500',
    description: 'يوم في المدرسة مع الحروف: ز - ط - ص - ض - ث - غ',
    letters: ['ز', 'ط', 'ص', 'ض', 'ث', 'غ'],
    sightWords: ['هُوَ', 'هِيَ', 'فِي', 'إِلَى'],
    story: {
      title: 'قِصَّةُ يَوْمٍ فِي الْمَدْرَسَةِ',
      content: [
        'اسْتَيْقَظَ كَرِيمٌ نَشِيطًا، لَبِسَ مَلابِسَهُ وَحَمَلَ حَقِيبَتَهُ.',
        'وَصَلَ إِلَى الْمَدْرَسَةِ فَرَحَّبَتْ بِهِ الْمُعَلِّمَةُ بِابْتِسَامَةٍ عَذْبَةٍ.',
        'فِي حِصَّةِ الرَّسْمِ، أَخْرَجَ قَلَمَهُ وَأَلْوَانَهُ، وَرَسَمَ زَهْرَةً مُلَوَّنَةً بِالْأَحْمَرِ وَالْأَصْفَرِ.',
        'سَاعَدَهُ زَمِيلُهُ طَارِقٌ وَأَعْطَاهُ مِمْحَاةً، فَقَالَ لَهُ كَرِيمٌ: «شُكْرًا يَا صَدِيقِي».',
        'قَالَتِ الْمُعَلِّمَةُ: «أَحْسَنْتُمْ يَا أَبْطَالَ، التَّعَاوُنُ يَجْعَلُ فَصْلَنَا أَجْمَلَ فَصْلٍ!»'
      ],
      sightWordsHighlighted: ['هُوَ', 'هِيَ', 'فِي', 'إِلَى'],
      moral: 'حب المدرسة والتعاون مع الأصدقاء واحترام المعلم.'
    },
    song: {
      title: 'نَشِيدُ أُحِبُّ مَدْرَسَتِي',
      lyrics: [
        'أَنَا تِلْمِيذٌ فِي مَدْرَسَتِي .. وَمَعِي قَلَمِي فِي مَقْلَمَتِي',
        'أَكْتُبُ حَرْفًا أَرْسُمُ شَمْسًا .. وَأُرَدِّدُ خَلْفَ مُعَلِّمَتِي'
      ]
    }
  }
];

export const LETTERS_DATA: Record<string, LetterInfo> = {
  'أ': {
    letter: 'أ',
    name: 'أَلِف',
    unit: 1,
    unitTitle: 'أُسْرَتِي',
    color: '#EF4444',
    forms: { isolated: 'أ', initial: 'أَ', medial: 'ـأَ', final: 'ـأ' },
    harakat: {
      fatha: { char: 'أَ', word: 'أَرْنَب', meaning: 'حيوان لطيف سريع', emoji: '🐇' },
      damma: { char: 'أُ', word: 'أُذُن', meaning: 'نسمع بها الأصوات', emoji: '👂' },
      kasra: { char: 'إِ', word: 'إِبْرَة', meaning: 'نخيط بها الملابس', emoji: '🪡' },
      sukun: { char: 'أْ', word: 'فَأْر', meaning: 'حيوان صغير الحجم', emoji: '🐭' }
    },
    song: {
      title: 'أغنية الألف',
      verse1: 'أُمِّي أُمِّي .. هَذَا أَرْنَب',
      verse2: 'مَعَ إِخْوَتِهِ .. يَجْرِي يَلْعَب'
    },
    practiceWords: ['أَب', 'أُمّ', 'أَخ', 'أُخْت', 'أَسَد', 'كَأْس']
  },
  'ب': {
    letter: 'ب',
    name: 'بَاء',
    unit: 1,
    unitTitle: 'أُسْرَتِي',
    color: '#3B82F6',
    forms: { isolated: 'ب', initial: 'بـ', medial: 'ـبـ', final: 'ـب' },
    harakat: {
      fatha: { char: 'بَ', word: 'بَقَرَة', meaning: 'تعطينا الحليب واللبن', emoji: '🐄' },
      damma: { char: 'بُ', word: 'بُرْتُقَال', meaning: 'فاكهة شتوية لذيذة', emoji: '🍊' },
      kasra: { char: 'بِ', word: 'بِطِّيخ', meaning: 'فاكهة صيفية منعشة', emoji: '🍉' },
      sukun: { char: 'بْ', word: 'حَبْل', meaning: 'نربط ونلعب به', emoji: '🪢' }
    },
    song: {
      title: 'أغنية الباء',
      verse1: 'بَيْتُ الْبَطَّة .. مِنْ أَخْشَابِ',
      verse2: 'عَاشَتْ فِيهِ .. يَا أَصْحَابِ'
    },
    practiceWords: ['بَاب', 'بِنْت', 'بَيْت', 'كَلْب', 'بُرْج', 'حَبْل']
  },
  'م': {
    letter: 'م',
    name: 'مِيم',
    unit: 1,
    unitTitle: 'أُسْرَتِي',
    color: '#10B981',
    forms: { isolated: 'م', initial: 'مـ', medial: 'ـمـ', final: 'ـم' },
    harakat: {
      fatha: { char: 'مَ', word: 'مَكْتَب', meaning: 'نكتب وندرس عليه', emoji: '🪵' },
      damma: { char: 'مُ', word: 'مُعَلِّمَة', meaning: 'تعلّمنا القراءة والكتابة', emoji: '👩‍🏫' },
      kasra: { char: 'مِ', word: 'مِفْتَاح', meaning: 'نفتح به الأبواب', emoji: '🔑' },
      sukun: { char: 'مْ', word: 'شَمْس', meaning: 'تنير لنا النهار', emoji: '☀️' }
    },
    song: {
      title: 'أغنية الميم',
      verse1: 'الْمَوْزَةُ الصَّفْرَاءُ .. بِمِيمِهَا سَعِيدَة',
      verse2: 'يُحِبُّهَا الْجَمِيعُ .. لَذِيذَةٌ مُفِيدَة'
    },
    practiceWords: ['أُمّ', 'مَوْز', 'قَلَم', 'هَرَم', 'رَمْل', 'مَلْعَب']
  },
  'ح': {
    letter: 'ح',
    name: 'حَاء',
    unit: 1,
    unitTitle: 'أُسْرَتِي',
    color: '#8B5CF6',
    forms: { isolated: 'ح', initial: 'حـ', medial: 'ـحـ', final: 'ـح' },
    harakat: {
      fatha: { char: 'حَ', word: 'حَمَامَة', meaning: 'طائر يرمز للسلام', emoji: '🕊️' },
      damma: { char: 'حُ', word: 'حُوت', meaning: 'كبير يعيش بالبحر', emoji: '🐋' },
      kasra: { char: 'حِ', word: 'حِصَان', meaning: 'حيوان سريع وقوي', emoji: '🐎' },
      sukun: { char: 'حْ', word: 'لَحْم', meaning: 'غذاء يقوي العضلات', emoji: '🥩' }
    },
    song: {
      title: 'أغنية الحاء',
      verse1: 'مَزْرَعَةُ الْجَدِّ حَسَّان .. فِيهَا حِمَارٌ',
      verse2: 'فِيهَا حِصَان .. يَجْرِي مَعَ الْحَمَام'
    },
    practiceWords: ['حَبّ', 'حَبْل', 'بَحْر', 'مِلْح', 'نَحْل', 'حَجَر']
  },
  'ج': {
    letter: 'ج',
    name: 'جِيم',
    unit: 1,
    unitTitle: 'أُسْرَتِي',
    color: '#F59E0B',
    forms: { isolated: 'ج', initial: 'جـ', medial: 'ـجـ', final: 'ـج' },
    harakat: {
      fatha: { char: 'جَ', word: 'جَمَل', meaning: 'سفينة الصحراء الصبورة', emoji: '🐪' },
      damma: { char: 'جُ', word: 'جُنْدِي', meaning: 'يحمي الوطن بشجاعة', emoji: '💂' },
      kasra: { char: 'جِ', word: 'جِسْر', meaning: 'نعبر فوقه النهر', emoji: '🌉' },
      sukun: { char: 'جْ', word: 'نَجْم', meaning: 'يلمع في سماء الليل', emoji: '⭐' }
    },
    song: {
      title: 'أغنية الجيم',
      verse1: 'جَمَلٌ يَجْرِي .. فِي الصَّحْرَاءِ',
      verse2: 'جِئْتُ إِلَيْهِ .. بِبَعْضِ الْمَاءِ'
    },
    practiceWords: ['جَدّ', 'جَزَر', 'جُبْن', 'حَجّ', 'بُرْج', 'ثَلْج']
  },
  'د': {
    letter: 'د',
    name: 'دَال',
    unit: 1,
    unitTitle: 'أُسْرَتِي',
    color: '#EC4899',
    forms: { isolated: 'د', initial: 'د', medial: 'ـد', final: 'ـد' },
    harakat: {
      fatha: { char: 'دَ', word: 'دَرَّاجَة', meaning: 'نركبها ونلعب رياضة', emoji: '🚲' },
      damma: { char: 'دُ', word: 'دُبّ', meaning: 'حيوان أليف وفروه دافئ', emoji: '🐻' },
      kasra: { char: 'دِ', word: 'دِيك', meaning: 'يصيح في الصباح الباكر', emoji: '🐓' },
      sukun: { char: 'دْ', word: 'بَدْر', meaning: 'القمر المكتمل الجميل', emoji: '🌕' }
    },
    song: {
      title: 'أغنية الدال',
      verse1: 'دِيكٌ أَبْيَض .. عَالِي الصَّوْتِ',
      verse2: 'وَدَجَاجَاتٌ .. عِنْدَ الْبَيْتِ'
    },
    practiceWords: ['دُبّ', 'جَدّ', 'هُدْهُد', 'مُهَنْدِس', 'صُنْدُوق', 'بَدْر']
  },
  'خ': {
    letter: 'خ',
    name: 'خَاء',
    unit: 1,
    unitTitle: 'أُسْرَتِي',
    color: '#06B6D4',
    forms: { isolated: 'خ', initial: 'خـ', medial: 'ـخـ', final: 'ـخ' },
    harakat: {
      fatha: { char: 'خَ', word: 'خَرُوف', meaning: 'حيوان صوفه أبيض ناعم', emoji: '🐑' },
      damma: { char: 'خُ', word: 'خُبْز', meaning: 'طعام طازج نأكله يومياً', emoji: '🍞' },
      kasra: { char: 'خِ', word: 'خِيَار', meaning: 'خضار أخضر صحي ولذيذ', emoji: '🥒' },
      sukun: { char: 'خْ', word: 'نَخْل', meaning: 'شجر يعطينا البلح والتمر', emoji: '🌴' }
    },
    song: {
      title: 'أغنية الخاء',
      verse1: 'خَرُوفُنَا بِصُوف .. وَصَوْتُهُ مَعْرُوف',
      verse2: 'بِحِمَايَةٍ يَطُوف .. يُلاعِبُ الْخَرُوف'
    },
    practiceWords: ['أَخ', 'خَبَزَ', 'خَاتَم', 'صَخْر', 'مَطْبَخ', 'فَخْر']
  },
  'ت': {
    letter: 'ت',
    name: 'تَاء',
    unit: 1,
    unitTitle: 'أُسْرَتِي',
    color: '#EAB308',
    forms: { isolated: 'ت', initial: 'تـ', medial: 'ـتـ', final: 'ـت' },
    harakat: {
      fatha: { char: 'تَ', word: 'تَاج', meaning: 'يلبسه الملك على رأسه', emoji: '👑' },
      damma: { char: 'تُ', word: 'تُوت', meaning: 'ثمار صغيرة حلوة الطعم', emoji: '🫐' },
      kasra: { char: 'تِ', word: 'تِين', meaning: 'فاكهة مباركة ومفيدة', emoji: '🌱' },
      sukun: { char: 'تْ', word: 'كَتْكُوت', meaning: 'صغير الدجاجة الأصفر', emoji: '🐤' }
    },
    song: {
      title: 'أغنية التاء',
      verse1: 'تُوتٌ تَمْرٌ .. مَعَهُ تِين',
      verse2: 'أَيْنَ التَّاءُ .. يَا يَاسِين؟'
    },
    practiceWords: ['أُخْت', 'تَمْر', 'بِنْت', 'بَيْت', 'كِتَاب', 'تِمْسَاح']
  },
  'ل': {
    letter: 'ل',
    name: 'لاَم',
    unit: 2,
    unitTitle: 'حَيَوَانَاتِي',
    color: '#3B82F6',
    forms: { isolated: 'ل', initial: 'لـ', medial: 'ـلـ', final: 'ـل' },
    harakat: {
      fatha: { char: 'لَ', word: 'لَيْمُون', meaning: 'طبيعي ومفيد للمناعة', emoji: '🍋' },
      damma: { char: 'لُ', word: 'لُعْبَة', meaning: 'نلعب بها ونفرح', emoji: '🧸' },
      kasra: { char: 'لِ', word: 'لِسَان', meaning: 'نتذوق ونتكلم به', emoji: '👅' },
      sukun: { char: 'لْ', word: 'ثَلْج', meaning: 'بارد وناصع البياض', emoji: '❄️' }
    },
    song: {
      title: 'أغنية اللام',
      verse1: 'تِلْكَ اللُّعْبَة .. مِنْ أَلْعَابِي',
      verse2: 'هَيَّا نَلْعَب .. يَا أَصْحَابِي'
    },
    practiceWords: ['لَبَن', 'لَحْم', 'جَمَل', 'حَبْل', 'كَلْب', 'بَالُون']
  },
  'س': {
    letter: 'س',
    name: 'سِين',
    unit: 2,
    unitTitle: 'حَيَوَانَاتِي',
    color: '#10B981',
    forms: { isolated: 'س', initial: 'سـ', medial: 'ـسـ', final: 'ـس' },
    harakat: {
      fatha: { char: 'سَ', word: 'سَمَكَة', meaning: 'تسبح في الماء بخفة', emoji: '🐟' },
      damma: { char: 'سُ', word: 'سُكَّر', meaning: 'حلو المذاق والطعم', emoji: '🍬' },
      kasra: { char: 'سِ', word: 'سِتَارَة', meaning: 'تزين النوافذ في البيت', emoji: '🪟' },
      sukun: { char: 'سْ', word: 'جِسْم', meaning: 'صحي وقوي بالرياضة', emoji: '💪' }
    },
    song: {
      title: 'أغنية السين',
      verse1: 'سِينٌ جَاءَتْ .. مَعَهَا شَبَكَة',
      verse2: 'وَبِهَا صَادَتْ .. أَحْلَى سَمَكَة'
    },
    practiceWords: ['سَمَك', 'سَرِير', 'سُلَحْفَاة', 'شَمْس', 'فَرَس', 'مَسْجِد']
  },
  'ن': {
    letter: 'ن',
    name: 'نُون',
    unit: 2,
    unitTitle: 'حَيَوَانَاتِي',
    color: '#F59E0B',
    forms: { isolated: 'ن', initial: 'نـ', medial: 'ـنـ', final: 'ـن' },
    harakat: {
      fatha: { char: 'نَ', word: 'نَمْلَة', meaning: 'حشرة نشيطة تعمل باجتهاد', emoji: '🐜' },
      damma: { char: 'نُ', word: 'نُقُود', meaning: 'نشتري بها ما نحتاج', emoji: '🪙' },
      kasra: { char: 'نِ', word: 'نِصْف', meaning: 'جزء متساوٍ من الشيء', emoji: '🌓' },
      sukun: { char: 'نْ', word: 'بِنْت', meaning: 'مهذبة وجميلة', emoji: '👧' }
    },
    song: {
      title: 'أغنية النون',
      verse1: 'النَّحْلَةُ النَّشِيطَة .. لا تَعْرِفُ الْكَسَل',
      verse2: 'تَطِيرُ فِي الصَّبَاحِ .. وَتُنْتِجُ الْعَسَل'
    },
    practiceWords: ['نَمْل', 'نَخْل', 'جُبْن', 'بَصَل', 'نُسُور', 'أَرَانِب']
  },
  'ر': {
    letter: 'ر',
    name: 'رَاء',
    unit: 2,
    unitTitle: 'حَيَوَانَاتِي',
    color: '#EF4444',
    forms: { isolated: 'ر', initial: 'ر', medial: 'ـر', final: 'ـر' },
    harakat: {
      fatha: { char: 'رَ', word: 'رَأْس', meaning: 'فيه العقل والأفكار', emoji: '👤' },
      damma: { char: 'رُ', word: 'رُمَّان', meaning: 'فاكهة حمراء غنية بالفيتامين', emoji: '🫐' },
      kasra: { char: 'رِ', word: 'رِيشَة', meaning: 'تغطي جسم الطيور بألوانها', emoji: '🪶' },
      sukun: { char: 'رْ', word: 'بُرْج', meaning: 'مبنى عالٍ وشامخ', emoji: '🗼' }
    },
    song: {
      title: 'أغنية الراء',
      verse1: 'فَوْقَ الرَّمْلِ .. رُمَّانَة',
      verse2: 'هِيَ بِالرَّاءِ .. فَرْحَانَة'
    },
    practiceWords: ['رَجُل', 'رَمْل', 'قِرْد', 'نَمِر', 'بَحْر', 'زَهْر']
  },
  'ف': {
    letter: 'ف',
    name: 'فَاء',
    unit: 2,
    unitTitle: 'حَيَوَانَاتِي',
    color: '#8B5CF6',
    forms: { isolated: 'ف', initial: 'فـ', medial: 'ـفـ', final: 'ـف' },
    harakat: {
      fatha: { char: 'فَ', word: 'فَرَاشَة', meaning: 'تطير بين الزهور الجميلة', emoji: '🦋' },
      damma: { char: 'فُ', word: 'فُلّ', meaning: 'زهر أبيض ذكي الرائحة', emoji: '🌸' },
      kasra: { char: 'فِ', word: 'فِيل', meaning: 'حيوان ضخم ذو خرطوم طويل', emoji: '🐘' },
      sukun: { char: 'فْ', word: 'طِفْل', meaning: 'صغير بريء يحب اللعب', emoji: '👶' }
    },
    song: {
      title: 'أغنية الفاء',
      verse1: 'فَرَاشَةٌ صَغِيرَة .. لَطِيفَةٌ رَقِيقَة',
      verse2: 'أَلْوَانُهَا جَمِيلَة .. تَعِيشُ فِي الْحَدِيقَة'
    },
    practiceWords: ['فَهْد', 'فُول', 'أَنْف', 'خَرُوف', 'سَفِينَة', 'صَفّ']
  },
  'ك': {
    letter: 'ك',
    name: 'كَاف',
    unit: 2,
    unitTitle: 'حَيَوَانَاتِي',
    color: '#14B8A6',
    forms: { isolated: 'ك', initial: 'كـ', medial: 'ـكـ', final: 'ـك' },
    harakat: {
      fatha: { char: 'كَ', word: 'كَلْب', meaning: 'صديق وفي للإنسان', emoji: '🐕' },
      damma: { char: 'كُ', word: 'كُرَة', meaning: 'نلعب بها مباريات ممتعة', emoji: '⚽' },
      kasra: { char: 'كِ', word: 'كِتَاب', meaning: 'خير صديق نتعلم منه', emoji: '📖' },
      sukun: { char: 'كْ', word: 'مَكْتَب', meaning: 'طاولة للقراءة والمذاكرة', emoji: '📚' }
    },
    song: {
      title: 'أغنية الكاف',
      verse1: 'كَافٌ كُرَةٌ .. هَيَّا نَلْعَب',
      verse2: 'يَا أَصْحَابِي .. هَيَّا نَكْسَب'
    },
    practiceWords: ['كَعْك', 'كُوب', 'سَمَك', 'مَلِك', 'مَرْكَب', 'دِيك']
  },
  'ق': {
    letter: 'ق',
    name: 'قَاف',
    unit: 2,
    unitTitle: 'حَيَوَانَاتِي',
    color: '#D97706',
    forms: { isolated: 'ق', initial: 'قـ', medial: 'ـقـ', final: 'ـق' },
    harakat: {
      fatha: { char: 'قَ', word: 'قَمَر', meaning: 'ينير الكون في الظلام', emoji: '🌙' },
      damma: { char: 'قُ', word: 'قُبَّعَة', meaning: 'تحمينا من حرارة الشمس', emoji: '🧢' },
      kasra: { char: 'قِ', word: 'قِطَار', meaning: 'يسير فوق القضبان الحديدية', emoji: '🚂' },
      sukun: { char: 'قْ', word: 'صَقْر', meaning: 'طائر جارح حاد البصر', emoji: '🦅' }
    },
    song: {
      title: 'أغنية القاف',
      verse1: 'هَذَا قِرْدٌ .. فَوْقَ الشَّجَرَة',
      verse2: 'يَجْرِي يَقْفِز .. مَعَهُ ثَمَرَة'
    },
    practiceWords: ['قَفَص', 'قَلَم', 'بُنْدُق', 'فُسْتُق', 'أَقْلام', 'طَرِيق']
  }
};

export const WORD_BLENDS = [
  { word: 'أَب', letters: ['أَ', 'بْ'], emoji: '👨', meaning: 'الأب الحنون المعطاء' },
  { word: 'أُمّ', letters: ['أُ', 'مّ'], emoji: '👩', meaning: 'الأم الطيبة العطوفة' },
  { word: 'أَخ', letters: ['أَ', 'خْ'], emoji: '👦', meaning: 'أخي وسندي' },
  { word: 'أُخْت', letters: ['أُ', 'خْ', 'ت'], emoji: '👧', meaning: 'أختي الوفية' },
  { word: 'حَبّ', letters: ['حَ', 'بّ'], emoji: '🌾', meaning: 'حبوب القمح والذرة' },
  { word: 'جَدّ', letters: ['جَ', 'دّ'], emoji: '👴', meaning: 'جدي حكيم الأسرة' },
  { word: 'دُبّ', letters: ['دُ', 'بّ'], emoji: '🐻', meaning: 'دب الغابة القوي' },
  { word: 'بَلَح', letters: ['بَ', 'لَ', 'ح'], emoji: '🌴', meaning: 'بلح النخلة الشهي' },
  { word: 'لَحْم', letters: ['لَ', 'حْ', 'م'], emoji: '🥩', meaning: 'لحم لذيذ ومغذي' },
  { word: 'نَمْل', letters: ['نَ', 'مْ', 'ل'], emoji: '🐜', meaning: 'نمل نشيط متعاون' },
  { word: 'فَرَس', letters: ['فَ', 'رَ', 'س'], emoji: '🐎', meaning: 'فرس سريع في المزرعة' },
  { word: 'قَلَم', letters: ['قَ', 'لَ', 'م'], emoji: '✏️', meaning: 'قلم نكتب ونرسم به' },
  { word: 'كَلْب', letters: ['كَ', 'لْ', 'ب'], emoji: '🐕', meaning: 'كلب حارس وفي' },
  { word: 'شَمْس', letters: ['شَ', 'مْ', 'س'], emoji: '☀️', meaning: 'شمس مشرقة بالدفء' },
  { word: 'عَسَل', letters: ['عَ', 'سَ', 'ل'], emoji: '🍯', meaning: 'عسل النحل الشافي' },
  { word: 'زَهْر', letters: ['زَ', 'هْ', 'ر'], emoji: '🌸', meaning: 'زهر الربيع العطر' }
];

export const MATH_DATA: MathItem[] = [
  {
    id: 'm1',
    type: 'count',
    title: 'عَدُّ الْفَوَاكِهِ اللَّذِيذَة',
    question: 'كَمْ تُفَّاحَةً تَرَى أَمَامَكَ؟ 🍎',
    itemsEmoji: '🍎',
    itemCount1: 4,
    options: [2, 3, 4, 5],
    correctAnswer: 4,
    visualLabel: 'تُفَّاحَاتٍ حَمْرَاء'
  },
  {
    id: 'm2',
    type: 'count',
    title: 'عَدُّ الْأَرَانِبِ النَّشِيطَة',
    question: 'كَمْ أَرْنَبًا يَقْفِزُ هُنَا؟ 🐇',
    itemsEmoji: '🐇',
    itemCount1: 6,
    options: [5, 6, 7, 8],
    correctAnswer: 6,
    visualLabel: 'أَرَانِبَ بَيْضَاء'
  },
  {
    id: 'm3',
    type: 'add',
    title: 'جَمْعُ النُّجُومِ اللَّامِعَة',
    question: '٢ نُجُوم + ٣ نُجُوم = كَمْ نَجْمَة؟ ⭐',
    itemsEmoji: '⭐',
    itemCount1: 2,
    itemCount2: 3,
    operator: '+',
    options: [4, 5, 6, 7],
    correctAnswer: 5,
    visualLabel: '٢ + ٣'
  },
  {
    id: 'm4',
    type: 'add',
    title: 'جَمْعُ الْبَالُونَاتِ الْمُلَوَّنَة',
    question: '٤ بَالُونَات + ٤ بَالُونَات = كَمْ؟ 🎈',
    itemsEmoji: '🎈',
    itemCount1: 4,
    itemCount2: 4,
    operator: '+',
    options: [6, 7, 8, 9],
    correctAnswer: 8,
    visualLabel: '٤ + ٤'
  },
  {
    id: 'm5',
    type: 'subtract',
    title: 'طَرْحُ الْفَرَاشَات',
    question: 'كَانَ هُنَاكَ ٥ فَرَاشَاتٍ 🦋، طَارَتْ مِنْهَا ٢، كَمْ بَقِيَ؟',
    itemsEmoji: '🦋',
    itemCount1: 5,
    itemCount2: 2,
    operator: '-',
    options: [2, 3, 4, 1],
    correctAnswer: 3,
    visualLabel: '٥ - ٢'
  },
  {
    id: 'm6',
    type: 'shapes',
    title: 'التَّعَرُّفُ عَلَى الْأَشْكَالِ الْهَنْدَسِيَّة',
    question: 'أَيُّ شَكْلٍ هُوَ الْمُثَلَّثُ الَّذِي لَهُ ٣ أَضْلاع؟ 📐',
    itemsEmoji: '🔺',
    itemCount1: 1,
    shapeTarget: 'مثلث',
    options: ['دَائِرَة', 'مُرَبَّع', 'مُثَلَّث', 'نَجْمَة'],
    correctAnswer: 'مُثَلَّث',
    visualLabel: 'شكل ثلاثي الأضلاع'
  },
  {
    id: 'm7',
    type: 'shapes',
    title: 'شَكْلُ الشَّمْسِ وَالسَّاعَة',
    question: 'مَا هُوَ الشَّكْلُ الْمُسْتَدِيرُ مِثْلُ السَّاعَةِ وَعَيْنِ الْقَمَر؟ 🔴',
    itemsEmoji: '🔵',
    itemCount1: 1,
    shapeTarget: 'دائرة',
    options: ['دَائِرَة', 'مُرَبَّع', 'مُسْتَطِيل', 'مُثَلَّث'],
    correctAnswer: 'دَائِرَة',
    visualLabel: 'مستديرة بلا زوايا'
  },
  {
    id: 'm8',
    type: 'compare',
    title: 'مُقَارَنَةُ الْأَعْدَادِ (أَكْبَر وَأَصْغَر)',
    question: 'مَا الْعَلامَةُ الصَّحِيحَةُ بَيْنَ (٧) وَ (٣)؟',
    itemsEmoji: '🐟',
    itemCount1: 7,
    itemCount2: 3,
    operator: '>',
    options: ['أَكْبَر مِنْ (> )', 'أَصْغَر مِنْ (< )', 'يُسَاوِي (=)'],
    correctAnswer: 'أَكْبَر مِنْ (> )',
    visualLabel: '٧ مقابل ٣'
  }
];

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q1',
    type: 'sound',
    question: 'مَا هُوَ الْحَرْفُ الَّذِي يَبْدَأُ بِهِ صَوْتُ كَلِمَةِ «أَرْنَب»؟ 🐇',
    audioPrompt: 'أَرْنَب',
    options: ['أَ', 'بَ', 'مَ', 'دَ'],
    correctAnswer: 'أَ',
    explanation: 'أَحْسَنْتَ! أَرْنَب يَبْدَأُ بِحَرْفِ الأَلِفِ الْمَفْتُوحَة (أَ).',
    emojiHint: '🐇'
  },
  {
    id: 'q2',
    type: 'sound',
    question: 'أَيُّ صُورَةٍ تَبْدَأُ بِصَوْتِ «بَـ» الْمَفْتُوح؟',
    audioPrompt: 'بَـ',
    options: ['بَقَرَة 🐄', 'أَسَد 🦁', 'دُبّ 🐻', 'فِيل 🐘'],
    correctAnswer: 'بَقَرَة 🐄',
    explanation: 'رَائِع! بَقَرَة تَبْدَأُ بِحَرْفِ الْبَاءِ الْمَفْتُوح (بَـ).',
    emojiHint: '🐄'
  },
  {
    id: 'q3',
    type: 'missing-letter',
    question: 'مَا الْحَرْفُ النَّاقِصُ لِتَكْوِينِ كَلِمَةِ «أُ...ـرَتِي»؟ 👨‍👩‍👧‍👦',
    options: ['س', 'ب', 'ن', 'ل'],
    correctAnswer: 'س',
    explanation: 'عَبْقَرِيّ! كَلِمَةُ «أُسْرَتِي» تَحْتَاجُ حَرْفَ السِّين (س).',
    emojiHint: '👨‍👩‍👧‍👦'
  },
  {
    id: 'q4',
    type: 'word-match',
    question: 'اخْتَرِ الْكَلِمَةَ الَّتِي تَدُلُّ عَلَى الصُّورَة: 🍯',
    options: ['عَسَل', 'لَحْم', 'جُبْن', 'بَلَح'],
    correctAnswer: 'عَسَل',
    explanation: 'مُمْتَاز! عَسَل النَّحْلِ لَذِيذٌ وَشَافٍ.',
    emojiHint: '🍯'
  },
  {
    id: 'q5',
    type: 'sight-word',
    question: 'اخْتَرِ الْكَلِمَةَ الشَّائِعَةَ الَّتِي نَقُولُهَا عِنْدَمَا نَتَحَدَّثُ عَنْ أَنْفُسِنَا:',
    options: ['أَنَا', 'هُوَ', 'هَذِهِ', 'فِي'],
    correctAnswer: 'أَنَا',
    explanation: 'بَطَل! «أَنَا أُحِبُّ أُسْرَتِي وَمَدْرَسَتِي».',
    emojiHint: '🧒'
  },
  {
    id: 'q6',
    type: 'math',
    question: 'كَمْ يُسَاوِي: ٣ نُجُوم ⭐ + ٢ نَجْمَة ⭐؟',
    options: ['٥', '٤', '٦', '٣'],
    correctAnswer: '٥',
    explanation: 'أَحْسَنْتَ يَا بَطَل الْحِسَاب! ٣ + ٢ = ٥ نُجُوم.',
    emojiHint: '⭐⭐⭐⭐⭐'
  },
  {
    id: 'q7',
    type: 'sound',
    question: 'مَا هِيَ الْحَرَكَةُ الصَّحِيحَةُ لِحَرْفِ اللام فِي كَلِمَةِ «لُعْبَة»؟ 🧸',
    options: ['الضَّمَّة (لُ)', 'الْفَتْحَة (لَ)', 'الْكَسْرَة (لِ)', 'السُّكُون (لْ)'],
    correctAnswer: 'الضَّمَّة (لُ)',
    explanation: 'صَحِيح! لُعْبَة تَبْدَأُ بِلَامٍ مَضْمُومَة (لُ).',
    emojiHint: '🧸'
  },
  {
    id: 'q8',
    type: 'missing-letter',
    question: 'ادْمِجِ الْحُرُوف: (نَ + مْ + ل) = ؟ 🐜',
    options: ['نَمْل', 'لَبَن', 'نَخْل', 'نَمِر'],
    correctAnswer: 'نَمْل',
    explanation: 'مُمْتَاز جِدًّا! نَ + مْ + ل تُعْطِينَا كَلِمَةَ «نَمْل».',
    emojiHint: '🐜'
  }
];

export const INITIAL_STICKERS: Sticker[] = [
  { id: 'st1', title: 'نَجْمُ الْحُرُوف', emoji: '⭐', cost: 10, requiredLevel: 1, category: 'letters', unlocked: true },
  { id: 'st2', title: 'الشِّبْلُ الشُّجَاع', emoji: '🦁', cost: 20, requiredLevel: 1, category: 'heroes', unlocked: true },
  { id: 'st3', title: 'فَرَاشَةُ الْقِرَاءَة', emoji: '🦋', cost: 30, requiredLevel: 2, category: 'letters', unlocked: false },
  { id: 'st4', title: 'عَبْقَرِيُّ الْحِسَاب', emoji: '🧮', cost: 40, requiredLevel: 2, category: 'math', unlocked: false },
  { id: 'st5', title: 'السُّلَحْفَاةُ الْحَكِيمَة', emoji: '🐢', cost: 50, requiredLevel: 2, category: 'animals', unlocked: false },
  { id: 'st6', title: 'خَطَّاطُ الْمُسْتَقْبَل', emoji: '✍️', cost: 60, requiredLevel: 3, category: 'letters', unlocked: false },
  { id: 'st7', title: 'بَطَلُ الْمَدْرَسَة', emoji: '🏫', cost: 80, requiredLevel: 3, category: 'heroes', unlocked: false },
  { id: 'st8', title: 'صَارُوخُ التَّفَوُّق', emoji: '🚀', cost: 100, requiredLevel: 4, category: 'heroes', unlocked: false },
  { id: 'st9', title: 'تَاجُ الْمَعْرِفَة', emoji: '👑', cost: 120, requiredLevel: 4, category: 'heroes', unlocked: false },
  { id: 'st10', title: 'الْفَنَّانُ الصَّغِير', emoji: '🎨', cost: 150, requiredLevel: 5, category: 'animals', unlocked: false }
];
