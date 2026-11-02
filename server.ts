import express from 'express';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
import { GoogleGenAI, Type } from '@google/genai';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT ? parseInt(process.env.PORT, 10) : 3000;

app.use(express.json({ limit: '60mb' }));
app.use(express.urlencoded({ limit: '60mb', extended: true }));

// Shared Gemini instance
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

const DEFAULT_MODEL = 'gemini-3.8-flash';

// Health check endpoint
app.get('/api/health', (_req, res) => {
  res.json({
    status: 'ok',
    hasKey: Boolean(process.env.GEMINI_API_KEY),
    timestamp: new Date().toISOString(),
  });
});

/**
 * 1. AI Text Extraction (OCR)
 * Extracts handwritten or printed text from PDF or images (JPG, PNG, WEBP)
 */
app.post('/api/extract', async (req, res) => {
  try {
    const { fileData, mimeType, fileName } = req.body;

    if (!fileData || !mimeType) {
      return res.status(400).json({ error: 'الرجاء توفير بيانات الملف ونوع الوسائط (MIME type).' });
    }

    // Clean base64 string if it contains data URI prefix
    const base64Data = fileData.replace(/^data:[^;]+;base64,/, '');

    const prompt = `أنت نظام استخراج وتحليل مستندات تعليمية متقدم وخبير في التعرف على النصوص المكتوبة بخط اليد والمطبوعة باللغتين العربية والإنجليزية (Educational OCR & Handwriting Recognition Expert).
المهمة:
قم باستخراج جميع النصوص والمعادلات والأرقام والمصطلحات من المستند المرفق بدقة متناهية وبأعلى مستوى من الأمانة العلمية:
1. استخرج النص كما هو دون اختراع أي معلومات غير موجودة في المستند.
2. إذا كان هناك جزء مكتوب بخط يد غير واضح تماماً أو غامض، اكتب بدلاً منه: [غير مقروء: تخمين أو غير واضح].
3. احتفظ بجميع المصطلحات الأجنبية أو الإنجليزية كما هي، والرموز الرياضية إن وجدت.
4. حافظ على الترتيب المنطقي للفقرات والعناوين كما وردت في المستند الأصلي.
5. في بداية الإخراج، أضف ملخصاً سريعاً لحالة المستند في سطر واحد (مثال: "نوع المستند: ملاحظات يدية / صفحات: 1 / اللغة: العربية والإنجليزية").
6. أخرج النص المستخرج بوضوح وتنسيق مرتب، مع المحافظة التامة على المعنى الأصلي.`;

    const response = await ai.models.generateContent({
      model: DEFAULT_MODEL,
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: mimeType,
              data: base64Data,
            },
          },
          {
            text: prompt,
          },
        ],
      },
    });

    const rawText = response.text || '';
    if (!rawText.trim()) {
      return res.status(500).json({ error: 'لم يتمكن الذكاء الاصطناعي من استخراج أي نص من المستند المرفق.' });
    }

    return res.json({
      success: true,
      fileName,
      extractedText: rawText,
    });
  } catch (err: any) {
    console.error('Error in /api/extract:', err);
    return res.status(500).json({
      error: err.message || 'حدث خطأ أثناء معالجة المستند واستخراج النصوص.',
    });
  }
});

/**
 * 2. Organize Notes
 * Formats extracted text into clean, structured digital study materials
 */
