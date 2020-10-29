export class N2k {

    WIFI_SEND_HDT: number = 0x00000001;
    WIFI_SEND_HDG: number = 0x00000002;
    WIFI_SEND_THS: number = 0x00000004;
    WIFI_SEND_VHW: number = 0x00000008;
    WIFI_SEND_DBT: number = 0x00000010;
    WIFI_SEND_DPT: number = 0x00000020;
    WIFI_SEND_MWD: number = 0x00000040;
    WIFI_SEND_MWV: number = 0x00000080;
    WIFI_SEND_VLW: number = 0x00000100;
    WIFI_SEND_VBW: number = 0x00000200;
    WIFI_SEND_MTW: number = 0x00000400;
    myMap: Map<String, number>
    
    constructor(
        public bitField: number,
    ) {
        this.myMap = new Map([
            ["HDT", this.WIFI_SEND_HDT],
            ["HDG", this.WIFI_SEND_HDG],
            ["THS", this.WIFI_SEND_THS],
            ["VHW", this.WIFI_SEND_VHW],
            ["DBT", this.WIFI_SEND_DBT],
            ["DPT", this.WIFI_SEND_DPT],
            ["MWD", this.WIFI_SEND_MWD],
            ["MWV", this.WIFI_SEND_MWV],
            ["VLW", this.WIFI_SEND_VLW],
            ["VBW", this.WIFI_SEND_VBW],
            ["MTW", this.WIFI_SEND_MTW],
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

    static init(bitField): N2k {
        debugger;
        return new N2k(
            bitField
        );
    }

}
