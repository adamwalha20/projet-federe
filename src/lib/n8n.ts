const N8N_WEBHOOK_URL = 'https://unpatented-balding-sonia.ngrok-free.dev/webhook/34e4ed78-0bab-4473-a75c-6024a3bc9f22';

export const sendToN8n = async (data: any) => {
  if (!N8N_WEBHOOK_URL) {
    console.warn('n8n webhook URL not configured. Mocking response.');
    return mockN8nResponse('chat', data);
  }
  try {
    const response = await fetch(N8N_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });
    return await response.json();
  } catch (error) {
    console.error('Error sending to n8n:', error);
    return null;
  }
};

const mockN8nResponse = (endpoint: string, data: any) => {
  if (endpoint === 'recommendations') {
    return {
      advice: "Based on your lower morning activity, consider a lighter dinner tonight like Salade Méchouia to maintain your metabolic rhythm.",
      meal_suggestion: {
        title: "Optimize your lunch",
        description: "Based on your metabolism, we suggest substituting fried foods for grilled Dorade grillée to maintain ketosis.",
        recipe: "Dorade grillée"
      }
    };
  }
  if (endpoint === 'chat') {
    return {
      reply: "I recommend adjusting your calorie intake slightly if you do intense cardio. Make sure to replenish with protein!"
    };
  }
  return { success: true };
};
