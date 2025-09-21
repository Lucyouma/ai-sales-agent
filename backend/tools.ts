// tools.ts - AI Sales Agent Tools
import { tool } from "ai";
import { z } from "zod";

// Dummy database for leads
const leadDB = [
    {
        id: 1,
        name: "John Smith",
        company: "TechCorp Inc",
        email: "john.smith@techcorp.com",
        title: "VP of Engineering",
        companySize: "100-500",
        industry: "Technology",
        budget: "High",
        engagement: "Active",
        lastContact: "2024-01-15"
    },
    {
        id: 2,
        name: "Sarah Johnson",
        company: "StartupXYZ",
        email: "sarah@startupxyz.com",
        title: "CEO",
        companySize: "10-50",
        industry: "SaaS",
        budget: "Medium",
        engagement: "Warm",
        lastContact: "2024-01-10"
    },
    {
        id: 3,
        name: "Mike Davis",
        company: "Enterprise Solutions",
        email: "mike.davis@enterprise.com",
        title: "CTO",
        companySize: "500+",
        industry: "Enterprise",
        budget: "High",
        engagement: "Cold",
        lastContact: "2023-12-20"
    }
];


// --------------------
// Fetch Leads Tool
// --------------------
export const fetchLeadsTool = tool({
    description: "Fetch all leads from the database",
    inputSchema: z.object({
        dummy: z.string().optional().describe("Not used - placeholder for schema validation")
    }),
    execute: async () => {
        return {
            leads: leadDB,
            totalCount: leadDB.length
        };
    }
});


// --------------------
// Qualify Lead Tool
// --------------------
export const qualifyLeadTool = tool({
    description: "Qualify a lead based on budget, company size, and engagement history",
    inputSchema: z.object({
        leadId: z.number().describe("The ID of the lead to qualify"),
        additionalInfo: z.string().optional().describe("Any extra notes about the lead")
    }),
    execute: async ({ leadId, additionalInfo }) => {
        const lead = leadDB.find(l => l.id === leadId);
        if (!lead) {
            return { error: "Lead not found" };
        }

        let score = 0;
        let reasons: string[] = [];

        // Budget scoring
        if (lead.budget === "High") {
            score += 40;
            reasons.push("High budget potential");
        } else if (lead.budget === "Medium") {
            score += 25;
            reasons.push("Medium budget potential");
        } else {
            score += 10;
            reasons.push("Low budget potential");
        }

        // Company size scoring
        if (lead.companySize === "500+") {
            score += 30;
            reasons.push("Large enterprise company");
        } else if (lead.companySize === "100-500") {
            score += 25;
            reasons.push("Mid-size company");
        } else if (lead.companySize === "10-50") {
            score += 15;
            reasons.push("Small company");
        }

        // Engagement scoring
        if (lead.engagement === "Active") {
            score += 20;
            reasons.push("Highly engaged prospect");
        } else if (lead.engagement === "Warm") {
            score += 15;
            reasons.push("Warm engagement");
        } else {
            score += 5;
            reasons.push("Cold engagement");
        }

        // Final status
        let status = "Unqualified";
        if (score >= 70) status = "Hot Lead";
        else if (score >= 50) status = "Warm Lead";
        else if (score >= 30) status = "Cold Lead";

        return {
            lead,
            score,
            status,
            reasons,
            additionalInfo
        };
    }
});


// --------------------
// Draft Outreach Tool
// --------------------
export const draftOutreachTool = tool({
    description: "Draft personalized outreach messages for a qualified lead",
    inputSchema: z.object({
        leadId: z.number().describe("The ID of the lead to draft outreach for"),
        messageType: z.enum(["email", "linkedin", "call_script"]).describe("Type of outreach message"),
        valueProposition: z.string().optional().describe("Specific value proposition to highlight")
    }),
    execute: async ({ leadId, messageType, valueProposition }) => {
        const lead = leadDB.find(l => l.id === leadId);
        if (!lead) {
            return { error: "Lead not found" };
        }

        const baseValueProp = valueProposition || "streamline operations and increase efficiency";
        let message = "";

        if (messageType === "email") {
            message = `Subject: Quick question about ${lead.company}'s ${lead.title === "CEO" ? "growth" : "operations"}

Hi ${lead.name},

I noticed ${lead.company} is in the ${lead.industry} space and thought you might be interested in how we're helping similar companies ${baseValueProp}.

As a ${lead.title.toLowerCase()}, you're probably dealing with ${lead.companySize === "500+" ? "enterprise-scale challenges" : lead.companySize === "100-500" ? "scaling challenges" : "growth challenges"} on a daily basis.

Would you be open to a brief 15-minute conversation this week to discuss how we've helped companies like ${lead.company} achieve measurable results?

Best regards,
[Your Name]

P.S. I can see that ${lead.company} has been ${lead.engagement.toLowerCase()} recently - this might be perfect timing for a discussion.`;
        } else if (messageType === "linkedin") {
            message = `Hi ${lead.name},

I hope you're doing well! I came across ${lead.company} and was impressed by your work in the ${lead.industry} space.

As a ${lead.title.toLowerCase()}, I imagine you're always looking for ways to ${baseValueProp}. We've been helping similar companies in your industry achieve some impressive results.

Would you be interested in a brief conversation about how we might be able to help ${lead.company} as well?

Happy to connect and chat when convenient for you.

Best,
[Your Name]`;
        } else if (messageType === "call_script") {
            message = `Call Script for ${lead.name} at ${lead.company}

Opening:
"Hi ${lead.name}, this is [Your Name] from [Your Company]. I hope I'm not catching you at a bad time. I wanted to reach out because I noticed ${lead.company} is doing some interesting work in the ${lead.industry} space, and I thought you might be interested in how we're helping similar companies ${baseValueProp}."

Value Proposition:
"As a ${lead.title.toLowerCase()}, I imagine you're dealing with ${lead.companySize === "500+" ? "enterprise-scale" : "scaling"} challenges on a daily basis. We've helped companies like ${lead.company} achieve measurable improvements in their operations."

Qualifying Questions:
- "What are your biggest challenges right now in your ${lead.title.toLowerCase()} role?"
- "How is ${lead.company} currently handling [relevant area]?"
- "What would success look like for you this quarter?"

Close:
"Based on what you've shared, I think there might be some real value in continuing this conversation. Would you be open to a brief 15-20 minute call this week where I can share some specific case studies and see if there's a fit?"

Next Steps:
- Schedule follow-up call
- Send relevant case study
- Connect on LinkedIn`;
        }

        return {
            lead,
            messageType,
            message,
            personalizationNotes: [
                `Personalized for ${lead.title} role`,
                `Company size: ${lead.companySize}`,
                `Industry: ${lead.industry}`,
                `Engagement level: ${lead.engagement}`,
                `Last contact: ${lead.lastContact}`
            ]
        };
    }
});