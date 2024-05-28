import Room from "./Room";
import pgp from "pg-promise";

export default interface RoomRepository {
	get (roomId: string): Promise<Room>;
}

export class RoomRepositoryDatabase implements RoomRepository {

	async get(roomId: string): Promise<Room> {
		const connection = pgp()("postgres://postgres:123456@localhost:5432/app");
		const [roomData] = await connection.query("select * from branas.room where room_id = $1", [roomId]);
		await connection.$pool.end();
		return new Room(roomData.room_id, roomData.type, parseFloat(roomData.price));
	} 

}