app.post('/api/organize', async (req, res) => {
  try {
    const { rawText, subject, language = 'ar' } = req.body;

    if (!rawText || !rawText.trim()) {
      return res.status(400).json({ error: 'الرجاء توفير النص المستخرج لتنظيمه.' });
    }

    const isEn = language === 'en';

    const prompt = isEn
      ? `You are an academic note organization and curriculum specialist.
Based strictly on the following extracted document text:
${rawText}

Convert this text into a clean, well-structured digital study note:
1. Main title (title)
2. Comprehensive lecture overview or introduction (overview)
3. Structured topics list (topics): each with heading, subpoints array, and optional clarifying notes.
4. Key scientific definitions and terms (definitions): term and exact definition.
5. Golden key takeaways (keyTakeaways): 4-7 critical review insights.
6. Full text formatted cleanly in Markdown (structuredMarkdown).

Write your entire response in English. Strictly do not fabricate missing facts.`
      : `أنت خبير في تنظيم المحتوى الأكاديمي وصياغة دفاتر الملاحظات الجامعية المنظمة (Note Organization Expert).
بناءً على النص التعليمي المستخرج التالي حصراً وبدون اختراع أي معلومات خارجية:
${rawText}

قم بتحويل هذا النص إلى مذكرة دراسية رقمية احترافية منظمة جداً تحتوي على:
1. عنوان المحاضرة الرئيسي (title)
2. مقدمة عامة أو فكرة المحاضرة (overview)
3. قائمة بالمحاور والموضوعات المنظمة (topics)، حيث كل محور له عنوان رئيسي (heading) ونقاط فرعية مشروحة (subpoints) وشرح أو ملاحظات إضافية (notes).
4. جدول التعريفات والمصطلحات الأساسية الواردة (definitions): المصطلح (term) والتعريف الدقيق كما جاء بالمستند (definition).
5. النقاط الذهبية وأهم الخلاصات (keyTakeaways): 4-7 نقاط محورية للاستذكار.
6. النص الكامل منسقاً بأسلوب Markdown غني وواضح (structuredMarkdown).

يجب ألا تضيف أي معلومة لا تستند إلى النص المصدر. أجب بصيغة JSON وفق المخطط المطلوب.`;

    const response = await ai.models.generateContent({
      model: DEFAULT_MODEL,
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            title: { type: Type.STRING, description: 'عنوان المحاضرة أو الموضوع' },
            overview: { type: Type.STRING, description: 'مقدمة وفكرة عامة عن المحتوى' },
            topics: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  heading: { type: Type.STRING, description: 'عنوان المحور أو القسم' },
                  subpoints: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                    description: 'النقاط الفرعية والأفكار التفصيلية',
                  },
                  notes: { type: Type.STRING, description: 'شرح أو أمثلة أو توضيح' },
                },
                required: ['heading', 'subpoints'],
              },
            },
            definitions: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  term: { type: Type.STRING, description: 'المصطلح أو المفهوم العلمي' },
                  definition: { type: Type.STRING, description: 'التعريف الدقيق كما ورد في النص' },
                },
                required: ['term', 'definition'],
              },
            },
            keyTakeaways: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: 'أهم النقاط الجوهرية والنتائج',
            },
            structuredMarkdown: {
              type: Type.STRING,
              description: 'النص الكامل منسقاً بـ Markdown جاهز للعرض والطباعة',
            },
          },
          required: ['title', 'overview', 'topics', 'definitions', 'keyTakeaways', 'structuredMarkdown'],
        },
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    return res.json({ success: true, data: parsed });
  } catch (err: any) {
    console.error('Error in /api/organize:', err);
    return res.status(500).json({
      error: err.message || 'حدث خطأ أثناء تنظيم الملاحظات الدراسية.',
    });
  }
});

/**
 * 3. AI Summary
 * Creates a focused study and exam-revision summary based strictly on the uploaded content
 */
