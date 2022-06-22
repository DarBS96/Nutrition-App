const { ChartJSNodeCanvas } = require("chartjs-node-canvas");

const calculateRmr = ({ height, weight, age, gender }) => {
  if (gender === "male") {
    return Math.round(9.99 * weight + 6.25 * height - 4.92 * age + 5);
  } else {
    return Math.round(9.99 * weight + 6.25 * height - 4.92 * age - 161);
  }
};

const getChart = async () => {
  const width = 400; //px
  const height = 400; //px
  const backgroundColour = "white"; // Uses https://www.w3schools.com/tags/canvas_fillstyle.asp
  const chartJSNodeCanvas = new ChartJSNodeCanvas({
    width,
    height,
    backgroundColour,
  });

  const configuration = {
    type: "bar",
    data: {
      labels: ["Red", "Blue", "Yellow", "Green", "Purple", "Orange"],
      datasets: [
        {
          label: "# of Votes",
          data: [12, 19, 3, 5, 2, 3],
          backgroundColor: [
            "rgba(255, 99, 132, 0.2)",
            "rgba(54, 162, 235, 0.2)",
            "rgba(255, 206, 86, 0.2)",
            "rgba(75, 192, 192, 0.2)",
            "rgba(153, 102, 255, 0.2)",
            "rgba(255, 159, 64, 0.2)",
          ],
          borderColor: [
            "rgba(255, 99, 132, 1)",
            "rgba(54, 162, 235, 1)",
            "rgba(255, 206, 86, 1)",
            "rgba(75, 192, 192, 1)",
            "rgba(153, 102, 255, 1)",
            "rgba(255, 159, 64, 1)",
          ],
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  };
  // const image = await chartJSNodeCanvas.renderToBuffer(configuration);
  const dataUrl = await chartJSNodeCanvas.renderToDataURL(configuration);
  // const stream = chartJSNodeCanvas.renderToStream(configuration);
  return dataUrl;
};

module.exports = { calculateRmr, getChart };
