document.getElementById('bookForm').addEventListener('submit', async function (event) {
    event.preventDefault(); // Prevent the default form submission behavior

    // Capture input field values
    const title = document.getElementById('title').value;
    const author = document.getElementById('author').value;
    const genre = document.getElementById('genre').value;
    const status = document.getElementById('status').value;
    const rating = document.getElementById('rating').value;

    // Create a book object with the form data
    const newBook = {
        Title: title,
        Author: author,
        Genre: genre,
        Status: status,
        Rating: rating
    };

    try {
        // Send a POST request to your Google Apps Script URL to add the new book
        const response = await fetch('https://script.google.com/macros/s/AKfycbyqxQcN8aZP-t1RDfjRvMYgriR6tT2yaH-3izl894LGFYYKAsxb559FN63VCZOyz6fA/exec', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newBook)
        });

        // Check if the response is OK
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Handle response
        const data = await response.json();
        if (data.result === 'success') {
            alert('Book added successfully!');
            document.getElementById('bookForm').reset(); // Reset the form after submission
            loadBooks(); // Reload the book list to reflect the newly added book
        } else {
            alert('Failed to add book. Please try again.');
        }
    } catch (error) {
        console.error('Error adding book:', error);
        alert(`An error occurred: ${error.message}`);
    }
});

// Function to load books and update the UI
async function loadBooks() {
    try {
        const response = await fetch('https://script.google.com/macros/s/AKfycbyqxQcN8aZP-t1RDfjRvMYgriR6tT2yaH-3izl894LGFYYKAsxb559FN63VCZOyz6fA/exec');

        // Check if the response is OK
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();

        const bookList = document.getElementById('bookList');
        bookList.innerHTML = ''; // Clear the current book list

        if (data.books && Array.isArray(data.books)) {
            data.books.forEach(book => {
                const listItem = document.createElement('li');
                listItem.textContent = `${book.Title} by ${book.Author} - ${book.Genre} - ${book.Status} - ${book.Rating}`;
                bookList.appendChild(listItem);
            });
        } else {
            console.error('Unexpected data format:', data);
            alert('An error occurred while loading books. Please try again.');
        }
    } catch (error) {
        console.error('Error loading books:', error);
        alert(`An error occurred: ${error.message}`);
    }
}

// Load books on page load
document.addEventListener('DOMContentLoaded', loadBooks);
