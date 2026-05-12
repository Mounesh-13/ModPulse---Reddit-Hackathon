import { describe, it, expect } from 'vitest';
import { AIService } from '../services/AIService.js';
import { ScoredEvent } from '../types/index.js';

describe('AIService', () => {
  const ai = new AIService();

  it('should generate a non-empty digest for events', async () => {
    const events: ScoredEvent[] = [
      { id: '1', type: 'toxicity', moderator: 'm', target: 't', reason: 'r', timestamp: 123, priority: 8 },
      { id: '2', type: 'removal', moderator: 'm', target: 't', reason: 'r', timestamp: 124, priority: 5 },
      { id: '3', type: 'spam', moderator: 'm', target: 't', reason: 'r', timestamp: 125, priority: 3 },
    ];

    const digest = await ai.summarize(events);
    expect(digest).toContain('MODPULSE OPS BRIEFING');
    expect(digest).toContain('TOTAL EVENTS: 3');
    expect(digest).toContain('🚨 HIGH URGENCY ESCALATIONS');
    expect(digest).toContain('⚡ ROUTINE MODERATION ACTIVITY');
    expect(digest).toContain('END OF INTELLIGENCE TRANSMISSION');
  });

  it('should handle empty events gracefully', async () => {
    const digest = await ai.summarize([]);
    expect(digest).toContain('STATUS: STABLE');
  });
});
