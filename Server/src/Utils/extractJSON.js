const extractJSON = async (text) => {
    if (!text) {
        return null;
    }

    let cleanRes = text.trim();
    
    const firstBrace = cleanRes.indexOf('{');
    const firstBracket = cleanRes.indexOf('[');
    
    if (firstBrace === -1 && firstBracket === -1) {
        return null;
    }
    
    let jsonString = '';
    
    if (firstBrace !== -1 && (firstBracket === -1 || firstBrace < firstBracket)) {
        // Object is outer
        const lastBrace = cleanRes.lastIndexOf('}');
        if (lastBrace !== -1 && lastBrace > firstBrace) {
            jsonString = cleanRes.slice(firstBrace, lastBrace + 1);
        }
    } else {
        // Array is outer
        const lastBracket = cleanRes.lastIndexOf(']');
        if (lastBracket !== -1 && lastBracket > firstBracket) {
            jsonString = cleanRes.slice(firstBracket, lastBracket + 1);
        }
    }
    
    if (!jsonString) {
        return null;
    }
    
    try {
        return JSON.parse(jsonString);
    } catch (error) {
        console.error("Failed to parse JSON string:", jsonString);
        console.error("Parse error:", error);
        return null;
    }
};


export default extractJSON;