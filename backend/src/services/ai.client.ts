export class AIClient {
  static async callOpenAI(prompt: string): Promise<string> {
    if (!process.env.OPENAI_API_KEY) {
      throw new Error('OpenAI API key not configured. Please set OPENAI_API_KEY in your environment variables.');
    }

    console.log('🔑 OpenAI API key found, making request...');

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
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
        temperature: 0.7,
        max_tokens: 1500
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
    if (!process.env.OPENAI_API_KEY) {
      throw new Error('OpenAI API key not configured. Please set OPENAI_API_KEY in your environment variables.');
    }

    console.log('🔑 OpenAI API key found, making answer request...');

    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENAI_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
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
        temperature: 0.3,
        max_tokens: 2000
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
