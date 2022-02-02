export function validateBigText(text: string): string | undefined {
  if(!text.trim()) {
    return 'This field can not be empty';
  }

  return;
}
