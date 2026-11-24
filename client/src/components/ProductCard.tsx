import { ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { Card } from "@/components/ui/card";
import type { Product } from "@/data/products";
import { getProductPageUrl } from "@/data/productUrlSlugs";

const descriptions: Record<string, string> = {
  "fufu-borga": "Plantain-rich fufu flour with cassava.",
  "banku-borga": "Fermented maize and cassava flour.",
  "gari-borga": "Cassava granules for traditional Ghanaian meals.",
  "kokonte-borga": "Traditional dried cassava flour for making kokonte.",
  "cassava-flour": "Finely milled cassava flour for making fufu.",
};

export default function ProductCard({ product }: { product: Product }) {
  const href = getProductPageUrl(product.slug) ?? "/products";

  return (
    <Link
      href={href}
      className="group block h-full rounded-xl focus-visible:outline-none focus-visible:ring-4 focus-visible:ring-primary/40"
    >
      <Card className="h-full overflow-hidden border-border/60 bg-white p-4 shadow-sm transition-all duration-200 group-hover:-translate-y-1 group-hover:shadow-lg sm:p-5">
        <div className="flex aspect-[4/5] items-center justify-center overflow-hidden rounded-lg bg-gradient-to-br from-secondary/10 via-white to-secondary/5 p-3">
          <img
            src={product.images[0]}
            alt={`${product.name} packaging`}
            loading="lazy"
            decoding="async"
            className="h-full w-full object-contain"
          />
        </div>
        <div className="flex flex-1 flex-col pt-4">
          <h3 className="text-lg font-bold text-foreground">{product.name}</h3>
          <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
            {descriptions[product.slug] ?? product.summary}
          </p>
          {product.packagingSizes.length > 0 && (
            <p className="mt-2 text-xs text-muted-foreground">
              Sizes: {product.packagingSizes.join(", ")}
            </p>
          )}
          <span className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-primary group-hover:underline">
            View Product <ArrowRight size={16} aria-hidden="true" />
          </span>
        </div>
      </Card>
    </Link>
  );
}
