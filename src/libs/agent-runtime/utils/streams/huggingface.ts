import { ChatCompletionStreamOutput } from '@huggingface/tasks';
import { readableFromAsyncIterable } from 'ai';

import { chatStreamable } from './protocol';

export const HuggingfaceResultToStream = (stream: AsyncIterable<ChatCompletionStreamOutput>) => {
  // make the response to the streamable format
  return readableFromAsyncIterable(chatStreamable(stream));
};
