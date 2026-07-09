import { MessageCircle } from "lucide-react";

/**
 * Floating WhatsApp button component
 * Displays a fixed button in the bottom-right corner that opens WhatsApp chat
 */
export default function WhatsAppButton() {
  const whatsappNumber = "+233533763700"; // WhatsApp number without spaces
  const message = "Hello! I'm interested in learning more about Borga products.";
  
  const handleClick = () => {
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`;
    window.open(url, "_blank");
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-50 flex items-center gap-2 bg-green-500 hover:bg-green-600 text-white px-4 py-3 rounded-full shadow-lg transition-all duration-300 hover:scale-110 group"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="w-6 h-6" />
      <span className="hidden group-hover:inline-block text-sm font-medium whitespace-nowrap">
        Chat with us
      </span>
    </button>
  );
}
