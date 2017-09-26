module.exports = {
    'extends': 'airbnb-base',
    'rules': {
        'linebreak-style': 'off',
        'indent': [ 'error', 4 , { MemberExpression: 0 } ],
        'arrow-body-style': [ 'off' ],
        'no-param-reassign': [ 'off' ],
        'unicode-bom':  'off',
        'no-console':  'off',
        'import/no-extraneous-dependencies': 'off' // turned off as all our require statements are used for dev tasks
    },
    'globals': {
        'angular': false,
        'it': false,
        'describe': false,
        'beforeEach': false,
        'afterEach': false,
        'inject': false,
        'jasmine': false,
        'expect': false,
        'browser': false,
        'by': false,
        'element':  false,
        'document': false,
        'window': false,
        'viewport': false,
    }
};
