

export type Tstatus = 'available' | 'unavailable' | 'maintenance';

export interface CarInterface {
    name: string;
    description: string;
    color: string;
    isElectric: string;
    status: Tstatus;
    features: string[];
    pricePerHour: number;
    isDeleted: string;
    image:string;
    carType:string;
}