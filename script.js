async function loadBooks() {
    try {
        const response = await fetch('books.json');
        console.log('Response Status:', response.status);  // Check if the fetch was successful
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const books = await response.json();
        console.log('Books:', books);  // Log the books array to check if it's loaded correctly

        if (!Array.isArray(books)) {
            throw new Error('Expected an array of books');
        }

        const readingList = document.getElementById('reading-list');
        const readList = document.getElementById('read-list');

        // Clear any existing lists before adding new books
        readingList.innerHTML = '';
        readList.innerHTML = '';

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

loadBooks();
