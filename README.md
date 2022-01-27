## Student Endpoint

| Query    | User                      | Function                                                                 |
| -------- | ------------------------- | ------------------------------------------------------------------------ |
| `GET`    | `/api/student/signin`     | Allows the student to log into the system                                |
| `POST`   | `/api/student/signup`     | Allows the student to register in the system                             |
| `PUT`    | `/api/student/:id`        | Allows the student to update (✅ open to everyone)                       |
| `PUT`    | `/api/student/intern_req` | Internship request is provided to the system. (⛔️ closed to "admin" ⚠️) |
| `DELETE` | `/api/student/:id`        | Allows student to be deleted (⛔️ closed to "student" ⚠️)                |

## Admin Endpoint

| Query  | User                | Function                                                |
| ------ | ------------------- | ------------------------------------------------------- |
| `GET`  | `/api/admin/signin` | Allows the admin to log into the system                 |
| `POST` | `/api/admin/signup` | Allows the admin to register in the system              |
| `PUT`  | `/api/admin/:id`    | Allows the admin to update (⛔️ closed to "student" ⚠️) |

## Intern Endpoint

| Query    | Intern                                | Function                                                                                            |
| -------- | ------------------------------------- | --------------------------------------------------------------------------------------------------- |
| `GET`    | `/api/intern/fetch_all`               | Retrieves all files stored in the system. (⛔️ closed to "student" ⚠️)                              |
| `GET`    | `/api/intern?student_id=`             | Bring the internships connected to the student. (✅ open to everyone)                               |
| `GET`    | `/api/intern?student_id=&?complated=` | Bring completed internships tied to the student. (✅ open to everyone)                              |
| `GET`    | `/api/intern/:id`                     | Brings the file registered in the system according to the id property. (⛔️ closed to "student" ⚠️) |
| `PUT`    | `/api/intern/:id`                     | It updates the file registered in the system according to the id property.(✅ open to everyone)     |
| `PUT`    | `/api/intern/sign_it/:id?who=`        | Provides the signing of the existing internship right (⛔️ closed to "student" ⚠️)                  |
| `DELETE` | `/api/intern/:id`                     | It deletes the file registered in the system according to the id property. (✅ open to everyone)    |
