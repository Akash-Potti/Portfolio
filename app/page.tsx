import { Kanit } from 'next/font/google';

import Wrapper from "./components/Wrapper"
const kanit = Kanit({
  weight: '500',
  subsets: ['latin'],
  display: 'swap'
})
export default function Home() {
  return (
    <main className={kanit.className}>
      <Wrapper />
    </main>
  );
}
