const Groq = require("groq-sdk");

const groq = new Groq({
    apiKey: process.env.GROQ_API_KEY,
});

async function generateRecommendation(data) {

    const prompt = `
You are an AI Career Coach and Skill Gap Analyzer.

Analyze the employee's skill profile against the target job role and provide professional recommendations.

Employee Name: ${data.employeeName}
Target Role: ${data.roleName}

Matched Skills:
${data.matchedSkills.length ? data.matchedSkills.join(", ") : "None"}

Missing Skills:
${data.missingSkills.length ? data.missingSkills.join(", ") : "None"}

Additional Skills:
${data.extraSkills.length ? data.extraSkills.join(", ") : "None"}

Overall Skill Match:
${data.matchPercentage}%

Return ONLY valid JSON.

Use exactly this format:

{
  "summary": "",
  "strengths": [],
  "missingSkills": [],
  "learningRoadmap": [],
  "recommendedProjects": [],
  "recommendedCertifications": [],
  "careerAdvice": "",
  "estimatedLearningDuration": "",
  "prioritySkills": [],
  "nextRoleRecommendation": "",
  "interviewReadiness": ""
}

Rules:

1. summary should contain 2-3 professional sentences.

2. strengths should list the employee's strongest skills.

3. missingSkills should list only the missing required skills.

4. learningRoadmap should contain 5-8 practical learning steps in order.

5. recommendedProjects should suggest 3 portfolio-worthy projects relevant to the target role.

6. recommendedCertifications should suggest real industry-recognized certifications whenever possible.

7. careerAdvice should provide actionable career guidance in 3-5 sentences.

8. estimatedLearningDuration should estimate the time required to become job-ready.

9. prioritySkills should rank the top missing skills from highest to lowest priority.

10. nextRoleRecommendation should recommend a realistic next role based on the employee's current skills.

11. interviewReadiness should be one of:
- Ready
- Partially Ready
- Not Ready

Return ONLY valid JSON.

Do NOT include markdown.

Do NOT use \`\`\`.

Do NOT explain anything outside the JSON.
`;
    const completion = await groq.chat.completions.create({
        model: "openai/gpt-oss-20b",
        temperature: 0.3,
        messages: [
            {
                role: "user",
                content: prompt,
            },
        ],
    });

    return completion.choices[0].message.content;
}

module.exports = generateRecommendation;