import { format, subDays, subMonths } from "date-fns";

// Food Hub Brand Data
export const foodHubBrands = [
  {
    id: "dipndip",
    name: "DipnDip",
    dailyOrders: 247,
    change: 12.3,
    trend: "up" as const,
    color: "#8B5CF6", // Purple
    revenue: 18750,
    avgOrderValue: 75.91,
  },
  {
    id: "elestez",
    name: "Elestez",
    dailyOrders: 189,
    change: -3.2,
    trend: "down" as const,
    color: "#EF4444", // Red
    revenue: 14220,
    avgOrderValue: 75.24,
  },
  {
    id: "ellena",
    name: "Ellena",
    dailyOrders: 156,
    change: 8.7,
    trend: "up" as const,
    color: "#10B981", // Green
    revenue: 11700,
    avgOrderValue: 75.00,
  },
  {
    id: "procuts",
    name: "Procuts",
    dailyOrders: 134,
    change: 15.4,
    trend: "up" as const,
    color: "#F59E0B", // Amber
    revenue: 10050,
    avgOrderValue: 75.00,
  },
  {
    id: "elestez_uae",
    name: "Elestez UAE",
    dailyOrders: 98,
    change: 5.8,
    trend: "up" as const,
    color: "#3B82F6", // Blue
    revenue: 7350,
    avgOrderValue: 75.00,
  },
  {
    id: "dillydally",
    name: "dillydally",
    dailyOrders: 87,
    change: -1.4,
    trend: "down" as const,
    color: "#EC4899", // Pink
    revenue: 6525,
    avgOrderValue: 75.00,
  },
];

// Data Sources Configuration - Updated for Food Hub
export const dataSources = [
  { id: "all", name: "All Brands", description: "Combined view of all Food Hub brands" },
  { id: "pos", name: "POS Systems", description: "Point of sale and order data" },
  { id: "delivery", name: "Delivery Platforms", description: "Third-party delivery analytics" },
  { id: "kitchen", name: "Kitchen Management", description: "Operational and kitchen efficiency data" },
  { id: "inventory", name: "Inventory System", description: "Stock and supply chain data" },
  { id: "customer", name: "Customer Analytics", description: "Customer behavior and loyalty data" },
];

// Generate Food Hub time series data
export const generateFoodHubTimeSeriesData = (days: number, dataSource = "all") => {
  const data = [];
  const baseMultiplier = dataSource === "pos" ? 1.2 : dataSource === "delivery" ? 0.9 : 1;
  
  for (let i = days; i >= 0; i--) {
    const date = subDays(new Date(), i);
    const seasonalFactor = 1 + 0.2 * Math.sin((i / days) * 2 * Math.PI);
    const weekendFactor = [0, 6].includes(date.getDay()) ? 1.3 : 1; // Higher orders on weekends
    
    data.push({
      date: format(date, "MMM dd"),
      orders: Math.floor((Math.random() * 800 + 600) * baseMultiplier * seasonalFactor * weekendFactor),
      revenue: Math.floor((Math.random() * 60000 + 45000) * baseMultiplier * seasonalFactor * weekendFactor),
      customers: Math.floor((Math.random() * 500 + 300) * baseMultiplier * weekendFactor),
      avgOrderValue: 65 + Math.random() * 20,
      deliveryTime: 25 + Math.random() * 15,
      customerSatisfaction: Math.random() * 10 + 85,
    });
  }
  return data;
};

