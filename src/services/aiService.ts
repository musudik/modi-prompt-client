// Track failed keys to avoid retrying them
const failedKeys = new Set<string>();

//const API_BASE_URL = 'http://localhost:3001/api';
const API_BASE_URL = 'https://mp-server.replit.app/api';
//const API_BASE_URL = process.env.NODE_ENV === 'production' ? API_BASE_URL_PROD : 'http://localhost:3001/api';


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

export const resetFailedKeys = (): void => {
  failedKeys.clear();
};