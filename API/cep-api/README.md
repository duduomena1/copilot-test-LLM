# cep-api Project

This project is a simple Node.js API that retrieves address information based on a provided Brazilian postal code (CEP) using the Via CEP service.

## Project Structure

```
cep-api
├── src
│   ├── app.js                # Entry point of the application
│   ├── controllers
│   │   └── cepController.js  # Controller for handling CEP requests
│   ├── services
│   │   └── cepService.js     # Service for fetching address data
│   └── routes
│       └── cepRoutes.js      # Route definitions for the API
├── package.json              # NPM configuration file
├── .env.example              # Template for environment variables
├── .gitignore                # Git ignore file
└── README.md                 # Project documentation
```

## Setup Instructions

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd cep-api
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   - Copy `.env.example` to `.env` and fill in the required values.

4. **Run the application:**
   ```bash
   node src/app.js
   ```

## Usage

To fetch an address by CEP, send a GET request to the following endpoint:

```
GET /cep/:cep
```

Replace `:cep` with the desired postal code.

## Example

```bash
curl http://localhost:3000/cep/01001-000
```

This will return the address information in JSON format.