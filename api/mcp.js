import { McpServer } from 'tmcp';
import { ValibotJsonSchemaAdapter } from '@tmcp/adapter-valibot';
import { HttpTransport } from '@tmcp/transport-http';
import { RedisSessionManager } from '@tmcp/session-manager-redis';
import * as v from 'valibot';

export const server = new McpServer(
	{
		name: 'tmcp-vercel-test',
		description: 'A test server for TMCP on Vercel',
		version: '0.1.0',
	},
	{
		adapter: new ValibotJsonSchemaAdapter(),
		capabilities: {
			tools: {
				listChanged: true,
			},
		},
	}
);

server.tool(
	{
		name: 'random',
		description: 'Returns a random number',
		schema: v.object({
			max: v.pipe(
				v.number(),
				v.description('The maximum number to return')
			),
		}),
		outputSchema: v.object({
			number: v.number(),
		}),
	},
	async ({ max }) => {
		const content = {
			number: Math.floor(Math.random() * max),
		};
		server.log('info');
		return {
			content: {
				type: 'text',
				text: JSON.stringify(content),
			},
			structuredContent: content,
		};
	}
);

const transport = new HttpTransport(server, {
	cors: true,
	path: '/api/mcp',
	sessionManager: new RedisSessionManager(process.env.REDIS_URL),
});

export async function GET(request) {
	return (
		(await transport.respond(request)) ??
		new Response('Not Found', { status: 404 })
	);
}

export async function OPTIONS(request) {
	return (
		(await transport.respond(request)) ??
		new Response('Not Found', { status: 404 })
	);
}

export async function POST(request) {
	return (
		(await transport.respond(request)) ??
		new Response('Not Found', { status: 404 })
	);
}

export async function DELETE(request) {
	return (
		(await transport.respond(request)) ??
		new Response('Not Found', { status: 404 })
	);
}
