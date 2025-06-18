# CVS-POC

A proof-of-concept Conversational AI Chatbot Application built for CVS Health, demonstrating integration between a SwiftUI mobile frontend, a Node.js backend powered by IBM Watson Assistant, and dynamic provider search capabilities. This POC supports basic health insurance inquiries, chatbot response chaining, and data-driven user interactions.

---

## 🧩 Project Structure

### 1. 📱 iOS Chat App (SwiftUI)

- A mobile front-end built with **SwiftUI**
- Chat interface with user-bot messaging
- Auto-scroll, dynamic response handling
- Supports Watson context chaining
- “Click to view” interaction navigates to a list of providers

### 2. 🌐 Node.js Backend

- Express server handling Watson Assistant API calls
- Uses Watson Assistant v2 API
- Custom logic to detect intents and dynamically inject provider data
- Supports response chaining and disambiguation

### 3. 📊 K-Fold Testing Data (Screenshots)

- Located in `screenshots/kfold` folder
- Contains annotated training data and screenshots of fold-based testing for intent quality
- Used during Watson Assistant tuning and validation

---

## 🚀 Getting Started

### Prerequisites

- Xcode 15+ (for SwiftUI app)
- Node.js 18+
- IBM Watson Assistant instance + API Key
- Ngrok (for local backend testing from mobile)
