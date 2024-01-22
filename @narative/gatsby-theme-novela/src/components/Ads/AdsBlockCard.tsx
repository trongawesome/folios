import React from 'react'
import AdSense from 'react-adsense'
import styled from '@emotion/styled';
import Headings from '@components/Headings';
import mediaqueries from '@styles/media';

const AdsBlockCard = () => (
    <AdsContainer>
        <RowTitle>
            <Title>
              Sponsor
            </Title>
            <MetaData>
                Brought to you by
            </MetaData>
          </RowTitle>
        <AdsWrapper>
            <AdSense.Google
                client="ca-pub-7215147017121179"
                slot="8900982984"
                style={{ display: 'block' }}
                format="auto"
                responsive="true"
                />
        </AdsWrapper>
    </AdsContainer>
)

export default AdsBlockCard

const AdsContainer = styled.div`

`;

const AdsWrapper = styled.div`
    border-radius: 12px;
    background-color: ${p => p.theme.colors.card};
    min-height: 250px;
    // grid-column: span 2;

    ${mediaqueries.tablet`
        border-radius: 0;
    `}

    & .adsbygoogle {
        margin-bottom: 2px;
    }
`;

const RowTitle = styled.div`
  position: relative;
  display: grid;
  grid-template-columns: 1fr;
  align-items: start;
  justify-content: space-between;
  margin-bottom: 24px;

  ${mediaqueries.tablet`
    grid-template-columns: 1fr;
    padding: 0 16px;
  `}
`;

const Title = styled(Headings.h2)`
  font-size: 36px;
  line-height: 48px;
  font-family: ${p => p.theme.fonts.title};
  letter-spacing: -2px;
  transition: color 0.3s ease-in-out;
  color: ${p => p.theme.colors.primary};
  margin-bottom: 8px;
  word-break: break-all;

  ${mediaqueries.tablet`
    font-size: 52px;
    line-height: 60px;
  `}

`;

const MetaData = styled(Headings.h6)`
  color: ${p => p.theme.colors.secondary};
  font-family: ${p => p.theme.fonts.body};
  font-size: 16px;
`;
