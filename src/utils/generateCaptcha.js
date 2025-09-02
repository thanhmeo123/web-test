export function generateCaptcha(length = 4) {
    const chars = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
    let captcha = "";
    for (let i = 0; i < length; i++) {
      captcha += chars[Math.floor(Math.random() * chars.length)];
    }
    return captcha;
  }