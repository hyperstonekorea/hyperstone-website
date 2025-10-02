export interface EnvConfig {
  required: string[];
  optional: string[];
}

export interface ValidationResult {
  valid: boolean;
  missing: string[];
  warnings: string[];
}

export function validateEnv(config: EnvConfig): ValidationResult {
  const missing: string[] = [];
  const warnings: string[] = [];

  // Check required environment variables
  for (const varName of config.required) {
    const value = process.env[varName];
    if (!value || value.trim() === '') {
      missing.push(varName);
    }
  }

  // Check optional environment variables
  for (const varName of config.optional) {
    const value = process.env[varName];
    if (!value || value.trim() === '') {
      warnings.push(`Optional environment variable ${varName} is not set`);
    }
  }

  const valid = missing.length === 0;

  if (!valid) {
    console.error('[ENV_VALIDATION] Missing required environment variables:', missing);
  }

  if (warnings.length > 0) {
    console.warn('[ENV_VALIDATION] Warnings:', warnings);
  }

  return {
    valid,
    missing,
    warnings,
  };
}

export function getEnvOrThrow(varName: string): string {
  const value = process.env[varName];
  if (!value || value.trim() === '') {
    throw new Error(`Required environment variable ${varName} is not set`);
  }
  return value;
}

export function getEnvOrDefault(varName: string, defaultValue: string): string {
  const value = process.env[varName];
  if (!value || value.trim() === '') {
    return defaultValue;
  }
  return value;
}

// Define the environment configuration for the application
export const APP_ENV_CONFIG: EnvConfig = {
  required: [
    // Add required environment variables here
    // Example: 'DATABASE_URL', 'API_KEY'
  ],
  optional: [
    'NEXT_PUBLIC_SITE_URL',
    'NEXT_PUBLIC_GA_ID',
    // Add other optional variables
  ],
};

// Validate environment on module load (build time and runtime)
export function validateAppEnv(): ValidationResult {
  const result = validateEnv(APP_ENV_CONFIG);

  if (!result.valid) {
    const errorMessage = `Environment validation failed. Missing required variables: ${result.missing.join(', ')}`;
    console.error(errorMessage);

    // In production, we might want to throw an error
    // In development, we can continue with warnings
    if (process.env.NODE_ENV === 'production') {
      throw new Error(errorMessage);
    }
  }

  return result;
}
