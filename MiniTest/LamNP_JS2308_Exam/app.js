const express = require("express")
const app = express()
const querystring = require('querystring');
const fs = require("fs")
const bodyParser = require("body-parser")
const cors = require("cors");


//
const dbPath = "C:/Users/Thien Lang/Desktop/HocHanh/Module 3/MiniTest/ask-community-project/todos.json"
app.use(cors());
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({
    extended: true
}))
//

// let jsonData = []

// fs.readFile(dbPath, "utf-8", (_, data) => {
//     jsonData = JSON.parse(data)
// })
let data = fs.readFileSync("./../MiniTest/ask-community-project/todos.json")
let jsonData = JSON.parse(data)


//GET
app.get("/api/v1/todos", (req, res) => {
   
    res.send(jsonData)
    res.end()
})
/*  */
app.get("/api/v1/todos/:id", (req, res) => {

    let resultId = req.params.id
    let newResult = jsonData.todos.find((item) => {
        return item.id == resultId
    })
    res.json(newResult)
    res.end()


})
//POST
// app.post("/api/v1/todos", (req, res) => {
//     let check = req.query

//     let ifExist = jsonData.some((item) => {
//         return item.title == check.title
//     })
//     if (ifExist) {
//         res.json("Todo already exists")
//     } else {
//         jsonData.push(check)
//         fs.writeFile(dbPath, JSON.stringify(jsonData), (err) => {
//             if (err) {
//                 res.sendStatus(500)
//             } else {
//                 res.json("Create successfully")

//             }

//         })
//     }

// })
app.post('/api/v1/todos', (req, res) => {
    const newData = req.body;
    console.log(req.body, "333");
    jsonData.todos.push(newData);
    fs.writeFile(dbPath, JSON.stringify(jsonData), (err) => {
        if (err) {
            res.sendStatus(500);
        } else {
            res.json('Create successfully');
        }
    });
});



// app.use(bodyParser.json())
// app.put("/api/v1/todos/:id", (req, res) => {
//     const newOne = req.params.id;

//     const foundIndex = jsonData.findIndex((item) => item.id == newOne);

//     if (foundIndex === -1) {
//         res.json("Todo not found");
//     } else {
//         const formData = req.body;
//         console.log(formData, "bbbbb");
//         Object.assign(jsonData[foundIndex], formData);

//         fs.writeFile(dbPath, JSON.stringify(jsonData), (err) => {
//             if (err) {
//                 res.status(500).json("Error writing to database");
//             } else {
//                 // Gửi phản hồi "Todo updated successfully"
//                 res.json(jsonData[foundIndex]);
//             }
//         });
//     }
// });
//
app.put("/api/v1/todos/:id", (req, res) => {
    let newTodo = jsonData.todos.findIndex((item) => {
        return item.id == req.body.id
    })
    console.log(req.body.id, "reqbodyid");
    if (newTodo != -1) {
        jsonData.todos[newTodo].title = req.body.title
        console.log(jsonData.todos[newTodo].id, "newtodotitle");
    }
    fs.writeFile(dbPath, JSON.stringify(jsonData), (err) => {
        if (err) {
            res.sendStatus(500);
        } else {
            res.json('Create successfully');
        }
    });
})
//DELETE
app.delete("/api/v1/todos/:id", (req, res) => {

    // console.log(jsonData.todos);
    console.log(req.params);
    let newArr = jsonData.todos.filter((item) => {
        return item.id != req.params.id
    })
    jsonData.todos = newArr
    console.log(req.params.id);
    fs.writeFile(dbPath, JSON.stringify(jsonData), (err) => {
        if (err) {
            res.sendStatus(500);
        } else {
            res.json('Create successfully');
        }
    });
})
//CHECKBOX
app.patch("/api/v1/todos/:id", (req, res) => {
    let newTodo = jsonData.todos.findIndex((item) => {
        return item.id == req.body[0].id
    })

    jsonData.todos[newTodo] = req.body[0]
    console.log(jsonData.todos);
    console.log(req.body[0]);
    fs.writeFile(dbPath, JSON.stringify(jsonData), (err) => {
        if (err) {
            res.sendStatus(500);
        } else {
            res.json('Create successfully');
        }
    });

})

app.listen(3000, () => {
    console.log("Hello World");
})