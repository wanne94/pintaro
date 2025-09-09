import { redirect } from 'next/navigation';

export default function ImpressumPage() {
  // Redirect to the German locale version
  redirect('/de/impressum');
}