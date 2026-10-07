# EventOS

> A modern full-stack event management and registration platform for discovering, organizing, and participating in sports, fitness, and community events.

EventOS is a production-oriented event platform designed to bring participants, organizers, and administrators into one ecosystem.

From discovering events and registering online to payments, digital tickets, QR check-ins, live results, and real-time updates — EventOS provides the complete event lifecycle in one platform.

---

## ✨ Features

### 👤 Participants

- Create an account and manage profile
- Discover upcoming events
- Search and filter events
- View detailed event information
- Register for events
- Multi-step registration flow
- Emergency contact information
- Online event payments
- Digital event tickets
- QR-based check-in
- View registered events
- Track check-in status
- Live event results
- Personal race results and rankings
- Race splits and performance statistics
- Downloadable certificates
- Event notifications

### 🏢 Organizers

- Organizer dashboard
- Create and manage events
- Multi-step event creation
- Manage event categories and registrations
- View participant information
- Registration analytics
- Payment analytics
- QR code participant check-in
- Manage race checkpoints
- Publish live results
- Send event announcements
- Manage volunteers
- Event settings

### 🛡️ Admin

- Platform dashboard
- User management
- Organizer management
- Event approval system
- Payment monitoring
- Event moderation
- Platform analytics
- Reports and insights

---

## 🏃 Event Types

EventOS is designed to support multiple types of events:

- 🏃 Running & Marathons
- 🏋️ Fitness Competitions
- 🏏 Cricket Tournaments
- ⚽ Football Tournaments
- 🎓 College Events
- 🎉 Community Events
- 🎵 Entertainment Events

---

## 🏃 Running Event Features

Running events have specialized functionality including:

- Multiple race categories
- 5K / 10K / 21K / 42K
- Bib numbers
- Race checkpoints
- Split timings
- Finish times
- Pace calculation
- Participant rankings
- Live leaderboard
- Result tracking
- Digital certificates

---

## 🏏 Cricket Event Features

Cricket tournaments can include:

- Team registration
- Player management
- Match scheduling
- Fixtures
- Live scoring
- Points table
- Team statistics
- Player statistics
- Tournament leaderboard

---

## ⚡ Real-Time Features

EventOS uses real-time communication to provide live updates such as:

- Live race leaderboards
- Live results
- Participant check-ins
- Registration counters
- Organizer announcements
- Event status updates

---

## 🤖 AI-Powered Features

EventOS integrates Google's Gemini API to provide intelligent event assistance.

### Participant AI Assistant

Participants can ask questions about an event such as:

> "Where is the starting point?"

> "What time should I report?"

> "What is included in my registration?"

### Organizer AI Analyst

Organizers can use natural language to understand their event data.

For example:

> "How many participants have registered for the 10K?"

> "How much revenue has this event generated?"

> "How many participants have checked in?"

---

## 🗺️ Maps & Locations

Mapbox integration provides:

- Event locations
- Interactive maps
- Running routes
- Race checkpoints
- Route visualization
- Location selection for organizers

---

## 💳 Payments

EventOS integrates Razorpay for online event payments.

Supported functionality includes:

- Registration payments
- Secure checkout
- Payment verification
- Payment status tracking
- Registration confirmation

---

## 🎟️ Digital Tickets

After successful registration, participants receive a digital event ticket containing:

- Participant information
- Event information
- Registration ID
- QR code
- Category
- Bib number

The QR code can be scanned by organizers or volunteers during event check-in.

---

## 🏗️ Tech Stack

### Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS
- shadcn/ui

### Backend

- Next.js
- TypeScript
- Prisma
- MongoDB

### Authentication

- Auth.js / NextAuth

### Payments

- Razorpay

### Real-Time

- Pusher

### Maps

- Mapbox

### AI

- Google Gemini API

### Storage

- Cloud storage / object storage

### Deployment

- Vercel

---

## 🏛️ Architecture

```text
                    ┌─────────────────────┐
                    │      EventOS        │
                    │     Next.js App     │
                    └──────────┬──────────┘
                               │
              ┌────────────────┼────────────────┐
              │                │                │
              ▼                ▼                ▼
        ┌──────────┐     ┌───────────┐    ┌──────────┐
        │ MongoDB  │     │  Pusher   │    │ Razorpay │
        │          │     │ Realtime  │    │ Payments │
        └──────────┘     └───────────┘    └──────────┘
              │
              │
        ┌─────┴────────────────────────────┐
        │                                  │
        ▼                                  ▼
   ┌──────────┐                      ┌──────────┐
   │ Mapbox   │                      │ Gemini   │
   │  Maps    │                      │   AI     │
   └──────────┘                      └──────────┘
