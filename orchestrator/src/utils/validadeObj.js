export function validateBody(body, requiredFields = []) {
  const missingFields = [];

  for (const field of requiredFields) {
    if (!Object.hasOwnProperty.call(body, field)) {
      missingFields.push(field);
    }
  }

  return {
    isValid: missingFields.length === 0,
    missingFields: missingFields,
  };
}
