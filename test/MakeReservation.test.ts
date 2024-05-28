import GetReservation from "../src/GetReservation";
import MakeReservation from "../src/MakeReservation";
import { ReservationRepositoryDatabase } from "../src/ReservationRepository";
import { RoomRepositoryDatabase } from "../src/RoomRepository";

test("Deve fazer a reserva de um quarto com pagamento por dia", async function () {
	const roomRepository = new RoomRepositoryDatabase();
	const reservationRepository = new ReservationRepositoryDatabase();
	const makeReservation = new MakeReservation(roomRepository, reservationRepository);
	const inputMakeReservation =  {
		roomId: "aa354842-59bf-42e6-be3a-6188dbb5fff8",
		email: "john.doe@gmail.com",
		checkinDate: new Date("2023-03-01T10:00:00"),
		checkoutDate: new Date("2023-03-05T10:00:00")
	};
	const outputMakeReservation = await makeReservation.execute(inputMakeReservation);
	expect(outputMakeReservation.reservationId).toBeDefined();
	const getReservation = new GetReservation(reservationRepository);
	const outputGetReservation = await getReservation.execute(outputMakeReservation.reservationId);
	expect(outputGetReservation.email).toBe(inputMakeReservation.email);
	expect(outputGetReservation.duration).toBe(4);
	expect(outputGetReservation.price).toBe(4000);
	expect(outputGetReservation.status).toBe("active")
});

test("Deve fazer a reserva de um quarto com pagamento por hora", async function () {
	const roomRepository = new RoomRepositoryDatabase();
	const reservationRepository = new ReservationRepositoryDatabase();
	const makeReservation = new MakeReservation(roomRepository, reservationRepository);
	const inputMakeReservation =  {
		roomId: "d5f5c6cb-bf69-4743-a288-dafed2517e38",
		email: "john.doe@gmail.com",
		checkinDate: new Date("2023-03-01T10:00:00"),
		checkoutDate: new Date("2023-03-01T12:00:00")
	};
	const outputMakeReservation = await makeReservation.execute(inputMakeReservation);
	expect(outputMakeReservation.reservationId).toBeDefined();
	const getReservation = new GetReservation(reservationRepository);
	const outputGetReservation = await getReservation.execute(outputMakeReservation.reservationId);
	expect(outputGetReservation.email).toBe(inputMakeReservation.email);
	expect(outputGetReservation.duration).toBe(2);
	expect(outputGetReservation.price).toBe(200);
	expect(outputGetReservation.status).toBe("active")
});
