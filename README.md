# Boiler Plate ExpressJs Typscript Eslint
This is a simple boilerplate for setting up an Express.js server with TypeScript. It provides a basic structure to kickstart your backend development.

## Features
-   Express.js server setup with TypeScript
-   Basic folder structure
-   Security middleware setup

## Prerequisites
Before you begin, ensure you have met the following requirements:

-   Node.js installed on your local machine
-   npm or yarn package manager installed

## Getting Started
To get started with this boilerplate, follow these steps:

1.  Clone the repository to your local machine:
   	```ruby
	git clone https://github.com/sukronsabari/simple-express-ts-boilerplate.git
	```
2.  Navigate to the project directory:
   	```ruby
	cd express-typescript-boilerplate
	```
3. Install dependencies:
   ```ruby
    npm install
    ``` 
    
    or
    
    ```ruby
    yarn
    ``` 
4. Start the development server:
     ```ruby
    npm run start:dev
    ``` 
    
    or
    
    ```ruby
    yarn start:dev
    ``` 
    
5.  Open your browser and navigate to `http://localhost:5000` to see the server running.


## Directory Structure
```bash
express-typescript-boilerplate/
│
├── src/                     # Source files
│   ├── controllers/         # Controller functions
│   ├── middleware/          # Custom middleware
│   ├── routes/              # Express routes
│   ├── app.ts               # Main application file
│   └── server.ts            # Server initialization
│
├── .gitignore               # Specifies intentionally untracked files to ignore
├── package.json             # Project metadata and dependencies
├── tsconfig.json            # TypeScript configuration
└── README.md                # Project documentation
```
