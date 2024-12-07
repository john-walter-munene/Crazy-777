/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/players.js":
/*!************************!*\
  !*** ./src/players.js ***!
  \************************/
/***/ (() => {

eval("class Player {\r\n    constructor(id = null, username = null, sessionToken = null, balance = 0, isActive = false, sessionStart = null) {\r\n        this.id = id;\r\n        this.username = username;\r\n        this.sessionToken = sessionToken;\r\n        this.balance = balance;\r\n        this.isActive = isActive;\r\n        this.sessionStart = sessionStart;\r\n    }\r\n\r\n    // Method to update player attributes after authentication\r\n    authenticate(authData) {\r\n        this.id = authData.id;\r\n        this.username = authData.username;\r\n        this.sessionToken = authData.token;\r\n        this.balance = authData.balance;\r\n        this.isActive = true;\r\n        this.sessionStart = new Date(); // Set the session start time\r\n    }\r\n}\r\n\r\n// Simulate authentication function\r\nfunction authenticatePlayer(authData) {\r\n    // Simulated response from an authentication API\r\n    const response = {\r\n        id: \"player123\",\r\n        username: \"CrazyGamer\",\r\n        token: \"abc123xyz\",\r\n        balance: 100,\r\n    };\r\n\r\n    // Create a new Player instance and authenticate\r\n    const player = new Player();\r\n    player.authenticate(response);\r\n\r\n    console.log(`Player authenticated: ${player.username}, Balance: ${player.balance}`);\r\n    return player;\r\n}\r\n\r\n// Simulate authenticating a player\r\nconst player = authenticatePlayer({ username: \"test\", password: \"1234\" });\r\nconsole.log(player);//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiLi9zcmMvcGxheWVycy5qcyIsIm1hcHBpbmdzIjoiQUFBQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0Esd0NBQXdDO0FBQ3hDO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSx5Q0FBeUMsZ0JBQWdCLGFBQWEsZUFBZTtBQUNyRjtBQUNBO0FBQ0E7QUFDQTtBQUNBLG9DQUFvQyxvQ0FBb0M7QUFDeEUiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9kZXZzdGFydGJ1aWxkaW5nLy4vc3JjL3BsYXllcnMuanM/M2ZkNCJdLCJzb3VyY2VzQ29udGVudCI6WyJjbGFzcyBQbGF5ZXIge1xyXG4gICAgY29uc3RydWN0b3IoaWQgPSBudWxsLCB1c2VybmFtZSA9IG51bGwsIHNlc3Npb25Ub2tlbiA9IG51bGwsIGJhbGFuY2UgPSAwLCBpc0FjdGl2ZSA9IGZhbHNlLCBzZXNzaW9uU3RhcnQgPSBudWxsKSB7XHJcbiAgICAgICAgdGhpcy5pZCA9IGlkO1xyXG4gICAgICAgIHRoaXMudXNlcm5hbWUgPSB1c2VybmFtZTtcclxuICAgICAgICB0aGlzLnNlc3Npb25Ub2tlbiA9IHNlc3Npb25Ub2tlbjtcclxuICAgICAgICB0aGlzLmJhbGFuY2UgPSBiYWxhbmNlO1xyXG4gICAgICAgIHRoaXMuaXNBY3RpdmUgPSBpc0FjdGl2ZTtcclxuICAgICAgICB0aGlzLnNlc3Npb25TdGFydCA9IHNlc3Npb25TdGFydDtcclxuICAgIH1cclxuXHJcbiAgICAvLyBNZXRob2QgdG8gdXBkYXRlIHBsYXllciBhdHRyaWJ1dGVzIGFmdGVyIGF1dGhlbnRpY2F0aW9uXHJcbiAgICBhdXRoZW50aWNhdGUoYXV0aERhdGEpIHtcclxuICAgICAgICB0aGlzLmlkID0gYXV0aERhdGEuaWQ7XHJcbiAgICAgICAgdGhpcy51c2VybmFtZSA9IGF1dGhEYXRhLnVzZXJuYW1lO1xyXG4gICAgICAgIHRoaXMuc2Vzc2lvblRva2VuID0gYXV0aERhdGEudG9rZW47XHJcbiAgICAgICAgdGhpcy5iYWxhbmNlID0gYXV0aERhdGEuYmFsYW5jZTtcclxuICAgICAgICB0aGlzLmlzQWN0aXZlID0gdHJ1ZTtcclxuICAgICAgICB0aGlzLnNlc3Npb25TdGFydCA9IG5ldyBEYXRlKCk7IC8vIFNldCB0aGUgc2Vzc2lvbiBzdGFydCB0aW1lXHJcbiAgICB9XHJcbn1cclxuXHJcbi8vIFNpbXVsYXRlIGF1dGhlbnRpY2F0aW9uIGZ1bmN0aW9uXHJcbmZ1bmN0aW9uIGF1dGhlbnRpY2F0ZVBsYXllcihhdXRoRGF0YSkge1xyXG4gICAgLy8gU2ltdWxhdGVkIHJlc3BvbnNlIGZyb20gYW4gYXV0aGVudGljYXRpb24gQVBJXHJcbiAgICBjb25zdCByZXNwb25zZSA9IHtcclxuICAgICAgICBpZDogXCJwbGF5ZXIxMjNcIixcclxuICAgICAgICB1c2VybmFtZTogXCJDcmF6eUdhbWVyXCIsXHJcbiAgICAgICAgdG9rZW46IFwiYWJjMTIzeHl6XCIsXHJcbiAgICAgICAgYmFsYW5jZTogMTAwLFxyXG4gICAgfTtcclxuXHJcbiAgICAvLyBDcmVhdGUgYSBuZXcgUGxheWVyIGluc3RhbmNlIGFuZCBhdXRoZW50aWNhdGVcclxuICAgIGNvbnN0IHBsYXllciA9IG5ldyBQbGF5ZXIoKTtcclxuICAgIHBsYXllci5hdXRoZW50aWNhdGUocmVzcG9uc2UpO1xyXG5cclxuICAgIGNvbnNvbGUubG9nKGBQbGF5ZXIgYXV0aGVudGljYXRlZDogJHtwbGF5ZXIudXNlcm5hbWV9LCBCYWxhbmNlOiAke3BsYXllci5iYWxhbmNlfWApO1xyXG4gICAgcmV0dXJuIHBsYXllcjtcclxufVxyXG5cclxuLy8gU2ltdWxhdGUgYXV0aGVudGljYXRpbmcgYSBwbGF5ZXJcclxuY29uc3QgcGxheWVyID0gYXV0aGVudGljYXRlUGxheWVyKHsgdXNlcm5hbWU6IFwidGVzdFwiLCBwYXNzd29yZDogXCIxMjM0XCIgfSk7XHJcbmNvbnNvbGUubG9nKHBsYXllcik7Il0sIm5hbWVzIjpbXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///./src/players.js\n");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval-source-map devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./src/players.js"]();
/******/ 	
/******/ })()
;