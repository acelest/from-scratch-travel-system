const express = require("express");
const app = express();
const path = require("path");
const mysql2 = require("mysql2");

let port = 9000;

const db = mysql2.createConnection({
    host: 'localhost',
    user: 'root',
    password: 'onlinecourse@2023', 
    database: 'hotel' 
});


db.connect((err) => {
    if (err) {
        console.error(' Error connecting to the database: ' + err.stack);
        return; 
    }
    console.log('Connected to database as id ' + db.threadId);
});

app.use(express.urlencoded({ extended: true })); 
app.use(express.json());

app.use(express.static(path.join(__dirname,"/Public")));
app.set("view engine", "ejs");
app.set("views",  path.join( __dirname, "/Views"));

app.post("/inquiry", (req, res)=>{
    const { name, email, packageName, Phonenumber } = req.body; 

    if (!name || !email || !packageName || !Phonenumber){
        return res.status(400).send("Name, email, package, and phone number are required.");
    }

    const sql = "INSERT INTO inquiry (name, email, packageName, Phonenumber) VALUES (?, ?, ?, ?)";
    const values = [name, email, packageName, Phonenumber];

    db.query(sql, values, (err, result) => {
        if(err){
            console.error(" SQL Error during inquiry insert:", err.stack);
            if (err.code === 'ER_NO_SUCH_TABLE') {
                console.error("FATAL: 'inquiry' table not found. Please create the table in your 'hotel' database.");
            }
            return res.status(500).send("An error occurred while processing your inquiry.");
        }

        console.log(` Inquiry submitted successfully by ${email}. ID: ${result.insertId}`); 

      
        res.redirect("/hotel?inquiry=success"); 
    });
});


app.get("/",(req, res)=>{
    console.log("Home Page Server is started");
    res.render("index2");
});

app.get("/hotel",(req, res)=>{
    console.log("Hotel Page Server is started");
    res.render("Hotel");
});

app.get("/login",(req, res)=>{
    console.log("Login Page Server is started");
    res.render("login");
});

app.listen(port, ()=>{
    console.log(`Listening at port: ${port}`);
});