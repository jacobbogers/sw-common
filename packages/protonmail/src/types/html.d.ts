declare namespace svelteHTML {
    interface IntrinsicElements {
        meta: {
            'http-equiv'?:
            | 'content-security-policy'
            | 'content-type'
            | 'default-style'
            | 'refresh'
            | 'x-ua-compatible'
            | 'x-dns-prefetch-control'; // 👈 your custom value
            content?: string;
            name?: string;
            charset?: string;
        } & Record<string, unknown>; // optional: allow other props like id/class
    }
}