
document.addEventListener('alpine:init', () => {

    Alpine.data('TaxiQueue', () => {

        return {
            version: 'api-1.0',
            queueLength: 0,
            taxiQueueLength: 0, // Add this variable to track taxi queue length

            async init() {
                await this.refreshQueueLength();
                await this.refreshTaxiQueueLength(); // Refresh taxi queue length as well
            },

            async refreshQueueLength() {
                const response = await axios.get('/api/passenger/queue');
                this.queueLength = response.data.queueCount;
            },

            async refreshTaxiQueueLength() {
                const response = await axios.get('/api/taxi/queue');
                this.taxiQueueLength = response.data.queueCount;
            },

            async joinQueue() {
                await axios.post('/api/passenger/join');
                await this.refreshQueueLength();
            },

            async leaveQueue() {
                await axios.post('/api/passenger/leave');
                await this.refreshQueueLength();
            },

            async joinTaxiQueue() {
                await axios.post('/api/taxi/join');
                await this.refreshTaxiQueueLength();
            },
		

            async taxiDepart() {
                await axios.post('/api/taxi/depart');
                await this.refreshQueueLength();
                await this.refreshTaxiQueueLength();
            }
        }
    });

});
