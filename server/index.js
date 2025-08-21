import { McpServer } from 'tmcp';
import { ValibotJsonSchemaAdapter } from '@tmcp/adapter-valibot';
import { HttpTransport } from '@tmcp/transport-http';
import { SseTransport } from '@tmcp/transport-sse';
import { RedisSessionManager } from '@tmcp/session-manager-redis';
import * as v from 'valibot';

const server = new McpServer(
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
		server.refreshRoots();

		const content = {
			number: Math.floor(Math.random() * max),
		};
		return {
			content: [
				{
					type: 'text',
					text: JSON.stringify(content),
				},
			],
			structuredContent: content,
		};
	}
);

const redis_session_manager = new RedisSessionManager(process.env.REDIS_URL);

export const transport = new HttpTransport(server, {
	cors: true,
	path: '/api/mcp',
	sessionManager: redis_session_manager,
});

export const transport_sse = new SseTransport(server, {
	cors: true,
	endpoint: '/api/message',
	path: '/api/sse',
	sessionManager: redis_session_manager,
});
