# Executive Analytics Dashboard

A comprehensive multi-company analytics dashboard designed to help CEOs and executives make informed strategic decisions based on portfolio performance data.

## 🎯 Purpose

This dashboard aggregates data from multiple companies within a portfolio, providing executives with:

- **Comprehensive Portfolio Overview**: Real-time insights across all portfolio companies
- **Strategic Decision Support**: KPI tracking and performance metrics for informed decision-making
- **Risk Management**: Early warning systems and compliance monitoring
- **Market Intelligence**: Industry trends and competitive analysis
- **Executive Alerts**: Priority-based notifications for critical business events

## 🚀 Features

### 📊 Executive KPIs

- **Total Portfolio Revenue**: Consolidated revenue across all companies
- **Active Companies**: Number of companies in the portfolio with growth metrics
- **Average Company Growth**: Portfolio-wide growth percentage
- **Portfolio Valuation**: Total estimated value of all holdings

### 📈 Data Visualizations

- **Revenue Trend Chart**: 30-day revenue performance across the portfolio
- **Industry Distribution**: Pie chart showing revenue distribution by industry sector
- **Company Performance**: Progress bars with growth indicators for each company
- **Top Performing Companies**: Detailed table with revenue, employees, and growth metrics

### 🚨 Executive Alerts

Priority-based notification system for:

- **Opportunities**: Companies exceeding targets, new funding rounds
- **Risks**: Declining margins, operational issues
- **Milestones**: Major achievements, strategic goals reached
- **Market Updates**: Industry trends, competitive intelligence
- **Compliance**: Regulatory updates, audit completions

### 🎛️ Performance Metrics

- **Portfolio Health**: ROI, retention rates, operational efficiency
- **Market Insights**: Sector growth, volatility indicators, investment opportunities
- **Strategic Goals**: Progress tracking for diversification, ESG compliance, digital transformation

## 🛠️ Technology Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Charts**: Recharts
- **Icons**: Heroicons
- **Authentication**: NextAuth.js
- **Database**: PostgreSQL with Prisma
- **API**: tRPC for type-safe APIs
- **Development**: ESLint, Prettier, Husky pre-commit hooks

## 🏗️ Architecture

### Component Structure

```
src/
├── components/
│   ├── ui/                    # Reusable UI components
│   │   └── card.tsx
│   └── dashboard/             # Dashboard-specific components
│       ├── dashboard-header.tsx
│       ├── kpi-card.tsx
│       ├── revenue-chart.tsx
│       ├── industry-distribution.tsx
│       ├── company-performance.tsx
│       ├── executive-alerts.tsx
│       └── top-companies.tsx
├── lib/
│   ├── utils.ts              # Utility functions
│   └── mock-data.ts          # Sample data for demonstration
└── app/
    └── page.tsx              # Main dashboard page
```

### Data Flow

1. **Data Sources**: Multiple company feeds (currently using mock data)
2. **Aggregation**: Portfolio-level calculations and insights
3. **Visualization**: Real-time charts and metrics
4. **Alerts**: Priority-based notification system
5. **Export**: Comprehensive reporting capabilities

## 🚀 Getting Started

### Prerequisites

- Node.js 18.17 or later
- PostgreSQL database
- Environment variables configured

### Installation

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd analytical-dashboard
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Set up environment variables**

   ```bash
   cp .env.example .env.local
   ```

   Configure the following variables:

   ```env
   # Database
   DATABASE_URL="postgresql://username:password@localhost:5432/analytics_db"

   # NextAuth.js
   NEXTAUTH_SECRET="your-secret-key"
   NEXTAUTH_URL="http://localhost:3000"

   # OAuth Providers (optional)
   DISCORD_CLIENT_ID="your-discord-client-id"
   DISCORD_CLIENT_SECRET="your-discord-client-secret"
   ```

4. **Set up the database**

   ```bash
   npm run db:push
   ```

5. **Start the development server**

   ```bash
   npm run dev
   ```

6. **Open the dashboard**
   Navigate to [http://localhost:3000](http://localhost:3000)

## 📊 Dashboard Components

### KPI Cards

- **Portfolio Revenue**: $28.5M with 12.5% growth
- **Active Companies**: 24 companies with 8.3% growth
- **Average Growth**: 15.8% across portfolio
- **Portfolio Valuation**: $450M with 18.7% growth

### Charts & Visualizations

- **Revenue Trend**: 30-day time series with interactive tooltips
- **Industry Distribution**: Interactive pie chart with revenue breakdown
- **Company Performance**: Progress bars with growth indicators
- **Executive Alerts**: Priority-based notification system

### Data Tables

- **Top Companies**: Revenue, employees, growth, and sector information
- **Performance Metrics**: Portfolio health indicators with status badges

## 🎨 UI/UX Features

### Design Principles

- **Executive-First**: Clean, professional interface designed for C-suite users
- **Data-Driven**: Focus on actionable insights and key metrics
- **Responsive**: Optimized for desktop, tablet, and mobile viewing
- **Accessible**: WCAG compliant with proper contrast and navigation

### Interactive Elements

- **Hover Effects**: Enhanced tooltips and data exploration
- **Status Indicators**: Color-coded metrics for quick assessment
- **Priority Badges**: Visual hierarchy for alert management
- **Progress Bars**: Visual representation of goal achievement

### Dark Mode Support

- Automatic system preference detection
- Manual toggle capability
- Consistent theming across all components

## 🔧 Development

### Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run type-check` - Run TypeScript checks
- `npm run db:push` - Push database schema
- `npm run db:studio` - Open Prisma Studio

### Code Quality

- **ESLint**: Comprehensive linting rules for TypeScript and React
- **Prettier**: Consistent code formatting
- **Husky**: Pre-commit hooks for quality assurance
- **TypeScript**: Full type safety across the application

## 📈 Future Enhancements

### Planned Features

- **Real-time Data Integration**: Connect to actual company data sources
- **Advanced Analytics**: Machine learning insights and predictive analytics
- **Custom Dashboards**: Personalized views for different executive roles
- **Export Capabilities**: PDF reports and data export functionality
- **Mobile App**: Native iOS/Android applications
- **API Integration**: RESTful APIs for third-party integrations

### Data Sources

- **Financial Systems**: ERP, accounting, and financial planning tools
- **CRM Platforms**: Customer data and sales metrics
- **HR Systems**: Employee data and organizational metrics
- **Market Data**: Industry benchmarks and competitive intelligence
- **Operational Systems**: Supply chain, inventory, and production data

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:

- Create an issue in the repository
- Contact the development team
- Review the documentation

---

**Built with ❤️ for executive decision-making**
