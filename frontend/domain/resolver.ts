import { ScholarshipApplication, JourneyResolvedState, HealthCategory } from "@/types";

export function resolveJourneyState(app: ScholarshipApplication): JourneyResolvedState {
  let healthCategory: HealthCategory = "HEALTHY";
  let healthScore = 85;
  let statusTitle = "Application In Review";
  let statusExplanation = "Your application is being processed by official authorities.";
  let moneyReassurance = "Your scholarship eligibility is active.";
  let isActionRequired = false;
  let nextAction: JourneyResolvedState["nextAction"] = {
    actionType: "NONE",
    title: "Application Under Processing",
    description: "No action required from you at this moment. You will be notified if any document verification is required.",
    ctaLabel: "View Application Details",
  };

  switch (app.currentState) {
    case "DEFECTIVE_INSTITUTE":
      healthCategory = "ACTION_REQUIRED";
      healthScore = 45;
      statusTitle = "Action Required: College Marked a Document Defect";
      statusExplanation =
        "Don't worry! Your scholarship is NOT rejected. Your college admin office noticed an issue with your uploaded Bonafide Certificate (missing official principal seal). You must upload the corrected version to continue.";
      moneyReassurance = "Your scholarship seat and funds remain reserved. Fix this before the verification window closes.";
      isActionRequired = true;
      nextAction = {
        actionType: "FIX_DEFECT_BONAFIDE",
        title: "Re-Upload Stamped Bonafide Certificate",
        description: "Obtain the official circular seal and principal signature on your Bonafide Certificate and re-upload.",
        ctaLabel: "Inspect Defect & Upload Fix",
        deadlineDaysRemaining: 9,
      };
      break;

    case "RE_SUBMITTED_INSTITUTE":
      healthCategory = "HEALTHY";
      healthScore = 90;
      statusTitle = "Correction Submitted: Awaiting College Re-Verification";
      statusExplanation =
        "Great job! You have successfully submitted your corrected Bonafide Certificate. Your college Nodal Officer has been queued to re-verify your application.";
      moneyReassurance = "Your file is back on track in the priority verification queue.";
      isActionRequired = false;
      nextAction = {
        actionType: "WAIT_VERIFICATION",
        title: "College Re-Verification in Progress",
        description: "Institutes typically complete re-verification within 7 working days (SOP Clause 5.3). No further action needed now.",
        ctaLabel: "Track Verification Timeline",
      };
      break;

    case "INSTITUTE_VERIFICATION":
      healthCategory = "HEALTHY";
      healthScore = 80;
      statusTitle = "Application Under College Verification";
      statusExplanation =
        "Your college Nodal Officer is verifying your enrollment records, course fees, and student bonafide.";
      moneyReassurance = "Verification is moving within the standard institutional timeframe.";
      isActionRequired = false;
      nextAction = {
        actionType: "WAIT_VERIFICATION",
        title: "Awaiting College Approval",
        description: "Your college administration is reviewing your submitted application.",
        ctaLabel: "Track Status",
      };
      break;

    case "DISTRICT_VERIFICATION":
      healthCategory = "HEALTHY";
      healthScore = 92;
      statusTitle = "College Approved! Under District Welfare Review";
      statusExplanation =
        "Your college has successfully verified your credentials. Your file is now at the District Welfare Office for quota and domicile confirmation.";
      moneyReassurance = "Your college clearance is complete.";
      isActionRequired = false;
      nextAction = {
        actionType: "WAIT_VERIFICATION",
        title: "District Review Ongoing",
        description: "District Nodal Officer verification typically takes up to 20 days.",
        ctaLabel: "View District SLA",
      };
      break;

    case "STATE_VERIFICATION":
      healthCategory = "HEALTHY";
      healthScore = 95;
      statusTitle = "District Approved! State Sanction Order Pending";
      statusExplanation =
        "Your application has passed institutional and district checks. State Nodal Officers are allocating the state scholarship quota.";
      moneyReassurance = "Final sanction order is in preparation.";
      isActionRequired = false;
      nextAction = {
        actionType: "WAIT_VERIFICATION",
        title: "Final Sanction Processing",
        description: "State department is preparing the merit and fund disbursement list.",
        ctaLabel: "View Sanction Milestones",
      };
      break;

    case "DISBURSED":
      healthCategory = "HEALTHY";
      healthScore = 100;
      statusTitle = "Scholarship Disbursed to Bank Account!";
      statusExplanation =
        "Congratulations! Your scholarship funds have been successfully released via Direct Benefit Transfer (DBT) to your Aadhaar-seeded bank account.";
      moneyReassurance = "Full payment completed successfully.";
      isActionRequired = false;
      nextAction = {
        actionType: "NONE",
        title: "Payment Credited Successfully",
        description: "PFMS UTR transaction is complete. Check your registered bank account statement for credit.",
        ctaLabel: "View Payment Receipt",
      };
      break;

    case "SUBMITTED":
    default:
      healthCategory = "HEALTHY";
      healthScore = 75;
      statusTitle = "Application Submitted Successfully";
      statusExplanation = "Your application has been received and is queued for College Nodal Officer assignment.";
      moneyReassurance = "Submission confirmed.";
      isActionRequired = false;
      nextAction = {
        actionType: "WAIT_VERIFICATION",
        title: "Waiting for College Intake",
        description: "Your institution will begin verification shortly.",
        ctaLabel: "Track Application",
      };
      break;
  }

  return {
    applicationId: app.id,
    currentState: app.currentState,
    currentDesk: app.currentDesk,
    healthCategory,
    healthScore,
    statusTitle,
    statusExplanation,
    moneyReassurance,
    isActionRequired,
    nextAction,
  };
}
