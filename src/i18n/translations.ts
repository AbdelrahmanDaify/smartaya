export type Language = 'ar' | 'en';

export interface Translations {
  appName: string;
  appSubtitle: string;
  nav: {
    home: string;
    features: string;
    howItWorks: string;
    workspace: string;
    currentWorkspace: string;
    startNow: string;
    homePage: string;
  };
  hero: {
    badge: string;
    headline: string;
    description: string;
    startNow: string;
    trySample: string;
    proofOcr: string;
    proofSummary: string;
    proofQuiz: string;
    proofPdf: string;
    cardReady: string;
    cardTag: string;
    cardSampleTitle: string;
    cardStats: string;
  };
  features: {
    badge: string;
    title: string;
    description: string;
    items: Array<{
      badge: string;
      title: string;
      desc: string;
    }>;
    footerCheck: string;
  };
  howItWorks: {
    tag: string;
    title: string;
    description: string;
    steps: Array<{
      step: string;
      title: string;
      desc: string;
    }>;
    stepNote: string;
    ctaBannerTitle: string;
    ctaBannerDesc: string;
    ctaBannerBtn: string;
  };
  footer: {
    description: string;
    dedicated: string;
    quickLinks: string;
    supportedFormats: string;
    pdfDocs: string;
    imageNotes: string;
    webFormats: string;
    exportFormats: string;
    rights: string;
    aiBadge: string;
  };
  workspace: {
    breadcrumbHome: string;
    breadcrumbWorkspace: string;
    mainTitle: string;
    exportPdf: string;
    newDocument: string;
    errorTitle: string;
    processingDoc: string;
    tabs: {
      notes: string;
      summary: string;
      questions: string;
      chat: string;
    };
  };
  uploader: {
    title: string;
    subtitle: string;
    loadSample: string;
    dragDropText: string;
    dragDropSub: string;
    fileLimit: string;
    uploadedSuccess: string;
    readyForAnalysis: string;
    replace: string;
    delete: string;
    errors: {
      invalidType: string;
      tooLarge: string;
      readFailed: string;
    };
  };
  notes: {
    badge: string;
    stats: (topicsCount: number, defsCount: number) => string;
    viewStructured: string;
    viewRaw: string;
    viewMarkdown: string;
    copy: string;
    copied: string;
    edit: string;
    save: string;
    overviewTitle: string;
    searchPlaceholder: string;
    clarificationNote: string;
    addSubpoint: string;
    definitionsTitle: string;
    takeawaysTitle: string;
    rawNoticeTitle: string;
    rawNoticeSub: string;
    rawPlaceholder: string;
    markdownSub: string;
  };
  summary: {
    badge: string;
    subtitle: string;
    title: string;
    copyBtn: string;
    copiedBtn: string;
    coreIdeaTitle: string;
    mainPointsTitle: string;
    definitionsTitle: string;
    quickReviewTitle: string;
    examAlertsTitle: string;
  };
  questions: {
    badge: string;
    stats: (mcq: number, tf: number, sa: number) => string;
    title: string;
    currentScore: string;
    resetQuiz: string;
    countLabel: string;
    autoOption: string;
    regenerateBtn: string;
    generating: string;
    coverageNotice: string;
    tabMcq: (count: number) => string;
    tabTf: (count: number) => string;
    tabShort: (count: number) => string;
    correctAlert: string;
    incorrectAlert: (ans: string) => string;
    trueBtn: string;
    falseBtn: string;
    correctTfAlert: (val: string) => string;
    incorrectTfAlert: (val: string) => string;
    showAnswer: string;
    hideAnswer: string;
    modelAnswerTitle: string;
    criteriaTitle: string;
  };
  chat: {
    welcome: (lectureTitle?: string) => string;
    title: string;
    subtitle: string;
    aiBadge: string;
    thinking: string;
    placeholder: string;
    send: string;
    samplePrompts: string[];
  };
  exportModal: {
    title: string;
    subtitle: string;
    selectLabel: string;
    includeNotesTitle: string;
    includeNotesSub: string;
    includeSummaryTitle: string;
    includeSummarySub: string;
    includeQuestionsTitle: string;
    includeQuestionsSub: string;
    includeRawTitle: string;
    includeRawSub: string;
    printPdfBtn: string;
    downloadMd: string;
    downloadTxt: string;
  };
  print: {
    brandHeader: string;
    dateLabel: string;
    sourceDoc: string;
    sectionNotes: string;
    lectureIntro: string;
    keyDefinitions: string;
    sectionSummary: string;
    coreIdea: string;
    mainPoints: string;
    quickReview: string;
    examAlerts: string;
    sectionQuestions: string;
    mcqTitle: string;
    tfTitle: string;
    shortTitle: string;
    modelAnswer: string;
    criteria: string;
    footerText: string;
  };
}

