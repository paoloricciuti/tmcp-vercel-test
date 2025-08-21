import { transport, transport_sse } from '../server/index.js';

export async function GET(request) {
	return (
		(await transport.respond(request)) ??
		(await transport_sse.respond(request)) ??
		new Response('Not Found', { status: 404 })
	);
}

export async function OPTIONS(request) {
	return (
		(await transport.respond(request)) ??
		(await transport_sse.respond(request)) ??
		new Response('Not Found', { status: 404 })
	);
}

export async function POST(request) {
	return (
		(await transport.respond(request)) ??
		(await transport_sse.respond(request)) ??
		new Response('Not Found', { status: 404 })
	);
}

export async function DELETE(request) {
	return (
		(await transport.respond(request)) ??
		(await transport_sse.respond(request)) ??
		new Response('Not Found', { status: 404 })
	);
}
