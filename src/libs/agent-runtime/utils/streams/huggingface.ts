import { ChatCompletionStreamOutput } from '@huggingface/tasks';
import { readableFromAsyncIterable } from 'ai';

import { ChatStreamCallbacks } from '@/libs/agent-runtime';
import { nanoid } from '@/utils/uuid';

import { ChatResp } from '../../wenxin/type';
import {
  StreamProtocolChunk,
  StreamStack,
  chatStreamable,
  createCallbacksTransformer,
  createSSEProtocolTransformer,
} from './protocol';

const transformHuggingfaceStream = (chunk: ChatResp): StreamProtocolChunk => {
  console.log(chunk);
  const finished = chunk.is_end;
  if (finished) {
    return { data: chunk.finish_reason || 'stop', id: chunk.id, type: 'stop' };
  }

  if (chunk.result) {
    return { data: chunk.result, id: chunk.id, type: 'text' };
  }

  return {
    data: chunk,
    id: chunk.id,
    type: 'data',
  };
};

export const HuggingfaceResultToStream = (stream: AsyncIterable<ChatCompletionStreamOutput>) => {
  // make the response to the streamable format
  return readableFromAsyncIterable(chatStreamable(stream));
};

export const HuggingFaceStream = (
  rawStream: ReadableStream<ChatResp>,
  callbacks?: ChatStreamCallbacks,
) => {
  const streamStack: StreamStack = { id: 'chat_' + nanoid() };

  return rawStream
    .pipeThrough(createSSEProtocolTransformer(transformHuggingfaceStream, streamStack))
    .pipeThrough(createCallbacksTransformer(callbacks));
};
