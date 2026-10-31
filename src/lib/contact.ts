const configuredContactPhone = process.env.NEXT_PUBLIC_CONTACT_PHONE?.trim();

if (configuredContactPhone && !/^\+[1-9]\d{7,14}$/.test(configuredContactPhone)) {
  throw new Error(
    'NEXT_PUBLIC_CONTACT_PHONE must use international E.164 format, such as +15551234567.',
  );
}

export const contactPhone = configuredContactPhone || undefined;
export const contactPhoneLink = contactPhone ? `tel:${contactPhone}` : undefined;
export const whatsappChatLink = contactPhone
  ? `https://wa.me/${contactPhone.slice(1)}?text=${encodeURIComponent(
      'Hello Kellari, I would like to discuss your services.',
    )}`
  : undefined;
