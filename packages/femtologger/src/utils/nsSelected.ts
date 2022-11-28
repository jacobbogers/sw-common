export default function isNSSelected(ns: string | null | undefined, pattern: string | null | undefined): boolean {
    if (typeof ns !== 'string' || typeof pattern !== 'string' || ns.trim() === '' || pattern.trim() === '') {
        return false;
    }
    // TODO: rules to match namespaces
    // for now only return true (all ns are enabled)
    // 1. wildcard '*' everything is allowed
    // 2. comma separated list (can contain wildcards)
    // 2. prefix '-' means NOT equal to specified patter

    // scan for cvs list (no commas means 1 item)
    //   list: "-*, hello-word" -> means  disable everything (?) and allow for hello world, means don't show anything 
    //  data* -> compiles to /^data.*$/
    //  hello Mr *, how are you -> compiles to /^hello Mr .*, how are you$/
    //  -hello* -> compiles to /^hello.*$/ but should match negatively 

    return true;
}