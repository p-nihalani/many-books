async function loadBooks() {
    try {
        const response = await fetch('many-books/books.json');
        
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }

        const books = await response.json();

        const readingList = document.getElementById('reading-list');
        const readList = document.getElementById('read-list');

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
