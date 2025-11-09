import type { FieldValues, Path, UseFormReturn } from 'react-hook-form';

/**
 * API error response structure
 */
export interface ApiError {
  field?: string;
  message: string;
}

export interface ApiErrorResponse {
  errors?: ApiError[];
  message?: string;
}

/**
 * Maps API errors to form field errors
 *
 * @param form - The react-hook-form instance
 * @param error - The API error response
 * @param fieldMapping - Optional mapping of API field names to form field names
 *
 * @example
 * ```ts
 * try {
 *   await loginApi(data);
 * } catch (error) {
 *   mapApiErrorsToForm(form, error);
 * }
 * ```
 */
export function mapApiErrorsToForm<TFieldValues extends FieldValues>(
  form: UseFormReturn<TFieldValues>,
  error: unknown,
  fieldMapping?: Record<string, Path<TFieldValues>>
): void {
  // Handle unknown error types
  if (!error || typeof error !== 'object') {
    form.setError('root', {
      type: 'manual',
      message: 'An unexpected error occurred. Please try again.',
    });
    return;
  }

  const apiError = error as ApiErrorResponse;

  // Handle errors array
  if (apiError.errors && Array.isArray(apiError.errors)) {
    apiError.errors.forEach((err) => {
      if (err.field) {
        // Map the field name if a mapping is provided
        const formFieldName = fieldMapping?.[err.field] || err.field;

        // Check if the field exists in the form
        if (formFieldName in form.getValues()) {
          form.setError(formFieldName as Path<TFieldValues>, {
            type: 'manual',
            message: err.message,
          });
        } else {
          // If field doesn't exist, set as root error
          form.setError('root', {
            type: 'manual',
            message: err.message,
          });
        }
      } else {
        // No field specified, set as root error
        form.setError('root', {
          type: 'manual',
          message: err.message,
        });
      }
    });
    return;
  }

  // Handle single message error
  if (apiError.message) {
    form.setError('root', {
      type: 'manual',
      message: apiError.message,
    });
    return;
  }

  // Fallback for unknown error structure
  form.setError('root', {
    type: 'manual',
    message: 'An error occurred. Please try again.',
  });
}

/**
 * Clears all form errors
 *
 * @param form - The react-hook-form instance
 */
export function clearFormErrors<TFieldValues extends FieldValues>(
  form: UseFormReturn<TFieldValues>
): void {
  form.clearErrors();
}

/**
 * Gets root error message from form state
 *
 * @param form - The react-hook-form instance
 * @returns The root error message or undefined
 */
export function getRootError<TFieldValues extends FieldValues>(
  form: UseFormReturn<TFieldValues>
): string | undefined {
  return form.formState.errors.root?.message as string | undefined;
}
