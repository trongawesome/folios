import React from 'react';
import styled from '@emotion/styled';
import { Link } from "gatsby";

import Headings from '@components/Headings';
import Section from "@components/Section";
import Image, { ImagePlaceholder } from '@components/Image';
import SocialLinks from "@components/SocialLinks";

import mediaqueries from '@styles/media';
import { IAuthor } from "@types";



interface AuthorProps {
  authors: IAuthor[];
}

const AuthorsList: React.FC<AuthorProps> = ({ authors }) => {

  return (
    <Section narrow>
      <AuthorsContainer>
        {authors.map((author, index) => (
          <AuthorWrap style={{ left: `${index * 15}px` }} key={author.name}>
            <ImageContainer>
              <Image src={author.avatar.large} />
            </ImageContainer>
            <Info>
              <Bio>{author.bio}</Bio>
              <LinkInternal to={`/writing`} title={`All articles`}>
                View all writing →
              </LinkInternal>
            </Info>
          </AuthorWrap>
        ))}
      </AuthorsContainer>
    </Section>
  );
};

export default AuthorsList;

const AuthorsContainer = styled.div`
  margin: 0 auto;
  width: 100%;
  max-width: 680px;
  color: ${p => p.theme.colors.secondary};
  border-top: solid 1px ${p => p.theme.colors.horizontalRule};
  padding: 64px 0;

  ${mediaqueries.desktop`
    max-width: 507px;
  `}

  ${mediaqueries.tablet`
    max-width: 486px;
  `};

`;

const AuthorWrap = styled.div`
  display: grid;
  grid-gap: 32px;
  position: relative;
  grid-template-columns: 160px 1fr;
  
  ${mediaqueries.tablet`
    grid-template-columns: 1fr;
  `};
`;

const ImageContainer = styled.div`
  position: relative;
  border-radius: 50%;
  width: 160px;
  height: 160px;
  overflow: hidden;
  justify-self: center;

`;

const Info = styled.div`

`;

const LinkInternal = styled(Link)`
  font-weight: ${p => p.theme.fontsWeight.bold};
  font-family: ${p => p.theme.fonts.title};
  font-size: 20px;
  color: ${p => p.theme.colors.secondary};
  transition: color 0.2s var(--ease-in-out-quad);
  display: inline-block;
  position: relative;
  text-decoration: underline;

  &:hover {
    color: ${p => p.theme.colors.accent};
  }
`;

const Bio = styled.div`
  font-size: 20px;
  font-family: ${p => p.theme.fonts.body};
  color: ${p => p.theme.colors.secondary};
  margin-bottom: 24px;
  font-weight: ${p => p.theme.fontsWeight.light};
  line-height: 1.5;
`;
