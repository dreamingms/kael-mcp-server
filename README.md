# ⚡ Kael MCP Server

**AI-native tool provider** — cheap compute beats expensive tokens.

> Why burn $0.05 in tokens for your AI to "think through" a DNS lookup when Kael can do it for $0.001?

## What is this?

An MCP (Model Context Protocol) server that provides **13 real-world tools for AI agents**. Things that are expensive for LLMs to do with tokens, but trivially cheap for a server to do with compute:

| Tool | Description | Why it saves tokens |
|------|-------------|---------------------|
| `web_fetch` | Fetch any URL → clean markdown | ~5,000 tokens saved |
| `screenshot` | Webpage → PNG screenshot | ~10,000 tokens saved |
| `web_search` | Real-time search results | Impossible with tokens |
| `html_extract` | HTML → structured JSON | ~8,000 tokens saved |
| `pdf_extract` | PDF URL → extracted text | ~20,000 tokens saved |
| `dns_lookup` | A/AAAA/MX/TXT/NS/CNAME/SOA/SRV | Impossible with tokens |
| `whois` | Domain registration data | Impossible with tokens |
| `ip_geo` | IP → country, city, ISP, coords | Impossible with tokens |
| `code_run` | Execute JS/Python/Bash in sandbox | ~2,000 tokens saved |
| `url_unshorten` | Follow redirects → final URL | ~500 tokens saved |
| `text_diff` | Unified diff of two texts | ~3,000 tokens saved |
| `json_query` | Dot-notation JSON extraction | ~1,000 tokens saved |
| `hash_text` | MD5/SHA1/SHA256/SHA512 hashing | ~200 tokens saved |

## Quick Start

### Claude Desktop

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

### Any MCP Client (Node.js)

```javascript
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { SSEClientTransport } from "@modelcontextprotocol/sdk/client/sse.js";

const transport = new SSEClientTransport(new URL("https://www.kael.ink/mcp/sse"));
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

### Direct REST API

All tools are also available as REST endpoints at `https://www.kael.ink/api/`:

```bash
# IP geolocation
curl "https://www.kael.ink/api/ip?ip=8.8.8.8"

# Screenshot
curl "https://www.kael.ink/api/screenshot?url=https://example.com"
```

## Pricing

- **Free tier**: 100 calls/day (no key needed)
- **Pro**: Unlimited — $9.99/month
- **Enterprise**: Custom pricing

## Why Kael?

1. **Built for AI agents**, not humans — structured JSON output, minimal token overhead
2. **Always fresh data** — DNS, WHOIS, geo, search results are real-time
3. **Cheaper than thinking** — Why simulate code execution when we can actually run it?
4. **13 tools and growing** — New tools added regularly
5. **Standard MCP protocol** — Works with Claude, GPT, any MCP-compatible agent

## Links

- 🌐 **Website:** https://www.kael.ink
- 📖 **API Docs:** https://www.kael.ink/docs
- 🧪 **Swagger:** https://www.kael.ink/swagger
- ❤️ **Health:** https://www.kael.ink/mcp/health
- 🔌 **SSE Endpoint:** https://www.kael.ink/mcp/sse

## License

MIT
