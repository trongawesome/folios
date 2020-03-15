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
    <Section narrow>
      <SubscriptionContainer>
        <Content>
          <Heading>
            Sign up to my email list for updates
          </Heading>
          <Text>
            Be the first to receive my latest updates. No spam or share your
            email with any third parties.
          </Text>
          <Form onSubmit={handleSubmit} hasError={error}>
            <Input
              placeholder="your@email.com"
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
              {subscribed ? <CheckMarkIcon /> : "Subscribe"}
            </Button>
            {error && <Error dangerouslySetInnerHTML={{ __html: error }} />}
          </Form>
        </Content>
      </SubscriptionContainer>
    </Section>
  );
};

export default Subscription;

const SubscriptionContainer = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  z-index: 1;
  border-top: solid 1px ${p => p.theme.colors.horizontalRule};

  padding: 64px 0 55px;
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

  // ${mediaqueries.tablet`
  //   h3 {
  //     padding: 0 50px;
  //   }
  // `}

  // ${mediaqueries.phone`
  //   h3 {
  //     padding: 0 24px;
  //   }
  // `}
`;

const Heading = styled(Headings.h3)`
  margin-bottom: 8px;
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
`;

const Input = styled.input<{ hasError: string }>`
  position: relative;
  background: ${p =>
    p.hasError
      ? p.theme.colors.errorBackground
      : p.theme.colors.inputBackground};
  border: none;
  padding: 12px 20px 12px 20px;
  width: 471px;
  color: ${p => p.theme.colors.primary};

  ::placeholder {
    color: ${p => p.theme.colors.track};
    opacity: 1;
  }

  :-ms-input-placeholder {
    color: ${p => p.theme.colors.track};
  }

  ::-ms-input-placeholder {
    color: ${p => p.theme.colors.track};
  }

  ${mediaqueries.tablet`
    width: 100%;
    margin-bottom: 24px;
  `}
`;

const Button = styled.button<{ hasError: string; subscribed: boolean }>`
  position: absolute;
  left: 306px;
  top: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 161px;
  height: 38px;
  border: 1px solid
    ${p => (p.hasError ? p.theme.colors.error : p.theme.colors.accent)};
  color: ${p => (p.hasError ? p.theme.colors.error : p.theme.colors.accent)};
  background: ${p => (p.subscribed ? p.theme.colors.accent : "transparent")};
  font-family: ${p => p.theme.fonts.title};
  font-weight: ${p => p.theme.fontsWeight.bold};
  letter-spacing: 0.42px;
  transition: border-color 0.2s var(--ease-in-out-quad),
    background 0.2s var(--ease-in-out-quad), color 0.2s var(--ease-in-out-quad);

  &:hover {
    background: ${p =>
      p.hasError ? p.theme.colors.error : p.theme.colors.accent};
    color: ${p => p.theme.colors.background};
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
    border-radius: 0;
    border: 1px solid ${p.theme.colors.accent};

    &:hover {
      color: initial;
      background: initial;
    }
  `}
`;

const Error = styled.div`
  position: absolute;
  left: 0;
  bottom: -20px;
  color: ${p => p.theme.colors.error};
  font-size: 12px;

  a {
    color: ${p => p.theme.colors.error};
    text-decoration: underline;
  }

  ${mediaqueries.tablet`
    left: 0;
    top: 50px;
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
