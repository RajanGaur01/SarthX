// SarthX AI Service for SarthX Portal
// Handles conversational citizen inquiries & smart semantic scheme search

const SARTHX_API_KEY = (typeof import.meta !== 'undefined' && import.meta.env)
  ? (import.meta.env.VITE_SARTHX_AI_KEY || import.meta.env.VITE_GEMINI_API_KEY || '')
  : '';
const PRIMARY_MODEL = 'gemini-2.5-flash';
const FALLBACK_MODEL = 'gemini-flash-latest';

/**
 * Helper to call SarthX AI backend
 */
async function callSarthxAi(contents, systemInstruction = '', model = PRIMARY_MODEL, isJson = false) {
  if (!SARTHX_API_KEY) {
    throw new Error('SarthX AI API key not configured. Falling back to built-in scheme matcher.');
  }
  const url = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${SARTHX_API_KEY}`;

  const body = {
    contents,
    generationConfig: {
      temperature: isJson ? 0.1 : 0.7,
      topP: 0.95,
      maxOutputTokens: 1024,
      ...(isJson ? { responseMimeType: 'application/json' } : {})
    }
  };

  if (systemInstruction) {
    body.systemInstruction = {
      parts: [{ text: systemInstruction }]
    };
  }

  try {
    const res = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(body)
    });

    if (!res.ok) {
      if (model !== FALLBACK_MODEL) {
        console.warn('SarthX AI primary model busy, switching to alternate model...');
        return callSarthxAi(contents, systemInstruction, FALLBACK_MODEL, isJson);
      }
      const errText = await res.text();
      throw new Error(`SarthX AI Error (${res.status}): ${errText}`);
    }

    const data = await res.json();
    const candidate = data.candidates?.[0];
    const text = candidate?.content?.parts?.[0]?.text || '';
    return text;
  } catch (error) {
    console.warn('SarthX AI Service Notice:', error.message || error);
    throw error;
  }
}

/**
 * Formats user profile context for AI reasoning
 */
function buildCitizenContext(user) {
  if (!user) return 'Citizen is browsing as an anonymous guest.';
  return `Citizen Profile:
- Name: ${user.name || 'Citizen'}
- Age: ${user.age || 'Not specified'}
- Gender: ${user.gender || 'Not specified'}
- State: ${user.state || 'India'}
- Caste / Category: ${user.caste || 'General'}
- Annual Income: ${user.income ? '₹' + Number(user.income).toLocaleString('en-IN') : 'Not declared'}
- Occupation: ${user.occupation || 'Not declared'}
- Business / Project: ${user.business?.name ? `${user.business.name} (${user.business.purposeOfFunding || ''}, Cost: ₹${user.business.totalProjectCost || ''})` : 'None'}`;
}

/**
 * Conversational SarthX AI Assistant (Chatbot)
 * Interacts with citizen, explains policies, eligibility, documents, and recommends schemes.
 */
export async function askSarthxChat({
  messages,
  latestQuery,
  user,
  schemesList = []
}) {
  // Compress schemes for grounding context
  const schemesCatalog = schemesList.slice(0, 40).map(s => ({
    id: s.id,
    title: s.title,
    category: s.category,
    benefit: s.benefit,
    targetAudience: s.targetAudience,
    tags: s.tags?.slice(0, 4)
  }));

  const systemPrompt = `You are "SarthX AI Sahayak", the official, empathetic, and highly knowledgeable citizen welfare AI assistant on the SarthX GovTech Portal (Government of India welfare & Direct Benefit Transfer portal). Powered by SarthX AI.

Your Mission:
1. Help citizens discover relevant government welfare schemes, subsidies, loans (Mudra, PMEGP, KCC), healthcare (Ayushman Bharat), education scholarships, and housing benefits.
2. Explain complex eligibility rules, document requirements (Aadhaar, PAN, Income/Caste certificates), and application steps in simple, respectful language.
3. If the user writes in Hindi, respond in clean Hindi (or easy Hinglish). If English, respond in professional, friendly English.
4. When relevant schemes match their situation, explicitly mention their exact titles and why they qualify.
5. Emphasize that on SarthX, applications are direct, zero-brokerage, secure, and authenticated.
6. Do NOT mention third-party AI brand names. You are strictly SarthX AI.

Available Schemes Knowledgebase (sample):
${JSON.stringify(schemesCatalog)}

${buildCitizenContext(user)}

Output instructions:
- Be concise (2 to 4 short paragraphs or bullet points).
- At the very end of your response, if any specific scheme IDs from the database match the user's intent, output an exact line:
MATCHED_SCHEME_IDS: [comma separated scheme IDs, e.g. mudra-yojana, pm-kisan]
(If none match, omit this line or output MATCHED_SCHEME_IDS: none).`;

  // Build multi-turn contents
  const contents = [];

  // Recent history (last 6 messages)
  const history = (messages || []).slice(-6);
  for (const m of history) {
    if (m.sender === 'user') {
      contents.push({ role: 'user', parts: [{ text: m.text }] });
    } else if (m.sender === 'assistant' && m.text) {
      contents.push({ role: 'model', parts: [{ text: m.text }] });
    }
  }

  // Add the latest query
  contents.push({ role: 'user', parts: [{ text: latestQuery }] });

  try {
    const rawResponse = await callSarthxAi(contents, systemPrompt, PRIMARY_MODEL, false);

    // Extract MATCHED_SCHEME_IDS tag if present
    let matchedIds = [];
    let cleanText = rawResponse;

    const matchLine = rawResponse.match(/MATCHED_SCHEME_IDS:\s*\[?([^\]\n]+)\]?/i);
    if (matchLine) {
      const idsPart = matchLine[1].trim();
      if (idsPart.toLowerCase() !== 'none') {
        matchedIds = idsPart.split(',').map(s => s.trim().replace(/['"]/g, '')).filter(Boolean);
      }
      cleanText = rawResponse.replace(/MATCHED_SCHEME_IDS:.*$/im, '').trim();
    }

    // Resolve matched scheme objects
    let matchedSchemes = [];
    if (matchedIds.length > 0) {
      matchedSchemes = schemesList.filter(s => matchedIds.some(id => s.id.toLowerCase() === id.toLowerCase() || s.title.toLowerCase().includes(id.toLowerCase())));
    }

    return {
      text: cleanText,
      matchedSchemes: matchedSchemes.slice(0, 3)
    };
  } catch (err) {
    console.warn('SarthX AI chat notice:', err.message || err);
    throw err;
  }
}

/**
 * Resilient JSON parsing helper
 * Handles markdown backticks, unescaped newlines/quotes, and partial responses
 */
function safeParseSmartSearchResponse(raw, searchQuery, schemesList) {
  if (!raw || typeof raw !== 'string') return null;

  // Step 1: Strip markdown codeblocks
  let cleaned = raw.replace(/```json/gi, '').replace(/```/gi, '').trim();

  // Step 2: Try direct JSON.parse
  try {
    const parsed = JSON.parse(cleaned);
    if (parsed && typeof parsed === 'object') return sanitizeParsedResult(parsed, searchQuery);
  } catch (e1) {
    // Continue to next recovery steps
  }

  // Step 3: Extract outermost JSON object { ... }
  const jsonMatch = cleaned.match(/\{[\s\S]*\}/);
  if (jsonMatch) {
    const candidateJson = jsonMatch[0];
    try {
      const parsed = JSON.parse(candidateJson);
      if (parsed && typeof parsed === 'object') return sanitizeParsedResult(parsed, searchQuery);
    } catch (e2) {
      // Step 4: Try sanitizing unescaped newlines inside strings
      try {
        const sanitized = candidateJson.replace(/"([^"\\]*(?:\\.[^"\\]*)*)"/g, (match) => {
          return match.replace(/\r?\n/g, ' ');
        });
        const parsed = JSON.parse(sanitized);
        if (parsed && typeof parsed === 'object') return sanitizeParsedResult(parsed, searchQuery);
      } catch (e3) {
        // Step 5: Regex extraction fallback
        try {
          const matchedIds = [];
          for (const scheme of schemesList) {
            if (candidateJson.toLowerCase().includes(scheme.id.toLowerCase())) {
              matchedIds.push(scheme.id);
            }
          }

          const catMatch = candidateJson.match(/"suggestedCategory"\s*:\s*"([^"]+)"/i);
          const reasonMatch = candidateJson.match(/"briefReason"\s*:\s*"((?:[^"\\]|\\.)*)"/i) || candidateJson.match(/"briefReason"\s*:\s*([^,\n}]+)/i);

          return {
            matchedSchemeIds: matchedIds.slice(0, 5),
            suggestedCategory: catMatch ? catMatch[1] : 'all',
            briefReason: reasonMatch ? reasonMatch[1].replace(/["']/g, '').trim() : `Curated welfare schemes for "${searchQuery}"`
          };
        } catch (e4) {
          // Hand off to local semantic matcher
        }
      }
    }
  }

  return null;
}

function sanitizeParsedResult(parsed, searchQuery) {
  return {
    matchedSchemeIds: Array.isArray(parsed.matchedSchemeIds) ? parsed.matchedSchemeIds : [],
    suggestedCategory: typeof parsed.suggestedCategory === 'string' ? parsed.suggestedCategory : 'all',
    briefReason: typeof parsed.briefReason === 'string' ? parsed.briefReason : `Curated welfare schemes for "${searchQuery}"`
  };
}

/**
 * Instant local semantic matching algorithm
 * Guarantees zero failures and zero console errors even when offline
 */
function localSemanticSchemeMatch(searchQuery, schemesList) {
  if (!searchQuery || !schemesList.length) return null;
  const q = searchQuery.toLowerCase().trim();
  const tokens = q.split(/\s+/).filter(t => t.length > 2);

  const categoryKeywords = {
    agriculture: ['farm', 'farmer', 'kisan', 'crop', 'krishi', 'soil', 'irrigation', 'seed', 'fertilizer', 'tractor'],
    students: ['student', 'scholarship', 'study', 'school', 'college', 'education', 'exam', 'fees', 'tuition'],
    women: ['women', 'woman', 'girl', 'mahila', 'mother', 'maternity', 'daughter', 'shakti'],
    business: ['business', 'loan', 'mudra', 'startup', 'shop', 'msme', 'vendor', 'subsidy', 'funding', 'commercial', 'pmegp'],
    health: ['health', 'hospital', 'medical', 'ayushman', 'treatment', 'doctor', 'medicine', 'illness', 'insurance'],
    housing: ['house', 'housing', 'awas', 'home', 'shelter', 'flat', 'construction', 'plot'],
    social: ['pension', 'old', 'senior', 'disabled', 'divyang', 'widow', 'ration', 'bpl', 'poor', 'food']
  };

  let bestCategory = 'all';
  let bestCatScore = 0;

  for (const [cat, kws] of Object.entries(categoryKeywords)) {
    let score = 0;
    for (const kw of kws) {
      if (q.includes(kw)) score += 2;
      for (const tok of tokens) {
        if (tok.includes(kw) || kw.includes(tok)) score += 1;
      }
    }
    if (score > bestCatScore) {
      bestCatScore = score;
      bestCategory = cat;
    }
  }

  // Score and rank catalog schemes
  const scored = schemesList.map(s => {
    let score = 0;
    const text = `${s.title} ${s.category} ${s.benefit} ${s.brief} ${(s.tags || []).join(' ')} ${s.targetAudience || ''}`.toLowerCase();
    
    if (text.includes(q)) score += 10;
    for (const tok of tokens) {
      if (text.includes(tok)) score += 2;
    }
    if (s.category === bestCategory && bestCategory !== 'all') score += 3;
    return { id: s.id, score };
  });

  scored.sort((a, b) => b.score - a.score);
  const matchedSchemeIds = scored.filter(s => s.score > 0).slice(0, 5).map(s => s.id);

  if (matchedSchemeIds.length === 0) return null;

  return {
    matchedSchemeIds,
    suggestedCategory: bestCategory,
    briefReason: `SarthX AI matched relevant central and state welfare programs for "${searchQuery}".`
  };
}

/**
 * Smart Search with SarthX AI
 * Analyzes natural language search requests (e.g. "farmer crop loan", "girl scholarship")
 * and extracts top scheme IDs and categories.
 */
export async function sarthxSmartSearch(searchQuery, schemesList = []) {
  if (!searchQuery || !searchQuery.trim()) return null;

  try {
    const catalogSummary = schemesList.slice(0, 45).map(s => ({
      id: s.id,
      title: s.title,
      category: s.category,
      tags: s.tags?.join(', '),
      benefit: s.benefit
    }));

    const prompt = `You are the Semantic Scheme Matcher for the SarthX Indian Citizen Portal.
User Search Query: "${searchQuery}"

Below is our schemes database catalog:
${JSON.stringify(catalogSummary)}

Task:
Analyze the user's natural language intent, demographic, category, or requirement.
Identify up to 5 best matching scheme IDs from the catalog.
Also determine the most relevant category ID among: ['all', 'agriculture', 'students', 'women', 'business', 'health', 'housing', 'social'].

Respond strictly in valid JSON with this exact schema (no code fences, no unescaped quotes):
{
  "matchedSchemeIds": ["scheme-id-1", "scheme-id-2"],
  "suggestedCategory": "students",
  "briefReason": "Top scholarships and financial aid for graduation studies."
}`;

    const raw = await callSarthxAi(
      [{ role: 'user', parts: [{ text: prompt }] }],
      'You are a JSON semantic query router for SarthX Portal. Always respond with raw JSON only, escaping all quotes and special characters.',
      PRIMARY_MODEL,
      true
    );

    const parsed = safeParseSmartSearchResponse(raw, searchQuery, schemesList);
    if (parsed && parsed.matchedSchemeIds?.length > 0) {
      return parsed;
    }
  } catch (e) {
    // SarthX AI live call fallback
  }

  // Graceful local semantic fallback (never fails, instant response)
  return localSemanticSchemeMatch(searchQuery, schemesList);
}

// Backwards-compatible aliases
export const geminiSmartSearch = sarthxSmartSearch;
export const askGeminiChat = askSarthxChat;
