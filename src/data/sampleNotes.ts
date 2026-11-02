import { OrganizedNotes, StudySummary, QuestionBank } from '../types';

export interface SampleDocumentItem {
  id: string;
  title: string;
  category: string;
  fileName: string;
  mimeType: string;
  rawText: string;
  previewUrl?: string;
  organized: OrganizedNotes;
  summary: StudySummary;
  questions: QuestionBank;
}

export const SAMPLE_DOCUMENTS: SampleDocumentItem[] = [
  {
    id: 'sample-ai-lecture',
    title: 'مقدمة في الذكاء الاصطناعي وتعلم الآلة',
    category: 'علوم الحاسب والذكاء الاصطناعي',
    fileName: 'lecture_03_machine_learning_notes.png',
    mimeType: 'image/png',
    rawText: `محاضرة 3: مدخل إلى الذكاء الاصطناعي (AI) وتعلم الآلة (Machine Learning)
تاريخ: 15 أكتوبر 2026 - د. خالد العمري

1. تعريف الذكاء الاصطناعي (Artificial Intelligence):
هو قدرة الآلة أو الحاسوب على محاكاة القدرات العقلية البشرية مثل التفكير، التعلم، وحل المشكلات المعقدة.
ينقسم الذكاء الاصطناعي إلى:
- ذكاء اصطناعي ضيق (Narrow AI): مبرمج لمهمة محددة مثل التعرف على الوجوه، لعب الشطرنج، أو الترجمة الآلية.
- ذكاء اصطناعي عام (General AI / AGI): يمتلك قدرة على فهم وإدراك أي مهمة فكرية مثل العقل البشري (ما زال قيد البحث).

2. ما هو تعلم الآلة (Machine Learning - ML)؟
فرع رئيسي من فروع الذكاء الاصطناعي يمنح الحواسيب القدرة على التعلم من البيانات والتجارب السابقة دون برمجة صريحة لكل خطوة.
المعادلة الأساسية:
البيانات (Data) + التجربة (Experience) = نموذج تنبؤي (Predictive Model)

3. الأنماط الرئيسية للتعلم الآلي:
أ) التعلم الخاضع للإشراف (Supervised Learning):
- يعتمد على بيانات مصنفة (Labeled Data).
- إدخال (X) مع إخراج معلوم (Y).
- أهم المهام:
  * التصنيف (Classification): التنبؤ بفئة (مثل: بريد مزعج / غير مزعج، مريض / سليم).
  * الانحدار (Regression): التنبؤ بقيمة عددية مستمرة (مثل: أسعار العقارات، درجة الحرارة).

ب) التعلم غير الخاضع للإشراف (Unsupervised Learning):
- يعتمد على بيانات غير مصنفة (Unlabeled Data).
- يبحث عن الأنماط والتجمعات المخفية داخل البيانات.
- أهم المهام: التجميع (Clustering) والتقليل من الأبعاد (Dimensionality Reduction).

ج) التعلم المعزز (Reinforcement Learning):
- يتعلم الوكيل (Agent) من خلال التجربة والخطأ داخل بيئة معينة للحصول على أقصى مكافأة (Reward) وتفادي العقوبة (Penalty).
- مستخدم بكثرة في التحكم في الروبوتات وتطوير ألعاب الذكاء.

[ملاحظة مكتوبة بالهامش بخط يد سريع]:
تنبيه هام للاختبار: الفرق الجوهري بين التصنيف والانحدار هو طبيعة المخرجات: التصنيف يخرج فئات منفصلة (Discrete Categories) بينما الانحدار يخرج أرقاماً متصلة (Continuous Values).

4. الشبكات العصبية الاصطناعية (Artificial Neural Networks - ANN):
نماذج حوسبية مستوحاة من الخلايا العصبية البيولوجية في الدماغ البشري.
تتكون من:
- طبقة الإدخال (Input Layer)
- طبقات مخفية (Hidden Layers)
- طبقة الإخراج (Output Layer)
كل اتصال بين العصبونات يحتوي على وزن (Weight) وانحياز (Bias).`,
    organized: {
      title: 'مقدمة في الذكاء الاصطناعي وتعلم الآلة (AI & Machine Learning)',
      overview: 'محاضرة تأسيسية تستعرض مفاهيم الذكاء الاصطناعي وتقسيماته، مع التركيز على أنماط تعلم الآلة الثلاثة ومفاهيم الشبكات العصبية الاصطناعية.',
      topics: [
        {
          heading: '1. ماهية الذكاء الاصطناعي وأنواعه',
          subpoints: [
            'الذكاء الاصطناعي هو محاكاة الأنظمة الحاسوبية للقدرات الإدراكية البشرية كالتفكير والتعلم.',
            'الذكاء الضيق (Narrow AI): ينفذ مهاماً محددة بكفاءة عالية (مثل محركات التوصية والتعرف البصري).',
            'الذكاء العام (General AI): نظام متعدد القدرات يماثل التفكير البشري الشامل.',
          ],
          notes: 'معظم التطبيقات المستخدمة اليوم تندرج تحت الذكاء الاصطناعي الضيق.',
        },
        {
          heading: '2. أنماط تعلم الآلة الرئيسية',
          subpoints: [
            'التعلم الخاضع للإشراف (Supervised): تدريب على بيانات مصنفة مسبقاً (مهمات التصنيف والانحدار).',
            'التعلم غير الخاضع للإشراف (Unsupervised): اكتشاف الأنماط في بيانات غير مصنفة (مهمات التجميع).',
            'التعلم المعزز (Reinforcement): تفاعل الوكيل مع البيئة عبر نظام المكافأة والجزاء.',
          ],
          notes: 'الفرق الأساسي بين التصنيف والانحدار هو طبيعة المتغير التابع (فئات منفصلة مقابل قيم متصلة).',
        },
        {
          heading: '3. بنية الشبكات العصبية الاصطناعية',
          subpoints: [
            'طبقة الإدخال (Input Layer): تستقبل البيانات الأولية.',
            'الطبقات المخفية (Hidden Layers): تقوم بالمعالجة واستخلاص الخصائص المعقدة.',
            'طبقة الإخراج (Output Layer): تقدم القرار أو التوقع النهائي.',
          ],
          notes: 'تعتمد دقة الشبكة على ضبط الأوزان (Weights) والانحياز (Bias) أثناء التدريب.',
        },
      ],
      definitions: [
        {
          term: 'الذكاء الاصطناعي (AI)',
          definition: 'قدرة الأنظمة الحاسوبية على محاكاة السلوك الذكي والتفكير والتعلم البشري.',
        },
        {
          term: 'تعلم الآلة (Machine Learning)',
          definition: 'مجال فرعي من الذكاء الاصطناعي يركز على بناء خوارزميات تتعلم من البيانات لتحسين الأداء تلقائياً دون برمجة صريحة.',
        },
        {
          term: 'البيانات المصنفة (Labeled Data)',
          definition: 'مجموعات بيانات تحتوي على مدخلات ومخرجاتها الصحيحة المحددة مسبقاً لاستخدامها في التعلم الخاضع للإشراف.',
        },
        {
          term: 'التصنيف (Classification)',
          definition: 'مهمة تعلم خاضع للإشراف تهدف للتنبؤ بفئة أو صنف محدد منفصل.',
        },
        {
          term: 'الانحدار (Regression)',
          definition: 'مهمة تعلم خاضع للإشراف تهدف للتنبؤ بقيمة عددية مستمرة غير مقيدة بفئات.',
        },
      ],
      keyTakeaways: [
        'تعلم الآلة هو الأداة العملية الحديثة لتطبيق معظم تقنيات الذكاء الاصطناعي المعاصر.',
        'التعلم الإشرافي يتطلب بيانات ملصقة ومكلفة، بينما التعلم غير الإشرافي يكتشف الهياكل الكامنة.',
        'التصنيف يتعامل مع قيم متقطعة (Discrete) والانحدار يتعامل مع قيم مستمرة (Continuous).',
        'الشبكات العصبية تقتبس آلية عملها من الشبكات البيولوجية في الدماغ.',
      ],
      structuredMarkdown: `# ملخص محاضرة: الذكاء الاصطناعي وتعلم الآلة
**المحاضر:** د. خالد العمري | **التاريخ:** 15 أكتوبر 2026

---

## أولاً: المفاهيم الأساسية
* **الذكاء الاصطناعي (AI):** محاكاة الآلة للقدرات الذهنية البشرية.
* **الذكاء الاصطناعي الضيق:** مهام محددة (مثل التعرف على الوجوه).
* **الذكاء الاصطناعي العام:** محاكاة كاملة للعقل البشري (مستقبلي).

---

## ثانياً: فروع تعلم الآلة (Machine Learning)
1. **التعلم الخاضع للإشراف (Supervised Learning):**
   - مدخلات ومخرجات معلومة.
   - ينقسم إلى: **تصنيف** (فئات منفصلة) و**انحدار** (قيم مستمرة).
2. **التعلم غير الخاضع للإشراف (Unsupervised Learning):**
   - كشف التجمعات والأنماط بدون تصنيف مسبق.
3. **التعلم المعزز (Reinforcement Learning):**
   - التعلم بالمحاكاة والتجربة من خلال المكافأة والعقاب.

---

## ثالثاً: بنية الشبكات العصبية (ANN)
* تتكون من: طبقة إدخال، طبقات خفية، وطبقة إخراج.
* العصبونات ترتبط بأوزان (Weights) وانحياز (Bias) يتم تعديلها للوصول لأدق نموذج.`,
    },
    summary: {
      coreIdea: 'الذكاء الاصطناعي يمكن الآلات من محاكاة العقل البشري، ويعتمد تعلم الآلة على استخراج الأنماط من البيانات عبر ثلاثة أنماط رئيسية هي الإشرافي وغير الإشرافي والمعزز.',
      mainPoints: [
        'الذكاء الاصطناعي نوعان: ضيق (موجود حالياً) وعام (نظري مستقبلي).',
        'تعلم الآلة يعتمد على البيانات والتجربة لبناء نماذج تنبؤية دون برمجة كل خطوة.',
        'التعلم الإشرافي يشمل التصنيف للتصنيفات المنفصلة والانحدار للقيم العددية المستمرة.',
        'الشبكات العصبية الاصطناعية تماثل خلايا الدماغ في معالجة الإشارات عبر طبقات متتالية.',
      ],
      essentialDefinitions: [
        {
          term: 'التعلم الخاضع للإشراف',
          definition: 'تدريب النموذج على أزواج من المدخلات والمخرجات المصنفة مسبقاً.',
        },
        {
          term: 'التعلم المعزز',
          definition: 'تعلم الوكيل البرمجي عبر المكافآت والعقوبات التراكمية في البيئة المحيطة.',
        },
        {
          term: 'التصنيف مقابل الانحدار',
          definition: 'التصنيف ينتج مخرجات منفصلة ومحددة، بينما الانحدار ينتج قيماً عددية مستمرة.',
        },
      ],
      quickReviewBullets: [
        'البيانات + التجربة = نموذج تنبؤي.',
        'التعلم غير الإشرافي لا يحتاج إلى بيانات معنونة أو مخرجات سابقة.',
        'مكونات الشبكة العصبية: طبقة إدخال، طبقات معالجة مخفية، طبقة إخراج.',
      ],
      examAlerts: [
        'سؤال متكرر: ما هو الفرق الجوهري بين مهمة التصنيف (Classification) ومهمة الانحدار (Regression)؟',
        'ركز على أن الشبكات العصبية تضبط الأوزان (Weights) للتقليل من نسبة الخطأ.',
      ],
    },
    questions: {
      multipleChoice: [
        {
          id: 'mcq-1',
          question: 'أي من المهام التالية تُعد مثالاً صريحاً على مهمة انحدار (Regression) في التعلم الخاضع للإشراف؟',
          options: [
            'تصنيف رسائل البريد إلى مزعجة أو غير مزعجة',
            'التنبؤ بالسعر المتوقع لعقار بناءً على مساحته وموقعه',
            'تجميع العملاء المتشابهين في قطاعات تسويقية',
            'تمييز صور القطط عن صور الكلاب',
          ],
          correctIndex: 1,
          explanation: 'الانحدار يختص بالتنبؤ بقيم عددية متصلة ومستمرة مثل أسعار العقارات أو درجات الحرارة، في حين أن الخيارات الأخرى تمثل مهام تصنيف أو تجميع.',
        },
        {
          id: 'mcq-2',
          question: 'ما هو النمط الذي يتعلم فيه الوكيل الذكي بالاعتماد على نظام المكافأة والجزاء (Reward and Penalty)؟',
          options: [
            'التعلم الخاضع للإشراف (Supervised Learning)',
            'التعلم غير الخاضع للإشراف (Unsupervised Learning)',
            'التعلم المعزز (Reinforcement Learning)',
            'التعلم شبه الخاضع للإشراف (Semi-supervised Learning)',
          ],
          correctIndex: 2,
          explanation: 'التعلم المعزز يعتمد بصورة مباشرة على تفاعل الوكيل مع البيئة وتلقي مكافآت لتحفيز السلوك الصحيح وتفادي العقوبات.',
        },
        {
          id: 'mcq-3',
          question: 'ما هي الطبقة المسؤولة عن استقبال البيانات الخام في الشبكات العصبية الاصطناعية؟',
          options: [
            'الطبقة المخفية (Hidden Layer)',
            'طبقة الإخراج (Output Layer)',
            'طبقة الإدخال (Input Layer)',
            'طبقة الانحياز (Bias Layer)',
          ],
          correctIndex: 2,
          explanation: 'تتكون الشبكة العصبية من ثلاث طبقات رئيسية تبدأ دائماً بطبقة الإدخال (Input Layer) التي تستقبل الميزات الخام.',
        },
      ],
      trueFalse: [
        {
          id: 'tf-1',
          statement: 'يستخدم التعلم غير الخاضع للإشراف (Unsupervised Learning) بيانات مصنفة (Labeled Data) للتنبؤ بالنتائج.',
          isTrue: false,
          explanation: 'خطأ؛ التعلم غير الخاضع للإشراف يتعامل حصراً مع بيانات غير مصنفة (Unlabeled Data) لاستكشاف الأنماط والتجمعات الكامنة فيها.',
        },
        {
          id: 'tf-2',
          statement: 'الذكاء الاصطناعي الضيق (Narrow AI) هو الذكاء المبرمج لأداء مهمة محددة بدقة مثل التعرف على الوجوه.',
          isTrue: true,
          explanation: 'صحيح؛ هذا هو التعريف الدقيق للذكاء الاصطناعي الضيق المطبق حالياً في الأنظمة الذكية.',
        },
        {
          id: 'tf-3',
          statement: 'المخرجات في خوارزميات التصنيف (Classification) تكون دائماً قيماً عددية مستمرة.',
          isTrue: false,
          explanation: 'خطأ؛ المخرجات في التصنيف تكون فئات منفصلة ومحددة (Discrete)، بينما القيم المستمرة تتبع الانحدار.',
        },
      ],
      shortAnswer: [
        {
          id: 'sa-1',
          question: 'اشرح باختصار الفرق الأساسي بين مهمتي التصنيف (Classification) والانحدار (Regression).',
          modelAnswer: 'الفرق الأساسي يكمن في طبيعة المتغير المراد التنبؤ به؛ في التصنيف يكون المخرج فئة نوعية منفصلة ومحددة (مثل: مريض/سليم، سبام/عادي)، أما في الانحدار فيكون المخرج قيمة عددية مستمرة غير مقيدة بفئات (مثل: التنبؤ بدرجة الحرارة أو أسعار الأسهم).',
          keyCriteria: [
            'ذكر طبيعة مخرجات التصنيف (فئات منفصلة)',
            'ذكر طبيعة مخرجات الانحدار (قيم عددية مستمرة)',
            'تقديم مثال توضيحي لكل منهما',
          ],
        },
        {
          id: 'sa-2',
          question: 'مما تتكون الشبكة العصبية الاصطناعية وما هو دور الأوزان (Weights) فيها؟',
          modelAnswer: 'تتكون الشبكة العصبية من ثلاث طبقات: طبقة الإدخال، وطبقات مخفية للمعالجة، وطبقة الإخراج. وتمثل الأوزان قوة التأثير وأهمية الاتصال بين كل عصبون وآخر، حيث يتم ضبطها أثناء عملية التدريب لتقليل الخطأ وتحقيق أعلى دقة تنبؤية.',
          keyCriteria: [
            'تحديد الطبقات الثلاث (إدخال، مخفية، إخراج)',
            'توضيح مفهوم الأوزان وتعديلها أثناء التدريب',
          ],
        },
      ],
    },
  },
];

