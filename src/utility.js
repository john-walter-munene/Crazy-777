// Mock backend operations to help in the development of game logic.

let testData = {
    id: "player123",
    token: "abc123xyz",
}

// Mock player data sync/validation
function checkPlayerCredentials(player, dbData = testData) {
    const playerToken = player.sessionToken;
    const playerID = player.id;

    // Check if the player's token and ID match the data from the database/API
    if (playerToken === dbData.token && playerID === dbData.id) {
        console.log("Credentials match.");
        return true; // Credentials match
    } else {
        console.log("Credentials do not match.");
        return false; // Credentials do not match
    }
}

// Mock player balance topups
function topUpPlayerStake(player, amount) {
    let newBalance = player.balance + amount;
    console.log(`Successful top up, new balance is ${newBalance}`)
    return newBalance;
}

export { checkPlayerCredentials, topUpPlayerStake };