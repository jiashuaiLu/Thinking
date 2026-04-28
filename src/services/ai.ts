import { GoogleGenAI, Type } from '@google/genai';

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export interface ConceptNode {
  id: string;
  label: string;
  description: string;
  direction: string;
  type: 'core' | 'branch' | 'leaf';
}

export async function generateRelatedConcepts(concept: string, intent: string = '综合发散', count: number = 4): Promise<ConceptNode[]> {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-pro',
      contents: `You are an AI designed to inspire creativity and lateral thinking. 
                 The central concept is "${concept}". 
                 The user's current expansion direction/intent is: "${intent}".
                 Generate ${count} highly inspiring, slightly abstract, or deeply connected sub-concepts, phenomena, or ideas that specifically align with this direction.
                 These should spark imagination and help build a knowledge graph that converges towards the intent.
                 IMPORTANT: Provide the 'label', 'description', and 'direction' fields strictly in Simplified Chinese (简体中文).`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.ARRAY,
          items: {
            type: Type.OBJECT,
            properties: {
              id: { type: Type.STRING, description: "A unique, short, lowercase identifier with no spaces (e.g., 'quantum_flux')" },
              label: { type: Type.STRING, description: "A short, evocative title (1-3 words)" },
              description: { type: Type.STRING, description: "A 1-2 sentence inspiring explanation of how it connects to the main concept and the specified intent." },
              direction: { type: Type.STRING, description: "A short tag (2-4 words) describing the strategic angle of this thought. E.g., '解决具体问题', '艺术创作灵感', '底层运行原理', '跨界平替发散'" }
            },
            required: ["id", "label", "description", "direction"]
          }
        }
      }
    });

    if (response.text) {
      const data = JSON.parse(response.text);
      return data.map((item: any) => ({ ...item, type: 'branch' }));
    }
    return [];
  } catch (error) {
    console.error("Error generating concepts:", error);
    return [];
  }
}

