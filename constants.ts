/**
 * IMPORTANT: Replace this URL with your actual n8n webhook URL.
 * This is the endpoint the chatbot will send messages to.
 * Your n8n workflow should be configured to receive a POST request with a JSON body like:
 * { "message": "User's message here" }
 * And it should return a JSON response like:
 * { "reply": "AI's response here" }
 */
export const N8N_WEBHOOK_URL = 'YOUR_N8N_WEBHOOK_URL_HERE';