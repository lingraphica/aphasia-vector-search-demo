// src/components/SearchHistory.jsx
import React from 'react';
import { textStyles } from '../styles/TextStyles';

const SearchHistory = ({ searchHistory, onHistoryItemClick, onClearHistory }) => {
    // For debugging, always show the component even if empty
    if (searchHistory.length === 0) {
        return (
            <div className="mb-6 p-4 bg-white rounded-lg shadow-sm">
                <h2 className={`text-lg font-semibold ${textStyles.subheading}`}>Search History</h2>
                <p className="text-sm text-gray-500">No search history yet. Try searching for something!</p>
            </div>
        );
    }

    return (
        <div className="mb-6 p-4 bg-white rounded-lg shadow-sm">
            <div className="flex justify-between items-center mb-2">
                <h2 className={`text-lg font-semibold ${textStyles.subheading}`}>Search History</h2>
                <button
                    onClick={onClearHistory}
                    className="text-xs text-red-500 hover:text-red-700"
                >
                    Clear History
                </button>
            </div>
            <div className="flex flex-wrap gap-2">
                {searchHistory.map((query, index) => (
                    <button
                        key={`history-${index}`}
                        onClick={() => onHistoryItemClick(query)}
                        className="px-4 py-2 bg-blue-50 text-blue-800 rounded-lg hover:bg-blue-100 flex items-center"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        </svg>
                        {query}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default SearchHistory;