const args = process.argv.slice(2);
squareOfHash(args[0]);

function squareOfHash(num) {
    if (num >= 1 && num <= 10) {
        console.log('Output:');
        for (let i = 0; i < num; i++) {
            console.log('#'.repeat(num));
        }
    } else {
        console.log('Error');
    }
}
