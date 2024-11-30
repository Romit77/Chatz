# Scalable Chat App with Redis Pub/Sub and Socket.IO

This project is a scalable chat application built with Redis Pub/Sub and Socket.IO. It addresses the challenge of scaling real-time communication by enabling multiple servers to share messages seamlessly using Redis as a message broker.

## Problem Statement

In a typical chat application:

1. **Single Server Scenario**: 
   - Users connect to a single server.
   - Messages are exchanged effortlessly.
   
2. **Multi-Server Scenario**: 
   - When the user base grows, new servers are added to distribute the load.
   - Users connected to different servers cannot communicate, breaking the real-time chat experience.

![image](https://github.com/user-attachments/assets/e705ccff-5902-474b-9c46-e11d8cd8b4dc)


### The Challenge:
How can users on different servers exchange messages seamlessly?

## Solution: Redis Pub/Sub Architecture

To solve this, we introduce **Redis Pub/Sub** as a message broker:

- **Redis Pub/Sub** allows servers to publish and subscribe to messages on specific channels.
- Each chat server subscribes to a common Redis channel.
- When a user sends a message:
  1. The server publishes the message to the Redis channel.
  2. Redis broadcasts the message to all subscribed servers.
  3. Each server relays the message to its connected users.

### Key Components

1. **Socket.IO**:
   - Enables real-time, bi-directional communication between the server and clients.

2. **Redis Pub/Sub**:
   - Acts as a message broker to sync messages across multiple servers.

3. **Server Instances**:
   - Multiple server instances can handle different users but remain in sync through Redis.

## How It Works

1. **User sends a message**:
   - The connected server publishes the message to a Redis channel.
   
2. **Redis distributes the message**:
   - All subscribed servers receive the message.

3. **Server broadcasts to clients**:
   - Each server broadcasts the received message to its connected users via Socket.IO.

![image](https://github.com/user-attachments/assets/d0008f86-3aa7-4a9f-83e1-bb42a5d44616)


### Example Flow

1. **User 1** connects to **Server 1** and sends a message: "Hello!"
2. **User 4** connects to **Server 2**.
3. **Server 1** publishes the message "Hello!" to the Redis channel.
4. **Server 2** receives the message from Redis and broadcasts it to **User 4**.
5. Both **User 1** and **User 4** see the message "Hello!" in real-time.

## Benefits

- **Scalability**: 
  - Add more servers as user traffic grows.
  
- **Seamless Communication**: 
  - Users on different servers can communicate without issue.

- **Fault Tolerance**: 
  - If one server fails, others continue operating independently.

## Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/)
- [Redis](https://redis.io/)
  
