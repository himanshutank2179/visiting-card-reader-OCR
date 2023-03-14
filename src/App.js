import React, { useEffect, useState } from 'react';
import { createWorker } from 'tesseract.js';
import './App.css';
import myImage from './bcard.jpg';



function App() {
  const worker = createWorker({
    logger: m => console.log(m),
  });
  const doOCR = async () => {
    await worker.load();
    await worker.loadLanguage('eng');
    await worker.initialize('eng');
    //const { data: { text } } = await worker.recognize('https://tesseract.projectnaptha.com/img/eng_bw.png');
    const { data: { text } } = await worker.recognize(myImage);    

    const nameRegex = /([A-Za-z]+)\s([A-Za-z]+)/; // Matches first and last name
    const emailRegex = /([A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,})/; // Matches email address
    const phoneRegex = /(\d{3})-(\d{3})-(\d{4})/; // Matches phone number in the format XXX-XXX-XXXX
    const addressRegex = /(\d+)\s+([A-Za-z]+\s[A-Za-z]+)\s+(.*?)\s*,\s*([A-Za-z]{2})\s+(\d{5})/; // Matches a standard address format


    const nameMatch = text.match(nameRegex);
    const emailMatch = text.match(emailRegex);
    const phoneMatch = text.match(phoneRegex);
    const addressMatch = text.match(addressRegex);


    const name = nameMatch ? `${nameMatch[1]} ${nameMatch[2]}` : "";
    const email = emailMatch ? emailMatch[1] : "";
    const phone = phoneMatch ? `${phoneMatch[1]}-${phoneMatch[2]}-${phoneMatch[3]}` : "";
    const streetNumber = addressMatch ? addressMatch[1] : "";
    const streetName = addressMatch ? addressMatch[2] : "";
    const city = addressMatch ? addressMatch[3] : "";
    const state = addressMatch ? addressMatch[4] : "";
    const zipCode = addressMatch ? addressMatch[5] : "";

    console.log({name}); // "John Smith"
    console.log({email}); // "john.smith@example.com"
    console.log({phone}); // "123-456-7890"
    console.log(`Address Line 1: ${streetNumber} ${streetName}`);
    console.log(`Address Line 2: ${city}, ${state} ${zipCode}`);

    console.log(text);
    setOcr(text);
  };
  const [ocr, setOcr] = useState('Recognizing...');
  useEffect(() => {
    doOCR();
  });
  return (
    <div className="App">
      <p>{ocr}</p>
    </div>
  );
}

export default App;
