function splitChapters(script) {
  return script.split(/\n(?=(?:chapter\s*\d+|अध्याय\s*\d+)[:.\s])/i).map(s => s.trim()).filter(Boolean).map((text, index) => ({ id: index + 1, title: (text.match(/^(?:chapter|अध्याय)\s*\d+[^\n]*/i) || [`Chapter ${index + 1}`])[0], text }));
}
function reviewScript(script, minutes) {
  const words = script.trim() ? script.trim().split(/\s+/).length : 0;
  const estimated = Math.ceil(words / 130);
  const notes = [];
  if (!script.trim()) notes.push('Add a script to start the review.');
  if (minutes < 1 || minutes > 60) notes.push('Video duration must be between 1 and 60 minutes.');
  if (words && estimated > minutes) notes.push(`At ~130 words/minute, this draft needs about ${estimated} minutes.`);
  if (words && estimated < minutes * .55) notes.push('The draft is short for the requested duration; add examples, pauses, or exercises.');
  if (!/\b(example|उदाहरण|recap|सारांश)\b/i.test(script) && words > 80) notes.push('Consider adding an example or recap to reinforce learning.');
  return { words, estimated, notes };
}
module.exports = { splitChapters, reviewScript };
