export default function NotFound() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black/80 text-center text-muted-foreground">
      <h1 className="text-5xl font-heading text-foreground">404</h1>
      <p className="mt-4 max-w-md text-sm">
        Page introuvable. Utilisez le menu pour retrouver la section souhaitée ou
        contactez-nous.
      </p>
    </div>
  );
}
