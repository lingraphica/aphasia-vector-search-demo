// src/components/SearchBar.jsx
import React from 'react';

const SearchBar = ({ searchQuery, onSearchChange, isSearching, onSearchSubmit }) => {
    const handleSubmit = (e) => {
        e.preventDefault();
        if (onSearchSubmit) {
            onSearchSubmit();
        }
    };

    return (
        <form onSubmit={handleSubmit} className="w-full">
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
        </form>
    );
};

export default SearchBar;