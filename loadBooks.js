async function loadBooks() {
    // Fetch data from G-Sheets API (via my G-Apps Script URL)
    const response = await fetch('https://script.google.com/macros/s/AKfycbyqxQcN8aZP-t1RDfjRvMYgriR6tT2yaH-3izl894LGFYYKAsxb559FN63VCZOyz6fA/exec');
    const data = await response.json();

    // Find list elements
    const readingList = document.getElementById('reading-list');
    const readList = document.getElementById('read-list');

    // Clear previous lists
    readingList.innerHTML = '';
    readList.innerHTML = '';

    // Create objects to store books by genre
    const readingGenres = {};
    const readGenres = {};

    // Loop through the data and classify books by genre
    data.forEach(book => {
        // Create list item
        const listItem = document.createElement('li');
        listItem.textContent = `${book.Title} by ${book.Author} (Rating: ${book.Rating})`;

        // Classify books by status and genre
        if (book.Status === 'Reading') {
            if (!readingGenres[book.Genre]) {
                readingGenres[book.Genre] = [];
            }
            readingGenres[book.Genre].push(listItem);
        } else if (book.Status === 'Read') {
            if (!readGenres[book.Genre]) {
                readGenres[book.Genre] = [];
            }
            readGenres[book.Genre].push(listItem);
        }
    });

    // Helper function to display genres only if books exist
    function displayGenres(genreData, listElement) {
        Object.keys(genreData).forEach(genre => {
            // Create genre header
            const genreHeader = document.createElement('h3');
            genreHeader.textContent = genre;
            listElement.appendChild(genreHeader);

            // Display books if there are any in this genre
            if (genreData[genre].length > 0) {
                const genreList = document.createElement('ul');
                genreData[genre].forEach(bookItem => genreList.appendChild(bookItem));
                listElement.appendChild(genreList);
            }
        });
    }

    // Display the books grouped by genre for both reading and read sections
    displayGenres(readingGenres, readingList);
    displayGenres(readGenres, readList);
}

// Call the function to load my books
loadBooks();
