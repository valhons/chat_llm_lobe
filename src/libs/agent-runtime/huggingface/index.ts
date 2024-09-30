import { HfInference } from '@huggingface/inference';

import {
  AgentRuntimeError,
  AgentRuntimeErrorType,
  ChatCompetitionOptions,
  ChatStreamPayload,
  LobeRuntimeAI,
} from '@/libs/agent-runtime';
import { OpenAIStream } from '@/libs/agent-runtime/utils/streams';

import { debugStream } from '../utils/debugStream';
import { StreamingResponse } from '../utils/response';
import { HuggingfaceResultToStream } from '../utils/streams/huggingface';

export class LobeHuggingFaceAI implements LobeRuntimeAI {
  private client: HfInference;
  baseURL?: string;

  constructor({ apiKey, baseURL }: { apiKey?: string; baseURL?: string } = {}) {
    if (!apiKey) throw AgentRuntimeError.createError(AgentRuntimeErrorType.InvalidProviderAPIKey);

    this.client = new HfInference(apiKey);

    if (baseURL) {
      this.client.endpoint(baseURL);
    }
  }

  async chat(payload: ChatStreamPayload, options?: ChatCompetitionOptions) {
    try {
      const hfRes = this.client.chatCompletionStream({
        messages: payload.messages,
        model: payload.model,

        stream: true,
        temperature: payload.temperature,
        top_p: payload.top_p,
      });

      const rawStream = HuggingfaceResultToStream(hfRes);
      // Convert the response into a friendly text-stream
      const [debug, output] = rawStream.tee();

      if (process.env.DEBUG_HUGGINGFACE_CHAT_COMPLETION === '1') {
        debugStream(debug).catch(console.error);
      }

      const stream = OpenAIStream(output, options?.callback);

      // Respond with the stream
      return StreamingResponse(stream, { headers: options?.headers });
    } catch (e) {
      const err = e as Error;

      throw AgentRuntimeError.createError(AgentRuntimeErrorType.ProviderBizError, err);
    }
  }
}
