export class RateLimiter {
  private requests: Map<string, { count: number; resetTime: number }>;
  private windowMs: number;
  private maxRequests: number;

  constructor(maxRequests: number, windowMs: number) {
    this.requests = new Map();
    this.maxRequests = maxRequests;
    this.windowMs = windowMs;
  }

  async limit(
    key: string,
  ): Promise<{ success: boolean; remaining: number; reset: number }> {
    const now = Date.now();
    const record = this.requests.get(key);

    if (!record || now > record.resetTime) {
      // No record or window expired, create new record
      this.requests.set(key, {
        count: 1,
        resetTime: now + this.windowMs,
      });
      return {
        success: true,
        remaining: this.maxRequests - 1,
        reset: now + this.windowMs,
      };
    }

    if (record.count >= this.maxRequests) {
      // Rate limit exceeded
      return {
        success: false,
        remaining: 0,
        reset: record.resetTime,
      };
    }

    // Increment count
    record.count++;
    this.requests.set(key, record);

    return {
      success: true,
      remaining: this.maxRequests - record.count,
      reset: record.resetTime,
    };
  }

  // Clean up old entries periodically (optional, can be called manually)
  cleanup(): void {
    const now = Date.now();
    const keysToDelete: string[] = [];

    for (const [key, record] of Array.from(this.requests.entries())) {
      if (now > record.resetTime) {
        keysToDelete.push(key);
      }
    }

    for (const key of keysToDelete) {
      this.requests.delete(key);
    }
  }
}