export const translations: Record<Language, Translations> = {
  ar: {
    appName: 'مساعد الدراسة الذكي',
    appSubtitle: 'AI Study Assistant',
    nav: {
      home: 'الرئيسية',
      features: 'المميزات',
      howItWorks: 'كيف يعمل',
      workspace: 'مساحة العمل',
      currentWorkspace: 'مساحة العمل الحالية',
      startNow: 'ابدأ الآن',
      homePage: 'الصفحة الرئيسية',
    },
    hero: {
      badge: 'تقنية ذكاء اصطناعي متطورة لقراءة خط اليد والمستندات',
      headline: 'حوّل ملاحظاتك إلى محتوى منظم وجاهز للمذاكرة',
      description:
        'منصة ذكية تساعد الطلاب على استخراج النصوص من الدفاتر المكتوبة بخط اليد ومستندات المحاضرات (PDF والصور)، وترتيبها في مذكرات دراسية منظمة، وتوليد ملخصات سريعة وبنوك أسئلة تدريبية للاختبارات مع إمكانية التصدير إلى PDF.',
      startNow: 'ابدأ الآن مجاناً',
      trySample: 'تجربة نموذج ملاحظات جاهز',
      proofOcr: 'قراءة خط اليد العربي',
      proofSummary: 'ملخصات امتحانية مركزة',
      proofQuiz: 'اختبار تفاعلي ذاتي',
      proofPdf: 'تصدير PDF عالي النقاء',
      cardReady: 'جاهز للمذاكرة',
      cardTag: 'ملاحظات بخط اليد ➔ مذكرة رقمية',
      cardSampleTitle: 'محاضرة: الذكاء الاصطناعي وتعلم الآلة',
      cardStats: '3 محاور رئيسية · 5 تعريفات امتحانية · 8 أسئلة تدريبية',
    },
    features: {
      badge: 'مميزات المنصة',
      title: 'كل ما يحتاجه الطالب لتحويل دفاتر الملاحظات إلى تفوق دراسي',
      description:
        'صُمم "مساعد الدراسة الذكي" ليوفر تجربة شاملة للطلاب والباحثين، من لحظة التقاط صورة الدفتر وحتى الانتهاء من الاختبار التجريبي وطباعة مذكرة الـ PDF.',
      items: [
        {
          badge: 'دقة فائقة',
          title: 'استخراج ذكي لخط اليد (OCR)',
          desc: 'يتعرف الذكاء الاصطناعي على الخطوط اليدوية والمطبوعة باللغتين العربية والإنجليزية من ملفات PDF والصور (JPG, PNG, WEBP) بأعلى دقة ممكنة مع تحديد الأجزاء غير المقروءة بأمانة ودون اختلاق.',
        },
        {
          badge: 'قابل للتعديل',
          title: 'تنظيم وهيكلة المحتوى',
          desc: 'يحوّل المسودات والملاحظات المبعثرة إلى مذكرات دراسية واضحة مقسمة إلى عناوين رئيسية وفرعية، ونقاط تعدادية، وجداول للمصطلحات، مع إمكانية التعديل المباشر.',
        },
        {
          badge: 'مراجعة سريعة',
          title: 'ملخصات امتحانية مركزة',
          desc: 'يستخلص الفكرة الجوهرية والتعريفات الحاسمة وتنبيهات الاختبارات في كبسولة مراجعة سريعة تساعدك على استيعاب المحاضرة الطويلة في دقائق معدودة.',
        },
        {
          badge: 'تقييم تفاعلي',
          title: 'بنك أسئلة واختبار ذاتي',
          desc: 'يولد أسئلة اختيار من متعدد، وصواب أو خطأ، وأسئلة إجابة قصيرة مع إمكانية خوض اختبار تفاعلي فوري يعرض التفسير والنتيجة مباشرة بعد كل سؤال.',
        },
      ],
      footerCheck: 'مدمج بالكامل ويعمل باللغتين العربية والإنجليزية',
    },
    howItWorks: {
      tag: 'بساطة وسرعة',
      title: 'ثلاث خطوات فقط تفصلك عن التفوق',
      description:
        'طريقة عمل مدروسة تضمن لك توفير ساعات من تفريغ الملاحظات اليدوية والتلخيص الشاق.',
      steps: [
        {
          step: '01',
          title: 'ارفع مستندك أو صورة دفترك',
          desc: 'التقط صورة لدفتر الملاحظات المكتوب بخط اليد أو ارفع ملف PDF الخاص بالمحاضرة أو العرض التقديمي.',
        },
        {
          step: '02',
          title: 'معالجة وتنظيم ذكي وفوري',
          desc: 'يقوم الذكاء الاصطناعي باستخراج الكلمات بدقة، وإعادة صياغة الهيكل الأكاديمي، وتوليد كبسولة الملخص وبنك الأسئلة.',
        },
        {
          step: '03',
          title: 'راجع واختبر نفسك ثم صدّر PDF',
          desc: 'عدّل الملاحظات، خُض الاختبار التجريبي الذاتي لمعرفة مستواك، ثم اطبع أو احفظ مستند PDF منسقاً بجودة طباعة عالية.',
        },
      ],
      stepNote: 'خطوة مجانية وتلقائية بالكامل',
      ctaBannerTitle: 'جاهز لتجربة مساعد الدراسة الذكي الآن؟',
      ctaBannerDesc: 'لا حاجة لتسجيل أو بطاقات ائتمان — ارفع ملفك وابدأ الدراسة فوراً.',
      ctaBannerBtn: 'فتح مساحة العمل',
    },
    footer: {
      description:
        'أداة تعليمية حديثة مدعومة بالذكاء الاصطناعي لتحويل الملاحظات الورقية ومستندات المحاضرات إلى مواد دراسية رقمية ملخصة ومنظمة وجاهزة للمذاكرة والاختبارات والتصدير كـ PDF.',
      dedicated: 'صُمم بعناية لدعم الطلاب والباحثين في العالم العربي وحول العالم',
      quickLinks: 'روابط سريعة',
      supportedFormats: 'التنسيقات المدعومة',
      pdfDocs: '• مستندات المحاضرات: PDF',
      imageNotes: '• صور الملاحظات اليدوية: PNG, JPG, JPEG',
      webFormats: '• صيغ الويب: WEBP',
      exportFormats: '• التصدير: PDF عالي الدقة و Markdown',
      rights: '© 2026 مساعد الدراسة الذكي (AI Study Assistant). جميع الحقوق محفوظة.',
      aiBadge: 'يعمل بنماذج الذكاء الاصطناعي المتقدمة لفهم الوثائق واللغة العربية.',
    },
    workspace: {
      breadcrumbHome: 'الرئيسية',
      breadcrumbWorkspace: 'مساحة العمل الأكاديمية',
      mainTitle: 'لوحة تحويل الملاحظات ودراستها',
      exportPdf: 'تصدير وطباعة PDF',
      newDocument: 'مستند جديد',
      errorTitle: 'تعذر استكمال العملية',
      processingDoc: 'جاري معالجة مستندك بواسطة الذكاء الاصطناعي...',
      tabs: {
        notes: 'الملاحظات المنظمة',
        summary: 'الملخص الدراسي',
        questions: 'بنك الأسئلة والاختبار الذاتي',
        chat: 'المعلم الذكي (AI Tutor)',
      },
    },
    uploader: {
      title: 'رفع المستند أو الملاحظات اليدوية',
      subtitle: 'يدعم ملفات المحاضرات (PDF) والصور اليدوية (PNG, JPG, WEBP)',
      loadSample: 'تجربة بنموذج محاضرة جاهز',
      dragDropText: 'اضغط هنا لاختيار الملف، أو اسحبه وأفلته هنا',
      dragDropSub: 'سواء كانت مذكرة جامعية مكتوبة بخط اليد بالكامل، أو ملخص امتحان، أو سلايدات محاضرة بصيغة PDF',
      fileLimit: '· حتى 30 ميغابايت',
      uploadedSuccess: 'تم الرفع بنجاح',
      readyForAnalysis: 'جاهز للتحليل والاستخراج بالذكاء الاصطناعي',
      replace: 'استبدال',
      delete: 'إزالة',
      errors: {
        invalidType: 'صيغة الملف غير مدعومة. الرجاء رفع ملف PDF أو صورة بصيغة JPG أو PNG أو WEBP.',
        tooLarge: 'حجم الملف كبير جداً. الحد الأقصى المسموح به هو 30 ميغابايت.',
        readFailed: 'فشل في قراءة الملف من الجهاز. الرجاء المحاولة مرة أخرى.',
      },
    },
    notes: {
      badge: 'مذكرة دراسية مهيكلة',
      stats: (topics, defs) => `${topics} محاور رئيسية · ${defs} تعريفات`,
      viewStructured: 'عرض منظم',
      viewRaw: 'النص المستخرج الخام (OCR)',
      viewMarkdown: 'Markdown',
      copy: 'نسخ',
      copied: 'تم النسخ',
      edit: 'تعديل المحتوى',
      save: 'حفظ التعديلات',
      overviewTitle: 'مقدمة وفكرة المحاضرة',
      searchPlaceholder: 'بحث في محاور وعناوين الملاحظات...',
      clarificationNote: 'ملاحظة توضيحية:',
      addSubpoint: 'إضافة نقطة فرعية',
      definitionsTitle: 'المصطلحات والمفاهيم الأساسية المستخرجة',
      takeawaysTitle: 'النقاط الذهبية وأهم الخلاصات',
      rawNoticeTitle: 'نص التعرف البصري الخام (OCR) كما استخرجه الذكاء الاصطناعي مباشرة',
      rawNoticeSub: 'يحتفظ هذا النص بالصياغة الأصلية والكلمات اليدوية. الكلمات غير الواضحة في الدفتر تم وسمها بـ [غير مقروء] لتفادي أي اختلاق أو خطأ علمي.',
      rawPlaceholder: 'لم يتوفر نص خام مستخرج بعد.',
      markdownSub: 'صيغة Markdown جاهزة للنسخ أو الاستيراد في تطبيقات تدوين الملاحظات مثل Notion و Obsidian:',
    },
    summary: {
      badge: 'كبسولة المراجعة السريعة',
      subtitle: 'مستخلص مكثف للاستعداد للامتحانات',
      title: 'الملخص الدراسي المركز',
      copyBtn: 'نسخ الملخص كاملاً',
      copiedBtn: 'تم نسخ الملخص',
      coreIdeaTitle: 'الفكرة الجوهرية للدرس (The Big Picture)',
      mainPointsTitle: 'أهم الأفكار والمحاور المشروحة في الملاحظات',
      definitionsTitle: 'تعريفات ومصطلحات حاسمة للمذاكرة',
      quickReviewTitle: 'كبسولات الحفظ السريع قبل دخول قاعة الامتحان',
      examAlertsTitle: 'تنبيهات امتحانية هامة (Exam Alerts)',
    },
    questions: {
      badge: 'اختبار وتقييم تفاعلي',
      stats: (mcq, tf, sa) => `${mcq} اختيار من متعدد · ${tf} صح وخطأ · ${sa} أسئلة مقالية`,
      title: 'بنك الأسئلة والاختبار الذاتي',
      currentScore: 'درجتك الحالية',
      resetQuiz: 'إعادة الاختبار',
      countLabel: 'عدد الأسئلة المطلوب:',
      autoOption: 'تلقائي (موصى به)',
      regenerateBtn: 'توليد بنك أسئلة جديد',
      generating: 'جاري توليد الأسئلة وتوزيعها على المحاور...',
      coverageNotice: 'تنبيه حول عدد الأسئلة وفق كثافة المحتوى:',
      tabMcq: (count) => `اختيار من متعدد (${count})`,
      tabTf: (count) => `صواب أو خطأ (${count})`,
      tabShort: (count) => `أسئلة مقالية قصيرة (${count})`,
      correctAlert: 'إجابة صحيحة! أحسنت.',
      incorrectAlert: (ans) => `إجابة غير دقيقة. الإجابة الصحيحة هي: (${ans})`,
      trueBtn: 'صواب',
      falseBtn: 'خطأ',
      correctTfAlert: (val) => `إجابة صحيحة! (${val})`,
      incorrectTfAlert: (val) => `إجابة غير صحيحة. الإجابة الصحيحة هي: (${val})`,
      showAnswer: 'إظهار نموذج الإجابة ومعايير التصحيح',
      hideAnswer: 'إخفاء الإجابة النموذجية',
      modelAnswerTitle: 'نموذج الإجابة الأكاديمية:',
      criteriaTitle: 'عناصر يجب أن تتضمنها إجابتك للحصول على الدرجة الكاملة:',
    },
    chat: {
      welcome: (lectureTitle) =>
        `أهلاً بك! أنا "المعلم الذكي"، رفيقك المساعد في دراسة ${
          lectureTitle ? `محاضرة "${lectureTitle}"` : 'هذا المحتوى'
        }. يمكنك سؤالي عن أي مفهوم غامض، أو طلب تبسيط نقطة صعبة، أو التنبؤ بأسئلة الامتحان المحتملة. بماذا ترغب في البدء؟`,
      title: 'المعلم الذكي (AI Study Coach)',
      subtitle: 'يجيبك ويشرح لك معتمداً على مستندك المرفوع',
      aiBadge: 'محادثة تفاعلية مدعومة بـ Gemini',
      thinking: 'المعلم الذكي يقوم بالصياغة والتفكير...',
      placeholder: 'اسأل المعلم الذكي عن أي جزئية في الملاحظات...',
      send: 'إرسال',
      samplePrompts: [
        'اشرح لي أهم فكرة في هذه الملاحظات بمثال واقعي.',
        'ما هي أصعب نقطة قد يقع فيها الطلاب في الامتحان؟',
        'اختبرني بسؤال تطبيقي جديد لم يرد في بنك الأسئلة.',
      ],
    },
    exportModal: {
      title: 'تصدير وطباعة المواد الدراسية',
      subtitle: 'تصدير بصيغة PDF بدعم كامل للغة العربية أو ملف Markdown',
      selectLabel: 'حدد الأقسام التي ترغب في تضمينها في مستند الـ PDF:',
      includeNotesTitle: 'الملاحظات المنظمة وهيكلة المحاضرة',
      includeNotesSub: 'تشمل العناوين، الشروحات، وجدول المصطلحات',
      includeSummaryTitle: 'الملخص الدراسي المركز',
      includeSummarySub: 'الفكرة العامة، كبسولات الحفظ، وتنبيهات الاختبار',
      includeQuestionsTitle: 'بنك الأسئلة مع الإجابات النموذجية',
      includeQuestionsSub: 'الاختيار من متعدد، صواب وخطأ، والأسئلة المقالية',
      includeRawTitle: 'النص الأصلي المستخرج (OCR)',
      includeRawSub: 'النص الخام كما تم التعرف عليه من خط اليد',
      printPdfBtn: 'طباعة وتصدير كـ PDF (جاهز للحفظ والطباعة)',
      downloadMd: 'تنزيل كـ Markdown (.md)',
      downloadTxt: 'تنزيل كـ نص (.txt)',
    },
    print: {
      brandHeader: 'مساعد الدراسة الذكي · AI Study Assistant',
      dateLabel: 'تاريخ الطباعة:',
      sourceDoc: 'المستند المصدر:',
      sectionNotes: 'أولاً: الملاحظات المنظمة وهيكلة المحاضرة',
      lectureIntro: 'مقدمة المحاضرة:',
      keyDefinitions: 'المصطلحات والمفاهيم الأساسية:',
      sectionSummary: 'ثانياً: الملخص الدراسي والامتحاني السريع',
      coreIdea: 'الفكرة الجوهرية:',
      mainPoints: 'المحاور والأفكار الرئيسية:',
      quickReview: 'كبسولات المراجعة السريعة:',
      examAlerts: 'تنبيهات الاختبار:',
      sectionQuestions: 'ثالثاً: بنك الأسئلة مع نماذج الإجابات',
      mcqTitle: '1. أسئلة الاختيار من متعدد:',
      tfTitle: '2. أسئلة صواب أو خطأ:',
      shortTitle: '3. الأسئلة المقالية وإجاباتها النموذجية:',
      modelAnswer: 'نموذج الإجابة:',
      criteria: 'معايير التصحيح:',
      footerText: 'تم إعداد هذه المذكرة الدراسية بواسطة مساعد الدراسة الذكي (AI Study Assistant).',
    },
  },
  en: {
    appName: 'AI Study Assistant',
    appSubtitle: 'مساعد الدراسة الذكي',
    nav: {
      home: 'Home',
      features: 'Features',
      howItWorks: 'How It Works',
      workspace: 'Workspace',
      currentWorkspace: 'Current Workspace',
      startNow: 'Start Now',
      homePage: 'Home Page',
    },
    hero: {
      badge: 'Advanced AI Document Understanding & Handwriting OCR',
      headline: 'Turn your notes into organized, study-ready materials',
      description:
        'An intelligent educational platform that empowers students to extract text from handwritten notebooks and lecture documents (PDFs & images), structure them into neat digital notes, generate rapid exam summaries, and take interactive practice quizzes—ready to export to PDF.',
      startNow: 'Start Free Now',
      trySample: 'Try Sample Lecture Notes',
      proofOcr: 'Arabic & English OCR',
      proofSummary: 'High-Yield Summaries',
      proofQuiz: 'Interactive Self-Quiz',
      proofPdf: 'Clean Vector PDF Export',
      cardReady: 'Study Ready',
      cardTag: 'Handwritten Notes ➔ Structured Notes',
      cardSampleTitle: 'Lecture: AI & Machine Learning Foundations',
      cardStats: '3 Main Topics · 5 Exam Definitions · 8 Practice Questions',
    },
    features: {
      badge: 'Core Features',
      title: 'Everything students need to turn messy notes into academic excellence',
      description:
        'AI Study Assistant delivers an all-in-one workflow for learners and researchers—from snapping a photo of your notebook to acing self-assessment quizzes and exporting crisp print-ready PDFs.',
      items: [
        {
          badge: 'High Accuracy',
          title: 'Intelligent Handwriting OCR',
          desc: 'Recognizes handwritten and printed notes in both Arabic and English from PDFs and images (JPG, PNG, WEBP), clearly marking illegible parts without hallucination.',
        },
        {
          badge: 'Fully Editable',
          title: 'Structured Note Organization',
          desc: 'Transforms fragmented scribbles into professional academic study notes divided into headings, subpoints, and terminology tables with instant in-line editing.',
        },
        {
          badge: 'Quick Revision',
          title: 'Exam-Ready High-Yield Summaries',
          desc: 'Distills core concepts, critical definitions, and common test pitfalls into an easy-to-digest capsule that lets you review hours of lecture content in minutes.',
        },
        {
          badge: 'Interactive Testing',
          title: 'Quiz Bank & Self-Assessment',
          desc: 'Generates multiple choice, true/false, and short answer questions with instant color-coded feedback, scores, and comprehensive explanations.',
        },
      ],
      footerCheck: 'Fully supports bilingual Arabic and English workflows',
    },
    howItWorks: {
      tag: 'Fast & Simple',
      title: 'Only 3 simple steps to master your course material',
      description:
        'A streamlined learning workflow that saves hours of manual typing and tedious summarization.',
      steps: [
        {
          step: '01',
          title: 'Upload your document or notes photo',
          desc: 'Take a photo of your handwritten notebook or upload your course PDF lecture slides.',
        },
        {
          step: '02',
          title: 'Instant AI extraction & organization',
          desc: 'AI accurately reads the handwriting, reconstructs the academic outline, and crafts summaries and quizzes.',
        },
        {
          step: '03',
          title: 'Review, test yourself & export to PDF',
          desc: 'Refine your notes, test your retention with the quiz engine, then print or download a high-quality PDF.',
        },
      ],
      stepNote: '100% free and automatic workflow',
      ctaBannerTitle: 'Ready to try AI Study Assistant today?',
      ctaBannerDesc: 'No registration or credit card needed — upload your file and begin studying immediately.',
      ctaBannerBtn: 'Open Workspace',
    },
    footer: {
      description:
        'A modern AI-powered educational web application for turning paper notes and lecture documents into structured digital study materials, summaries, quizzes, and print-ready PDFs.',
      dedicated: 'Crafted with care to empower students and educators worldwide',
      quickLinks: 'Quick Links',
      supportedFormats: 'Supported Formats',
      pdfDocs: '• Lecture Documents: PDF',
      imageNotes: '• Handwritten Notes: PNG, JPG, JPEG',
      webFormats: '• Web Formats: WEBP',
      exportFormats: '• Export: Clean Vector PDF & Markdown',
      rights: '© 2026 AI Study Assistant. All rights reserved.',
      aiBadge: 'Powered by Gemini models for advanced document understanding and multilingual NLP.',
    },
    workspace: {
      breadcrumbHome: 'Home',
      breadcrumbWorkspace: 'Academic Workspace',
      mainTitle: 'Study & Note Transformation Workspace',
      exportPdf: 'Export & Print PDF',
      newDocument: 'New Document',
      errorTitle: 'Unable to complete operation',
      processingDoc: 'Processing your document with AI intelligence...',
      tabs: {
        notes: 'Structured Notes',
        summary: 'Study Summary',
        questions: 'Quiz Bank & Practice',
        chat: 'AI Study Coach',
      },
    },
    uploader: {
      title: 'Upload Lecture Document or Handwritten Notes',
      subtitle: 'Supports lecture PDFs and image files (PNG, JPG, WEBP)',
      loadSample: 'Try Preloaded Sample Lecture',
      dragDropText: 'Click to select a file, or drag and drop it here',
      dragDropSub: 'Whether a handwritten notebook page, study sheet, or multi-page lecture PDF',
      fileLimit: '· up to 30MB',
      uploadedSuccess: 'Uploaded successfully',
      readyForAnalysis: 'Ready for AI document extraction and analysis',
      replace: 'Replace',
      delete: 'Remove',
      errors: {
        invalidType: 'Unsupported file format. Please upload a PDF or an image (JPG, PNG, WEBP).',
        tooLarge: 'File is too large. Maximum supported file size is 30MB.',
        readFailed: 'Failed to read file from your device. Please try again.',
      },
    },
    notes: {
      badge: 'Structured Study Material',
      stats: (topics, defs) => `${topics} Main Sections · ${defs} Definitions`,
      viewStructured: 'Structured View',
      viewRaw: 'Raw OCR Text',
      viewMarkdown: 'Markdown',
      copy: 'Copy',
      copied: 'Copied!',
      edit: 'Edit Notes',
      save: 'Save Changes',
      overviewTitle: 'Lecture Overview & Concept',
      searchPlaceholder: 'Search topics and section headings...',
      clarificationNote: 'Clarification note:',
      addSubpoint: 'Add Subpoint',
      definitionsTitle: 'Key Scientific Terms & Definitions',
      takeawaysTitle: 'Golden Takeaways & Key Insights',
      rawNoticeTitle: 'Raw Optical Character Recognition (OCR) Output',
      rawNoticeSub: 'This represents exact text parsed by the vision model. Illegible or ambiguous handwriting is marked with [Unreadable] to maintain strict factual integrity.',
      rawPlaceholder: 'No raw extracted text available yet.',
      markdownSub: 'Standard Markdown syntax ready to copy into Notion, Obsidian, or Bear:',
    },
    summary: {
      badge: 'High-Yield Exam Capsule',
      subtitle: 'Concentrated material for rapid revision',
      title: 'Focused Study Summary',
      copyBtn: 'Copy Full Summary',
      copiedBtn: 'Summary Copied!',
      coreIdeaTitle: 'The Big Picture Concept',
      mainPointsTitle: 'Core Topics Explained in the Notes',
      definitionsTitle: 'Crucial Definitions for the Exam',
      quickReviewTitle: 'Rapid Memory Bullets Before the Exam',
      examAlertsTitle: 'High-Priority Exam Alerts & Common Pitfalls',
    },
    questions: {
      badge: 'Interactive Assessment',
      stats: (mcq, tf, sa) => `${mcq} Multiple Choice · ${tf} True/False · ${sa} Short Answer`,
      title: 'Practice Question Bank & Self-Assessment',
      currentScore: 'Current Score',
      resetQuiz: 'Retake Quiz',
      countLabel: 'Target Question Count:',
      autoOption: 'Automatic (Recommended)',
      regenerateBtn: 'Regenerate Quiz Bank',
      generating: 'Generating questions across lecture topics...',
      coverageNotice: 'Question Coverage & Content Density Notice:',
      tabMcq: (count) => `Multiple Choice (${count})`,
      tabTf: (count) => `True / False (${count})`,
      tabShort: (count) => `Short Answer (${count})`,
      correctAlert: 'Correct answer! Great job.',
      incorrectAlert: (ans) => `Not quite right. The correct answer is: (${ans})`,
      trueBtn: 'True',
      falseBtn: 'False',
      correctTfAlert: (val) => `Correct answer! (${val})`,
      incorrectTfAlert: (val) => `Incorrect answer. The correct answer is: (${val})`,
      showAnswer: 'Show Model Answer & Grading Criteria',
      hideAnswer: 'Hide Model Answer',
      modelAnswerTitle: 'Academic Model Answer:',
      criteriaTitle: 'Key elements required for full credit:',
    },
    chat: {
      welcome: (lectureTitle) =>
        `Hello! I'm your Smart Study Tutor for ${
          lectureTitle ? `"${lectureTitle}"` : 'your lecture notes'
        }. You can ask me to explain any difficult concept, provide real-world examples, or quiz you on key points. What would you like to explore?`,
      title: 'Smart Study Tutor (AI Coach)',
      subtitle: 'Answers and explains concepts strictly based on your uploaded material',
      aiBadge: 'Interactive chat powered by Gemini',
      thinking: 'Tutor is thinking and preparing your explanation...',
      placeholder: 'Ask the tutor anything about these notes...',
      send: 'Send',
      samplePrompts: [
        'Explain the most important concept with a real-world example.',
        'What is the trickiest question an examiner might ask from this?',
        'Give me a practice application question not in the quiz bank.',
      ],
    },
    exportModal: {
      title: 'Export & Print Study Materials',
      subtitle: 'Export as crisp vector PDF or download Markdown/Text',
      selectLabel: 'Select the sections you want to include in your PDF document:',
      includeNotesTitle: 'Structured Notes & Outline',
      includeNotesSub: 'Includes headings, bullet points, and definitions table',
      includeSummaryTitle: 'Focused Study Summary',
      includeSummarySub: 'Core idea, rapid memory bullets, and exam alerts',
      includeQuestionsTitle: 'Question Bank & Model Solutions',
      includeQuestionsSub: 'Multiple choice, True/False, and Short answer questions',
      includeRawTitle: 'Original OCR Extracted Text',
      includeRawSub: 'Raw text transcription directly from handwriting',
      printPdfBtn: 'Print & Save as PDF (Clean Vector Layout)',
      downloadMd: 'Download as Markdown (.md)',
      downloadTxt: 'Download as Plain Text (.txt)',
    },
    print: {
      brandHeader: 'AI Study Assistant · مساعد الدراسة الذكي',
      dateLabel: 'Print Date:',
      sourceDoc: 'Source Document:',
      sectionNotes: '1. Structured Lecture Notes & Outline',
      lectureIntro: 'Lecture Introduction:',
      keyDefinitions: 'Key Scientific Terms & Definitions:',
      sectionSummary: '2. High-Yield Exam Summary',
      coreIdea: 'The Core Concept:',
      mainPoints: 'Main Topics & Principles:',
      quickReview: 'Quick Review Bullets:',
      examAlerts: 'Exam Alerts & Watchouts:',
      sectionQuestions: '3. Practice Question Bank & Model Answers',
      mcqTitle: '1. Multiple Choice Questions:',
      tfTitle: '2. True / False Questions:',
      shortTitle: '3. Short Answer Questions & Grading Criteria:',
      modelAnswer: 'Model Answer:',
      criteria: 'Grading Criteria:',
      footerText: 'Generated by AI Study Assistant (مساعد الدراسة الذكي).',
    },
  },
};
