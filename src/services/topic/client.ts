import { CreateTopicParams, QueryTopicParams, TopicModel } from '@/database/client/models/topic';
import { ChatTopic } from '@/types/topic';

export class ClientService {
  async createTopic(params: CreateTopicParams): Promise<string> {
    const item = await TopicModel.create(params);

    if (!item) {
      throw new Error('topic create Error');
    }

    return item.id;
  }

  async getTopics(params: QueryTopicParams): Promise<ChatTopic[]> {
    return TopicModel.query(params);
  }

  async removeTopic(id: string) {
    return TopicModel.delete(id);
  }

  async removeTopics(sessionId: string) {
    return TopicModel.batchDeleteBySessionId(sessionId);
  }

  async batchRemoveTopics(topics: string[]) {
    return TopicModel.batchDelete(topics);
  }

  async removeAllTopic() {
    return TopicModel.clearTable();
  }

  async updateFavorite(id: string, newState?: boolean) {
    return TopicModel.toggleFavorite(id, newState);
  }

  async batchCreateTopics(importTopics: ChatTopic[]) {
    return TopicModel.batchCreate(importTopics as any);
  }

  updateTitle(topicId: string, text: string) {
    return TopicModel.update(topicId, { title: text });
  }

  async getAllTopics() {
    return TopicModel.queryAll();
  }

  async searchTopics(keyword: string, sessionId?: string) {
    return TopicModel.queryByKeyword(keyword, sessionId);
  }

  async duplicateTopic(id: string, newTitle?: string) {
    return TopicModel.duplicateTopic(id, newTitle);
  }
}