app.post('/api/summary', async (req, res) => {
  try {
    const { text, title, language = 'ar' } = req.body;

    if (!text || !text.trim()) {
      return res.status(400).json({ error: 'الرجاء توفير النص لإنشاء الملخص.' });
    }

    const isEn = language === 'en';

    const prompt = isEn
      ? `You are an academic specialist in high-yield exam revision summaries.
Based strictly and exclusively on the following text:
${text}

Create a focused study summary including:
1. Big picture concept in 1-2 sentences (coreIdea).
2. 3-5 main key points explained (mainPoints).
3. Crucial definitions that are prime candidates for exam questions (essentialDefinitions: term, definition).
4. Rapid memory bullets (quickReviewBullets): direct, bite-sized revision points.
5. High-priority exam alerts and common pitfalls (examAlerts).

Write the summary in English. Strictly do not invent facts outside this text. Return as JSON.`
      : `أنت أستاذ أكاديمي متخصص في إعداد كبسولات المراجعة السريعة والملخصات المركزة للامتحانات (High-Yield Exam Summary Specialist).
استند فقط وحصراً إلى النص الأكاديمي التالي:
${text}

قم بإنشاء ملخص دراسي مكثف للمراجعة النهائية يشمل:
1. الفكرة الكبرى للموضوع في جملتين (coreIdea).
2. أهم 3-5 أفكار رئيسية تم شرحها في المستند (mainPoints).
3. التعريفات الحاسمة التي يُتوقع سؤال الامتحان عنها (essentialDefinitions: term, definition).
4. كبسولات الحفظ السريع (quickReviewBullets): نقاط سريعة مباشرة للمذاكرة.
5. تنبيهات امتحانية وفروقات دقيقة (examAlerts): نقاط هامة يسهل الخلط بينها أو أكد عليها المحاضر.

يُحظر اختلاق أي وقائع غير موجودة في النص. أجب بتنسيق JSON حصراً.`;

    const response = await ai.models.generateContent({
      model: DEFAULT_MODEL,
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            coreIdea: { type: Type.STRING, description: 'الفكرة العامة المركزة' },
            mainPoints: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: 'الأفكار والمحاور الرئيسية المستفادة',
            },
            essentialDefinitions: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  term: { type: Type.STRING },
                  definition: { type: Type.STRING },
                },
                required: ['term', 'definition'],
              },
            },
            quickReviewBullets: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: 'نقاط المراجعة السريعة',
            },
            examAlerts: {
              type: Type.ARRAY,
              items: { type: Type.STRING },
              description: 'تنبيهات وملاحظات للامتحان',
            },
          },
          required: ['coreIdea', 'mainPoints', 'essentialDefinitions', 'quickReviewBullets', 'examAlerts'],
        },
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    return res.json({ success: true, summary: parsed });
  } catch (err: any) {
    console.error('Error in /api/summary:', err);
    return res.status(500).json({
      error: err.message || 'حدث خطأ أثناء توليد الملخص الدراسي.',
    });
  }
});

/**
 * 4. Study Questions
 * Generates MCQs, True/False, and Short Answer questions with explanations
 */
