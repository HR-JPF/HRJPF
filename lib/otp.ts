// OTP Generation and Verification

export function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString();
}

export function verifyOTP(inputOTP: string, storedOTP: string): boolean {
  return inputOTP === storedOTP;
}

export function formatOTPExpiry(minutes: number = 10): Date {
  const expiry = new Date();
  expiry.setMinutes(expiry.getMinutes() + minutes);
  return expiry;
}

export function isOTPExpired(expiryTime: string): boolean {
  return new Date() > new Date(expiryTime);
}
