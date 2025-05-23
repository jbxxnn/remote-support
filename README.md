# VPS Dashboard

A white-label VPS-based dashboard system for monitoring and responding to client-home events. Each client gets their own isolated VPS instance, ensuring complete data separation and security.

## Architecture Overview

### White Label VPS Architecture
- One client = One VPS instance
- Docker containerization for easy deployment
- Complete data isolation between customers
- Independent scaling per customer

### Core Components
1. **Staff Dashboard**
   - Real-time monitoring of client events
   - AI-verified and sensor-triggered alerts
   - Video clip playback
   - Two-way communication (Google Meet)
   - Action logging
   - Client status monitoring

2. **Admin Dashboard**
   - Client management
   - Device configuration
   - SOP (Standard Operating Procedure) management
   - Billing and reporting
   - User/station management

### Integration Points
- ZoneMinder (Motion detection)
- AI Server (Fall detection)
- Home Assistant (Door sensor events)
- Google Meet (Video calls)
- Webhook system for event processing

## Tech Stack

### Frontend
- Next.js 15.1.8
- TypeScript
- Tailwind CSS
- React Query
- Socket.io-client
- React Hook Form
- Zod

### Backend
- Next.js API Routes
- Prisma (ORM)
- PostgreSQL
- Redis
- Socket.io
- NextAuth.js

### Infrastructure
- Docker
- VPS
- Nginx
- PM2

## Getting Started

### Prerequisites
- Node.js (Latest LTS version)
- Docker
- PostgreSQL
- Redis

### Installation

1. Clone the repository:
```bash
git clone [repository-url]
cd vps-dashboard
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```
Edit `.env` with your configuration.

4. Initialize the database:
```bash
npx prisma migrate dev
```

5. Start the development server:
```bash
npm run dev
```

## Development

### Project Structure
```
src/
├── app/              # Next.js app directory
├── components/       # React components
├── lib/             # Utility functions
├── prisma/          # Database schema
└── types/           # TypeScript types
```

### Key Features
- Real-time event monitoring
- Video integration
- Two-way communication
- Action logging
- Billing compliance
- SOP management
- Station tracking

### Authentication
- NextAuth.js for authentication
- Role-based access control
- Session management
- Secure API routes

### Real-time Features
- WebSocket integration
- Event broadcasting
- Real-time notifications
- Connection management

## Deployment

### VPS Setup
1. Provision a new VPS
2. Install Docker and Docker Compose
3. Configure environment variables
4. Deploy using Docker Compose

### Docker Configuration
- Each client gets their own container
- Isolated network per client
- Persistent volume management
- Automated backups

## Security

### Data Isolation
- Per-client VPS instances
- Isolated databases
- Secure communication channels
- Regular security audits

### Authentication & Authorization
- Role-based access control
- Session management
- API security
- Rate limiting

## Monitoring & Maintenance

### System Monitoring
- Performance metrics
- Error tracking
- Resource usage
- Security monitoring

### Backup & Recovery
- Automated backups
- Disaster recovery plans
- Data retention policies
- System health checks

## Contributing

Please read [CONTRIBUTING.md](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Support

For support, please contact [support-email]
#   r e m o t e - s u p p o r t  
 