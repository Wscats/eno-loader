const compileStyle = require('../styles/index')
const compileScript = (sourceObj) => {
    const omi = sourceObj.source
    const {
        style,
        isExistStyle,
        styleLang
    } = compileStyle(sourceObj)
    
    const scriptInTag = (() => {
        // match some content like <script>xxx</script>
        let isExistScript = omi.match(/<script[^>]*>[\s\S]*?<\/script>/g)
        // judge <script> whether exist or not
        if (isExistScript) {
            return isExistScript[0]
        } else {
            return '<script>module.exports={}</script>'
        }
    })()
    let script = (
        // clear tag which is <script> and </script>
        scriptInTag
        .replace(/<script[^>]*>|<\/script>/g, '')
    )
    const styleInScript = (() => {
        // if css(){} in script , we should combine style and css functuon
        script =  script.replace(/css\s*\([^\)]*\)\s*\{[\s\S]*return([\s\S]*)/g, `css(){return ${'`'}${style}${'`'}+$1`)
        return script
    })()
    const scriptLang = (() => {
        if (scriptInTag) {
            return scriptInTag
                .match(/<script[^>]*>/g)[0]
                .replace(/<script\s+lang=["']([^>]*)["']\s*>/g, '$1')
        }
    })()
    return {
        isExistScript: scriptInTag ? true : false,
        scriptLang,
        script,
        style,
        isExistStyle,
        styleLang
    };
}

module.exports = compileScript