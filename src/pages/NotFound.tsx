import { useLocation } from "react-router-dom";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { KxDisplay, KxPageScaffold } from "@/kinetic/KineticPrimitives";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error("404 Error: User attempted to access non-existent route:", location.pathname);
  }, [location.pathname]);

  return (
    <main className="kx-main flex min-h-[70vh] flex-col justify-center">
      <KxPageScaffold>
        <div className="relative mx-auto max-w-2xl text-center">
          <KxDisplay
            as="h1"
            size="hero"
            className="!text-[3.25rem] !leading-none sm:!text-6xl md:!text-7xl lg:!text-8xl"
          >
            404
          </KxDisplay>
          <p className="mt-6 font-display text-sm uppercase tracking-[0.3em] text-kx-primary/85">
            Off the map
          </p>
          <p className="mt-4 font-body text-kx-muted">
            This page doesn&apos;t exist — but mentorship still does.
          </p>
          <Link
            to="/"
            className="kx-btn-solid mt-12 inline-flex rounded-xl px-8 py-3.5 font-display text-xs font-bold uppercase tracking-[0.2em] text-kx-cream shadow-kx-lift transition hover:-translate-y-0.5"
          >
            Home
          </Link>
        </div>
      </KxPageScaffold>
    </main>
  );
};

export default NotFound;
