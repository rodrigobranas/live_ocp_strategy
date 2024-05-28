import ReservationRepository from "./ReservationRepository"

export default class GetReservation {

	constructor (readonly reservationRepository: ReservationRepository) {

	}

	async execute (reservationId: string): Promise<Output> {
		const reservation = await this.reservationRepository.get(reservationId);
		return {
			reservationId: reservation.reservationId,
			roomId: reservation.roomId,
			email: reservation.email,
			checkinDate: reservation.checkinDate,
			checkoutDate: reservation.checkoutDate,
			duration: reservation.getDuration(),
			price: reservation.getPrice(),
			status: reservation.getStatus()
		}
	}
}

type Output = {
	reservationId: string,
	roomId: string,
	email: string,
	checkinDate: Date,
	checkoutDate: Date,
	duration: number,
	price: number,
	status: string
}
