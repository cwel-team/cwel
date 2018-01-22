const { spawn } = require('child_process');

if (process.env.NODE_ENV === 'production') {
    console.log('no need for postinstall script in production');
} else {
    const proc = spawn('node', [
        'node_modules\\protractor\\node_modules\\webdriver-manager\\bin\\webdriver-manager',
        'update',
        '--versions.standalone=3.5.3',
    ]);

    proc.stdout.pipe(process.stdout);
    proc.stderr.pipe(process.stderr);
}