export const SAMPLE_DOCUMENTS_EN: SampleDocumentItem[] = [
  {
    id: 'sample-ai-lecture-en',
    title: 'Introduction to AI & Machine Learning',
    category: 'Computer Science & AI',
    fileName: 'lecture_03_machine_learning_notes.png',
    mimeType: 'image/png',
    rawText: `Lecture 03: Introduction to Artificial Intelligence (AI) & Machine Learning (ML)
Date: October 15, 2026 - Prof. Khalid Al-Omari

1. Definition of Artificial Intelligence (AI):
The capability of a machine or computing system to simulate human mental faculties such as reasoning, learning, and complex problem-solving.
Classification:
- Narrow AI: Programmed for a specialized task (facial recognition, chess, automated translation).
- General AI (AGI): Universal intellectual capability rivaling human cognition across all domains (currently theoretical).

2. What is Machine Learning (ML)?
A foundational branch of AI enabling computers to learn iteratively from data and empirical patterns without explicit per-step code.
Fundamental Formula:
Data + Experience = Predictive Model

3. Primary Learning Paradigms:
A) Supervised Learning:
- Operates on labeled data with known inputs (X) and ground-truth targets (Y).
- Tasks:
  * Classification: Categorical/discrete output (e.g., spam vs non-spam, malignant vs benign).
  * Regression: Continuous numerical output (e.g., housing prices, ambient temperature).

B) Unsupervised Learning:
- Operates on unlabeled data.
- Discovers latent structures and groupings.
- Tasks: Clustering, Dimensionality Reduction.

C) Reinforcement Learning:
- An autonomous agent learns via exploratory actions governed by reward signals and penalty feedback.

[Margin Note in quick handwriting]:
Critical Exam Alert: The core difference between classification and regression lies in target output: classification predicts discrete categories, whereas regression outputs continuous numerical values.

4. Artificial Neural Networks (ANN):
Computational architectures inspired by biological neuron networks in the human brain.
Components:
- Input Layer
- Hidden Layers
- Output Layer
Connections are modulated by Weights and Biases optimized during backpropagation.`,
    organized: {
      title: 'Introduction to AI & Machine Learning Foundations',
      overview: 'Foundational lecture covering core artificial intelligence paradigms, supervised/unsupervised/reinforcement learning frameworks, and artificial neural network topologies.',
      topics: [
        {
          heading: '1. Definition & Taxonomy of Artificial Intelligence',
          subpoints: [
            'AI represents computational systems modeling human cognitive reasoning, perception, and problem-solving.',
            'Narrow AI executes dedicated domain tasks (such as visual detection or recommendation algorithms).',
            'General AI (AGI) represents generalized cognitive problem-solving comparable to human intelligence.',
          ],
          notes: 'Contemporary commercial deployments operate strictly under the Narrow AI umbrella.',
        },
        {
          heading: '2. The Three Machine Learning Paradigms',
          subpoints: [
            'Supervised Learning: Trained on paired labeled inputs and targets (Classification & Regression).',
            'Unsupervised Learning: Uncovers underlying latent geometry without target supervision (Clustering).',
            'Reinforcement Learning: Agent policy optimization through cumulative reward signals.',
          ],
          notes: 'Key distinction: Classification yields discrete categorical outcomes, whereas regression yields continuous metrics.',
        },
        {
          heading: '3. Architecture of Artificial Neural Networks',
          subpoints: [
            'Input Layer: Ingests raw multidimensional feature vectors.',
            'Hidden Layers: Hierarchical non-linear representation extraction.',
            'Output Layer: Emits finalized inference predictions or class probabilities.',
          ],
          notes: 'System accuracy depends on iterative weight and bias optimization during training.',
        },
      ],
      definitions: [
        {
          term: 'Artificial Intelligence (AI)',
          definition: 'The capability of computing systems to simulate human cognitive behavior, learning, and reasoning.',
        },
        {
          term: 'Machine Learning (ML)',
          definition: 'A branch of AI focusing on algorithms that generalize patterns from empirical data without hardcoded rules.',
        },
        {
          term: 'Labeled Data',
          definition: 'Datasets with verified ground-truth target outputs assigned to each input feature instance.',
        },
        {
          term: 'Classification',
          definition: 'A supervised learning task predicting discrete, mutually exclusive class categories.',
        },
        {
          term: 'Regression',
          definition: 'A supervised learning task predicting continuous, numerical quantitative metrics.',
        },
      ],
      keyTakeaways: [
        'Machine learning serves as the primary empirical engine powering modern AI capabilities.',
        'Supervised learning relies on curated ground truth; unsupervised discovers latent representations.',
        'Classification predicts discrete categories, whereas regression estimates continuous scales.',
        'Neural network architectures draw foundational inspiration from biological cognitive circuitry.',
      ],
      structuredMarkdown: `# Lecture Summary: Artificial Intelligence & Machine Learning
**Instructor:** Prof. Khalid Al-Omari | **Date:** October 15, 2026

---

## 1. Core Principles
* **Artificial Intelligence (AI):** Computational simulation of human cognitive capacity.
* **Narrow AI:** Domain-specific execution (e.g., computer vision, speech recognition).
* **General AI (AGI):** Comprehensive cognitive parity with human intelligence.

---

## 2. Machine Learning Paradigms
1. **Supervised Learning:**
   - Paired inputs and verified targets.
   - Divided into **Classification** (discrete) and **Regression** (continuous).
2. **Unsupervised Learning:**
   - Cluster and representation discovery on unlabeled data.
3. **Reinforcement Learning:**
   - Trial-and-error policy iteration governed by reward dynamics.

---

## 3. Neural Network Architecture (ANN)
* Composed of: Input Layer, Hidden Feature Layers, and Output Layer.
* Synaptic connections modulated by adjustable Weights and Biases.`,
    },
    summary: {
      coreIdea: 'AI empowers machines to simulate human mental faculties, driven predominantly by machine learning across supervised, unsupervised, and reinforcement paradigms.',
      mainPoints: [
        'AI is bifurcated into Narrow AI (current specialized implementations) and General AI (theoretical AGI).',
        'Machine learning transforms data and historical experience into predictive inference models.',
        'Supervised learning divides into classification (discrete targets) and regression (continuous scales).',
        'Artificial neural networks process feature representations across input, hidden, and output layers.',
      ],
      essentialDefinitions: [
        {
          term: 'Supervised Learning',
          definition: 'Training algorithms on pre-annotated input-output pairs.',
        },
        {
          term: 'Reinforcement Learning',
          definition: 'Agent training through continuous environmental rewards and penalty signals.',
        },
        {
          term: 'Classification vs. Regression',
          definition: 'Classification predicts categorical classes; regression predicts numerical intervals.',
        },
      ],
      quickReviewBullets: [
        'Data + Experience = Predictive Model.',
        'Unsupervised learning requires zero ground-truth target labels.',
        'ANN layers: Input layer, intermediate hidden layers, and output decision layer.',
      ],
      examAlerts: [
        'High-probability question: Contrast the output formats of classification versus regression tasks.',
        'Remember that weights and biases are iteratively tuned during training to minimize the cost function.',
      ],
    },
    questions: {
      multipleChoice: [
        {
          id: 'mcq-1-en',
          question: 'Which of the following is a classic example of a Regression task in Supervised Learning?',
          options: [
            'Classifying emails into spam or legitimate categories',
            'Predicting the numerical selling price of a home based on location and area',
            'Clustering similar customer shopping habits without labels',
            'Differentiating photos of cats from dogs',
          ],
          correctIndex: 1,
          explanation: 'Regression focuses on predicting continuous numerical values (such as prices or temperature), while the other options describe classification or clustering.',
        },
        {
          id: 'mcq-2-en',
          question: 'Which machine learning paradigm trains an autonomous agent using cumulative reward and penalty feedback?',
          options: [
            'Supervised Learning',
            'Unsupervised Learning',
            'Reinforcement Learning',
            'Semi-supervised Learning',
          ],
          correctIndex: 2,
          explanation: 'Reinforcement learning is fundamentally based on an agent interacting with an environment to maximize cumulative reward.',
        },
        {
          id: 'mcq-3-en',
          question: 'Which layer in an Artificial Neural Network directly receives raw feature data from the dataset?',
          options: [
            'Hidden Layer',
            'Output Layer',
            'Input Layer',
            'Bias Layer',
          ],
          correctIndex: 2,
          explanation: 'Every standard artificial neural network initiates signal processing at the Input Layer, which ingests the raw features.',
        },
      ],
      trueFalse: [
        {
          id: 'tf-1-en',
          statement: 'Unsupervised learning relies on verified labeled datasets to identify target categories.',
          isTrue: false,
          explanation: 'False; unsupervised learning operates exclusively on unlabeled data to discover organic clusters and geometric structure.',
        },
        {
          id: 'tf-2-en',
          statement: 'Narrow AI refers to intelligent systems designed to perform specific designated tasks.',
          isTrue: true,
          explanation: 'True; Narrow AI is tailored for concrete applications such as facial recognition or machine translation.',
        },
        {
          id: 'tf-3-en',
          statement: 'Classification models produce continuous real-numbered values as their primary target output.',
          isTrue: false,
          explanation: 'False; classification outputs discrete categorical classes, whereas continuous numbers are produced by regression models.',
        },
      ],
      shortAnswer: [
        {
          id: 'sa-1-en',
          question: 'Succinctly state the primary distinction between Classification and Regression.',
          modelAnswer: 'The core distinction is target data type: Classification predicts discrete categorical labels (e.g., spam vs ham, disease status), whereas Regression estimates continuous numerical values on a metric scale (e.g., real estate pricing, temperature).',
          keyCriteria: [
            'Identify discrete categorical nature of classification',
            'Identify continuous numerical nature of regression',
            'Supply an illustrative example for each',
          ],
        },
        {
          id: 'sa-2-en',
          question: 'What are the three structural layers of an Artificial Neural Network and what do weights represent?',
          modelAnswer: 'An ANN is structured into an Input Layer (ingesting raw features), Hidden Layers (extracting non-linear representations), and an Output Layer (generating predictions). Weights represent the synaptic connection strengths between neurons, which are adjusted during backpropagation to minimize error.',
          keyCriteria: [
            'Identify Input, Hidden, and Output layers',
            'Explain role of weights as connection strengths adjusted during training',
          ],
        },
      ],
    },
  },
];

