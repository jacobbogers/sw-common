// any xyz.d.ts under /src will be added by tsconfig because it is accessible via "include"
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