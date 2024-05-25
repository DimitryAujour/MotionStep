import React, { useState } from 'react';
import { analyzeImageWithChatGPT } from './chatgptAPI';
import Loader from './Loader';

export default function Conversation() {
    const [images, setImages] = useState([]);
    const [results, setResults] = useState({ calories: 0, steps: 0 });
    const [weight, setWeight] = useState('');
    const [age, setAge] = useState('');
    const [walkingSpeed, setWalkingSpeed] = useState('');
    const [loading, setLoading] = useState(false);

    const handleImageUpload = (event) => {
        const files = Array.from(event.target.files);
        setImages(files);
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        if (name === 'weight') setWeight(value);
        if (name === 'age') setAge(value);
        if (name === 'walkingSpeed') setWalkingSpeed(value);
    };

    const analyzeImages = async () => {
        setLoading(true);
        try {
            const results = await Promise.all(images.map(async (image) => {
                const result = await analyzeImageWithChatGPT(image);
                return result;
            }));

            const totalCalories = results.reduce((sum, result) => sum + result.calories, 0);
            const totalSteps = calculateSteps(totalCalories, weight, walkingSpeed);

            setResults({ calories: totalCalories, steps: totalSteps });
        } catch (error) {
            console.error('Error analyzing images:', error);
        } finally {
            setLoading(false);
        }
    };

    const calculateSteps = (calories, weight, walkingSpeed) => {
        const caloriesPerStep = 0.04 * (walkingSpeed / 3.1);
        return Math.round(calories / caloriesPerStep);
    };

    return (
        <div className="w-screen h-screen bg-offwhite flex flex-col items-center justify-center relative">
            <h1 className="text-4xl text-darkgreen mb-6 font-bold">Add the Pictures Here</h1>
            <input type="file" multiple accept="image/*" onChange={handleImageUpload} className="mb-6 p-4 text-lg" />
            <div className="mb-6 w-3/4">
                <label className="block text-darkgreen font-bold text-lg mb-2">Weight (kg):</label>
                <input
                    type="number"
                    name="weight"
                    value={weight}
                    onChange={handleInputChange}
                    className="border border-darkgreen rounded p-4 w-full text-lg"
                />
            </div>
            <div className="mb-6 w-3/4">
                <label className="block text-darkgreen font-bold text-lg mb-2">Age:</label>
                <input
                    type="number"
                    name="age"
                    value={age}
                    onChange={handleInputChange}
                    className="border border-darkgreen rounded p-4 w-full text-lg"
                />
            </div>
            <div className="mb-6 w-3/4">
                <label className="block text-darkgreen font-bold text-lg mb-2">Walking Speed (mph):</label>
                <input
                    type="number"
                    name="walkingSpeed"
                    value={walkingSpeed}
                    onChange={handleInputChange}
                    className="border border-darkgreen rounded p-4 w-full text-lg"
                />
                <h3 className="text-lg mt-2">7.25 miles per hour is the average</h3>
            </div>
            <button onClick={analyzeImages} className="bg-lightgreen hover:bg-darkgreen text-offwhite font-bold py-4 px-6 rounded-full text-lg">
                Analyze Pictures
            </button>
            {loading && <Loader />}
            <div className="mt-6 w-3/4">
                <h2 className="text-2xl text-darkgreen font-extrabold">Results:</h2>
                <p className="text-lg">Total Calories: {results.calories}</p>
                <p className="text-lg">Steps to Walk: {results.steps}</p>
            </div>
        </div>
    );
}
