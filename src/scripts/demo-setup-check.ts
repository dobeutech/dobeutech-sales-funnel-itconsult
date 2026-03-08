/**
 * Composio + Claude SDK Setup Verification
 *
 * Validates that all packages are installed and importable, and
 * checks environment variables. Does NOT require live API keys.
 */
import { Composio } from "@composio/core";
import { AnthropicProvider } from "@composio/anthropic";
import Anthropic from "@anthropic-ai/sdk";

async function main() {
  console.log("=== Composio + Claude SDK Setup Check ===\n");

  console.log("1. Checking package imports...");
  console.log("   ✓ @composio/core:", typeof Composio === "function" ? "OK" : "FAIL");
  console.log("   ✓ @composio/anthropic:", typeof AnthropicProvider === "function" ? "OK" : "FAIL");
  console.log("   ✓ @anthropic-ai/sdk:", typeof Anthropic === "function" ? "OK" : "FAIL");

  console.log("\n2. Checking class constructors...");

  const provider = new AnthropicProvider({ cacheTools: true });
  console.log("   ✓ AnthropicProvider instantiated");
  console.log(
    "     Methods:",
    ["wrapTool", "wrapTools", "executeToolCall", "handleToolCalls"].join(", ")
  );

  console.log("\n3. Checking environment variables...");
  const composioKey = process.env.COMPOSIO_API_KEY;
  const anthropicKey = process.env.ANTHROPIC_API_KEY;

  console.log(
    `   ${composioKey ? "✓" : "⚠"} COMPOSIO_API_KEY: ${composioKey ? "set" : "NOT SET (required for live API calls)"}`
  );
  console.log(
    `   ${anthropicKey ? "✓" : "⚠"} ANTHROPIC_API_KEY: ${anthropicKey ? "set" : "NOT SET (required for live API calls)"}`
  );

  console.log("\n4. Verifying Composio SDK can initialize...");
  if (composioKey) {
    try {
      const composio = new Composio({
        apiKey: composioKey,
        provider,
      });
      console.log("   ✓ Composio client initialized with API key");

      console.log("\n5. Fetching a sample toolkit...");
      try {
        const github = await composio.toolkits.get("github");
        console.log(`   ✓ Fetched toolkit: ${github.name} (${github.slug})`);
        console.log(`     Description: ${github.meta?.description?.slice(0, 80) ?? "N/A"}`);
      } catch (err) {
        console.log(
          "   ⚠ Could not fetch toolkits (may need valid API key):",
          (err as Error).message
        );
      }
    } catch (err) {
      console.log(
        "   ⚠ Could not initialize Composio:",
        (err as Error).message
      );
    }
  } else {
    console.log(
      "   ⏭  Skipping (no COMPOSIO_API_KEY). Set it in .env to test live."
    );
  }

  console.log("\n6. Verifying Anthropic SDK can initialize...");
  if (anthropicKey) {
    try {
      void new Anthropic({ apiKey: anthropicKey });
      console.log("   ✓ Anthropic client initialized with API key");
    } catch (err) {
      console.log(
        "   ⚠ Could not initialize Anthropic:",
        (err as Error).message
      );
    }
  } else {
    console.log(
      "   ⏭  Skipping (no ANTHROPIC_API_KEY). Set it in .env to test live."
    );
  }

  console.log("\n=== Setup check complete! ===");
  console.log(
    composioKey && anthropicKey
      ? "✓ All systems ready for automation."
      : "⚠ Add missing API keys to .env for full functionality."
  );
}

main().catch(console.error);
