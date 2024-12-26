const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
const result = document.getElementById("result");
const sound = document.getElementById("sound");
const btn = document.getElementById("search-btn");
const inpWord = document.getElementById("inp-word");

// Function to perform the search
function searchWord() {
    /*document.getElementById("h").style.display = "none"; // Hide the title*/
    const word = inpWord.value.trim(); // Get the input word and remove extra spaces

    if (!word) {
        result.innerHTML = `<h3 class="error">Please enter a word to search</h3>`;
        return;
    }

    fetch(`${url}${word}`)
        .then((response) => response.json())
        .then((data) => {
            if (data && Array.isArray(data) && data.length > 0) {
                const audio = data[0].phonetics.find((p) => p.audio)?.audio || "";
                sound.setAttribute("src", audio);

                result.innerHTML = `
                    <div class="word">
                        <h3>${word}</h3>
                        <button onclick="playSound()">
                            <i class="fas fa-volume-up"></i>
                        </button>
                    </div>
                    <div class="details">
                        <p>${data[0].meanings[0].partOfSpeech || "No part of speech available"}</p>
                        <p>/${data[0].phonetic || "No phonetic available"}/</p>
                    </div>
                    <p class="word-meaning">
                        ${data[0].meanings[0].definitions[0].definition || "No definition available"}
                    </p>
                    <p class="word-example">
                        ${data[0].meanings[0].definitions[0].example || "No example available"}
                    </p>`;
            } else {
                throw new Error("No data found");
            }
        })
        .catch(() => {
            result.innerHTML = `<h3 class="error">Couldn't find the word. Please try another one.</h3>`;
        });
}

// Function to play the pronunciation audio
function playSound() {
    if (sound.src) {
        sound.play();
    } else {
        alert("Pronunciation audio is not available for this word.");
    }
}

// Event listener for the "Search" button click
btn.addEventListener("click", searchWord);

// Event listener for pressing the "Enter" key in the input field
inpWord.addEventListener("keydown", (event) => {
    if (event.key === "Enter") {
        searchWord();
    }
});
