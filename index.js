const express = require("express");
const fs = require("fs");
const users = require("./MOCK_dataJSON (1).json")
const app = express();
const PORT = 8000;


//middleware  - plugin
app.use(express.urlencoded({ extended : false}));

//Routes
app.get("/users" , (req,res) => {
    const html = `
    <ul>
    ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
    </ul>
`;
res.send(html);
});

// //REST API
app.get("/api/users" , (req,res) => {
    return res.json(users);
});

app
.route("/api/users/:id")
.get((req,res) => {
    const id = Number(req.params.id);
     const user = users.find((user) => user.id === id);
     return res.json(user);
 })
 .patch((req,res)=> {
    //Edit user the id
    return res.json({status: 'pending'})
 })
 .delete((req,res)=> {
    //delete user the id
    return res.json({status: 'pending'})
 });

app.post(' /api/users ' , (req,res) => {
     //TODO create new user
     const body = req.body;
     user.push({...body, id: users.length + 1});
     fs.writeFile('./MOCK_dataJSON (1).json' , JSON.stringify(users) , (err,data)=> {
        return res.json({ status: "success" , id:users.length + 1});
     });
    //  console.log("body" , body);
    //  return res.json({ status: "pending"});
});


// app.get("/api/users/:id" , (req,res) => {
//     const id = Number(req.params.id);
//     const user = users.find((user) => user.id === id);
//     return res.json(user);
// });

// app.post('/api/users' , (req,res) => {
//     //TODO create new user
//     return res.json({ status: "pending"});
// });

// app.patch('/api/users/:id' , (req,res) => {
//     //TODO Edit the user with id
//     return res.json({ status: "pending"});
// });

// app.delete('/api/users/:id' , (req,res) => {
//     //TODO Edit the user with id
//     return res.json({ status: "pending"});
// });

app.listen(PORT, () => console.log(`server started at PORT:${PORT}`));