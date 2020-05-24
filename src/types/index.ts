export interface IKeystoreState {
    users: IUser[],
}

export interface IMetricsState {
    nodeDown: boolean,
    nodeUrl: string,
    metrics: object[]
}

export interface IAdminState {
    nodeId: string,
    peers: string[],
    networkId: string,

}


export interface IPChainState {
    blockchains: IBlockchain[],
}

export interface IBlockchain {
    id: string,
    name: string,
    subnetID: string,
    vmID: string

}


export interface  IUser {
    name: string;
    password?: string;
    exportData?: string;
}
