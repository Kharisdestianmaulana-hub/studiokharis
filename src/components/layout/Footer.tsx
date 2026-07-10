export function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="w-full border-t border-border mt-auto">
      <div className="max-w-[1200px] mx-auto px-4 py-8 md:py-12 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-sm text-muted">
          &copy; {currentYear} Amélie Laurent. All rights reserved.
        </p>
        <div className="flex gap-4 text-sm text-muted">
          <a href="#" className="hover:text-foreground transition-colors">Twitter</a>
          <a href="#" className="hover:text-foreground transition-colors">GitHub</a>
          <a href="#" className="hover:text-foreground transition-colors">LinkedIn</a>
        </div>
      </div>
    </footer>
  );
}
