/*
 * Source of truth for the chat widget on the v2 site.
 *
 * This is NOT a Claude Code hook: those only run when Claude uses tools and
 * cannot react to a click in a web page. The widget and voice greeting are
 * implemented in v2/index.html (search for "Chat widget voice greeting"),
 * which has no build step and cannot import this file. When you change the
 * values below, update CHAT_GREETING and the #chatWidget link in v2/index.html.
 */
module.exports = {
  whatsappNumber: "6512345678",
  whatsappUrl: "https://wa.me/6512345678",
  voiceGreeting: "How can I help you",
  voiceLang: "en-US"
};
