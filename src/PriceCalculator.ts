export default abstract class PriceCalculator {
	calculate (checkinDate: Date, checkoutDate: Date, roomPrice: number): { duration: number, price: number } {
		const duration = this.calculateDuration(checkinDate, checkoutDate);
		const price = duration * roomPrice;
		return {
			duration,
			price
		}
	}

	abstract calculateDuration (checkinDate: Date, checkoutDate: Date): number;
}

export class DayPriceCalculator extends PriceCalculator {
	calculateDuration(checkinDate: Date, checkoutDate: Date): number {
		return (checkoutDate.getTime() - checkinDate.getTime())/(1000*60*60*24);
	}
}

export class HourPriceCalculator extends PriceCalculator {
	calculateDuration(checkinDate: Date, checkoutDate: Date): number {
		return (checkoutDate.getTime() - checkinDate.getTime())/(1000*60*60);
	}
}

export class PriceCalculatorFactory {
	static create (type: string) {
		if (type === "day") return new DayPriceCalculator();
		if (type === "hour") return new HourPriceCalculator();
		throw new Error();
	}
}
