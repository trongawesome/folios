import addToMailchimp from "gatsby-plugin-mailchimp";
import React, { useState } from "react";

import Section from "@components/Section";
import Headings from "@components/Headings";

import styled from "@emotion/styled";
import mediaqueries from "@styles/media";

const Subscription: React.FC<{}> = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    addToMailchimp(email)
      .then(data => {
        if (data.result === "error") {
          throw data;
        }

        setSubscribed(true);
        setEmail("");

        setTimeout(() => {
          setSubscribed(false);
        }, 6000);
      })
      .catch(error => {
        setError(error.msg);
      });
  }

  function handleEmailChange(event: React.ChangeEvent<HTMLInputElement>) {
    setEmail(event.currentTarget.value);
    setError("");
  }

  return (
    <SubscriptionContainer>
      <Content>
        <Heading>
          Curated design portfolio inspirations and case studies. Delivered every Monday.
        </Heading>
        {/* <Text>
          Be the first to receive my latest updates. No spam or share your
          email with any third parties.
        </Text> */}
        <Form onSubmit={handleSubmit} hasError={error}>
          <Input
            placeholder="Enter your email address"
            name="email"
            type="email"
            value={email}
            onChange={handleEmailChange}
            hasError={error}
          />
          <Button
            type="submit"
            hasError={error}
            subscribed={subscribed}
            disabled={subscribed}
          >
            {subscribed ? <CheckMarkIcon /> : "Just do it!"}
          </Button>
          {error && <Error dangerouslySetInnerHTML={{ __html: error }} />}
        </Form>
      </Content>
    </SubscriptionContainer>
  );
};

export default Subscription;

const SubscriptionContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  z-index: 1;
  margin: 10px auto 100px;

  width: 100%;
  max-width: 680px;

  ${mediaqueries.desktop`
    max-width: 507px;
  `}

  ${mediaqueries.tablet`
    max-width: 486px;
  `};
`;

const Content = styled.div`
  margin: 0 auto;
  width: 100%;
`;

const Heading = styled(Headings.h4)`
  margin-bottom: 8px;
  text-align: center;
  margin-bottom: 40px;
  color: ${p => p.theme.colors.white};
`;

const Text = styled.p`
  margin: 0 auto 24px;
  color: ${p => p.theme.colors.secondary};
  line-height: 1.75;

  ${mediaqueries.tablet`
    margin: 0 auto 25px;
  `}
`;

const Form = styled.form<{ hasError: string }>`
  position: relative;
  display: grid;
  width: 100%;
  grid-template-columns: 60% auto;
  column-gap: 24px;
  row-gap: 24px;
  font-size: 18px;
  line-height: 32px;

  ${mediaqueries.tablet`
    grid-template-columns: 1fr;
  `}
`;

const Input = styled.input<{ hasError: string }>`
  position: relative;
  padding: 8px 0;
  color: ${p => p.theme.colors.white};
  background-color: transparent;
  border-style: none none solid;
  border-bottom-width: 2px;
  border-bottom-color: ${p => (p.hasError ? p.theme.colors.error : p.theme.colors.grey)};
  transition: border-color 0.2s var(--ease-in-out-quad);
  -webkit-appearance: none;

  &:focus, &:hover {
    border-bottom-color: ${p => p.theme.colors.greyLight};
  }
  ::placeholder {
    color: ${p => p.theme.colors.grey};
    opacity: 1;
  }

  :-ms-input-placeholder {
    color: ${p => p.theme.colors.grey};
  }

  ::-ms-input-placeholder {
    color: ${p => p.theme.colors.grey};
  }

  ${mediaqueries.tablet`
    width: 100%;
  `}
`;

const Button = styled.button<{ hasError: string; subscribed: boolean }>`
  align-items: center;
  justify-content: center;
  padding: 8px 0;
  border-radius: 28px;
  border: 1px solid
    ${p => p.theme.colors.accent};
  color: ${p => p.theme.colors.white};
  background: ${p => (p.subscribed ? p.theme.colors.accent : p.theme.colors.accent)};
  font-family: ${p => p.theme.fonts.title};
  font-weight: ${p => p.theme.fontsWeight.bold};
  letter-spacing: 0.42px;
  transition: opacity 0.2s var(--ease-in-out-quad);

  &:hover {
    opacity: .8;
  }

  &[disabled] {
    cursor: not-allowed;
  }

  svg * {
    fill: ${p => p.theme.colors.background};
  }

  ${p => mediaqueries.tablet`
    position: relative;
    height: 48px;
    width: 100%;
    top: 0;
    left: 0;
    border: none;
    border: 1px solid ${p.theme.colors.accent};
  `}
`;

const Error = styled.div`
  position: absolute;
  left: 0;
  top: 48px;
  color: ${p => p.theme.colors.error};
  font-size: 12px;

  a {
    color: ${p => p.theme.colors.error};
    text-decoration: underline;
  }

  ${mediaqueries.tablet`
    left: 0;
    top: 40px;
  `}
`;

const CheckMarkIcon = () => (
  <svg
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
  >
    <path
      d="M9.00016 16.1698L4.83016 11.9998L3.41016 13.4098L9.00016 18.9998L21.0002 6.99984L19.5902 5.58984L9.00016 16.1698Z"
      fill="#08080B"
    />
  </svg>
);
