"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
self["webpackHotUpdate_N_E"]("pages/index",{

/***/ "(pages-dir-browser)/./src/components/header/TopControls.tsx":
/*!***********************************************!*\
  !*** ./src/components/header/TopControls.tsx ***!
  \***********************************************/
/***/ ((module, __webpack_exports__, __webpack_require__) => {

eval(__webpack_require__.ts("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   \"default\": () => (__WEBPACK_DEFAULT_EXPORT__)\n/* harmony export */ });\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! react/jsx-dev-runtime */ \"(pages-dir-browser)/./node_modules/react/jsx-dev-runtime.js\");\n/* harmony import */ var react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__);\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! react */ \"(pages-dir-browser)/./node_modules/react/index.js\");\n/* harmony import */ var react__WEBPACK_IMPORTED_MODULE_1___default = /*#__PURE__*/__webpack_require__.n(react__WEBPACK_IMPORTED_MODULE_1__);\n/* harmony import */ var next_navigation__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! next/navigation */ \"(pages-dir-browser)/./node_modules/next/navigation.js\");\n/* harmony import */ var next_navigation__WEBPACK_IMPORTED_MODULE_2___default = /*#__PURE__*/__webpack_require__.n(next_navigation__WEBPACK_IMPORTED_MODULE_2__);\n/* harmony import */ var _TopControls_module_css__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./TopControls.module.css */ \"(pages-dir-browser)/./src/components/header/TopControls.module.css\");\n/* harmony import */ var _TopControls_module_css__WEBPACK_IMPORTED_MODULE_3___default = /*#__PURE__*/__webpack_require__.n(_TopControls_module_css__WEBPACK_IMPORTED_MODULE_3__);\n/* __next_internal_client_entry_do_not_use__ default auto */ \nvar _s = $RefreshSig$();\n\n\n\nconst TopControls = (param)=>{\n    let { getApiData } = param;\n    _s();\n    const [query, setQuery] = (0,react__WEBPACK_IMPORTED_MODULE_1__.useState)('');\n    const router = (0,next_navigation__WEBPACK_IMPORTED_MODULE_2__.useRouter)();\n    const searchParams = (0,next_navigation__WEBPACK_IMPORTED_MODULE_2__.useSearchParams)();\n    const currentPage = parseInt(searchParams.get('page') || '1', 10);\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)({\n        \"TopControls.useEffect\": ()=>{\n            getApiData(searchQuery, currentPage);\n        }\n    }[\"TopControls.useEffect\"], [\n        currentPage,\n        getApiData\n    ]);\n    (0,react__WEBPACK_IMPORTED_MODULE_1__.useEffect)({\n        \"TopControls.useEffect\": ()=>{\n            const lastQuery = searchParams.get('search') || '';\n            setQuery(lastQuery);\n            getApiData(lastQuery); // ✅ Загружаем данные при первом рендере\n        }\n    }[\"TopControls.useEffect\"], []);\n    const handleSearch = ()=>{\n        if (query.trim() === '') return;\n        localStorage.setItem('lastSearch', query);\n        const params = new URLSearchParams(window.location.search);\n        params.set('search', query);\n        params.set('page', '1'); // ✅ Всегда сбрасываем на 1 страницу\n        params.delete('details'); // ✅ Удаляем детали\n        router.replace(\"?\".concat(params.toString())); // ✅ Заменяем URL и сразу обновляем Main.tsx\n    };\n    return /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n        className: (_TopControls_module_css__WEBPACK_IMPORTED_MODULE_3___default().container),\n        children: [\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"h2\", {\n                children: \"Top Controls\"\n            }, void 0, false, {\n                fileName: \"E:\\\\Rss_React\\\\rs-react-app\\\\src\\\\components\\\\header\\\\TopControls.tsx\",\n                lineNumber: 41,\n                columnNumber: 7\n            }, undefined),\n            /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"div\", {\n                className: (_TopControls_module_css__WEBPACK_IMPORTED_MODULE_3___default().topControls),\n                children: [\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"input\", {\n                        type: \"search\",\n                        value: query,\n                        onChange: (e)=>setQuery(e.target.value),\n                        placeholder: \"Search\",\n                        className: (_TopControls_module_css__WEBPACK_IMPORTED_MODULE_3___default().searchInput)\n                    }, void 0, false, {\n                        fileName: \"E:\\\\Rss_React\\\\rs-react-app\\\\src\\\\components\\\\header\\\\TopControls.tsx\",\n                        lineNumber: 43,\n                        columnNumber: 9\n                    }, undefined),\n                    /*#__PURE__*/ (0,react_jsx_dev_runtime__WEBPACK_IMPORTED_MODULE_0__.jsxDEV)(\"button\", {\n                        onClick: handleSearch,\n                        children: \"Search\"\n                    }, void 0, false, {\n                        fileName: \"E:\\\\Rss_React\\\\rs-react-app\\\\src\\\\components\\\\header\\\\TopControls.tsx\",\n                        lineNumber: 50,\n                        columnNumber: 9\n                    }, undefined)\n                ]\n            }, void 0, true, {\n                fileName: \"E:\\\\Rss_React\\\\rs-react-app\\\\src\\\\components\\\\header\\\\TopControls.tsx\",\n                lineNumber: 42,\n                columnNumber: 7\n            }, undefined)\n        ]\n    }, void 0, true, {\n        fileName: \"E:\\\\Rss_React\\\\rs-react-app\\\\src\\\\components\\\\header\\\\TopControls.tsx\",\n        lineNumber: 40,\n        columnNumber: 5\n    }, undefined);\n};\n_s(TopControls, \"uSDnvqyTHHheIX0stqZwnOwOvdY=\", false, function() {\n    return [\n        next_navigation__WEBPACK_IMPORTED_MODULE_2__.useRouter,\n        next_navigation__WEBPACK_IMPORTED_MODULE_2__.useSearchParams\n    ];\n});\n_c = TopControls;\n/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (TopControls);\nvar _c;\n$RefreshReg$(_c, \"TopControls\");\n\n\n;\n    // Wrapped in an IIFE to avoid polluting the global scope\n    ;\n    (function () {\n        var _a, _b;\n        // Legacy CSS implementations will `eval` browser code in a Node.js context\n        // to extract CSS. For backwards compatibility, we need to check we're in a\n        // browser context before continuing.\n        if (typeof self !== 'undefined' &&\n            // AMP / No-JS mode does not inject these helpers:\n            '$RefreshHelpers$' in self) {\n            // @ts-ignore __webpack_module__ is global\n            var currentExports = module.exports;\n            // @ts-ignore __webpack_module__ is global\n            var prevSignature = (_b = (_a = module.hot.data) === null || _a === void 0 ? void 0 : _a.prevSignature) !== null && _b !== void 0 ? _b : null;\n            // This cannot happen in MainTemplate because the exports mismatch between\n            // templating and execution.\n            self.$RefreshHelpers$.registerExportsForReactRefresh(currentExports, module.id);\n            // A module can be accepted automatically based on its exports, e.g. when\n            // it is a Refresh Boundary.\n            if (self.$RefreshHelpers$.isReactRefreshBoundary(currentExports)) {\n                // Save the previous exports signature on update so we can compare the boundary\n                // signatures. We avoid saving exports themselves since it causes memory leaks (https://github.com/vercel/next.js/pull/53797)\n                module.hot.dispose(function (data) {\n                    data.prevSignature =\n                        self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports);\n                });\n                // Unconditionally accept an update to this module, we'll check if it's\n                // still a Refresh Boundary later.\n                // @ts-ignore importMeta is replaced in the loader\n                module.hot.accept();\n                // This field is set when the previous version of this module was a\n                // Refresh Boundary, letting us know we need to check for invalidation or\n                // enqueue an update.\n                if (prevSignature !== null) {\n                    // A boundary can become ineligible if its exports are incompatible\n                    // with the previous exports.\n                    //\n                    // For example, if you add/remove/change exports, we'll want to\n                    // re-execute the importing modules, and force those components to\n                    // re-render. Similarly, if you convert a class component to a\n                    // function, we want to invalidate the boundary.\n                    if (self.$RefreshHelpers$.shouldInvalidateReactRefreshBoundary(prevSignature, self.$RefreshHelpers$.getRefreshBoundarySignature(currentExports))) {\n                        module.hot.invalidate();\n                    }\n                    else {\n                        self.$RefreshHelpers$.scheduleUpdate();\n                    }\n                }\n            }\n            else {\n                // Since we just executed the code for the module, it's possible that the\n                // new exports made it ineligible for being a boundary.\n                // We only care about the case when we were _previously_ a boundary,\n                // because we already accepted this update (accidental side effect).\n                var isNoLongerABoundary = prevSignature !== null;\n                if (isNoLongerABoundary) {\n                    module.hot.invalidate();\n                }\n            }\n        }\n    })();\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHBhZ2VzLWRpci1icm93c2VyKS8uL3NyYy9jb21wb25lbnRzL2hlYWRlci9Ub3BDb250cm9scy50c3giLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFDNEM7QUFDaUI7QUFDZjtBQU05QyxNQUFNSyxjQUFjO1FBQUMsRUFBRUMsVUFBVSxFQUFvQjs7SUFDbkQsTUFBTSxDQUFDQyxPQUFPQyxTQUFTLEdBQUdSLCtDQUFRQSxDQUFDO0lBQ25DLE1BQU1TLFNBQVNOLDBEQUFTQTtJQUN4QixNQUFNTyxlQUFlUixnRUFBZUE7SUFDcEMsTUFBTVMsY0FBY0MsU0FBU0YsYUFBYUcsR0FBRyxDQUFDLFdBQVcsS0FBSztJQUU5RFosZ0RBQVNBO2lDQUFDO1lBQ1JLLFdBQVdRLGFBQWFIO1FBQzFCO2dDQUFHO1FBQUNBO1FBQWFMO0tBQVc7SUFFNUJMLGdEQUFTQTtpQ0FBQztZQUNSLE1BQU1jLFlBQVlMLGFBQWFHLEdBQUcsQ0FBQyxhQUFhO1lBQ2hETCxTQUFTTztZQUNUVCxXQUFXUyxZQUFZLHdDQUF3QztRQUNqRTtnQ0FBRyxFQUFFO0lBRUwsTUFBTUMsZUFBZTtRQUNuQixJQUFJVCxNQUFNVSxJQUFJLE9BQU8sSUFBSTtRQUV6QkMsYUFBYUMsT0FBTyxDQUFDLGNBQWNaO1FBRW5DLE1BQU1hLFNBQVMsSUFBSUMsZ0JBQWdCQyxPQUFPQyxRQUFRLENBQUNDLE1BQU07UUFDekRKLE9BQU9LLEdBQUcsQ0FBQyxVQUFVbEI7UUFDckJhLE9BQU9LLEdBQUcsQ0FBQyxRQUFRLE1BQU0sb0NBQW9DO1FBQzdETCxPQUFPTSxNQUFNLENBQUMsWUFBWSxtQkFBbUI7UUFFN0NqQixPQUFPa0IsT0FBTyxDQUFDLElBQXNCLE9BQWxCUCxPQUFPUSxRQUFRLE1BQU8sNENBQTRDO0lBQ3ZGO0lBRUEscUJBQ0UsOERBQUNDO1FBQUlDLFdBQVcxQiwwRUFBZ0I7OzBCQUM5Qiw4REFBQzRCOzBCQUFHOzs7Ozs7MEJBQ0osOERBQUNIO2dCQUFJQyxXQUFXMUIsNEVBQWtCOztrQ0FDaEMsOERBQUM4Qjt3QkFDQ0MsTUFBSzt3QkFDTEMsT0FBTzdCO3dCQUNQOEIsVUFBVSxDQUFDQyxJQUFNOUIsU0FBUzhCLEVBQUVDLE1BQU0sQ0FBQ0gsS0FBSzt3QkFDeENJLGFBQVk7d0JBQ1pWLFdBQVcxQiw0RUFBa0I7Ozs7OztrQ0FFL0IsOERBQUNzQzt3QkFBT0MsU0FBUzNCO2tDQUFjOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFJdkM7R0E1Q01YOztRQUVXRixzREFBU0E7UUFDSEQsNERBQWVBOzs7S0FIaENHO0FBOENOLGlFQUFlQSxXQUFXQSxFQUFDIiwic291cmNlcyI6WyJFOlxcUnNzX1JlYWN0XFxycy1yZWFjdC1hcHBcXHNyY1xcY29tcG9uZW50c1xcaGVhZGVyXFxUb3BDb250cm9scy50c3giXSwic291cmNlc0NvbnRlbnQiOlsiJ3VzZSBjbGllbnQnO1xuaW1wb3J0IHsgdXNlU3RhdGUsIHVzZUVmZmVjdCB9IGZyb20gJ3JlYWN0JztcbmltcG9ydCB7IHVzZVNlYXJjaFBhcmFtcywgdXNlUm91dGVyIH0gZnJvbSAnbmV4dC9uYXZpZ2F0aW9uJztcbmltcG9ydCBzdHlsZXMgZnJvbSAnLi9Ub3BDb250cm9scy5tb2R1bGUuY3NzJztcblxuaW50ZXJmYWNlIFRvcENvbnRyb2xzUHJvcHMge1xuICBnZXRBcGlEYXRhOiAocXVlcnk6IHN0cmluZykgPT4gdm9pZDtcbn1cblxuY29uc3QgVG9wQ29udHJvbHMgPSAoeyBnZXRBcGlEYXRhIH06IFRvcENvbnRyb2xzUHJvcHMpID0+IHtcbiAgY29uc3QgW3F1ZXJ5LCBzZXRRdWVyeV0gPSB1c2VTdGF0ZSgnJyk7XG4gIGNvbnN0IHJvdXRlciA9IHVzZVJvdXRlcigpO1xuICBjb25zdCBzZWFyY2hQYXJhbXMgPSB1c2VTZWFyY2hQYXJhbXMoKTtcbiAgY29uc3QgY3VycmVudFBhZ2UgPSBwYXJzZUludChzZWFyY2hQYXJhbXMuZ2V0KCdwYWdlJykgfHwgJzEnLCAxMCk7XG5cbiAgdXNlRWZmZWN0KCgpID0+IHtcbiAgICBnZXRBcGlEYXRhKHNlYXJjaFF1ZXJ5LCBjdXJyZW50UGFnZSk7XG4gIH0sIFtjdXJyZW50UGFnZSwgZ2V0QXBpRGF0YV0pO1xuXG4gIHVzZUVmZmVjdCgoKSA9PiB7XG4gICAgY29uc3QgbGFzdFF1ZXJ5ID0gc2VhcmNoUGFyYW1zLmdldCgnc2VhcmNoJykgfHwgJyc7XG4gICAgc2V0UXVlcnkobGFzdFF1ZXJ5KTtcbiAgICBnZXRBcGlEYXRhKGxhc3RRdWVyeSk7IC8vIOKchSDQl9Cw0LPRgNGD0LbQsNC10Lwg0LTQsNC90L3Ri9C1INC/0YDQuCDQv9C10YDQstC+0Lwg0YDQtdC90LTQtdGA0LVcbiAgfSwgW10pO1xuXG4gIGNvbnN0IGhhbmRsZVNlYXJjaCA9ICgpID0+IHtcbiAgICBpZiAocXVlcnkudHJpbSgpID09PSAnJykgcmV0dXJuO1xuXG4gICAgbG9jYWxTdG9yYWdlLnNldEl0ZW0oJ2xhc3RTZWFyY2gnLCBxdWVyeSk7XG5cbiAgICBjb25zdCBwYXJhbXMgPSBuZXcgVVJMU2VhcmNoUGFyYW1zKHdpbmRvdy5sb2NhdGlvbi5zZWFyY2gpO1xuICAgIHBhcmFtcy5zZXQoJ3NlYXJjaCcsIHF1ZXJ5KTtcbiAgICBwYXJhbXMuc2V0KCdwYWdlJywgJzEnKTsgLy8g4pyFINCS0YHQtdCz0LTQsCDRgdCx0YDQsNGB0YvQstCw0LXQvCDQvdCwIDEg0YHRgtGA0LDQvdC40YbRg1xuICAgIHBhcmFtcy5kZWxldGUoJ2RldGFpbHMnKTsgLy8g4pyFINCj0LTQsNC70Y/QtdC8INC00LXRgtCw0LvQuFxuXG4gICAgcm91dGVyLnJlcGxhY2UoYD8ke3BhcmFtcy50b1N0cmluZygpfWApOyAvLyDinIUg0JfQsNC80LXQvdGP0LXQvCBVUkwg0Lgg0YHRgNCw0LfRgyDQvtCx0L3QvtCy0LvRj9C10LwgTWFpbi50c3hcbiAgfTtcblxuICByZXR1cm4gKFxuICAgIDxkaXYgY2xhc3NOYW1lPXtzdHlsZXMuY29udGFpbmVyfT5cbiAgICAgIDxoMj5Ub3AgQ29udHJvbHM8L2gyPlxuICAgICAgPGRpdiBjbGFzc05hbWU9e3N0eWxlcy50b3BDb250cm9sc30+XG4gICAgICAgIDxpbnB1dFxuICAgICAgICAgIHR5cGU9XCJzZWFyY2hcIlxuICAgICAgICAgIHZhbHVlPXtxdWVyeX1cbiAgICAgICAgICBvbkNoYW5nZT17KGUpID0+IHNldFF1ZXJ5KGUudGFyZ2V0LnZhbHVlKX1cbiAgICAgICAgICBwbGFjZWhvbGRlcj1cIlNlYXJjaFwiXG4gICAgICAgICAgY2xhc3NOYW1lPXtzdHlsZXMuc2VhcmNoSW5wdXR9XG4gICAgICAgIC8+XG4gICAgICAgIDxidXR0b24gb25DbGljaz17aGFuZGxlU2VhcmNofT5TZWFyY2g8L2J1dHRvbj5cbiAgICAgIDwvZGl2PlxuICAgIDwvZGl2PlxuICApO1xufTtcblxuZXhwb3J0IGRlZmF1bHQgVG9wQ29udHJvbHM7XG4iXSwibmFtZXMiOlsidXNlU3RhdGUiLCJ1c2VFZmZlY3QiLCJ1c2VTZWFyY2hQYXJhbXMiLCJ1c2VSb3V0ZXIiLCJzdHlsZXMiLCJUb3BDb250cm9scyIsImdldEFwaURhdGEiLCJxdWVyeSIsInNldFF1ZXJ5Iiwicm91dGVyIiwic2VhcmNoUGFyYW1zIiwiY3VycmVudFBhZ2UiLCJwYXJzZUludCIsImdldCIsInNlYXJjaFF1ZXJ5IiwibGFzdFF1ZXJ5IiwiaGFuZGxlU2VhcmNoIiwidHJpbSIsImxvY2FsU3RvcmFnZSIsInNldEl0ZW0iLCJwYXJhbXMiLCJVUkxTZWFyY2hQYXJhbXMiLCJ3aW5kb3ciLCJsb2NhdGlvbiIsInNlYXJjaCIsInNldCIsImRlbGV0ZSIsInJlcGxhY2UiLCJ0b1N0cmluZyIsImRpdiIsImNsYXNzTmFtZSIsImNvbnRhaW5lciIsImgyIiwidG9wQ29udHJvbHMiLCJpbnB1dCIsInR5cGUiLCJ2YWx1ZSIsIm9uQ2hhbmdlIiwiZSIsInRhcmdldCIsInBsYWNlaG9sZGVyIiwic2VhcmNoSW5wdXQiLCJidXR0b24iLCJvbkNsaWNrIl0sImlnbm9yZUxpc3QiOltdLCJzb3VyY2VSb290IjoiIn0=\n//# sourceURL=webpack-internal:///(pages-dir-browser)/./src/components/header/TopControls.tsx\n"));

/***/ })

});