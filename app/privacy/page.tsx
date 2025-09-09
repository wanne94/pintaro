import { redirect } from 'next/navigation';

export default function PrivacyPage() {
  // Redirect to the German locale version
  redirect('/de/privacy');
}