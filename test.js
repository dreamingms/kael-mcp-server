// Test MCP server using the official SDK client
const { Client } = require("@modelcontextprotocol/sdk/client/index.js");
const { SSEClientTransport } = require("@modelcontextprotocol/sdk/client/sse.js");

async function main() {
  console.log("Connecting to MCP server...");
  
  const transport = new SSEClientTransport(
    new URL("http://127.0.0.1:3001/sse")
  );
  
  const client = new Client({
    name: "test-client",
    version: "1.0.0",
  });
  
  await client.connect(transport);
  console.log("Connected!\n");
  
  // List tools
  console.log("=== List Tools ===");
  const tools = await client.listTools();
  tools.tools.forEach(t => console.log(`  - ${t.name}: ${t.description.slice(0, 80)}...`));
  
  // Test dns_lookup
  console.log("\n=== dns_lookup(google.com, A) ===");
  const dns = await client.callTool({ name: "dns_lookup", arguments: { domain: "google.com", type: "A" } });
  console.log(dns.content[0].text);
  
  // Test ip_geo
  console.log("\n=== ip_geo(8.8.8.8) ===");
  const geo = await client.callTool({ name: "ip_geo", arguments: { ip: "8.8.8.8" } });
  console.log(geo.content[0].text);
  
  // Test code_run
  console.log("\n=== code_run(JS) ===");
  const code = await client.callTool({ name: "code_run", arguments: { code: "console.log(Array.from({length:10}, (_,i) => i*i))", language: "javascript" } });
  console.log(code.content[0].text);
  
  // Test web_fetch 
  console.log("\n=== web_fetch(example.com) ===");
  const fetch = await client.callTool({ name: "web_fetch", arguments: { url: "https://example.com" } });
  const fetchResult = JSON.parse(fetch.content[0].text);
  console.log(`  URL: ${fetchResult.url}, Length: ${fetchResult.length}`);
  console.log(`  Content preview: ${fetchResult.content.slice(0, 200)}...`);
  
  // Test whois
  console.log("\n=== whois(google.com) ===");
  const whois = await client.callTool({ name: "whois", arguments: { domain: "google.com" } });
  console.log(whois.content[0].text.slice(0, 300));
  
  // Test web_search
  console.log("\n=== web_search('MCP model context protocol') ===");
  const search = await client.callTool({ name: "web_search", arguments: { query: "MCP model context protocol", count: 3 } });
  console.log(search.content[0].text.slice(0, 500));
  
  console.log("\n✅ All tests passed!");
  await client.close();
  process.exit(0);
}

main().catch(e => { console.error("ERROR:", e.message); process.exit(1); });
