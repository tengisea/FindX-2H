# FindX Olympiad System 🏆

A comprehensive digital platform for managing mathematics olympiads and competitive programming tournaments in Mongolia. Built for hackathon judges to evaluate the system's functionality and features.

## 🎯 Project Overview

FindX is a full-stack web application that digitizes the traditional olympiad system, providing a modern platform for students and organizers to manage competitive mathematics events. The system supports multiple user roles with dedicated interfaces, comprehensive tournament management, and advanced ranking systems with medal-based point calculations.

## 🏗️ Architecture

### Tech Stack

- **Frontend**: Next.js 15, React 19, TypeScript, Tailwind CSS
- **Backend**: Node.js, Apollo GraphQL Server, MongoDB (Mongoose)
- **Real-time**: Socket.IO, LiveKit (for video calls)
- **AI Integration**: OpenAI API for task generation
- **UI Components**: Radix UI, Lucide React icons, Framer Motion
- **Styling**: Custom #FF8400 color scheme, responsive design
- **Animations**: Staggered menus, smooth transitions, interactive elements

### 🎓 Student Interface (`/student`)

- **Modern Staggered Menu**: Animated navigation with smooth transitions
- **Profile Management**: View personal information, scores, and achievements
- **Olympiad Registration**: Browse and register for available olympiads
- **Results & Performance**: Track scores, rankings, and progress with medal-based points
- **Achievements**: View earned badges and certificates with consistent card sizing
- **Mandat System**: Digital certificate generation and management
- **Responsive Design**: Optimized for all devices with clean white theme

### 🏢 Host Interface (`/host`)

- **Olympiad Creation**: Comprehensive form for creating new olympiads
- **Class Type Management**: Configure grade levels, questions, and scoring
- **Results Processing**: Process student answers and assign medals
- **Medal Preview**: Preview medal distribution before finalization
- **Email Notifications**: Automated email system for student notifications
- **Staggered Menu Navigation**: Modern animated interface

## 🚀 Key Features

### 1. Advanced Ranking & Scoring System

- **Medal-Based Points**: Gold (100%), Silver (80%), Bronze (60%), Top10 (40%) of base score
- **Automatic Point Assignment**: Students receive points when olympiads are finalized
- **Ranking History**: Complete audit trail of point changes with organizer tracking
- **Real-time Updates**: Live ranking updates with transaction safety
- **Context-Aware Processing**: Organizer attribution for all ranking changes

### 2. Comprehensive Olympiad Management

- **Multi-Grade Support**: Support for grades 1-12 and special classes (C, D, E, F)
- **Question Management**: Create and manage problem sets for each grade level
- **Room Assignment**: Automatic room allocation for participants
- **Status Workflow**: Draft → Open → Closed → Medals Preview → Finished
- **Invitation System**: Private olympiad invitations for qualified students

### 3. Tournament System

- **Bracket Management**: Single and double elimination tournaments
- **Live Updates**: Real-time match results and bracket progression
- **Video Integration**: LiveKit integration for remote competitions
- **Match Scheduling**: Automated scheduling with conflict detection

### 4. AI-Powered Task Generation

- **OpenAI Integration**: Automatic problem generation based on difficulty levels
- **Custom Prompts**: Tailored problem creation for different grade levels
- **Quality Control**: Built-in validation and review systems

### 5. Modern User Interface

- **Staggered Menu Navigation**: Smooth animated navigation with Framer Motion
- **Custom Color Scheme**: Consistent #FF8400 orange theme throughout
- **White Theme Design**: Clean, modern interface with excellent contrast
- **Responsive Cards**: Uniform sizing for achievement and content cards
- **Interactive Elements**: Hover effects, smooth transitions, and micro-animations

### 6. Real-time Features

- **Live Updates**: Socket.IO for real-time notifications
- **Tournament Brackets**: Live bracket updates during tournaments
- **Match Results**: Instant winner announcements and score updates
- **Alert System**: Toast notifications with white theme styling

## 🗄️ Database Schema

### Core Entities

- **Students**: Personal info, scores, participated olympiads, ranking history
- **Olympiads**: Competition details, status, organizer, class types
- **ClassTypes**: Grade-specific configurations, questions, participants
- **Organizers**: Host organizations with olympiad management
- **StudentAnswers**: Individual responses and scoring
- **Questions**: Problem sets with scoring criteria
- **ClassRooms**: Physical/virtual room assignments

### Key Relationships

- Students participate in multiple Olympiads
- Olympiads contain multiple ClassTypes (grades)
- ClassTypes have multiple Questions and Participants
- Organizers create and manage Olympiads
- StudentAnswers link Students to Questions with scores

## 🎮 Demo Scenarios

### For Students:

1. **Navigate to `/student`** - View personal dashboard with staggered menu
2. **Browse Olympiads** - Search and filter available competitions
3. **Register for Olympiad** - Select grade level and complete registration
4. **View Results** - Check scores, rankings, and medal achievements
5. **Download Certificates** - Generate and download achievement certificates
6. **Track Progress** - Monitor ranking history and point changes

### For Hosts:

1. **Navigate to `/host`** - Access host dashboard with staggered menu
2. **Create Olympiad** - Set up new competition with class types
3. **Add Questions** - Create problem sets for each grade
4. **Manage Events** - Edit, update, or delete olympiads
5. **Process Results** - Assign medals and finalize rankings
6. **Send Notifications** - Automated email system

