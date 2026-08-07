import { ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { EXPORT_QUOTE_PATH, getEnquiryPath } from "@/config/site";
import { Button } from "@/components/ui/button";

interface ExportQuoteButtonProps {
  className?: string;
  size?: "default" | "sm" | "lg" | "icon";
  variant?: "default" | "outline" | "secondary" | "ghost" | "link";
  showArrow?: boolean;
  inquiryType?: "export_quote" | "wholesale" | "distribution";
  label?: string;
}

export default function ExportQuoteButton({
  className,
  size = "lg",
  variant = "default",
  showArrow = true,
  inquiryType = "export_quote",
  label = "Request Export Quote",
}: ExportQuoteButtonProps) {
  return (
    <Link
      href={
        inquiryType === "export_quote"
          ? EXPORT_QUOTE_PATH
          : getEnquiryPath(inquiryType)
      }
    >
      <Button size={size} variant={variant} className={className}>
        {label}
        {showArrow && <ArrowRight size={18} className="ml-2" />}
      </Button>
    </Link>
  );
}
