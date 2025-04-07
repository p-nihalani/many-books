async function loadBooks() {
    try {
        // Fetch data from G-Sheets API (via my G-Apps Script URL)
        const response = await fetch('https://script.google.com/macros/s/AKfycbyqxQcN8aZP-t1RDfjRvMYgriR6tT2yaH-3izl894LGFYYKAsxb559FN63VCZOyz6fA/exec');

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        const readingList = document.getElementById('reading-list');
        const readList = document.getElementById('read-list');

        if (!readingList || !readList) {
            throw new Error('List elements not found in the DOM');
        }

        readingList.innerHTML = '';
        readList.innerHTML = '';

        const readingGenres = {};
        const readGenres = {};

        data.forEach(book => {
            const listItem = document.createElement('li');
            listItem.textContent = `${book.Title} by ${book.Author} (Rating: ${book.Rating})`;

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

        function displayGenres(genreData, listElement) {
            Object.keys(genreData).forEach(genre => {
                if (genreData[genre].length > 0) {
                    const genreHeader = document.createElement('h3');
                    genreHeader.textContent = genre;
                    listElement.appendChild(genreHeader);

                    const genreList = document.createElement('ul');
                    genreData[genre].forEach(bookItem => genreList.appendChild(bookItem));
                    listElement.appendChild(genreList);
                }
            });
        }

        displayGenres(readingGenres, readingList);
        displayGenres(readGenres, readList);
    } catch (error) {
        console.error('Error loading books:', error);
        alert(`An error occurred: ${error.message}`);
    }
}
