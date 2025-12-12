# Google Workspace MCP Server

Bring Google Workspace tools (Docs, Sheets, Slides, Drive, Calendar, Chat, Gmail, and People) to any Model Context Protocol (MCP) client. This server exposes a suite of Workspace-focused tools over MCP so you can automate workflows and retrieve data from your preferred client.

## Prerequisites

- A Google account with access to the Workspace products you want to use.
- Node.js 18+.
- The first run will prompt you to complete OAuth in the browser to grant access. Credentials are stored locally for reuse.

## Installation

Install dependencies from the repository root:

```bash
npm install
```

Then build the Workspace MCP server package:

```bash
npm run build --workspace workspace-server
```

## Running the MCP server

After building, start the server over stdio:

```bash
node workspace-server/dist/index.js --stdio
```

The binary can also be run via npm scripts or directly if you add it to your PATH (see `package.json` `bin` entry).

## Using with an MCP client

Add the server to your MCP client configuration. Example (`mcp.config.json`):

```json
{
  "servers": {
    "google-workspace": {
      "command": "node",
      "args": ["workspace-server/dist/index.js", "--stdio"],
      "env": {
        "GOOGLE_APPLICATION_NAME": "Google Workspace MCP"
      }
    }
  }
}
```

After reloading your client, the `google-workspace` server will expose tools for Docs, Sheets, Slides, Drive, Calendar, Chat, Gmail, People, and time utilities. Authentication prompts will open in your browser on first use.

### Example tool invocations

Once connected, you can call tools directly from your MCP client. Examples:

- Create a new Google Doc:
  ```json
  {
    "tool": "docs.create",
    "params": {
      "title": "My New Doc",
      "body": "# My New Document\n\nCreated from MCP."
    }
  }
  ```

- List upcoming calendar events:
  ```json
  {
    "tool": "calendar.listEvents",
    "params": {
      "calendarId": "primary",
      "timeMin": "2024-01-01T00:00:00Z",
      "timeMax": "2024-01-02T00:00:00Z"
    }
  }
  ```

- Search for a file in Drive:
  ```json
  {
    "tool": "drive.search",
    "params": {
      "query": "name contains 'report'"
    }
  }
  ```

Refer to the [tool documentation](docs/index.md) for the full list of available tools and parameters.

## Important security consideration: Indirect Prompt Injection Risk

When exposing any language model to untrusted data, there's a risk of an [indirect prompt injection attack](https://en.wikipedia.org/wiki/Prompt_injection). Agentic tools like MCP clients have access to a wide array of tools and APIs.

This MCP server grants the agent the ability to read, modify, and delete your Google Account data, as well as other data shared with you.

* Never use this with untrusted tools
* Never include untrusted inputs into the model context. This includes asking your client to process mail, documents, or other resources from unverified sources.
* Untrusted inputs may contain hidden instructions that could hijack your session. Attackers can then leverage this to modify, steal, or destroy your data.
* Always carefully review actions taken by your MCP client on your behalf to ensure they are correct and align with your intentions.

## Contributing

Contributions are welcome! Please read the [CONTRIBUTING.md](CONTRIBUTING.md) file for details on how to contribute to this project.

## 📄 Legal

- **License**: [Apache License 2.0](LICENSE)
- **Terms of Service**: [Terms of Service](https://policies.google.com/terms)
- **Privacy Policy**: [Privacy Policy](https://policies.google.com/privacy)
- **Security**: [Security Policy](SECURITY.md)