app.post('/api/questions', async (req, res) => {
  try {
    const { text, language = 'ar', questionCount = 'auto' } = req.body;

    if (!text || !text.trim()) {
      return res.status(400).json({ error: 'الرجاء توفير النص لإنشاء الأسئلة.' });
    }

    const isEn = language === 'en';
    const isAuto = questionCount === 'auto' || !questionCount;
    const targetCountNum = !isAuto ? parseInt(questionCount.toString(), 10) : null;

    const countInstructionEn = isAuto
      ? `Determine the optimal total number of questions (typically between 6 and 14) based on lecture length, depth, and unique concepts.`
      : `Target generating exactly ${targetCountNum} questions distributed across all topics of the lecture.
Mix guidelines for ${targetCountNum} questions:
- Approximately 50% Multiple Choice (multipleChoice)
- Approximately 30% True/False (trueFalse)
- Approximately 20% Short Answer (shortAnswer)
CRITICAL FACTUAL INTEGRITY RULE:
Never generate duplicate, irrelevant, or fabricated questions just to reach ${targetCountNum}.
If the source material does not contain enough unique factual information or concepts to yield ${targetCountNum} distinct, high-quality questions without repeating or hallucinating, generate only the valid distinct questions available, and set 'noteIfNotReached' to an explanation explaining that the lecture content density was insufficient for ${targetCountNum} distinct questions and how many could legitimately be formed. Otherwise, leave 'noteIfNotReached' empty.`;

    const countInstructionAr = isAuto
      ? `حدد العدد الأنسب للأسئلة (عادة بين 6 إلى 14 سؤالاً) وفقاً لطول المحاضرة وكثافتها والمفاهيم الجوهرية المتوفرة.`
      : `استهدف توليد ${targetCountNum} سؤالاً بدقة موزعة على كافة محاور المحاضرة.
نسب التوزيع المستهدفة لـ ${targetCountNum} سؤالاً:
- حوالي 50% أسئلة اختيار من متعدد (multipleChoice)
- حوالي 30% أسئلة صواب أو خطأ (trueFalse)
- حوالي 20% أسئلة مقالية قصيرة (shortAnswer)
قاعدة الأمانة العلمية الصارمة:
لا تقم أبداً بتكرار الأسئلة أو اختلاق معلومات وهمية لمجرد الوصول إلى الرقم ${targetCountNum}.
إذا كانت المحاضرة لا تحتوي على تفاصيل ومفاهيم كافية لتوليد ${targetCountNum} سؤالاً متميزاً دون تكرار أو حشو، فولد فقط الأسئلة الحقيقية المتاحة، واكتب في حقل 'noteIfNotReached' شرحاً يوضح أن كثافة المحاضرة لم تسمح بالوصول لـ ${targetCountNum} سؤال دون تكرار وكم سؤالاً تمت صياغته بدقة. وإلا فاجعل 'noteIfNotReached' نصاً فارغاً.`;

    const prompt = isEn
      ? `You are an educational assessment and testing specialist.
Formulate a comprehensive, balanced self-assessment question bank based strictly on this text:
${text}

Question Count Specification:
${countInstructionEn}

Distribution & Quality:
1. Ensure balanced coverage across all sections and topics of the lecture.
2. Formulate 3 categories of questions:
   - Multiple Choice (multipleChoice): 4 plausible options, correctIndex (0-3), and clear educational explanation.
   - True or False (trueFalse): concise statement, isTrue boolean, and explanation.
   - Short Answer (shortAnswer): conceptual question, modelAnswer, and keyCriteria list.
3. Write your output in English. Return strictly as JSON.`
      : `أنت خبير قياس وتقويم تربوي وإعداد الاختبارات الدراسية (Educational Assessment Specialist).
مهمتك: صياغة بنك أسئلة شامل ومتنوع وممتع للتقييم الذاتي للمستند التالي فقط:
${text}

مواصفات عدد الأسئلة:
${countInstructionAr}

التوزيع والجودة:
1. وزع الأسئلة بتوازن على كافة محاور وأفكار المحاضرة لضمان التغطية الشاملة.
2. أعد 3 أنواع من الأسئلة:
   - أسئلة اختيار من متعدد (multipleChoice): 4 خيارات، ومؤشر الخيار الصحيح (0-3)، وتفسير تعليمي واضح.
   - أسئلة صواب أو خطأ (trueFalse): عبارة واضحة، وهل هي صحيحة أم خاطئة، وتوضيح السبب مستنداً للنص.
   - أسئلة إجابة قصيرة (shortAnswer): سؤال يقيس الفهم، مع نموذج الإجابة المثالية (modelAnswer) والنقاط الأساسية الواجب ذكرها (keyCriteria).
3. أجب بتنسيق JSON.`;

    const response = await ai.models.generateContent({
      model: DEFAULT_MODEL,
      contents: prompt,
      config: {
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            multipleChoice: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  question: { type: Type.STRING },
                  options: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                    description: 'أربعة خيارات',
                  },
                  correctIndex: { type: Type.INTEGER, description: 'مؤشر الخيار الصحيح من 0 إلى 3' },
                  explanation: { type: Type.STRING, description: 'شرح وتفسير الإجابة الصحيحة' },
                },
                required: ['id', 'question', 'options', 'correctIndex', 'explanation'],
              },
            },
            trueFalse: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  statement: { type: Type.STRING },
                  isTrue: { type: Type.BOOLEAN },
                  explanation: { type: Type.STRING },
                },
                required: ['id', 'statement', 'isTrue', 'explanation'],
              },
            },
            shortAnswer: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  id: { type: Type.STRING },
                  question: { type: Type.STRING },
                  modelAnswer: { type: Type.STRING },
                  keyCriteria: {
                    type: Type.ARRAY,
                    items: { type: Type.STRING },
                  },
                },
                required: ['id', 'question', 'modelAnswer', 'keyCriteria'],
              },
            },
            noteIfNotReached: {
              type: Type.STRING,
              description: 'توضيح إذا تعذر بلوغ العدد المطلوب من الأسئلة بسبب قصر المحتوى أو قلته',
            },
          },
          required: ['multipleChoice', 'trueFalse', 'shortAnswer'],
        },
      },
    });

    const parsed = JSON.parse(response.text || '{}');
    const totalActual =
      (parsed.multipleChoice?.length || 0) +
      (parsed.trueFalse?.length || 0) +
      (parsed.shortAnswer?.length || 0);

    parsed.requestedCount = questionCount;
    parsed.actualCount = totalActual;

    return res.json({ success: true, questions: parsed });
  } catch (err: any) {
    console.error('Error in /api/questions:', err);
    return res.status(500).json({
      error: err.message || 'حدث خطأ أثناء توليد بنك الأسئلة.',
    });
  }
});

