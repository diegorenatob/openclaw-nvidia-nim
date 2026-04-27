import { definePluginEntry } from "openclaw/plugin-sdk/core";

const NIM_BASE_URL = "https://integrate.api.nvidia.com/v1";
const PROVIDER_ID = "nvidia-nim";

const DEFAULT_COST = { input: 0, output: 0, cacheRead: 0, cacheWrite: 0 };
const DEFAULT_MAX_TOKENS = 8192;

const NIM_MODELS = [
  // ── DeepSeek ──────────────────────────────────────────────────────────────
  {
    id: "deepseek-ai/deepseek-v4-flash",
    name: "DeepSeek V4 Flash",
    reasoning: false,
    input: ["text"],
    cost: DEFAULT_COST,
    contextWindow: 131072,
    maxTokens: DEFAULT_MAX_TOKENS,
  },
  {
    id: "deepseek-ai/deepseek-v4-pro",
    name: "DeepSeek V4 Pro",
    reasoning: false,
    input: ["text"],
    cost: DEFAULT_COST,
    contextWindow: 131072,
    maxTokens: DEFAULT_MAX_TOKENS,
  },
  // ── Llama 4 ───────────────────────────────────────────────────────────────
  {
    id: "meta/llama-4-maverick-17b-128e-instruct",
    name: "Llama 4 Maverick 17B",
    reasoning: false,
    input: ["text", "image"],
    cost: DEFAULT_COST,
    contextWindow: 1048576,
    maxTokens: DEFAULT_MAX_TOKENS,
  },
  // ── Qwen ──────────────────────────────────────────────────────────────────
  {
    id: "qwen/qwen3.5-397b-a17b",
    name: "Qwen 3.5 397B",
    reasoning: true,
    input: ["text"],
    cost: DEFAULT_COST,
    contextWindow: 131072,
    maxTokens: DEFAULT_MAX_TOKENS,
  },
  {
    id: "qwen/qwen3.5-122b-a10b",
    name: "Qwen 3.5 122B",
    reasoning: true,
    input: ["text"],
    cost: DEFAULT_COST,
    contextWindow: 131072,
    maxTokens: DEFAULT_MAX_TOKENS,
  },
  {
    id: "qwen/qwen3-next-80b-a3b-instruct",
    name: "Qwen3 Next 80B",
    reasoning: true,
    input: ["text"],
    cost: DEFAULT_COST,
    contextWindow: 131072,
    maxTokens: DEFAULT_MAX_TOKENS,
  },
  {
    id: "qwen/qwen3-coder-480b-a35b-instruct",
    name: "Qwen3 Coder 480B",
    reasoning: false,
    input: ["text"],
    cost: DEFAULT_COST,
    contextWindow: 131072,
    maxTokens: DEFAULT_MAX_TOKENS,
  },
  // ── Mistral ───────────────────────────────────────────────────────────────
  {
    id: "mistralai/mistral-large-3-675b-instruct-2512",
    name: "Mistral Large 3",
    reasoning: false,
    input: ["text"],
    cost: DEFAULT_COST,
    contextWindow: 131072,
    maxTokens: DEFAULT_MAX_TOKENS,
  },
  {
    id: "mistralai/mistral-medium-3-instruct",
    name: "Mistral Medium 3",
    reasoning: false,
    input: ["text"],
    cost: DEFAULT_COST,
    contextWindow: 131072,
    maxTokens: DEFAULT_MAX_TOKENS,
  },
  {
    id: "mistralai/mistral-small-4-119b-2603",
    name: "Mistral Small 4",
    reasoning: false,
    input: ["text"],
    cost: DEFAULT_COST,
    contextWindow: 131072,
    maxTokens: DEFAULT_MAX_TOKENS,
  },
  {
    id: "mistralai/devstral-2-123b-instruct-2512",
    name: "Devstral 2",
    reasoning: false,
    input: ["text"],
    cost: DEFAULT_COST,
    contextWindow: 131072,
    maxTokens: DEFAULT_MAX_TOKENS,
  },
  {
    id: "mistralai/magistral-small-2506",
    name: "Magistral Small",
    reasoning: true,
    input: ["text"],
    cost: DEFAULT_COST,
    contextWindow: 40000,
    maxTokens: DEFAULT_MAX_TOKENS,
  },
  // ── OpenAI OSS ────────────────────────────────────────────────────────────
  {
    id: "openai/gpt-oss-120b",
    name: "GPT OSS 120B",
    reasoning: false,
    input: ["text"],
    cost: DEFAULT_COST,
    contextWindow: 131072,
    maxTokens: DEFAULT_MAX_TOKENS,
  },
  {
    id: "openai/gpt-oss-20b",
    name: "GPT OSS 20B",
    reasoning: false,
    input: ["text"],
    cost: DEFAULT_COST,
    contextWindow: 131072,
    maxTokens: DEFAULT_MAX_TOKENS,
  },
  // ── Kimi ──────────────────────────────────────────────────────────────────
  {
    id: "moonshotai/kimi-k2-thinking",
    name: "Kimi K2 Thinking",
    reasoning: true,
    input: ["text"],
    cost: DEFAULT_COST,
    contextWindow: 131072,
    maxTokens: DEFAULT_MAX_TOKENS,
  },
  {
    id: "moonshotai/kimi-k2-instruct",
    name: "Kimi K2 Instruct",
    reasoning: false,
    input: ["text"],
    cost: DEFAULT_COST,
    contextWindow: 131072,
    maxTokens: DEFAULT_MAX_TOKENS,
  },
  // ── MiniMax ───────────────────────────────────────────────────────────────
  {
    id: "minimaxai/minimax-m2.7",
    name: "MiniMax M2.7",
    reasoning: true,
    input: ["text"],
    cost: DEFAULT_COST,
    contextWindow: 196608,
    maxTokens: DEFAULT_MAX_TOKENS,
  },
  // ── GLM ───────────────────────────────────────────────────────────────────
  {
    id: "z-ai/glm-5.1",
    name: "GLM-5.1",
    reasoning: false,
    input: ["text"],
    cost: DEFAULT_COST,
    contextWindow: 202752,
    maxTokens: DEFAULT_MAX_TOKENS,
  },
  // ── Misc ──────────────────────────────────────────────────────────────────
  {
    id: "bytedance/seed-oss-36b-instruct",
    name: "Seed OSS 36B",
    reasoning: false,
    input: ["text"],
    cost: DEFAULT_COST,
    contextWindow: 65536,
    maxTokens: DEFAULT_MAX_TOKENS,
  },
  {
    id: "stepfun-ai/step-3.5-flash",
    name: "Step 3.5 Flash",
    reasoning: false,
    input: ["text"],
    cost: DEFAULT_COST,
    contextWindow: 131072,
    maxTokens: DEFAULT_MAX_TOKENS,
  },
];

