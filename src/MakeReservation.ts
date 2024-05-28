import Reservation from "./Reservation";
import ReservationRepository from "./ReservationRepository"
import RoomRepository from "./RoomRepository"

export default class MakeReservation {

	constructor (readonly roomRepository: RoomRepository, readonly reservationRepository: ReservationRepository) {

	}

	async execute (input: Input): Promise<Output> {
		const room = await this.roomRepository.get(input.roomId);
		const reservation = Reservation.create(input.roomId, input.email, input.checkinDate, input.checkoutDate);
		reservation.calculate(room);
		await this.reservationRepository.save(reservation);
		return {
			reservationId: reservation.reservationId
		}
	}
}

type Input = {
	roomId: string,
	email: string,
	checkinDate: Date,
	checkoutDate: Date
}

type Output = {
	reservationId: string
}
