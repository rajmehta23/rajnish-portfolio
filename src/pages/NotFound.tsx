export default function NotFound() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[70vh] px-4 text-center">
      <h1 className="text-9xl font-display font-bold tracking-tighter text-primary">404</h1>
      <p className="mt-4 text-2xl font-medium">Wait, where are we?</p>
      <p className="mt-2 text-muted-foreground">The page you're looking for doesn't exist or has been moved.</p>
      <a href="/" className="mt-8 px-8 py-3 bg-primary text-primary-foreground rounded-full hover:opacity-90 transition-opacity">
        Back to Home
      </a>
    </div>
  );
}
