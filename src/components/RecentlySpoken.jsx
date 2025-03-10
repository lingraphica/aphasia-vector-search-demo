// src/components/RecentlySpoken.jsx
import React from 'react';
import { textStyles } from '../styles/TextStyles';

const RecentlySpoken = ({ recentlySpoken, onWordClick }) => {
    if (recentlySpoken.length === 0) return null;

    return (
        <div className="mb-6 p-4 bg-white rounded-lg shadow-sm">
            <h2 className={`text-lg font-semibold mb-2 ${textStyles.subheading}`}>Recently Used</h2>
            <div className="flex flex-wrap gap-2">
                {recentlySpoken.map((word, index) => (
                    <button
                        key={`recent-${index}`}
                        onClick={() => onWordClick(word)}
                        className="px-4 py-2 bg-green-100 text-green-800 rounded-lg hover:bg-green-200"
                    >
                        {word}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default RecentlySpoken;