export class FormSubmitError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'FormSubmitError';
  }
}

const FORM_ENDPOINT = (
  import.meta.env.VITE_FORM_ENDPOINT?.trim() || '/contact.php'
);

export async function submitForm(payload: Record<string, unknown>) {
  const response = await fetch(FORM_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  const rawBody = await response.text();
  let data: { success?: boolean; message?: string } | null = null;

  try {
    data = rawBody ? JSON.parse(rawBody) : null;
  } catch {
    throw new FormSubmitError(
      `Der Server hat keine gueltige Antwort geliefert (HTTP ${response.status}).`
    );
  }

  if (!response.ok || !data?.success) {
    throw new FormSubmitError(
      data?.message || 'Beim Senden ist ein Fehler aufgetreten. Bitte versuche es spaeter erneut.'
    );
  }

  return data;
}
