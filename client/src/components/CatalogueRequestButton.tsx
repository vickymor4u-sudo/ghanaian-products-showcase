import { Button } from "@/components/ui/button";

interface CatalogueRequestButtonProps {
  productName?: string;
  className?: string;
}

export default function CatalogueRequestButton({
  productName,
  className,
}: CatalogueRequestButtonProps) {
  const subject = productName
    ? `BorgaFoods Product Catalogue Request — ${productName}`
    : "BorgaFoods Product Catalogue Request";

  return (
    <Button asChild size="lg" variant="outline" className={className}>
      <a
        href={`mailto:export@borgafoods.com?subject=${encodeURIComponent(subject)}`}
      >
        Request Product Catalogue
      </a>
    </Button>
  );
}
