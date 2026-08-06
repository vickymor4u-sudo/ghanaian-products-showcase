import { ArrowRight } from "lucide-react";
import { Link } from "wouter";
import { EXPORT_QUOTE_PATH } from "@/config/site";
import { Button } from "@/components/ui/button";

interface ExportQuoteButtonProps {
  className?: string;
  size?: "default" | "sm" | "lg" | "icon";
  variant?: "default" | "outline" | "secondary" | "ghost" | "link";
  showArrow?: boolean;
}

export default function ExportQuoteButton({
  className,
  size = "lg",
  variant = "default",
  showArrow = true,
}: ExportQuoteButtonProps) {
  return (
    <Link href={EXPORT_QUOTE_PATH}>
      <Button size={size} variant={variant} className={className}>
        Request Export Quote
        {showArrow && <ArrowRight size={18} className="ml-2" />}
      </Button>
    </Link>
  );
}