// Enhanced KPI Data for Food Hub
export const getKPIData = (dataSource = "all") => {
  const multiplier = dataSource === "pos" ? 1.2 : dataSource === "delivery" ? 0.8 : 1;
  
  return [
    {
      title: "Total Daily Orders",
      value: Math.floor(911 * multiplier), // Sum of all brand orders
      change: 8.2 + (dataSource === "pos" ? 3.1 : dataSource === "delivery" ? -2.1 : 0),
      trend: "up" as const,
      icon: "🍽️",
      period: "vs yesterday",
      dataSource,
    },
    {
      title: "Daily Revenue",
      value: Math.floor(68295 * multiplier),
      change: 12.5,
      trend: "up" as const,
      icon: "💰",
      period: "vs yesterday",
      isCurrency: true,
      dataSource,
    },
    {
      title: "Average Order Value",
      value: 75.0 + (dataSource === "pos" ? 5.2 : 0),
      change: 4.3,
      trend: "up" as const,
      icon: "📊",
      period: "vs last week",
      isCurrency: true,
      dataSource,
    },
    {
      title: "Customer Satisfaction",
      value: 4.7,
      change: 0.2,
      trend: "up" as const,
      icon: "⭐",
      period: "vs last week",
      isRating: true,
      maxRating: 5,
      dataSource,
    },
  ];
};

// Financial Performance Data
export const financialMetrics = {
  quarterly: [
    { quarter: "Q1 2024", revenue: 6200000, profit: 1240000, margin: 20.0, growth: 12.5 },
    { quarter: "Q2 2024", revenue: 6800000, profit: 1360000, margin: 20.0, growth: 15.2 },
    { quarter: "Q3 2024", revenue: 7100000, profit: 1420000, margin: 20.0, growth: 18.7 },
    { quarter: "Q4 2024", revenue: 7850000, profit: 1570000, margin: 20.0, growth: 22.1 },
  ],
  monthly: generateFoodHubTimeSeriesData(12).map((item, index) => ({
    month: format(subMonths(new Date(), 11 - index), "MMM"),
    revenue: item.revenue * 30,
    profit: item.revenue * 30,
    customers: item.customers * 15,
    orders: item.orders * 20,
  })),
};

// Customer Analytics
export const customerAnalytics = {
  segments: [
    { segment: "Enterprise", customers: 145, revenue: 8500000, avgDeal: 58620, retention: 94.2, color: "#3B82F6" },
    { segment: "Mid-Market", customers: 387, revenue: 7200000, avgDeal: 18605, retention: 87.5, color: "#10B981" },
    { segment: "Small Business", customers: 1240, revenue: 4800000, avgDeal: 3871, retention: 78.3, color: "#F59E0B" },
    { segment: "Startup", customers: 2890, revenue: 2100000, avgDeal: 727, retention: 65.7, color: "#EF4444" },
  ],
  lifecycle: [
    { stage: "Leads", count: 15420, conversion: 8.5, cost: 45 },
    { stage: "Qualified", count: 1310, conversion: 35.2, cost: 180 },
    { stage: "Opportunity", count: 461, conversion: 68.5, cost: 520 },
    { stage: "Customers", count: 316, conversion: 100, cost: 1250 },
  ],
  churn: [
    { month: "Jan", churn: 3.2, newCustomers: 145, netGrowth: 4.8 },
    { month: "Feb", churn: 2.8, newCustomers: 167, netGrowth: 5.9 },
    { month: "Mar", churn: 3.5, newCustomers: 134, netGrowth: 3.7 },
    { month: "Apr", churn: 2.9, newCustomers: 189, netGrowth: 6.8 },
    { month: "May", churn: 3.1, newCustomers: 156, netGrowth: 5.2 },
    { month: "Jun", churn: 2.6, newCustomers: 198, netGrowth: 7.1 },
  ],
};

// Sales Performance
export const salesMetrics = {
  team: [
    { rep: "Sarah Johnson", deals: 45, revenue: 2340000, quota: 2000000, achievement: 117.0, avgDeal: 52000 },
    { rep: "Michael Chen", deals: 38, revenue: 1980000, quota: 1800000, achievement: 110.0, avgDeal: 52105 },
    { rep: "Emily Rodriguez", deals: 52, revenue: 1750000, quota: 1600000, achievement: 109.4, avgDeal: 33654 },
    { rep: "David Kim", deals: 29, revenue: 1620000, quota: 1500000, achievement: 108.0, avgDeal: 55862 },
    { rep: "Lisa Thompson", deals: 41, revenue: 1450000, quota: 1400000, achievement: 103.6, avgDeal: 35366 },
  ],
  pipeline: [
    { stage: "Prospecting", deals: 234, value: 12500000, probability: 10, weightedValue: 1250000 },
    { stage: "Qualification", deals: 156, value: 8900000, probability: 25, weightedValue: 2225000 },
    { stage: "Proposal", deals: 89, value: 6200000, probability: 50, weightedValue: 3100000 },
    { stage: "Negotiation", deals: 34, value: 3800000, probability: 75, weightedValue: 2850000 },
    { stage: "Closed Won", deals: 28, value: 2100000, probability: 100, weightedValue: 2100000 },
  ],
};

