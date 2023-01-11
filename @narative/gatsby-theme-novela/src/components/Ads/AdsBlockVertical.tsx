import React from 'react'
import AdSense from 'react-adsense'
import styled from '@emotion/styled';

const AdBlockVertical = () => (
    <AdWrapper>
        <AdSense.Google
            client="ca-pub-7215147017121179"
            slot="8900982984"
            style={{ display: 'block' }}
            format="auto"
            responsive="true"
            />
    </AdWrapper>
)

export default AdBlockVertical

const AdWrapper = styled.div`
    margin-top: 40px;
    border-radius: 8px;
    background-color: ${p => p.theme.colors.card};
`;

