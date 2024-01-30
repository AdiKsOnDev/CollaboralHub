# JavaScript Coding Conventions
This is a file that briefly describes the coding conventions and rules used in the project. Follow these conventions at ALL times.

## 1. Imports
- Import statements are at the top of the file.
- Named imports are used for React hooks and components.
- Default imports are used for modules.
- Seperate the library imports from components

```js
// Libraries
import React, { useState } from 'react';

// Components
import ComponentName from 'path/to/component';
```

## 2. Component Definition
- Functional components are used, defined with arrow functions.
- Components will have their own file with the same name.
- Export is at the end of the file.
```js
// 'ComponentName.js' file
const ComponentName = () => {
    // Component Logic
};

// End of File
export default ComponentName;
```

## 3. State Management
- React's `useState()` hook is used for state management.
- Most things that are expected to update during the workflow will use this state.
```js
const [formData, setFormData] = useState({
  email: '',
  password: '',
  passwordConfirm: '',
  error: '',
});
```

## 4. Indentation 
- Use 2 space indentation in your `.js` files
- Seperate `jsx` into blocks that will make sense
- Check other files to understand it better. (Pay attention to the empty lines between the code)
- Example:
```js
return (
    <div>
        // Header Component
        <Header />

        // First article
        <article>
            // Heading

            // Paragraph
        </article>

        // Second article
        <article>
            // Heading

            // Paragraph
        </article>
    </div>
)
```
- Notice how I am adding an empty space between the blocks of code

## 5. TailwindCSS
- Use **tailwind** for styling. 
- You can add your own styles in `index.css`, but only if neccessary

## 6. Comments
- One liners to explain code that might not be straightforward **(Don't comment EVERYTHING)**
- **DocStrings** for components that have *props*

## 7. Variable Naming
- Use `camelCase`
- Make it make sense.

## 8. DO NOT
- Repeat code
- Write code that is unreadable
- Add blank spaces for no reason
- Use `var` keyword (Use `let` or `const` instead)
- Abbreviate variable names. I want all of you guys to name your variables in a way that it makes SENSE.
    - Refer this helpful video: https://www.youtube.com/watch?v=-J3wNP6u5YU&t=86s  
