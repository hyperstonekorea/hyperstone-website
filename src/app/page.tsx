import { redirect } from 'next/navigation';

export default function RootPage() {
  // Redirect to Korean locale by default
  redirect('/ko');
}
