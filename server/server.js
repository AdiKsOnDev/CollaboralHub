import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { collection, query, where, getDocs, doc, setDoc } from "firebase/firestore";
import { database } from "./firebase.js";
import path from "path";
import { v4 as uuidv4 } from 'uuid';

// dotenv.config();

const app = express();

const port = process.env.PORT || 3000;

app.use(express.json());
app.use(cors({ origin: `localhost:3000` }));

app.use(express.static(path.join("../", 'build')));

/** GET `currentUser`
  *
  * @param {[string]} email
  *
  * @return {[JSON]} 
  */
app.get("/api/currentUser", async (req, res) => {
    try {
        const { email } = req.body;

        const user = query(collection(database, "Users"), where("email", "==", email));

        res.status(200).json(user);
    } catch (error) {
        res.status(404).json({ msg: "Data could not be found." });
    }
});

/** POST `register` 
  *
  * @param {[string]} email  
  * @param {[string]} name  
  * @param {[string]} lastname 
  *
  * @return HTTP status code
  */
app.post("/api/register", async (req, res) => {
    try {
        const { email, displayName, name, lastname } = req.body;
        const newUser = {
            email,
            displayName,
            name,
            lastname,
        };

        if (newUser) {
            const user = await setDoc(doc(database, "Users", email), newUser);

            res.status(201).json(user);
        }
    } catch (error) {
        res.status(404).json({
            message: "Sorry, something is wrong with your data.",
            err: error.message
        });
    }
})

/** GET 
 *
 * @return index.html
*/
app.get("/*", async (req, res) => {
    res.sendFile('index.html', { root: "../build" });
});

app.listen(port, () => {
    console.log(`Listening to the server at http://localhost:${port}`);
}); 
