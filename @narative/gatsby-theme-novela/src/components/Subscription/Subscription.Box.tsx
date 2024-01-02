import addToMailchimp from "gatsby-plugin-mailchimp";
import React, { useState } from "react";

import Section from "@components/Section";
import Headings from "@components/Headings";

import styled from "@emotion/styled";
import mediaqueries from "@styles/media";

const SubscriptionBox: React.FC<{}> = () => {
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
    <Content>
    {/* <Text>
        Be the first to receive my latest updates. No spam or share your
        email with any third parties.
    </Text> */}
    <Form onSubmit={handleSubmit} hasError={error}>
        <Input
        placeholder="Enter your email"
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
        {subscribed ?
        <>
            <CheckMarkIcon />
            <Text>You're on the list</Text>
        </>
        :
        "Subscribe →"}
        </Button>
    </Form>
    {error && <Error dangerouslySetInnerHTML={{ __html: error }} />}
    </Content>
  );
};

export default SubscriptionBox;

const Content = styled.div`
  width: 100%;
  margin-top: 16px;
  margin-bottom: 80px;
`;

const Text = styled.span`
  margin-left: 16px
  font-size: 16px;
  color: ${p => p.theme.colors.white};
  line-height: 1.75;
`;

const Form = styled.form<{ hasError: string }>`
    width: 100%;
    height: auto;
    display: flex;
    position: relative;
    flex-direction: row;
    gap: 16px;
    justify-content: center;
    width: 100%;

    ${mediaqueries.tablet`
        flex-direction: column;
        padding: 0 16px;
    `}
`;

const Input = styled.input<{ hasError: string }>`
    position: relative;
    background: ${p =>
        p.hasError
        ? p.theme.colors.errorBackground
        : p.theme.colors.inputBackground};
    border: none;
    border-radius: 32px;
    padding: 12px 20px 12px 20px;
    width: 400px;
    color: ${p => p.theme.colors.primary};
    font-size: 18px;

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
    `}
`;

const Button = styled.button<{ hasError: string; subscribed: boolean }>`
    display: flex;
    align-items: center;
    padding: 12px 20px;
    justify-content: center;
    border: 1px solid
        ${p => (p.hasError ? p.theme.colors.error : p.theme.colors.primary)};
    border-radius: 32px;
    color: ${p => (p.hasError ? p.theme.colors.error : p.theme.colors.white)};
    background: ${p => (p.subscribed ? p.theme.colors.accent : p.theme.colors.primary)};
    font-family: ${p => p.theme.fonts.title};
    font-weight: ${p => p.theme.fontsWeight.bold};
    font-size: 18px;
    letter-spacing: 0.42px;
    transition: border-color 0.2s var(--ease-in-out-quad),
        background 0.2s var(--ease-in-out-quad), color 0.2s var(--ease-in-out-quad);

    &:hover {
        background: ${p =>
        p.hasError ? p.theme.colors.error : p.theme.colors.accent};
        border-color: ${p =>
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
        width: 100%;
        top: 0;
        left: 0;
        border: none;
        border: 1px solid ${p.theme.colors.accent};
        &:hover {
        color: initial;
        background: initial;
        }
    `}
`;

const Error = styled.div`
  color: ${p => p.theme.colors.error};
  font-size: 14px;
  text-align: center;
  margin-top: 8px;

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
