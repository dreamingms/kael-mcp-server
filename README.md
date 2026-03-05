# ⚡ Kael MCP Server

**AI-native tool provider** — cheap compute beats expensive tokens.

> Why burn $0.05 in tokens for your AI to "think through" a DNS lookup when Kael can do it for $0.001?

## What is this?

An MCP (Model Context Protocol) server that provides **real-world tools for AI agents**. Things that are expensive for LLMs to do with tokens, but trivially cheap for a server to do with compute:

- 🌐 **Web fetch** — Fetch any URL, extract clean readable content (no raw HTML)
- 📸 **Screenshot** — Capture webpage screenshots (headless Chromium)
- 🔍 **Web search** — Real-time search results via DuckDuckGo
- 🏗️ **HTML extract** — Structured data extraction (tables, lists, metadata)
- 🔎 **DNS lookup** — A, AAAA, MX, TXT, NS, CNAME, SOA, SRV records
- 🌍 **IP geolocation** — Country, city, ISP, coordinates for any IP
- 📋 **WHOIS** — Domain registration data
- 💻 **Code run** — Execute JavaScript, Python, or Bash in a sandbox

## Quick Start

### Connect from Claude Desktop

Add to your `claude_desktop_config.json`:

```json
{
  "mcpServers": {
    "kael-tools": {
      "url": "https://www.kael.ink/mcp/sse"
    }
  }
}
```

### Connect from any MCP client (Node.js)

```javascript
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { SSEClientTransport } from "@modelcontextprotocol/sdk/client/sse.js";

const transport = new SSEClientTransport(
  new URL("https://www.kael.ink/mcp/sse")
);
const client = new Client({ name: "my-app", version: "1.0" });
await client.connect(transport);

// List available tools
const tools = await client.listTools();

// Call a tool
const result = await client.callTool({
  name: "dns_lookup",
  arguments: { domain: "example.com", type: "MX" }
});
```

### Direct REST API (non-MCP)

All tools are also available as REST endpoints at `https://www.kael.ink/api/`:

```bash
# DNS lookup
curl "https://www.kael.ink/api/ip?ip=8.8.8.8"

# Screenshot
curl "https://www.kael.ink/api/screenshot?url=https://example.com"
```

## Tools

| Tool | Description | Token savings |
|------|-------------|---------------|
| `web_fetch` | Fetch URL → clean markdown | ~5,000 tokens saved |
| `screenshot` | Webpage → PNG screenshot | ~10,000 tokens saved |
| `web_search` | Real-time search results | Not possible with tokens alone |
| `html_extract` | HTML → structured JSON | ~8,000 tokens saved |
| `dns_lookup` | Domain DNS records | Not possible with tokens alone |
| `ip_geo` | IP → location data | Not possible with tokens alone |
| `whois` | Domain WHOIS data | Not possible with tokens alone |
| `code_run` | Execute JS/Python/Bash | ~2,000 tokens saved |

## Pricing

- **Free tier**: 100 calls/day
- **Pro**: Unlimited — $9.99/month
- **Enterprise**: Custom pricing

## Why Kael?

1. **Built for AI agents**, not humans — structured JSON output, minimal tokens
2. **Always fresh data** — DNS, WHOIS, geo, search results are real-time
3. **Cheaper than thinking** — Why have your AI simulate code execution when we can actually run it?
4. **Standard MCP protocol** — Works with Claude, GPT, any MCP-compatible agent

## Links

- 🌐 Website: https://www.kael.ink
- 📖 API Docs: https://www.kael.ink/docs
- 🧪 Swagger: https://www.kael.ink/swagger
- 📊 Status: https://www.kael.ink/status
- ❤️ Health: https://www.kael.ink/mcp/health

## License

MIT
