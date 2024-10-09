import Link from "next/link";

export default function NotFound() {
  return (
    <section style={styles}>
      <h1>404 - Not Found</h1>
      <p>Please check the link and try again or go <Link href='/'>home</Link></p>
    </section>
  );
}

const styles = {
  display: 'Grid',
  placeContent: 'center',
  gap: '20px',
  marginTop: '20px',
}
