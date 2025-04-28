async function loadBooks() {
    try {
        // Fetch data from G-Sheets API (via your G-Apps Script URL)
        const response = await fetch('https://script.google.com/macros/s/AKfycbyqxQcN8aZP-t1RDfjRvMYgriR6tT2yaH-3izl894LGFYYKAsxb559FN63VCZOyz6fA/exec');

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        const bookList = document.getElementById('book-list');

        if (!bookList) {
            throw new Error('Book list element not found in the DOM');
        }

        bookList.innerHTML = '';

        const genres = {};

        data.forEach(book => {
            const listItem = document.createElement('li');
            const rating = book["My Rating"] || "Not Rated";
            const year = book.Year ? ` (${book.Year})` : '';

            // *** NOTE: No genre printed here ***
            listItem.textContent = `${book.Title} by ${book.Author}${year} (My Rating: ${rating})`;

            if (!genres[book.Genre]) {
                genres[book.Genre] = [];
            }
            genres[book.Genre].push(listItem);
        });

        Object.keys(genres).forEach(genre => {
            if (genres[genre].length > 0) {
                const genreSection = document.createElement('section');
                genreSection.classList.add('genre-section');

                const genreHeader = document.createElement('h3');
                genreHeader.textContent = genre;
                genreSection.appendChild(genreHeader);

                const genreList = document.createElement('ul');
                genres[genre].forEach(bookItem => genreList.appendChild(bookItem));
                genreSection.appendChild(genreList);

                bookList.appendChild(genreSection);
            }
        });
    } catch (error) {
        console.error('Error loading books:', error);
        alert(`An error occurred: ${error.message}`);
    }
}
