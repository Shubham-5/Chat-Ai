const { Configuration, OpenAIApi } = require("openai");

const configuration = new Configuration({
  apiKey: process.env.MY_KEY,
});
const openai = new OpenAIApi(configuration);

export default async function handler(req, res) {
  const { messages } = req.body;
  const completion = await openai.createCompletion({
    model: "text-davinci-003",
    prompt: `${messages}`,
    max_tokens: 100,
    temperature: 0.5,
  });

  res.status(200).json({ message: completion.data.choices[0].text });
}
