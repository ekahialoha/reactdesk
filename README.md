ReactDesk
======

### Technologies Used

ReactDesk was created with:

- Laravel (PHP)
- ReactJS
- PostgresSQL
- NodeJS
- React Router
- React Bootstrap
- JWT

This app is:

- Deployed on [Heroku](https://reactdesk.herokuapp.com/)
- Hosted on [GitHub](https://github.com/ekahialoha/reactdesk)
- Staff Login
-- Email: demo@localhost
-- Password: pa$$word1


### About This App

ReactDesk is written in PHP using Laravel as the backend/API and also contains the React frontend. There are three different models: Departments, Tickets, and Replies. They relate to each other via Laravel's Eloquent on-to-many relationships. Endusers are able to open tickets and staff is able to manage tickets. Endusers are also able to reply and check the status of their tickets via the website.


### Approach Taken

1. Created user stories. Broke out functionality into small tasks using user stories.
2. Created wireframe of application.
3. Created map of React components and how they would be connected together.
4. Researched Laravel.
5. Researched deploying Laravel application to Heroku.
6. Created models and full CRUD API routes.
7. Created React frontend components.

#### User Stories
 > As a user, I can see available helpdesk departments

 > As a user, I can select a department and open a ticket in that department

 > As a user, I can enter my ticket ID to track my ticket

 > As a user, I can reply to my own ticket

 > As staff, I can manage departments

 > As staff, I can see all tickets

 > As staff, I can manage ticket status

 > As staff, I can create other staff member accounts


### Author

- [Christian Kelsom-Martin](https://www.chriskelsom.com) - [GitHub](https://github.com/ekahialoha) - [LinkedIn](https://www.linkedin.com/in/ckelsom-martin/)


### Future Improvements

- Integrate email with ticket flow
- Ability for Endusers to be able to create an account
- More CRM (Customer Relation Management) features
