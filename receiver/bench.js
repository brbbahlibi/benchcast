function Bench(canvas) {
    window.bench = this;

    this.context = canvas.getContext('2d');
    this.courtColor = "#999999";

    this.width = canvas.width;
    this.height = canvas.height;

    // Draw court initially
    this.context.fillStyle = this.courtColor;
    this.context.fillRect(0, 0, this.width, this.height);

    // set the fill for drawing from now on
    this.context.fillStyle = "#FFFFFF";

    this.count = 0;
    this.periods = [10];

    this.sma10 = simple_moving_averager(10);
}

function simple_moving_averager(period) {
    var nums = [];
    return function(num) {
        nums.push(num);
        if (nums.length > period)
            nums.splice(0,1);  // remove the first element of the array

        var sum = 0;
        for (var i in nums)
            sum += nums[i];

        var n = period;
        if (nums.length < period)
            n = nums.length;

        return(sum/n);
    }
}

// This will be called from window on refresh
Bench.prototype.update = function () {
    //noinspection JSUnresolvedVariable
    if (window.start) {
        var period = performance.now() - window.start;
        console.log('Average period last 10 frames ' + this.sma10(period) + ' ms');
    }

    //noinspection JSUnresolvedVariable
    window.start = performance.now();

    // reschedule next animation update
    window.requestAnimationFrame(window.bench.update);
};