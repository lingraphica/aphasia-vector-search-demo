// src/components/SearchBar.jsx
import React from 'react';

const SearchBar = ({ searchQuery, onSearchChange, isSearching }) => {
    return (
        <div className="flex gap-2">
            <input
                type="text"
                value={searchQuery}
                onChange={onSearchChange}
                placeholder="Describe what you're looking for..."
                className="w-full p-3 border rounded shadow-sm"
            />
            {isSearching && (
                <div className="flex items-center">
                    <div className="animate-pulse text-blue-500">Searching...</div>
                </div>
            )}
        </div>
    );
};

export default SearchBar;
