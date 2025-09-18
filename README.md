#### Basic information

The project was bootstrapped with React + TypeScript + Vite template.

Repository: https://github.com/zoltanradics/mindtech-senior-fe-dq

#### How to install
```
# Clone repository
$ git clone git@github.com:zoltanradics/mindtech-senior-fe-dq.git

# You can run npm install, but to install locked dependencies, npm ci is enough
$ npm ci 

# Serve the project on your machine
$ npm run dev

```

#### Developer checklist (I was going through these items on the requirement list)

- [x] Initialize a new React project with TypeScript template.
- [x] Set up a folder structure that you would use in a production-ready application.
- [x] Use this API endpoints to fetch the required data from:
- [x] Fetch user data from the API.
- [x] Display the list of users using Material react table
- [x] Show the following user fields (name, email, username, Company name)
- [x] Add a search input to filter users by name or email (case-insensitive).
(@zoltanradics Provided by Material react table by default)
-  [x] Display loading and error states with appropriate UI. (@zoltanradics Provided by Material react table config)
- [x] Create a UserContext using React's Context API to:
- [x] Clicking a user opens a modal (Material UI) showing more details: (name, username, email, phone, website, company.name, and
address.city)