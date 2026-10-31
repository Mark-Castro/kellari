declare module '@mailchimp/mailchimp_marketing' {
  type Configuration = {
    apiKey: string;
    server: string;
  };

  type AddListMemberRequest = {
    email_address: string;
    status: 'pending';
  };

  type AddListMemberResponse = {
    id: string;
    email_address: string;
    status: string;
  };

  const mailchimp: {
    setConfig(configuration: Configuration): void;
    lists: {
      addListMember(
        listId: string,
        body: AddListMemberRequest,
      ): Promise<AddListMemberResponse>;
    };
  };

  export = mailchimp;
}
