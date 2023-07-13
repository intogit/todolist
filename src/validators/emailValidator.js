import { promises as dns } from 'dns';
// import { includes } from 'disposable-email-domains';
import { validate } from 'email-validator';

async function verifyEmail(email) {
  // Step 1: Syntax Validation
  const isSyntaxValid = validate(email);
  if (!isSyntaxValid) {
    console.log('Email address has invalid syntax.');
    return false;
  }

  // Step 2: DNS Validation (MX Records)
  const domain = email.split('@')[1];
  try {
    const mxRecords = await dns.resolveMx(domain);
    if (mxRecords.length === 0) {
      console.log('No MX records found for the domain.');
      return false;
    }
  } catch (error) {
    console.error('DNS resolution error:', error);
    return false;
  }

  // Step 3: Disposable Email Address Check
//   const isDisposable = includes(domain);
//   if (isDisposable) {
//     console.log('Email address is from a disposable email address provider.');
//     return false;
//   }

  // Additional Steps (if desired):
  // - Role-based Email Check
  // - Custom domain-specific checks

  // Email address is considered valid
  console.log('Email address is valid.');
  return true;
}
export default verifyEmail;