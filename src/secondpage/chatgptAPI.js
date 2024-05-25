import axios from 'axios';
import { OpenAI } from 'openai';

const apiKey = process.env.openaikey;

const openai = new OpenAI({
    apiKey: apiKey,
    dangerouslyAllowBrowser: true
});

const visionApiUrl = 'https://api.openai.com/v1/chat/completions';

export async function analyzeImageWithChatGPT(image) {
    const reader = new FileReader();

    return new Promise((resolve, reject) => {
        reader.onloadend = async () => {
            const base64String = reader.result.replace('data:', '').replace(/^.+,/, '');

            const payload = {
                model: 'gpt-4-turbo',
                messages: [
                    {
                        role: 'user',
                        content: [
                            { type: "text", text: "Analyze this image for calorie content" },
                            { type: "image_url", image_url: { url: `data:image/jpeg;base64,${base64String}` } }
                        ]
                    },
                    {
                        role: 'system',
                        content: 'You are an AI that provides calorie estimation and steps needed to burn calories based on food images.'
                    }
                ],
                max_tokens: 300
            };

            try {
                const response = await axios.post(visionApiUrl, payload, {
                    headers: {
                        'Authorization': `Bearer ${apiKey}`,
                        'Content-Type': 'application/json'
                    }
                });

                const result = response.data.choices[0].message.content;
                const parsedResult = parseResponse(result);

                resolve(parsedResult);
            } catch (error) {
                console.error('Failed to analyze image', error);
                reject('Failed to analyze image');
            }
        };

        reader.onerror = (error) => reject('Failed to read image file');

        reader.readAsDataURL(image);
    });
}

function parseResponse(response) {
    console.log('Parsing response:', response); // Debug logging

    const calorieMatch = response.match(/(\d+)\s*calories?/i);
    const stepsMatch = response.match(/(\d+)\s*steps?/i);

    const calories = calorieMatch ? parseInt(calorieMatch[1], 10) : 0;
    let steps;

    if (stepsMatch) {
        steps = parseInt(stepsMatch[1], 10);
    } else {
        // Calculate steps based on calories
        steps = Math.round(calories / 0.04);
    }

    console.log('Parsed calories:', calories); // Debug logging
    console.log('Calculated steps:', steps); // Debug logging

    return { calories, steps };
}
