# FindX Olympiad System 🏆

A comprehensive digital platform for managing mathematics olympiads and competitive programming tournaments in Mongolia. Built for hackathon judges to evaluate the system's functionality and features.

## 🎯 Project Overview

FindX is a full-stack web application that digitizes the traditional olympiad system, providing a modern platform for students, organizers, and administrators to manage competitive mathematics events. The system supports multiple user roles with dedicated interfaces and comprehensive tournament management.

## 🏗️ Architecture

### Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript, Tailwind CSS
- **Backend**: Node.js, Apollo GraphQL Server, MongoDB (Mongoose)
- **Real-time**: Socket.IO, LiveKit (for video calls)
- **AI Integration**: OpenAI API for task generation
- **UI Components**: Radix UI, Lucide React icons

### Project Structure

```
FindX-2H/
├── frontend/          # Next.js React application
├── backend/           # GraphQL API server
└── README.md         # This file
```

## 👥 User Roles & Access

The application has **no authentication system** - users access different interfaces through dedicated routes:

### 🎓 Student Interface (`/student`)

- **Profile Management**: View personal information, scores, and achievements
- **Olympiad Registration**: Browse and register for available olympiads
- **Tournament Participation**: Join tournaments and view brackets
- **Results & Performance**: Track scores, rankings, and progress
- **Achievements**: View earned badges and certificates

### 🏢 Host/Organizer Interface (`/host`)

- **Olympiad Creation**: Create new olympiad events with class types and questions
- **Event Management**: Edit, update, and delete olympiads
- **Class Type Configuration**: Set up grade levels, scoring, and questions
- **Question Management**: Add, edit, and organize olympiad questions

### 👨‍💼 Admin Interface (`/admin`)

- **Olympiad Approval**: Review and approve pending olympiad requests
- **Organizer Management**: Manage organizer accounts and permissions
- **Tournament Creation**: Create and manage competitive tournaments
- **System Oversight**: Monitor all system activities and data

## 🚀 Key Features

### 1. Olympiad Management System

- **Multi-grade Support**: Supports grades 1-12 with Mongolian class naming
- **Flexible Question Types**: Multiple choice, open-ended, and problem-solving questions
- **Scoring System**: Configurable point values and medal thresholds
- **Status Tracking**: PENDING → APPROVED workflow for olympiad approval

### 2. Tournament System

- **Bracket Generation**: Automatic tournament bracket creation
- **Match Management**: Real-time match updates and winner tracking
- **Pi Points System**: Gamified scoring system with point rewards
- **Results Generation**: Automatic ranking and award distribution

### 3. AI-Powered Task Generation

- **OpenAI Integration**: Generates competitive programming problems
- **Template Fallback**: 50+ pre-built problem templates across 8 topics
- **Multi-difficulty**: Easy, Medium, Hard problem generation
- **Topic Coverage**: Math, algorithms, data structures, English, and more

### 4. Real-time Features

- **Live Updates**: Socket.IO for real-time notifications
- **Tournament Brackets**: Live bracket updates during tournaments
- **Match Results**: Instant winner announcements and score updates

## 📱 User Interface Highlights

### Student Dashboard

- **Modern Design**: Clean, intuitive interface with gradient backgrounds
- **Responsive Layout**: Works on desktop, tablet, and mobile devices
- **Interactive Elements**: Hover effects, animations, and smooth transitions
- **Data Visualization**: Progress bars, statistics cards, and achievement displays

### Host Dashboard

- **Form Management**: Dynamic form creation for olympiad setup
- **Class Type Builder**: Visual interface for configuring grade levels
- **Question Editor**: Rich text editing for problem statements
- **Status Management**: Visual indicators for olympiad approval status

### Admin Dashboard

- **Approval Workflow**: Streamlined process for reviewing olympiad requests
- **Data Tables**: Sortable, filterable tables for managing large datasets
- **Modal Interfaces**: Quick actions without page navigation
- **Statistics Overview**: System-wide metrics and performance indicators

## 🎮 Demo Scenarios

### For Students:

1. **Navigate to `/student`** - View personal dashboard
2. **Browse Olympiads** - See available mathematics competitions
3. **Register for Events** - Select grade level and register
4. **View Tournaments** - Check tournament brackets and participate
5. **Track Progress** - Monitor scores, achievements, and rankings

### For Hosts/Organizers:

1. **Navigate to `/host`** - Access organizer dashboard
2. **Create Olympiad** - Set up new mathematics competition
3. **Configure Classes** - Define grade levels and scoring
4. **Add Questions** - Create problem sets for each grade
5. **Manage Events** - Edit, update, or delete olympiads

### For Administrators:

1. **Navigate to `/admin`** - Access admin control panel
2. **Review Pending** - Approve or reject olympiad requests
3. **Create Tournaments** - Set up competitive programming events
4. **Manage Organizers** - Oversee organizer accounts
5. **System Monitoring** - View system statistics and performance

## 🗄️ Database Schema

### Core Entities

- **Students**: Personal info, scores, participated olympiads
- **Organizers**: Organization details, created olympiads
- **Olympiads**: Event details, class types, questions, status
- **ClassTypes**: Grade levels, scoring, participants
- **Questions**: Problem statements, answers, difficulty levels
- **Tournaments**: Competitive events, brackets, matches
- **MatchRooms**: Individual matches, winners, scores
- **PiWards**: Tournament results, rankings, awards

### Key Relationships

- Organizers create Olympiads
- Olympiads contain multiple ClassTypes
- ClassTypes have Questions and Participants
- Students participate in Olympiads and Tournaments
- Tournaments generate MatchRooms and PiWards

## 🔧 Technical Implementation

### GraphQL API

- **Type-safe**: Full TypeScript integration with generated types
- **Real-time**: Subscriptions for live updates
- **Optimized**: Efficient queries with proper data fetching
- **Scalable**: Modular resolver structure

### Frontend Architecture

- **Component-based**: Reusable UI components
- **State Management**: React hooks and Apollo Client
- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Performance**: Optimized rendering and lazy loading

### AI Integration

- **Fallback System**: AI generation with template backup
- **Error Handling**: Graceful degradation when AI fails
- **Content Quality**: Curated templates ensure consistent quality
- **Scalability**: Easy to add new topics and difficulty levels

## 🎯 Hackathon Evaluation Points

### Innovation

- **AI-Powered Content**: Automated problem generation
- **Gamification**: Pi Points system for engagement
- **Real-time Features**: Live tournament updates
- **Multi-role System**: Comprehensive user management

### Technical Excellence

- **Modern Stack**: Latest React, Next.js, and TypeScript
- **Type Safety**: Full TypeScript coverage
- **Performance**: Optimized queries and rendering
- **Scalability**: Modular, maintainable codebase

### User Experience

- **Intuitive Design**: Clean, modern interface
- **Responsive**: Works across all devices
- **Accessibility**: Proper semantic HTML and ARIA labels
- **Performance**: Fast loading and smooth interactions

### Completeness

- **Full CRUD**: Complete data management
- **Real-time Updates**: Live notifications and updates
- **Error Handling**: Graceful error management
- **Data Validation**: Input validation and sanitization

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- MongoDB database
- OpenAI API key (optional, for AI features)


FindX Olympiad System represents a comprehensive solution for digitizing competitive mathematics education in Mongolia. The platform successfully combines modern web technologies with educational needs, providing a scalable, maintainable, and user-friendly system for managing olympiads and tournaments.

The system demonstrates strong technical implementation, innovative features, and excellent user experience design, making it a compelling solution for the hackathon evaluation.

---

**Built with ❤️ for the Pinequest **
