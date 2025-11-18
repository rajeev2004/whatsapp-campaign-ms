## WhatsApp Campaign Microservice

A lightweight Node.js + Express + MongoDB microservice that simulates WhatsApp-style template messaging, bulk campaigns, and delivery tracking — inspired by systems like TrioChat, Twilio WhatsApp, and WhatsApp Cloud API.

## 🚀 Features

### ✔ Template Engine

Create and store message templates with placeholder variables (e.g., {{name}}, {{orderId}}).

### ✔ Campaign Manager

Launch WhatsApp-like campaigns with bulk recipients.
Templates are auto-filled with recipient data.

### ✔ Delivery Simulation

Realistic message status pipeline:

queued → sent → delivered | failed

### ✔ Campaign Reporting

Live report showing:

total recipients

delivered count

failed count

sent count

queued count

per-user status

## 🛠 Tech Stack

Node.js

Express

MongoDB + Mongoose

Dotenv

Nodemon (dev)

## ▶ Running Locally

### 1. Install dependencies

```bash
npm install
```

### 2. Create .env

```bash
PORT=5000
MONGO_URI=your-mongodb-uri
```

### 3. Start server

```bash
npm run dev
```

### Server will run on:

```bash
http://localhost:5000
```

## 🌍 Live API (Render Deployment)

### Base URL:

```bash
https://whatsapp-campaign-ms.onrender.com
```

## 🔸 Health Check

### GET

```bash
/
```

## 🔸 Create Template

### POST

```bash
/templates
```

### Body:

```bash
{
  "name": "order_update",
  "content": "Hi {{name}}, your order {{orderId}} is being processed!"
}
```

## 🔸 Send Campaign

### POST

```bash
/campaigns/send
```

## 🔸 Campaign Report

### GET

```bash
/campaigns/<campaignId>/report
```

## 🎯 Purpose

This microservice demonstrates:

backend API design

async pipeline simulation

message template processing

MongoDB schema design

status transitions

reporting systems

Built to showcase backend engineering skills for roles like Backend Intern.