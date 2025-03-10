// src/components/DemoQueries.jsx
import React from 'react';
import { textStyles } from '../styles/TextStyles';

const DemoQueries = ({ queries, typos, onApplyQuery }) => {
    return (
        <>
            <div className="mt-4">
                <h3 className={`text-sm font-medium mb-2 ${textStyles.paragraph}`}>Try these example searches:</h3>
                <div className="flex flex-wrap gap-2">
                    {queries.map((query, index) => (
                        <button
                            key={`query-${index}`}
                            onClick={() => onApplyQuery(query)}
                            className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm hover:bg-blue-200"
                        >
                            {query}
                        </button>
                    ))}
                </div>
            </div>

            <div className="mt-3">
                <h3 className={`text-sm font-medium mb-2 ${textStyles.paragraph}`}>Or with typos (still works!):</h3>
                <div className="flex flex-wrap gap-2">
                    {typos.map((query, index) => (
                        <button
                            key={`typo-${index}`}
                            onClick={() => onApplyQuery(query)}
                            className="px-3 py-1 bg-purple-100 text-purple-800 rounded-full text-sm hover:bg-purple-200"
                        >
                            {query}
                        </button>
                    ))}
                </div>
            </div>
        </>
    );
};

export default DemoQueries;