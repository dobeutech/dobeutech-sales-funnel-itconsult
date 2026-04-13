# Connections and Integrations — Official Documentation Index

**Purpose:** Single reference for all official documentation for Composio connections, connected plugins, skills, and Cursor integration. Use `@docs` or codebase index to reference this file when resolving connection issues or implementing integrations.

**Last updated:** 2026-03-09  
**Sources:** Composio platform docs, app developer hubs, framework-docs-researcher and docs-researcher outputs.  
**Full sitemaps:** [Composio llms.txt](https://docs.composio.dev/llms.txt) | [Cursor llms.txt](https://cursor.com/llms.txt)

---

## 1. Composio (platform.composio.dev)

### Main docs and platform

| Resource | URL | Scope |
|----------|-----|--------|
| **Docs hub** | https://docs.composio.dev/ | How it works, quickstart, providers, features |
| **Quickstart** | https://docs.composio.dev/docs/quickstart | Install SDK, connect an app, first tool call |
| **API reference** | https://docs.composio.dev/reference | REST base URL, auth, rate limits, API index |
| **Dashboard** | https://platform.composio.dev/ | Connect apps, MCP configs, auth, playground |

### Connections, auth configuration, and manage connections

| Resource | URL | Scope |
|----------|-----|--------|
| **Connected accounts** | https://docs.composio.dev/docs/auth-configuration/connected-accounts | OAuth connections, list/get/refresh, enable/disable |
| **Multiple connected accounts** | https://docs.composio.dev/docs/managing-multiple-connected-accounts | Multiple accounts per toolkit, selecting active account |
| **Custom auth configs** | https://docs.composio.dev/docs/auth-configuration/custom-auth-configs | Creating custom auth configurations for toolkits |
| **White-labeling auth** | https://docs.composio.dev/docs/auth-configuration/white-labeling | White-label auth screens with your branding |
| **In-chat authentication** | https://docs.composio.dev/docs/authenticating-users/in-chat-authentication | Agent prompts user to connect during chat |
| **Manual authentication** | https://docs.composio.dev/docs/authenticating-users/manually-authenticating | Pre-auth flow for connecting users |
| **Connection expiry events** | https://docs.composio.dev/docs/subscribing-to-connection-expiry-events | Subscribe to connection expiry/refresh events |
| **Connected accounts API** | https://docs.composio.dev/reference/api-reference/connected-accounts/getConnectedAccounts | List connected accounts (with filters) |
| **Auth configs API** | https://docs.composio.dev/reference/api-reference/auth-configs | Auth Configs REST API |

### Toolkits and tools

| Resource | URL | Scope |
|----------|-----|--------|
| **Browse toolkits** | https://docs.composio.dev/toolkits | 1000+ integrations/apps |
| **Premium tools** | https://docs.composio.dev/toolkits/premium-tools | Premium/paid toolkit list |
| **Fetching tools** | https://docs.composio.dev/docs/toolkits/fetching-tools-and-toolkits | Fetching tools and toolkits |
| **Enable/disable toolkits** | https://docs.composio.dev/docs/toolkits/enable-and-disable-toolkits | Enable/disable toolkits in sessions |
| **Direct: fetching** | https://docs.composio.dev/docs/tools-direct/fetching-tools | Direct tool fetching (non-session paradigm) |
| **Direct: auth** | https://docs.composio.dev/docs/tools-direct/authenticating-tools | Direct tool authentication |
| **Direct: executing** | https://docs.composio.dev/docs/tools-direct/executing-tools | Direct tool execution |
| **Custom tools** | https://docs.composio.dev/docs/tools-direct/custom-tools | Creating custom tools |
| **Toolkit versioning** | https://docs.composio.dev/docs/tools-direct/toolkit-versioning | Toolkit versioning system |
| **Schema modifiers** | https://docs.composio.dev/docs/tools-direct/modify-tool-behavior/schema-modifiers | Modify tool input/output schemas |
| **Toolkits API** | https://docs.composio.dev/reference/api-reference/toolkits | Toolkits REST API |
| **Tools API** | https://docs.composio.dev/reference/api-reference/tools | Tools REST API — list, search, execute |

### MCP and Cursor

| Resource | URL | Scope |
|----------|-----|--------|
| **Composio Connect (MCP)** | https://docs.composio.dev/docs/composio-connect | Add Composio to Cursor/Claude/Codex via MCP |
| **MCP endpoint** | https://connect.composio.dev/mcp | MCP server endpoint URL (used in client configs) |
| **Single-toolkit MCP** | https://docs.composio.dev/docs/single-toolkit-mcp | Dedicated MCP servers scoped to specific toolkits |
| **Native tools vs MCP** | https://docs.composio.dev/docs/native-tools-vs-mcp | Comparison: SDK native tools vs MCP servers |
| **Sessions vs direct** | https://docs.composio.dev/docs/sessions-vs-direct-execution | Session meta tools vs direct tool fetching |
| **MCP troubleshooting** | https://docs.composio.dev/docs/troubleshooting/mcp | MCP-specific troubleshooting |
| **How Composio works** | https://docs.composio.dev/docs/how-composio-works | Meta tools, tool calling |
| **MCP API** | https://docs.composio.dev/reference/api-reference/mcp | MCP REST API |

### API and sessions

| Resource | URL | Scope |
|----------|-----|--------|
| **Authentication** | https://docs.composio.dev/reference/authentication | x-api-key, x-org-api-key |
| **Rate limits** | https://docs.composio.dev/reference/rate-limits | e.g. 20K–100K/10 min by plan |
| **Tool Router – create session** | https://docs.composio.dev/reference/api-reference/tool-router/postToolRouterSession | session_id, user_id, toolkits |
| **Tool Router – get session** | https://docs.composio.dev/rest-api/tool-router/get-tool-router-session-by-session-id | Get session by ID |
| **Tool Router – execute** | https://docs.composio.dev/rest-api/tool-router/post-tool-router-session-by-session-id-execute | Execute tool in session |
| **Tools execute (by slug)** | https://docs.composio.dev/api-reference/tools/post-tools-execute-by-tool-slug | Execute by tool slug |
| **Configuring sessions** | https://docs.composio.dev/docs/configuring-sessions | Sessions expose meta tools; WAIT_FOR_CONNECTIONS optional |

### Meta tools reference

| Resource | URL | Scope |
|----------|-----|--------|
| **Meta tools index** | https://docs.composio.dev/reference/meta-tools | All 6 session-level system tools |
| **SEARCH_TOOLS** | https://docs.composio.dev/reference/meta-tools/search_tools | Discover tools by use case |
| **GET_TOOL_SCHEMAS** | https://docs.composio.dev/reference/meta-tools/get_tool_schemas | Retrieve input schemas |
| **MANAGE_CONNECTIONS** | https://docs.composio.dev/reference/meta-tools/manage_connections | Handle OAuth and API keys |
| **MULTI_EXECUTE_TOOL** | https://docs.composio.dev/reference/meta-tools/multi_execute_tool | Run tools with user credentials |
| **REMOTE_WORKBENCH** | https://docs.composio.dev/reference/meta-tools/remote_workbench | Persistent Python sandbox |
| **REMOTE_BASH_TOOL** | https://docs.composio.dev/reference/meta-tools/remote_bash_tool | File operations and data processing |

### SDK, CLI, and docs index

| Resource | URL | Scope |
|----------|-----|--------|
| **TypeScript SDK** | https://docs.composio.dev/reference/sdk-reference/typescript | TS SDK reference (Composio, Tools, Toolkits, Accounts, MCP) |
| **Python SDK** | https://docs.composio.dev/reference/sdk-reference/python | Python SDK reference |
| **CLI** | https://docs.composio.dev/docs/cli | Tools search/execute, connections, triggers |
| **CLI install** | https://composio.dev/install | CLI install script (curl) |
| **LLM docs index** | https://docs.composio.dev/llms.txt | Structured links for LLMs |
| **LLM full docs** | https://docs.composio.dev/llms-full.txt | Complete documentation in a single file |

### Providers (AI framework integrations)

| Resource | URL | Scope |
|----------|-----|--------|
| **Providers index** | https://docs.composio.dev/docs/providers | All provider integrations |
| **OpenAI** | https://docs.composio.dev/docs/providers/openai | OpenAI provider (Python, TypeScript) |
| **OpenAI Agents SDK** | https://docs.composio.dev/docs/providers/openai-agents | OpenAI Agents SDK provider |
| **Anthropic** | https://docs.composio.dev/docs/providers/anthropic | Anthropic provider |
| **Claude Agent SDK** | https://docs.composio.dev/docs/providers/claude-agent-sdk | Claude Agent SDK provider |
| **Google Gemini** | https://docs.composio.dev/docs/providers/google | Gemini provider |
| **LangChain** | https://docs.composio.dev/docs/providers/langchain | LangChain provider |
| **LangGraph** | https://docs.composio.dev/docs/providers/langgraph | LangGraph provider |
| **Vercel AI SDK** | https://docs.composio.dev/docs/providers/vercel | Vercel AI SDK provider |
| **Custom providers** | https://docs.composio.dev/docs/providers/custom-providers | Build your own provider |

### Triggers

| Resource | URL | Scope |
|----------|-----|--------|
| **Creating triggers** | https://docs.composio.dev/docs/setting-up-triggers/creating-triggers | Creating triggers for external app events |
| **Subscribing to events** | https://docs.composio.dev/docs/setting-up-triggers/subscribing-to-events | Subscribing to trigger events |
| **Triggers API** | https://docs.composio.dev/reference/api-reference/triggers | Triggers REST API |

### Troubleshooting and migration

| Resource | URL | Scope |
|----------|-----|--------|
| **Troubleshooting index** | https://docs.composio.dev/docs/troubleshooting | All troubleshooting topics |
| **API troubleshooting** | https://docs.composio.dev/docs/troubleshooting/api | API errors |
| **Auth troubleshooting** | https://docs.composio.dev/docs/troubleshooting/authentication | Auth issues |
| **SDK troubleshooting** | https://docs.composio.dev/docs/troubleshooting/sdks | SDK issues |
| **Tools troubleshooting** | https://docs.composio.dev/docs/troubleshooting/tools | Tool execution issues |
| **Migration guides** | https://docs.composio.dev/docs/migration-guide | Direct→sessions, tool router, toolkit versioning, new SDK |
| **API errors** | https://docs.composio.dev/reference/errors | API error codes and handling |

### Cookbooks

| Resource | URL | Scope |
|----------|-----|--------|
| **Cookbooks index** | https://docs.composio.dev/cookbooks | Open-source guides and templates |
| **Templates** | https://docs.composio.dev/cookbooks/templates | Starter project templates |

### Rube (Composio-powered MCP)

| Resource | URL | Scope |
|----------|-----|--------|
| **Rube** | https://github.com/ComposioHQ/Rube | Same tooling as Composio, simpler setup |
| **Open Rube** | https://github.com/ComposioHQ/open-rube | Open-source Rube variant |
| **Composio GitHub** | https://github.com/ComposioHQ/composio | Main Composio SDK repo |
| **Rube MCP endpoint** | https://rube.app/mcp | Rube MCP server endpoint URL |

---

## 2. Apps used in this repo (sales funnel)

### Apollo.io (lead discovery, contacts)

| Product | URL | Scope |
|---------|-----|--------|
| **Apollo** | https://docs.apollo.io/docs | APIs overview and developer hub |
| **Apollo REST API** | https://apolloio.github.io/apollo-api-docs/ | People search, enrichment, contacts/accounts |

### Semrush (SEO)

| Product | URL | Scope |
|---------|-----|--------|
| **Semrush API intro** | https://developer.semrush.com/api/basics/introduction | API introduction and basics |
| **Semrush API** | https://developer.semrush.com/api/ | Analytics, Projects, Trends, Local, etc. |

### Customer.io (email)

| Product | URL | Scope |
|---------|-----|--------|
| **Customer.io** | https://docs.customer.io/ | Main docs |
| **Customer.io APIs** | https://docs.customer.io/integrations/api/customerio-apis | Pipelines, Track, App |
| **HTTP/Pipelines API** | https://docs.customer.io/integrations/data-in/connections/http-api/ | Sending data |

### Typeform (surveys, webhooks)

| Product | URL | Scope |
|---------|-----|--------|
| **Typeform developers** | https://www.typeform.com/developers/ | Developers hub |
| **Webhooks** | https://www.typeform.com/developers/webhooks | Setup, security, retries |
| **Create/update webhook** | https://www.typeform.com/developers/webhooks/reference/create-or-update-webhook/ | Webhook API |

### Make.com (scenarios, Twilio connection)

| Product | URL | Scope |
|---------|-----|--------|
| **Make API** | https://www.make.com/en/api-documentation | Make API documentation |
| **Scenarios API** | https://developers.make.com/api-documentation/api-reference/scenarios | List, create, run, manage scenarios |
| **Webhooks (custom apps)** | https://developers.make.com/custom-apps-documentation/app-structure/webhooks | Custom apps, webhooks |
| **SDK apps / webhooks** | https://developers.make.com/api-documentation/api-reference/sdk-apps-greater-than-webhooks | API reference |

### Twilio (SMS — via Make.com only in this project)

| Product | URL | Scope |
|---------|-----|--------|
| **Twilio docs** | https://www.twilio.com/docs | API reference, tutorials, integrations |
| **Messaging API** | https://www.twilio.com/docs/sms/api | Messaging overview |
| **Messages resource** | https://www.twilio.com/docs/api/rest/sms | Send/fetch SMS |

### Additional Composio-connected apps

All apps below are connected via Composio (see `tools-inventory.md` for status). One primary doc URL per app.

| App | URL | Scope |
|-----|-----|-------|
| **Supabase** | https://supabase.com/docs | Platform docs: Auth, Database, Storage, Edge Functions |
| **Supabase JS SDK** | https://supabase.com/docs/reference/javascript/ | JavaScript client SDK reference |
| **Gmail API** | https://developers.google.com/gmail/api/reference/rest | Gmail REST API reference |
| **Google Workspace** | https://developers.google.com/workspace | Google Workspace developer hub |
| **Google Sheets API** | https://developers.google.com/sheets/api/reference/rest | Sheets API v4 REST reference |
| **Google Calendar API** | https://developers.google.com/calendar/api/v3/reference | Calendar API v3 REST reference |
| **Google Drive API** | https://developers.google.com/drive/api/reference/rest/v3 | Drive API v3 (files, permissions, sharing) |
| **Google Docs API** | https://developers.google.com/docs/api/reference/rest | Docs API v1 (document read/write) |
| **Google Analytics (GA4)** | https://developers.google.com/analytics/devguides/reporting/data/v1 | GA4 Data API (reporting, metrics, dimensions) |
| **Google Search Console** | https://developers.google.com/webmaster-tools/v1/api_reference_index | Search Console API (search analytics, sitemaps) |
| **Google Maps Platform** | https://developers.google.com/maps/documentation | Maps Platform docs (JS, Places, Geocoding, Directions) |
| **Slack API** | https://api.slack.com/ | Slack Platform docs (Web API, Events, Bot tokens) |
| **Slack methods** | https://api.slack.com/methods | Web API method reference (all endpoints) |
| **Netlify** | https://docs.netlify.com/ | Platform docs (deploy, builds, functions, forms) |
| **Netlify API** | https://open-api.netlify.com/ | REST API reference (OpenAPI spec) |
| **Stripe** | https://docs.stripe.com/ | Platform docs (Checkout, Billing, Connect) |
| **Stripe API** | https://docs.stripe.com/api | REST API reference (all resources) |
| **Sentry** | https://docs.sentry.io/ | Platform docs (SDKs, setup, performance, alerts) |
| **Sentry API** | https://docs.sentry.io/api/ | Web API reference (events, issues, projects) |
| **Firebase** | https://firebase.google.com/docs | Platform docs (Auth, Firestore, Functions, Hosting) |
| **Firebase reference** | https://firebase.google.com/docs/reference | SDK and REST API reference |
| **LinkedIn API** | https://learn.microsoft.com/en-us/linkedin/ | LinkedIn API docs (Profile, Share, Marketing) |
| **Intercom** | https://developers.intercom.com/docs | Developer platform overview and guides |
| **Intercom API** | https://developers.intercom.com/docs/references/introduction | REST API v2 reference |
| **Mixpanel** | https://developer.mixpanel.com/ | Developer hub (SDKs, Ingestion, Query APIs) |
| **Mixpanel API** | https://developer.mixpanel.com/reference/overview | API reference (track, engage, export) |
| **Cloudflare** | https://developers.cloudflare.com/ | Platform docs (Workers, DNS, CDN, R2, D1) |
| **Cloudflare API** | https://developers.cloudflare.com/api/ | REST API reference (all zones/services) |
| **Discord** | https://discord.com/developers/docs | Developer portal (Bots, OAuth2, Gateway, Interactions) |
| **Zoom** | https://developers.zoom.us/docs/ | Developer platform (OAuth, SDKs, Webhooks) |
| **Zoom API** | https://developers.zoom.us/docs/api/ | REST API reference (meetings, users, webinars) |
| **Facebook Graph API** | https://developers.facebook.com/docs/graph-api | Graph API overview and guides |
| **Microsoft Teams** | https://learn.microsoft.com/en-us/microsoftteams/platform/ | Teams platform (apps, bots, tabs, messaging extensions) |
| **Microsoft Graph** | https://learn.microsoft.com/en-us/graph/overview | Microsoft Graph API hub (Outlook, OneDrive, Teams, all M365) |
| **Asana** | https://developers.asana.com/docs/ | Developer docs (OAuth, webhooks, guides) |
| **Asana API** | https://developers.asana.com/reference/ | REST API reference (tasks, projects, workspaces) |
| **Linear** | https://developers.linear.app/ | Developer docs (OAuth, webhooks, SDK, GraphQL) |
| **PeopleDataLabs** | https://docs.peopledatalabs.com/ | API docs (Person, Company, IP enrichment) |
| **Amplitude** | https://www.docs.developers.amplitude.com/ | Developer docs (SDKs, analytics, experiments) |
| **Amplitude APIs** | https://www.docs.developers.amplitude.com/analytics/apis/ | Analytics APIs (HTTP, export, taxonomy, cohorts) |
| **Datadog** | https://docs.datadoghq.com/ | Platform docs (APM, infrastructure, dashboards) |
| **Datadog API** | https://docs.datadoghq.com/api/ | REST API reference (metrics, events, monitors, logs) |
| **SerpAPI** | https://serpapi.com/search-api | Google Search results API reference |
| **Tavily** | https://docs.tavily.com/ | Search, extract, crawl, and research APIs |
| **Apify** | https://docs.apify.com/ | Platform docs (actors, storage, integrations) |
| **Apify API** | https://docs.apify.com/api/v2 | REST API v2 reference (actors, datasets, runs) |
| **HeyGen** | https://docs.heygen.com/docs | Video generation, avatars, translate |
| **HeyGen API** | https://docs.heygen.com/reference/authentication | REST API reference (auth, endpoints) |
| **ElevenLabs** | https://elevenlabs.io/docs/api-reference/ | REST and WebSocket API reference (TTS, voices, models) |
| **Firecrawl** | https://docs.firecrawl.dev/ | Web scraping: scrape, crawl, map, search, extract |
| **Mem0** | https://docs.mem0.ai/ | Memory management for AI agents |
| **Mem0 API** | https://docs.mem0.ai/api-reference | REST API (add, search, update memories) |
| **Exa** | https://exa.ai/docs | Search, answer, content extraction |
| **PerplexityAI** | https://docs.perplexity.ai/ | Sonar API (models, SDKs, OpenAI compatibility) |
| **Webflow** | https://developers.webflow.com/ | Developer platform (Designer API, Data API, Apps) |
| **Webflow Data API** | https://developers.webflow.com/data/reference | Data API v2 reference (CMS, sites, pages) |

---

## 3. Connected plugins / MCPs (framework docs)

| Server/Plugin | URL | Scope |
|---------------|-----|--------|
| **Chrome DevTools MCP** | https://github.com/ChromeDevTools/chrome-devtools-mcp/blob/main/docs/tool-reference.md | Tool reference, setup |
| **Chrome DevTools Protocol** | https://chromium.googlesource.com/devtools/devtools-frontend/+/HEAD/docs/devtools-protocol.md | DevTools Protocol |
| **Chrome blog – MCP** | https://developer.chrome.com/blog/chrome-devtools-mcp-debug-your-browser-session | Debug browser session with MCP |
| **Playwright MCP** | https://github.com/microsoft/playwright-mcp | Official Playwright MCP |
| **Context7 API** | https://context7.com/docs/api-guide | Search libs, get context |
| **Context7 developer** | https://context7.com/docs/resources/developer | MCP setup |
| **Context7 TS SDK** | https://context7.com/docs/sdks/ts/getting-started | Getting started |
| **GitHub REST** | https://docs.github.com/rest | REST API |
| **GitHub GraphQL** | https://docs.github.com/en/graphql/overview/public-schema | GraphQL API |
| **Supabase JS** | https://supabase.com/docs/reference/javascript/introduction | JavaScript client |
| **Notion API** | https://developers.notion.com/reference | API reference, auth |
| **Notion authorization** | https://developers.notion.com/docs/authorization | Authorization |
| **Linear overview** | https://developers.linear.app/docs/overview | API overview, GraphQL |
| **Linear API and webhooks** | https://linear.app/docs/api-and-webhooks | API and webhooks |
| **Slack Bolt JS** | https://slack.dev/bolt-js/reference | Bolt for JavaScript |
| **Slack building apps** | https://docs.slack.dev/tools/bolt-js/building-an-app | Building with Bolt |
| **Sentry Next.js** | https://docs.sentry.io/platforms/javascript/guides/nextjs/ | Next.js guide |
| **Stripe API (Node)** | https://docs.stripe.com/api?lang=node | API reference |
| **Stripe auth** | https://docs.stripe.com/api/authentication?lang=node | Authentication |
| **GitLab REST** | https://docs.gitlab.com/api/rest | REST API |
| **GitLab auth** | https://docs.gitlab.com/api/rest/authentication/ | REST authentication |
| **Firebase Web** | https://firebase.google.com/docs/web/setup | Web setup |
| **Firebase JS** | https://firebase.google.com/docs/reference/js | JS API reference |
| **Pinecone Node** | https://docs.pinecone.io/reference/node-sdk | Node.js SDK |
| **Pinecone API** | https://docs.pinecone.io/reference/api/introduction | API introduction |
| **PostHog JS** | https://posthog.com/docs/references/posthog-js | JavaScript SDK |
| **PostHog JS usage** | https://posthog.com/docs/libraries/js/usage | JS usage |
| **Prisma Next.js** | https://www.prisma.io/docs/guides/nextjs | Next.js guide |
| **Prisma Neon** | https://docs.prisma.io/docs/v6/orm/overview/databases/neon | Neon (Postgres) |
| **Prisma PostgreSQL** | https://docs.prisma.io/docs/orm/core-concepts/supported-databases/postgresql | PostgreSQL connector |
| **Neon serverless** | https://neon.tech/docs/serverless/serverless-driver | Serverless driver |
| **Neon connection** | https://neon.tech/docs/connect/choose-connection | Choosing connection method |
| **Phantom overview** | https://docs.phantom.com/wallet-sdks-overview | Connect SDK overview |
| **Phantom Browser SDK** | https://docs.phantom.com/sdks/browser-sdk/connect | Browser SDK Connect |
| **PagerDuty API** | https://developer.pagerduty.com/api-reference/ | API reference |
| **Webflow CMS** | https://developers.webflow.com/data/docs/working-with-the-cms | CMS / Data API |
| **Webflow collections** | https://developers.webflow.com/data/docs/working-with-the-cms/manage-collections-and-items | Managing collections and items |
| **AWS SDK JS v3** | https://docs.aws.amazon.com/sdk-for-javascript/v3/developer-guide/getting-started.html | Getting started |
| **AWS JS API** | https://docs.aws.amazon.com/AWSJavaScriptSDK/latest/ | JS SDK API reference |
| **Snowflake Node** | https://docs.snowflake.com/developer-guide/node-js/nodejs-driver | Node.js driver |
| **Snowflake Node options** | https://docs.snowflake.com/en/developer-guide/node-js/nodejs-driver-options | Node.js options |
| **Hex API overview** | https://learn.hex.tech/docs/explore-data/notebook-view/hex-api/hex-api-overview | API overview |
| **Hex API reference** | https://learn.hex.tech/docs/api/api-reference | API reference |
| **Greptile** | https://docs.greptile.com/ | AI code search/query API — index repos, natural language queries |
| **Greptile MCP** | https://www.greptile.com/docs/mcp/overview | MCP server setup for Cursor/Claude |
| **Circleback MCP** | https://circleback.ai/releases/circleback-mcp | MCP server — meeting data, calendar, transcripts |
| **Atlassian Jira REST** | https://developer.atlassian.com/cloud/jira/platform/rest | Jira Cloud REST API v3 (issues, projects, JQL) |
| **Atlassian Confluence REST** | https://developer.atlassian.com/cloud/confluence/using-the-rest-api/ | Confluence REST API (pages, spaces, CQL) |
| **Asana MCP** | https://developers.asana.com/docs/integrating-with-asanas-mcp-server | Official MCP server (OAuth, V2 endpoint) |
| **Laravel Boost** | https://laravel.com/docs/master/boost | Official Laravel Boost docs — MCP tools, agent skills |
| **Laravel Boost repo** | https://github.com/laravel/boost | GitHub repo — Cursor/Claude config |
| **Sonatype Guide MCP** | https://guide.sonatype.com/mcp | MCP server — dependency version lookup, security guidance |
| **Serena** | https://github.com/oraios/serena | Semantic code retrieval/editing MCP server |
| **Serena docs** | https://oraios.github.io/serena/02-usage/030_clients.html | Client config (Cursor, Claude, VS Code), tools reference |
| **Amplitude MCP** | https://amplitude.com/docs/analytics/amplitude-mcp | MCP server for Cursor — analytics, experiments, dashboards |
| **Chrome DevTools Protocol** | https://chromedevtools.github.io/devtools-protocol/ | CDP spec — domains, commands, events |

---

## 4. Cursor-specific

### Core documentation

| Scope | URL | Description |
|-------|-----|-------------|
| **Docs landing** | https://cursor.com/docs | Main documentation landing page |
| **Quickstart** | https://cursor.com/docs/get-started/quickstart | Quickstart guide for new users |
| **Models and pricing** | https://cursor.com/docs/models-and-pricing | Models overview and pricing reference |
| **LLM docs index** | https://cursor.com/llms.txt | Machine-readable full docs sitemap |

### Agent and AI features

| Scope | URL | Description |
|-------|-----|-------------|
| **Agent overview** | https://cursor.com/docs/agent/overview | Agent tools, checkpoints, queued messages |
| **Plan mode** | https://cursor.com/docs/agent/plan-mode | Implementation planning before coding |
| **Debug mode** | https://cursor.com/docs/agent/debug-mode | Systematic troubleshooting |
| **Agent prompting** | https://cursor.com/docs/agent/prompting | Best practices and tips |
| **Agent security** | https://cursor.com/docs/agent/security | Sandbox, file/network access controls |
| **Terminal tool** | https://cursor.com/docs/agent/tools/terminal | Sandbox, command approval, allowlist |
| **Browser tool** | https://cursor.com/docs/agent/tools/browser | Browser control and automation |
| **Search tool** | https://cursor.com/docs/agent/tools/search | Semantic and agentic codebase search |
| **Tab completion** | https://cursor.com/docs/tab/overview | AI autocomplete, word-by-word accept |
| **Inline edit** | https://cursor.com/docs/inline-edit/overview | Targeted code changes (Cmd+K) |

### MCP, plugins, rules, skills

| Scope | URL | Description |
|-------|-----|-------------|
| **MCP** | https://cursor.com/docs/mcp | MCP reference: configuration, transport, troubleshooting |
| **MCP (help)** | https://cursor.com/help/customization/mcp | mcp.json, command/url, env/headers |
| **MCP Extension API** | https://cursor.com/docs/context/mcp-extension-api | Programmatic registerServer/unregisterServer |
| **Plugins** | https://cursor.com/docs/plugins | Plugin marketplace, plugin.json, components |
| **Rules** | https://cursor.com/docs/rules | Project/user/team rules, AGENTS.md, .mdc format |
| **Skills** | https://cursor.com/docs/skills | SKILL.md format, discovery directories |
| **Subagents** | https://cursor.com/docs/subagents | Explore, Bash, Browser; foreground/background modes |
| **Hooks** | https://cursor.com/docs/hooks | Event-driven scripts, hooks.json, agent loop control |
| **Memories** | https://cursor.com/docs/context/memories | Project rules, user rules, team rules |

### Context and indexing

| Scope | URL | Description |
|-------|-----|-------------|
| **@-symbols** | https://cursor.com/docs/context/symbols | @Docs, @Code, @Folders, @Files, @Past Chats |
| **@-mentions** | https://cursor.com/docs/context/mentions | @ mentions, images, voice, model selection |
| **@-docs** | https://docs.cursor.com/context/@-symbols/@-docs | Reference indexed external docs in context |
| **@-codebase** | https://docs.cursor.com/context/@-symbols/@-codebase | Semantic codebase search |
| **Codebase indexing** | https://cursor.com/help/customization/indexing | How indexing works, configuration |
| **Ignore files** | https://cursor.com/docs/reference/ignore-file | .cursorignore and .cursorindexingignore |

### CLI

| Scope | URL | Description |
|-------|-----|-------------|
| **CLI overview** | https://cursor.com/docs/cli/overview | CLI overview |
| **CLI install** | https://cursor.com/docs/cli/installation | CLI installation guide |
| **CLI agent** | https://cursor.com/docs/cli/using | Using Agent in CLI: plan, ask, modes |
| **GitHub Actions** | https://cursor.com/docs/cli/github-actions | CLI in GitHub Actions |
| **Slash commands ref** | https://cursor.com/docs/cli/reference/slash-commands | CLI slash commands reference |

### Integrations and cloud

| Scope | URL | Description |
|-------|-----|-------------|
| **Slack integration** | https://cursor.com/docs/integrations/slack | @cursor in Slack |
| **Linear integration** | https://cursor.com/docs/integrations/linear | @cursor on issues |
| **GitHub integration** | https://cursor.com/docs/integrations/github | @cursor on PRs/issues |
| **GitLab integration** | https://cursor.com/docs/integrations/gitlab | GitLab integration |
| **Cloud agents** | https://cursor.com/docs/cloud-agent | Remote execution, integrations |
| **Cloud agent setup** | https://cursor.com/docs/cloud-agent/setup | Cloud agent setup and configuration |
| **BugBot** | https://cursor.com/docs/bugbot | Automated PR bug detection |
| **Git worktrees** | https://cursor.com/docs/configuration/worktrees | Git worktrees support in Agent |
| **Extensions** | https://cursor.com/docs/configuration/extensions | Open VSX registry, VS Code compatibility |
| **Deep links** | https://cursor.com/docs/reference/deeplinks | Deep links reference |

---

## 5. Project-local reference (this repo)

| Scope | Location |
|-------|----------|
| **MCP config** | Global: `%USERPROFILE%\.cursor\mcp.json` (see CLAUDE.md); project: `.cursor/mcp.json` if present |
| **Rules** | `.cursor/rules/*.mdc` — sales-funnel, composio-tool-routing, agentic-handoff, weekly-batch-workflow, prisma-db-commands |
| **Skills** | `.cursor/skills/` — composio-sales-funnel-tools, prospect-scoring, sales-funnel-weekly-batch |
| **Composio manage connections** | Use `COMPOSIO_MANAGE_CONNECTIONS` with `toolkits` (from SEARCH_TOOLS) + `session_id`; show `redirect_url` as markdown link; then call `COMPOSIO_WAIT_FOR_CONNECTIONS` immediately |
| **Project docs** | `docs/` — AUTOMATION-MATRIX, rollout-plan, apollo-sequence-setup-guide, typeform-outreach-survey-spec, make-webhook-specs, etc. |
| **Tools inventory** | `tools-inventory.md` — MCP servers, Composio connected apps, Make.com connections and scenarios |
| **Session/state** | `.agent/progress.md`; doc-updater skill can generate `docs/CODEMAPS/*` when used |

---

## How to use this index

- **In Cursor chat:** Use `@docs` and include this file (or `docs/`) when working on connections, Composio workflows, or plugin integration so the agent has the official doc links.
- **Cursor @Docs indexing:** To make key external doc sites searchable via `@Docs` autocomplete, go to **Cursor Settings > Features > Docs > Add new doc** and add high-value base URLs:
  - `https://docs.composio.dev/` (Composio platform)
  - `https://cursor.com/docs` (Cursor docs)
  - `https://docs.prisma.io/` (Prisma ORM)
  - `https://neon.tech/docs` (Neon Postgres)
  - `https://docs.apollo.io/docs` (Apollo.io)
  - Add others from this index as needed for your workflow.
- **Composio connections:** If SEARCH_TOOLS reports no active connection, use MANAGE_CONNECTIONS → show auth link → WAIT_FOR_CONNECTIONS → then execute. Toolkit names must match SEARCH_TOOLS exactly.
- **Twilio:** This project routes SMS only via Make.com (team ID 315584); do not use Composio for Twilio.
- **Full sitemaps:** For the complete list of all documentation pages, see the LLM-readable sitemaps: [Composio llms.txt](https://docs.composio.dev/llms.txt) and [Cursor llms.txt](https://cursor.com/llms.txt).
