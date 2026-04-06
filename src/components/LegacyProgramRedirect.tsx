import { Navigate, useParams } from "react-router-dom";
import { programDetailPath } from "@/lib/programRoutes";

/** Redirects `/programs/:category/:slug` → `/programs/:slug` for old bookmarks. */
export function LegacyProgramRedirect() {
  const { programSlug } = useParams();
  if (!programSlug?.trim()) {
    return <Navigate to="/programs" replace />;
  }
  return <Navigate to={programDetailPath(programSlug)} replace />;
}
