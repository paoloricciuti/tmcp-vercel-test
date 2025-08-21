import { server } from './mcp';

export function GET() {
	server.refreshRoots();
	return new Response('Changed', { status: 200 });
}