// Operational Metrics
export const operationalMetrics = {
  productivity: [
    { department: "Sales", efficiency: 87.5, target: 85, employees: 24, output: 210 },
    { department: "Marketing", efficiency: 92.1, target: 88, employees: 18, output: 165 },
    { department: "Engineering", efficiency: 89.3, target: 90, employees: 45, output: 402 },
    { department: "Customer Success", efficiency: 94.2, target: 92, employees: 12, output: 113 },
    { department: "Operations", efficiency: 86.7, target: 85, employees: 15, output: 130 },
  ],
  costs: [
    { category: "Personnel", amount: 1240000, percentage: 45.2, trend: "up", change: 8.5 },
    { category: "Technology", amount: 680000, percentage: 24.8, trend: "up", change: 12.3 },
    { category: "Marketing", amount: 520000, percentage: 19.0, trend: "down", change: -5.2 },
    { category: "Facilities", amount: 180000, percentage: 6.6, trend: "stable", change: 1.1 },
    { category: "Other", amount: 120000, percentage: 4.4, trend: "down", change: -2.8 },
  ],
};

// Market Intelligence
export const marketData = {
  competitors: [
    { company: "CompetitorA", marketShare: 28.5, revenue: 450000000, growth: 15.2, employees: 2400 },
    { company: "Our Company", marketShare: 18.7, revenue: 285000000, growth: 22.1, employees: 1200 },
    { company: "CompetitorB", marketShare: 16.3, revenue: 248000000, growth: 8.9, employees: 1800 },
    { company: "CompetitorC", marketShare: 12.1, revenue: 184000000, growth: 12.7, employees: 950 },
    { company: "Others", marketShare: 24.4, revenue: 371000000, growth: 10.5, employees: 3200 },
  ],
  trends: [
    { trend: "AI/ML Adoption", impact: "High", timeline: "6-12 months", probability: 85 },
    { trend: "Remote Work Tools", impact: "Medium", timeline: "3-6 months", probability: 92 },
    { trend: "Sustainability Focus", impact: "High", timeline: "12-18 months", probability: 78 },
    { trend: "Data Privacy Regulations", impact: "Medium", timeline: "6-9 months", probability: 88 },
  ],
};

// Risk Assessment
export const riskAssessment = [
  { 
    category: "Financial", 
    risk: "Currency Exchange Rate Volatility", 
    probability: "Medium", 
    impact: "High", 
    score: 7.2,
    mitigation: "Hedge 70% of foreign currency exposure",
    owner: "CFO"
  },
  { 
    category: "Operational", 
    risk: "Key Supplier Dependency", 
    probability: "Low", 
    impact: "High", 
    score: 5.8,
    mitigation: "Diversify supplier base by Q2",
    owner: "COO"
  },
  { 
    category: "Technology", 
    risk: "Cybersecurity Breach", 
    probability: "Medium", 
    impact: "Very High", 
    score: 8.5,
    mitigation: "Enhanced security protocols and training",
    owner: "CTO"
  },
  { 
    category: "Market", 
    risk: "New Competitor Entry", 
    probability: "High", 
    impact: "Medium", 
    score: 6.9,
    mitigation: "Accelerate product development",
    owner: "CEO"
  },
  { 
    category: "Regulatory", 
    risk: "Data Privacy Compliance", 
    probability: "Medium", 
    impact: "Medium", 
    score: 5.5,
    mitigation: "Legal review and system updates",
    owner: "Legal"
  },
];

