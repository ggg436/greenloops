import { GoogleGenerativeAI } from "@google/generative-ai";

export interface ChatMessage {
	role: 'user' | 'assistant' | 'system';
	content: string;
}

function buildPrompt(messages: ChatMessage[]): string {
	const lines: string[] = [];
	for (const m of messages) {
		const role = m.role === 'system' ? 'System' : m.role === 'user' ? 'User' : 'Assistant';
		lines.push(`${role}: ${m.content}`);
	}
	lines.push('Assistant:');
	return lines.join('\n');
}

export async function getChatCompletion(messages: ChatMessage[]): Promise<string> {
	const apiKey = import.meta.env.VITE_GEMINI_API_KEY as string | undefined;
	if (!apiKey) {
		throw new Error('Missing VITE_GEMINI_API_KEY in environment.');
	}

	const genAI = new GoogleGenerativeAI(apiKey);
	const model = genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });

	const prompt = buildPrompt(messages);
	const result = await model.generateContent(prompt);
	const response = result.response;
	const text = response.text();
	return text && text.trim().length > 0 ? text : 'I could not generate a response right now.';
} 