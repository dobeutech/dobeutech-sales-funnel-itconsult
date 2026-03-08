import { Composio } from "@composio/core";
import { AnthropicProvider } from "@composio/anthropic";

type ComposioWithAnthropic = Composio<AnthropicProvider>;

let composioInstance: ComposioWithAnthropic | null = null;

export interface ComposioClientConfig {
  apiKey?: string;
  cacheTools?: boolean;
}

export function getComposioClient(
  config?: ComposioClientConfig
): ComposioWithAnthropic {
  if (composioInstance) return composioInstance;

  const apiKey = config?.apiKey ?? process.env.COMPOSIO_API_KEY;
  if (!apiKey) {
    throw new Error(
      "COMPOSIO_API_KEY is required. Set it in .env or pass it via config."
    );
  }

  composioInstance = new Composio({
    apiKey,
    provider: new AnthropicProvider({
      cacheTools: config?.cacheTools ?? true,
    }),
  }) as ComposioWithAnthropic;

  return composioInstance;
}

export function resetComposioClient(): void {
  composioInstance = null;
}
