// components/RivePlayer.tsx
'use client'; // Important if you're using Next.js App Router

import { useRive } from '@rive-app/react-webgl2';

export default function RiveTest() {
    const { RiveComponent } = useRive({
        src: 'logo-slide.riv',
        autoplay: true,
    });

    return (
        <div style={{ width: 350, height: 280 }}>
            <RiveComponent />
        </div>
    );
}
