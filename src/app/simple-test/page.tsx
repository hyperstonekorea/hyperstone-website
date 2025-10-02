export default function SimpleTestPage() {
  return (
    <div style={{ padding: '20px', textAlign: 'center' }}>
      <h1>Simple Test Page</h1>
      <p>If you can see this, basic Next.js routing is working!</p>
      <p>Current time: {new Date().toISOString()}</p>
    </div>
  );
}