const plugin = definePluginEntry({
  id: PROVIDER_ID,
  name: "NVIDIA NIM Extended",
  description: "NVIDIA NIM — extended model catalog (new endpoints)",
  register(api) {
    api.registerProvider({
      id: PROVIDER_ID,
      label: "NVIDIA NIM",
      docsPath: "/providers/nvidia",
      envVars: ["NVIDIA_API_KEY"],
      auth: [
        {
          id: "api-key",
          label: "NVIDIA API key",
          hint: "API key",
          kind: "api-key",
          optionKey: "nvidiaApiKey",
          flagName: "--nvidia-api-key",
          envVar: "NVIDIA_API_KEY",
          promptMessage: "Enter NVIDIA API key",
          wizard: {
            choiceId: "nvidia-nim-api-key",
            choiceLabel: "NVIDIA API key",
            groupId: "nvidia-nim",
            groupLabel: "NVIDIA NIM",
            groupHint: "API key",
          },
        },
      ],
      catalog: {
        run: async (ctx) => {
          const apiKey =
            ctx.resolveProviderApiKey?.(PROVIDER_ID)?.apiKey ??
            process.env.NVIDIA_API_KEY;
          if (!apiKey) return null;
          return {
            providers: {
              [PROVIDER_ID]: {
                baseUrl: NIM_BASE_URL,
                api: "openai-completions",
                models: NIM_MODELS,
                apiKey,
              },
            },
          };
        },
      },
      augmentModelCatalog: () =>
        NIM_MODELS.map((m) => ({
          provider: PROVIDER_ID,
          id: m.id,
          name: m.name,
          reasoning: m.reasoning,
          input: [...m.input],
          contextWindow: m.contextWindow,
        })),
    });
  },
});

export default plugin;
