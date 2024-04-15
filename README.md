# Travel Diary Platform Backend
Use `npm install` to install the packages.



<br/>
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
</Section>

<Section id="section2">

### API 2

#### Path: `/register`

#### Method: `POST`

**Request**

```
{
    "username": "demo2@gmail.com",
    "name": "demoName",
    "gender": "Female",
    "location": "Hyderabad",
    "password": "123456789"
}
```

- **Scenario 1**

  - **Description**:

    If the user already exists

  - **Response**
    - **Status code**
      ```
      400
      ```
    - **Body**
      ```
      User already exists
      ```

- **Scenario 2**

  - **Description**:

    If its a new User

  - **Response**
    - **Status code**
      ```
      200
      ```
    - **Body**
      ```
      Created new User with lastID
      ```

</Section>

<Section id="section3">

### API 3

#### Path: `/login`

#### Method: `POST`

**Request**

```
{
    "username": "demo2@gmail.com",
    "password": "123456789"
}
```

- **Scenario 1**

  - **Description**:

    If the user doesnt exists in database

  - **Response**
    - **Status code**
      ```
      400
      ```
    - **Body**
      ```
      Invalid User
      ```

- **Scenario 2**

  - **Description**:

    If Password is incorrect

  - **Response**
    - **Status code**
      ```
      400
      ```
    - **Body**
      ```
      Invalid Password!
      ```
- **Scenario 3**

  - **Description**:

    Successful login of the user

  - **Response**

    Return the JWT Token

    ```
    {
      "jwtToken": "ak2284ns8Di32......"
    }
    ```

</Section>

<Section id="section4">

### API 4

#### Path: `/diaries`

#### Method: `GET`

**Request**

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImRlbW8yQGdtYWlsLmNvbSIsImlhdCI6MTcxMzA5NTc2NH0.6RB0dImtZ2sxpfL8JP1VQmDw5YPjPLyKPPyrjiAJ63Q

```

- **Scenario 1**

  - **Description**:

    Invalid JwtToken  

  - **Response**
     - **Status code**
    ```
      401
    ```
    - **Body**
    ```
    Invalid JWT Token
    ```

-**Scenario 2**
- **Response**
  - **Status code**
    ```
      200
    ```
- **Body**
```
      [
  {
    "id": 1,
    "title": "Trip to Nandi Hills",
    "description": "Visited Nandi Hills and Skandhagiri Hills",
    "Date": "2024-04-16",
    "Location": "Chikkabellapur",
    "user_id": 1
  },
 '
 '
 '
 '
 '
  {
    "id": 6,
    "title": "A Day in Church Street",
    "description": "Visited Church Street, did shopping",
    "Date": "2024-04-10",
    "Location": "Bangaluru",
    "user_id": 1
  }
]
```

</Section>


<Section id="section5">

### API 5

#### Path: `/diary/:diaryId`

#### Method: `GET`

**Request**

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImRlbW8yQGdtYWlsLmNvbSIsImlhdCI6MTcxMzA5NTc2NH0.6RB0dImtZ2sxpfL8JP1VQmDw5YPjPLyKPPyrjiAJ63Q

```

- **Scenario 1**

  - **Description**:

    Invalid JwtToken  

  - **Response**
     - **Status code**
    ```
      401
    ```
    - **Body**
    ```
    Invalid JWT Token
    ```

- **Scenario 2**
- **Response**
  - **Status code**
  ```
    200
  ```
  - **Body**
    ```
    
{
  "id": 1,
  "title": "Trip to Nandi Hills",
  "description": "Visited Nandi Hills and Skandhagiri Hills",
  "Date": "2024-04-16",
  "Location": "Chikkabellapur",
  "user_id": 1
}
    ```

</Section>

<Section id="section6">

### API 6

#### Path: `/user/:userId/diaries`

#### Method: `GET`

**Request**

```
Authorization: Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6ImRlbW8yQGdtYWlsLmNvbSIsImlhdCI6MTcxMzA5NTc2NH0.6RB0dImtZ2sxpfL8JP1VQmDw5YPjPLyKPPyrjiAJ63Q

```
- **Scenario 1**

  - **Description**:

    Invalid JwtToken  

  - **Response**
     - **Status code**
    ```
      401
    ```
    - **Body**
    ```
    Invalid JWT Token
    ```
- **Scenario 2**
- **Response**
  - **Status code**
  ```
    200
  ```
  - **Body**
    ```
    
[
  {
    "id": 2,
    "title": "Hiking adventure",
    "description": "Explored the mountains and enjoyed the scenic views",
    "Date": "2024-04-20",
    "Location": "Switzerland",
    "user_id": 2
  },
  {
    "id": 4,
    "title": "City tour",
    "description": "Visited historical landmarks and tried local cuisine",
    "Date": "2024-04-22",
    "Location": "Rome, Italy",
    "user_id": 2
  }
]
    ```

</Section>

'
'
'
'




















