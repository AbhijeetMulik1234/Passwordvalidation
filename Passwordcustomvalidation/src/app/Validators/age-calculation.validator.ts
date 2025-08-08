export function calculateAge(dob: string | Date): number {
  debugger;
  const dateOfBirth = new Date(dob);
  if (isNaN(dateOfBirth.getTime())) return 0;

  const today = new Date();
  let age = today.getFullYear() - dateOfBirth.getFullYear();
  const monthDiff = today.getMonth() - dateOfBirth.getMonth();

  if (
    monthDiff < 0 ||
    (monthDiff === 0 && today.getDate() < dateOfBirth.getDate())
  ) {
    age--;
  }
  return age;
}
