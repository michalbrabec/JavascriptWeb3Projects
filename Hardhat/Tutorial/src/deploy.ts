
async function main(): Promise<number> {
    return 0
}

main()
.then((result: number) => process.exit(result))
.catch(error => {
    console.log(`Error - ${error}`)
    process.exit(1)
})