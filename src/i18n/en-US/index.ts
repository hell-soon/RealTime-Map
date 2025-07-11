export default {
  failed: 'Action failed',
  success: 'Action was successful',

  auth: {
    register: 'Register',
    login: 'Authorization',
    logout: 'Logout',
    alreadyHaveAccount: 'Already have an account?',
    loginDescription: 'Login and registration',
  },

  menu: {
    header: 'Menu',
    map: {
      title: 'Map',
      caption: 'Actual Map',
    },
    chat: {
      title: 'Chat',
      caption: 'Personal Chat',
    },
  },

  theme: {
    title: 'Theme',
    auto: 'Auto',
    light: 'Light',
    dark: 'Dark',
  },

  // --- Additions for UI components ---
  form: {
    email: 'Email',
    password: 'Password',
    username: 'Username',
    phone: 'Phone',
  },

  buttons: {
    login: 'Login',
    createAccount: 'Create account',
  },

  validation: {
    required: 'This field is required',
    minLength: 'Minimum 6 characters',
    invalidEmail: 'Please enter a valid email address',
  },

  notify: {
    registrationSuccess: 'Registration successful!',

    // --- Errors for notifications ---
    errors: {
      // Generic errors
      unknown: 'An unexpected error occurred. Please try again.',
      network: 'Network error. Please check your internet connection and try again.',
      serverUnavailable: 'The server is temporarily unavailable. Please try again later.',

      // API Client Errors (4xx)
      badRequest: 'Bad request. Please check the data you entered.', // 400
      unauthorized: 'Incorrect login or password.', // 401
      forbidden: 'You do not have permission to perform this action.', // 403
      notFound: 'The requested resource was not found.', // 404
      conflict: 'An entry with this data already exists.', // 409
      validation: 'Please check the validity of the data you entered.', // 422
      tooManyRequests: 'Too many requests. Please wait a moment and try again.', // 429
    },
  },
}
