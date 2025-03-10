import React from 'react';
import { textStyles } from '../styles/TextStyles';

const TechnicalExplanation = () => {

    return (
        <div className="mt-12 p-4 border rounded-lg bg-white" >
            <h2 className={`text-lg font-semibold mb-2 ${textStyles.subheading}`}>How This Works</h2>
            <p className={`mb-2 ${textStyles.paragraph}`}>This demo simulates a vector search system for aphasia patients:</p>
            <ol className="list-decimal pl-5 space-y-2">
                <li>When a card is added to the system, an on-device LLM generates a semantic vector embedding capturing its meaning.</li>
                <li>These embeddings are stored in a vector database (e.g., SQLite with vector extension).</li>
                <li>When a user types a search query, the LLM generates a vector for that query.</li>
                <li>The system finds cards with embeddings most similar to the query vector.</li>
                <li>This semantic matching works even with misspellings or when users can't remember the exact word.</li>
            </ol>
            <p className={`mt-3 text-sm ${textStyles.lightText}`}>Note: This demo uses simulated vectors - a real implementation would generate these using the on-device LLM.</p>
        </div>
    );
};

export default TechnicalExplanation;

