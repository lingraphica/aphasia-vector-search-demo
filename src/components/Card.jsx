// src/components/Card.jsx
import React from 'react';
import { textStyles } from '../styles/TextStyles';

const Card = ({ card, searchQuery, onClick }) => {
    return (
        <div
            onClick={() => onClick(card.word)}
            className="border bg-white rounded-lg p-4 flex flex-col items-center cursor-pointer hover:bg-blue-50 transition shadow-sm"
        >
            <img
                src={card.image}
                alt={card.word}
                className="w-16 h-16 object-contain mb-2 rounded"
            />
            <p className={`font-bold text-lg ${textStyles.heading}`}>{card.word}</p>
            <p className={`text-xs mb-1 ${textStyles.lightText}`}>{card.category}</p>

            {/* Show matching score for search results */}
            {searchQuery && card.similarityScore !== undefined && (
                <div className="mt-1 w-full">
                    <div className={`text-xs mb-1 ${textStyles.lightText}`}>Match score:</div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                        <div
                            className="bg-blue-600 h-2 rounded-full"
                            style={{ width: `${Math.max(5, Math.round(card.similarityScore * 100))}%` }}
                        ></div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Card;