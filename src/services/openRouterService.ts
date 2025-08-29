import axios from 'axios';

// OpenRouter API configuration
const OPENROUTER_API_KEY = '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';
const OPENROUTER_BASE_URL = 'https://openrouter.ai/api/v1';

// Message interface
export interface ChatMessage {
  role: 'user' | 'assistant' | 'system';
  content: string;
}

// Chat completion response interface
export interface ChatCompletionResponse {
  choices: {
    message: {
      role: string;
      content: string;
    };
  }[];
}

// Treatment recommendation interface
export interface TreatmentRecommendation {
  immediate: string[];
  preventive: string[];
  organic: string[];
  timeframe: string;
}

/**
 * Send a chat completion request to OpenRouter API
 * @param messages Array of chat messages
 * @returns Promise with the chat completion response
 */
export async function getChatCompletion(messages: ChatMessage[]): Promise<string> {
  try {
    const response = await axios.post(
      `${OPENROUTER_BASE_URL}/chat/completions`,
      {
        model: 'anthropic/claude-3-haiku', // Using a faster model that works reliably
        messages,
        temperature: 0.7,
        max_tokens: 1000,
      },
      {
        headers: {
          'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
          'HTTP-Referer': 'https://greenloop.com', // Fixed URL for OpenRouter's requirements
          'X-Title': 'GreenLoop Chat',
          'Content-Type': 'application/json',
        },
      }
    );

    if (response.data && response.data.choices && response.data.choices.length > 0) {
      return response.data.choices[0].message.content;
    } else {
      console.error('Invalid response format:', response.data);
      return "I'm having trouble processing your request at the moment. Please try again shortly.";
    }
  } catch (error: any) {
    console.error('Error calling OpenRouter API:', error);
    
    let errorMessage = 'Failed to get response from AI assistant. Please try again.';
    
    if (error.response) {
      // The request was made and the server responded with a status code
      // that falls out of the range of 2xx
      console.error('Error data:', error.response.data);
      console.error('Error status:', error.response.status);
      
      if (error.response.status === 401) {
        errorMessage = 'Authentication error with AI service. Please check API key configuration.';
      } else if (error.response.status === 429) {
        errorMessage = 'Rate limit exceeded. Please try again in a few moments.';
      }
    } else if (error.request) {
      // The request was made but no response was received
      console.error('No response received:', error.request);
      errorMessage = 'Network error - no response received from AI service.';
    }
    
    return errorMessage;
  }
}

/**
 * Generate treatment recommendations for plant diseases using OpenRouter API
 * @param diseaseName The name of the detected disease
 * @param plantType The type of plant (if known)
 * @param symptoms Array of observed symptoms
 * @returns Promise with treatment recommendations
 */
export async function generateTreatmentRecommendations(
  diseaseName: string,
  plantType: string = 'crop',
  symptoms: string[] = []
): Promise<TreatmentRecommendation> {
  try {
    console.log(`Generating treatment recommendations for ${diseaseName} on ${plantType}`);
    
    // Create a detailed prompt for the AI
    const symptomsText = symptoms.length > 0 
      ? `with the following symptoms: ${symptoms.join(', ')}`
      : '';
      
    const messages: ChatMessage[] = [
      {
        role: 'system',
        content: `You are an agricultural expert specializing in plant diseases and treatments. 
        Provide detailed, practical treatment recommendations for farmers. 
        Format your response as JSON with four sections: immediate steps, preventive measures, 
        organic treatment options, and expected recovery timeframe. Each section should have 3-5 
        specific, actionable recommendations that are appropriate for small-scale farmers in Nepal.`
      },
      {
        role: 'user',
        content: `Generate treatment recommendations for ${diseaseName} affecting ${plantType} plants ${symptomsText}.
        Return ONLY a JSON object with these keys:
        {
          "immediate": ["step 1", "step 2", "step 3", ...],
          "preventive": ["measure 1", "measure 2", "measure 3", ...],
          "organic": ["option 1", "option 2", "option 3", ...],
          "timeframe": "Expected recovery timeframe"
        }`
      }
    ];

    try {
      const response = await axios.post(
        `${OPENROUTER_BASE_URL}/chat/completions`,
        {
          model: 'anthropic/claude-3-haiku',
          messages,
          temperature: 0.3,
          max_tokens: 1000,
          response_format: { type: "json_object" }
        },
        {
          headers: {
            'Authorization': `Bearer ${OPENROUTER_API_KEY}`,
            'HTTP-Referer': 'https://greenloop.com',
            'X-Title': 'GreenLoop Treatment Recommendations',
            'Content-Type': 'application/json',
          },
          timeout: 15000 // 15 seconds timeout
        }
      );

      if (response.data && response.data.choices && response.data.choices.length > 0) {
        const content = response.data.choices[0].message.content;
        console.log('Received treatment recommendations:', content);
        
        try {
          // Parse the JSON response
          const parsedResponse = JSON.parse(content);
          
          // Validate that the response has the expected structure
          if (!parsedResponse.immediate || !parsedResponse.preventive || 
              !parsedResponse.organic || !parsedResponse.timeframe) {
            throw new Error('Invalid response format from AI');
          }
          
          return {
            immediate: parsedResponse.immediate,
            preventive: parsedResponse.preventive,
            organic: parsedResponse.organic,
            timeframe: parsedResponse.timeframe
          };
        } catch (parseError) {
          console.error('Error parsing AI response:', parseError);
          throw new Error('Failed to parse treatment recommendations');
        }
      } else {
        console.error('Invalid response format:', response.data);
        throw new Error('Invalid response from AI service');
      }
    } catch (apiError) {
      console.error('OpenRouter API error:', apiError);
      console.log('Using fallback treatment recommendations');
      throw new Error('Failed to get AI recommendations');
    }
  } catch (error: any) {
    console.error('Error generating treatment recommendations:', error);
    
    // Return default recommendations if API fails
    return {
      immediate: [
        "Remove and isolate affected plants",
        "Prune away visibly infected parts",
        "Apply appropriate treatment based on disease type",
        "Ensure proper watering practices"
      ],
      preventive: [
        "Implement crop rotation",
        "Maintain adequate plant spacing for airflow",
        "Use disease-resistant varieties when available",
        "Practice regular monitoring and inspection"
      ],
      organic: [
        "Apply neem oil solution to affected areas",
        "Use garlic or chili spray as natural deterrent",
        "Introduce beneficial insects to control pests",
        "Apply compost tea to boost plant immunity"
      ],
      timeframe: "Recovery typically takes 2-3 weeks with proper treatment and care"
    };
  }
} 