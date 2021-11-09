


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
- Counts

### Leader
- Update Self Account
### Employee
- Update Self Account

## Flow Chart

```mermaid
graph LR
A[User] --> B[Admin] --> Login(Login) -- with admin privilege --> F[Admin]
Login(Login) -- with leader privilege --> LoginLeader[Leader]
Login(Login) -- with employee privilege --> LoginEmployee[Employee]
F[Admin] --> Add[Add]
Add[Add] --> AddAdmin[Admin]
Add[Add] --> AddLeader[Leader]
Add[Add] --> AddEmployee[Employee]
Add[Add] --> AddTeam[Team]
LoginLeader[Leader]--> View[View]
View[View] --> ViewMembers[Members]
View[View] --> ViewTeamStatus[Team Status]
LoginLeader[Leader]--> LeaderEdit[Edit]
LeaderEdit[Edit] --> EditTeam[Team Iformation]
F[Admin] --> Edit[Edit] --> Admin[Admin]
Edit[Edit] --> Leader[Leader]
Edit[Edit] --> Employee[Employee]
Edit[Edit] --> Team[Team]
LoginEmployee[Employee]-->updateself[Update Self]
LoginEmployee[Employee]-->Track[View Self Ranking]
LoginEmployee[Employee]--> ViewTar[View Target Paid Amount]
A[User] --> C[Leader]--> Login(Login)
A[User] --> D[Employee]--> Login(Login)
```


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

