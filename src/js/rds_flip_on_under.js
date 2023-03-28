const styleElements = document.getElementsByTagName('style');

// To load styles via <link> tag you could do:
// const customStyles = [...document.getElementsByTagName('link')].find(
//     (link) => link.getAttribute('href') === 'src/css/input.css'
// ).sheet;

/* Ps, doesn't this code look like a James Bond Gun? RevolverDS kills clean and simple too; it will look and filter for all values in your design system using BOUM-tokens that use ANY of the mentioned color-specs: hex, rgb, hsl, hsla, lch, oklch. If you don't have BOUM-tokens applied to your design tokens, I created a script to do just that; change all those --600 color-values to BOUM-values that make the magic happen. It's inside the same folder as this one; rds_ */
const variables = {};
for (const styleElement of styleElements) {
  if (styleElement.sheet) {
    for (const rule of styleElement.sheet.cssRules) {
      if (rule.style) {
        for (let i = 0; i < rule.style.length; i++) {
          const name = rule.style[i];
          const value = rule.style.getPropertyValue(name);
          if (name.indexOf('--') === 0) {
            const colorRegex = /^(#|(rgb|hsl|hsla|oklch|lch)a?)\(/i;
            if (colorRegex.test(value)) {
              variables[name] = value;
            }
          }
        }
      }
    }
  }
}

/* And then the magic happens; it will simply replace all the On and Under values from the Base by replacing the string of the variables themselves. So all values On the Base will be named Under the Base, and vice versa. */
const newVariables = {};
for (const name in variables) {
  const newName = name.replace('u', 'o');
  newVariables[newName] = variables[name];
}

/* Now that the heavy lifting is done with renaming the tokens, it's time to inject them as CSS variables again. Since variables are updated at runtime, you should be able to use this function gyromatically; it can be run more than once to achieve a certain desired effect (like animations) */
let cssString = '';
for (const name in newVariables) {
  cssString += `${name}: ${newVariables[name]};\n`;
}

const style = document.createElement('style');
style.innerHTML = `:root {\n${cssString}}`;

document.head.appendChild(style);