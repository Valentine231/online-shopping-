import path from 'path';
import { promises as fs } from 'fs';

export default async function handler(req, res) {
  try {
    // Resolve the path to the file in the `public` folder
    const filePath = path.join(process.cwd(), 'public', 'Data', 'Productdetail.json');
    
    // Read the file asynchronously
    const fileContents = await fs.readFile(filePath, 'utf-8');
    
    // Parse the JSON data
    const Productdetail = JSON.parse(fileContents);

    // Send the JSON data as the response
    res.status(200).json(Productdetail);
  } catch (error) {
    console.error('Error reading Productdetail.json:', error);
    res.status(500).json({ error: 'Failed to load product details' });
  }
}

  