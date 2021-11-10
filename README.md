


### Target Management

The main motive of to build this application to manage the employee, teams, leaders, and targets of your company.

Using this script you can track your employee targets etc.. export the details in cvs and pdf. and much more.


## Features

- Light/dark mode toggle
- Live previews
- Fullscreen mode
- Cross platform

## Roles
- Admin
- Leader
- Employee

## Current Backend Features
### Auth
- Login
- Forgot Password
- Reset Password
- Logout
- Refresh Access Token

### Admin
- Create User
- Update User
- Employees
- Free Employees
- Employee
- User - No Filter (Admin,Leader,Employee)
- Admins
- Admin
- Leaders
- Leader
- Create Team
- Update Team
- Teams
- Team
- Team Members
- Add Team Member
- Remove Team Member
- Add Team Leader
- Remove Team Member
- Counts

### Leader
- Update Self Account
### Employee
- Update Self Account

## Install
To install it in your system. symply download and extract it to anywhere.
Open CMD from the root folder and fire the command. `NPM UPDATE`
Go To backend and fire command `NPM UPDATE`

Open .env file and mention their your database name.

As per the security only admin can create Admins, Leaders and Employees. So you have insert this dummy data in your users collection to logged in into the system.
```json
[{
  "_id": {
    "$oid": "618c4861d3481fe2115a6d97"
  },
  "name": "Social Codia",
  "email": "socialcodia@gmail.com",
  "username": "socialcodia",
  "mobile": 9867503256,
  "password": "$2b$10$PEZ5QHRqhTzyA9vZJnleBextO.t23tRvN3lHH8j7n49KY7G90xhxS",
  "type": "admin",
  "status": "active",
  "image": "socialcodia.png",
  "address": "Social Codia, Mumbai",
  "createdAt": {
    "$date": "2021-11-10T22:32:01.101Z"
  },
  "updatedAt": {
    "$date": "2021-11-10T22:32:01.101Z"
  },
  "__v": 0
}]
```

## Flow Chart
![Flow Chart](https://i.imgur.com/mFeSGwq.png "Flow Chart")

## Screenshots

![Login Page](https://i.imgur.com/XRUQxXd.png "Login Page")
![Forgot Password](https://i.imgur.com/CfuUeoS.png "Forgot Password ")
![Reset Password](https://i.imgur.com/JoYDkHO.png "Reset Passwrod")
![Dashboard](https://i.imgur.com/y0o324V.png "Dashboard")
![Add User](https://i.imgur.com/WIoZGWp.png "Add User")
![Users](https://i.imgur.com/3XB0gCH.png "Users")
![User](https://i.imgur.com/lg7AlAy.png "User")
![Edit User](https://i.imgur.com/g6wKmO6.png "Edit User")
![Teams](https://i.imgur.com/RRyCJyk.png "Teams")
![Team](https://i.imgur.com/Qsps5zY.png "Team")

## API Reference

#### Get all collections of API

```http
  https://www.postman.com/socialcodia/workspace/target-management
```


## 🚀 About Me
I'm a full stack developer...

## Support

For support, email socialcodia@gmail.com or join our Slack channel.

