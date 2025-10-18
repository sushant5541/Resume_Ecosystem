// Simple mock AI summary generator - in production connect to an LLM or other AI service
module.exports = function generateSummary({ projects = [], experiences = [], courses = [], skills = [], user }) {
  const topSkills = (skills || []).slice(0,6).join(', ');
  const projectCount = (projects || []).length;
  const expCount = (experiences || []).length;
  return `${user?.name || ''} is a motivated professional with experience across ${expCount} experience entries and ${projectCount} projects. Top skills: ${topSkills}. Completed courses include ${(courses||[]).slice(0,3).map(c=>c.title).join(', ')}.`;
};
