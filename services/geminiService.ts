
import { GoogleGenAI, GenerateContentResponse } from "@google/genai";
import { CreditApplicationData, RiskAssessmentOutput } from '../types';
import { GEMINI_API_MODEL } from '../constants';

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  console.error("API_KEY environment variable is not set. Please ensure it's configured.");
  // In a real app, you might throw an error or handle this more gracefully
  // For this exercise, we'll let it proceed and fail at API call time if key is missing.
}

const ai = new GoogleGenAI({ apiKey: API_KEY! }); // Non-null assertion for simplicity here

const generatePrompt = (data: CreditApplicationData): string => {
  // A simplified sample for the prompt, in a real scenario this might be more complex or externalized
  const sampleOutputStructure = {
    executiveSummary: "string (Brief risk assessment with recommended action: APPROVE, REJECT, or MANUAL_REVIEW)",
    riskScore: {
      score: "number (e.g., 0-1000)",
      tier: "'LOW' | 'MEDIUM' | 'HIGH'",
      probabilityOfDefault: "string (e.g., \"5% (Confidence Interval: 3%-7%)\")"
    },
    keyRiskFactors: {
      positive: ["string array (List of key positive indicators)"],
      negative: ["string array (List of key concerns)"]
    },
    detailedAnalysis: {
      personalInfoAnalysis: "string",
      financialDataAnalysis: "string",
      alternativeDataAnalysis: "string",
      behavioralPatterns: "string",
      psychometricElements: "string",
      macroeconomicContext: "string",
      loanDetailsAnalysis: "string"
    },
    fraudDetection: {
      assessment: "string (Overall fraud risk assessment)",
      identifiedAnomalies: ["string array (List of detected suspicious patterns or anomalies)"],
      inconsistencyFlags: ["string array (List of inconsistencies in application data)"]
    },
    biasMitigationAndFairLending: {
      complianceStatement: "string",
      biasCorrectionNotes: "string",
      financialInclusionConsiderations: "string"
    },
    recommendations: {
      suggestedAction: "'APPROVE' | 'REJECT' | 'MANUAL_REVIEW'",
      loanTermsSuggestion: "string (Optional)",
      interestRateSuggestion: "string (Optional)",
      alternativeProducts: ["string array (Optional)"],
      conditionsForApproval: ["string array (Optional)"],
      humanReviewTriggers: ["string array (Optional)"],
      additionalDocumentationRequired: ["string array (Optional)"]
    },
    monitoringAlerts: ["string array (Specific metrics to track post-approval)"],
    complianceNotes: "string (General compliance observations: GDPR, CCPA etc.)"
  };

  return `
You are an advanced Credit Risk Assessment AI assistant, 'HERE AND NOW AI - CreditInsight'.
Your role is to analyze borrower data comprehensively and provide detailed risk assessments.
Core Functionalities to Emulate:
- Comprehensive Data Analysis (traditional, alternative, behavioral, psychometric, macroeconomic).
- Multi-Dimensional Risk Scoring (dynamic tiers, probability of default, non-linear relationships, contextual analysis for irregular income).
- Fraud Detection and Anomaly Identification (suspicious patterns, inconsistencies, identity theft indicators).
- Bias Mitigation and Fair Lending (objective indicators, compliance, financial inclusion).
- Real-Time Monitoring and Alerts (early warnings, proactive interventions - for the monitoringAlerts section).

Input Data Structure (example):
The user will provide data in a JSON structure similar to this (actual values will vary):
${JSON.stringify({
  personalInfo: { age: "35", location: "New York, USA", employmentStatus: "Employed", education: "Master's Degree", /* ... */ },
  financialData: { income: "90000", creditScore: "720", /* ... */ },
  alternativeData: { bankTransactionPatterns: "Regular salary, consistent bill payments", /* ... */ },
  loanDetails: { requestedLoanAmount: "20000", loanPurpose: "Home Improvement", /* ... */ }
}, null, 2)}

Task:
Based on the provided credit application data, generate a comprehensive risk assessment.
You MUST provide your response *ONLY* as a single, valid JSON object, adhering strictly to the format specified below.
Do NOT include any explanatory text, markdown formatting (like \`\`\`json), or any other content outside of the JSON object itself.

Required JSON Output Format:
${JSON.stringify(sampleOutputStructure, null, 2)}

Decision Framework:
- Prioritize accuracy while maintaining processing speed.
- Balance risk mitigation with business growth opportunities.
- Consider the full customer relationship potential.
- Provide clear reasoning within the analysis sections.
- Flag cases requiring human review appropriately.

Ethical Guidelines:
- Ensure assessments are free from discriminatory bias.
- Protect borrower privacy and data security (simulate this principle).
- Provide transparent explanations for credit decisions (through the detailed JSON).
- Support financial inclusion initiatives.
- Maintain compliance with applicable regulations (GDPR, CCPA, fair lending laws).

Now, analyze the following credit application data and provide your assessment ONLY in the specified JSON format:
${JSON.stringify(data, null, 2)}
`;
};


export const generateCreditAssessment = async (data: CreditApplicationData): Promise<RiskAssessmentOutput> => {
  if (!API_KEY) {
    throw new Error("Gemini API Key is not configured. Please set the process.env.API_KEY environment variable.");
  }
  
  const prompt = generatePrompt(data);

  try {
    const response: GenerateContentResponse = await ai.models.generateContent({
      model: GEMINI_API_MODEL,
      contents: [{ role: "user", parts: [{ text: prompt }] }],
      config: {
        responseMimeType: "application/json", // Request JSON directly
        // Consider adding temperature, topK, topP if needed for tuning
        // temperature: 0.7, 
      }
    });
    
    let jsonStr = response.text.trim();
    
    // Remove markdown fences if present (though responseMimeType: "application/json" should prevent this)
    const fenceRegex = /^```(?:json)?\s*\n?(.*?)\n?\s*```$/s;
    const match = jsonStr.match(fenceRegex);
    if (match && match[1]) {
      jsonStr = match[1].trim();
    }

    try {
      const parsedData = JSON.parse(jsonStr);
      // Basic validation (can be more thorough)
      if (!parsedData.executiveSummary || !parsedData.riskScore) {
          console.error("Parsed JSON is missing key fields:", parsedData);
          throw new Error("The AI response is not in the expected format. Missing key fields.");
      }
      return parsedData as RiskAssessmentOutput;
    } catch (e) {
      console.error("Failed to parse JSON response from AI:", e);
      console.error("Raw AI response text:", response.text);
      throw new Error(`Failed to parse the AI's response as JSON. Raw text: ${response.text.substring(0,500)}...`);
    }

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    if (error instanceof Error) {
        // Check for specific API error types if library provides them
        if (error.message.includes("API key not valid")) {
             throw new Error("The provided Gemini API Key is invalid or not authorized.");
        }
         throw new Error(`An error occurred while communicating with the AI assessment service: ${error.message}`);
    }
    throw new Error("An unknown error occurred during AI assessment.");
  }
};