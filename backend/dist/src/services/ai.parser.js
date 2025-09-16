export class AIParser {
    static parseTaskResponse(response) {
        try {
            let cleanedResponse = response
                .replace(/```json\n?/g, '')
                .replace(/```\n?$/g, '')
                .replace(/^```/g, '')
                .trim();
            const jsonMatch = cleanedResponse.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
                cleanedResponse = jsonMatch[0];
            }
            const parseJSON = (jsonString) => {
                try {
                    return JSON.parse(jsonString);
                }
                catch (error) {
                    let cleaned = jsonString
                        .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '')
                        .replace(/,(\s*[}\]])/g, '$1') // Remove trailing commas
                        .replace(/([^\\])\\([^"\\\/bfnrt])/g, '$1\\\\$2'); // Fix unescaped backslashes
                    return JSON.parse(cleaned);
                }
            };
            const parsed = parseJSON(cleanedResponse);
            if (!parsed.title || !parsed.description) {
                throw new Error('Invalid AI response format - missing title or description');
            }
            return parsed;
        }
        catch (error) {
            console.error('Error parsing AI response:', error);
            console.error('Raw response:', response);
            try {
                const titleMatch = response.match(/"title":\s*"([^"]+)"/);
                const descriptionMatch = response.match(/"description":\s*"([^"]+)"/);
                const problemStatementMatch = response.match(/"problemStatement":\s*"([^"]+)"/);
                if (titleMatch && descriptionMatch) {
                    console.log('🔄 Using fallback parsing for AI response');
                    return {
                        title: titleMatch[1],
                        description: descriptionMatch[1],
                        problemStatement: problemStatementMatch ? problemStatementMatch[1] : 'Problem statement not available'
                    };
                }
            }
            catch (fallbackError) {
                console.error('Fallback parsing also failed:', fallbackError);
            }
            throw new Error('Failed to parse AI response');
        }
    }
    static parseAnswerResponse(response) {
        try {
            let cleanedResponse = response
                .replace(/```json\n?/g, '')
                .replace(/```\n?$/g, '')
                .replace(/^```/g, '')
                .trim();
            const jsonMatch = cleanedResponse.match(/\{[\s\S]*\}/);
            if (jsonMatch) {
                cleanedResponse = jsonMatch[0];
            }
            const parseJSON = (jsonString) => {
                try {
                    return JSON.parse(jsonString);
                }
                catch (error) {
                    let cleaned = jsonString
                        .replace(/[\x00-\x08\x0B\x0C\x0E-\x1F\x7F]/g, '')
                        .replace(/,(\s*[}\]])/g, '$1') // Remove trailing commas
                        .replace(/([^\\])\\([^"\\\/bfnrt])/g, '$1\\\\$2'); // Fix unescaped backslashes
                    return JSON.parse(cleaned);
                }
            };
            const parsed = parseJSON(cleanedResponse);
            if (!parsed.answer || !parsed.solution || !parsed.testCases) {
                throw new Error('Invalid AI response format - missing answer, solution, or testCases');
            }
            return parsed;
        }
        catch (error) {
            console.error('Error parsing AI answer response:', error);
            console.error('Raw response:', response);
            try {
                const answerMatch = response.match(/"answer":\s*"([^"]+)"/);
                const solutionMatch = response.match(/"solution":\s*"([^"]+)"/);
                if (answerMatch && solutionMatch) {
                    console.log('🔄 Using fallback parsing for AI answer response');
                    return {
                        answer: answerMatch[1],
                        solution: solutionMatch[1],
                        testCases: []
                    };
                }
            }
            catch (fallbackError) {
                console.error('Fallback parsing also failed:', fallbackError);
            }
            throw new Error('Failed to parse AI answer response');
        }
    }
}
