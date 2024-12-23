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
function topUpPlayerStake(player, topUpAmount) {
    let newBalance = player.balance + topUpAmount;
    console.log(`Successful top up, new balance is ${newBalance}`)
    return newBalance;
}

// Mock player withdrawals.
function makeWithdrawal(player, withdrawalAmount) {
    if (withdrawalAmount < 20) throw new Error("Can't withdraw less than $20");
    let newBalance = player.balance - withdrawalAmount;
    console.log(`Succesful withdrawal, new balance is ${newBalance}`);
    return newBalance;

}

function getLastBetID(playerID) {
    // Simulated response from backend API.
    const response = {
        id: "player123",
        username: "CrazyGamer",
        LastBetID: 0,
    }

    return response[LastBetID];
}

function createPlayerAccount(playerDetails) {
    // Simulated response from Authentication API.
    const authData = newPlayerInDatabase(playerDetails);
    return authData;
}
export { 
    checkPlayerCredentials, 
    topUpPlayerStake,
    makeWithdrawal,
    getLastBetID,
    createPlayerAccount,
};