import { ArrowRight } from "lucide-react";
import { Link } from "wouter";
import {
  EXPORT_QUOTE_PATH,
  getEnquiryPath,
  getProductQuotePath,
} from "@/config/site";
import { Button } from "@/components/ui/button";

interface ExportQuoteButtonProps {
  className?: string;
  size?: "default" | "sm" | "lg" | "icon";
  variant?: "default" | "outline" | "secondary" | "ghost" | "link";
  showArrow?: boolean;
  inquiryType?: "export_quote" | "wholesale" | "distribution" | "private_label";
  /** Preselects this product in the Contact form. Only applies for export_quote. */
  productSlug?: string;
  label?: string;
}

export default function ExportQuoteButton({
  className,
  size = "lg",
  variant = "default",
  showArrow = true,
  inquiryType = "export_quote",
  productSlug,
  label = "Request Export Quote",
}: ExportQuoteButtonProps) {
  const href =
    inquiryType === "export_quote"
      ? productSlug
        ? getProductQuotePath(productSlug)
        : EXPORT_QUOTE_PATH
      : getEnquiryPath(inquiryType);

  return (
    <Link href={href}>
      <Button size={size} variant={variant} className={className}>
        {label}
        {showArrow && <ArrowRight size={18} className="ml-2" />}
      </Button>
    </Link>
  );
}
