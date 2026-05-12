import { describe, it, expect } from 'vitest';
import { Scorer, PRIORITY_MAP } from '../services/Logic.js';
import { ModEvent } from '../types/index.js';

describe('Scorer', () => {
  it('should assign correct priority to a ban event', () => {
    const event: ModEvent = {
      id: '1',
      type: 'ban',
      moderator: 'mod',
      target: 'user',
      reason: 'test',
      timestamp: Date.now(),
    };
    const scored = Scorer.score(event);
    expect(scored.priority).toBe(PRIORITY_MAP.ban);
  });

  it('should assign correct priority to a spam event', () => {
    const event: ModEvent = {
      id: '2',
      type: 'spam',
      moderator: 'mod',
      target: 'user',
      reason: 'test',
      timestamp: Date.now(),
    };
    const scored = Scorer.score(event);
    expect(scored.priority).toBe(PRIORITY_MAP.spam);
  });
});
