async function loadBooks() {
    try {
        // Updated fetch path without the leading slash for GitHub Pages deployment
        const response = await fetch('many-books/books.json');
        console.log('Response Status:', response.status);  // Check if the fetch was successful

        if (!response.ok) {
            // If the response isn't ok, throw an error
            throw new Error('Network response was not ok');
        }

        // Parse the JSON response
        const books = await response.json();
        console.log('Books:', books);  // Log the books array to check if it's loaded correctly

        // Check if books is an array
        if (!Array.isArray(books)) {
            throw new Error('Expected an array of books');
        }

        // Get the HTML elements where the lists will be displayed
        const readingList = document.getElementById('reading-list');
        const readList = document.getElementById('read-list');

        // Clear any existing lists before adding new books
        readingList.innerHTML = '';
        readList.innerHTML = '';

        // Iterate over each book and add it to the appropriate list
        books.forEach(book => {
            const listItem = document.createElement('li');
            listItem.textContent = `${book.title} by ${book.author} (Rating: ${book.rating})`;

            if (book.status === "reading") {
                readingList.appendChild(listItem);
            } else if (book.status === "read") {
                readList.appendChild(listItem);
            }
        });
    } catch (error) {
        console.error('Error loading books:', error);
    }
}

// Call the function to load the books
loadBooks();

