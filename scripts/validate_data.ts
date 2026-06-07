import { collection, getDocs, doc, updateDoc } from 'firebase/firestore';
import { db } from '../src/lib/firebase';
import * as readline from 'readline';

// Configuration
const OLLAMA_URL = 'http://127.0.0.1:11434/api/generate';
const OLLAMA_MODEL = 'qwen3.5:35b';

interface MonthData {
    avgDayTemp: number;
    avgNightTemp: number;
    rainfall: number;
    bestTime: 'best' | 'okay' | 'avoid';
}

interface Modifications {
    [month: string]: Partial<MonthData>;
}

interface ValidationResult {
    isValid: boolean;
    modifications?: Modifications;
}

const askQuestion = (query: string): Promise<string> => {
    const rl = readline.createInterface({
        input: process.stdin,
        output: process.stdout,
    });
    return new Promise(resolve => rl.question(query, ans => {
        rl.close();
        resolve(ans);
    }));
};

async function validateWithOllama(countryName: string, monthlyData: any): Promise<ValidationResult | null> {
    const prompt = `
    You are a travel data validation assistant. I will provide you with a country and its monthly climate and tourism data.
    Please validate the average day temperature (Celsius), average night temperature (Celsius), rainfall (mm), and best time to visit rating ('best', 'okay', or 'avoid') based on the latest available real-world data.
    
    Country: ${countryName}
    Current Data: ${JSON.stringify(monthlyData)}
    
    Return ONLY a JSON object with the following schema:
    {
        "isValid": boolean (true if all data is reasonably accurate within a few degrees/mm, false if major corrections are needed),
        "modifications": {
            // Include ONLY the months that need changes, and ONLY the fields that need changes within those months.
            "MonthName": {
                "avgDayTemp": number,
                "avgNightTemp": number,
                "rainfall": number,
                "bestTime": "best" | "okay" | "avoid"
            }
        }
    }
    `;

    try {
        const response = await fetch(OLLAMA_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                model: OLLAMA_MODEL,
                prompt: prompt,
                format: 'json',
                stream: false
            })
        });

        if (!response.ok) {
            console.error(`Ollama API error: ${response.statusText}`);
            return null;
        }

        const data = await response.json();
        console.log("Raw Ollama Data:", JSON.stringify(data).substring(0, 200) + '...');
        
        let rawText = data.response || data.thinking || '';
        
        // Sometimes models wrap JSON in markdown blocks
        const jsonMatch = rawText.match(/```(?:json)?\s*([\s\S]*?)```/);
        const jsonStr = jsonMatch ? jsonMatch[1] : rawText;
        
        return JSON.parse(jsonStr) as ValidationResult;
    } catch (error) {
        console.error('Failed to validate with Ollama. Error details:', error);
        return null;
    }
}

async function main() {
    console.log('Fetching countries data from Firebase...');
    const countriesCollection = collection(db, "countries");
    const snapshot = await getDocs(countriesCollection);

    const requiredUpdates: { id: string, name: string, oldData: any, modifications: Modifications }[] = [];

    // Process a limited number of countries by default to prevent long execution times, 
    // unless the user changes this script.
    const docs = snapshot.docs;

    console.log(`Found ${docs.length} countries. Starting validation...`);

    for (const countryDoc of docs) {
        const data = countryDoc.data();
        console.log(`Validating ${data.name}...`);

        const result = await validateWithOllama(data.name, data.monthlyData);

        if (result && !result.isValid && result.modifications && Object.keys(result.modifications).length > 0) {
            console.log(`Modifications found for ${data.name}.`);
            requiredUpdates.push({
                id: countryDoc.id,
                name: data.name,
                oldData: data.monthlyData,
                modifications: result.modifications
            });
        }
    }

    if (requiredUpdates.length === 0) {
        console.log('No modifications required for any country.');
        process.exit(0);
    }

    console.log('\n--- Review Required Modifications ---');
    for (const update of requiredUpdates) {
        console.log(`\nCountry: ${update.name}`);
        console.log(JSON.stringify(update.modifications, null, 2));
    }

    console.log('\n-------------------------------------');
    const answer = await askQuestion(`Do you want to apply these ${requiredUpdates.length} modifications to Firebase? (y/N): `);

    if (answer.toLowerCase() === 'y' || answer.toLowerCase() === 'yes') {
        console.log('Applying updates...');
        for (const update of requiredUpdates) {
            const countryRef = doc(db, "countries", update.id);
            // Merge modifications into oldData
            const newData = { ...update.oldData };
            for (const [month, changes] of Object.entries(update.modifications)) {
                if (newData[month]) {
                    newData[month] = { ...newData[month], ...changes };
                }
            }

            try {
                await updateDoc(countryRef, { monthlyData: newData });
                console.log(`Successfully updated ${update.name}.`);
            } catch (error) {
                console.error(`Failed to update ${update.name}:`, error);
                console.error(`If this is a permission error, Firestore rules might be blocking unauthenticated writes.`);
            }
        }
        console.log('All updates complete.');
    } else {
        console.log('Updates cancelled.');
    }

    process.exit(0);
}

main().catch(console.error);