/**
 * 5. AI Study Tutor Chat
 * Answers user questions and explains concepts based on the notes
 */
app.post('/api/chat', async (req, res) => {
  try {
    const { messages, contextNotes, language = 'ar' } = req.body;

    if (!messages || !Array.isArray(messages)) {
      return res.status(400).json({ error: 'الرجاء توفير سجل الرسائل.' });
    }

    const isEn = language === 'en';

    const systemInstruction = isEn
      ? `You are the "Smart Study Tutor", an encouraging, patient, and knowledgeable academic coach.
Mission: Help the student understand and master their lecture notes:
=== CONTEXT LECTURE NOTES ===
${contextNotes || 'No notes uploaded yet.'}
=============================

Rules:
1. Explain clearly in English, breaking down complex terminology with intuitive examples.
2. If the user asks something outside the notes, politely clarify and provide concise guidance.
3. Use bullet points and clear formatting.`
      : `أنت "المعلم الذكي"، رفيق دراسة ذكي وصبور ومشجع للطالب يتحدث باللغة العربية الفصحى السلسة والمحفزة.
مهمتك:
مساعدة الطالب في فهم واستيعاب المحاضرة بناءً على الملاحظات الدراسية المرفقة التالية:
=== سياق الملاحظات الدراسية ===
${contextNotes || 'لم يتم رفع ملاحظات بعد.'}
==============================

القواعد:
1. أجب بدقة وشرح وافٍ باللغة العربية، واشرح المصطلحات المعقدة بأمثلة مبسطة.
2. إذا سأل الطالب عن شيء لم يرد في الملاحظات، وضح له ذلك بأدب ثم أجب عليه إذا كان ذا صلة بالموضوع الأكاديمي مع التنويه بأنه معلومة إثرائية خارج نص الملاحظات.
3. استخدم التنسيق النقطي والعناوين الواضحة لتسهيل القراءة.
4. شجع الطالب بعبارات إيجابية مثل "سؤال ممتاز!" أو "أحسنت في التركيز على هذه النقطة".`;

    const chat = ai.chats.create({
      model: DEFAULT_MODEL,
      config: {
        systemInstruction: systemInstruction,
      },
    });

    const lastUserMessage = messages[messages.length - 1]?.content || (isEn ? 'Hello, please help me study.' : 'مرحباً، ساعدني في فهم هذه الملاحظات.');
    const response = await chat.sendMessage({
      message: lastUserMessage,
    });

    return res.json({
      success: true,
      reply: response.text || (isEn ? 'Could not generate reply.' : 'عذراً، لم أتمكن من تكوين إجابة الآن.'),
    });
  } catch (err: any) {
    console.error('Error in /api/chat:', err);
    return res.status(500).json({
      error: err.message || 'حدث خطأ أثناء المحادثة مع المعلم الذكي.',
    });
  }
});

/**
 * 6. Quick Complete Pipeline
 * Runs extraction, organization, summary, and questions in sequence
 */
