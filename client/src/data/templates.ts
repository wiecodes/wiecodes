
export interface Template {
  id: number;
  title: string;
  category: string;
  price: string;
  rating: number;
  downloads: string;
  preview: string;
  tags: string[];
  framework: string;
  theme: string;
  platform: string;
  description?: string;
  features?: string[];
  techStack?: string[];
  liveDemoUrl?: string;
  codePreview?: string;
}

export const templates: Template[] = [
  {
    id: 1,
    title: "E-commerce Dashboard",
    category: "E-commerce",
    price: "₹3,999",
    rating: 4.9,
    downloads: "2.1k",
    preview: "/placeholder.svg",
    tags: ["React", "TypeScript", "Tailwind"],
    framework: "React",
    theme: "Dark",
    platform: "Web",
    description: "A comprehensive e-commerce dashboard built with React, TypeScript, and Tailwind CSS. Features include product management, order tracking, analytics, and customer management with a modern dark theme.",
    features: [
      "Modern React 18 with TypeScript",
      "Responsive design with Tailwind CSS", 
      "Dark theme with premium styling",
      "Real-time analytics dashboard",
      "Product management system",
      "Order tracking and management",
      "Customer database",
      "Payment integration ready"
    ],
    techStack: ["React", "TypeScript", "Tailwind CSS", "Chart.js", "React Router"],
    liveDemoUrl: "#",
    codePreview: `import React from 'react';
import Dashboard from './components/Dashboard';

const App = () => {
  return (
    <div className="app">
      <Dashboard />
    </div>
  );
};`
  },
  {
    id: 2,
    title: "SaaS Landing Page",
    category: "Landing Page",
    price: "₹2,999",
    rating: 4.8,
    downloads: "1.8k",
    preview: "/placeholder.svg",
    tags: ["Next.js", "Framer Motion", "CSS"],
    framework: "Next.js",
    theme: "Light",
    platform: "Web",
    description: "Beautiful SaaS landing page with smooth animations and modern design. Built with Next.js and Framer Motion for optimal performance and user experience.",
    features: [
      "Next.js 13+ with App Router",
      "Framer Motion animations",
      "Responsive design",
      "SEO optimized",
      "Contact forms",
      "Pricing sections",
      "Modern light theme",
      "Fast loading"
    ],
    techStack: ["Next.js", "Framer Motion", "Tailwind CSS", "TypeScript"],
    liveDemoUrl: "#",
    codePreview: `import { motion } from 'framer-motion';

const Hero = () => {
  return (
    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
      <h1>Welcome to SaaS</h1>
    </motion.div>
  );
};`
  },
  {
    id: 3,
    title: "Admin Panel Pro",
    category: "Dashboard",
    price: "₹4,999",
    rating: 4.9,
    downloads: "1.5k",
    preview: "/placeholder.svg",
    tags: ["Vue.js", "Vuetify", "Charts"],
    framework: "Vue",
    theme: "Dark",
    platform: "Web",
    description: "A powerful admin panel built with Vue.js and Vuetify. Features include analytics charts, user management, and a dark-themed UI for modern applications.",
    features: [
      "Vue.js 3 support",
      "Vuetify UI components",
      "Dark mode design",
      "User and role management",
      "Charts and analytics",
      "Sidebar navigation",
      "Responsive layout",
      "Ready-to-integrate backend API hooks"
    ],
    techStack: ["Vue.js", "Vuetify", "Chart.js"],
    liveDemoUrl: "#",
    codePreview: `<template>
  <v-app>
    <AdminDashboard />
  </v-app>
</template>`
  },
  {
    id: 4,
    title: "Portfolio Website",
    category: "Portfolio",
    price: "Free",
    rating: 4.7,
    downloads: "3.2k",
    preview: "/placeholder.svg",
    tags: ["HTML", "CSS", "JavaScript"],
    framework: "HTML",
    theme: "Light",
    platform: "Web",
    description: "Clean and modern portfolio website template built with vanilla HTML, CSS, and JavaScript — perfect for developers and designers.",
    features: [
      "Responsive layout",
      "Smooth scroll",
      "Contact form integration",
      "Project showcase section",
      "Customizable design",
      "Mobile-friendly",
      "Light theme",
      "SEO basic structure"
    ],
    techStack: ["HTML5", "CSS3", "JavaScript"],
    liveDemoUrl: "#",
    codePreview: `<!DOCTYPE html>
<html>
<head>
  <title>Portfolio</title>
</head>
<body>
  <header>Portfolio</header>
</body>
</html>`
  },
  {
    id: 5,
    title: "Social Media App",
    category: "Social Media",
    price: "₹5,999",
    rating: 4.8,
    downloads: "1.2k",
    preview: "/placeholder.svg",
    tags: ["React Native", "Mobile", "Social"],
    framework: "React Native",
    theme: "Dark",
    platform: "Mobile",
    description: "A social media mobile app built with React Native featuring posts, likes, comments, and real-time chat functionality.",
    features: [
      "User authentication",
      "Post and feed system",
      "Likes & comments",
      "Chat with Socket.io",
      "Dark mobile UI",
      "Push notifications",
      "Media upload",
      "Real-time updates"
    ],
    techStack: ["React Native", "Expo", "Firebase", "Socket.io"],
    liveDemoUrl: "#",
    codePreview: `import React from 'react';
import { View, Text } from 'react-native';

export default function App() {
  return (
    <View>
      <Text>Welcome to Social App</Text>
    </View>
  );
}`
  },
  {
    id: 6,
    title: "Food Delivery App",
    category: "Delivery",
    price: "₹4,499",
    rating: 4.6,
    downloads: "980",
    preview: "/placeholder.svg",
    tags: ["Flutter", "Mobile", "Delivery"],
    framework: "Flutter",
    theme: "Light",
    platform: "Mobile",
    description: "A modern food delivery mobile app built with Flutter, featuring a user-friendly UI, order tracking, and restaurant listings.",
    features: [
      "Restaurant listings",
      "Order placement",
      "Cart system",
      "Live order tracking",
      "Google Maps integration",
      "Payment integration ready",
      "Push notifications",
      "Light theme UI"
    ],
    techStack: ["Flutter", "Dart", "Firebase"],
    liveDemoUrl: "#",
    codePreview: `import 'package:flutter/material.dart';

void main() => runApp(MyApp());

class MyApp extends StatelessWidget {
  @override
  Widget build(BuildContext context) {
    return MaterialApp(home: Text('Food Delivery App'));
  }
}`
  },
  {
    id: 7,
    title: "CRM Dashboard",
    category: "CRM",
    price: "Free",
    rating: 4.7,
    downloads: "1.4k",
    preview: "/placeholder.svg",
    tags: ["Angular", "Dashboard", "CRM"],
    framework: "Angular",
    theme: "Dark",
    platform: "Web",
    description: "A CRM dashboard built with Angular for managing leads, customers, tasks, and communication records efficiently.",
    features: [
      "Lead tracking",
      "Customer profiles",
      "Sales pipeline view",
      "Task management",
      "Activity logs",
      "Dark theme layout",
      "Modular components",
      "Mobile responsive"
    ],
    techStack: ["Angular", "TypeScript", "Bootstrap", "RxJS"],
    liveDemoUrl: "#",
    codePreview: `<div class="dashboard">
  <h1>CRM Dashboard</h1>
</div>`
  },
  {
    id: 8,
    title: "Crypto Trading Platform",
    category: "Trading",
    price: "₹6,999",
    rating: 4.9,
    downloads: "890",
    preview: "/placeholder.svg",
    tags: ["React", "Trading", "Crypto"],
    framework: "React",
    theme: "Dark",
    platform: "Web",
    description: "Advanced crypto trading platform template built with React. Features real-time charting, portfolio tracking, and dark mode UI.",
    features: [
      "Live price charts",
      "Portfolio tracking",
      "Trading interface",
      "Authentication system",
      "Responsive layout",
      "Dark UI theme",
      "Wallet integration ready",
      "Secure architecture"
    ],
    techStack: ["React", "Chart.js", "WebSockets", "Tailwind CSS"],
    liveDemoUrl: "#",
    codePreview: `import React from 'react';

function TradingApp() {
  return <div>Crypto Trading Dashboard</div>;
}

export default TradingApp;`
  },
  {
    id: 9,
    title: "Blog Platform",
    category: "Blog",
    price: "Free",
    rating: 4.5,
    downloads: "2.5k",
    preview: "/placeholder.svg",
    tags: ["WordPress", "PHP", "MySQL"],
    framework: "WordPress",
    theme: "Light",
    platform: "Web",
    description: "A fully-featured blog platform using WordPress — includes categories, tags, comments, and responsive design.",
    features: [
      "Post management",
      "Category/tag filters",
      "Responsive theme",
      "Comment system",
      "SEO-friendly structure",
      "Admin panel",
      "Light mode theme",
      "Plugin support"
    ],
    techStack: ["WordPress", "PHP", "MySQL"],
    liveDemoUrl: "#",
    codePreview: `<?php
echo "Welcome to your blog!";
?>`
  },
  {
    id: 10,
    title: "Chat Application",
    category: "Communication",
    price: "₹3,999",
    rating: 4.8,
    downloads: "1.7k",
    preview: "/placeholder.svg",
    tags: ["React", "Socket.io", "Node.js"],
    framework: "React",
    theme: "Dark",
    platform: "Web",
    description: "Real-time chat application using React and Socket.io. Includes private rooms, typing indicators, and clean dark UI.",
    features: [
      "Live messaging",
      "Private chat rooms",
      "Typing indicator",
      "Responsive chat UI",
      "Dark theme",
      "Socket.io integration",
      "User login",
      "Message history"
    ],
    techStack: ["React", "Node.js", "Socket.io", "Express"],
    liveDemoUrl: "#",
    codePreview: `import React from 'react';

function ChatApp() {
  return <div>Start chatting...</div>;
}

export default ChatApp;`
  },
  {
    id: 11,
    title: "Fitness Tracker App",
    category: "Health",
    price: "₹4,999",
    rating: 4.7,
    downloads: "1.3k",
    preview: "/placeholder.svg",
    tags: ["React Native", "Health", "Fitness"],
    framework: "React Native",
    theme: "Light",
    platform: "Mobile",
    description: "A fitness tracking app built with React Native — monitor workouts, steps, and calories with a clean mobile UI.",
    features: [
      "Workout logging",
      "Step counter",
      "Calories burned tracker",
      "Light theme mobile UI",
      "Goal setting",
      "Progress charts",
      "Push notifications",
      "Login system"
    ],
    techStack: ["React Native", "Expo", "Firebase"],
    liveDemoUrl: "#",
    codePreview: `import React from 'react';
import { View, Text } from 'react-native';

const App = () => (
  <View><Text>Fitness Tracker</Text></View>
);

export default App;`
  },
  {
    id: 12,
    title: "Invoice Generator",
    category: "Business",
    price: "Free",
    rating: 4.6,
    downloads: "2.0k",
    preview: "/placeholder.svg",
    tags: ["Vue", "PDF", "Business"],
    framework: "Vue",
    theme: "Light",
    platform: "Web",
    description: "A clean invoice generation tool using Vue — supports PDF exports, itemized billing, and client info management.",
    features: [
      "Invoice form builder",
      "Client management",
      "Export to PDF",
      "Responsive layout",
      "Editable line items",
      "Light UI design",
      "Custom branding",
      "Print-ready formatting"
    ],
    techStack: ["Vue", "JavaScript", "PDFMake"],
    liveDemoUrl: "#",
    codePreview: `<template>
  <div class="invoice">
    <h1>Create Invoice</h1>
  </div>
</template>`
  }
];


export const getFreeTemplates = () => templates.filter(template => template.price === "Free");
export const getTemplateById = (id: number) => templates.find(template => template.id === id);
export const getFeaturedTemplates = () => templates.slice(0, 4);
