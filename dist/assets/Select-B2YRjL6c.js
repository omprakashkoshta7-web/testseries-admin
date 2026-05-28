import{b7 as e,C as c}from"./index-3_JhGipG.js";const i=({label:s,error:a,options:l,fullWidth:n=!0,className:d="",...t})=>e.jsxs("div",{className:n?"w-full":"",children:[s&&e.jsxs("label",{className:"block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1.5",children:[s,t.required&&e.jsx("span",{className:"text-red-500 ml-1",children:"*"})]}),e.jsxs("div",{className:"relative",children:[e.jsx("select",{className:`
            w-full px-4 py-2.5 appearance-none bg-white dark:bg-gray-800 border rounded-xl text-sm
            text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent
            ${a?"border-red-500":"border-gray-200 dark:border-gray-700"}
            ${d}
          `,...t,children:l.map(r=>e.jsx("option",{value:r.value,children:r.label},r.id||r.value))}),e.jsx(c,{className:"absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none"})]}),a&&e.jsx("p",{className:"text-sm text-red-500 mt-1",children:a})]});export{i as S};
