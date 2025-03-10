// src/utils/speechUtils.js
export const speakWord = (word) => {
    if ('speechSynthesis' in window) {
        const utterance = new SpeechSynthesisUtterance(word);
        utterance.rate = 0.9; // Slightly slower for clarity
        window.speechSynthesis.speak(utterance);
        return true;
    } else {
        console.log(`Speaking: ${word}`);
        return false;
    }
};