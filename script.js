let speech = new SpeechSynthesisUtterance();

let voices = [];
let voiceSelect = document.querySelector("select");

// Function to load voices
function populateVoices() {
    voices = window.speechSynthesis.getVoices();

    // Clear the select options
    voiceSelect.innerHTML = "";

    voices.forEach((voice, i) => {
        let option = document.createElement("option");
        option.value = i;
        option.textContent = voice.name;
        voiceSelect.appendChild(option);
    });

    // Set the default voice
    speech.voice = voices[0];
}

// Check if voices are already loaded
if (speechSynthesis.onvoiceschanged !== undefined) {
    speechSynthesis.onvoiceschanged = populateVoices;
} else {
    // Fallback for browsers that may not trigger the onvoiceschanged event
    setTimeout(populateVoices, 100);
}

// Change the voice when selecting a different option
voiceSelect.addEventListener("change", () => {
    speech.voice = voices[voiceSelect.value];
});

document.querySelector("button").addEventListener("click", () => {
    speech.text = document.querySelector("textarea").value;
    window.speechSynthesis.speak(speech);
});
