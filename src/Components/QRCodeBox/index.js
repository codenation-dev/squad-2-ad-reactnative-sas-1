import React from 'react';
import QRCode from 'react-native-qrcode-svg';
import {Container} from './styles';

export default function QRCodeBox({profile_url}) {
  return (
    <Container>
      <QRCode
        // QR code value
        value={profile_url}
        // size of QR Code
        size={250}
        // Color of the QR Code (Optional)
        color="black"
        // Background Color of the QR Code (Optional)
        backgroundColor="white"
        // Center Logo size  (Optional)
        logoSize={30}
        // Center Logo margin (Optional)
        logoMargin={2}
        // Center Logo radius (Optional)
        logoBorderRadius={15}
        // Center Logo background (Optional)
        logoBackgroundColor="yellow"
      />
    </Container>
  );
}
