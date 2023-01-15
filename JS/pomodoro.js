var element = document.querySelector(".chart");
new EasyPieChart(element, {
    size: 200,
    barColor: "DarkGreen",
    onStep: function(from, to, percent) {
        this.el.children[0].innerHTML = Math.round(percent);
    }
});