app.post('/api/process-all', async (req, res) => {
  try {
    const { fileData, mimeType, fileName } = req.body;

    if (!fileData || !mimeType) {
      return res.status(400).json({ error: 'الرجاء توفير بيانات الملف.' });
    }

    const base64Data = fileData.replace(/^data:[^;]+;base64,/, '');

    // Step 1: Extract
    const extractResponse = await ai.models.generateContent({
      model: DEFAULT_MODEL,
      contents: {
        parts: [
          {
            inlineData: {
              mimeType: mimeType,
              data: base64Data,
            },
          },
          {
            text: `استخرج النص المكتوب بدقة تامة من هذه الصفحة أو المستند التعليمي، سواء كان بخط اليد أو مطبوعاً، باللغتين العربية والإنجليزية. لا تخترع أي معلومات. إذا كان هناك جزء غير واضح، اكتب [غير مقروء].`,
          },
        ],
      },
    });

    const rawText = extractResponse.text || '';
    if (!rawText.trim()) {
      return res.status(500).json({ error: 'لم نتمكن من استخراج نص واضح من المستند.' });
    }

    // Step 2 & 3 & 4 in parallel using rawText
    const [organizeRes, summaryRes, questionsRes] = await Promise.all([
      // Organize
      ai.models.generateContent({
        model: DEFAULT_MODEL,
        contents: `نظّم النص الأكاديمي التالي في مذكرة دراسية محكمة وفق المخطط المطلوب: ${rawText}`,
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              overview: { type: Type.STRING },
              topics: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    heading: { type: Type.STRING },
                    subpoints: { type: Type.ARRAY, items: { type: Type.STRING } },
                    notes: { type: Type.STRING },
                  },
                  required: ['heading', 'subpoints'],
                },
              },
              definitions: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    term: { type: Type.STRING },
                    definition: { type: Type.STRING },
                  },
                  required: ['term', 'definition'],
                },
              },
              keyTakeaways: { type: Type.ARRAY, items: { type: Type.STRING } },
              structuredMarkdown: { type: Type.STRING },
            },
            required: ['title', 'overview', 'topics', 'definitions', 'keyTakeaways', 'structuredMarkdown'],
          },
        },
      }),

      // Summary
      ai.models.generateContent({
        model: DEFAULT_MODEL,
        contents: `أعد ملخص مراجعة سريعة للمستند الأكاديمي التالي: ${rawText}`,
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              coreIdea: { type: Type.STRING },
              mainPoints: { type: Type.ARRAY, items: { type: Type.STRING } },
              essentialDefinitions: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    term: { type: Type.STRING },
                    definition: { type: Type.STRING },
                  },
                  required: ['term', 'definition'],
                },
              },
              quickReviewBullets: { type: Type.ARRAY, items: { type: Type.STRING } },
              examAlerts: { type: Type.ARRAY, items: { type: Type.STRING } },
            },
            required: ['coreIdea', 'mainPoints', 'essentialDefinitions', 'quickReviewBullets', 'examAlerts'],
          },
        },
      }),

      // Questions
      ai.models.generateContent({
        model: DEFAULT_MODEL,
        contents: `صغ بنك أسئلة شامل (اختيار من متعدد، صح وخطأ، وإجابات قصيرة) للمحتوى التالي: ${rawText}`,
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              multipleChoice: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    id: { type: Type.STRING },
                    question: { type: Type.STRING },
                    options: { type: Type.ARRAY, items: { type: Type.STRING } },
                    correctIndex: { type: Type.INTEGER },
                    explanation: { type: Type.STRING },
                  },
                  required: ['id', 'question', 'options', 'correctIndex', 'explanation'],
                },
              },
              trueFalse: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    id: { type: Type.STRING },
                    statement: { type: Type.STRING },
                    isTrue: { type: Type.BOOLEAN },
                    explanation: { type: Type.STRING },
                  },
                  required: ['id', 'statement', 'isTrue', 'explanation'],
                },
              },
              shortAnswer: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    id: { type: Type.STRING },
                    question: { type: Type.STRING },
                    modelAnswer: { type: Type.STRING },
                    keyCriteria: { type: Type.ARRAY, items: { type: Type.STRING } },
                  },
                  required: ['id', 'question', 'modelAnswer', 'keyCriteria'],
                },
              },
            },
            required: ['multipleChoice', 'trueFalse', 'shortAnswer'],
          },
        },
      }),
    ]);

    const organizedData = JSON.parse(organizeRes.text || '{}');
    const summaryData = JSON.parse(summaryRes.text || '{}');
    const questionsData = JSON.parse(questionsRes.text || '{}');

    return res.json({
      success: true,
      extractedText: rawText,
      organized: organizedData,
      summary: summaryData,
      questions: questionsData,
    });
  } catch (err: any) {
    console.error('Error in /api/process-all:', err);
    return res.status(500).json({
      error: err.message || 'حدث خطأ أثناء معالجة المستند الشاملة.',
    });
  }
});

// Serve frontend in dev via Vite middlewares, or static files in production
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.join(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.join(__dirname, 'dist', 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`AI Study Assistant server is running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
