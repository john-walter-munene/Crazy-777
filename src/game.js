import { checkPlayerCredentials } from "./utility";
import { player } from "./players";

// Create a single game instance.
const slotMachineGame = (function slotMachine() {
    // Game info.
    const gameInfo = {
        provider: 'Aljay Tech',
        reels: 3,
        maxWin: 3333,
        minBet: 0.6,
        maxBet: 1920,
    };
    // Slot machine sysmbols
    const symbolIcons = ['🍒', '🍋', '🍊', '🍉', '🎰', '💎', '💰', '🔔', '⭐', '7'];

    const gameSymbols = symbolIcons.map((icon, index) => {
        return {
            id: index + 1, // Unique IDs, starting from 1
            icon: icon, // Emoji symbol
            name: getSymbolName(icon), // Assign a name based on emoji.
        };
    });   
    
    const getSymbolName = (icon) => {
        const names = {
            '🍒': 'Cherry',
            '🍋': 'Lemon',
            '🍊': 'Orange',
            '🍉': 'Watermelon',
            '🎰': 'Slot Machine',
            '💎': 'Diamond',
            '💰': 'Money Bag',
            '🔔': 'Bell',
            '⭐': 'Star',
            '7': 'Seven'
        };

        return names[icon];
    }

    // Symbol Pools for each reel
    const symbolPools = {
        symbolPoolOne: [],
        symbolPoolTwo: [],
        symbolPoolThree: [],
    };

    // Function to populate symbol pools
    const populateSymbolPools = () => {
        for (const poolKey in symbolPools) {
            const pool = symbolPools[poolKey];

            // Clear the pool first.
            pool.splice(0, pool.length);

            const symbolsSet = new Set();

            // Continue adding unique symbols until the pool has 10 symbols.
            while (symbolsSet.size < 10) {
                const randomIndex = Math.floor(Math.random() * gameSymbols.length);
                const randomSymbol = gameSymbols[randomIndex].icon; // Get random symbol from the gameSymbols array.

                // Check to ensure the symbol is not already in the Set.
                if (!symbolsSet.has(randomSymbol)) symbolsSet.add(randomSymbol);  // Add symbol to Set (duplicates won't be added).
            }

            // Convert Set to an array and add it to the pool.
            pool.push(...symbolsSet);
        }
    };

    // Function to spin the reels
    const reelSpinner = (reelPool, minTime = 1000, maxTime = 3000, visibleCount = 3) => {
        return new Promise((resolve) => {
            let currentPool = [...reelPool]; // Clone reel pool
            const spinDuration = Math.floor(Math.random() * (maxTime - minTime + 1)) + minTime; // Random duration in ms
            
            // Dynamically generate a random number of spins based on the duration
            const spins = Math.floor(spinDuration / 100) + 5; // Random number of spins (at least 5 spins)
            const spinIntervalTime = spinDuration / spins; // Calculate time for each spin
    
            console.log(`Reel will spin ${spins} times over ${spinDuration}ms (~${spinIntervalTime.toFixed(2)}ms per spin)`);
    
            let spinCount = 0;
            let result = null; // To store the final result
    
            // Use a recursive setTimeout instead of setInterval for better control
            const spin = () => {
                // Simulate reel movement
                const shiftedSymbol = currentPool.shift(); // Remove the first symbol
                currentPool.push(shiftedSymbol); // Add it to the end
    
                // Display the visible symbols in the console
                const visibleSymbols = currentPool.slice(0, visibleCount);
                console.clear(); // Clear console for movement effect
                console.log(`Reel view: ${visibleSymbols.map(symbol => symbol).join(' ')}`);
    
                spinCount++;
                if (spinCount >= spins) {
                    result = visibleSymbols[Math.floor(visibleCount / 2)]; // Middle symbol
                    console.log(`Reel Stopped! Result: ${result}`);
                    resolve(result); // Resolve the Promise with the final result
                } else {
                    setTimeout(spin, spinIntervalTime); // Continue spinning until `spins` is reached
                }
            };
    
            // Start the spinning
            spin();
        });
    };  

    const spinAllReels = async () => {
        populateSymbolPools(); // Repopulate pools before spinning.

        const { symbolPoolOne, symbolPoolTwo, symbolPoolThree } = symbolPools; // Destructure pools.

        const results = await Promise.all([
            reelSpinner(symbolPoolOne),
            reelSpinner(symbolPoolTwo),
            reelSpinner(symbolPoolThree),
        ]);
    
        console.log(`All reels stopped! Final Results: ${results.join(' | ')}`);
        return results; // You can use this for further processing
    };   
    
    const checkPlayableBalance = (player) => {
        if (player.balance >= gameInfo.minBet) {
            console.log(`Balance ${player.balance}: You can play`);
            return true;
        } 
        console.log("Please top up to play");
        return false;
    }

    const canPlay = (player) => {
        let playerAuthorityState = checkPlayerCredentials(player);
        let playerStakeCanPlay = checkPlayableBalance(player);
        if (playerAuthorityState && playerStakeCanPlay) return true;
        return false;
    }

    const balanceDeducter = (accountBalance, playAmount) => {
        if ((accountBalance >= gameInfo.minBet) && (playAmount <= gameInfo.maxBet)) {
            if (accountBalance > playAmount) {
                return accountBalance - playAmount;
            }
        } 
    }

    const getRoundRewards = (results, playAmount) => {
        const [reel1, reel2, reel3] = results;
        // Award logic here...
    }

    // Running a game round.
    const runGameRound = async (player, playAmount) => {
        // Step 1: Validate player's status and place a bet.
        if (!canPlay(player)) {
            console.log("Player cannot play. Please check credentials or balance.");
            return;
        }
    
        if (playAmount < gameInfo.minBet || playAmount > gameInfo.maxBet) {
            console.log("Bet amount is out of bounds. Please adjust your bet.");
            return;
        }
    
        // Deduct the bet amount.
        player.balance = balanceDeducter(player.balance, playAmount);
        console.log(`Bet placed: ${playAmount}. Remaining balance: ${player.balance}`);
    
        // Step 2: Spin the reels and get the results.
        const results = await spinAllReels();
    
        // Step 3: Evaluate the results for a reward.
        const reward = getRoundRewards(results, playAmount); // Define reward logic inside `getRoundRewards`
    
        // Step 4: Update player's balance based on rewards.
        player.balance += reward;
        console.log(`Round result: ${results.join(' | ')}`);
        console.log(reward > 0 ? `You won ${reward}!` : "No win this time.");
        console.log(`Updated balance: ${player.balance}`);
    };

    return {
        runGameRound,
    }
})();