
import crypto from "crypto";
import Room from "./Room";
import { PriceCalculatorFactory } from "./PriceCalculator";

export default class Reservation {

	constructor (readonly reservationId: string, readonly roomId: string, readonly email: string, readonly checkinDate: Date, readonly checkoutDate: Date, private duration: number, private price: number, private status: string) {
	}

	static create (roomId: string, email: string, checkinDate: Date, checkoutDate: Date) {
		const reservationId = crypto.randomUUID();
		const duration = 0;
		const price = 0;
		const status = "active";
		return new Reservation(reservationId, roomId, email, checkinDate, checkoutDate, duration, price, status);
	}

	calculate (room: Room) {
		const { duration, price } = PriceCalculatorFactory.create(room.type).calculate(this.checkinDate, this.checkoutDate, room.price);
		this.duration = duration;
		this.price = price;
	}

	getStatus () {
		return this.status;
	}

	getDuration () {
		return this.duration;
	}

	getPrice () {
		return this.price;
	}
}
