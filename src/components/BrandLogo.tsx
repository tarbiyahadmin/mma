import logoSrc from "@/assets/logo.svg";

type BrandLogoProps = {
  /** Navbar / compact chrome */
  variant?: "header" | "footer";
  className?: string;
  alt?: string;
};

const sizeClass = {
  header: "h-9 w-9 md:h-10 md:w-10",
  footer: "h-12 w-12 md:h-14 md:w-14",
} as const;

export function BrandLogo({
  variant = "header",
  className = "",
  alt = "Muslim Mentorship Academy",
}: BrandLogoProps) {
  return (
    <img
      src={logoSrc}
      alt={alt}
      className={`shrink-0 object-contain object-center ${sizeClass[variant]} ${className}`.trim()}
      loading="eager"
      decoding="async"
    />
  );
}
