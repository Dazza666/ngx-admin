export class PgnRouting {

    ROUTE_PGN127250: number = 0x00000001;
    ROUTE_PGN128259: number = 0x00000002;
    ROUTE_PGN128267: number = 0x00000004;
    ROUTE_PGN130306: number = 0x00000008;
    ROUTE_PGN128275: number = 0x00000010;
    ROUTE_PGN130577: number = 0x00000020;
    ROUTE_PGN130578: number = 0x00000040;
    ROUTE_PGN130310: number = 0x00000080;
    ROUTE_PGN130311: number = 0x00000100;
    ROUTE_PGN130312: number = 0x00000200;
    ROUTE_PGN130316: number = 0x00000400;
    myMap: Map<String, number>
    
    constructor(
        public bitField: number,
    ) {
        this.myMap = new Map([
            ["127250(heading)", this.ROUTE_PGN127250],
            ["128259(speed)", this.ROUTE_PGN128259],
            ["128267(water)", this.ROUTE_PGN128267],
            ["130306(wind)", this.ROUTE_PGN130306],
            ["128275(log)", this.ROUTE_PGN128275],
            ["130577(Direction)", this.ROUTE_PGN130577],
            ["130578(Speed Components)", this.ROUTE_PGN130578],
            ["130310(Environmental)", this.ROUTE_PGN130310],
            ["130311(Environmental)", this.ROUTE_PGN130311],
            ["130312(Temperature)", this.ROUTE_PGN130312],
            ["130316(Temperature)", this.ROUTE_PGN130316],
        ]); 
    }

    getActive(): String {
        let Result = "";
        this.myMap.forEach((value: number, key: string) => {
            if (this.isSet(value)) {
                Result+= key + " | ";
            }
        });
        return Result;
    }

    getInactive(): String {
        let Result = "";
        this.myMap.forEach((value: number, key: string) => {
            if (!this.isSet(value)) {
                Result+= key + " | ";
            }
        });
        return Result;
    }

    isSet(value): boolean {
        return (this.bitField & value) == value;
    }

    static init(bitField): PgnRouting {
        debugger;
        return new PgnRouting(
            bitField
        );
    }

}
