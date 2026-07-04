// WhatsApp Hybrid Links Generator

export interface WhatsAppMessage {
  message: string;
  phone: string;
}

export function generateWelcomeMessage(
  candidateName: string,
  jobTitle: string,
  department: string,
  interviewDate: string,
  meetingLink: string,
  portalLink: string,
  otp: string
): WhatsAppMessage {
  const message = `مرحباً ${candidateName}! 👋

تهانينا! 🎉 تم قبولك للمقابلة الشخصية

📋 تفاصيل الوظيفة:
• الوظيفة: ${jobTitle}
• القسم: ${department}

📅 موعد المقابلة:
${interviewDate}

🔗 رابط غرفة المقابلة:
${meetingLink}

🚀 بوابة المرشح:
${portalLink}

🔐 كود الوصول الخاص بك:
${otp}

تمنياتنا لك بالتوفيق! ✨`;

  return { message, phone: '' };
}

export function generateReminderMessage(
  candidateName: string,
  interviewDate: string,
  meetingLink: string
): WhatsAppMessage {
  const message = `تذكر دافئ ${candidateName}! ⏰

موعد مقابلتك غداً:
${interviewDate}

🔗 رابط المقابلة:
${meetingLink}

نصيحة: تأكد من جودة الانترنت والإضاءة والصوت 😊

نتطلع لرؤيتك! 🌟`;

  return { message, phone: '' };
}

export function generateThankYouMessage(
  candidateName: string
): WhatsAppMessage {
  const message = `شكراً لك يا ${candidateName}! 🙏

شكراً على حضورك المقابلة ووقتك الثمين.

سيتم إبلاغك بنتائج المقابلة خلال 7 أيام عمل.

نتمنى لك التوفيق في مسيرتك المهنية! 🚀✨`;

  return { message, phone: '' };
}

export function generateRejectionMessage(
  candidateName: string
): WhatsAppMessage {
  const message = `مرحباً ${candidateName},

شكراً على تقدمك واهتمامك بفرصة العمل معنا.

بعد المراجعة الدقيقة، تم اختيار مرشح آخر للوظيفة.

لا تيأس! نتمنى لك التوفيق في مسيرتك المهنية، ونأمل أن تتقدم على فرص مستقبلية معنا. 🌟

شكراً لك! 🙏`;

  return { message, phone: '' };
}

export function generateWhatsAppLink(
  phoneNumber: string,
  message: string
): string {
  // Remove any non-numeric characters from phone number
  const cleanPhone = phoneNumber.replace(/\D/g, '');
  // Ensure phone number starts with country code
  const formattedPhone = cleanPhone.startsWith('966')
    ? cleanPhone
    : '966' + cleanPhone.slice(-9);
  
  const encodedMessage = encodeURIComponent(message);
  return `https://wa.me/${formattedPhone}?text=${encodedMessage}`;
}

export function generateAllNotifications(
  candidateName: string,
  whatsappNumber: string,
  jobTitle: string,
  department: string,
  interviewDate: string,
  meetingLink: string,
  portalLink: string,
  otp: string
) {
  return {
    welcome: generateWhatsAppLink(
      whatsappNumber,
      generateWelcomeMessage(
        candidateName,
        jobTitle,
        department,
        interviewDate,
        meetingLink,
        portalLink,
        otp
      ).message
    ),
    reminder: generateWhatsAppLink(
      whatsappNumber,
      generateReminderMessage(candidateName, interviewDate, meetingLink).message
    ),
    thankyou: generateWhatsAppLink(
      whatsappNumber,
      generateThankYouMessage(candidateName).message
    ),
    rejection: generateWhatsAppLink(
      whatsappNumber,
      generateRejectionMessage(candidateName).message
    ),
  };
}
