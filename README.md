# Pro-Intern

## _Abant Izzet Baysal University Intern Project_

##### Explanation:

On behalf of Abant izzet Baysal University, the name of this project is 'Internship Automation and Process Management'. I will call him 'Pro-Intern' because he facilitates internship management. It is also a graduation project. Thank you for your support.👾

- Faculty friendly
- Company Friendly
- User friendly ✨

## Tech

Pro-Intern uses a number of open source projects to work properly:

- [node.js] - Evented I/O for the backend
- [Express] - Fast node.js network app framework

And of course Pro-Intern itself is open source with a [public repository]
on GitHub.

## Installation

Pro-Intern requires [Node.js](https://nodejs.org/) v10+ to run.

Install the dependencies and devDependencies and start the server.

```sh
cd pro-intern-server
npm install
npm start
```

```sh
127.0.0.1:8000
```

For production environments...

```sh
npm install --production
NODE_ENV=production node app
```

## User Endpoint

| Query    | User                      | Function                                                                                                           |
| -------- | ------------------------- | ------------------------------------------------------------------------------------------------------------------ |
| `GET`    | `/api/user/login`         | Allows the User to log into the system                                                                             |
| `GET`    | `/api/user/login/current` | Allows the User to log into the system                                                                             |
| `POST`   | `/api/user/register`      | Allows the User to register in the system                                                                          |
| `PUT`    | `/api/user/:id`           | Allows the User to update (✅ open to everyone, ✅ "admin" open to "student", ⛔️ closed to "student" "admin" ⚠️)) |
| `PUT`    | `/api/user/intern_req`    | Internship request is provided to the system. (⛔️ closed to "admin" ⚠️)                                           |
| `DELETE` | `/api/user/:id`           | Allows User to be deleted (⛔️ closed to "student" ⚠️)                                                             |

## Intern Endpoint

| Query    | Intern                             | Function                                                                                         |
| -------- | ---------------------------------- | ------------------------------------------------------------------------------------------------ |
| `GET`    | `/api/intern/fetch_all`            | Retrieves all files stored in the system. (⛔️ closed to "User" ⚠️)                              |
| `GET`    | `/api/intern?User_id=`             | Bring the internships connected to the User. (✅ open to everyone)                               |
| `GET`    | `/api/intern?User_id=&?complated=` | Bring completed internships tied to the User. (✅ open to everyone)                              |
| `GET`    | `/api/intern/:id`                  | Brings the file registered in the system according to the id property. (⛔️ closed to "User" ⚠️) |
| `PUT`    | `/api/intern/:id`                  | It updates the file registered in the system according to the id property.(✅ open to everyone)  |
| `PUT`    | `/api/intern/sign_it/:id?who=`     | Provides the signing of the existing internship right (⛔️ closed to "User" ⚠️)                  |
| `DELETE` | `/api/intern/:id`                  | It deletes the file registered in the system according to the id property. (✅ open to everyone) |

## License

MIT
