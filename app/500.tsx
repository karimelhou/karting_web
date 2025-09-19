export default function ServerError() {
  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-black/80 text-center text-muted-foreground">
      <h1 className="text-5xl font-heading text-foreground">500</h1>
      <p className="mt-4 max-w-md text-sm">
        Oups, un incident est survenu. Réessayez dans quelques instants ou contactez notre
        équipe.
      </p>
    </div>
  );
}
