import dotenv from 'dotenv';
dotenv.config();

const openRouterUrl = 'https://openrouter.ai/api/v1/chat/completions';
const openRouterAPIKey = process.env.OPENROUTER_API_KEY;
const model = 'deepseek/deepseek-chat';


const retryWithBackoff = async (fn, retries = 3, delay = 1000) => {
    try {
        return await fn();
    } catch (error) {
        if (retries <= 0) {
            throw error;
        }
        console.warn(`OpenRouter request failed. Retrying in ${delay}ms... Remaining retries: ${retries}. Error: ${error.message}`);
        await new Promise((resolve) => setTimeout(resolve, delay));
        return retryWithBackoff(fn, retries - 1, delay * 2);
    }
};

export const generateResponse = async (prompt) => {
    return retryWithBackoff(async () => {
        const res = await fetch(openRouterUrl, {
            method: 'POST',
            headers: {
                Authorization: `Bearer ${openRouterAPIKey}`,
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                model: model,
                messages: [
                    {
                        role: 'system',
                        content: 'You must return ONLY valid raw JSON.',
                    },
                    {
                        role: 'user',
                        content: prompt,
                    },
                
                ],
                temperature: 0.2
            }),
        });

        if(!res.ok) {
            const err = await res.text();
            throw new Error('Open Router Error: ' + err);
        }

        const data = await res.json();
        return data.choices[0].message.content;
    });
};