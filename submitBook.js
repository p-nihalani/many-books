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
        const response = await fetch('https://script.google.com/macros/s/YOUR_WEB_APP_URL/exec', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(newBook), // Convert object to JSON string
        });

        // Check if the response is OK (status code 200)
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Handle the response from Google Apps Script
        const data = await response.json(); // Parse the JSON response

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
