export const EmailAccount = () => {
  const emailaccount = localStorage.getItem("emailaccount");
  return emailaccount ? JSON.parse(emailaccount) : null;
};
