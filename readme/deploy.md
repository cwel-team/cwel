# Deploy

As an open source project we need the ability to update our code and docs continuously as we create new content. To do this we deploy the latest code release to our [npm package](https://www.npmjs.com/package/cwel) and the most recent docs to our [Github pages site](https://cwel-team.github.io/cwel/#!/).

## Deploy to npm

As a prerequisite you will need to login with an account that is a collaborator of the CWEL porject in npm. I would suggest using the [countrywide account](https://www.npmjs.com/~countrywide). Details for the account can be found on our password system. You can login via the console using `npm login` and check you are on the correct account by using `npm whoami`.

1. Create or checkout the release branch
2. Build the project with `gulp cwel:build`
3. Pack the require items to go into npm with `gulp cwel:pack`
4. Publish to npm with `npm publish tmp/package`

## Deploy docs

You will need to deploy from the most up to date branch. Keep in mind this might not be develop or release.

1. Checkout the most up to date branch
2. Build the docs with `docs:build`
3. Copy docs to dist with `cp -r tmp/docs dist`
4. Commit and push the new dist files
5. Deploy docs with `npm run docs deploy`

Please allow for some down time before you changes can be seen.
