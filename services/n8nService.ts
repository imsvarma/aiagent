import { N8N_WEBHOOK_URL } from '../constants';

/**
 * Sends a message to the n8n webhook and returns the AI's reply.
 * @param message The message from the user.
 * @returns A promise that resolves to the AI's response string.
 */
export const sendMessageToN8n = async (message: string): Promise<string> => {
  if (N8N_WEBHOOK_URL === 'YOUR_N8N_WEBHOOK_URL_HERE' || !N8N_WEBHOOK_URL) {
    console.warn("n8n webhook URL not set in constants.ts. Using mock response.");
    await new Promise(resolve => setTimeout(resolve, 1000));
    return "This is a mock response. Please set your n8n webhook URL in `constants.ts` to get a real reply.";
  }

  try {
    const response = await fetch(N8N_WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ message }),
    });

    if (!response.ok) {
      throw new Error(`Webhook response was not ok: ${response.statusText}`);
    }

    const data = await response.json();

    if (!data.reply) {
      throw new Error("The webhook response did not contain a 'reply' field.");
    }

    return data.reply;
  } catch (error) {
    console.error('Error communicating with n8n webhook:', error);
    if (error instanceof Error) {
        return `Sorry, I encountered an error: ${error.message}. Please check the console for details.`;
    }
    return "Sorry, I encountered an unknown error.";
  }
};