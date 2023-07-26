# URL Shortener

This is a URL shortener web application built with Node.js, Express.js, MongoDB, and Redis. The application allows users to shorten long URLs, making it easier to share them.

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Technologies](#technologies)
- [Contributing](#contributing)
- [License](#license)
- [Contact](#contact)

## Features

- Shorten long URLs to more manageable short links.
- Custom URL short codes generated using a unique algorithm.
- Redis caching to improve response times for frequently accessed URLs.
- MongoDB for storing the original and shortened URLs.
- Simple and user-friendly web interface.

## Installation

1. Clone the repository to your local machine using the following command:

git clone https://github.com/your-username/url-shortener.git

2. Change to the project directory:

cd url-shortener

3. Install the required npm packages:

npm install

4. Make sure you have MongoDB installed and running on your system.

5. (Optional) If you want to enable Redis caching, make sure you have Redis installed and running on your system. Uncomment the relevant sections in `router.js` and `app.js`.

## Usage

1. Start the server:

npm start

2. Open your web browser and navigate to `http://localhost:3000`.

3. Enter the URL you want to shorten in the input field and click the "Shorten URL" button.

4. If the URL is valid and not already shortened, the shortened URL will be displayed below the input field.

5. Click the shortened URL to redirect to the original long URL.

## Technologies

- Node.js
- Express.js
- MongoDB
- Redis (optional for caching)
- Axios (for URL validation)
- Short-id (for generating custom short codes)
- Valid-url (for validating URLs)

## Contributing

Contributions are welcome! If you find any bugs or have ideas for improvement, please open an issue or submit a pull request.
