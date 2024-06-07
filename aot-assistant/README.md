# AOT Assistant - RAG Application

This project is a learning exercise to understand the structure and implementation of a Retrieve and Generate (RAG) application. It consists of a Node.js backend that integrates with the Ollama API to query an LLM, and a Vue.js frontend styled with Vuetify to interact with the backend.

## Project Structure

The project is divided into two main parts:
1. **Backend**: A Node.js server that handles queries and integrates with the Ollama LLM.
2. **Frontend**: A Vue.js application that provides a user interface for interacting with the backend.

## Backend

The backend is built with Node.js and Express. It initializes a RAG application using the `@llm-tools/embedjs` package and serves an endpoint for querying the LLM.

### Prerequisites

1. **Ollama Server**: Ensure you have the Ollama server installed and running. The server should be accessible at the URL specified in the `.env` file (default is `http://localhost:11434`).

### Setup

1. **Install Dependencies**

    ```bash
    cd backend
    npm install
    ```

2. **Environment Variables**

    Rename `sample.env` to `.env` file in the `backend` directory with the following content:

    ```
    COHERE_API_KEY=<Key Goes Here>
    OLLAMA_API_URL=http://localhost:11434
    ```

3. **Run the Server**

    ```bash
    npm start
    ```

    The server will start on `http://localhost:3000`.

### Endpoints

- **POST /query**

    This endpoint accepts a JSON body with a `query` field and returns a response from the LLM.

    ```bash
    curl -X POST http://localhost:3000/query -H "Content-Type: application/json" -d '{"query": "What are the products offered by AOT?"}'
    ```

## Frontend

The frontend is built with Vue.js and Vuetify. It provides a simple interface for users to input their queries and view the results.

### Setup

1. **Install Dependencies**

    ```bash
    cd frontend/aot-chat-app
    npm install
    ```

2. **Run the Development Server**

    ```bash
    npm run serve
    ```

    The frontend will start on `http://localhost:8080`.

### Components

- **ChatComponent**

    This component provides an input field for the user's query and displays the response from the backend. It uses Vuetify for styling and Axios for making HTTP requests.

## Usage

1. Start the Ollama server.
2. Start the backend server.
3. Start the frontend development server.
4. Open `http://localhost:8080` in your browser.
5. Enter your query in the input field and click "Send" to get a response from the LLM.


## Learning Objectives

- Understand the structure of a RAG application.
- Learn how to integrate a backend API with a frontend application.
- Gain experience with Node.js, Express, Vue.js, and Vuetify.
- Learn how to handle asynchronous operations and display data dynamically.

## Technologies Used

- **Backend**: Node.js, Express, `@llm-tools/embedjs`
- **Frontend**: Vue.js, Vuetify, Axios
- **API**: Ollama LLM

## Acknowledgments

This project is for educational purposes to understand the structure and implementation of RAG applications.

## License

This project is licensed under the MIT License.
