import { Button } from "@/components/ui/button";
import { Link } from "wouter";

interface CatalogueRequestButtonProps {
  productSlug?: string;
  className?: string;
}

export default function CatalogueRequestButton({
  productSlug,
  className,
}: CatalogueRequestButtonProps) {
  const href = productSlug
    ? `/contact?inquiry=catalogue&product=${encodeURIComponent(productSlug)}`
    : "/contact?inquiry=catalogue";

  return (
    <Button asChild size="lg" variant="outline" className={className}>
      <Link href={href}>
        Request Product Catalogue
      </Link>
    </Button>
  );
}
