export const getErrorMessage = (error: unknown) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const err = error as any;
  // Handle different types of errors
  if (err.response) {
    const status = err.response.status;
    const data = err.response.data;
    
    // Priority 1: Handle errors array format: {status: 400, errors: [{message: "...", code: "..."}]}
    if (data?.errors && Array.isArray(data.errors) && data.errors.length > 0) {
      const firstError = data.errors[0];
      
      // Check for specific error codes (preserved from before)
      if (firstError.code === "too_many_login_attempts") {
        return "Too many failed login attempts. Please wait a few minutes before trying again.";
      }
      
      if (firstError.code === "invalid_credentials" || firstError.code === "email_password_mismatch") {
        return firstError.message || "Invalid email or password. Please check your credentials and try again.";
      }
      
      // Return the error message from the backend
      return firstError.message || "Action failed. Please try again.";
    }

    // Priority 2: Handle standard field errors/dictionary: { "email": ["This field is required."], "password": ["..."] }
    if (typeof data === "object" && data !== null && !Array.isArray(data)) {
        // If there's a 'non_field_errors' or 'detail' or 'message' field, use it first
        const mainError = data.non_field_errors?.[0] || data.detail || data.message || data.error;
        if (mainError) return mainError;

        // Otherwise, join all field errors
        const fieldErrors = Object.entries(data)
            .filter(([field]) => !['status', 'errors'].includes(field)) // Ignore metadata fields
            .map(([field, messages]) => {
                const fieldName = field.charAt(0).toUpperCase() + field.slice(1).replace(/_/g, " ");
                const message = Array.isArray(messages) ? messages[0] : messages;
                return `${fieldName}: ${message}`;
            })
            .join(" ");
        
        if (fieldErrors) return fieldErrors;
    }
    
    // Fallback to status code based handling
    switch (status) {
      case 401:
        return "Invalid email or password. Please check your credentials and try again.";
      case 403:
        return "Your account has been suspended or disabled. Please contact support.";
      case 404:
        return "Resource not found. Please check your entry.";
      case 429:
        return "Too many attempts. Please wait a few minutes before trying again.";
      case 500:
        return "Server error occurred. Please try again later.";
      default:
        return "Action failed. Please try again.";
    }
  } else if (err.request) {
    return "Network error. Please check your internet connection and try again.";
  } else {
    return err.message || "An unexpected error occurred. Please try again.";
  }
};
