const express = require("express");
const path = require("path")
const {open} = require("sqlite")
const sqlite3 = require("sqlite3")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

const dbPath = path.join(__dirname,"travelDiary.db")

let db = null 
const app = express();
app.use(express.json())

const initializeDbandServer = async () => {
    try{
        db = await open({
            filename: dbPath,
            driver: sqlite3.Database
        })
        app.listen(3004, ()=> {
            console.log("Server Running at http://localhost:3004")
        })
        
    } catch(e) {
        console.log(`DB Error at ${e.message}`)
        process.exit(1)
    }
}

initializeDbandServer()

const authenticateJwtToken = (response,request, next) => {
    let jwtToken
    const authorizationHeaders = response.headers["authorization"]
    
    if (authorizationHeaders) {
        jwtToken = authorizationHeaders.split(" ")[1]
    }
    if (jwtToken === undefined) {
        response.status = 401 
        response.send("Invalid JWT Token")
    } else {
        jwt.verify(jwtToken, "MY_SECRET_TOKEN", (error,payload) => {
            if (error) {
                response.status = 401
                response.send("Invalid JWT Token")
            }else {
                console.log(payload, "authneicated payload")
                response.payload = payload
                next()
            }
        })
    }

}


// Get all USERS API
app.get("/users", authenticateJwtToken, async (request,response) => {
    const query = `SELECT * FROM user;`
    const result = await db.all(query)
    console.log("get users",result)
    response.send(result)
})

//Register New User
app.post("/register", async(request,response) => {
    const {username,name,password,location,gender} = request.body

    const getUserQuery = `SELECT * FROM user WHERE username = '${username}';`
    const userInDb = await db.get(getUserQuery)

    if (userInDb === undefined) {
        const hashedPassword = await bcrypt.hash(request.body.password,10)

        const createNewUser = `INSERT INTO user(username,name,Gender,password, Location)
        VALUES('${username}','${name}','${gender}','${hashedPassword}','${location}');`

        const dbResponse = await db.run(createNewUser)
        console.log(`Created new User with ${dbResponse.lastID}`)
        response.send(`Created new User with ${dbResponse.lastID}`)

    } else {
        response.status = 400;
        console.log("User already exists")
        response.send("User already exists")
    }
})

//Login API
app.post("/login", async (request,response) => {
    const {username,password} = request.body 
    const userDetailsQuery =`SELECT * FROM user WHERE username = '${username}';`
    const dbResponse = await db.get(userDetailsQuery)
    //console.log("db Response", dbResponse)
    
    if (dbResponse !== undefined){
        const isPasswordMatched = await bcrypt.compare(password,dbResponse.PASSWORD) 
        if(isPasswordMatched) {
            const payload = {
                username
            }
            const jwtToken = jwt.sign(payload, "MY_SECRET_TOKEN")
            console.log(jwtToken, "jwt token")
            response.send({jwtToken})

        }else {
            response.status = 400
            response.send("Invalid Password!")
        }

    }else {
        response.status = 400
        response.send("Invalid User")
    }
})

//Get all Diaries in DB API
app.get("/diaries", authenticateJwtToken, async (request, response) => {
    const getDiariesQuery = `SELECT * FROM Diary;`
    const dbResponse = await db.all(getDiariesQuery)

    console.log(dbResponse)
    response.send(dbResponse)
})

//Get specific diary
app.get("/diary/:diaryId", authenticateJwtToken, async (request,response) => {
    const {diaryId} = request.params
    const getDiary = `SELECT * FROM Diary WHERE id = '${diaryId}';`
    const dbResponse = await db.get(getDiary)

    console.log(dbResponse)
    response.send(dbResponse)
})

//Get specific user diaries
app.get("/user/:userId/diaries", authenticateJwtToken, async (request,response) => {
    const {userId} = request.params
    const getDiary = `SELECT * FROM Diary WHERE user_id = '${userId}';`
    const dbResponse = await db.all(getDiary)

    console.log(dbResponse)
    response.send(dbResponse)
})

//Get Diary by ID for specefic User
app.get("/user/:userId/diaries/:diaryId", authenticateJwtToken, async (request,response) => {
    const {userId,diaryId} = request.params
    const getDiary = `SELECT * FROM Diary WHERE user_id = '${userId}' and id = '${diaryId}';`
    const dbResponse = await db.get(getDiary)

    console.log(dbResponse)
    response.send(dbResponse)
})

//Create new Diary
app.post("/user/:userId/diaries/", authenticateJwtToken, async(request, response) => {
    const {userId} = request.params 
    const {title,description,date,location,user_id} = request.body
    const createDiaryQuery = `INSERT INTO Diary (title, description, Date, Location, user_id)
    VALUES('${title}','${description}','${date}','${location}','${userId}') ;`

    const dbResponse = await db.run(createDiaryQuery)
    console.log(`Created new User with ${dbResponse.lastID}`)
    response.send(`Created new User with ${dbResponse.lastID}`)
})

//Update an existing diary
app.put("/user/:userId/diary/:diaryId", authenticateJwtToken, async(request,response) => {
    const {location} = request.body
    const {diaryId} = request.params
    const query = `UPDATE Diary SET Location = '${location}' WHERE id = '${diaryId}';`

    await db.run(query)
    response.send("Diary Details Updated")
})

//Delete an existing Diary
app.delete("/user/:userId/diary/:diaryId",authenticateJwtToken, async (request, response) => {
    const {userId,diaryId} = request.params
    const query = `DELETE FROM Diary WHERE id = ${diaryId} AND user_id = ${userId}`;
    await db.run(query);
    response.send("Diary entry deleted successfully");
});


module.exports = app


