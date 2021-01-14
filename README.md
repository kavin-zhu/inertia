# inertia
We used Ganache to create nodes with worthless "fake Ethereum", 
and we used web3 to allow them to communicate to the network through the smart contracts (which we wrote with Remix). 
The front-end was made with just HTML/CSS and vanilla JavaScript and was served by a node.js back-end. 
Finally, we used ngrok to create tunnels to other devices.

Inertia uses blockchain to implement secure hive-mind thinking. 
Each device/car runs a node on the Ethereum network, and these devices update their location, destination, and their calculations of routes through smart contracts. 
Once all the cars have submitted this information, the network is able to come to a consensus on the best routes to take. 
The calculation itself (which all users take part in) is loosely based on Dijkstra's algorithm as well as other graph theory algorithms. 
Users that contribute to this calculation are rewarded with tokens.

Why use a distributed app? There are three advantages:

1. Privacy. People should not have to constantly send their location and destination to a third party.With Inertia, they can stay anonymous on the Ethereum network instead.
2. Security. If something goes wrong, a car accident could occur - which is why it is important to use the blockchain, which is much harder to corrupt.
3. Lower costs! Inertia does not require a server or additional infrastructure to implement. The clients do the heavy lifting, which also makes it scalable.
