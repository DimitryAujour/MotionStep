const axios = require('axios');

exports.handler = async (event, context) => {
    try {
        if (!event.body) {
            console.error('No request body');
            throw new Error("No request body");
        }

        const parsedBody = JSON.parse(event.body);
        console.log('Parsed body:', parsedBody);

        const { imageBase64 } = parsedBody;

        if (!imageBase64) {
            console.error('No imageBase64 provided');
            throw new Error("No imageBase64 provided");
        }

        const apiKey = process.env.OPENAIKEY;
        const visionApiUrl = 'https://api.openai.com/v1/chat/completions';

        console.log('Received imageBase64:', imageBase64.substring(0, 30)); // Only log part of the base64 string to avoid large logs
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

        console.log('Payload:', JSON.stringify(payload, null, 2)); // Debugging log

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
        console.error('Error in analyzeImage function:', error.message); // Debugging log
        console.error(error.stack); // Print stack trace
        return {
            statusCode: 500,
            body: JSON.stringify({ error: error.message })
        };
    }
};

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
