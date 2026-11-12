export class FormSubmitError extends Error {
  constructor(message: string) {
    super(message);
    this.name = 'FormSubmitError';
  }
}

const FORM_ENDPOINT = (
  import.meta.env.VITE_FORM_ENDPOINT?.trim() || '/contact.php'
);

const PAGE_LOADED_AT = Date.now();

/** Creates an opaque idempotency key. Keep it for retries of one form attempt. */
export function createSubmissionId() {
  return crypto.randomUUID();
}

export async function submitForm(payload: Record<string, unknown>, submissionId: string) {
  // The caller keeps this UUID while retrying. PHP and the manager therefore
  // recognize a repeated transmission without receiving browser credentials.
  const response = await fetch(FORM_ENDPOINT, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    // _elapsed: ms since page load, used server-side to reject instant bot submissions
    body: JSON.stringify({ ...payload, submissionId, _elapsed: Date.now() - PAGE_LOADED_AT }),
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
