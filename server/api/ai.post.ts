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
			{
				role: 'system',
				content: ''}
			,
			...body.messages
		],
		temperature: body.temperature || 1,
	});
	return completion.data;
});