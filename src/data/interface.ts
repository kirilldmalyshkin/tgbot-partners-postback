interface Greeting {
    text: string;
    imageUrl: string;
}

interface Registration {
    text: string;
    imageUrl: string;
}

interface Instructions {
    text: string;
}

export interface ContentStructure {
    en: {
        greeting: Greeting;
        registration: Registration;
        instructions: Instructions;
    };
    ru: {
        greeting: Greeting;
        registration: Registration;
        instructions: Instructions;
    };
}



// export interface ContentStructure {
//     en: Record<string, any>,
//     ru: Record<string, any>,
// }