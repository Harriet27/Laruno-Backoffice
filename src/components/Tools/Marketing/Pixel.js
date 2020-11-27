import React from 'react';
import { Input } from '../../../elements/Styled/StyledTabs';
import Styled from 'styled-components';

const Wraps = Styled.div`
width: 100%;
margin-bottom: 10px;
`;
export default function Pixel() {
  return (
    <section>
      <Wraps>
        <div style={Styles.FlexRow}>
          <span style={Styles.SpanLabel}>FB Pixel</span>
          <Input
            style={{ width: '80%' }}
            type="text"
            name="fb-pixel"
            id="fb-pixel"
          />
        </div>
      </Wraps>
      <Wraps>
        <div style={Styles.FlexRow}>
          <span style={Styles.SpanLabel}>Tiktok Pixel</span>
          <Input
            style={{ width: '80%' }}
            type="text"
            name="tiktok-pixel"
            id="tiktok-pixel"
          />
        </div>
      </Wraps>
      <Wraps>
        <div style={Styles.FlexRow}>
          <span style={Styles.SpanLabel}>Google Tag Manager</span>
          <Input
            style={{ width: '80%' }}
            type="text"
            name="google-tag-manager"
            id="google-tag-manager"
          />
        </div>
      </Wraps>
      <div style={{ textAlign: 'right', marginTop: '10px' }}>
        <button style={Styles.isSave}>Save</button>
      </div>
    </section>
  );
}

const Styles = {
  FlexRow: { display: 'flex', flexDirection: 'row' },
  SpanLabel: { marginRight: '10px', width: '20%' },
  isSave: {
    background: '#70CA63',
    border: 'none',
    borderRadius: '5%',
    padding: '5px 10px',
    fontWeight: '500',
    color: 'white',
  },
};
