import { whatsappChatLink } from '../../lib/contact';

export default function FloatingWhatsAppLink() {
  if (!whatsappChatLink) return null;

  return (
    <a
      className="floating-whatsapp-link"
      href={whatsappChatLink}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with Kellari on WhatsApp (opens in a new tab)"
    >
      <svg viewBox="0 0 32 32" aria-hidden="true">
        <path
          fill="currentColor"
          d="M16.04 3.2A12.66 12.66 0 0 0 5.2 22.4L3.5 28.7l6.47-1.7A12.66 12.66 0 1 0 16.04 3.2Zm0 23.05c-1.94 0-3.84-.52-5.5-1.51l-.4-.24-3.85 1.01 1.03-3.75-.26-.4a10.34 10.34 0 1 1 8.98 4.9Zm5.68-7.75c-.31-.16-1.84-.91-2.12-1.01-.29-.1-.5-.16-.71.16-.21.31-.82 1.01-1 1.22-.19.21-.37.23-.68.08-.32-.16-1.34-.5-2.56-1.59-.95-.84-1.59-1.88-1.77-2.19-.19-.31-.02-.48.14-.64.14-.14.31-.37.47-.55.16-.19.21-.32.31-.53.11-.21.06-.4-.02-.56-.08-.16-.71-1.7-.98-2.33-.26-.61-.52-.53-.71-.54h-.61c-.21 0-.55.08-.84.4-.29.32-1.1 1.07-1.1 2.61s1.13 3.03 1.29 3.24c.16.21 2.22 3.39 5.37 4.75.75.32 1.33.51 1.79.65.75.24 1.43.2 1.97.12.6-.09 1.84-.75 2.1-1.48.26-.72.26-1.35.19-1.48-.08-.13-.29-.21-.61-.37Z"
        />
      </svg>
    </a>
  );
}
