/**
 * Composio Live Integration Demo
 *
 * Lists available toolkits and tools from the Composio API.
 * Requires COMPOSIO_API_KEY in .env.
 */
import "dotenv/config";
import { Composio } from "@composio/core";
import { AnthropicProvider } from "@composio/anthropic";

async function main() {
  console.log("=== Composio Live Integration Demo ===\n");

  const composio = new Composio({
    apiKey: process.env.COMPOSIO_API_KEY!,
    provider: new AnthropicProvider({ cacheTools: true }),
  });

  console.log("1. Fetching GitHub toolkit info...");
  const github = await composio.toolkits.get("github");
  console.log(`   Name: ${github.name}`);
  console.log(`   Slug: ${github.slug}`);
  console.log(`   Description: ${github.meta?.description?.slice(0, 120)}`);
  console.log(`   Tools count: ${github.meta?.toolsCount ?? "N/A"}`);

  console.log("\n2. Fetching GitHub tools (first 10)...");
  const tools = await composio.tools.getRawComposioTools({
    toolkits: ["github"],
    limit: 10,
  });

  console.log(`   Found ${tools.length} tools:`);
  for (const tool of tools) {
    console.log(`   - ${tool.slug}: ${tool.description?.slice(0, 80) ?? "No description"}`);
  }

  console.log("\n3. Fetching Gmail toolkit info...");
  try {
    const gmail = await composio.toolkits.get("gmail");
    console.log(`   Name: ${gmail.name}`);
    console.log(`   Slug: ${gmail.slug}`);
    console.log(`   Tools count: ${gmail.meta?.toolsCount ?? "N/A"}`);
  } catch (err) {
    console.log(`   ⚠ Could not fetch Gmail toolkit: ${(err as Error).message}`);
  }

  console.log("\n=== Demo complete! Composio API integration is live. ===");
}

main().catch(console.error);
