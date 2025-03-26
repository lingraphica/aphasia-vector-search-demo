// src/components/AphasiaVectorSearchDemo.jsx (refactored main component)
import React, { useState, useEffect } from 'react';
import TechnicalExplanation from './TechnicalExplanation';
import Card from './Card';
import SearchBar from './SearchBar';
import DemoQueries from './DemoQueries';
import SearchHistory from './SearchHistory';
import { textStyles } from '../styles/TextStyles';
import { cardData } from '../data/CardData';
import { mockEmbeddings, mockQueryEmbeddings, generateQueryEmbedding } from '../data/EmbeddingData';
import { cosineSimilarity, levenshteinDistance } from '../utils/VectorSearch';

const AphasiaVectorSearchDemo = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [searchHistory, setSearchHistory] = useState([]);
    const [isSearching, setIsSearching] = useState(false);
    const [demoQueries] = useState([
        "red fruit",
        "something to drink",
        "something to sit on",
        "pet animal",
        "bathroom item"
    ]);
    const [demoTypos] = useState([
        "appel",
        "sumthing to drink",
        "furniture for sitting",
        "animel that barks"
    ]);

    // Perform vector search
    const performVectorSearch = (query) => {
        if (query.trim().length < 2) return;

        setIsSearching(true);

        // Simulate network delay for demo purposes
        setTimeout(() => {
            try {
                // Generate query embedding
                const queryEmbedding = generateQueryEmbedding(query, mockQueryEmbeddings, levenshteinDistance);

                // Calculate similarity scores for all cards
                const results = Object.entries(mockEmbeddings).map(([word, embedding]) => {
                    const card = cardData.find(c => c.word.toLowerCase() === word);
                    const similarityScore = cosineSimilarity(queryEmbedding, embedding);

                    return {
                        ...card,
                        similarityScore
                    };
                });

                // Sort by similarity score
                const sortedResults = results.sort((a, b) => b.similarityScore - a.similarityScore);

                // Set results
                setSearchResults(sortedResults);

                // Add to search history when search is performed
                addToSearchHistory(query);
            } catch (error) {
                console.error("Error performing search:", error);
                setSearchResults([]);
            } finally {
                setIsSearching(false);
            }
        }, 500);
    };

    // Add to search history
    const addToSearchHistory = (query) => {
        if (query.trim() === "") return;

        setSearchHistory(prev => {
            // Check if query already exists in history
            if (prev.includes(query)) {
                // Move to the front if it exists
                return [query, ...prev.filter(q => q !== query)].slice(0, 10);
            } else {
                // Add to the front if it's new
                return [query, ...prev].slice(0, 10);
            }
        });
    };

    // Handle search input change
    const handleSearchChange = (e) => {
        const query = e.target.value;
        setSearchQuery(query);

        // Perform search as user types (with debounce in a real app)
        if (query.length > 2) {
            performVectorSearch(query);
        } else if (query.length === 0) {
            setSearchResults(cardData);
        }
    };

    // Handle search submission
    const handleSearchSubmit = () => {
        if (searchQuery.trim().length > 0) {
            performVectorSearch(searchQuery);
            addToSearchHistory(searchQuery);
        }
    };

    // Apply a demo query
    const applyDemoQuery = (query) => {
        setSearchQuery(query);
        performVectorSearch(query);
        // Note: addToSearchHistory now happens inside performVectorSearch
    };

    // Apply a history item
    const applyHistoryItem = (query) => {
        setSearchQuery(query);
        performVectorSearch(query);
        // No need to add to history since it's already there
    };

    // Clear search history
    const clearSearchHistory = () => {
        setSearchHistory([]);
    };

    // Initialize with all cards visible and add some example search history
    useEffect(() => {
        setSearchResults(cardData);

        // For demo purposes, add some initial search history items
        setSearchHistory(["kitchen items", "sports equipment", "something for eating"]);

        // In a real app, you would load from localStorage instead:
        // const savedHistory = localStorage.getItem('searchHistory');
        // if (savedHistory) {
        //     setSearchHistory(JSON.parse(savedHistory));
        // }
    }, []);

    // Save search history to localStorage in a real app
    // useEffect(() => {
    //     localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
    // }, [searchHistory]);

    return (
        <div className="p-6 max-w-4xl mx-auto bg-gray-50 rounded-lg">
            <h1 className={`text-2xl font-bold mb-2 ${textStyles.heading}`}>Aphasia Communication Cards</h1>
            <p className={`mb-6 ${textStyles.lightText}`}>Using vector search technology to find words when you can't remember them</p>

            {/* Search bar */}
            <div className="mb-6">
                <div className="flex gap-2">
                    <SearchBar
                        searchQuery={searchQuery}
                        onSearchChange={handleSearchChange}
                        onSearchSubmit={handleSearchSubmit}
                        isSearching={isSearching}
                    />
                    <button
                        onClick={handleSearchSubmit}
                        className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        disabled={searchQuery.trim().length < 2}
                    >
                        Search
                    </button>
                </div>

                {/* Demo queries */}
                <DemoQueries
                    queries={demoQueries}
                    typos={demoTypos}
                    onApplyQuery={applyDemoQuery}
                />
            </div>

            {/* Search history */}
            <SearchHistory
                searchHistory={searchHistory}
                onHistoryItemClick={applyHistoryItem}
                onClearHistory={clearSearchHistory}
            />

            {/* Results */}
            <div className="mt-4">
                <h2 className={`text-lg font-semibold mb-3 ${textStyles.subheading}`}>
                    {searchQuery ? `Results for "${searchQuery}"` : "All Cards"}
                </h2>

                {searchResults.length > 0 ? (
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                        {searchResults.map((card) => (
                            <Card
                                key={card.id}
                                card={card}
                                searchQuery={searchQuery}
                            />
                        ))}
                    </div>
                ) : (
                    <div className="text-center p-8 bg-white rounded-lg border">
                        <p className={textStyles.paragraph}>No matching cards found. Try different descriptive words.</p>
                    </div>
                )}
            </div>

            {/* Tech explanation for your coworkers */}
            <TechnicalExplanation />
        </div>
    );
};

export default AphasiaVectorSearchDemo;