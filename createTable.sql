-- -- Create table
-- CREATE TABLE USER( id INTEGER PRIMARY KEY AUTOINCREMENT,username VARCHAR(255),name VARCHAR(255),Gender TEXT,PASSWORD TEXT,Location TEXT)

-- ADD DATA INTO USER

-- INSERT INTO user(username,name,Gender,password, Location) VALUES('demo@gmail.com','Gnani','Male','123','Bangalore');

-- Create TravelDiary Table

-- CREATE TABLE Diary (id INTEGER PRIMARY KEY AUTOINCREMENT,title VARCHAR(255),description TEXT,Date DATETIME,Location TEXT,user_id INTEGER,FOREIGN KEY(user_id) REFERENCES user(id) ON DELETE CASCAD);

-- Insert data into Diary Table

-- INSERT INTO Diary (title, description, Date, Location, user_id)
-- VALUES
--     ('Trip to Nandi Hills', 'Visited Nandi Hills and Skandhagiri Hills', '2024-04-16', 'Chikkabellapur', 1),
--     ('Hiking adventure', 'Explored the mountains and enjoyed the scenic views', '2024-04-20', 'Switzerland', 2),
--     ('Beach vacation', 'Relaxed on the beach and enjoyed the sunset', '2024-04-18', 'Maldives', 1),
--     ('City tour', 'Visited historical landmarks and tried local cuisine', '2024-04-22', 'Rome, Italy', 2);
