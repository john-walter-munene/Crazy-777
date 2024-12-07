import { topUpPlayerStake } from "./utility";

class Player {
    constructor(id = null, username = null, sessionToken = null, balance = 0, isActive = false, sessionStart = null) {
        this.id = id;
        this.username = username;
        this.sessionToken = sessionToken;
        this.balance = balance;
        this.isActive = isActive;
        this.sessionStart = sessionStart;
    }

    // Method to update player attributes after authentication
    authenticate(authData) {
        this.id = authData.id;
        this.username = authData.username;
        this.sessionToken = authData.token;
        this.balance = authData.balance;
        this.isActive = true;
        this.sessionStart = new Date(); // Set the session start time
    }

    topUpAccount(amount) {
        this.balance = topUpPlayerStake(amount);
    }

    historyTracker() {
        // Use a map or set to track player history on new instances
        // Sync updates on game with DB.
    }
}

// Simulate authentication function
function authenticatePlayer(authData) {
    // Simulated response from an authentication API
    const response = {
        id: "player123",
        username: "CrazyGamer",
        token: "abc123xyz",
        balance: 100,
    };

    // Create a new Player instance and authenticate
    const player = new Player();
    player.authenticate(response);

    console.log(`Player authenticated: ${player.username}, Balance: ${player.balance}`);
    return player;
}

// Simulate authenticating a player
const player = authenticatePlayer({ username: "test", password: "1234" });
console.log(player);

export { player };