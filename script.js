async function loadBooks() {
    try {
        // Replace the URL with your actual Google Sheets data URL
        const response = await fetch('https://spreadsheets.google.com/feeds/list/YOUR_SPREADSHEET_ID/od6/public/values?alt=json');

        // Check if the response is successful
        if (!response.ok) {
            throw new Error('Network response was not okay');
        }

        // Parse the JSON data returned by Google Sheets
        const data = await response.json();

        // Get the list of books from the fetched data (entries)
        const books = data.feed.entry;

        // Get the two lists where the books will be displayed
        const readingList = document.getElementById('reading-list');
        const readList = document.getElementById('read-list');

        // Clear the previous lists
        readingList.innerHTML = '';
        readList.innerHTML = '';

        // Loop through the books and add them to the appropriate list
        books.forEach(book => {
            const listItem = document.createElement('li');

            // Construct the text content for each book (Title, Author, Rating)
            listItem.textContent = `${book.gsx$title.$t} by ${book.gsx$author.$t} (Rating: ${book.gsx$rating.$t})`;

            // Based on the book's status, append it to the correct list
            if (book.gsx$status.$t === 'reading') {
                readingList.appendChild(listItem);
            } else if (book.gsx$status.$t === 'read') {
                readList.appendChild(listItem);
            }
        });
    } catch (error) {
        console.error('Error loading books:', error);
    }
}

// Call the function to load books when the page loads
loadBooks();
