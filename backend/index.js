import express, { response } from "express"
import { PORT ,MangoDBURL} from "./config.js"
import mongoose  from "mongoose";
import { Book } from "./models/book.js";
const app = express();

app.get("/", (request, response) => {
    console.log(request);
    return response.status(200).send("Welcome to the home screen");
})

app.post("/book",async (request , response) => {
    try {
        if (!request.body.title || !request.body.author || !request.body.publishYear) {
            return response.status(400).send("The book is not valid");

        }
        const newBook= {
            title : request.body.title,
            author : request.body.author,
            publishYear : request.body.publishYear
        }
        const book = await Book.create(newBook);
    } catch (error) {
        console.log(error);
        return response.status(500).send(error)
    }
})


mongoose.connect(MangoDBURL)
.then(()=> {
    console.log('App connected to database');
    app.listen(PORT, () => {
        console.log(`the app is listning ${PORT}`);
        })
})
.catch((error) => {
    console.log(error);
})