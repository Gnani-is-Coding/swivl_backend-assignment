# Travel Diary Platform Backend
Given an `app.js` file and a database file `travelDiary.db` consisting of two tables `user`, `Diary`.

**User Table**

| Column   | Type    |
| -------- | ------- |
| id  | INTEGER |
| name     | TEXT    |
| username | TEXT    |
| password | TEXT    |
| gender   | TEXT    |
| Location | TEXT    |

**Diary Table**

| Column              | Type    |
| ------------------- | ------- |
| `Id`                | INTEGER |
| `Title`             | TEXT    |
| `Description`       | TEXT    |
| `Date`              | DATETIME| 
| `Location`          | TEXT    |
| `User_id`           | INTEGER |

#### Sample Valid User Credentials

```
{
  "username":"demo2@gmail.com",
  "password":"123456789"
}
```

<Section id="section1" >

### API 1

#### Path: `/users`

#### Method: `GET`

**Response**
    - **Status code**
      ```
      400
      ```
    - **Body**
      ```
      [
      {
        "id": 1,
        "username": "demo@gmail.com",
        "name": "Gnani",
        "Gender": "Male",
        "PASSWORD": "123",
        "Location": "Bangalore"
      },
      {
        "id": 2,
        "username": "demo2@gmail.com",
        "name": "demoName",
        "Gender": "Female",
        "PASSWORD": "$2b$10$CXv/ADymZsWp/6ChzmTs.OwyBaWIGowImfiU.9XGf2q.u9Dg7iOQe",
        "Location": "Hyderabad"
      }
    ]
          ```
