import { Devvit } from '@devvit/public-api';
import { MockData, Scorer } from './services/Logic.js';
import { AIService } from './services/AIService.js';

Devvit.configure({
  redditAPI: true,
});

/**
 * Human-in-the-Loop Digest Form
 * Turns a Devvit Form into a "Review & Publish" workflow, ensuring 
 * the editable text area feels like a deliberate UX feature rather than a bug.
 */
const digestForm = Devvit.createForm(
  (data) => ({
    title: '🛡️ ModPulse: Review & Publish',
    description: 'Review the AI-generated draft. Edit if necessary, then publish to the ModTeam.',
    fields: [
      {
        name: 'digest',
        label: 'Editable Intelligence Draft',
        type: 'paragraph',
        defaultValue: data.digest as string || '',
      },
    ],
    acceptLabel: 'Publish to ModMail',
    cancelLabel: 'Discard',
  }),
  (event, context) => {
    // In a real app, this would send a ModMail. For the demo, we confirm success.
    console.log('--- PUBLISHED DIGEST ---\n', event.values.digest);
    context.ui.showToast('✅ Digest successfully published to ModTeam!');
  }
);

/**
 * Onboarding: First-Run Experience
 */
Devvit.addTrigger({
  event: 'AppInstall',
  onEvent: async () => {
    console.log('ModPulse Initialized: Intelligence engine activated.');
  },
});

/**
 * Main Entry Point: Subreddit Menu
 */
Devvit.addMenuItem({
  location: 'subreddit',
  label: 'Generate Intelligence Digest',
  onPress: async (_event, context) => {
    const { ui } = context;
    
    ui.showToast('🤖 Analyzing logs & generating draft...');
    
    try {
      const events = MockData.getEvents();
      
      if (!events || events.length === 0) {
        ui.showToast('✅ All stable: No recent incidents.');
        return;
      }

      const scoredEvents = events.map(e => Scorer.score(e));
      const ai = new AIService();
      const digestText = await ai.summarize(scoredEvents);

      // Launch the Human-in-the-Loop UI
      ui.showForm(digestForm, {
        digest: digestText,
      });
    } catch (error) {
      console.error('ModPulse Engine Error:', error);
      ui.showToast('❌ Failed to generate digest.');
    }
  },
});

export default Devvit;
