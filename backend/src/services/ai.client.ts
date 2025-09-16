export class AIClient {
  static async callOpenAI(prompt: string): Promise<string> {
    const apiKey = process.env.OPENAI_API_KEY_TASKS || process.env.OPENAI_API_KEY;
    if (!apiKey) {
      throw new Error('OpenAI API key not configured. Please set OPENAI_API_KEY_TASKS or OPENAI_API_KEY in your environment variables.');
    }

    console.log('🔑 OpenAI API key found for task generation, making request...');

    const model = process.env.OPENAI_MODEL_TASKS || 'gpt-4o-mini';
    const temperature = parseFloat(process.env.OPENAI_TEMP_TASKS || '0.7');
    const maxTokens = parseInt(process.env.OPENAI_MAX_TOKENS_TASKS || '1500');

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: model,
        messages: [
          {
            role: 'system',
            content: 'You are an expert competitive programming problem setter. Create educational, well-structured problems that test algorithmic thinking.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: temperature,
        max_tokens: maxTokens
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ OpenAI API Error:', response.status, errorText);
      
      if (response.status === 429) {
        const errorData = JSON.parse(errorText);
        if (errorData.error?.code === 'rate_limit_exceeded') {
          throw new Error('RATE_LIMIT_EXCEEDED');
        }
      }
      
      throw new Error(`OpenAI API error (${response.status}): ${errorText}`);
    }

    const data = await response.json();
    
    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      console.error('❌ Invalid OpenAI response format:', data);
      throw new Error('Invalid response format from OpenAI API');
    }

    return data.choices[0].message.content;
  }

  static async callOpenAIForAnswer(prompt: string): Promise<string> {
    const apiKey = process.env.OPENAI_API_KEY_ANSWERS || process.env.OPENAI_API_KEY;
    if (!apiKey) {
      throw new Error('OpenAI API key not configured. Please set OPENAI_API_KEY_ANSWERS or OPENAI_API_KEY in your environment variables.');
    }

    console.log('🔑 OpenAI API key found for answer generation, making request...');

    const model = process.env.OPENAI_MODEL_ANSWERS || 'gpt-4o-mini';
    const temperature = parseFloat(process.env.OPENAI_TEMP_ANSWERS || '0.3');
    const maxTokens = parseInt(process.env.OPENAI_MAX_TOKENS_ANSWERS || '2000');

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: model,
        messages: [
          {
            role: 'system',
            content: 'You are an expert competitive programming problem solver. Provide accurate, detailed solutions with clear explanations.'
          },
          {
            role: 'user',
            content: prompt
          }
        ],
        temperature: temperature,
        max_tokens: maxTokens
      })
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ OpenAI API Error:', response.status, errorText);
      
      if (response.status === 429) {
        const errorData = JSON.parse(errorText);
        if (errorData.error?.code === 'rate_limit_exceeded') {
          throw new Error('RATE_LIMIT_EXCEEDED');
        }
      }
      
      throw new Error(`OpenAI API error (${response.status}): ${errorText}`);
    }

    const data = await response.json();
    
    if (!data.choices || !data.choices[0] || !data.choices[0].message) {
      console.error('❌ Invalid OpenAI response format:', data);
      throw new Error('Invalid response format from OpenAI API');
    }

    return data.choices[0].message.content;
  }
}
