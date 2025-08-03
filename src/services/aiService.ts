interface AIProvider {
  name: string;
  icon: string;
  apiEndpoint: string;
  headers: (apiKey: string) => Record<string, string>;
  formatRequest: (prompt: string, options: any) => any;
  parseResponse: (response: any) => string;
}

// Free OpenAI API Keys from environment variable
const FREE_OPENAI_KEYS: string[] = import.meta.env.VITE_FREE_OPENAI_KEYS 
  ? import.meta.env.VITE_FREE_OPENAI_KEYS.split(',')
  : [];

// Track failed keys to avoid retrying them
const failedKeys = new Set<string>();

const AI_PROVIDERS: Record<string, AIProvider> = {
  'Claude Sonnet 4 Thinking': {
    name: 'Claude Sonnet 4 Thinking',
    icon: '/chatllm/staticllm/claude.webp',
    apiEndpoint: 'https://api.anthropic.com/v1/messages',
    headers: (apiKey: string) => ({
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01'
    }),
    formatRequest: (prompt: string, options: any) => ({
      model: 'claude-3-5-sonnet-20241022',
      max_tokens: 4000,
      messages: [{
        role: 'user',
        content: `Generate a detailed video prompt based on: ${prompt}

Style: ${options.style}
Camera Style: ${options.cameraStyle}
Camera Direction: ${options.cameraDirection}
Pacing: ${options.pacing}
Special Effects: ${options.specialEffects}
Target Length: ${options.promptLength} words
Custom Elements: ${options.customElements}

Please generate a video prompt that is approximately ${options.promptLength} words in length. Be precise with the word count.`
      }]
    }),
    parseResponse: (response: any) => response.content[0].text
  },
  'Claude Sonnet 3.7': {
    name: 'Claude Sonnet 3.7',
    icon: '/chatllm/staticllm/claude.webp',
    apiEndpoint: 'https://api.anthropic.com/v1/messages',
    headers: (apiKey: string) => ({
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01'
    }),
    formatRequest: (prompt: string, options: any) => ({
      model: 'claude-3-sonnet-20240229',
      max_tokens: 4000,
      messages: [{
        role: 'user',
        content: `Generate a detailed video prompt based on: ${prompt}\n\nStyle: ${options.style}\nCamera Style: ${options.cameraStyle}\nCamera Direction: ${options.cameraDirection}\nPacing: ${options.pacing}\nSpecial Effects: ${options.specialEffects}\nPrompt Length: ${options.promptLength}\nCustom Elements: ${options.customElements}`
      }]
    }),
    parseResponse: (response: any) => response.content[0].text
  },
  'Claude Opus 4 Thinking': {
    name: 'Claude Opus 4 Thinking',
    icon: '/chatllm/staticllm/claude.webp',
    apiEndpoint: 'https://api.anthropic.com/v1/messages',
    headers: (apiKey: string) => ({
      'Content-Type': 'application/json',
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01'
    }),
    formatRequest: (prompt: string, options: any) => ({
      model: 'claude-3-opus-20240229',
      max_tokens: 4000,
      messages: [{
        role: 'user',
        content: `Generate a detailed video prompt based on: ${prompt}\n\nStyle: ${options.style}\nCamera Style: ${options.cameraStyle}\nCamera Direction: ${options.cameraDirection}\nPacing: ${options.pacing}\nSpecial Effects: ${options.specialEffects}\nPrompt Length: ${options.promptLength}\nCustom Elements: ${options.customElements}`
      }]
    }),
    parseResponse: (response: any) => response.content[0].text
  },
  'Gemini 2.5 Pro': {
    name: 'Gemini 2.5 Pro',
    icon: '/chatllm/staticllm/gemini.webp',
    apiEndpoint: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent',
    headers: (apiKey: string) => ({
      'Content-Type': 'application/json'
    }),
    formatRequest: (prompt: string, options: any) => ({
      contents: [{
        parts: [{
          text: `Generate a detailed video prompt based on: ${prompt}\n\nStyle: ${options.style}\nCamera Style: ${options.cameraStyle}\nCamera Direction: ${options.cameraDirection}\nPacing: ${options.pacing}\nSpecial Effects: ${options.specialEffects}\nPrompt Length: ${options.promptLength}\nCustom Elements: ${options.customElements}`
        }]
      }],
      generationConfig: {
        temperature: 0.7,
        maxOutputTokens: 4000
      }
    }),
    parseResponse: (response: any) => response.candidates[0].content.parts[0].text
  },
  'Gemini 2.5 Flash': {
    name: 'Gemini 2.5 Flash',
    icon: '/chatllm/staticllm/gemini.webp',
    apiEndpoint: 'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-exp:generateContent',
    headers: (apiKey: string) => ({
      'Content-Type': 'application/json'
    }),
    formatRequest: (prompt: string, options: any) => ({
      contents: [{
        parts: [{
          text: `Generate a detailed video prompt based on: ${prompt}\n\nStyle: ${options.style}\nCamera Style: ${options.cameraStyle}\nCamera Direction: ${options.cameraDirection}\nPacing: ${options.pacing}\nSpecial Effects: ${options.specialEffects}\nPrompt Length: ${options.promptLength}\nCustom Elements: ${options.customElements}`
        }]
      }],
      generationConfig: {
        temperature: 0.9,
        maxOutputTokens: 4000
      }
    }),
    parseResponse: (response: any) => response.candidates[0].content.parts[0].text
  },
  'o4 Mini High': {
    name: 'o4 Mini High',
    icon: '/chatllm/staticllm/gpt.webp',
    apiEndpoint: 'https://api.openai.com/v1/chat/completions',
    headers: (apiKey: string) => ({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    }),
    formatRequest: (prompt: string, options: any) => ({
      model: 'gpt-4o-mini',
      messages: [{
        role: 'user',
        content: `Generate a detailed video prompt based on: ${prompt}\n\nStyle: ${options.style}\nCamera Style: ${options.cameraStyle}\nCamera Direction: ${options.cameraDirection}\nPacing: ${options.pacing}\nSpecial Effects: ${options.specialEffects}\nPrompt Length: ${options.promptLength}\nCustom Elements: ${options.customElements}`
      }],
      max_tokens: 4000,
      temperature: 0.7
    }),
    parseResponse: (response: any) => response.choices[0].message.content
  },
  'GPT-4o': {
    name: 'GPT-4o',
    icon: '/chatllm/staticllm/gpt.webp',
    apiEndpoint: 'https://api.openai.com/v1/chat/completions',
    headers: (apiKey: string) => ({
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${apiKey}`
    }),
    formatRequest: (prompt: string, options: any) => ({
      model: 'gpt-4o',
      messages: [{
        role: 'user',
        content: `Generate a detailed video prompt based on: ${prompt}\n\nStyle: ${options.style}\nCamera Style: ${options.cameraStyle}\nCamera Direction: ${options.cameraDirection}\nPacing: ${options.pacing}\nSpecial Effects: ${options.specialEffects}\nPrompt Length: ${options.promptLength}\nCustom Elements: ${options.customElements}`
      }],
      max_tokens: 4000,
      temperature: 0.7
    }),
    parseResponse: (response: any) => response.choices[0].message.content
  }
};

/**
 * Get the next available OpenAI API key that hasn't failed
 */
const getNextAvailableOpenAIKey = (): string | null => {
  const availableKeys = FREE_OPENAI_KEYS.filter(key => !failedKeys.has(key));
  return availableKeys.length > 0 ? availableKeys[0] : null;
};

/**
 * Mark an API key as failed
 */
const markKeyAsFailed = (apiKey: string): void => {
  failedKeys.add(apiKey);
};

/**
 * Try to make an API request with a specific key
 */
const tryApiRequest = async (
  provider: AIProvider,
  apiKey: string,
  inputConcept: string,
  options: any
): Promise<string> => {
  const url = provider.name.includes('Gemini') 
    ? `${provider.apiEndpoint}?key=${apiKey}`
    : provider.apiEndpoint;

  const response = await fetch(url, {
    method: 'POST',
    headers: provider.headers(apiKey),
    body: JSON.stringify(provider.formatRequest(inputConcept, options))
  });

  if (!response.ok) {
    const errorData = await response.json().catch(() => ({}));
    throw new Error(`API Error: ${response.status} - ${errorData.error?.message || response.statusText}`);
  }

  const data = await response.json();
  return provider.parseResponse(data);
};

interface AIProvider {
  name: string;
  icon: string;
}

const API_BASE_URL = 'http://localhost:3001/api';

export const generatePrompt = async (
  model: string,
  prompt: string,
  options: any,
  apiKey?: string
): Promise<string> => {
  try {
    const response = await fetch(`${API_BASE_URL}/generate-prompt`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ model, prompt, options, apiKey }),
    });

    if (!response.ok) {
      throw new Error('Failed to generate prompt');
    }

    const data = await response.json();
    return data.prompt;
  } catch (error: any) {
    console.error('Error generating prompt:', error);
    throw error;
  }
};

export const getAvailableModels = async (): Promise<Array<{name: string, icon: string}>> => {
  try {
    const response = await fetch(`${API_BASE_URL}/models`);
    if (!response.ok) {
      throw new Error('Failed to fetch models');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching models:', error);
    return [];
  }
};

export const getKeyStats = async (): Promise<{totalKeys: number, failedKeys: number, availableKeys: number}> => {
  try {
    const response = await fetch(`${API_BASE_URL}/key-stats`);
    if (!response.ok) {
      throw new Error('Failed to fetch key stats');
    }
    return await response.json();
  } catch (error) {
    console.error('Error fetching key stats:', error);
    return { totalKeys: 0, failedKeys: 0, availableKeys: 0 };
  }
};

/**
 * Reset failed keys (useful for testing or manual reset)
 */
export const resetFailedKeys = (): void => {
  failedKeys.clear();
  console.log('Failed keys cache has been reset');
};

/**
 * Get statistics about key usage
 */
// export const getKeyStats = (): { total: number, failed: number, available: number } => {
//   return {
//     total: FREE_OPENAI_KEYS.length,
//     failed: failedKeys.size,
//     available: FREE_OPENAI_KEYS.length - failedKeys.size
//   };
// };