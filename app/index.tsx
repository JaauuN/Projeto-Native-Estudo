import { Redirect } from 'expo-router';

export default function Index() {
  // Redireciona para a rota "/home"
  return <Redirect href="/home" />;
}