import { DeepPartial } from 'utility-types';

import { SessionModel } from '@/database/models/session';
import { LobeAgentConfig } from '@/types/agent';
import { MetaData } from '@/types/meta';
import { LobeAgentSession, LobeSessionType, LobeSessions, SessionGroupKey } from '@/types/session';

class SessionService {
  async createNewSession(
    type: LobeSessionType,
    defaultValue: Partial<LobeAgentSession>,
  ): Promise<string> {
    const item = await SessionModel.create(type, defaultValue);
    if (!item) {
      throw new Error('session create Error');
    }
    return item.id;
  }

  async batchCreateSessions(importSessions: LobeSessions) {
    return SessionModel.batchCreate(importSessions);
  }

  async getSessions(): Promise<LobeSessions> {
    console.time('getSessions');

    const sessions = await SessionModel.query();

    console.timeEnd('getSessions');

    return sessions;
  }

  async removeSession(id: string) {
    return SessionModel.delete(id);
  }

  async removeAllSessions() {
    return SessionModel.clearTable();
  }

  async updateSessionGroup(id: string, group: SessionGroupKey) {
    return SessionModel.update(id, { group });
  }

  async updateSessionMeta(activeId: string, meta: Partial<MetaData>) {
    return SessionModel.update(activeId, { meta });
  }

  async updateSessionConfig(activeId: string, config: DeepPartial<LobeAgentConfig>) {
    return SessionModel.update(activeId, { config });
  }
}

export const sessionService = new SessionService();
