import dynamic from "next/dynamic";

// Load client-side only: react-qr-code's ESM build does a bare
// `import "qr.js/lib/ErrorCorrectLevel"` (no extension) that Node's strict
// ESM loader rejects during Next's SSR page-data collection. The QR value
// depends on window.location anyway, so it is genuinely client-only.
const QRCode = dynamic(() => import("react-qr-code"), { ssr: false });

export default function QRCodeClient({ playStoreLink, appStoreLink, size = 200 }) {
    // Create redirect URL with query parameters for server-side detection
    const redirectPath = `/app-redirect?playStore=${encodeURIComponent(
        playStoreLink || ''
    )}&appStore=${encodeURIComponent(appStoreLink || '')}`;

    // Use the current domain for the QR code URL, fallback to hardcoded for SSR
    const redirectUrl = typeof window !== 'undefined'
        ? `${window.location.origin}${redirectPath}`
        : `window.location.origin${redirectPath}`;

    return (
        <div style={{ padding: 10, background: "white", display: "inline-block", border: "1px solid ", borderRadius: "10px", }}>
            <QRCode value={redirectUrl} size={size} />
        </div>
    );
}