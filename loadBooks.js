async function loadBooks() {
    // Fetch data from G-Sheets API (via your G-Apps Script URL)
    const response = await fetch('https://script.google.com/macros/s/AKfycbyqxQcN8aZP-t1RDfjRvMYgriR6tT2yaH-3izl894LGFYYKAsxb559FN63VCZOyz6fA/exec'); // Updated URL
    const data = await response.json();

    // Find list elements
    const readingList = document.getElementById('reading-list');
    const readList = document.getElementById('read-list');

    // Clear previous lists
    readingList.innerHTML = '';
    readList.innerHTML = '';

    // Create an object to hold categorized books by genre
    const genres = {};

    // Loop through the data and categorize books based on genre
    data.forEach(book => {
        // Create a list item for each book
        const listItem = document.createElement('li');
        listItem.textContent = `${book.Title} by ${book.Author} (Rating: ${book.Rating}, Genre: ${book.Genre})`;

        // If genre doesn't exist in genres object, create a new array for it
        if (!genres[book.Genre]) {
            genres[book.Genre] = { reading: [], read: [] };
        }

        // Add book to corresponding list based on its status
        if (book.Status === 'Reading') {
            genres[book.Genre].reading.push(listItem); // Add to genre-specific reading list
        } else if (book.Status === 'Read') {
            genres[book.Genre].read.push(listItem); // Add to genre-specific read list
        }
    });

    // Now display books grouped by genre
    Object.keys(genres).forEach(genre => {
        // Create a section for each genre
        const genreSection = document.createElement('section');
        const genreTitle = document.createElement('h3');
        genreTitle.textContent = genre; // Genre name
        genreSection.appendChild(genreTitle);

        // Create lists for reading and read books within the genre
        const readingListForGenre = document.createElement('ul');
        genres[genre].reading.forEach(item => readingListForGenre.appendChild(item)); // Add to reading list for this genre
        genreSection.appendChild(readingListForGenre);

        const readListForGenre = document.createElement('ul');
        genres[genre].read.forEach(item => readListForGenre.appendChild(item)); // Add to read list for this genre
        genreSection.appendChild(readListForGenre);

        // Append the genre section to the main reading and read lists
        readingList.appendChild(genreSection); // Add to the main 'Currently Reading' section
        readList.appendChild(genreSection); // Add to the main 'Books Read' section
    });
}

// Call the function to load my books
loadBooks();
