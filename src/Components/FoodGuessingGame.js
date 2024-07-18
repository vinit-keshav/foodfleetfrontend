import React, { useState, useEffect } from 'react';

export default function FoodGuessingGame() {
    const [currentFood, setCurrentFood] = useState({});
    const [options, setOptions] = useState([]);
    const [score, setScore] = useState(0);
    const [showAnimation, setShowAnimation] = useState(false);
    const [feedback, setFeedback] = useState('');

    useEffect(() => {
        fetchRandomFood();
    }, []);

    const fetchRandomFood = async () => {
        try {
            const response = await fetch('https://www.themealdb.com/api/json/v1/1/random.php');
            const data = await response.json();
            const meal = data.meals[0];
            const allOptions = await generateOptions(meal.strMeal);
            setCurrentFood({ name: meal.strMeal, image: meal.strMealThumb });
            setOptions(allOptions);
            setFeedback('');
            setShowAnimation(false);
        } catch (error) {
            console.error('Error fetching random food:', error);
        }
    };

    const generateOptions = async (correctOption) => {
        const response = await fetch('https://www.themealdb.com/api/json/v1/1/search.php?s=');
        const data = await response.json();
        const meals = data.meals.map(meal => meal.strMeal);
        let options = [correctOption];
        while (options.length < 4) {
            const randomMeal = meals[Math.floor(Math.random() * meals.length)];
            if (!options.includes(randomMeal)) {
                options.push(randomMeal);
            }
        }
        return shuffle(options);
    };

    const shuffle = (array) => {
        for (let i = array.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            [array[i], array[j]] = [array[j], array[i]];
        }
        return array;
    };

    const handleOptionClick = (option) => {
        if (option === currentFood.name) {
            setScore(score + 10);
            setFeedback('Correct! Well done!');
            setShowAnimation(true);
            setTimeout(() => {
                fetchRandomFood();
            }, 2000); // Show animation for 2 seconds before generating the next food
        } else {
            setScore(score - 1);
            setFeedback('Wrong! Try again.');
        }
    };

    return (
        <div className="food-guessing-game container text-center text-white bg-dark p-4 rounded">
            <h2 className="mb-4">Guess the Food</h2>
            {showAnimation && (
                <div className="animation alert alert-info bg-black">
                    <p>Next food is coming up...</p>
                </div>
            )}
            <div className="food-image-container mb-4">
                {currentFood.image && (
                    <img src={currentFood.image} alt="Food" className="img-fluid rounded w-100" style={{ maxWidth: '400px' }} />
                )}
            </div>
            <div className="options-container mb-4 row">
                {options.map((option, index) => (
                    <div key={index} className="col-12 col-md-6 mb-2">
                        <button onClick={() => handleOptionClick(option)} className="btn btn-secondary w-100">
                            {option}
                        </button>
                    </div>
                ))}
            </div>
            <div className="feedback mb-4">{feedback}</div>
            <div className="score mb-4">Score: {score}</div>
        </div>
    );
}
