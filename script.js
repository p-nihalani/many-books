async function loadBooks() {
    const response = await fetch('books.json');
    const books = await response.json();

    const readingList = document.getElementById('reading-list');
    const readList = document.getElementById('read-list');

    // Clear previous list items
    readingList.innerHTML = '';
    readList.innerHTML = '';

    books.forEach(book => {
        const listItem = document.createElement('li');
        listItem.textContent = `${book.title} by ${book.author} (Rating: ${book.rating})`;

        if (book.status === 'reading') {
            readingList.appendChild(listItem); // Add to 'Reading' list
        } else if (book.status === 'read') {
            readList.appendChild(listItem); // Add to 'Read' list
        }
    });
}

loadBooks();
