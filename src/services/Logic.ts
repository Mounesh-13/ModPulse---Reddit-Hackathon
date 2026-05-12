import { ModEvent, ScoredEvent, ModEventType } from '../types/index.js';

export const PRIORITY_MAP: Record<ModEventType, number> = {
  alert: 10,
  ban: 9,
  toxicity: 8,
  report: 7,
  removal: 5,
  spam: 3,
  repost: 2,
};

export class Scorer {
  static score(event: ModEvent): ScoredEvent {
    return {
      ...event,
      priority: PRIORITY_MAP[event.type] || 0,
    };
  }
}

export class MockData {
  static getEvents(): ModEvent[] {
    const now = Date.now();
    return [
      // Toxic Escalation
      { id: 't1', type: 'toxicity', moderator: 'AI_Filter', target: 'u/aggressor_99', reason: 'Extreme profanity escalation in thread', timestamp: now },
      { id: 't2', type: 'ban', moderator: 'mod_senior', target: 'u/aggressor_99', reason: 'Repeated harassment after warning', timestamp: now },
      
      // Spam Wave
      { id: 's1', type: 'spam', moderator: 'system', target: 'post_xyz', reason: 'Known crypto-scam pattern detected', timestamp: now },
      { id: 's2', type: 'spam', moderator: 'system', target: 'post_abc', reason: 'Bulk link submission from new account', timestamp: now },
      { id: 's3', type: 'spam', moderator: 'system', target: 'post_123', reason: 'Bulk link submission from new account', timestamp: now },
      
      // Repost Flood
      { id: 'r1', type: 'repost', moderator: 'mod_helper', target: 'post_popular', reason: 'Duplicate of top-hour post', timestamp: now },
      { id: 'r2', type: 'repost', moderator: 'mod_helper', target: 'post_popular_v2', reason: 'Duplicate of top-hour post', timestamp: now },
      
      // Report Spike
      { id: 'a1', type: 'alert', moderator: 'system', target: 'r/community', reason: 'Unresolved report queue exceeding 50 items', timestamp: now },
      
      // Regular Mod Activity
      { id: 'm1', type: 'removal', moderator: 'mod_juni', target: 'comment_offtopic', reason: 'Rule 4: Stay on topic', timestamp: now },
    ];
  }
}
