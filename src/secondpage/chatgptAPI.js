import axios from 'axios';

export async function analyzeImageWithChatGPT(image) {
    const reader = new FileReader();

    return new Promise((resolve, reject) => {
        reader.onloadend = async () => {
            const base64String = reader.result.replace('data:', '').replace(/^.+,/, '');

            try {
                const response = await axios.post('/.netlify/functions/analyzeImage', { imageBase64: base64String });

                console.log('Function Response:', response.data); // Debugging log

                if (response.data.error) {
                    throw new Error(response.data.error);
                }

                resolve(response.data);
            } catch (error) {
                console.error('Failed to analyze image', error);
                reject('Failed to analyze image');
            }
        };

        reader.onerror = (error) => reject('Failed to read image file');

        reader.readAsDataURL(image);
    });
}
