# Google Workspace MCP Server

This repository provides a Model Context Protocol (MCP) server with tools for interacting with Google Workspace services such as Docs, Sheets, Slides, Drive, Calendar, Chat, Gmail, and People.

## Building and Running

- **Install dependencies:** `npm install`
- **Build the project:** `npm run build --workspace workspace-server`
- **Run the server over stdio:** `node workspace-server/dist/index.js --stdio`

Configure your MCP client to launch the server using the command above. The first launch will walk you through OAuth for the Google account you plan to use.

## Development Conventions

The server is written in TypeScript using the Model Context Protocol SDK. The main entry point is `workspace-server/src/index.ts`, which initializes the MCP server and registers the available tools.

The business logic for each service is separated into its own file in `workspace-server/src/services`. For example, `workspace-server/src/services/DocsService.ts` contains the logic for interacting with the Google Docs API.

Authentication is handled by `workspace-server/src/auth/AuthManager.ts`, which uses the `@google-cloud/local-auth` library to obtain and refresh OAuth 2.0 credentials.

## Adding New Tools

To add a new tool:

1. Add a new method to the appropriate service file in `workspace-server/src/services`.
2. In `workspace-server/src/index.ts`, register the new tool with the MCP server by calling `server.registerTool()`. Provide a tool name, description, and input schema using the `zod` library.
