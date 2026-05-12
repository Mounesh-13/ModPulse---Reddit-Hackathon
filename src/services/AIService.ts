import { ScoredEvent } from '../types/index.js';

export class AIService {
  /**
   * Converts events into a high-density, professional moderator digest.
   * Goals: Reduce fluff, improve prioritization, and maximize readability.
   */
  async summarize(events: ScoredEvent[]): Promise<string> {
    if (events.length === 0) return "✅ STATUS: STABLE. No moderator actions recorded in the last 24h.";

    const high = events.filter(e => e.priority >= 8);
    const med = events.filter(e => e.priority < 8 && e.priority >= 5);
    const low = events.filter(e => e.priority < 5);

    const alertLevel = high.length > 5 ? "🔴 CRITICAL" : high.length > 0 ? "🟡 ELEVATED" : "🟢 STABLE";
    
    let summary = `┏━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┓\n`;
    summary += `  🛡️ MODPULSE OPS BRIEFING: ${alertLevel}\n`;
    summary += `┗━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━┛\n\n`;
    
    summary += `📊 SUMMARY STATISTICS\n`;
    summary += `   TOTAL EVENTS: ${events.length}\n`;
    summary += `   CRITICAL:     ${high.length}\n`;
    summary += `   ROUTINE:      ${med.length + low.length}\n`;
    summary += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n`;

    if (high.length > 0) {
      summary += `🚨 HIGH URGENCY ESCALATIONS\n`;
      summary += `──────────────────────────────────────\n`;
      summary += high.map(e => `[!] ${e.type.toUpperCase()} | Target: ${e.target}\n    Reason: ${e.reason}\n    Handler: ${e.moderator}`).join('\n\n');
      summary += `\n\n`;
    }

    if (med.length > 0) {
      summary += `⚡ ROUTINE MODERATION ACTIVITY\n`;
      summary += `──────────────────────────────────────\n`;
      summary += med.map(e => `[•] ${e.type.toUpperCase()}: ${e.target} (${e.reason})`).join('\n');
      summary += `\n\n`;
    }

    summary += `━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n`;
    summary += `📡 END OF INTELLIGENCE TRANSMISSION`;

    return summary;
  }
}
