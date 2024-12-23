// Create a single instance for rewards.
const gameRewards = (function gameRewardsControl() {

    // Reward scaler constant.
    const REWARD_WEIGHT_SCALER = 10;

    // Reward tiers
    const symbolCategories = {
        bigWins: ['7', '💎', '💰'],  // High value symbols for big wins
        mediumWins: ['🎰', '🔔', '⭐'],  // Slot machine (wild) and other medium value symbols
        smallWins: ['🍒', '🍋', '🍊', '🍉']  // Fruit symbols for small wins
    };

    // Reward Multipliers
    const symbolWeights = {
        bigWins: [10, 9, 8], // High value weights
        mediumWins: [7, 6, 5], // Medium value weights
        smallWins: [4, 3, 2, 1], // Small value weights
    };

    // const symbolToCategoryMap = Object.entries(symbolCategories).reduce((map, [category, symbols]) => {
    //     symbols.forEach(symbol => {
    //         map[symbol] = category;
    //     });
    //     return map;
    // }, {});

    const symbolToCategoryMap = {
        "7": "bigWins",
        "💎": "bigWins",
        "💰": "bigWins",
        "🎰": "mediumWins",
        "🔔": "mediumWins",
        "⭐": "mediumWins",
        "🍒": "smallWins",
        "🍋": "smallWins",
        "🍊": "smallWins",
        "🍉": "smallWins", 
    };

    // Count the occurences of each symbol.
    const countSymbolOccurrences = (results) => {
        const resultsMap = new Map();
        for (const symbol of results) {
            resultsMap.set(symbol, (resultsMap.get(symbol) || 0) + 1);
        }
        return resultsMap;
    };

    // Check presence of wild symbol.
    const checkForWildSymbol = (resultsMap) => {
        let wildSymbol = symbolCategories.mediumWins[0];
        if (resultsMap.has(wildSymbol)) {
            if (resultsMap.get(wildSymbol) === 1) {
                return true;
            }
            return false;
        }
        return false;
    };    

    // Replace wild symbol before evaluation.
    const replaceWildSymbol = (resultsMap) => {
        let wildSymbol = symbolCategories.mediumWins[0];
        resultsMap.delete(wildSymbol); // Safe because `checkForWildSymbol` ensures existence
        resultsMap.set(substituteWildSymbol(), 1);
        return resultsMap;
    };    

    // Get a replacement for wild symbol
    const substituteWildSymbol = () => {
        const gameSymbols = ['🍒', '🍋', '🍊', '🍉', '🎰', '💎', '💰', '🔔', '⭐', '7'];
        const symbolPool = new Set();
    
        // Randomly populate a unique symbol pool
        while (symbolPool.size < 10) {
            const randomIndex = Math.floor(Math.random() * gameSymbols.length);
            symbolPool.add(gameSymbols[randomIndex]);
        }
    
        const poolArray = Array.from(symbolPool); // Convert Set to Array
        const randomSymbol = poolArray[Math.floor(Math.random() * poolArray.length)]; // Pick a random symbol
        return randomSymbol; // Return the substitutional symbol
    };

    const matchCategorizer = (resultsMap) => {
        if (!(resultsMap instanceof Map)) {
            throw new Error('Invalid input: resultsMap must be a Map');
        }
    
        let matchCategory = null;
        let resultsMapSize = resultsMap.size;
    
        switch (resultsMapSize) {
            case 3:
                matchCategory = 'No matching symbols';
                break;
            case 2:
                matchCategory = '2 Matching symbols';
                break;
            case 1:
                matchCategory = '3 Matching symbols';
                break;
            default:
                matchCategory = 'Unknown category'; // Log or handle unexpected sizes explicitly
        }
    
        return matchCategory;
    };    

    // Function to get the payout initiator key based on conditions
    const getPayoutInitiatorKey = (resultsMap, searchValue = null) => {
        for (let [key, value] of resultsMap) {
            // Check for exact match
            if (searchValue !== null && value === searchValue) {
                return key;
            }
        }
        
        // Check for the first high-value symbol in bigWins category
        for (let [key] of resultsMap) {
            if (symbolCategories.bigWins.includes(key)) {
                return key;
            }
        }

        // Return null if no matching key is found
        return null;
    };

    // Balance probability with payout
    const payoutProbabilityBalancer = (resultsMap, matchCategory) => {
        let payoutMultiplier = 0; // Default to no payout
        let payoutInitiatorKey = null;

        // Exit at early stages with defaults if no matching symbols present.
        if (matchCategory === 'No matching symbols') return { payoutMultiplier, payoutInitiatorKey };
        
        // Assign multiplier and find initiator key based on match category
        switch (matchCategory) {
            case '3 Matching symbols':
                payoutMultiplier = 1000; // Perfect Match: Bet×1000
                payoutInitiatorKey = getPayoutInitiatorKey(resultsMap, 3);
                break;

            case '2 Matching symbols':
                payoutMultiplier = 10; // Two Matching: Bet×10
                payoutInitiatorKey = getPayoutInitiatorKey(resultsMap, 2);
                break;

            case 'No matching symbols':
                payoutMultiplier = 2; // Special Single Match: Bet×2
                payoutInitiatorKey = getPayoutInitiatorKey(resultsMap);
                break;

            default:
                console.error(`Unknown match category: ${matchCategory}`);
        }

        return { payoutMultiplier, payoutInitiatorKey };
    };

    const getPayoutWeightingValue = (payoutInitiatorKey) => {
        let payoutWeight = 0;
    
        // Determine the category group for the symbol
        let paymentCategoryGroup = symbolToCategoryMap[payoutInitiatorKey];
    
        // Find the index of the symbol in the category group
        let rewardSymbolIndex = symbolCategories[paymentCategoryGroup].indexOf(payoutInitiatorKey);
    
        // Retrieve the corresponding payout weight
        payoutWeight = symbolWeights[paymentCategoryGroup][rewardSymbolIndex];
    
        return payoutWeight;
    };       

    // Reward assignments
    const rewardAssignment = (results, betAmount) => {
        console.log("Results:", results);
    
        // Count occurrences of each symbol
        let symbolOccurrences = countSymbolOccurrences(results);
        console.log("Symbol Occurrences:", symbolOccurrences);
    
        // Check and handle wild symbols
        let wildSymbolPresence = checkForWildSymbol(symbolOccurrences);
        console.log("Wild Symbol Presence:", wildSymbolPresence);
    
        if (wildSymbolPresence) {
            symbolOccurrences = replaceWildSymbol(symbolOccurrences); // Replace wild symbols in occurrences
            console.log("Symbol Occurrences after Wild Replacement:", symbolOccurrences);
        }
    
        // Categorize match type
        let matchCategory = matchCategorizer(symbolOccurrences);
        console.log("Match Category:", matchCategory);
    
        // Get payout details
        let { payoutMultiplier, payoutInitiatorKey } = payoutProbabilityBalancer(symbolOccurrences, matchCategory);
        console.log("Payout Multiplier:", payoutMultiplier);
        console.log("Payout Initiator Key:", payoutInitiatorKey);
    
        // Return zero rewards if no valid payout
        if (!payoutInitiatorKey || payoutMultiplier === 0) {
            console.log("No valid payout.");
            return 0;
        }
    
        // Determine payout weight and calculate final reward
        let payoutWeightValue = getPayoutWeightingValue(payoutInitiatorKey);
        console.log("Payout Weight Value:", payoutWeightValue);
    
        // Reward calculation
        let finalReward = betAmount * payoutMultiplier * (payoutWeightValue / REWARD_WEIGHT_SCALER);
        console.log(`Reward Assigned: ${finalReward}`);
        let winnings = betAmount + finalReward;
        console.log(`Bet payouts: ${winnings}`)
        return winnings ;
    };    

    // Add bonus features
    // Wild symbol (one that can subsititute for another increase winning chanves)
    // Jacpot 777

    // Progressive elements 
    // Bet size influence (optionally give wild symbol for large bets)
    // Cumulative rewards: progressive cumulative Jackpot

    // Player history and tracking
    // Use local storage for development
    // Transition to DB once application is ready.

    return { rewardAssignment };
})();

// Generate random bet amounts and random symbols for testing
const generateRandomTests = (numTests) => {
    const possibleSymbols = ['🍒', '🍋', '🍊', '🍉', '🎰', '💎', '💰', '🔔', '⭐', '7'];
    const tests = [];

    for (let i = 0; i < numTests; i++) {
        // Generate a random bet amount between 10 and 1000
        const betAmount = Math.floor(Math.random() * 991) + 10;

        // Generate a random result array of 3 symbols
        const results = Array.from({ length: 3 }, () => {
            return possibleSymbols[Math.floor(Math.random() * possibleSymbols.length)];
        });

        tests.push({ betAmount, results });
    }

    return tests;
};

// Test gameRewards.rewardAssignment with 15 random cases
const randomTests = generateRandomTests(15);

randomTests.forEach(({ betAmount, results }, index) => {
    console.log(`Test ${index + 1}:`);
    console.log(`Bet Amount: ${betAmount}`);
    console.log(`Results: ${results}`);
    const winnings = gameRewards.rewardAssignment(results, betAmount);
    console.log(`Winnings: ${winnings}`);
    console.log('-----------------------------------');
});

export { gameRewards };