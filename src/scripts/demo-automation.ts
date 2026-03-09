/**
 * Composio + Claude Automation Demo
 *
 * Demonstrates using the ClaudeAutomationAgent with Composio tools
 * to perform automated tasks via Claude.
 *
 * Prerequisites:
 *   - COMPOSIO_API_KEY set in .env
 *   - ANTHROPIC_API_KEY set in .env
 *   - Connected accounts for the toolkits you want to use
 *
 * Usage:
 *   npx tsx src/scripts/demo-automation.ts
 */
import "dotenv/config";
import { getComposioClient } from "../lib/automation/composio-client";
import { ClaudeAutomationAgent } from "../lib/automation/claude-agent";

async function main() {
  console.log("=== Composio + Claude Automation Demo ===\n");

  const composio = getComposioClient();
  console.log("✓ Composio client initialized\n");

  const agent = new ClaudeAutomationAgent(composio, {
    systemPrompt: `You are an automation assistant for Dobeu Tech Solutions.
You have access to various tools via Composio. Use them to help with tasks
like managing GitHub repos, sending emails, creating calendar events, etc.
Always explain what you're doing before executing tools.`,
  });

  console.log("✓ Claude automation agent created\n");

  const task = process.argv[2] || "List the available tools you have access to and describe what each one does.";
  const userId = process.argv[3] || "default";
  const toolkitsArg = process.argv[4];
  const toolkits = toolkitsArg ? toolkitsArg.split(",") : ["github"];

  console.log(`Task: "${task}"`);
  console.log(`User: ${userId}`);
  console.log(`Toolkits: ${toolkits.join(", ")}\n`);

  try {
    const result = await agent.run(userId, task, { toolkits });

    console.log("\n--- Agent Response ---");
    console.log(result.finalResponse);
    console.log(`\nTool calls made: ${result.toolCallsMade}`);
    console.log(
      `Conversation turns: ${result.conversationHistory.length}`
    );
  } catch (error) {
    console.error("Agent error:", (error as Error).message);
    process.exit(1);
  }
}

main().catch(console.error);
