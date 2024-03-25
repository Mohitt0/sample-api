import express from 'express';
import cors from 'cors';
const app = express();
const port = 5000;
const baseUrl = 'https://sample-api-4qoh.onrender.com'; 
import { fileURLToPath } from 'url';
import { dirname } from 'path';
import path from 'path';
import { bioData,skillsData,experiences,education,projects } from './data.js';
// Sample bio data
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);
// Combine bio and skills data

const combinedData = {
  bio: bioData,
  skills: skillsData,
  experience:experiences,
  educationData:education,
  projects:projects.map(project => ({
    ...project,
    image: `${baseUrl}${project.image}` // Constructing the absolute URL
  }))
};

app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());
// Endpoint to get combined data
app.get('/api/data', (req, res) => {
  res.json(combinedData);
});
app.get("/",(req,res)=>{
    res.send("Api is working")
})
// Start the server
app.listen(port, () => {
  console.log(`Server is listening at http://localhost:${port}`);
});