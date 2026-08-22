import OpenAI from "openai";

export class OpenRouterProvider {
  private static client: OpenAI | null = null;

  public static getApiKey(): string | undefined {
    return process.env.OPENROUTER_API_KEY;
  }

  public static getModel(): string {
    return process.env.OPENROUTER_MODEL || "openrouter/free";
  }

  public static getClient(): OpenAI | null {
    const key = this.getApiKey();
    if (!key || key.includes("your_openrouter") || key.includes("your-openai")) {
      return null;
    }

    if (!this.client) {
      this.client = new OpenAI({
        apiKey: key,
        baseURL: "https://openrouter.ai/api/v1",
        defaultHeaders: {
          "HTTP-Referer": process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000",
          "X-Title": "ScholarSaathi Citizen Assistant",
          "X-OpenRouter-Metadata": "enabled",
        },
      });
    }

    return this.client;
  }

  public static isConfigured(): boolean {
    const key = this.getApiKey();
    return Boolean(
      key &&
        !key.includes("your_openrouter") &&
        !key.includes("your-openai")
    );
  }
}
