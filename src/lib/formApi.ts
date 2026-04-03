export class FormSubmitError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'FormSubmitError';
  }
}

export async function submitForm(payload: Record<string, unknown>) {
  const response = await fetch('/contact.php', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  let data: { success?: boolean; message?: string } | null = null;

  try {
    data = await response.json();
  } catch {
    throw new FormSubmitError('Der Server hat keine gueltige Antwort geliefert.');
  }

  if (!response.ok || !data?.success) {
    throw new FormSubmitError(
      data?.message || 'Beim Senden ist ein Fehler aufgetreten. Bitte versuche es spaeter erneut.'
    );
  }

  return data;
}
