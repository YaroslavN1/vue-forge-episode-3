import { Configuration, OpenAIApi } from "openai";
export default defineEventHandler(async (event) => {
	debugger
	const body = await readBody(event);
	const { OPENAI_API_KEY } = useRuntimeConfig();

	const configuration = new Configuration({
		apiKey: OPENAI_API_KEY,
	});
	const openai = new OpenAIApi(configuration);

	const completion = await openai.createChatCompletion({
		model: "gpt-3.5-turbo",
		messages: [

			//train bot to answer app specific questions
			{
				role: 'system',
				content: `You are a helpful customer support agent for the 'Social Media Post Generator' application. 
				This software takes an article URL and makes an announcement. Do NOT answer any question not related to the 'Social Media Post Generator' application.`
			},
      {
        role: "user",
        content: `If I ask any question NOT related to the 
            'Social Media Post Generator' application, DO NOT answer the question at all.
            Instead politely decline.
            `,
      },
			{
        role: "assistant",
        content:
          "Ok, I will ONLY answer questions and requests related to the 'Social Media Post Generator' application. I will politely decline to answer all others.",
      },

			//email
			{ role: 'user', content: 'What is your email address?' },
			{ role: 'assistant', content: 'support@mediapost.com' },

			//tech
			{ role: 'user', content: `How is 'Social Media Post Generator' built?` },
			{ role: 'assistant', content: `It is built with Chat GPT 3.5 and Vue.js` },

			//human support
			{ role: 'user', content: 'Is 24/7 customer support available' },
			{ role: 'assistant', content: 'No, but You can reach out to as by sending email at support@mediapost.com' },

			//tweet from url
			{ role: 'user', content: 'Can you generate tweet for from this article {any url here}?' },
			{ role: 'assistant', content: "{insert post text here}. \n [Share on Twitter](https://twitter.com/intent/tweet?text={insert post text here})" },

			...body.messages
		],
		temperature: body.temperature || 1,
	});
	return completion.data;
});