async function loadBooks() {
    // Fetch data from G-Sheets API (via my G-Apps Script URL)
    const response = await fetch('https://script.google.com/macros/s/AKfycbyqxQcN8aZP-t1RDfjRvMYgriR6tT2yaH-3izl894LGFYYKAsxb559FN63VCZOyz6fA/exec'); // Updated URL
    const data = await response.json();

    // Find list elements
    const readingList = document.getElementById('reading-list');
    const readList = document.getElementById('read-list');

    // Clear previous lists
    readingList.innerHTML = '';
    readList.innerHTML = '';

    // Group books by genre
    const genres = {};

    data.forEach(book => {
        // If the genre is not already in the genres object, create it
        if (!genres[book.Genre]) {
            genres[book.Genre] = { reading: [], read: [] };
        }

        // Push books into the appropriate genre group
        if (book.Status === 'Reading') {
            genres[book.Genre].reading.push(book);
        } else if (book.Status === 'Read') {
            genres[book.Genre].read.push(book);
        }
    });

    // Function to create book list item
    const createBookItem = (book) => {
        const listItem = document.createElement('li');
        listItem.classList.add('book-item');
        listItem.innerHTML = `${book.Title} by ${book.Author} (Rating: ${book.Rating})`;
        return listItem;
    };

    // Render books by genre in the "Currently Reading" section
    Object.keys(genres).forEach(genre => {
        const genreSectionReading = document.createElement('div');
        const genreHeaderReading = document.createElement('h3');
        genreHeaderReading.textContent = `${genre} (Currently Reading)`;
        genreSectionReading.appendChild(genreHeaderReading);
        genres[genre].reading.forEach(book => {
            genreSectionReading.appendChild(createBookItem(book));
        });
        readingList.appendChild(genreSectionReading);
    });

    // Render books by genre in the "Books Read" section
    Object.keys(genres).forEach(genre => {
        const genreSectionRead = document.createElement('div');
        const genreHeaderRead = document.createElement('h3');
        genreHeaderRead.textContent = `${genre} (Read)`;
        genreSectionRead.appendChild(genreHeaderRead);
        genres[genre].read.forEach(book => {
            genreSectionRead.appendChild(createBookItem(book));
        });
        readList.appendChild(genreSectionRead);
    });
}

// Call the function to load my books
loadBooks();
