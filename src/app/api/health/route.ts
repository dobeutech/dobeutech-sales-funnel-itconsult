import { NextResponse } from "next/server";

export async function GET() {
  const isProd = process.env.NODE_ENV === "production";
  const checks: Record<string, { status: string; detail?: string }> = {};

  try {
    const { Composio } = await import("@composio/core");
    checks.composio_core = {
      status: typeof Composio === "function" ? "ok" : "fail",
    };
  } catch (e) {
    checks.composio_core = {
      status: "fail",
      detail: isProd ? undefined : (e as Error).message,
    };
  }

  try {
    const { AnthropicProvider } = await import("@composio/anthropic");
    const provider = new AnthropicProvider({ cacheTools: true });
    checks.composio_anthropic = {
      status: provider.name === "anthropic" ? "ok" : "fail",
    };
  } catch (e) {
    checks.composio_anthropic = {
      status: "fail",
      detail: isProd ? undefined : (e as Error).message,
    };
  }

  try {
    const Anthropic = (await import("@anthropic-ai/sdk")).default;
    checks.anthropic_sdk = {
      status: typeof Anthropic === "function" ? "ok" : "fail",
    };
  } catch (e) {
    checks.anthropic_sdk = {
      status: "fail",
      detail: isProd ? undefined : (e as Error).message,
    };
  }

  if (!isProd) {
    checks.env_composio_api_key = {
      status: process.env.COMPOSIO_API_KEY ? "ok" : "missing",
      detail: process.env.COMPOSIO_API_KEY
        ? "configured"
        : "Set COMPOSIO_API_KEY in .env",
    };
    checks.env_anthropic_api_key = {
      status: process.env.ANTHROPIC_API_KEY ? "ok" : "missing",
      detail: process.env.ANTHROPIC_API_KEY
        ? "configured"
        : "Set ANTHROPIC_API_KEY in .env",
    };
  }

  const allSdksOk = ["composio_core", "composio_anthropic", "anthropic_sdk"]
    .every((k) => checks[k]?.status === "ok");

  return NextResponse.json({
    service: "dobeutech-sales-funnel",
    status: allSdksOk ? "healthy" : "degraded",
    timestamp: new Date().toISOString(),
    checks,
  });
}
