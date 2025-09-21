import { streamText } from "ai";
import { openai } from "@ai-sdk/openai";
import { fetchLeadsTool, qualifyLeadTool, draftOutreachTool } from "./tools";

// AI Sales Agent Pipeline
export const runSalesAgentPipeline = async () => {
  const startTime = new Date().toISOString();
  console.log(`\n🤖 AI Sales Agent Pipeline Starting... (${startTime})`);
  console.log("=".repeat(60));

  const qualificationResults: any[] = [];

  try {
    // Step 1: Fetch all leads
    console.log("📋 Step 1: Fetching all leads...");
    const fetchResult = await fetchLeadsTool.execute({});
    console.log(`✅ Found ${fetchResult.totalCount} leads\n`);

    // Step 2: Qualify each lead
    console.log("🎯 Step 2: Qualifying leads...");
    for (const lead of fetchResult.leads) {
      console.log(`\n🔍 Qualifying lead: ${lead.name} (${lead.company})`);
      const qualification = await qualifyLeadTool.execute({ leadId: lead.id });
      qualificationResults.push(qualification);

      console.log(`   Status: ${qualification.status}`);
      console.log(`   Score: ${qualification.score}/100`);
      console.log(`   Reasons: ${qualification.reasons.join(", ")}`);
    }

    // Step 3: Draft outreach for Hot/Warm leads
    console.log("\n\n📝 Step 3: Drafting outreach for qualified leads...");
    console.log("-".repeat(40));

    const outreachDrafts: any[] = [];

    for (const qualification of qualificationResults) {
      if (qualification.status === "Hot Lead" || qualification.status === "Warm Lead") {
        const lead = qualification.lead;
        console.log(`\n🔥 DRAFTING OUTREACH for ${lead.name} (${qualification.status})`);

        // Value proposition (you can later customize per campaign)
        const valueProp = "reduce electricity bills with solar incentives";

        // Draft email outreach
        const emailDraft = await draftOutreachTool.execute({
          leadId: lead.id,
          messageType: "email",
          valueProposition: valueProp,
        });

        // Draft LinkedIn outreach
        const linkedinDraft = await draftOutreachTool.execute({
          leadId: lead.id,
          messageType: "linkedin",
          valueProposition: valueProp,
        });

        outreachDrafts.push({
          lead,
          status: qualification.status,
          email: emailDraft.message,
          linkedin: linkedinDraft.message,
        });

        console.log("\n📧 EMAIL OUTREACH DRAFT:");
        console.log("=".repeat(50));
        console.log(emailDraft.message);
        console.log("=".repeat(50));

        console.log("\n💼 LINKEDIN OUTREACH DRAFT:");
        console.log("=".repeat(50));
        console.log(linkedinDraft.message);
        console.log("=".repeat(50));
      } else {
        console.log(`\n❄️  Skipping outreach for ${qualification.lead.name} (${qualification.status})`);
      }
    }

    // Summary
    const hotLeads = qualificationResults.filter((q) => q.status === "Hot Lead").length;
    const warmLeads = qualificationResults.filter((q) => q.status === "Warm Lead").length;
    const coldLeads = qualificationResults.filter((q) => q.status === "Cold Lead").length;
    const unqualifiedLeads = qualificationResults.filter((q) => q.status === "Unqualified").length;

    const summary = {
      totalProcessed: qualificationResults.length,
      hotLeads,
      warmLeads,
      coldLeads,
      unqualifiedLeads,
      outreachDraftsCreated: hotLeads + warmLeads,
    };

    console.log("\n\n📊 PIPELINE SUMMARY:");
    console.log("=".repeat(60));
    console.log(summary);
    console.log("=".repeat(60));

    return { summary, qualificationResults, outreachDrafts };
  } catch (error) {
    console.error("❌ Error in sales agent pipeline:", error);
    throw error;
  }
};

// Auto-run only if file is called directly
if (import.meta.main) {
  await runSalesAgentPipeline();
}