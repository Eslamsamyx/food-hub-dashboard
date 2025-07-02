#!/usr/bin/env node

/**
 * Environment Validation Script
 * 
 * This script validates your environment variables and provides helpful
 * error messages and suggestions for fixing common issues.
 */

import { createEnv } from "@t3-oss/env-nextjs";
import { existsSync, readFileSync } from "fs";
import { join } from "path";
import { z } from "zod";

console.log("🔍 Validating environment variables...\n");

// Check if .env.local exists
const envLocalPath = join(process.cwd(), ".env.local");
if (!existsSync(envLocalPath)) {
  console.error("❌ .env.local file not found!");
  console.log("💡 Create it by copying .env.example:");
  console.log("   cp .env.example .env.local\n");
  process.exit(1);
}

// Load environment variables
try {
  const envContent = readFileSync(envLocalPath, "utf8");
  
  // Check for placeholder values
  const placeholders = [
    "your-auth-secret-here",
    "your-discord-client-id", 
    "your-discord-client-secret",
    "username:password@localhost"
  ];
  
  const foundPlaceholders = placeholders.filter(placeholder => 
    envContent.includes(placeholder)
  );
  
  if (foundPlaceholders.length > 0) {
    console.warn("⚠️  Found placeholder values in .env.local:");
    foundPlaceholders.forEach(placeholder => {
      console.log(`   - ${placeholder}`);
    });
    console.log("\n💡 Please replace these with your actual values.\n");
  }
  
} catch (error) {
  const errorMessage = error instanceof Error ? error.message : String(error);
  console.error("❌ Error reading .env.local:", errorMessage);
  process.exit(1);
}

// Validate using the same schema as the app
try {
  const env = createEnv({
    server: {
      AUTH_SECRET:
        process.env.NODE_ENV === "production"
          ? z.string().min(1, "AUTH_SECRET is required in production")
          : z.string().optional(),
      AUTH_DISCORD_ID: z.string().min(1, "AUTH_DISCORD_ID is required"),
      AUTH_DISCORD_SECRET: z.string().min(1, "AUTH_DISCORD_SECRET is required"),
      DATABASE_URL: z
        .string()
        .url("DATABASE_URL must be a valid URL")
        .refine(
          (url) => !url.includes("your-database-url-here"),
          "Please replace the placeholder DATABASE_URL with your actual database URL"
        ),
      NODE_ENV: z
        .enum(["development", "test", "production"])
        .default("development"),
    },
    client: {},
    runtimeEnv: {
      AUTH_SECRET: process.env.AUTH_SECRET,
      AUTH_DISCORD_ID: process.env.AUTH_DISCORD_ID,
      AUTH_DISCORD_SECRET: process.env.AUTH_DISCORD_SECRET,
      DATABASE_URL: process.env.DATABASE_URL,
      NODE_ENV: process.env.NODE_ENV,
    },
    skipValidation: !!process.env.SKIP_ENV_VALIDATION,
    emptyStringAsUndefined: true,
  });
  
  console.log("✅ Environment variables are valid!");
  console.log("\n📋 Current configuration:");
  console.log(`   NODE_ENV: ${env.NODE_ENV}`);
  console.log(`   DATABASE_URL: ${env.DATABASE_URL.replace(/:[^:@]*@/, ':***@')}`);
  console.log(`   AUTH_SECRET: ${env.AUTH_SECRET ? '✅ Set' : '❌ Not set'}`);
  console.log(`   AUTH_DISCORD_ID: ${env.AUTH_DISCORD_ID ? '✅ Set' : '❌ Not set'}`);
  console.log(`   AUTH_DISCORD_SECRET: ${env.AUTH_DISCORD_SECRET ? '✅ Set' : '❌ Not set'}`);
  
  console.log("\n🎉 Your environment is ready for development!");
  
} catch (error) {
  console.error("❌ Environment validation failed:");
  
  // Type guard for ZodError-like objects
  if (error && typeof error === 'object' && 'issues' in error && Array.isArray(error.issues)) {
    error.issues.forEach((issue) => {
      if (issue && typeof issue === 'object' && 'path' in issue && 'message' in issue) {
        const path = Array.isArray(issue.path) ? issue.path.join('.') : String(issue.path);
        console.log(`   - ${path}: ${issue.message}`);
      }
    });
  } else {
    const errorMessage = error instanceof Error ? error.message : String(error);
    console.log(`   ${errorMessage}`);
  }
  
  console.log("\n💡 Common fixes:");
  console.log("   1. Copy .env.example to .env.local: cp .env.example .env.local");
  console.log("   2. Replace placeholder values with real ones");
  console.log("   3. Generate AUTH_SECRET: openssl rand -base64 32");
  console.log("   4. Create Discord app: https://discord.com/developers/applications");
  console.log("   5. Set up your database connection");
  
  process.exit(1);
} 