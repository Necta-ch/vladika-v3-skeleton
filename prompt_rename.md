## Task
Rename all occurrences of 'Investment Tiers' to 'Subscriptions' throughout the Stratton Capital website.

## Context
The project is a React/Vite application. The term 'Investment Tiers' is used in the navigation, routes, page names, and localization files. 
Key files to update:
- src/locales/en.json and src/locales/de.json
- src/pages/InvestmentTiers.jsx (should be renamed to src/pages/Subscriptions.jsx)
- src/App.jsx (routing)
- src/components/Layout.jsx and src/components/Footer.jsx (links)
- src/context/AuthContext.jsx (internal logic refers to tiers)

## Requirements
1.  Rename 'Investment Tiers' to 'Subscriptions' in all user-facing text (English and German).
2.  Update the URL path from /tiers to /subscriptions.
3.  Rename the file src/pages/InvestmentTiers.jsx to src/pages/Subscriptions.jsx and update the component name accordingly.
4.  Ensure all internal links and references are updated to maintain functionality.
5.  Update any variable names or logic in AuthContext.jsx that refer to 'tier' if it makes sense, but prioritize user-facing changes.

## Constraints
- Do NOT break the existing layout.
- Maintain existing localization patterns in src/locales.
- Ensure the German translation is accurate.

## Success Criteria
- The URL /subscriptions works and loads the updated Subscriptions page.
- The term 'Investment Tiers' no longer appears in the UI.
- All navigation links work correctly.