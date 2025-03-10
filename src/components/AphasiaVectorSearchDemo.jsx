// src/components/AphasiaVectorSearchDemo.jsx (refactored main component)
import React, { useState, useEffect } from 'react';
import TechnicalExplanation from './TechnicalExplanation';
import Card from './Card';
import SearchBar from './SearchBar';
import DemoQueries from './DemoQueries';
import RecentlySpoken from './RecentlySpoken';
import { textStyles } from '../styles/TextStyles';
import { cardData } from '../data/CardData';
import { mockEmbeddings, mockQueryEmbeddings, generateQueryEmbedding } from '../data/EmbeddingData';
import { cosineSimilarity, levenshteinDistance } from '../utils/VectorSearch';
import { speakWord as speak } from '../utils/SpeechUtils';

const AphasiaVectorSearchDemo = () => {
    const [searchQuery, setSearchQuery] = useState("");
    const [searchResults, setSearchResults] = useState([]);
    const [recentlySpoken, setRecentlySpoken] = useState([]);
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
            } catch (error) {
                console.error("Error performing search:", error);
                setSearchResults([]);
            } finally {
                setIsSearching(false);
            }
        }, 500);
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

    // Handle card click - speak the word
    const speakWord = (word) => {
        speak(word);

        // Add to recently spoken
        setRecentlySpoken(prev => {
            const newList = [word, ...prev.filter(w => w !== word)].slice(0, 5);
            return newList;
        });
    };

    // Apply a demo query
    const applyDemoQuery = (query) => {
        setSearchQuery(query);
        performVectorSearch(query);
    };

    // Initialize with all cards visible
    useEffect(() => {
        setSearchResults(cardData);
    }, []);

    return (
        <div className="p-6 max-w-4xl mx-auto bg-gray-50 rounded-lg">
            <h1 className={`text-2xl font-bold mb-2 ${textStyles.heading}`}>Aphasia Communication Cards</h1>
            <p className={`mb-6 ${textStyles.lightText}`}>Using vector search technology to find words when you can't remember them</p>

            {/* Search bar */}
            <div className="mb-6">
                <SearchBar
                    searchQuery={searchQuery}
                    onSearchChange={handleSearchChange}
                    isSearching={isSearching}
                />

                {/* Demo queries */}
                <DemoQueries
                    queries={demoQueries}
                    typos={demoTypos}
                    onApplyQuery={applyDemoQuery}
                />
            </div>

            {/* Recently spoken */}
            <RecentlySpoken
                recentlySpoken={recentlySpoken}
                onWordClick={speakWord}
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
                                onClick={speakWord}
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