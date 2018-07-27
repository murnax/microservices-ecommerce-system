import ShipmentId from "./ShipmentId";

export default class Shipment {
    readonly shipmentId: ShipmentId;

    constructor(shipmentId: ShipmentId) {
        this.shipmentId = shipmentId;
    }
}