const axios = require('axios');


export const classifyEmail = async (emailBody) => {
  const apiKey = window.localStorage.getItem("openApiKey"); // Ensure this is set in your environment variables
  console.log(apiKey);
  const prompt = `
  Classify the following email into one of these categories: Important, Promotions, Social, Marketing, Spam, General.
  
  Email: "${emailBody.replace(/"/g, '\\"')}"
  
  Classification:`;

  try {
    const response = await axios.post('https://api.openai.com/v1/engines/gpt-3.5-turbo-instruct/completions', {
      prompt: prompt,
      max_tokens: 10,
      temperature: 0,
    }, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${apiKey}`,
      }
    });
    console.log(response);
    const classification = response.data.choices[0].text.trim();
    return classification;
  } catch (error) {
    console.error("Error classifying email using GPT but will classify it LOGICALLY:", error);
    const classification = classifyEmailLogically(emailBody);
    return classification;
   }
};









function classifyEmailLogically(body) {
  // Predefined word lists with improved accuracy and reduced false positives
  const importantWords = [
    "urgent", "important", "meeting", 
    "confirmation", "appointment", "follow up", "response" 
, "action", "necessary", "review", 
  ];
  const promotionWords = ["sale", "discount", "coupon", "offer", "deal", "clearance",
                           "promotion", "free shipping", "limited time", "exclusive",
                           "cyber monday", "black friday", "flash sale", "percentage off"
                          ];
  const socialWords = ["friend", "family", "birthday", "congratulations", "photo",
                      "like", "comment", "share", "message", "update", "group", "event",
                      "social media", "network", "post", "tag", "follow"
                     ];
  const marketingWords = ["newsletter", "subscription", "unsubscribe", "update",
                          "announcement", "promotion", "campaign", "webinar", "ebook",
                          "whitepaper", "download", "free trial", "case study", "testimonial"
                         ];
  const spamWords = ["viagra", "pills", "casino", "win money", "free", "click here",
                    "unsubscribe from all", "**", "$$$", "!!!", "alert", "URGENT", "limited",
                    "act now" // Use caution with spam words to avoid false positives
                   ];

  // Lowercase the body for case-insensitive matching
  const lowerBody = body.toLowerCase();

  // Check for important words first (highest priority)
  if (importantWords.some(word => lowerBody.includes(word))) {
    return "Important";
  }
  
  if (marketingWords.some(word => lowerBody.includes(word))) {
    return "Marketing";
  }

  if (socialWords.some(word => lowerBody.includes(word))) {
    return "Social";
  }
 
  // Check for other categories in descending order of priority
  if (promotionWords.some(word => lowerBody.includes(word))) {
    return "Promotions";
  }
  if (socialWords.some(word => lowerBody.includes(word))) {
    return "Social";
  }
 
  if (spamWords.some(word => lowerBody.includes(word))) {
    return "Spam"; // Use with caution due to potential false positives
  }

  // Default to "General" if no matches
  return "General";
}
