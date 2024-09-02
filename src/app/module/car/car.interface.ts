

export type Tstatus = 'available' | 'unavailable' | 'maintenance';

export interface CarInterface {
    name: string;
    description: string;
    color: string;
    isElectric: boolean;
    status: Tstatus;
    features: string[];
    pricePerHour: number;
    isDeleted: boolean
}