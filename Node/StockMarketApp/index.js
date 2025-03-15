import express from 'express'
import path from 'path'
import { fileURLToPath } from "url";
import { engine } from 'express-handlebars';

const __filename = fileURLToPath(import.meta.url); // Get current file path
const __dirname = path.dirname(__filename); // Get directory path

const app = express()
const PORT = process.env.PORT || 3000

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './views');

app.get('/', (req, res) => {
    res.render('home');
});

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, "public")))

app.listen(PORT, () => {
  console.log(`Example app listening on port ${PORT}`)
})