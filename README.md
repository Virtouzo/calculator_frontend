# Prerequisites

yarn or npm install

# Commands

* **Test:** npm run test
* **Production webpack server:** npm run prod-front (localhost:8080)
* **Production build static files:** npm run build
* **Development with HMR:** npm run dev-front-hmr

# Comments

* I was not really sure, if I am allowed to develop this as a monorepo, so I have a few comments to add. Usually, I would choose monorepo strategy and reuse some parts of the code, that overlap between front-end and back-end, for example the `exprOperationsToExpr` function, the `Action` enum and etc.
* Custom webpack configuration is used, to have full control, instead of react-create-app.
