import React from 'react';
import styled from '@emotion/styled';
import { Link } from "gatsby";
import { graphql, useStaticQuery } from "gatsby";

import Headings from '@components/Headings';
import Image from '@components/Image';

import mediaqueries from '@styles/media';

const image = '/sakura.jpg';

const siteQuery = graphql`
{
  allArticle(limit: 1, sort: {order: DESC, fields: date}) {
    edges {
      node {
        title
        date(formatString: "DD MMMM")
        slug
      }
    }
  }
}`;


const Testimonial: React.FC<{}> = () => {

  const result = useStaticQuery(siteQuery).allArticle.edges[0].node;

  return (
    <GridContainer>
			<TestiContainer>
				<Quote>
					“Trong is passionate, hard working and quick to learn. One of his greatest strengths is his communication skills.  A great team player and a fun guy to have in our office.”
				</Quote>
				<AuthorImage><Image src={image} /></AuthorImage>
				<AuthorName>Sakura Komuro,</AuthorName>
				<AuthorName>Founder at Code Engine Studio</AuthorName>
			</TestiContainer>

			<Separator/>

			<WriteContainer>
				<WriteTitle>
					Writing is designing.
				</WriteTitle>
				<Text>
					Because without words, apps would be an unusable jumble of shapes and icons. And more importantly, I write to get ideas, to inspire myself and to learn something new.
				</Text>
        <LatestArticle to={result.slug} title={result.title}>
          <ArticleDate>Latest article - {result.date}</ArticleDate>
          <ArticleTitle>{result.title}</ArticleTitle>

        </LatestArticle>
				{/* <ViewLink to={`/writing`} title={`See all articles`}>
					View all articles →
				</ViewLink> */}
			</WriteContainer>
    </GridContainer>
  );
};

export default Testimonial;

const GridContainer = styled.div`
	position: relative;
	display: grid;
	z-index: 1;
	grid-template-columns: 1fr 16px 1fr;
	column-gap: 48px;
	row-gap: 128px;
	margin-top: 128px;
	margin-bottom: 128px;
	color: ${p => p.theme.colors.secondary};
	
	${mediaqueries.tablet`
		grid-template-columns: 1fr;
  `}

`;

const TestiContainer = styled.div`
	text-align: right;
	display: grid;
`;

const Quote = styled(Headings.h3)`
	color: ${p => p.theme.colors.secondary};
`;

const AuthorImage = styled.div`
	width: 64px;
	height: 64px;
	margin-top: 24px;
	margin-bottom: 16px;
	display: block;
	justify-self: end;

	img {
		width: 100%;
		height: 100%;
		object-fit: cover;
		object-position: center;
		border-radius: 100%;
	}
`;

const AuthorName = styled.p`
	font-size: 16px;
	margin-bottom: 4px;
`;

const WriteContainer = styled.div`

`;

const Text = styled.p`
	margin-bottom: 16px;
	font-size: 18px;
	line-height: 1.5;
`;

const Separator = styled.div`
	background-image: url("/separator-vertical.svg");
	background-repeat: no-repeat;
	background-position: center top;

	${mediaqueries.tablet`
		display: none;
  `}
`;

const WriteTitle = styled(Headings.h2)`
	color: ${p => p.theme.colors.secondary};
	margin-bottom: 16px;
`;

const LatestArticle = styled(Link)`
  margin-top: 40px;
  display: block;
`;

const ArticleDate = styled.div`
  font-family: ${p => p.theme.fonts.title};
  font-size: 12px;
  text-transform: uppercase;
  margin-bottom: 8px;
  color: ${p => p.theme.colors.grey};
`;

const ArticleTitle = styled(Headings.h3)`
	color: ${p => p.theme.colors.secondary};
  margin-bottom: 16px;
  text-decoration: underline;
`;

const ViewLink = styled(Link)`
  font-weight: ${p => p.theme.fontsWeight.bold};
  font-family: ${p => p.theme.fonts.title};
  font-size: 14px;
  color: ${p => p.theme.colors.secondary};
  transition: color 0.25s var(--ease-in-out-quad);
  display: inline-block;
	position: relative;
	margin-top: 24px;

  &::after {
    background: none repeat scroll 0 0 transparent;
    bottom: -8px;
    content: "";
    display: block;
    height: 2px;
    left: 0;
    position: absolute;
    background: ${p => p.theme.colors.accent};
    transition: width 0.25s ease 0s, left 0.25s ease 0s;
    width: 0;
  }

  &:hover {
    color: ${p => p.theme.colors.accent};

    &::after {
      width: 100%; 
      left: 0; 
    }
  }
`;