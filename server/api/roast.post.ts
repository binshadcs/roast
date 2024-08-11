import OpenAI from "openai";
import { defineEventHandler, readMultipartFormData } from 'h3';

const config = useRuntimeConfig();
const API_KEY = config.public.apiKey;

const openai = new OpenAI({
  apiKey: API_KEY,
});

async function roast(prompt: string) {
  try {
    const completion = await openai.chat.completions.create({
      messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role: "user", content: prompt },
      ],
      model: "gpt-4o-mini",
    });
    return completion.choices[0];
  } catch (err) {
    return "You can't";
  }
}

export default defineEventHandler(async (event) => {
  let formData = await readMultipartFormData(event);
  const body = await readBody(event)
  if (!formData) {
    return { error: 'No form data found' };
  }
  // console.log(formData)
  const file = formData[0];
  
  if (!file) {
    return { error: 'No file found' };
  }

  // Access file properties
  const fileName = file.filename;
  console.log(body)
  // const fileType = file.mimetype;
  // const fileSize = file.size;

  // Here you can process the file, save it, etc.

  return {
    fileName
  };
})
