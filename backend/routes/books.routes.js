import express from "express"
import { Book } from "../models/bookmodel.js";
const bookRouter = express.Router()


bookRouter.post("/", async(request, response) => {
    try{
        const {title, author, publishedYear} = request.body;
        if(!title || !author || !publishedYear){
            return response.status(400).json({message: "Send all required fields: title, author, publishedYear"})
        }else{
            const book = await Book.create({...request.body});
            return response.json(book);
        }
    }catch(error){
        return response.status(500).json({message: error});
    }
})

bookRouter.get("/",   async(request, response) => {
    try{
        const book = await Book.find({});
        if(book.length === 0){
            return response.status(404).json({message: "empty"})
        }else {
            return response.json({
                count: book.length,
                data: book
            }); 
        }
        
    }catch(error) {
        return response.status(500).json({message: error.message})
    }
})


bookRouter.get("/:id", async(request, response) => {
    try{
        const {id} = request.params;
        const book = await Book.find({_id: id});
        if(book.length === 0){
            return response.status(404).json({message: "No book found"})
        }else {
            return response.json(book)
        }
    }catch(error){
        return response.status(500).json({message: error.messgae})
    }
})

bookRouter.put("/:id", async(request, response) => {
    try{
        
        const {id} = request.params;
        const {title, author, publishedYear} = request.body;
        if(!title || !author || !publishedYear){
            return response.status(400).json({message: "Send all required fields: title, author, publishedYear"})
        }else{
            const book = await Book.findOneAndUpdate({_id: id}, {...request.body}, {New: true});
            if(!book){
                return response.status(404).json({message: "Book not found"})
            }else{
                return response.status(200).send({message: "Book updated successfully"})
            }
        }
    }catch(error){
        return response.status(500).json({message: error.messgae})
    }
})

bookRouter.delete("/:id", async(request, response) => {
    try{
        const {id} = request.params;
        const book = await Book.findOneAndDelete({_id: id});
        if(!book){
            return response.status(404).json({message: "Book not found"})
        }else{
            return response.status(200).send({message: "Book deleted successfully"})
        }
    }catch(error){
        return response.status(500).json({message: error.messgae})
    }
})

export default bookRouter;