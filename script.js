async function loadBooks() {
    const url = 'https://script.google.com/macros/s/AKfycby-T1PKKbpGgnZ00w0zAw51_1wsLTfl-6-2nA5zAujcCakzVw1JAexX-MVFwpX3uQkW/exec'; // Your Web App URL

    const response = await fetch(url);
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
