# Install

> Webpack loader for Omi Single-File Components

You can use [npm](https://www.npmjs.com/package/omil) install or [git](https://github.com/Wscats/omil) clone it.
```bash
npm install omil --save-dev
# or
npm install eno-loader --save-dev
```
Configuration webpack file like this:
```js
module: {
    rules: [{
        test: /\.omi|eno$/,
        use: [{
            loader: require.resolve('omil'),
            options: {
                // Use in development, You should remove in production
                sourceMaps: 'both' 
            }
        }],
        // Or you can use eno-loader
        // use: ['eno-loader']
        // use: ['omil']
    }]
}
```
> [Loader Demo](https://wscats.github.io/omil/dist)

## Why Eno Loader?

`omil` is a loader for [webpack](https://webpack.js.org/) that allows you to author Omi components in a format called Single-File Components

## Usage

A `*.omi` file is a custom file format that uses HTML-like syntax to describe a Omi component. Each `*.omi` file consists of three types of top-level language blocks: `<template>, <script>, and <style>`, and optionally additional custom blocks:

```html
<template lang="html">
  <!-- replace render function -->
  <header onClick="${this.test}">${this.data.title}</header>
</template>
<script>
import style from './_oHeader.css'
export default {
  static css() {
    return style // it will combine scoped css
  }
  test(){
    console.log('Hello Eno!')
  }
  install() {
    this.data = {
      title: 'Omi'
    }
  }
}
</script>
<style>
/* scoped css */
header {
  height: 50px;
  background-color: #07c160;
  color: white;
  text-align: center;
  line-height: 50px;
  width: 100%;
}
</style>
```
> [Single-File Components Demo](https://github.com/Wscats/omil/blob/master/src/components/oHeader.omi)

It also supports [JSX](https://github.com/facebook/jsx), if you want to do that, you only write `<template>` without `lang="html"` attribute in your component like this:
```html
<template>
  <header onClick={this.test}>{this.data.title}</header>
</template>
```
> [JSX Demo](https://github.com/Wscats/omil/blob/master/src/components/oPanel.omi)

`omil` supports using non-default languages, such as CSS pre-processors and compile-to-HTML template languages, by specifying the lang attribute for a language block. For example, you install [node-sass](https://www.npmjs.com/package/node-sass) after you can use [Sass](https://sass-lang.com/) for the style of your component like this:
```html
<style lang="scss">
$height: 50px;
$color: #07c160;
header {
  height: $height;
  background-color: $color;
}
</style>
```

> [Sass Demo](https://github.com/Wscats/omil/blob/master/src/components/oGallery.omi)

There are many cool features provided by `omil`:

- Allows using other webpack loaders for each part of a Omi component, for example Sass for `<style lang="scss">` and JSX/HTML for `<template lang="html">`;
- Allows custom blocks in a `.omi` or `.eno` file that can have custom loader chains applied to them [Here Online Demo](https://github.com/Wscats/omil/tree/master/src/components);
- Treat static assets referenced in `<style>` and `<template>` as module dependencies and handle them with webpack loaders (Such as [htm](https://www.npmjs.com/package/htm), [to-string-loader](https://www.npmjs.com/package/to-string-loader));
- Simulate scoped CSS for each component (Use Shadow DOM);
- State-preserving hot-reloading during development.

In a nutshell, the combination of webpack and `omil` gives you a modern, flexible and extremely powerful front-end workflow for authoring Omi.js applications.

## Thanks

* [omi](https://github.com/Tencent/omi)
* [htm](https://github.com/developit/htm)
* [preact](https://github.com/developit/preact)
* [node-sass](https://github.com/sass/node-sass)
* [vue-loader](https://github.com/vuejs/vue-loader)


## License

MIT
