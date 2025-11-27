/**
 * Form submission utilities
 * Handles form data submission to email service
 */

export interface FormSubmissionData {
  [key: string]: string | number | boolean;
}

export interface FormSubmitResponse {
  success: boolean;
  message: string;
}

/**
 * Submit form data to FormSubmit.co
 * Note: Replace YOUR_EMAIL with your actual email address
 */
export async function submitToEmail(
  formData: FormSubmissionData,
  recipientEmail: string
): Promise<FormSubmitResponse> {
  try {
    const form = new FormData();

    // Add all form fields
    Object.entries(formData).forEach(([key, value]) => {
      form.append(key, String(value));
    });

    // FormSubmit.co endpoint
    const response = await fetch(`https://formsubmit.co/${recipientEmail}`, {
      method: "POST",
      body: form,
      headers: {
        'Accept': 'application/json'
      }
    });

    if (response.ok) {
      return {
        success: true,
        message: "Form submitted successfully!"
      };
    } else {
      throw new Error("Form submission failed");
    }
  } catch (error) {
    console.error("Form submission error:", error);
    return {
      success: false,
      message: "Failed to submit form. Please try again."
    };
  }
}

/**
 * Alternative: Submit using Web3Forms (another free service)
 */
export async function submitToWeb3Forms(
  formData: FormSubmissionData,
  accessKey: string
): Promise<FormSubmitResponse> {
  try {
    const response = await fetch("https://api.web3forms.com/submit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept": "application/json"
      },
      body: JSON.stringify({
        access_key: accessKey,
        ...formData
      })
    });

    const result = await response.json();

    if (result.success) {
      return {
        success: true,
        message: "Form submitted successfully!"
      };
    } else {
      throw new Error(result.message || "Submission failed");
    }
  } catch (error) {
    console.error("Form submission error:", error);
    return {
      success: false,
      message: "Failed to submit form. Please try again."
    };
  }
}
