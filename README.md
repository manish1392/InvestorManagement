# InvestorManagement

The repo contains the code for against the technical assessment.

Technologies used.

1. For backend - .Net 8, C#, Azure MS SQL, Entity Framework ORM
2. For UI - React.js, vite, Axios, Typescript, javascript


Folder Structure:

- The src folder contains both frontend and backend code.
- The backend code containing API's and services can be found under src/Service folder.
- The frontend react code UI components and web pages can be found under src/UI folder.


Code Setup:

1. For Backend code setup, run dotnet restore and dotnet build commands.
2. Update appsettings.json with sql server connection details.
3. Then run dot net application, it will spin up an instance with open api/swagger documentation for endpoints exposed.

For UI code:
1. Clone the repository.
2. run npm install
3. modify the localhost endpoint to point to backend api services in .env file.
4. npm run dev

