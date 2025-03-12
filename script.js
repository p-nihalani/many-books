async function loadBooks() {
    const response = await fetch('books.json');
    const books = await response.json();

    const readingList = document.getElementById('reading-list');
    const readList = document.getElementById('read-list');

    readingList.innerHTML = '';
    readList.innerHTML = '';

    books.forEach(book => {
        const listItem = document.createElement('li');
        listItem.textContent = `${book.title} by ${book.author} (Rating: ${book.rating})`;

        if (book.status === 'reading') {
            readingList.appendChild(listItem);
        } else if (book.status === 'read') {
            readList.appendChild(listItem);
        }
    });
}

loadBooks();