// Executive Reports Data
export const executiveReports = [
  {
    id: "monthly-board",
    title: "Monthly Board Report",
    description: "Comprehensive monthly performance overview for board members",
    lastGenerated: "2024-01-15",
    frequency: "Monthly",
    recipients: ["Board Members", "C-Suite"],
    status: "Published",
    keyMetrics: ["Revenue", "Profit", "Customer Growth", "Market Share"],
  },
  {
    id: "quarterly-investor",
    title: "Quarterly Investor Update",
    description: "Detailed financial and strategic update for investors",
    lastGenerated: "2024-01-01",
    frequency: "Quarterly",
    recipients: ["Investors", "Analysts"],
    status: "Draft",
    keyMetrics: ["Financial Performance", "Strategic Initiatives", "Market Position"],
  },
  {
    id: "weekly-executive",
    title: "Weekly Executive Summary",
    description: "Key performance indicators and alerts for executive team",
    lastGenerated: "2024-01-22",
    frequency: "Weekly",
    recipients: ["C-Suite", "VPs"],
    status: "Published",
    keyMetrics: ["KPIs", "Risks", "Opportunities", "Action Items"],
  },
];

// Export the original data with new names for backward compatibility
export const kpiData = getKPIData();
export const revenueData = generateFoodHubTimeSeriesData(30);
export const companyPerformance = salesMetrics.team.map(rep => ({
  name: rep.rep,
  revenue: rep.revenue,
  growth: rep.achievement - 100,
  employees: Math.floor(Math.random() * 50) + 20,
}));

export const industryDistribution = customerAnalytics.segments.map(segment => ({
  industry: segment.segment,
  companies: Math.floor(segment.customers / 10),
  revenue: segment.revenue,
  percentage: (segment.revenue / 23400000) * 100,
  color: segment.color,
}));

const sectors = ["Enterprise Software", "Data Analytics", "AI/ML", "Cloud Services", "Cybersecurity"];

export const topCompanies = salesMetrics.team.map((rep, index) => ({
  name: rep.rep.replace(/\s+/g, ' '),
  revenue: rep.revenue,
  growth: rep.achievement - 100,
  employees: Math.floor(Math.random() * 50) + 20,
  industry: sectors[index % sectors.length]!,
}));

export const executiveAlerts = [
  {
    id: 1,
    type: "opportunity" as const,
    description: "Q4 revenue exceeded targets by 22.1%",
    amount: 1850000,
    time: "2 hours ago",
    status: "success" as const,
    priority: "high" as const,
  },
  {
    id: 2,
    type: "risk" as const,
    description: "Customer churn rate increased to 3.5% in March",
    time: "4 hours ago",
    status: "warning" as const,
    priority: "high" as const,
  },
  {
    id: 3,
    type: "milestone" as const,
    description: "Reached 10,000 active customers milestone",
    time: "1 day ago",
    status: "success" as const,
    priority: "medium" as const,
  },
  {
    id: 4,
    type: "market" as const,
    description: "AI/ML market showing 85% adoption probability",
    time: "2 days ago",
    status: "info" as const,
    priority: "medium" as const,
  },
  {
    id: 5,
    type: "compliance" as const,
    description: "Data privacy compliance review completed",
    time: "3 days ago",
    status: "info" as const,
    priority: "low" as const,
  },
];

export const performanceMetrics = [
  { metric: "Customer Satisfaction", value: "94.2%", target: "> 90%", status: "excellent" },
  { metric: "Employee Retention", value: "96.8%", target: "> 95%", status: "excellent" },
  { metric: "Gross Margin", value: "68.5%", target: "> 65%", status: "excellent" },
  { metric: "Sales Cycle Length", value: "45 days", target: "< 60 days", status: "good" },
  { metric: "Lead Conversion", value: "8.5%", target: "> 7%", status: "excellent" },
  { metric: "Market Share", value: "18.7%", target: "> 15%", status: "excellent" },
]; 