// Type definitions for next-intl messages

declare global {
  // Use type safe message keys with `next-intl`
  interface IntlMessages {
    navigation: {
      home: string;
      about: string;
      products: string;
      contact: string;
      language: string;
    };
    hero: {
      title: string;
      subtitle: string;
      description: string;
      scrollDown: string;
    };
    about: {
      title: string;
      vision: string;
      mission: string;
      visionText: string;
      missionText: string;
    };
    products: {
      title: string;
      subtitle: string;
      readymixconcrete: {
        name: string;
        description: string;
      };
      precastconcrete: {
        name: string;
        description: string;
      };
      groutingagent: {
        name: string;
        description: string;
      };
      waterproofagent: {
        name: string;
        description: string;
      };
      learnMore: string;
    };
    contact: {
      title: string;
      subtitle: string;
      phone: string;
      email: string;
      address: string;
      form: {
        title: string;
        name: string;
        nameRequired: string;
        phone: string;
        phoneRequired: string;
        email: string;
        emailRequired: string;
        emailInvalid: string;
        message: string;
        messageRequired: string;
        submit: string;
        submitting: string;
        success: string;
        error: string;
      };
    };
    footer: {
      company: string;
      businessNumber: string;
      ceo: string;
      privacy: string;
      copyright: string;
    };
    common: {
      loading: string;
      error: string;
      retry: string;
      close: string;
    };
  }
}

export {};