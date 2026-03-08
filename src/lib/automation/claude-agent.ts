import Anthropic from "@anthropic-ai/sdk";
import type { Composio } from "@composio/core";
import type { AnthropicProvider } from "@composio/anthropic";
import type {
  MessageParam,
  ToolResultBlockParam,
  ToolUseBlock,
} from "@anthropic-ai/sdk/resources/messages";

type ComposioWithAnthropic = Composio<AnthropicProvider>;

export interface ClaudeAgentConfig {
  anthropicApiKey?: string;
  model?: string;
  maxTokens?: number;
  systemPrompt?: string;
}

export interface AgentRunResult {
  finalResponse: string;
  toolCallsMade: number;
  conversationHistory: MessageParam[];
}

export class ClaudeAutomationAgent {
  private anthropic: Anthropic;
  private composio: ComposioWithAnthropic;
  private model: string;
  private maxTokens: number;
  private systemPrompt: string;

  constructor(composio: ComposioWithAnthropic, config?: ClaudeAgentConfig) {
    const apiKey =
      config?.anthropicApiKey ?? process.env.ANTHROPIC_API_KEY;
    if (!apiKey) {
      throw new Error(
        "ANTHROPIC_API_KEY is required. Set it in .env or pass it via config."
      );
    }

    this.anthropic = new Anthropic({ apiKey });
    this.composio = composio;
    this.model = config?.model ?? "claude-sonnet-4-20250514";
    this.maxTokens = config?.maxTokens ?? 4096;
    this.systemPrompt =
      config?.systemPrompt ??
      "You are a helpful automation assistant powered by Composio tools. Execute tasks efficiently and report results clearly.";
  }

  async run(
    userId: string,
    userMessage: string,
    options: {
      toolkits?: string[];
      tools?: string[];
      maxIterations?: number;
    }
  ): Promise<AgentRunResult> {
    const composioTools = options.tools
      ? await this.composio.tools.get(userId, { tools: options.tools })
      : await this.composio.tools.get(userId, {
          toolkits: options.toolkits ?? ["github"],
        });

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const tools = composioTools as any[];

    const messages: MessageParam[] = [
      { role: "user", content: userMessage },
    ];

    let toolCallsMade = 0;
    const maxIterations = options.maxIterations ?? 10;

    for (let i = 0; i < maxIterations; i++) {
      const response = await this.anthropic.messages.create({
        model: this.model,
        max_tokens: this.maxTokens,
        system: this.systemPrompt,
        tools,
        messages,
      });

      messages.push({ role: "assistant", content: response.content });

      if (response.stop_reason === "end_turn") {
        const textBlocks = response.content.filter(
          (block) => block.type === "text"
        );
        const finalText =
          textBlocks.map((b) => ("text" in b ? b.text : "")).join("\n") ||
          "Task completed.";

        return {
          finalResponse: finalText,
          toolCallsMade,
          conversationHistory: messages,
        };
      }

      if (response.stop_reason === "tool_use") {
        const toolUseBlocks = response.content.filter(
          (block): block is ToolUseBlock => block.type === "tool_use"
        );

        const toolResults: ToolResultBlockParam[] = [];

        for (const toolUse of toolUseBlocks) {
          toolCallsMade++;
          console.log(
            `[Agent] Executing tool: ${toolUse.name} (call #${toolCallsMade})`
          );

          try {
            const provider = this.composio.provider as unknown as AnthropicProvider;
            const result = await provider.executeToolCall(userId, {
              type: "tool_use",
              id: toolUse.id,
              name: toolUse.name,
              input: toolUse.input as Record<string, unknown>,
            });

            toolResults.push({
              type: "tool_result",
              tool_use_id: toolUse.id,
              content: result,
            });
          } catch (error) {
            const errorMessage =
              error instanceof Error ? error.message : String(error);
            console.error(
              `[Agent] Tool execution error for ${toolUse.name}:`,
              errorMessage
            );
            toolResults.push({
              type: "tool_result",
              tool_use_id: toolUse.id,
              content: JSON.stringify({
                error: errorMessage,
                successful: false,
              }),
              is_error: true,
            });
          }
        }

        messages.push({ role: "user", content: toolResults });
      }
    }

    return {
      finalResponse:
        "Max iterations reached. The agent may not have completed the task.",
      toolCallsMade,
      conversationHistory: messages,
    };
  }
}
