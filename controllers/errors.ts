export function data404Error(pkmnName):string {
    return `[PokeDex]: Ash ${pkmnName} Doesn't exist`;
}

export function data500Error(pkmnName):string {
    return `[PokeDex]: Ash I'm unable to search the database for ${pkmnName}`;
}

export function evolution404Error(pkmnName):string {
    return `[PokeDex]: Ash there is no Evolution data for ${pkmnName}`;
}

export function evolution500Error(pkmnName):string {
    return `[PokeDex]: Ash I'm unable to search for the Evolution Data in the Database for ${pkmnName}`;
}