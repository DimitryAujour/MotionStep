const axios = require('axios');

exports.handler = async (event, context) => {
    try {
        if (!event.body) {
            throw new Error("No request body");
        }

        const { imageBase64 } = JSON.parse(event.body);

        if (!imageBase64) {
            throw new Error("No imageBase64 provided");
        }

        const apiKey = process.env.OPENAIKEY;
        const visionApiUrl = 'https://api.openai.com/v1/chat/completions';

        console.log('Received imageBase64:', imageBase64); // Debugging log
        console.log('Using API Key:', apiKey); // Debugging log

        const payload = {
            model: 'gpt-4-turbo',
            messages: [
                {
                    role: 'user',
                    content: [
                        { type: "text", text: "Analyze this image for calorie content" },
                        { type: "image_url", image_url: { url: `data:image/jpeg;base64,${imageBase64}` } }
                    ]
                },
                {
                    role: 'system',
                    content: 'You are an AI that provides calorie estimation and steps needed to burn calories based on food images.'
                }
            ],
            max_tokens: 300
        };

        console.log('Payload:', payload); // Debugging log

        const response = await axios.post(visionApiUrl, payload, {
            headers: {
                'Authorization': `Bearer ${apiKey}`,
                'Content-Type': 'application/json'
            }
        });

        console.log('API Response:', response.data); // Debugging log

        const result = response.data.choices[0].message.content;
        const parsedResult = parseResponse(result);

        return {
            statusCode: 200,
            body: JSON.stringify(parsedResult)
        };
    } catch (error) {
        console.error('Error in analyzeImage function:', error); // Debugging log
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message })
        };
    }
};

function parseResponse(response) {
    const calorieMatch = response.match(/(\d+)\s*calories/);
    const stepsMatch = response.match(/(\d+)\s*steps/);

    const calories = calorieMatch ? parseInt(calorieMatch[1], 10) : 0;
    const steps = stepsMatch ? parseInt(stepsMatch[1], 10) : 0;

    return { calories, steps };
}
