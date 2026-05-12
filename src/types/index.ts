export type ModEventType = 'ban' | 'removal' | 'report' | 'spam' | 'toxicity' | 'repost' | 'alert';

export interface ModEvent {
  id: string;
  type: ModEventType;
  moderator: string;
  target: string;
  reason: string;
  timestamp: number;
}

export interface ScoredEvent extends ModEvent {
  priority: number;
}

export interface Digest {
  summary: string;
  eventCount: number;
  generatedAt: number;
}
