import { GoogleGenerativeAI } from "@google/generative-ai";
import { resortData } from "./resort-data";

const getClient = () => {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) throw new Error("GEMINI_API_KEY not configured");
  return new GoogleGenerativeAI(apiKey);
};

export const resortContext = `
You are the AI concierge for ${resortData.name}, a luxury mountain resort located in ${resortData.location}.

RESORT INFORMATION:
- Name: ${resortData.name}
- Tagline: "${resortData.tagline}"
- Location: ${resortData.location}
- Contact: ${resortData.contact.phone} | ${resortData.contact.email}
- Address: ${resortData.contact.address}

ROOMS & PRICING:
${resortData.rooms.map((r) => `- ${r.name}: ₹${r.price.toLocaleString("en-IN")}/night (capacity: ${r.capacity} guests) - ${r.description}`).join("\n")}

POLICIES:
- Check-in: ${resortData.policies.checkIn}
- Check-out: ${resortData.policies.checkOut}
- Breakfast: Included with all stays
- Cancellation: ${resortData.policies.cancellation}

AMENITIES:
${resortData.amenities.join(", ")}

ACTIVITIES:
${resortData.activities.join(", ")}

NEARBY ATTRACTIONS:
${resortData.nearbyAttractions.map((a) => `- ${a.name} (${a.distance}): ${a.description}`).join("\n")}

DINING:
- Restaurant: ${resortData.dining.restaurant}
- Cuisines: ${resortData.dining.cuisine.join(", ")}
- Breakfast: ${resortData.dining.timings.breakfast}
- Lunch: ${resortData.dining.timings.lunch}
- Dinner: ${resortData.dining.timings.dinner}

PACKAGES:
${resortData.packages.map((p) => `- ${p.name}: ₹${p.price.toLocaleString("en-IN")} for ${p.duration} - ${p.description}`).join("\n")}
`;

export async function getChatResponse(
  messages: { role: string; content: string }[]
): Promise<string> {
  const genAI = getClient();
  const model = genAI.getGenerativeModel({ model: "gemini-flash-lite-latest" });

  const systemPrompt = `${resortContext}

Your role: You are a warm, professional, and knowledgeable AI concierge for ${resortData.name}.
Guidelines:
- Be helpful, friendly, and conversational
- Always provide specific details from the resort data above
- Format prices in Indian Rupees (₹) with proper formatting
- Suggest relevant packages or rooms when appropriate
- Be concise but informative
- Use markdown for better formatting when helpful
- If asked about something not in the resort data, politely explain you can help with resort-related queries`;

  const chat = model.startChat({
    history: [
      {
        role: "user",
        parts: [{ text: "System context: " + systemPrompt }],
      },
      {
        role: "model",
        parts: [
          {
            text: "Understood! I'm the AI concierge for Aaryam Resorts. I'm ready to help guests with information about rooms, packages, amenities, local attractions, and anything else they need for a wonderful stay. How can I assist you today?",
          },
        ],
      },
      ...messages.slice(0, -1).map((m) => ({
        role: m.role === "assistant" ? "model" : "user",
        parts: [{ text: m.content }],
      })),
    ],
  });

  const lastMessage = messages[messages.length - 1];
  const result = await chat.sendMessage(lastMessage.content);
  return result.response.text();
}

export async function getPackageRecommendation(input: {
  budget: number;
  people: number;
  purpose: string;
  duration: number;
}): Promise<string> {
  const genAI = getClient();
  const model = genAI.getGenerativeModel({ model: "gemini-flash-lite-latest" });

  const prompt = `${resortContext}

Based on the above resort information, provide a detailed package recommendation for:
- Budget: ₹${input.budget.toLocaleString("en-IN")} total
- Number of Guests: ${input.people} people
- Travel Purpose: ${input.purpose}
- Duration: ${input.duration} nights

Respond in valid JSON format (no markdown code blocks) with this exact structure:
{
  "packageName": "string",
  "recommendedRoom": "string",
  "estimatedCost": number,
  "duration": "string",
  "suggestedActivities": ["activity1", "activity2", "activity3"],
  "recommendationReason": "string",
  "travelTips": ["tip1", "tip2", "tip3"],
  "highlights": ["highlight1", "highlight2", "highlight3"],
  "whatIsIncluded": ["item1", "item2", "item3"],
  "bestTimeToVisit": "string"
}`;

  const result = await model.generateContent(prompt);
  return result.response.text();
}

export async function getTravelPlan(input: {
  days: number;
  groupType: string;
  interests: string[];
}): Promise<string> {
  const genAI = getClient();
  const model = genAI.getGenerativeModel({ model: "gemini-flash-lite-latest" });

  const prompt = `${resortContext}

Create a detailed day-by-day travel itinerary for a stay at ${resortData.name}:
- Duration: ${input.days} days
- Group Type: ${input.groupType}
- Interests: ${input.interests.join(", ")}

Respond in valid JSON format (no markdown code blocks) with this exact structure:
{
  "title": "string",
  "summary": "string",
  "days": [
    {
      "day": 1,
      "title": "string",
      "morning": "string",
      "afternoon": "string",
      "evening": "string",
      "highlight": "string"
    }
  ],
  "packingTips": ["tip1", "tip2"],
  "generalTips": ["tip1", "tip2"]
}`;

  const result = await model.generateContent(prompt);
  return result.response.text();
}

export async function getSocialContent(input: {
  offerName: string;
  eventDetails: string;
  roomDetails: string;
  audienceType: string;
}): Promise<string> {
  const genAI = getClient();
  const model = genAI.getGenerativeModel({ model: "gemini-flash-lite-latest" });

  const prompt = `You are a luxury hospitality social media expert for ${resortData.name}, ${resortData.location}.

Create compelling social media content for:
- Offer/Campaign: ${input.offerName}
- Event Details: ${input.eventDetails}
- Room/Package Featured: ${input.roomDetails}
- Target Audience: ${input.audienceType}
- Resort Tagline: "${resortData.tagline}"

Respond in valid JSON format (no markdown code blocks) with this exact structure:
{
  "instagram": {
    "caption": "string (engaging, 2-3 paragraphs)",
    "hashtags": ["#tag1", "#tag2", "#tag3", "#tag4", "#tag5", "#tag6", "#tag7", "#tag8"]
  },
  "whatsapp": {
    "message": "string (conversational promotion message)"
  },
  "facebook": {
    "post": "string (detailed post with emojis)"
  },
  "twitter": {
    "tweet": "string (under 280 characters)"
  },
  "emailSubject": "string",
  "callToAction": "string"
}`;

  const result = await model.generateContent(prompt);
  return result.response.text();
}

export async function getReviewResponse(review: string): Promise<string> {
  const genAI = getClient();
  const model = genAI.getGenerativeModel({ model: "gemini-flash-lite-latest" });

  const prompt = `You are the General Manager of ${resortData.name}, a luxury 5-star mountain resort in ${resortData.location}.

A guest has left this review: "${review}"

Write a professional, empathetic, and personalized management response that:
- Thanks the guest for their feedback
- Acknowledges both positives and concerns specifically
- Addresses any issues mentioned with sincerity and specific remediation steps
- Invites them back with warmth
- Represents premium luxury hospitality standards

Respond in valid JSON format (no markdown code blocks) with this exact structure:
{
  "response": "string (full management response, 3-4 paragraphs)",
  "sentiment": "positive | mixed | negative",
  "keyPoints": ["point1", "point2", "point3"],
  "actionItems": ["action1", "action2"],
  "tone": "string"
}`;

  const result = await model.generateContent(prompt);
  return result.response.text();
}
