import express from "express";
const router = express.Router();
import Contact from "../models/ContactForm.js";

router.post("/enquiry", async (req, res) => {
    const { Name, PhoneNumber, Email, City, Message } = req.body;

    if (!Name || !PhoneNumber || !Email || !City || !Message) {
        return res.status(400).json({ message: "All fields are required" });
    }

    try {
        const isMessage = await Contact.findOne({ Email, Message }); // More specific check

        if (isMessage) {
            return res.status(200).json({ message: "Already received this message from this email" });
        }

        const newMessage = await Contact.create({
            Name,
            PhoneNumber,
            Email,
            City,
            Message,
        });

        res.status(200).json({ message: "Message sent successfully", newMessage });
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error", error });
    }
});
router.post("/query",async(req,res)=>{
    const {Name,Email, PhoneNumber,Message} = req.body;

    if(!Name || !Email || !PhoneNumber || !Message) {
        return res.status(403).json({message:"All fields are requried"})
    }
    try{
                const newQuery = await Contact.create({
                    Name,
                    Email,
                    PhoneNumber,
                    Message
                })
                console.log(newQuery)
                res.status(200).json({message:"form submission successfull",newQuery})
    }catch(error){
        console.log(error)
        res.status(500).json({message:"Internal server error",error})
    }
})

export default router;
