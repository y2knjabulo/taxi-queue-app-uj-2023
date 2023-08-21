

document.addEventListener('alpine:init', () => {

	Alpine.data('TaxiQueue', () => {
		

		return {
			version: 'no-api-1.0',
			peopleQueue: 0,
			taxiQueue: 0,

			joinQueue() {
				this.peopleQueue++;
			},

			leaveQueue() {
				if (this.peopleQueue > 0) {
					this.peopleQueue--;
				}
			},

			joinTaxiQueue() {
				this.taxiQueue++;
			},

			queueLength() {
				return this.peopleQueue;
			},

			taxiQueueLength() {
				return this.taxiQueue;
			},

			taxiDepart() {
				if (this.peopleQueue >= 12) {
					this.peopleQueue -= 12;
					this.taxiQueue--;
				}
			}
		}
	});
});