## 🚀 Installation & Setup

### Prerequisites

- Node.js 18+ and npm
- MongoDB database
- OpenAI API key (for AI features)

### Environment Configuration

Create `.env.local` files in both `frontend/` and `backend/` directories:

```bash
# Backend (.env.local)
MONGODB_URI=mongodb://localhost:27017/findx
EMAIL_HOST=smtp.gmail.com
EMAIL_PORT=587
EMAIL_USER=your_email@gmail.com
EMAIL_PASS=your_app_password

# Frontend (.env.local)
NEXT_PUBLIC_GRAPHQL_URL=http://localhost:8000/api/graphql
```

### Installation Steps

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd FindX-2H
   ```

2. **Install dependencies**

   ```bash
   # Frontend
   cd frontend
   npm install

   # Backend
   cd ../backend
   npm install
   ```

3. **Environment Setup**

   ```bash
   # Backend environment variables
   cp backend/.env.example backend/.env.local
   # Edit backend/.env.local with your configuration

   # Frontend environment variables
   cp frontend/.env.example frontend/.env.local
   # Edit frontend/.env.local with your configuration
   ```

4. **Run the application**

   ```bash
   # Backend (GraphQL server)
   cd backend
   npm run dev

   # Frontend (Next.js app)
   cd frontend
   npm run dev
   ```

### Access Points

- **Landing Page**: `http://localhost:3000`
- **Student Interface**: `http://localhost:3000/student`
- **Host Interface**: `http://localhost:3000/host`
- **All Olympiads**: `http://localhost:3000/olympiads`
- **Student Rankings**: `http://localhost:3000/students-rankings`
- **GraphQL Playground**: `http://localhost:8000/api/graphql`

## 📊 System Statistics

The landing page displays real-time statistics:

- **Active Students**: Total registered students
- **Host Organizations**: Number of organizing institutions
- **Competitions Held**: Completed olympiads
- **Top Performer**: Highest-ranked student

## 🎨 Design System

### Color Palette

- **Primary Orange**: #FF8400 (buttons, accents, highlights)
- **Background**: White with subtle grid pattern
- **Text**: Black (#000000) for primary text
- **Gray Scale**: Various shades for secondary elements

### Typography

- **Primary Font**: Inter (modern, clean)
- **Display Font**: Libre Baskerville (elegant headings)
- **Accent Font**: Great Vibes (decorative elements)

### Components

- **Staggered Menus**: Animated navigation with smooth transitions
- **Cards**: Consistent sizing with hover effects
- **Buttons**: Orange theme with hover states
- **Forms**: Clean inputs with focus states
- **Modals**: Overlay dialogs with backdrop blur

## 🔧 Technical Features

### Backend Architecture

- **GraphQL API**: Type-safe queries and mutations
- **MongoDB**: Document-based data storage
- **Mongoose**: ODM with schema validation
- **Transaction Support**: ACID compliance for critical operations
- **Error Handling**: Comprehensive error management
- **Email Services**: Automated notification system

### Frontend Architecture

- **Next.js 15**: Latest React framework with App Router
- **TypeScript**: Full type safety
- **Apollo Client**: GraphQL state management
- **Framer Motion**: Advanced animations
- **Tailwind CSS**: Utility-first styling
- **Responsive Design**: Mobile-first approach

### Performance Optimizations

- **Code Splitting**: Automatic route-based splitting
- **Image Optimization**: Next.js Image component
- **Bundle Analysis**: Optimized build sizes
- **Caching**: Apollo Client cache management
- **Lazy Loading**: Component-level lazy loading

## 🚀 Recent Updates

### Ranking System Overhaul

- Implemented medal-based point calculation
- Added comprehensive ranking history tracking
- Enhanced transaction safety for point updates
- Improved organizer attribution system

### UI/UX Enhancements

- Implemented staggered menu navigation
- Standardized #FF8400 color scheme
- Added consistent card sizing
- Improved white theme design
- Enhanced responsive layouts

### Backend Improvements

- Centralized medal calculation logic
- Added email notification system
- Improved error handling and logging
- Enhanced database transaction support

## 🎯 Demo Data

The system includes sample data for demonstration:

- **Sample Students**: Pre-configured student profiles
- **Sample Olympiads**: Various competition examples
- **Sample Organizers**: Host organization data
- **Sample Results**: Medal distributions and rankings

## 📱 Mobile Responsiveness

- **Responsive Design**: Optimized for all screen sizes
- **Touch Interactions**: Mobile-friendly navigation
- **Adaptive Layouts**: Flexible grid systems
- **Performance**: Optimized for mobile devices

## 🔒 Security Features

- **Input Validation**: Comprehensive data validation
- **Error Handling**: Secure error messages
- **Database Security**: Mongoose schema validation
- **API Security**: GraphQL query validation

## 🎉 Conclusion

FindX represents a modern approach to olympiad management, combining advanced technology with user-friendly design. The system provides a complete solution for organizing, participating in, and managing competitive mathematics events with real-time updates, comprehensive tracking, and beautiful user interfaces.

**Built with ❤️ for the Pinequest Hackathon**
