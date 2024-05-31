const apiUrl = "https://api.quotable.io/random";
const newBtn = document.querySelector('.newBtn');
const tweetBtn = document.querySelector('.twt');
const quoteElement = document.querySelector('#quote');
const authorElement = document.querySelector('#author');
let quoteText = "";
let quoteAuthor = "";

async function quoteGenerator() {
    try {
        const response = await fetch(apiUrl);
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        console.log(data);
        quoteText = `"${data.content}"`;
        quoteAuthor = data.author;
        // Update the DOM only once
        quoteElement.textContent = data.content;
        authorElement.textContent = data.author;
    } catch (error) {
        console.error('Error fetching the quote:', error);
        quoteElement.textContent = "Oops! Something went wrong. Please try again.";
        authorElement.textContent = "";
    }
}

quoteGenerator();

newBtn.addEventListener('click', quoteGenerator);

tweetBtn.addEventListener('click', () => {
    const tweetText = encodeURIComponent(`${quoteText} -- ${quoteAuthor}`);
    window.open(`https://twitter.com/intent/tweet?text=${tweetText}`, "Tweet Window", "width=600,height=300");
});
